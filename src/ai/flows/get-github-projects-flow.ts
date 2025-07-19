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


function categorizeRepository(repo: GithubRepository): 'dataScientist' | 'dataEngineer' | 'dataAnalyst' | 'other' {
    const topics = repo.topics.map(t => t.toLowerCase());
    if (topics.includes('ml-engineer') || topics.includes('data-science')) {
      return 'dataScientist';
    }
    if (topics.includes('data-engineer')) {
      return 'dataEngineer';
    }
    if (topics.includes('data-analyst')) {
      return 'dataAnalyst';
    }
    return 'other'; // Fallback category
}


const getGithubProjectsFlow = ai.defineFlow(
  {
    name: 'getGithubProjectsFlow',
    inputSchema: GetGithubProjectsInputSchema,
    outputSchema: GetGithubProjectsOutputSchema,
    tools: [getPublicRepositories],
  },
  async (input) => {
    const repos = await getPublicRepositories(input);

    const filteredRepos = repos.filter(repo => repo.name !== input.username).slice(0, 9);

    if (filteredRepos.length === 0) {
      return { projects: [] };
    }
    
    // Process repos to get descriptions and tools
    const processedProjectsPromises = filteredRepos.map(async (repo) => {
        try {
            const { output } = await generateDescriptionPrompt({ name: repo.name, description: repo.description });
            if (!output) return null;
            
            const category = categorizeRepository(repo);
            if (category === 'other') return null; // Skip projects that don't fit categories

            return {
                title: repo.name,
                description: output.description,
                tools: output.tools.length > 0 ? output.tools : (repo.language ? [repo.language] : ['Code']),
                url: repo.html_url,
                category,
                image: '', // will be filled later
            };
        } catch (e) {
            console.error(`Failed to process repo ${repo.name}:`, e);
            return null;
        }
    });
    
    const processedProjects = (await Promise.all(processedProjectsPromises)).filter(p => p !== null) as Omit<z.infer<typeof ProjectSchema>, 'image'>[];
    
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
        image: generatedImages[index],
    }));

    return { projects: finalProjects };
  }
);
