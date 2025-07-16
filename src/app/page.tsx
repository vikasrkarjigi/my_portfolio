import { Header } from "@/components/header";
import { AboutMe } from "@/components/sections/about-me";
import { Hero } from "@/components/sections/hero";
import { Certifications } from "@/components/sections/certifications";
import { Contact } from "@/components/sections/contact";
import { Education } from "@/components/sections/education";
import { Experience } from "@/components/sections/experience";
import { Projects } from "@/components/sections/projects";
import { TechStacks } from "@/components/sections/tech-stacks";

export default function Home() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header />
      <main className="flex flex-col">
        <Hero />
        <AboutMe />
        <Experience />
        <TechStacks />
        <Projects />
        <Education />
        <Certifications />
        <Contact />
      </main>
    </div>
  );
}
