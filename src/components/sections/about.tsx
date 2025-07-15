import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function About() {
  return (
    <section id="about" className="container mx-auto py-24 sm:py-32">
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl font-headline">
          Hi, I&apos;m a Developer & AI Enthusiast
        </h1>
        <p className="mt-6 text-lg leading-8 text-foreground/80">
          I specialize in building intelligent applications and scalable data solutions. With a passion for machine learning and cloud technologies, I transform complex problems into elegant, efficient code.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <a href="#projects">
            <Button className="group shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-shadow">
              View My Work
              <ArrowRight className="inline-block w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </a>
          <a href="#contact">
            <Button variant="ghost">
              Get in Touch <span aria-hidden="true">→</span>
            </Button>
          </a>
        </div>
      </div>
    </section>
  )
}
