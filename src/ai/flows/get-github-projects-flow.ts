'use server';
/**
 * @fileOverview This file defines a Genkit flow to fetch and categorize GitHub projects.
 *
 * - getGithubProjects - A function that handles fetching and categorizing GitHub projects.
 * - GetGithubProjectsInput - The input type for the getGithubProjects function.
 * - GetGithubProjectsOutput - The return type for the getGithubProjects function.
 */

import { ai } from '@/ai/genkit';
import { getPublicRepositories, GithubRepository } from '@/services/github';
import { z } from 'genkit';

const GetGithubProjectsInputSchema = z.object({
  username: z.string().describe('The GitHub username.'),
});
export type GetGithubProjectsInput = z.infer<typeof GetGithubProjectsInputSchema>;

const ProjectSchema = z.object({
  title: z.string().describe('The name of the repository.'),
  description: z.string().describe("A concise, one-sentence description of the project, suitable for a portfolio."),
  tools: z.array(z.string()).describe('An array of languages or main technologies used in the project (e.g., Python, Jupyter, Pandas).'),
  image: z.string().describe('A placeholder image URL for the project.'),
  aiHint: z.string().describe('A two-word hint for generating a relevant project image (e.g., "data visualization", "server network").'),
  category: z.enum(['dataScientist', 'dataEngineer', 'dataAnalyst']).describe("The category of the project based on its content."),
  url: z.string().describe('The URL of the GitHub repository.'),
});

const GetGithubProjectsOutputSchema = z.object({
  projects: z.array(ProjectSchema),
});
export type GetGithubProjectsOutput = z.infer<typeof GetGithubProjectsOutputSchema>;

export async function getGithubProjects(input: GetGithubProjectsInput): Promise<GetGithubProjectsOutput> {
  return getGithubProjectsFlow(input);
}

const categorizeProjectPrompt = ai.definePrompt({
    name: 'categorizeProjectPrompt',
    input: { schema: z.object({ repo: z.any() }) },
    output: { schema: GetGithubProjectsOutputSchema },
    prompt: `You are an expert developer and portfolio curator. Your task is to analyze a list of GitHub repositories and format them for a portfolio website.

For each repository, you must:
1.  **Categorize** it into one of three roles: 'dataScientist', 'dataEngineer', or 'dataAnalyst' based on its name, description, and primary language.
2.  **Write a concise, one-sentence description** suitable for a project card.
3.  **Identify the key technologies and tools** used. This should be an array of strings, including the primary programming language and any mentioned frameworks or libraries (e.g., "Python", "Jupyter", "Pandas").
4.  **Create a two-word AI hint** for generating a relevant image for the project (e.g., "sentiment analysis", "market prediction").

Analyze the following repositories and return the data in the specified JSON format.

    Repositories:
    {{#each repo}}
    - Name: {{this.name}}
      Description: {{this.description}}
      URL: {{this.html_url}}
      Language: {{this.language}}
    {{/each}}

    Your response must only contain the JSON object.
    `,
});

const getGithubProjectsFlow = ai.defineFlow(
  {
    name: 'getGithubProjectsFlow',
    inputSchema: GetGithubProjectsInputSchema,
    outputSchema: GetGithubProjectsOutputSchema,
    tools: [getPublicRepositories],
  },
  async (input) => {
    const repos = await getPublicRepositories(input);

    // Filter out forked repos and select the most recent 6.
    const filteredRepos = repos.filter(repo => !repo.fork).slice(0, 6);

    if (filteredRepos.length === 0) {
      return { projects: [] };
    }
    
    const { output } = await categorizeProjectPrompt({ repo: filteredRepos.map(repo => ({
        name: repo.name,
        description: repo.description,
        html_url: repo.html_url,
        language: repo.language,
    }))});

    if (!output) {
        throw new Error('Failed to categorize projects.');
    }

    // Post-process to add placeholder image and ensure tools are populated
    const finalProjects = output.projects.map(p => ({
        ...p,
        image: `https://placehold.co/600x400.png`,
        tools: p.tools.length > 0 ? p.tools : ['Code'],
    }));

    return { projects: finalProjects };
  }
);
