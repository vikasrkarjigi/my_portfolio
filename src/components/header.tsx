'use client'

import { Github, Linkedin, Mail, FileText, Code2 } from 'lucide-react'
import Link from 'next/link'
import { ThemeToggle } from './theme-toggle'
import { Button } from './ui/button'
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet'
import { Menu } from 'lucide-react'

const navLinks = [
  { href: '#about', label: 'About' },
  { href: '#experience', label: 'Experience' },
  { href: '#tech-stacks', label: 'Tech' },
  { href: '#projects', label: 'Projects' },
  { href: '#education', label: 'Education' },
  { href: '#contact', label: 'Contact' },
]

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
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <Github className="h-5 w-5" />
            </a>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <Linkedin className="h-5 w-5" />
            </a>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <a href="mailto:example@gmail.com" aria-label="Email">
              <Mail className="h-5 w-5" />
            </a>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <a href="/resume.pdf" download="resume.pdf" aria-label="Download Resume">
              <FileText className="h-5 w-5" />
            </a>
          </Button>
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
