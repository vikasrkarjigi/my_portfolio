'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BrainCircuit, Cloud, Code, Database, GitBranch, Layers, Cpu, Lightbulb, Server, SlidersHorizontal, AreaChart } from 'lucide-react'
import type { LucideIcon, LucideProps } from 'lucide-react'
import { Button } from '../ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '../ui/dialog'
import { Textarea } from '../ui/textarea'
import { useToast } from '@/hooks/use-toast'
import { getTechStacksFromResume } from '@/app/actions'
import { Skeleton } from '../ui/skeleton'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"


type TechItem = {
  name: string
  Icon: LucideIcon | React.FC<React.SVGProps<SVGSVGElement>>
}

type TechStack = {
  category: string
  technologies: TechItem[]
  Icon: LucideIcon
}

// SVG Icon Components
const PythonIcon = (props: React.SVGProps<SVGSVGElement>) => <svg {...props} viewBox="0 0 24 24"><path fill="currentColor" d="M16.75 22a4.25 4.25 0 0 1-4.25-4.25V15H8v2.75A4.25 4.25 0 0 1 3.75 22H2v-1.5a2.75 2.75 0 0 1 2.75-2.75h3.5v-4h-2A4.25 4.25 0 0 1 2 9.5V2h1.5a2.75 2.75 0 0 1 2.75 2.75v3.5h4v-2A4.25 4.25 0 0 1 14.5 2H22v1.5a2.75 2.75 0 0 1-2.75 2.75h-3.5v4h2A4.25 4.25 0 0 1 22 14.5V22h-1.5a2.75 2.75 0 0 1-2.75-2.75v-3.5h-4V17.75A4.25 4.25 0 0 1 16.75 22Z" /></svg>
const JavaIcon = (props: React.SVGProps<SVGSVGElement>) => <svg {...props} viewBox="0 0 24 24"><path fill="currentColor" d="M4 3h14v2H4zm0 2h1v12H4zm1 12h12v2H5zm12-12h1v12h-1zm-1 0v1H8V5zm0 2v1H8V7zm0 2v1H8V9zm0 2v1H8v-1zm-2 2H8v1h6zm-7-5H6V8h1zm2 0H8V8h1zm-2 2H6v-1h1zm2 0H8v-1h1z" /></svg>
const RIcon = (props: React.SVGProps<SVGSVGElement>) => <svg {...props} viewBox="0 0 24 24"><path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2M11 17h-2V7h2v5h2v2h-2zm4.24-4.56l.76 5.56H14l-.38-2.7h-1.7l-.38 2.7h-1.9l2.76-8H15zM14.2 14h-1.3L12.5 9h.1z" /></svg>
const JsIcon = (props: React.SVGProps<SVGSVGElement>) => <svg {...props} viewBox="0 0 24 24"><path fill="currentColor" d="M3 3h18v18H3zm3.23 11.25h2.12v-3.1h-2.12zm-1.07 1.07h4.24v-5.24H5.16zm7.98-1.78v-1.63h1.34v-1.1h-1.34V8.5h-1.6v1.33h-1.07v1.1h1.07v1.63c0 .8.2 1.34.6 1.63c.4.29.9.44 1.48.44c.48 0 .88-.07 1.2-.21l-.22-1.03c-.22.09-.45.14-.7.14c-.33 0-.58-.08-.74-.24c-.16-.16-.24-.4-.24-.72m4.61-2.48c0 .8-.23 1.45-.68 1.95s-1.03.75-1.74.75c-.75 0-1.35-.25-1.8-.75c-.45-.5-.68-1.15-.68-1.95s.23-1.45.68-1.95c.45-.5 1.05-.75 1.8-.75c.71 0 1.3.25 1.74.75c.45.5.68 1.15.68 1.95m-1.1 0c0-.5-.1-.9-.3-1.2c-.2-.3-.49-.45-.85-.45s-.65.15-.85.45c-.2.3-.3.7-.3 1.2s.1.9.3 1.2c.2.3.49.45.85.45s-.65-.15-.85-.45c-.2-.3-.3-.7-.3-1.2" /></svg>
const CppIcon = (props: React.SVGProps<SVGSVGElement>) => <svg {...props} viewBox="0 0 24 24"><path fill="currentColor" d="M3.5 12a8.5 8.5 0 0 0 8.5 8.5a8.5 8.5 0 0 0 8.5-8.5a8.5 8.5 0 0 0-8.5-8.5A8.5 8.5 0 0 0 3.5 12m14.5 0a6 6 0 0 1-6 6a6 6 0 0 1-6-6a6 6 0 0 1 6-6a6 6 0 0 1 6 6M11 11V8h2v3h3v2h-3v3h-2v-3H8v-2z" /></svg>
const TensorFlowIcon = (props: React.SVGProps<SVGSVGElement>) => <svg {...props} viewBox="0 0 24 24"><path fill="currentColor" d="M4 12v3.85c0 2.28 2.24 4.14 5 4.14s5-1.86 5-4.14V12h-2.5v3.85c0 .99-1.12 1.79-2.5 1.79s-2.5-.8-2.5-1.79V12zm13.59-4.13L15.3 10.16l-2.29-2.29l2.29-2.29l-1.06-1.06l-2.29 2.29L9.66 4.51L8.6 5.57l2.29 2.29L8.6 10.16l1.06 1.06l2.29-2.29l2.29 2.29l1.06-1.06l-2.29-2.29z" /></svg>
const PyTorchIcon = (props: React.SVGProps<SVGSVGElement>) => <svg {...props} viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"><path d="M5.963 4.432A7.16 7.16 0 0 1 12.001 2a7.16 7.16 0 0 1 6.038 2.433M5.338 8.01A7.16 7.16 0 0 0 5 12.5c0 .34.023.676.069 1.003"/><path d="M18.662 8.01A7.16 7.16 0 0 1 19 12.5a7.16 7.16 0 0 1-.069 1.003M8.47 4.752A6.643 6.643 0 0 1 12.001 4a6.643 6.643 0 0 1 3.53.752M3 13.998c0 3.867 3.134 7 7 7c.338 0 .67-.024.997-.07m4.008-.002A7.001 7.001 0 0 0 19 14c0-3.866-3.134-7-7-7a7.002 7.002 0 0 0-1.002.071"/></g></svg>
const HuggingFaceIcon = (props: React.SVGProps<SVGSVGElement>) => <svg {...props} viewBox="0 0 24 24"><path fill="currentColor" d="M20.88 14.12c-1.23 2.12-3.83 3.38-6.88 3.38s-5.65-1.26-6.88-3.38c-.09-.15-.12-.34-.12-.59c0-.26.04-.46.12-.59c.08-.13.2-.2.35-.2h13.06c.15 0 .27.07.35.2c.08.13.12.33.12.59c0 .25-.03.44-.12.59M7.12 9.33c-.12-.13-.27-.19-.46-.19c-.19 0-.34.06-.46.19c-.12.12-.18.28-.18.47c0 .19.06.34.18.47c.12.12.27.18.46.18c.19 0 .34-.06.46-.18c.12-.13.18-.28.18-.47c0-.19-.06-.35-.18-.47m9.76 0c-.12-.13-.27-.19-.46-.19c-.19 0-.34.06-.46.19c-.12.12-.18.28-.18.47c0 .19.06.34.18.47c.12.12.27.18.46.18c.19 0 .34-.06.46-.18c.12-.13.18-.28.18-.47c0-.19-.06-.35-.18-.47m-3.8-3.66c.21-.36.31-.75.31-1.16c0-.52-.18-.97-.53-1.36c-.35-.38-.8-.57-1.35-.57s-1 .19-1.35.57c-.35.39-.53.84-.53 1.36c0 .41.1.8.31 1.16z"/></svg>
const LangChainIcon = (props: React.SVGProps<SVGSVGElement>) => <svg {...props} viewBox="0 0 24 24"><path fill="currentColor" d="M12.93 21.36a1.13 1.13 0 0 1-1.13 0L3.15 16.5a1.12 1.12 0 0 1-.56-1V8.58c0-.39.2-.77.56-1l8.65-4.86a1.13 1.13 0 0 1 1.13 0l8.65 4.86c.36.23.56.61.56 1v6.92c0 .39-.2.77-.56 1ZM5.56 9.38v5.24l2.8 1.57V10.9Zm13-1.6L12.08 4.4L5.6 7.78l6.49 3.65Zm-1.1 7.42L14.66 14v-3.13L12.1 9.4l-2.55 1.44V14l-2.8-1.58v-3.25L12.1 12l5.36-3Z" /></svg>
const DockerIcon = (props: React.SVGProps<SVGSVGElement>) => <svg {...props} viewBox="0 0 24 24"><path fill="currentColor" d="M22.01 9.42c-.52-1.99-2.09-3.69-3.98-4.4c-2.3-.87-4.9-.5-7.03.95L11 6c1.1-.64 2.3-.9 3.52-.77c1.3.14 2.5 1.03 2.94 2.29l.11.33h-2.11a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2H5a2 2 0 0 0-2 2H1a2 2 0 0 0-2 2v.5a2.5 2.5 0 0 0 2.5 2.5h.5v-2H3v-1h2v-2h2v-2h4a2 2 0 0 1 2 2h2v2h2v1h2v-1.5a4.5 4.5 0 0 0-3.38-4.35l-.01.03m-17.5 7.08a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-1h-5zm5 0a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-1h-5zm5 0a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-1h-5zm5 0a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-1h-5z" /></svg>
const AwsIcon = (props: React.SVGProps<SVGSVGElement>) => <svg {...props} viewBox="0 0 24 24"><path fill="currentColor" d="M12.94 13.43c-.45.33-.95.53-1.46.61a2.86 2.86 0 0 1-2.91-2.35c-.14-.7.04-1.38.48-1.93s1.08-.91 1.83-.91c.49 0 .97.16 1.37.43l.54-.62c-.52-.35-1.12-.55-1.75-.55c-1.95 0-3.6 1.4-3.93 3.32c-.3 1.77.87 3.49 2.65 3.82c2 .36 3.88-1.03 4.28-2.96l-.6.11zm4.49-5.18c-.14-1-1.39-2.2-3.1-2.2c-1.34 0-2.5.73-3.03 1.5l.64.41c.36-.61 1.22-1.22 2.39-1.22c1.23 0 2.06.8 2.19 1.49zM22 13.54c-1.34 2.15-3.8 3.46-6.61 3.46c-3.64 0-6.55-2.4-7.1-5.63l-1.04.18c.24.16 1.33 1.04 1.33 2.4c0 .5-.17.94-.48 1.3A3.7 3.7 0 0 1 5 16.27l-.68.52c.6.67 1.42 1.06 2.31 1.06c1.1 0 2.1-.63 2.62-1.57c.22.02.43.04.65.04c3.48 0 6.45-1.87 7.9-4.52z"/></svg>
const AzureIcon = (props: React.SVGProps<SVGSVGElement>) => <svg {...props} viewBox="0 0 24 24"><path fill="currentColor" d="m13.29 4.22l-4.15 7.18l-5.35-.35a.51.51 0 0 0-.49.66l7.85 11.96a.5.5 0 0 0 .88-.01l7.68-15.04a.5.5 0 0 0-.45-.75l-6-1.65Z" /></svg>
const PostgreSqlIcon = (props: React.SVGProps<SVGSVGElement>) => <svg {...props} viewBox="0 0 24 24"><path fill="currentColor" d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2m4.14 14.19h-5.4v-5.5h2.19v3.31h3.21zm0-7.79H8.62V8.6h7.52Z" /></svg>
const MySqlIcon = (props: React.SVGProps<SVGSVGElement>) => <svg {...props} viewBox="0 0 24 24"><path fill="currentColor" d="M12.14 14.61c-1.8.09-3.32-1.05-3.83-2.65h7.62c-.5 1.6-2.01 2.74-3.79 2.65M13 3.07c-1.6.24-3.09.9-4.32 1.89l1.43 1.43C11 5.76 12 5.5 13 5.5c3.28 0 5.25 2.53 5.25 5.56h-1.5c0-2.29-1.42-4.06-3.75-4.06c-.84 0-1.63.29-2.28.78L8.9 6.01c-.53-.56-1.13-1.04-1.78-1.43C5.1 3 3 5.1 3 7.11c0 .71.18 1.38.5 2h7.75c.19-.69.45-1.35.8-1.96c1-1.72 2.2-1.95 3.2-1.95c1.28 0 2.25.88 2.25 2.25c0 .64-.23 1.25-.63 1.75c-.32.41-.72.75-1.17.94V13c.85.25 1.62.79 2.19 1.54c.71.93 1.19 2.12 1.19 3.46c0 2-1.29 4-4.5 4c-1.31 0-2.52-.41-3.5-1.1l1.48-1.48c.73.43 1.54.71 2.41.71c2.14 0 3-1.15 3-2.5c0-.85-.38-1.64-1.15-2.21c-.8-.59-1.88-.91-3.04-.91c-2.3 0-4.5 1.24-4.5 4h-1.5c0-3.21 2.39-5.25 5.25-5.25c.89 0 1.73.23 2.5.66v-1.12c-.06-.02-.12-.05-.19-.07" /></svg>
const MongoDbIcon = (props: React.SVGProps<SVGSVGElement>) => <svg {...props} viewBox="0 0 24 24"><path fill="currentColor" d="M15.75 6.375c-1.313 1-2.25 2.063-2.25 3.188s.938 2.188 2.25 3.188c1.688 1.313 3.438.313 3.438-1.563v-3.25c0-1.876-1.75-2.876-3.438-1.563m-7.5 0c-1.313 1-2.25 2.063-2.25 3.188s.938 2.188 2.25 3.188c1.688 1.313 3.438.313 3.438-1.563v-3.25c0-1.876-1.75-2.876-3.438-1.563m-.562-4.125C6 1.938 4.688 3.563 4.688 5.438c0 2.187 2.063 4.875 3.438 4.875c.437 0 .812-.188 1.125-.5.312-.313.5-.688.5-1.125V5.437c0-2.062-1.5-3.437-2.937-3.187m8.062 0C14.5 1.938 13.188 3.563 13.188 5.438c0 2.187 2.063 4.875 3.438 4.875c.437 0 .812-.188 1.125-.5.312-.313.5-.688.5-1.125V5.437c0-2.062-1.5-3.437-2.937-3.187m-4.5 16.5c-3.188 0-6.313-2.063-6.313-5.25c0-1.125.687-2.438 1.562-3.438C7.562 10 9.75 9.126 12 9.126s4.437.875 5.75 2.062c.875 1 1.562 2.313 1.562 3.438c0 3.187-3.125 5.25-6.313 5.25"/></svg>
const TableauIcon = (props: React.SVGProps<SVGSVGElement>) => <svg {...props} viewBox="0 0 24 24"><path fill="currentColor" d="M3 3h18v2H3zm0 4h7v2H3zm0 4h7v2H3zm0 4h7v2H3zm0 4h7v2H3zm9-12h7v2h-7zm0 4h7v2h-7zm0 4h7v2h-7zm0 4h7v2h-7z" /></svg>
const PowerBiIcon = (props: React.SVGProps<SVGSVGElement>) => <svg {...props} viewBox="0 0 24 24"><path fill="currentColor" d="M3 3h10v4H3zm0 6h10v12H3zm12-6h6v8h-6zm0 10h6v6h-6z" /></svg>
const MatplotlibIcon = (props: React.SVGProps<SVGSVGElement>) => <svg {...props} viewBox="0 0 24 24"><path fill="currentColor" d="M10 20v-6h4v6zm-6 0v-8h4v8zm12 0v-4h4v4zM4 2h16v2H4zm2 4h12v2H6z" /></svg>
const ExcelIcon = (props: React.SVGProps<SVGSVGElement>) => <svg {...props} viewBox="0 0 24 24"><path fill="currentColor" d="M2 2h20v20H2zm4 4h4v4H6zm6 0h4v4h-4zm-6 6h4v4H6zm6 0h4v4h-4z" /></svg>

const initialTechStacks: TechStack[] = [
  {
    category: 'Code & Core Languages',
    Icon: Code,
    technologies: [
      { name: 'Python', Icon: PythonIcon },
      { name: 'Java', Icon: JavaIcon },
      { name: 'R', Icon: RIcon },
      { name: 'SQL', Icon: Database },
      { name: 'Bash', Icon: Cpu },
      { name: 'JavaScript', Icon: JsIcon },
      { name: 'C', Icon: Code },
      { name: 'C++', Icon: CppIcon },
      { name: 'Shell', Icon: Cpu },
    ],
  },
  {
    category: 'AI/ML Toolkits',
    Icon: Layers,
    technologies: [
      { name: 'TensorFlow', Icon: TensorFlowIcon },
      { name: 'PyTorch', Icon: PyTorchIcon },
      { name: 'Scikit-learn', Icon: BrainCircuit },
      { name: 'Hugging Face', Icon: HuggingFaceIcon },
      { name: 'LangChain', Icon: LangChainIcon },
      { name: 'OpenCV', Icon: Cpu },
      { name: 'Jupyter', Icon: Cpu },
      { name: 'Streamlit', Icon: Cpu },
    ]
  },
  {
    category: 'Data Engineering & Pipeline',
    Icon: Server,
    technologies: [
      { name: 'Apache Spark', Icon: Cpu },
      { name: 'PySpark', Icon: PythonIcon },
      { name: 'Airflow', Icon: Cpu },
      { name: 'DBT', Icon: Cpu },
      { name: 'Docker', Icon: DockerIcon },
      { name: 'Kafka', Icon: Cpu },
      { name: 'ETL', Icon: Cpu },
      { name: 'ELT', Icon: Cpu },
      { name: 'Batch', Icon: Cpu },
      { name: 'Stream', Icon: Cpu },
    ]
  },
  {
    category: 'Cloud & MLOps Arsenal',
    Icon: Cloud,
    technologies: [
      { name: 'AWS S3', Icon: AwsIcon },
      { name: 'AWS Lambda', Icon: AwsIcon },
      { name: 'AWS Glue', Icon: AwsIcon },
      { name: 'Redshift', Icon: AwsIcon },
      { name: 'Azure Databricks', Icon: AzureIcon },
      { name: 'Azure ADF', Icon: AzureIcon },
      { name: 'Azure DLS', Icon: AzureIcon },
      { name: 'Git', Icon: GitBranch },
      { name: 'CI/CD', Icon: Cpu },
      { name: 'MLflow', Icon: Cpu },
      { name: 'GitHub Actions', Icon: GitBranch },
    ]
  },
  {
    category: 'Databases & Query Engines',
    Icon: Database,
    technologies: [
      { name: 'PostgreSQL', Icon: PostgreSqlIcon },
      { name: 'MySQL', Icon: MySqlIcon },
      { name: 'MSSQL', Icon: Database },
      { name: 'MongoDB', Icon: MongoDbIcon },
      { name: 'DynamoDB', Icon: AwsIcon },
      { name: 'Redshift', Icon: AwsIcon },
      { name: 'NoSQL', Icon: Database },
    ]
  },
  {
    category: 'Dashboards & Data Viz',
    Icon: AreaChart,
    technologies: [
      { name: 'Tableau', Icon: TableauIcon },
      { name: 'Power BI', Icon: PowerBiIcon },
      { name: 'Seaborn', Icon: Cpu },
      { name: 'Matplotlib', Icon: MatplotlibIcon },
      { name: 'Excel', Icon: ExcelIcon },
      { name: 'KPI Dashboards', Icon: SlidersHorizontal },
    ]
  },
];


export function TechStacks() {
  const [techStacks, setTechStacks] = useState<TechStack[]>(initialTechStacks)
  const [resumeText, setResumeText] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const { toast } = useToast()

  const handleExtract = async () => {
    if (!resumeText.trim()) {
      toast({ title: 'Error', description: 'Please paste your resume text.', variant: 'destructive' })
      return
    }
    setIsLoading(true);
    const result = await getTechStacksFromResume(resumeText);
    
    if (result.success && result.data?.techStacks) {
      const newTechStacks: TechStack[] = result.data.techStacks.map(stack => ({
        category: stack.category,
        Icon: initialTechStacks.find(s => s.category.toLowerCase().includes(stack.category.split(" ")[0].toLowerCase()))?.Icon || Cpu,
        technologies: stack.technologies.map(techName => {
          const flatInitial = initialTechStacks.flatMap(s => s.technologies);
          const foundTech = flatInitial.find(t => t.name.toLowerCase() === techName.toLowerCase());
          return {
            name: techName,
            Icon: foundTech?.Icon || Cpu
          }
        })
      }));
      setTechStacks(newTechStacks);
      toast({ title: 'Success', description: 'Tech stacks extracted and updated successfully!' });
      setIsDialogOpen(false);
    } else {
      toast({ title: 'Error', description: result.error || 'An unknown error occurred.', variant: 'destructive' });
    }
    setIsLoading(false);
  }

  return (
    <section id="tech-stacks" className="py-24 sm:py-32">
       <TooltipProvider>
        <div className="container mx-auto">
          <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-headline">My Tech Stack</h2>
              <p className="mt-4 text-lg text-muted-foreground">Technologies I use to build modern, intelligent applications.</p>
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="mt-6">
                    <Lightbulb className="mr-2 h-4 w-4" />
                    Extract from Resume
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[625px]">
                  <DialogHeader>
                    <DialogTitle>Extract Tech Stacks with AI</DialogTitle>
                    <DialogDescription>
                      Paste the text from your resume below. Our AI will analyze it and automatically populate the tech stacks section.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <Textarea
                      placeholder="Paste your resume text here..."
                      className="h-64"
                      value={resumeText}
                      onChange={(e) => setResumeText(e.target.value)}
                      disabled={isLoading}
                    />
                  </div>
                  <DialogFooter>
                    <Button type="submit" onClick={handleExtract} disabled={isLoading}>
                      {isLoading ? 'Extracting...' : 'Extract Tech Stacks'}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
          </div>

          <div className="mt-16 grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {isLoading ? (
              Array.from({ length: 6 }).map((_, i) => <TechCardSkeleton key={i} />)
            ) : (
              techStacks.map((stack) => <TechCard key={stack.category} {...stack} />)
            )}
          </div>
        </div>
      </TooltipProvider>
    </section>
  )
}

function TechCard({ category, Icon, technologies }: TechStack) {
  return (
    <Card className="flex flex-col bg-background/50 backdrop-blur-sm shadow-lg transition-transform-shadow duration-300 hover:shadow-glow-primary hover:-translate-y-1">
      <CardHeader className="flex-row items-center gap-4 space-y-0">
        <Icon className="w-8 h-8 text-primary" />
        <CardTitle className="font-headline">{category}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow pt-2">
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-x-4 gap-y-6">
          {technologies.map(({ name, Icon: TechIcon }) => (
             <Tooltip key={name}>
              <TooltipTrigger asChild>
                <div className="flex flex-col items-center justify-start gap-2">
                  <TechIcon className="w-8 h-8 text-foreground/80" />
                  <span className="text-xs text-center text-muted-foreground truncate w-full">{name}</span>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>{name}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

function TechCardSkeleton() {
  return (
    <Card className="flex flex-col">
      <CardHeader className="flex-row items-center gap-4 space-y-0">
        <Skeleton className="w-8 h-8 rounded-full" />
        <Skeleton className="h-6 w-3/4" />
      </CardHeader>
      <CardContent className="flex-grow pt-2">
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-x-4 gap-y-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="flex flex-col items-center gap-2">
              <Skeleton className="w-8 h-8 rounded-md" />
              <Skeleton className="h-4 w-12" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
