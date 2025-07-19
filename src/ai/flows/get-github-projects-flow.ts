
'use server';
/**
 * @fileOverview This file defines a Genkit flow to fetch and categorize GitHub projects.
 *
 * - getGithubProjects - A function that handles fetching and categorizing GitHub projects.
 * - GetGithubProjectsInput - The input type for the getGithubProjects function.
 * - GetGithubProjectsOutput - The return type for the getGithubProjects function.
 */

import { ai } from '@/ai/genkit';
import { getPublicRepositories, getPortfolioImageFromRepo, type GithubRepository } from '@/services/github';
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
  image: z.string().describe('A generated image URL (data URI) or a URL from the repository for the project.'),
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

type CategorizedRepo = GithubRepository & { 
  category: 'dataScientist' | 'dataEngineer' | 'dataAnalyst' | 'other';
  order: number;
};

function categorizeAndFilterRepositories(repos: GithubRepository[]): CategorizedRepo[] {
    const categorizedRepos: CategorizedRepo[] = [];
    
    for (const repo of repos) {
        let category: CategorizedRepo['category'] | null = null;
        let order = -1; // Default for non-numbered projects

        for (const topic of repo.topics.map(t => t.toLowerCase())) {
            const dsMatch = topic.match(/^data-science-(\d+)$/);
            const deMatch = topic.match(/^data-engineer-(\d+)$/);
            const daMatch = topic.match(/^data-analyst-(\d+)$/);

            if (dsMatch) {
              category = 'dataScientist';
              order = parseInt(dsMatch[1], 10);
              break;
            }
            if (deMatch) {
              category = 'dataEngineer';
              order = parseInt(deMatch[1], 10);
              break;
            }
            if (daMatch) {
              category = 'dataAnalyst';
              order = parseInt(daMatch[1], 10);
              break;
            }
        }
        
        // Fallback for non-numbered topics
        if (!category) {
            const topics = repo.topics.map(t => t.toLowerCase());
            if (topics.includes('data-science') || topics.includes('ml-engineer')) {
                category = 'dataScientist';
            } else if (topics.includes('data-engineer')) {
                category = 'dataEngineer';
            } else if (topics.includes('data-analyst')) {
                category = 'dataAnalyst';
            }
        }
        
        if (category) {
            categorizedRepos.push({ ...repo, category, order });
        }
    }
    
    // Sort repositories: numbered ones first in descending order, then unnumbered ones
    categorizedRepos.sort((a, b) => {
        if (a.order !== -1 && b.order !== -1) {
            return b.order - a.order; // Descending for numbered projects
        }
        if (a.order !== -1) return -1; // a is numbered, b is not
        if (b.order !== -1) return 1;  // b is numbered, a is not
        return 0; // both are unnumbered, keep original order (pushed date)
    });
    
    return categorizedRepos;
}

function formatRepositoryName(name: string): string {
  return name
    .replace(/-/g, ' ')
    .replace(/_/g, ': ')
    .replace(/\b\w/g, char => char.toUpperCase());
}

const getGithubProjectsFlow = ai.defineFlow(
  {
    name: 'getGithubProjectsFlow',
    inputSchema: GetGithubProjectsInputSchema,
    outputSchema: GetGithubProjectsOutputSchema,
    tools: [getPublicRepositories, getPortfolioImageFromRepo],
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
            // Pass repo details for image fetching
            repoName: repo.name, 
            username: input.username,
            image: '', // will be filled later
        };
    });
    
    const processedProjects = await Promise.all(processedProjectsPromises);
    
    if (processedProjects.length === 0) {
      return { projects: [] };
    }

    // Generate images in parallel
    const imagePromises = processedProjects.map(async (p) => {
        // Try to get image from repo first
        const imageUrl = await getPortfolioImageFromRepo({ username: p.username, repoName: p.repoName });
        if (imageUrl) {
            return imageUrl;
        }
        // Fallback to generating an image
        return generateProjectImage({ title: p.title, description: p.description });
    });
    const generatedImages = await Promise.all(imagePromises);

    // Combine projects with generated images
    const finalProjects = processedProjects.map((p, index) => ({
        ...p,
        image: generatedImages[index] || 'https://placehold.co/1920x1080.png',
    }));

    return { projects: finalProjects };
  }
);
