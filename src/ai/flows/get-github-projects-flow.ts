'use server';
/**
 * @fileOverview This file defines a Genkit flow to fetch and categorize GitHub projects.
 *
 * - getGithubProjects - A function that handles fetching and categorizing GitHub projects.
 * - GetGithubProjectsInput - The input type for the getGithubProjects function.
 * - GetGithubProjectsOutput - The return type for the getGithubProjects function.
 */

import { ai } from '@/ai/genkit';
import { getPublicRepositories } from '@/services/github';
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
1.  **Analyze and Categorize**: Look at the repository's name, description, languages, and tools to categorize it into ONE of the three roles: 'dataScientist', 'dataEngineer', or 'dataAnalyst'.
    - **dataScientist**: Assign this category if the project involves machine learning (e.g., scikit-learn, TensorFlow, PyTorch), statistical modeling, or advanced data analysis and prediction.
    - **dataEngineer**: Assign this category if the project involves data pipelines, ETL processes, database management, or infrastructure for data storage and processing (e.g., Airflow, Spark, Kafka).
    - **dataAnalyst**: Assign this category if the project focuses on data cleaning, exploratory data analysis (EDA), and visualization (e.g., using libraries like Matplotlib, Seaborn, Plotly, or tools like Tableau).
2.  **Write a concise, one-sentence description** suitable for a project card.
3.  **Identify the key technologies and tools** used. This should be an array of strings, including the primary programming language and any mentioned frameworks or libraries (e.g., "Python", "Jupyter", "Pandas").

Analyze the following repositories and return the data in the specified JSON format. You must only return the JSON object.

Repositories:
{{#each repo}}
- Name: {{this.name}}
  Description: {{this.description}}
  URL: {{this.html_url}}
  Language: {{this.language}}
{{/each}}
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

    const filteredRepos = repos.filter(repo => !repo.fork && repo.name !== input.username).slice(0, 6);

    if (filteredRepos.length === 0) {
      return { projects: [] };
    }
    
    let output;
    try {
        const { output: promptOutput } = await categorizeProjectPrompt({ repo: filteredRepos.map(repo => ({
            name: repo.name,
            description: repo.description,
            html_url: repo.html_url,
            language: repo.language,
        }))});
        output = promptOutput;
    } catch (e) {
        console.error("AI categorization failed, returning empty project list.", e);
        return { projects: [] };
    }


    if (!output) {
      // This case handles if the AI returns a null/undefined but valid response
      return { projects: [] };
    }

    // Generate images in parallel
    const imagePromises = output.projects.map(p => 
        generateProjectImage({ title: p.title, description: p.description })
    );
    const generatedImages = await Promise.all(imagePromises);

    // Combine projects with generated images
    const finalProjects = output.projects.map((p, index) => ({
        ...p,
        image: generatedImages[index],
        tools: p.tools.length > 0 ? p.tools : ['Code'],
    }));

    return { projects: finalProjects };
  }
);
