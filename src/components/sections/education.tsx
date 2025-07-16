import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { GraduationCap } from "lucide-react"

const educationData = [
  {
    institution: "University of Technology",
    degree: "M.S. in Computer Science",
    period: "2017 - 2019",
    details: "Specialized in Artificial Intelligence and Machine Learning. Thesis on 'Scalable Deep Learning Models'."
  },
  {
    institution: "State University",
    degree: "B.S. in Software Engineering",
    period: "2013 - 2017",
    details: "Graduated with honors. Coursework included Data Structures, Algorithms, and Database Systems."
  }
]

export function Education() {
  return (
    <section id="education" className="py-24 sm:py-32">
      <div className="container mx-auto">
        <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-headline">Education</h2>
            <p className="mt-4 text-lg text-primary">My academic background and qualifications.</p>
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {educationData.map((edu, index) => (
            <Card key={index} className="flex items-start p-6 bg-background/50 backdrop-blur-sm shadow-lg">
              <div className="mr-6 flex-shrink-0">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <GraduationCap className="h-6 w-6" />
                </div>
              </div>
              <div>
                <CardTitle className="font-headline">{edu.degree}</CardTitle>
                <CardDescription className="mt-1">{edu.institution}</CardDescription>
                <p className="mt-2 text-sm text-muted-foreground">{edu.period}</p>
                <p className="mt-2 text-sm text-foreground/80">{edu.details}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
