'use server';
/**
 * @fileOverview A personal chatbot flow that answers questions about Vikas Ravikumar Karjigi.
 *
 * - answerQuery - A function that handles answering user queries.
 * - PersonalChatbotInput - The input type for the answerQuery function.
 * - PersonalChatbotOutput - The return type for the answerQuery function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalChatbotInputSchema = z.object({
  query: z.string().describe('The user\'s question about Vikas.'),
});
export type PersonalChatbotInput = z.infer<typeof PersonalChatbotInputSchema>;

const PersonalChatbotOutputSchema = z.object({
  response: z.string().describe('The chatbot\'s answer to the query.'),
});
export type PersonalChatbotOutput = z.infer<typeof PersonalChatbotOutputSchema>;

export async function answerQuery(input: PersonalChatbotInput): Promise<PersonalChatbotOutput> {
  return personalChatbotFlow(input);
}

const portfolioContext = `
  ABOUT ME:
  "Hey there! I’m Vikas Ravikumar Karjigi, a curious and driven Data Scientist & AI/ML Engineer with 3+ years of hands-on experience turning ideas into real-world impact. Right now, I’m leveling up my skills through a Master’s in Data Science at Illinois Institute of Technology, Chicago, where I proudly hold a 4.0 GPA."
  "I spent over two years at Boeing, building scalable pipelines and automation systems that made data work smarter. More recently, I’ve been diving into cutting-edge research on secure and decentralized LLMs. Along the way, I’ve built an AI sports highlight generator with an 88% F1 score and slashed processing time by 98% in a real-time fraud detection pipeline. I love crafting systems that are fast, smart, and actually useful."
  "Lately, I’ve been especially excited about the rise of generative AI, LLMOps, and all things AI infrastructure. When I’m not building with code, you’ll probably find me deep in a game of chess or strumming away on my guitar. Always exploring, always creating."

  EXPERIENCE:
  - AI/ML Research Assistant at Illinois Institute of Technology (Jun 2025 – Present): Designed a reinforcement learning pipeline using PPO in OpenAI Gymnasium (Ant-v4) with MuJoCo physics engine and Stable-Baselines3. Integrated trained agents into a custom Unity 3D environment using socket programming and Oculus VR for immersive RL visualization.
  - Teaching Assistant at Illinois Institute of Technology (Jun 2025 – Present): Mentored graduate students in data wrangling, feature engineering, dimensionality reduction, and model evaluation using Python, R, SQL, and Pandas.
  - Data Scientist – Build Fellow Consultant at Open Avenues Foundation (Sep 2024 – May 2025): Built a computer vision pipeline to detect and classify highlight-worthy moments in volleyball using OpenCV and motion-based features, achieving 88% F1-score.
  - Data Analyst at Boeing India Private Limited (Aug 2022 – Jul 2024): Improved booking efficiency by 30% through SQL pipelines across MySQL and MSSQL for real-time KPI dashboards. Saved $60K+ annually by reducing reporting latency by 98%.
  - Data Analyst Intern at Exposys Data Labs (Jul 2019 – Sep 2019): Built a Python-based ETL pipeline using Pandas and MySQL to clean and normalize 25K+ records.

  EDUCATION:
  - Illinois Institute of Technology, Chicago, IL, USA (Aug 2024 – Present): Master of Applied Science in Data Science, GPA: 4.0/4.0. Core Courses: Big Data Technologies, Data Preparation and Analysis, Regression, Machine Learning, Introduction to Time Series, Monte Carlo Methods in Finance, Project Management.
  - RV College of Engineering, Bengaluru, India (Aug 2018 – Aug 2022): Bachelor of Engineering in Electronics and Communication.

  CONTACT INFO:
  - Email: vikasravikarjigi26@gmail.com
  - LinkedIn: https://www.linkedin.com/in/vikasrkarjigi/
  - GitHub: https://github.com/vikasrkarjigi
`;


const prompt = ai.definePrompt({
  name: 'personalChatbotPrompt',
  input: {schema: PersonalChatbotInputSchema},
  output: {schema: PersonalChatbotOutputSchema},
  model: 'googleai/gemini-pro',
  system: `You are a friendly, professional AI assistant for Vikas Ravikumar Karjigi's portfolio website.
Your ONLY purpose is to answer questions about Vikas based on the information provided below.
- Your name is 'Vikas's AI Assistant'.
- Be concise and friendly.
- If a question is NOT about Vikas, or if the information is not available in the context, politely decline to answer. Say something like, "I'm only able to answer questions about Vikas's professional background. Is there anything about his experience or skills I can help with?"
- Do not make up information. If you don't know, say you don't have that information.
- Use the following context to answer all questions.
- Answer from the perspective of an assistant, not as Vikas himself (e.g., say "Vikas is skilled in..." not "I am skilled in...").

Context about Vikas Ravikumar Karjigi:
${portfolioContext}
`,
  prompt: `User's question: {{{query}}}`
});

const personalChatbotFlow = ai.defineFlow(
  {
    name: 'personalChatbotFlow',
    inputSchema: PersonalChatbotInputSchema,
    outputSchema: PersonalChatbotOutputSchema,
  },
  async (input) => {
    const {output} = await prompt(input);
    return output!;
  }
);
