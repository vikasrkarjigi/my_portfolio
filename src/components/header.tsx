'use client'

import { Github, Linkedin, Mail, FileText, Code2, Download } from 'lucide-react'
import Link from 'next/link'
import { ThemeToggle } from './theme-toggle'
import { Button } from './ui/button'
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet'
import { Menu } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'

const navLinks = [
  { href: '#hero', label: 'Home' },
  { href: '#about-me', label: 'About' },
  { href: '#tech-stacks', label: 'Tech' },
  { href: '#experience', label: 'Experience' },
  { href: '#projects', label: 'Projects' },
  { href: '#education', label: 'Education' },
  { href: '#contact', label: 'Contact' },
]

const resumeUrl = "https://drive.google.com/file/d/10i0OKDJ_7YfxYNuhYfCGO9-ET2MUziKr/view?usp=sharing";
const embedResumeUrl = `https://drive.google.com/file/d/10i0OKDJ_7YfxYNuhYfCGO9-ET2MUziKr/preview`;


export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Code2 className="h-6 w-6 text-primary" />
            <span className="hidden font-bold sm:inline-block">CyberPortfolio</span>
          </Link>
          <nav className="flex items-center gap-6 text-sm">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="transition-colors hover:text-foreground/80 text-foreground/60"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        
        <div className="md:hidden">
           <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
                <Link href="/" className="mr-6 flex items-center space-x-2 mb-6">
                    <Code2 className="h-6 w-6 text-primary" />
                    <span className="font-bold sm:inline-block">CyberPortfolio</span>
                </Link>
                <nav className="flex flex-col items-start gap-4 text-sm">
                    {navLinks.map((link) => (
                    <Link
                        key={link.href}
                        href={link.href}
                        className="transition-colors hover:text-foreground/80 text-foreground/60 w-full"
                    >
                        {link.label}
                    </Link>
                    ))}
                </nav>
            </SheetContent>
          </Sheet>
        </div>

        <div className="flex flex-1 items-center justify-end space-x-2">
          <Button variant="ghost" size="icon" asChild>
            <a href="https://github.com/vikasrkarjigi" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <Github className="h-5 w-5" />
            </a>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <a href="https://www.linkedin.com/in/vikasrkarjigi/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <Linkedin className="h-5 w-5" />
            </a>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <a href="mailto:example@gmail.com" aria-label="Email">
              <Mail className="h-5 w-5" />
            </a>
          </Button>

          <Dialog>
            <DialogTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="View Resume">
                    <FileText className="h-5 w-5" />
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl h-[90vh] p-0 flex flex-col">
                <DialogHeader className="p-4 border-b flex-shrink-0">
                    <DialogTitle>My Resume</DialogTitle>
                </DialogHeader>
                <div className="flex-grow overflow-auto">
                    <iframe 
                        src={embedResumeUrl} 
                        className="w-full h-full" 
                        allow="autoplay"
                        title="Vikas Ravikumar Karjigi Resume"
                    >
                        Your browser does not support iframes. Please <a href={resumeUrl} target="_blank" rel="noopener noreferrer">download the resume</a> to view it.
                    </iframe>
                </div>
            </DialogContent>
          </Dialog>

          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
