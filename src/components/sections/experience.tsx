import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const experiences = [
  {
    company: "FutureTech Inc.",
    role: "AI/ML Engineer",
    period: "2021 - Present",
    description: "Led the development of a recommendation engine, improving user engagement by 30%. Deployed scalable ML models on AWS SageMaker and developed CI/CD pipelines for MLOps.",
    tags: ["Python", "TensorFlow", "AWS", "Docker", "Kubernetes"]
  },
  {
    company: "DataDriven Corp.",
    role: "Data Scientist",
    period: "2019 - 2021",
    description: "Built predictive models for customer churn analysis. Performed data exploration and feature engineering on large datasets, providing actionable insights to the marketing team.",
    tags: ["R", "Scikit-learn", "SQL", "Tableau"]
  },
  {
    company: "Innovate Solutions",
    role: "Software Developer Intern",
    period: "Summer 2018",
    description: "Contributed to a full-stack web application using React and Node.js. Wrote unit tests and participated in an agile development workflow.",
    tags: ["JavaScript", "React", "Node.js", "Jest"]
  }
]

export function Experience() {
  return (
    <section id="experience" className="bg-muted/40 py-24 sm:py-32">
      <div className="container mx-auto">
        <h2 className="text-center text-3xl font-bold tracking-tight sm:text-4xl font-headline">Work Experience</h2>
        <div className="relative mt-12 grid gap-8 before:absolute before:inset-0 before:left-8 before:w-px before:bg-border md:before:left-1/2 md:before:-translate-x-1/2">
          {experiences.map((exp, index) => (
            <div key={index} className="relative md:grid md:grid-cols-2 md:gap-8">
              <div className={`flex items-center justify-start md:justify-end ${index % 2 === 0 ? 'md:order-1' : 'md:order-2'}`}>
                <div className="relative w-full">
                  <Card className="shadow-lg">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle>{exp.role}</CardTitle>
                        <p className="text-sm text-muted-foreground">{exp.period}</p>
                      </div>
                      <CardDescription>{exp.company}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-foreground/80 mb-4">{exp.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {exp.tags.map(tag => (
                          <Badge key={tag} variant="secondary">{tag}</Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                  <div className="absolute left-8 top-8 -z-10 h-4 w-4 rounded-full bg-primary shadow-glow-primary md:left-auto md:right-[-2.05rem]"></div>
                </div>
              </div>
              <div className={`hidden md:block ${index % 2 === 0 ? 'md:order-2' : 'md:order-1'}`}></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
