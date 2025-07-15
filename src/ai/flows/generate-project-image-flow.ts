
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
  aiHint: z.string().describe('A two-word hint for the image generation model.'),
});
export type GenerateProjectImageInput = z.infer<typeof GenerateProjectImageInputSchema>;


export async function generateProjectImage(input: GenerateProjectImageInput): Promise<string> {
    const { media } = await ai.generate({
        model: 'googleai/gemini-2.0-flash-preview-image-generation',
        prompt: `Generate a professional and visually appealing image for a software project titled "${input.title}". The project is about ${input.aiHint}. The image should be abstract, using a modern tech aesthetic. Avoid text and human figures.`,
        config: {
          responseModalities: ['TEXT', 'IMAGE'],
        },
    });

    if (!media?.url) {
        console.error('Image generation failed, returning placeholder.');
        return 'https://placehold.co/600x400.png';
    }

    return media.url;
}
