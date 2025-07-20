'use client'

import { Card, CardContent } from "@/components/ui/card"
import { Award } from "lucide-react"
import Link from "next/link"
import React, { useEffect, useState } from "react"
import { Skeleton } from "../ui/skeleton"

type Certification = {
  name: string
  issuer: string
  date: string
  imageURL: string
  credentialID: string
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
        setCertifications([]); // Set to empty array on error
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
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-headline">Licenses & Certifications</h2>
              <p className="mt-2 text-lg text-primary transition-all duration-300 hover:[text-shadow:0_0_15px_hsl(var(--primary))]">Validating my skills and expertise.</p>
          </div>
          <Card className="mt-12 bg-card/50">
            <CardContent className="p-0">
              <ul className="divide-y divide-border">
                {Array.from({ length: 5 }).map((_, index) => (
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
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-headline">Licenses & Certifications</h2>
            <p className="mt-2 text-lg text-primary transition-all duration-300 hover:[text-shadow:0_0_15px_hsl(var(--primary))]">Validating my skills and expertise.</p>
        </div>
        <Card className="mt-12 bg-card/50">
          <CardContent className="p-0">
            <ul className="divide-y divide-border">
              {certifications.map((cert, index) => (
                <li key={`${cert.name}-${index}`} className="p-6">
                  <Link href={cert.imageURL} target="_blank" rel="noopener noreferrer" className="group flex items-start">
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
