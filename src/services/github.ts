import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const GithubRepositorySchema = z.object({
    name: z.string(),
    description: z.string().nullable(),
    html_url: z.string().url(),
    fork: z.boolean(),
    topics: z.array(z.string()),
    language: z.string().nullable(),
});
export type GithubRepository = z.infer<typeof GithubRepositorySchema>;

export const getPublicRepositories = ai.defineTool(
  {
    name: 'getPublicRepositories',
    description: 'Returns the public repositories for a given GitHub username.',
    inputSchema: z.object({
      username: z.string().describe('The GitHub username.'),
    }),
    outputSchema: z.array(GithubRepositorySchema),
  },
  async (input) => {
    try {
      const response = await fetch(`https://api.github.com/users/${input.username}/repos?sort=pushed&per_page=20`, {
        headers: {
            // Including the API version header is a good practice.
            'X-GitHub-Api-Version': '2022-11-28',
             // Optional: Add a User-Agent header
            'User-Agent': 'Firebase-Studio-Portfolio-App'
        }
      });
      if (!response.ok) {
        throw new Error(`Failed to fetch repositories: ${response.statusText}`);
      }
      const data = await response.json();
      
      // Validate each repository against the Zod schema
      return z.array(GithubRepositorySchema).parse(data);

    } catch (error) {
      console.error("Error fetching from GitHub API:", error);
      // In case of an error, return an empty array or re-throw.
      // Returning an empty array allows the flow to continue gracefully.
      return [];
    }
  }
);
