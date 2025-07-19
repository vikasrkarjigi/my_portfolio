
'use client';

import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import React, { useEffect, useState } from "react";
import { getProjectsFromGithub } from "@/app/actions";
import { Skeleton } from "../ui/skeleton";
import Link from "next/link";
import { Button } from "../ui/button";
import { Github } from "lucide-react";

type Project = {
  title: string;
  description: string;
  tools: string[];
  image: string;
  category: 'dataScientist' | 'dataEngineer' | 'dataAnalyst';
  url: string;
};

type GroupedProjects = {
  dataScientist: Project[];
  dataEngineer: Project[];
  dataAnalyst: Project[];
};

type Category = keyof GroupedProjects;


export function Projects() {
  const [projects, setProjects] = useState<GroupedProjects | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [expandedCategories, setExpandedCategories] = useState<Set<Category>>(new Set());

  useEffect(() => {
    const fetchProjects = async () => {
      setIsLoading(true);
      try {
        const result = await getProjectsFromGithub("vikasrkarjigi");
        if (result.success && result.data) {
          setProjects(result.data);
        } else {
          console.error("Failed to fetch projects", result.error);
          setProjects({ dataScientist: [], dataEngineer: [], dataAnalyst: [] });
        }
      } catch (error) {
        console.error("Failed to fetch projects with error", error);
        setProjects({ dataScientist: [], dataEngineer: [], dataAnalyst: [] });
      }
      setIsLoading(false);
    };

    fetchProjects();
  }, []);

  const toggleCategory = (category: Category) => {
    setExpandedCategories(prev => {
      const newSet = new Set(prev);
      if (newSet.has(category)) {
        newSet.delete(category);
      } else {
        newSet.add(category);
      }
      return newSet;
    });
  };

  const renderProjectList = (projectList: Project[] | undefined, category: Category) => {
    if (isLoading) {
      return (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mt-8">
          <ProjectCardSkeleton />
          <ProjectCardSkeleton />
          <ProjectCardSkeleton />
        </div>
      )
    }

    if (!projectList || projectList.length === 0) {
      return <p className="text-center mt-8 text-muted-foreground">No projects found in this category.</p>
    }

    const isExpanded = expandedCategories.has(category);
    const visibleProjects = isExpanded ? projectList : projectList.slice(0, 3);

    return (
      <>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mt-8">
          {visibleProjects.map((project, index) => (
            <ProjectCard key={index} {...project} />
          ))}
        </div>
        {projectList.length > 3 && (
          <div className="mt-8 text-center">
            <Button onClick={() => toggleCategory(category)}>
              {isExpanded ? 'Show Less' : 'Show More'}
            </Button>
          </div>
        )}
      </>
    );
  }

  return (
    <section id="projects" className="bg-muted/40 py-24 sm:py-32">
      <div className="container mx-auto">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-headline">Passion Projects</h2>
          <p className="mt-2 text-lg text-primary transition-all duration-300 hover:[text-shadow:0_0_15px_hsl(var(--primary))]">Projects where the purpose, not just the technology, is the primary driver.</p>
        </div>

        <Tabs defaultValue="dataScientist" className="mt-12">
          <TabsList className="grid w-full grid-cols-1 md:w-1/2 md:mx-auto md:grid-cols-3">
            <TabsTrigger value="dataScientist">Data Scientist</TabsTrigger>
            <TabsTrigger value="dataEngineer">Data Engineer</TabsTrigger>
            <TabsTrigger value="dataAnalyst">Data Analyst</TabsTrigger>
          </TabsList>

          <TabsContent value="dataScientist">
            {renderProjectList(projects?.dataScientist, 'dataScientist')}
          </TabsContent>
          <TabsContent value="dataEngineer">
            {renderProjectList(projects?.dataEngineer, 'dataEngineer')}
          </TabsContent>
          <TabsContent value="dataAnalyst">
             {renderProjectList(projects?.dataAnalyst, 'dataAnalyst')}
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}

function ProjectCard(project: Project) {
  return (
    <Link href={project.url} target="_blank" rel="noopener noreferrer" className="group">
      <Card className="overflow-hidden transition-transform-shadow duration-300 hover:shadow-glow-accent hover:-translate-y-1 h-full flex flex-col">
        <CardHeader className="p-0">
          <div className="aspect-video overflow-hidden bg-muted flex items-center justify-center">
            <Image
              src={project.image}
              alt={`Project image for ${project.title}`}
              width={600}
              height={400}
              className="object-contain w-full h-full transition-transform duration-300"
              data-ai-hint={`${project.title} ${project.description}`}
            />
          </div>
        </CardHeader>
        <CardContent className="p-6 flex flex-col flex-grow">
          <div className="flex justify-between items-start mb-2">
            <CardTitle className="font-headline group-hover:text-primary transition-colors">{project.title}</CardTitle>
            <Github className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
          </div>
          <p className="text-sm text-muted-foreground mb-4 flex-grow">{project.description}</p>
          <div className="flex flex-wrap gap-2 mt-auto">
            {project.tools.map(tool => (
              <Badge key={tool} variant="secondary">{tool}</Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

function ProjectCardSkeleton() {
  return (
     <Card className="overflow-hidden h-full flex flex-col">
      <CardHeader className="p-0">
        <Skeleton className="w-full aspect-video" />
      </CardHeader>
      <CardContent className="p-6 flex flex-col flex-grow">
        <Skeleton className="h-6 w-3/4 mb-3" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-5/6 mb-4" />
        <div className="flex flex-wrap gap-2 mt-auto">
           <Skeleton className="h-6 w-16" />
           <Skeleton className="h-6 w-20" />
        </div>
      </CardContent>
    </Card>
  )
}
