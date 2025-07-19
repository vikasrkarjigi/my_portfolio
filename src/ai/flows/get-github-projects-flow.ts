
'use server';
/**
 * @fileOverview This file defines a Genkit flow to fetch and categorize GitHub projects.
 *
 * - getGithubProjects - A function that handles fetching and categorizing GitHub projects.
 * - GetGithubProjectsInput - The input type for the getGithubProjects function.
 * - GetGithubProjectsOutput - The return type for the getGithubProjects function.
 */

import { ai } from '@/ai/genkit';
import { getPublicRepositories, type GithubRepository } from '@/services/github';
import { z } from 'genkit';
import { generateProjectImage } from './generate-project-image-flow';

const GetGithubProjectsInputSchema = z.object({
  username: z.string().describe('The GitHub username.'),
});
export type GetGithubProjectsInput = z.infer<typeof GetGithubProjectsInputSchema>;

const ProjectSchema = z.object({
  title: z.string().describe('The name of the repository.'),
  description: z.string().describe("A concise, one-sentence description of the project, suitable for a portfolio."),
  tools: z.array(z.string()).describe('An array of languages or main technologies used in the project (e.g., Python, Jupyter, Pandas).'),
  image: z.string().describe('A generated image URL (data URI) for the project.'),
  category: z.enum(['dataScientist', 'dataEngineer', 'dataAnalyst', 'other']).describe("The category of the project based on its content."),
  url: z.string().describe('The URL of the GitHub repository.'),
});

const GetGithubProjectsOutputSchema = z.object({
  projects: z.array(ProjectSchema),
});
export type GetGithubProjectsOutput = z.infer<typeof GetGithubProjectsOutputSchema>;

export async function getGithubProjects(input: GetGithubProjectsInput): Promise<GetGithubProjectsOutput> {
  return getGithubProjectsFlow(input);
}

const generateDescriptionPrompt = ai.definePrompt({
    name: 'generateProjectDescriptionPrompt',
    input: { schema: z.object({ name: z.string(), description: z.string().nullable() }) },
    output: { schema: z.object({ description: z.string(), tools: z.array(z.string()) }) },
    prompt: `You are an expert portfolio curator.
    Based on the repository name and its original description, write a new, concise, one-sentence description suitable for a project card on a portfolio website.
    Also, identify an array of key technologies or tools used (e.g., "Python", "Jupyter", "Pandas").

    Repository Name: {{{name}}}
    Original Description: {{{description}}}

    Return only the JSON object.`,
});

type CategorizedRepo = GithubRepository & { category: 'dataScientist' | 'dataEngineer' | 'dataAnalyst' | 'other' };

function categorizeAndFilterRepositories(repos: GithubRepository[]): CategorizedRepo[] {
    const categorizedRepos: CategorizedRepo[] = [];
    
    for (const repo of repos) {
        const topics = repo.topics.map(t => t.toLowerCase());
        let category: CategorizedRepo['category'] | null = null;
        
        if (topics.includes('ml-engineer') || topics.includes('data-science')) {
          category = 'dataScientist';
        } else if (topics.includes('data-engineer')) {
          category = 'dataEngineer';
        } else if (topics.includes('data-analyst')) {
          category = 'dataAnalyst';
        }

        if (category) {
            categorizedRepos.push({ ...repo, category });
        }
    }
    return categorizedRepos;
}

function formatRepositoryName(name: string): string {
  return name
    .replace(/-/g, ' ')
    .replace(/_/g, ' ')
    .replace(/\b\w/g, char => char.toUpperCase());
}

const getGithubProjectsFlow = ai.defineFlow(
  {
    name: 'getGithubProjectsFlow',
    inputSchema: GetGithubProjectsInputSchema,
    outputSchema: GetGithubProjectsOutputSchema,
    tools: [getPublicRepositories],
  },
  async (input) => {
    const allRepos = await getPublicRepositories(input);

    const userRepos = allRepos.filter(repo => repo.name !== input.username);
    
    const filteredRepos = categorizeAndFilterRepositories(userRepos);

    if (filteredRepos.length === 0) {
      return { projects: [] };
    }
    
    const processedProjectsPromises = filteredRepos.map(async (repo) => {
        let description = repo.description || 'No description provided.';
        let tools = repo.language ? [repo.language] : ['Code'];
        
        try {
            const { output } = await generateDescriptionPrompt({ name: repo.name, description: repo.description });
            if (output) {
                description = output.description;
                tools = output.tools.length > 0 ? output.tools : tools;
            }
        } catch (e) {
            console.error(`AI description generation failed for repo ${repo.name}. Using default.`, e);
        }
        
        return {
            title: formatRepositoryName(repo.name),
            description: description,
            tools: tools,
            url: repo.html_url,
            category: repo.category,
            image: '', // will be filled later
        };
    });
    
    const processedProjects = await Promise.all(processedProjectsPromises);
    
    if (processedProjects.length === 0) {
      return { projects: [] };
    }

    // Generate images in parallel
    const imagePromises = processedProjects.map(p => 
        generateProjectImage({ title: p.title, description: p.description })
    );
    const generatedImages = await Promise.all(imagePromises);

    // Combine projects with generated images
    const finalProjects = processedProjects.map((p, index) => ({
        ...p,
        image: generatedImages[index] || 'https://placehold.co/600x400.png',
    }));

    return { projects: finalProjects };
  }
);
