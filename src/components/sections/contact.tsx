import { Button } from "@/components/ui/button"
import { Linkedin, Mail } from "lucide-react"

export function Contact() {
  return (
    <section id="contact" className="py-24 sm:py-32">
      <div className="container mx-auto">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-headline">Get in Touch</h2>
          <p className="mt-4 text-lg text-primary">
            I'm currently open to new opportunities and collaborations. Let's connect!
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="mailto:example@gmail.com" className="w-full sm:w-auto">
              <Button size="lg" className="w-full shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-shadow">
                <Mail className="mr-2 h-5 w-5" /> Email Me
              </Button>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
              <Button size="lg" variant="secondary" className="w-full">
                <Linkedin className="mr-2 h-5 w-5" /> Connect on LinkedIn
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
