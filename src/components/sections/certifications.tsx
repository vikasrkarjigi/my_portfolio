import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Award } from "lucide-react"
import Link from "next/link"

const certificationsData = [
  {
    name: "Certified Kubernetes Application Developer (CKAD)",
    issuer: "The Linux Foundation",
    date: "Issued Aug 2023",
    link: "https://raw.githubusercontent.com/vikasrkarjigi/karjigi_portfolio/main/certifications/CKAD%20-%20Certified%20Kubernetes%20Application%20Developer.pdf"
  },
  {
    name: "Meta Database Engineer",
    issuer: "Meta",
    date: "Issued Jul 2023",
    link: "https://raw.githubusercontent.com/vikasrkarjigi/karjigi_portfolio/main/certifications/Meta%20-%20Database%20Engineer.pdf"
  },
  {
    name: "AWS Certified Machine Learning - Specialty",
    issuer: "Amazon Web Services",
    date: "Issued Jun 2022",
    link: "https://raw.githubusercontent.com/vikasrkarjigi/karjigi_portfolio/main/certifications/AWS%20Certified%20Machine%20Learning%20-%20Specialty.pdf"
  },
    {
    name: "AWS Certified Cloud Practitioner",
    issuer: "Amazon Web Services",
    date: "Issued Mar 2022",
    link: "https://raw.githubusercontent.com/vikasrkarjigi/karjigi_portfolio/main/certifications/AWS%20Certified%20Cloud%20Practitioner.pdf"
  },
  {
    name: "TensorFlow Developer Certificate",
    issuer: "Google",
    date: "Issued Dec 2021",
    link: "https://raw.githubusercontent.com/vikasrkarjigi/karjigi_portfolio/main/certifications/Google%20-%20TensorFlow%20Developer%20Certificate.pdf"
  },
  {
    name: "Meta Version Control",
    issuer: "Meta",
    date: "Issued Dec 2021",
    link: "https://raw.githubusercontent.com/vikasrkarjigi/karjigi_portfolio/main/certifications/Meta%20-%20Version%20Control.pdf"
  },
]

export function Certifications() {
  return (
    <section id="certifications" className="bg-muted/40 py-24 sm:py-32">
      <div className="container mx-auto">
        <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-headline">Licenses & Certifications</h2>
            <p className="mt-2 text-lg text-primary transition-all duration-300 hover:[text-shadow:0_0_15px_hsl(var(--primary))]">Validating my skills and expertise.</p>
        </div>
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
