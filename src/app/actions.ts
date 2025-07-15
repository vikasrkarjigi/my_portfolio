'use server'

import { extractTechStacks } from '@/ai/flows/extract-tech-stacks-from-resume'

export async function getTechStacksFromResume(resumeText: string) {
  try {
    const result = await extractTechStacks({ resumeText });
    return { success: true, data: result };
  } catch (error) {
    console.error('Error extracting tech stacks:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
    return { success: false, error: `Failed to extract tech stacks from resume. ${errorMessage}` };
  }
}
