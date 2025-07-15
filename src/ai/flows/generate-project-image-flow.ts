
'use server';
/**
 * @fileOverview A flow to generate a project image using AI.
 *
 * - generateProjectImage - A function that generates an image for a project.
 * - GenerateProjectImageInput - The input type for the generateProjectImage function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const GenerateProjectImageInputSchema = z.object({
  title: z.string().describe('The title of the project.'),
  description: z.string().describe('A detailed description of the project.'),
});
export type GenerateProjectImageInput = z.infer<typeof GenerateProjectImageInputSchema>;


export async function generateProjectImage(input: GenerateProjectImageInput): Promise<string> {
    try {
        const { media } = await ai.generate({
            model: 'googleai/gemini-2.0-flash-preview-image-generation',
            prompt: `Generate a professional and visually appealing image that represents a software project.
Project Title: "${input.title}"
Project Description: "${input.description}"

Create a compelling, abstract, modern tech aesthetic image based on the title and description. Avoid using any text or human figures in the image. Focus on conceptual representation.`,
            config: {
              responseModalities: ['TEXT', 'IMAGE'],
            },
        });

        if (!media?.url) {
            console.error('Image generation failed, returning placeholder.');
            return 'https://placehold.co/600x400.png';
        }
        return media.url;
    } catch(e) {
        console.error('Error generating project image, returning placeholder.', e);
        return 'https://placehold.co/600x400.png';
    }
}
