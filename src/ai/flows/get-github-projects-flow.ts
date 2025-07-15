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
  tools: z.array(z.string()).describe('An array of languages or main technologies used in the project.'),
  image: z.string().url().describe('A placeholder image URL for the project.'),
  aiHint: z.string().describe('A two-word hint for generating a relevant project image (e.g., "data visualization", "server network").'),
  category: z.enum(['dataScientist', 'dataEngineer', 'dataAnalyst']).describe("The category of the project based on its content."),
  url: z.string().url().describe('The URL of the GitHub repository.'),
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
    prompt: `You are an expert at analyzing GitHub repositories. Based on the repository information (name, description, topics, language), categorize the projects into one of three categories: 'dataScientist', 'dataEngineer', or 'dataAnalyst'. Also generate a concise, one-sentence portfolio-ready description, a two-word hint for an image, and list the primary language as a tool.

    Analyze the following repositories and return them in the specified JSON format.

    Repositories:
    {{#each repo}}
    - Name: {{this.name}}
      Description: {{this.description}}
      URL: {{this.html_url}}
      Language: {{this.language}}
      Topics: {{#each this.topics}}{{{this}}}{{/each}}
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

    // Filter out forked repos and repos without topics, as they are less likely to be showcase projects.
    const filteredRepos = repos.filter(repo => !repo.fork && repo.topics.length > 0).slice(0, 6); // Limit to 6 projects for performance

    if (filteredRepos.length === 0) {
      return { projects: [] };
    }
    
    const { output } = await categorizeProjectPrompt({ repo: filteredRepos.map(repo => ({
        name: repo.name,
        description: repo.description,
        html_url: repo.html_url,
        language: repo.language,
        topics: repo.topics
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
