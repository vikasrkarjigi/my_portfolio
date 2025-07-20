import { Button } from "@/components/ui/button"
import { Linkedin, Mail } from "lucide-react"

export function Contact() {
  return (
    <section id="contact" className="py-24 sm:py-32">
      <div className="container mx-auto">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-headline">Get in Touch</h2>
          <p className="mt-2 text-lg text-primary transition-all duration-300 hover:[text-shadow:0_0_15px_hsl(var(--primary))]">
            I'm currently open to new opportunities and collaborations. Let's connect!
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="mailto:vikasravikarjigi26@gmail.com" className="w-full sm:w-auto">
              <Button size="lg" className="w-full shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-shadow">
                <Mail className="mr-2 h-5 w-5" /> Email Me
              </Button>
            </a>
            <a href="https://www.linkedin.com/in/vikasrkarjigi/" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
              <Button size="lg" variant="ghost" className="w-full relative overflow-hidden group">
                <span className="absolute inset-0 bg-gradient-to-r from-primary to-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                <span className="relative z-10 flex items-center">
                    <Linkedin className="mr-2 h-5 w-5" /> Connect on LinkedIn
                </span>
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
