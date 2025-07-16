import { Trophy } from "lucide-react"

const GuitarIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M9 18V5l12-2v13"/>
      <path d="M9 9s-1.5-1.5-3-1.5-3 1.5-3-1.5S1.5 9 1.5 10.5 3 12 3 12s1.5 1.5 3 1.5 3-1.5 3-1.5"/>
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

export function AboutMe() {
  return (
    <section id="about-me" className="relative bg-muted/40 py-24 sm:py-32 overflow-hidden">
        <div className="absolute inset-0 -z-10 text-primary/5 [filter:blur(18px)]">
            <GuitarIcon className="absolute w-64 h-64 top-10 left-[-5rem] opacity-50 rotate-[30deg]"/>
            <ChessKnightIcon className="absolute w-72 h-72 bottom-[-5rem] right-[-6rem] opacity-50 rotate-[-20deg]"/>
            <Trophy className="absolute w-56 h-56 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-30"/>
        </div>

      <div className="container mx-auto max-w-4xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-primary/90 sm:text-4xl font-headline">A Little About Me</h2>
        <p className="mt-4 text-lg text-primary">Beyond the code: my story, my passions.</p>
        <div className="mt-8 space-y-6 text-lg text-foreground/80 text-left">
          <p>
            Hey there! I’m Vikas Ravikumar Karjigi, a curious and driven Data Scientist & AI/ML Engineer with 3+ years of hands-on experience turning ideas into real-world impact. Right now, I’m leveling up my skills through a Master’s in Data Science at Illinois Institute of Technology, Chicago, where I proudly hold a 4.0 GPA.
          </p>
          <p>
            I spent over two years at Boeing, building scalable pipelines and automation systems that made data work smarter. More recently, I’ve been diving into cutting-edge research on secure and decentralized LLMs. Along the way, I’ve built an AI sports highlight generator with an 88% F1 score and slashed processing time by 98% in a real-time fraud detection pipeline. I love crafting systems that are fast, smart, and actually useful.
          </p>
          <p>
            Lately, I’ve been especially excited about the rise of generative AI, LLMOps, and all things AI infrastructure. When I’m not building with code, you’ll probably find me deep in a game of chess or strumming away on my guitar. Always exploring, always creating.
          </p>
        </div>
      </div>
    </section>
  )
}
