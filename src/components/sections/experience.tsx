import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const experiences = [
  {
    company: "Pro-Vigil",
    role: "AI/ML Engineer",
    period: "Jul 2021 - Present",
    description: "Developed and deployed a real-time surveillance system for object detection and classification. Engineered MLOps pipelines on GCP, improving model deployment frequency by 40%.",
    tags: ["Python", "PyTorch", "GCP", "Docker", "Kubernetes", "Computer Vision"]
  },
  {
    company: "Pro-Vigil",
    role: "Data Scientist",
    period: "Feb 2021 - Jul 2021",
    description: "Built predictive models to identify false alarms, reducing them by 25%. Conducted exploratory data analysis to inform feature engineering and model development.",
    tags: ["Python", "Scikit-learn", "SQL", "Tableau", "Pandas"]
  },
  {
    company: "Allstate",
    role: "Data Scientist",
    period: "Jan 2020 - Aug 2020",
    description: "Developed a text-classification model to categorize customer feedback, improving response times. Automated data processing workflows using Python and internal APIs.",
    tags: ["Python", "NLP", "Pandas", "Scikit-learn", "API"]
  },
  {
    company: "Allstate",
    role: "Data Science Intern",
    period: "Jun 2019 - Aug 2019",
    description: "Assisted in the development of a fraud detection algorithm by analyzing patterns in claims data. Presented findings to senior data scientists.",
    tags: ["Python", "R", "SQL", "Data Analysis"]
  },
  {
    company: "The University of Texas at Dallas",
    role: "Graduate Teaching Assistant",
    period: "Jan 2019 - Dec 2019",
    description: "Assisted professors in teaching courses on Database Systems and Algorithms. Graded assignments, conducted lab sessions, and provided support to over 100 students.",
    tags: ["SQL", "Java", "Python", "Data Structures", "Algorithms"]
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
