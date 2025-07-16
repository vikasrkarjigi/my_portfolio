'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BrainCircuit, Cloud, Code, Database, GitBranch, Layers, Cpu, Lightbulb } from 'lucide-react'
import type { LucideIcon, LucideProps } from 'lucide-react'
import { Button } from '../ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '../ui/dialog'
import { Textarea } from '../ui/textarea'
import { useToast } from '@/hooks/use-toast'
import { getTechStacksFromResume } from '@/app/actions'
import { Skeleton } from '../ui/skeleton'

type TechItem = {
  name: string
  Icon: LucideIcon | React.FC<React.SVGProps<SVGSVGElement>>
}

type TechStack = {
  category: string
  technologies: TechItem[]
  Icon: LucideIcon
}

const initialTechStacks: TechStack[] = [
  {
    category: 'Programming Languages',
    Icon: Code,
    technologies: [
      { name: 'Python', Icon: props => <svg {...props} viewBox="0 0 24 24"><path fill="currentColor" d="M16.75 22a4.25 4.25 0 0 1-4.25-4.25V15H8v2.75A4.25 4.25 0 0 1 3.75 22H2v-1.5a2.75 2.75 0 0 1 2.75-2.75h3.5v-4h-2A4.25 4.25 0 0 1 2 9.5V2h1.5a2.75 2.75 0 0 1 2.75 2.75v3.5h4v-2A4.25 4.25 0 0 1 14.5 2H22v1.5a2.75 2.75 0 0 1-2.75 2.75h-3.5v4h2A4.25 4.25 0 0 1 22 14.5V22h-1.5a2.75 2.75 0 0 1-2.75-2.75v-3.5h-4V17.75A4.25 4.25 0 0 1 16.75 22Z" /></svg> },
      { name: 'JavaScript', Icon: props => <svg {...props} viewBox="0 0 24 24"><path fill="currentColor" d="M3 3h18v18H3zm3.23 11.25h2.12v-3.1h-2.12zm-1.07 1.07h4.24v-5.24H5.16zm7.98-1.78v-1.63h1.34v-1.1h-1.34V8.5h-1.6v1.33h-1.07v1.1h1.07v1.63c0 .8.2 1.34.6 1.63c.4.29.9.44 1.48.44c.48 0 .88-.07 1.2-.21l-.22-1.03c-.22.09-.45.14-.7.14c-.33 0-.58-.08-.74-.24c-.16-.16-.24-.4-.24-.72m4.61-2.48c0 .8-.23 1.45-.68 1.95s-1.03.75-1.74.75c-.75 0-1.35-.25-1.8-.75c-.45-.5-.68-1.15-.68-1.95s.23-1.45.68-1.95c.45-.5 1.05-.75 1.8-.75c.71 0 1.3.25 1.74.75c.45.5.68 1.15.68 1.95m-1.1 0c0-.5-.1-.9-.3-1.2c-.2-.3-.49-.45-.85-.45s-.65.15-.85.45c-.2.3-.3.7-.3 1.2s.1.9.3 1.2c.2.3.49.45.85.45s-.65-.15-.85-.45c-.2-.3-.3-.7-.3-1.2" /></svg> },
      { name: 'TypeScript', Icon: props => <svg {...props} viewBox="0 0 24 24"><path fill="currentColor" d="M3 3h18v18H3zm12.3 11.3v-5.9h-2.3v5.9h-1.9V8h6.1v6.3zm-7.6-1.5c.3.3.7.5 1.2.5s.9-.2 1.2-.5c.3-.3.5-.7.5-1.2s-.2-.9-.5-1.2c-.3-.3-.7-.5-1.2-.5s-.9.2-1.2.5c-.3.3-.5.7-.5 1.2s.2.9.5 1.2" /></svg> },
      { name: 'SQL', Icon: Database },
      { name: 'R', Icon: props => <svg {...props} viewBox="0 0 24 24"><path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2M11 17h-2V7h2v5h2v2h-2zm4.24-4.56l.76 5.56H14l-.38-2.7h-1.7l-.38 2.7h-1.9l2.76-8H15zM14.2 14h-1.3L12.5 9h.1z" /></svg> },
    ],
  },
  {
    category: 'AI/ML Frameworks',
    Icon: Layers,
    technologies: [
      { name: 'TensorFlow', Icon: props => <svg {...props} viewBox="0 0 24 24"><path fill="currentColor" d="M4 12v3.85c0 2.28 2.24 4.14 5 4.14s5-1.86 5-4.14V12h-2.5v3.85c0 .99-1.12 1.79-2.5 1.79s-2.5-.8-2.5-1.79V12zm13.59-4.13L15.3 10.16l-2.29-2.29l2.29-2.29l-1.06-1.06l-2.29 2.29L9.66 4.51L8.6 5.57l2.29 2.29L8.6 10.16l1.06 1.06l2.29-2.29l2.29 2.29l1.06-1.06l-2.29-2.29z" /></svg> },
      { name: 'PyTorch', Icon: props => <svg {...props} viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"><path d="M5.963 4.432A7.16 7.16 0 0 1 12.001 2a7.16 7.16 0 0 1 6.038 2.433M5.338 8.01A7.16 7.16 0 0 0 5 12.5c0 .34.023.676.069 1.003"/><path d="M18.662 8.01A7.16 7.16 0 0 1 19 12.5a7.16 7.16 0 0 1-.069 1.003M8.47 4.752A6.643 6.643 0 0 1 12.001 4a6.643 6.643 0 0 1 3.53.752M3 13.998c0 3.867 3.134 7 7 7c.338 0 .67-.024.997-.07m4.008-.002A7.001 7.001 0 0 0 19 14c0-3.866-3.134-7-7-7a7.002 7.002 0 0 0-1.002.071"/></g></svg> },
      { name: 'Scikit-learn', Icon: BrainCircuit },
      { name: 'Keras', Icon: props => <svg {...props} viewBox="0 0 24 24"><path fill="currentColor" d="m16.596 6.81l-3.328 6.657l-1.396-2.791l-1.928 3.856h7.712zM5 2h14v20H5zm6 4H7v14h4v-2h2v2h4v-2h-2v-2h2v-2h-2v-2h2v-2h-2v-2h-2z" /></svg> },
      { name: 'Hugging Face', Icon: props => <svg {...props} viewBox="0 0 24 24"><path fill="currentColor" d="M20.88 14.12c-1.23 2.12-3.83 3.38-6.88 3.38s-5.65-1.26-6.88-3.38c-.09-.15-.12-.34-.12-.59c0-.26.04-.46.12-.59c.08-.13.2-.2.35-.2h13.06c.15 0 .27.07.35.2c.08.13.12.33.12.59c0 .25-.03.44-.12.59M7.12 9.33c-.12-.13-.27-.19-.46-.19c-.19 0-.34.06-.46.19c-.12.12-.18.28-.18.47c0 .19.06.34.18.47c.12.12.27.18.46.18c.19 0 .34-.06.46-.18c.12-.13.18-.28.18-.47c0-.19-.06-.35-.18-.47m9.76 0c-.12-.13-.27-.19-.46-.19c-.19 0-.34.06-.46.19c-.12.12-.18.28-.18.47c0 .19.06.34.18.47c.12.12.27.18.46.18c.19 0 .34-.06.46-.18c.12-.13.18-.28.18-.47c0-.19-.06-.35-.18-.47m-3.8-3.66c.21-.36.31-.75.31-1.16c0-.52-.18-.97-.53-1.36c-.35-.38-.8-.57-1.35-.57s-1 .19-1.35.57c-.35.39-.53.84-.53 1.36c0 .41.1.8.31 1.16z"/></svg> },
    ]
  },
  {
    category: 'Cloud & DevOps',
    Icon: Cloud,
    technologies: [
      { name: 'AWS', Icon: props => <svg {...props} viewBox="0 0 24 24"><path fill="currentColor" d="M12.94 13.43c-.45.33-.95.53-1.46.61a2.86 2.86 0 0 1-2.91-2.35c-.14-.7.04-1.38.48-1.93s1.08-.91 1.83-.91c.49 0 .97.16 1.37.43l.54-.62c-.52-.35-1.12-.55-1.75-.55c-1.95 0-3.6 1.4-3.93 3.32c-.3 1.77.87 3.49 2.65 3.82c2 .36 3.88-1.03 4.28-2.96l-.6.11zm4.49-5.18c-.14-1-1.39-2.2-3.1-2.2c-1.34 0-2.5.73-3.03 1.5l.64.41c.36-.61 1.22-1.22 2.39-1.22c1.23 0 2.06.8 2.19 1.49zM22 13.54c-1.34 2.15-3.8 3.46-6.61 3.46c-3.64 0-6.55-2.4-7.1-5.63l-1.04.18c.24.16 1.33 1.04 1.33 2.4c0 .5-.17.94-.48 1.3A3.7 3.7 0 0 1 5 16.27l-.68.52c.6.67 1.42 1.06 2.31 1.06c1.1 0 2.1-.63 2.62-1.57c.22.02.43.04.65.04c3.48 0 6.45-1.87 7.9-4.52z"/></svg> },
      { name: 'GCP', Icon: props => <svg {...props} viewBox="0 0 24 24"><path fill="currentColor" d="M11.97 13.22c-.44.25-.9.4-1.36.43a2.41 2.41 0 0 1-2.45-2c-.12-.59.03-1.16.4-1.63s.89-.76 1.5-.76c.43 0 .83.13 1.15.36l.46-.52c-.44-.3-1-.46-1.47-.46c-1.65 0-3.03 1.18-3.32 2.8c-.26 1.5.73 2.94 2.24 3.22c1.7.3 3.28-.86 3.6-2.5l-.51.1Z" /><path fill="currentColor" d="M10.24 3a9.7 9.7 0 0 0-4.7 1.35L6.6 2.43L5.54 4.2L6.6 5.28l-.7.88a7.74 7.74 0 0 0-1.8 4.4H2v1.5h2.18c.4 3.1 2.65 5.58 5.48 6.13l.47 1.32l1.63-.58l-.48-1.3A7.72 7.72 0 0 0 15.9 12h5.8v-1.5h-5.71a7.7 7.7 0 0 0-5.07-6.2l1.32-.47l-.58-1.63l-1.3.47A9.63 9.63 0 0 0 10.24 3m-1.7 13.48a6.22 6.22 0 0 1-3.9-3.78h7.94a6.22 6.22 0 0 1-4.04 3.78m-2.8-5.28a6.2 6.2 0 0 1 2.8-5.22a6.32 6.32 0 0 1 4.54 1.44a6.2 6.2 0 0 1 1.08 6.1H4.66a6.2 6.2 0 0 1 1.08-2.32" /></svg> },
      { name: 'Docker', Icon: props => <svg {...props} viewBox="0 0 24 24"><path fill="currentColor" d="M22.01 9.42c-.52-1.99-2.09-3.69-3.98-4.4c-2.3-.87-4.9-.5-7.03.95L11 6c1.1-.64 2.3-.9 3.52-.77c1.3.14 2.5 1.03 2.94 2.29l.11.33h-2.11a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2H5a2 2 0 0 0-2 2H1a2 2 0 0 0-2 2v.5a2.5 2.5 0 0 0 2.5 2.5h.5v-2H3v-1h2v-2h2v-2h4a2 2 0 0 1 2 2h2v2h2v1h2v-1.5a4.5 4.5 0 0 0-3.38-4.35l-.01.03m-17.5 7.08a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-1h-5zm5 0a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-1h-5zm5 0a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-1h-5zm5 0a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-1h-5z" /></svg> },
      { name: 'Kubernetes', Icon: props => <svg {...props} viewBox="0 0 24 24"><path fill="currentColor" d="M12 2a10 10 0 0 0-7.34 16.78l.18.16l.16.18A10 10 0 0 0 12 22a10 10 0 0 0 7.34-16.78l-.18-.16l-.16-.18A10 10 0 0 0 12 2m0 1.5a8.5 8.5 0 0 1 6.24 14.24L12 11.5Z" /></svg> },
      { name: 'Terraform', Icon: props => <svg {...props} viewBox="0 0 24 24"><path fill="currentColor" d="M2 13.88V6.12L9.4 2l7.39 4.12V10L9.4 5.87L3.55 9v5.88l5.85 3.12v-4.13L3.55 11l5.85-3.13l1.76.97v2.13l-1.76-1L2 13.87M22 10.12v7.76L14.6 22l-7.4-4.12V14l7.4 4.13L20.45 15v-5.87l-5.85-3.13v4.13l5.85 2.87l-5.85 3.13l-1.76-.98v-2.12l1.76 1L22 10.12" /></svg> },
    ]
  },
  {
    category: 'Databases & Vector DB',
    Icon: Database,
    technologies: [
      { name: 'PostgreSQL', Icon: props => <svg {...props} viewBox="0 0 24 24"><path fill="currentColor" d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2m4.14 14.19h-5.4v-5.5h2.19v3.31h3.21zm0-7.79H8.62V8.6h7.52Z" /></svg> },
      { name: 'MongoDB', Icon: props => <svg {...props} viewBox="0 0 24 24"><path fill="currentColor" d="M15.75 6.375c-1.313 1-2.25 2.063-2.25 3.188s.938 2.188 2.25 3.188c1.688 1.313 3.438.313 3.438-1.563v-3.25c0-1.876-1.75-2.876-3.438-1.563m-7.5 0c-1.313 1-2.25 2.063-2.25 3.188s.938 2.188 2.25 3.188c1.688 1.313 3.438.313 3.438-1.563v-3.25c0-1.876-1.75-2.876-3.438-1.563m-.562-4.125C6 1.938 4.688 3.563 4.688 5.438c0 2.187 2.063 4.875 3.438 4.875c.437 0 .812-.188 1.125-.5.312-.313.5-.688.5-1.125V5.437c0-2.062-1.5-3.437-2.937-3.187m8.062 0C14.5 1.938 13.188 3.563 13.188 5.438c0 2.187 2.063 4.875 3.438 4.875c.437 0 .812-.188 1.125-.5.312-.313.5-.688.5-1.125V5.437c0-2.062-1.5-3.437-2.937-3.187m-4.5 16.5c-3.188 0-6.313-2.063-6.313-5.25c0-1.125.687-2.438 1.562-3.438C7.562 10 9.75 9.126 12 9.126s4.437.875 5.75 2.062c.875 1 1.562 2.313 1.562 3.438c0 3.187-3.125 5.25-6.313 5.25"/></svg> },
      { name: 'Redis', Icon: props => <svg {...props} viewBox="0 0 24 24"><path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2M7.07 17.22l2.83-2.83H7.07zm0-4.24h2.83l-2.83-2.83zm0-4.24l2.83 2.83V5.78zM12 18v-4.59l-1.77 1.77L9.8 14.7l3.6-3.6l.71.71l-2.89 2.89H17v1.4h-4.17L14.6 18zm1.06-9.18L10.24 6H17v1.4h-5.5l1.75 1.75l-.43.43z"/></svg> },
      { name: 'Pinecone', Icon: props => <svg {...props} viewBox="0 0 24 24"><path fill="currentColor" d="M12 2c-3 0-5.5 1.5-5.5 1.5v3.25c0 1.25 1 2.25 1 2.25l-2.5 4s-1-1-1-3.5C4 7.75 2 9.5 2 9.5l3.5 6s-2 3.5-2 3.5L12 22l8.5-3s-2-3.5-2-3.5l3.5-6s-2-1.75-2-1.75c0-2.5-1-3.5-1-3.5l-2.5-4s1-1 1-2.25V3.5C17.5 3.5 15 2 12 2m0 2c1.05 0 2.5.5 2.5.5v1.5s-.95 1.5-2.5 1.5s-2.5-1.5-2.5-1.5V4.5s1.45-.5 2.5-.5m-3.5 13.5L12 19l3.5-1.5L12 16z" /></svg> },
      { name: 'FAISS', Icon: GitBranch },
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
            <div key={name} className="flex flex-col items-center justify-start gap-2">
              <TechIcon className="w-8 h-8 text-foreground/80" />
              <span className="text-xs text-center text-muted-foreground truncate w-full">{name}</span>
            </div>
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