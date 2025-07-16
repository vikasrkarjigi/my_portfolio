import { Button } from "@/components/ui/button"
import { ArrowRight, Trophy } from "lucide-react"

const GuitarIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M9 18V5l12-2v13"/>
      <path d="M9 9s-1.5-1.5-3-1.5-3 1.5-3 1.5S1.5 9 1.5 10.5 3 12 3 12s1.5 1.5 3 1.5 3-1.5 3-1.5"/>
      <path d="M12 15s-1.5-1.5-3-1.5-3 1.5-3 1.5S4.5 15 4.5 16.5 6 18 6 18"/>
      <path d="m14 6 6 6"/>
      <path d="m11 9 6 6"/>
    </svg>
  );
  
const ChessKnightIcon = (props: React.SVGProps<SVGSVGElement>) => (
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M15.5 2.5a2.5 2.5 0 1 1-2.5 2.5 2.5 2.5 0 0 1 2.5-2.5z"/>
    <path d="M15.5 5.5c-2 0-3.5 1.5-3.5 3.5v2c0 1.5-1 3-2.5 3h-2c-1.5 0-2.5-1.5-2.5-3v-2c0-2 1.5-3.5 3.5-3.5h2"/>
    <path d="M12 14.5h-2.5c-1 0-1.5 1-1.5 2V18c0 1 .5 2 1.5 2h2c1 0 1.5-1 1.5-2v-1.5"/>
    <path d="M7 14.5c-1.5 0-2.5 1-2.5 2.5v1c0 1.5 1 2.5 2.5 2.5h1c1.5 0 2.5-1 2.5-2.5v-1c0-1.5-1-2.5-2.5-2.5h-1z"/>
</svg>
);


export function About() {
  return (
    <section id="about" className="container relative mx-auto py-24 sm:py-32 overflow-hidden">
       <div aria-hidden="true" className="absolute inset-0 -z-10 -top-40 [mask-image:radial-gradient(100%_100%_at_top,white,transparent)]">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent via-transparent"></div>
        </div>
        <div className="absolute inset-0 -z-10 text-primary/5 [filter:blur(18px)]">
            <GuitarIcon className="absolute w-64 h-64 top-10 left-[-5rem] opacity-50 rotate-[30deg]"/>
            <ChessKnightIcon className="absolute w-72 h-72 bottom-[-5rem] right-[-6rem] opacity-50 rotate-[-20deg]"/>
            <Trophy className="absolute w-56 h-56 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-30"/>
        </div>

      <div className="mx-auto max-w-3xl text-center">
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl font-headline">
          Hi, I&apos;m Vikas Karjigi
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
