'use server';

import { config } from 'dotenv';
config();

import '@/ai/flows/extract-tech-stacks-from-resume.ts';
import '@/ai/flows/get-github-projects-flow.ts';
import '@/ai/flows/generate-project-image-flow.ts';
