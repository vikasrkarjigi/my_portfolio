'use server'

import { extractTechStacks } from '@/ai/flows/extract-tech-stacks-from-resume'
import { getGithubProjects } from '@/ai/flows/get-github-projects-flow';
import { answerQuery } from '@/ai/flows/chatbot-flow';


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

export async function getProjectsFromGithub(username: string) {
  try {
    const result = await getGithubProjects({ username });
    
    const groupedProjects = result.projects.reduce((acc, project) => {
      const category = project.category as 'dataScientist' | 'dataEngineer' | 'dataAnalyst';
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(project);
      return acc;
    }, {} as Record<'dataScientist' | 'dataEngineer' | 'dataAnalyst', typeof result.projects>);

    return { success: true, data: groupedProjects };
  } catch (error) {
    console.error('Error getting GitHub projects:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
    return { success: false, error: `Failed to get projects from GitHub. ${errorMessage}` };
  }
}

export async function getChatbotResponse(query: string) {
    try {
        const result = await answerQuery({ query });
        return { success: true, data: result.response };
    } catch (error) {
        console.error('Error getting chatbot response:', error);
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
        return { success: false, error: `Failed to get response. ${errorMessage}` };
    }
}
