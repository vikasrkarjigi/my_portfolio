
'use client'

import { Card, CardContent } from "@/components/ui/card"
import { Award, ExternalLink } from "lucide-react"
import React, { useEffect, useState } from "react"
import { Skeleton } from "../ui/skeleton"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import Image from "next/image"
import { Button } from "../ui/button"

type Certification = {
  title: string
  issuer: string
  issueDate: string
  imageURL: string
  credentialURL: string | null
}

const jsonUrl = "https://raw.githubusercontent.com/vikasrkarjigi/karjigi_portfolio/main/certifications/certifications.json";

export function Certifications() {
  const [certifications, setCertifications] = useState<Certification[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchCertifications = async () => {
      try {
        const response = await fetch(jsonUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (data && Array.isArray(data.certifications)) {
          setCertifications(data.certifications);
        } else {
          console.error("Fetched data is not in the expected format.");
          setCertifications([]);
        }
      } catch (error) {
        console.error("Failed to fetch certifications:", error);
        setCertifications([]); 
      } finally {
        setIsLoading(false);
      }
    };

    fetchCertifications();
  }, []);

  if (isLoading) {
    return (
      <section id="certifications" className="bg-muted/40 py-24 sm:py-32">
        <div className="container mx-auto">
          <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-headline">Certifications</h2>
              <p className="mt-2 text-lg text-primary transition-all duration-300 hover:[text-shadow:0_0_15px_hsl(var(--primary))]">Validating my skills and expertise.</p>
          </div>
          <Card className="mt-12 bg-card/50">
            <CardContent className="p-0">
              <ul className="divide-y divide-border">
                {Array.from({ length: 4 }).map((_, index) => (
                  <li key={index} className="p-6">
                    <div className="flex items-start">
                      <Skeleton className="h-10 w-10 flex-shrink-0 mr-4 mt-1" />
                      <div className="flex-grow space-y-2">
                        <Skeleton className="h-5 w-3/4" />
                        <Skeleton className="h-4 w-1/2" />
                        <Skeleton className="h-4 w-1/3" />
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>
    )
  }

  if (certifications.length === 0) {
    return null; 
  }
  
  return (
    <section id="certifications" className="bg-muted/40 py-24 sm:py-32">
      <div className="container mx-auto">
        <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-headline">Certifications</h2>
            <p className="mt-2 text-lg text-primary transition-all duration-300 hover:[text-shadow:0_0_15px_hsl(var(--primary))]">Validating my skills and expertise.</p>
        </div>
        <Card className="mt-12 bg-card/50">
          <CardContent className="p-0">
            <ul className="divide-y divide-border">
              {certifications.map((cert, index) => (
                <li key={`${cert.title}-${index}`}>
                  <Dialog>
                    <DialogTrigger asChild>
                      <div className="p-6 cursor-pointer hover:bg-muted/50 transition-colors group flex items-start">
                        <Award className="h-10 w-10 flex-shrink-0 text-accent mr-4 mt-1" />
                        <div className="flex-grow">
                          <p className="font-semibold text-foreground group-hover:text-primary transition-colors">{cert.title}</p>
                          <p className="text-sm text-muted-foreground">{cert.issuer}</p>
                          <p className="text-sm text-muted-foreground">Issued {cert.issueDate}</p>
                        </div>
                         {cert.credentialURL && (
                            <a href={cert.credentialURL} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="ml-4 self-center">
                                <Button variant="ghost" size="sm">
                                    View Credential
                                    <ExternalLink className="ml-2 h-4 w-4" />
                                </Button>
                            </a>
                        )}
                      </div>
                    </DialogTrigger>
                    <DialogContent className="p-0 max-w-4xl h-auto bg-transparent border-0">
                       <DialogHeader className="sr-only">
                         <DialogTitle>{cert.title}</DialogTitle>
                       </DialogHeader>
                       <Image
                        src={cert.imageURL}
                        alt={`Certificate for ${cert.title}`}
                        width={1200}
                        height={800}
                        className="rounded-lg object-contain w-full h-full"
                      />
                    </DialogContent>
                  </Dialog>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
