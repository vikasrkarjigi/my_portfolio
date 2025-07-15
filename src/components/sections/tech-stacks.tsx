'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BrainCircuit, Cloud, Code, Database, GitBranch, Lightbulb, Layers, Cpu } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { Button } from '../ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '../ui/dialog'
import { Textarea } from '../ui/textarea'
import { useToast } from '@/hooks/use-toast'
import { getTechStacksFromResume } from '@/app/actions'
import { Skeleton } from '../ui/skeleton'

type TechStack = {
  category: string
  technologies: string[]
}

const initialTechStacks: TechStack[] = [
  { category: 'Programming Languages', technologies: ['Python', 'JavaScript', 'TypeScript', 'SQL', 'R'] },
  { category: 'AI/ML Frameworks', technologies: ['TensorFlow', 'PyTorch', 'Scikit-learn', 'Keras', 'Hugging Face'] },
  { category: 'AI Concepts', technologies: ['LLMs', 'NLP', 'Computer Vision', 'Reinforcement Learning'] },
  { category: 'ML Concepts', technologies: ['Supervised Learning', 'Unsupervised Learning', 'Deep Learning', 'Feature Engineering'] },
  { category: 'Cloud & DevOps / LLMOps', technologies: ['AWS', 'GCP', 'Docker', 'Kubernetes', 'Terraform'] },
  { category: 'Databases & Vector DB', technologies: ['PostgreSQL', 'MongoDB', 'Redis', 'Pinecone', 'FAISS'] }
]

const categoryIcons: { [key: string]: LucideIcon } = {
  'Programming Languages': Code,
  'AI/ML Frameworks': Layers,
  'AI Concepts': BrainCircuit,
  'ML Concepts': GitBranch,
  'Cloud & DevOps / LLMOps': Cloud,
  'Databases & Vector DB': Database,
  'default': Cpu
}

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
    setIsLoading(true)
    const result = await getTechStacksFromResume(resumeText)
    setIsLoading(false)
    if (result.success && result.data?.techStacks) {
      setTechStacks(result.data.techStacks)
      toast({ title: 'Success', description: 'Tech stacks extracted and updated successfully!' })
      setIsDialogOpen(false)
    } else {
      toast({ title: 'Error', description: result.error || 'An unknown error occurred.', variant: 'destructive' })
    }
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
            Array.from({ length: 6 }).map((_, i) => (
              <Card key={i} className="flex flex-col">
                <CardHeader>
                  <Skeleton className="h-6 w-3/4" />
                </CardHeader>
                <CardContent className="flex-grow">
                  <div className="grid grid-cols-2 gap-4">
                    {Array.from({ length: 4 }).map((_, j) => (
                       <Skeleton key={j} className="h-5 w-5/6" />
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            techStacks.map((stack) => {
              const Icon = categoryIcons[stack.category] || categoryIcons.default
              return (
                <Card key={stack.category} className="flex flex-col bg-background/50 backdrop-blur-sm shadow-lg transition-transform-shadow duration-300 hover:shadow-glow-primary hover:-translate-y-1">
                  <CardHeader className="flex-row items-center gap-4 space-y-0">
                    <Icon className="w-8 h-8 text-primary" />
                    <CardTitle className="font-headline">{stack.category}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <ul className="space-y-2 text-sm text-foreground/80">
                      {stack.technologies.map(tech => (
                        <li key={tech} className="flex items-center">
                          <span className="mr-2 text-primary">&#9679;</span>
                          {tech}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )
            })
          )}
        </div>
      </div>
    </section>
  )
}
