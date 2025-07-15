'use server';
/**
 * @fileOverview This file defines a Genkit flow to extract tech stacks from a resume.
 *
 * - extractTechStacks - A function that handles the tech stack extraction process from a resume.
 * - ExtractTechStacksInput - The input type for the extractTechStacks function.
 * - ExtractTechStacksOutput - The return type for the extractTechStacks function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ExtractTechStacksInputSchema = z.object({
  resumeText: z.string().describe('The text content of the resume.'),
});
export type ExtractTechStacksInput = z.infer<typeof ExtractTechStacksInputSchema>;

const ExtractTechStacksOutputSchema = z.object({
  techStacks: z
    .array(
      z.object({
        category: z.string().describe('The category of the tech stack (e.g., Programming Languages, AI/ML Frameworks).'),
        technologies: z.array(z.string()).describe('An array of technologies within the category.'),
      })
    )
    .describe('An array of tech stacks extracted from the resume, categorized with technologies.'),
});
export type ExtractTechStacksOutput = z.infer<typeof ExtractTechStacksOutputSchema>;

export async function extractTechStacks(input: ExtractTechStacksInput): Promise<ExtractTechStacksOutput> {
  return extractTechStacksFlow(input);
}

const prompt = ai.definePrompt({
  name: 'extractTechStacksPrompt',
  input: {schema: ExtractTechStacksInputSchema},
  output: {schema: ExtractTechStacksOutputSchema},
  prompt: `You are an expert AI resume parser specializing in identifying and categorizing technical skills.

  Given the text from a resume, extract the tech stacks and categorize them into relevant categories like "Programming Languages", "AI/ML Frameworks", "Cloud & DevOps", etc.
  Infer the technology groupings based on the context of the resume.

  Resume Text: {{{resumeText}}}

  Return the tech stacks in a structured JSON format.
  {
    "techStacks": [
      {
        "category": "Category Name",
        "technologies": ["Technology 1", "Technology 2", ...]
      },
      ...
    ]
  }`,
});

const extractTechStacksFlow = ai.defineFlow(
  {
    name: 'extractTechStacksFlow',
    inputSchema: ExtractTechStacksInputSchema,
    outputSchema: ExtractTechStacksOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
