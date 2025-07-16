import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { AnimatedTextSwitcher } from "../animated-text-switcher"
import Link from "next/link";

export function Hero() {
  const roles = ["Data Scientist", "AI/ML Engineer", "Data Engineer", "Data Analyst"];

  return (
    <section id="hero" className="container relative mx-auto py-24 sm:py-32">
       <div aria-hidden="true" className="absolute inset-0 -z-10 -top-40 [mask-image:radial-gradient(100%_100%_at_top,white,transparent)]">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent via-transparent"></div>
        </div>
      
      <div className="text-center lg:text-left">
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl font-headline">
          <span className="block">Hi, I&apos;m</span>
          <span className="block text-primary transition-all duration-300 hover:[text-shadow:0_0_15px_hsl(var(--primary))]">Vikas Ravikumar Karjigi</span>
        </h1>
        <div className="mt-6 text-2xl font-semibold leading-8 text-foreground/80 h-8">
            <AnimatedTextSwitcher phrases={roles} />
        </div>
        <div className="mt-10 flex items-center justify-center lg:justify-start gap-x-6">
          <Link href="#projects">
            <Button className="group transition-shadow duration-300 hover:shadow-glow-primary">
              View My Work
              <ArrowRight className="inline-block w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
          <Link href="#contact">
            <Button variant="ghost">
              Get in Touch <span aria-hidden="true">→</span>
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
