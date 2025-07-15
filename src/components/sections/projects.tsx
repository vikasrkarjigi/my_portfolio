import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const projectsData = {
  dataScientist: [
    {
      title: "Customer Churn Prediction",
      description: "Developed a model to predict customer churn, achieving 92% accuracy and helping to reduce monthly churn rates.",
      tools: ["Python", "Scikit-learn", "Pandas", "GCP"],
      image: "https://placehold.co/600x400.png",
      aiHint: "data visualization"
    },
    {
      title: "Sentiment Analysis API",
      description: "Built and deployed a real-time sentiment analysis API for social media comments using advanced NLP techniques.",
      tools: ["TensorFlow", "Hugging Face", "FastAPI", "Docker"],
      image: "https://placehold.co/600x400.png",
      aiHint: "social media"
    },
  ],
  dataEngineer: [
    {
      title: "Scalable Data Pipeline",
      description: "Architected and implemented a batch data pipeline on AWS to process terabytes of daily user data for analytics.",
      tools: ["Apache Spark", "Airflow", "AWS S3", "Redshift"],
      image: "https://placehold.co/600x400.png",
      aiHint: "data pipeline"
    },
     {
      title: "Real-time Streaming Platform",
      description: "Engineered a low-latency data streaming platform using Kafka and Flink for real-time fraud detection.",
      tools: ["Kafka", "Apache Flink", "PostgreSQL", "Kubernetes"],
      image: "https://placehold.co/600x400.png",
      aiHint: "server network"
    }
  ],
  dataAnalyst: [
    {
      title: "Sales Performance Dashboard",
      description: "Created an interactive dashboard in Tableau to visualize sales performance, leading to a 15% increase in cross-selling.",
      tools: ["Tableau", "SQL", "Excel"],
      image: "https://placehold.co/600x400.png",
      aiHint: "business dashboard"
    },
  ],
}

export function Projects() {
  return (
    <section id="projects" className="bg-muted/40 py-24 sm:py-32">
      <div className="container mx-auto">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-headline">Projects</h2>
          <p className="mt-4 text-lg text-muted-foreground">A selection of my work across different domains.</p>
        </div>

        <Tabs defaultValue="dataScientist" className="mt-12">
          <TabsList className="grid w-full grid-cols-1 md:w-1/2 md:mx-auto md:grid-cols-3">
            <TabsTrigger value="dataScientist">Data Scientist</TabsTrigger>
            <TabsTrigger value="dataEngineer">Data Engineer</TabsTrigger>
            <TabsTrigger value="dataAnalyst">Data Analyst</TabsTrigger>
          </TabsList>

          <TabsContent value="dataScientist">
            <div className="grid gap-8 md:grid-cols-2 mt-8">
              {projectsData.dataScientist.map((project, index) => (
                <ProjectCard key={index} {...project} />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="dataEngineer">
            <div className="grid gap-8 md:grid-cols-2 mt-8">
              {projectsData.dataEngineer.map((project, index) => (
                <ProjectCard key={index} {...project} />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="dataAnalyst">
            <div className="grid gap-8 md:grid-cols-2 mt-8">
              {projectsData.dataAnalyst.map((project, index) => (
                <ProjectCard key={index} {...project} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}

type ProjectCardProps = {
  title: string;
  description: string;
  tools: string[];
  image: string;
  aiHint: string;
};

function ProjectCard({ title, description, tools, image, aiHint }: ProjectCardProps) {
  return (
    <Card className="overflow-hidden transition-transform-shadow duration-300 hover:shadow-glow-accent hover:-translate-y-1">
      <CardHeader className="p-0">
        <div className="aspect-video overflow-hidden">
          <Image
            src={image}
            alt={`Project image for ${title}`}
            width={600}
            height={400}
            className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
            data-ai-hint={aiHint}
          />
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <CardTitle className="mb-2 font-headline">{title}</CardTitle>
        <p className="text-sm text-muted-foreground mb-4">{description}</p>
        <div className="flex flex-wrap gap-2">
          {tools.map(tool => (
            <Badge key={tool} variant="secondary">{tool}</Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
