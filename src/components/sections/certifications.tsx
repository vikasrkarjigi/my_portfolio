import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Award } from "lucide-react"
import Link from "next/link"

const certificationsData = [
  {
    name: "Certified Kubernetes Application Developer (CKAD)",
    issuer: "The Linux Foundation",
    date: "Issued Nov 2024",
    link: "https://raw.githubusercontent.com/vikasrkarjigi/karjigi_portfolio/main/certifications/01_CKAD_certificate.pdf",
  },
  {
    name: "Meta Database Engineer Professional Certificate",
    issuer: "Meta",
    date: "Issued Oct 2024",
    link: "https://raw.githubusercontent.com/vikasrkarjigi/karjigi_portfolio/main/certifications/02_Meta_Database_Engineer_Professional_Certificate.pdf",
  },
  {
    name: "AWS Certified Machine Learning - Specialty",
    issuer: "Amazon Web Services (AWS)",
    date: "Issued Sep 2024",
    link: "https://raw.githubusercontent.com/vikasrkarjigi/karjigi_portfolio/main/certifications/03_AWS_Certified_Machine_Learning_Specialty_certificate.pdf",
  },
  {
    name: "AWS Certified Cloud Practitioner",
    issuer: "Amazon Web Services (AWS)",
    date: "Issued Aug 2024",
    link: "https://raw.githubusercontent.com/vikasrkarjigi/karjigi_portfolio/main/certifications/04_AWS_Certified_Cloud_Practitioner_certificate.pdf",
  },
  {
    name: "TensorFlow Developer Certificate",
    issuer: "Google",
    date: "Issued Jul 2024",
    link: "https://raw.githubusercontent.com/vikasrkarjigi/karjigi_portfolio/main/certifications/05_TensorFlow_Developer_Certificate.pdf",
  },
  {
    name: "Meta Version Control",
    issuer: "Meta",
    date: "Issued Jun 2024",
    link: "https://raw.githubusercontent.com/vikasrkarjigi/karjigi_portfolio/main/certifications/06_Meta_Version_Control_certificate.pdf",
  },
  {
    name: "Google Cloud Digital Leader",
    issuer: "Google",
    date: "Issued May 2024",
    link: "https://raw.githubusercontent.com/vikasrkarjigi/karjigi_portfolio/main/certifications/07_Google_Cloud_Digital_Leader_Certificate.pdf",
  },
  {
    name: "AWS Academy Graduate - AWS Academy Cloud Foundations",
    issuer: "Amazon Web Services (AWS)",
    date: "Issued Apr 2024",
    link: "https://raw.githubusercontent.com/vikasrkarjigi/karjigi_portfolio/main/certifications/08_AWS_Academy_Graduate_AWS_Academy_Cloud_Foundations.pdf",
  },
  {
    name: "Introduction to Cybersecurity",
    issuer: "Cisco",
    date: "Issued Mar 2024",
    link: "https://raw.githubusercontent.com/vikasrkarjigi/karjigi_portfolio/main/certifications/09_Introduction_to_Cybersecurity_Cisco.pdf",
  },
];


export function Certifications() {
  if (certificationsData.length === 0) {
    return null;
  }
  
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
