import { Card, CardTitle, CardDescription } from "@/components/ui/card"
import { GraduationCap } from "lucide-react"

const educationData = [
  {
    institution: "Illinois Institute of Technology, Chicago, IL, USA",
    degree: "Master of Applied Science in Data Science",
    period: "Aug 2024 – Present",
    gpa: "GPA: 4.0/4.0",
    details: "Core Courses: Big Data Technologies, Data Preparation and Analysis, Regression, Machine Learning, Time Series, Monte Carlo Methods, Project Management."
  },
  {
    institution: "RV College of Engineering, Bengaluru, India",
    degree: "Bachelor of Engineering in Electronics and Communication",
    period: "Aug 2018 – Aug 2022",
    details: "Completed comprehensive coursework in electronics, communication systems, and signal processing."
  }
]

export function Education() {
  return (
    <section id="education" className="py-24 sm:py-32">
      <div className="container mx-auto">
        <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-headline">Education</h2>
            <p className="mt-2 text-lg text-primary">My academic background and qualifications.</p>
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {educationData.map((edu, index) => (
            <Card key={index} className="flex items-start p-6 bg-background/50 backdrop-blur-sm shadow-lg transition-transform-shadow duration-300 hover:shadow-glow-primary hover:-translate-y-1">
              <div className="mr-6 flex-shrink-0">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <GraduationCap className="h-6 w-6" />
                </div>
              </div>
              <div>
                <CardTitle className="font-headline text-xl">{edu.degree}</CardTitle>
                <CardDescription className="mt-1">{edu.institution}</CardDescription>
                <div className="mt-2 flex items-center justify-between text-sm text-muted-foreground">
                  <span>{edu.period}</span>
                  {edu.gpa && <span className="font-semibold">{edu.gpa}</span>}
                </div>
                <p className="mt-4 text-sm text-foreground/80">{edu.details}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
