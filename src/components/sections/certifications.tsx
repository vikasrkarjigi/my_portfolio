import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Award } from "lucide-react"
import Link from "next/link"

const certificationsData = [
  {
    name: "AWS Certified Machine Learning - Specialty",
    issuer: "Amazon Web Services",
    date: "Issued Jun 2022",
    link: "#"
  },
  {
    name: "TensorFlow Developer Certificate",
    issuer: "Google",
    date: "Issued Dec 2021",
    link: "#"
  },
  {
    name: "Certified Kubernetes Application Developer (CKAD)",
    issuer: "The Linux Foundation",
    date: "Issued Aug 2023",
    link: "#"
  },
]

export function Certifications() {
  return (
    <section id="certifications" className="bg-muted/40 py-24 sm:py-32">
      <div className="container mx-auto">
        <h2 className="text-center text-3xl font-bold tracking-tight sm:text-4xl font-headline">Licenses & Certifications</h2>
        <Card className="mt-12 bg-card/50">
          <CardContent className="p-0">
            <ul className="divide-y divide-border">
              {certificationsData.map((cert, index) => (
                <li key={index} className="p-6">
                  <Link href={cert.link} target="_blank" rel="noopener noreferrer" className="group flex items-start">
                    <Award className="h-10 w-10 flex-shrink-0 text-accent mr-4 mt-1" />
                    <div className="flex-grow">
                      <p className="font-semibold text-foreground group-hover:text-primary transition-colors">{cert.name}</p>
                      <p className="text-sm text-muted-foreground">{cert.issuer}</p>
                      <p className="text-sm text-muted-foreground">{cert.date}</p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
