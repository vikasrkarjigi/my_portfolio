

'use client'

import { Github, Linkedin, Mail, FileText, Download } from 'lucide-react'
import Link from 'next/link'
import { ThemeToggle } from './theme-toggle'
import { Button } from './ui/button'
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet'
import { Menu } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import Image from 'next/image'
import { useState } from 'react'

const navLinks = [
  { href: '#hero', label: 'Home' },
  { href: '#about-me', label: 'About' },
  { href: '#tech-stacks', label: 'Tech' },
  { href: '#experience', label: 'Experience' },
  { href: '#projects', label: 'Projects' },
  { href: '#education', label: 'Education' },
  { href: '#contact', label: 'Contact' },
]

const rawResumeUrl = "https://raw.githubusercontent.com/vikasrkarjigi/resumes/main/Vikas_Ravikumar_Karjigi_Resume.pdf";
const profileImageUrl = "https://raw.githubusercontent.com/vikasrkarjigi/resumes/main/Profile%20Photo_1.jpeg";

export function Header() {
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <div className="mr-4 flex items-center">
            <Dialog>
                <DialogTrigger asChild>
                    <Avatar className="h-8 w-8 cursor-pointer md:mr-2">
                      <AvatarImage src={profileImageUrl} alt="Vikas Ravikumar Karjigi" className="object-cover scale-105"/>
                      <AvatarFallback>VK</AvatarFallback>
                    </Avatar>
                </DialogTrigger>
                <DialogContent className="p-0 w-auto max-w-md bg-transparent border-0">
                    <DialogHeader>
                        <DialogTitle className="sr-only">Profile Picture</DialogTitle>
                    </DialogHeader>
                    <Image src={profileImageUrl} alt="Vikas Ravikumar Karjigi" width={500} height={500} className="rounded-lg object-cover" />
                </DialogContent>
            </Dialog>
            <Link href="/" className="flex items-center space-x-2">
                <span className="font-bold sm:inline-block ml-2">Karjigi</span>
            </Link>
        </div>
        
        <nav className="hidden md:flex items-center gap-6 text-sm ml-6">
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
            <a href="mailto:vikasravikarjigi26@gmail.com" aria-label="Email">
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
                <DialogHeader className="p-4 border-b flex-shrink-0 flex flex-row items-center justify-between">
                    <DialogTitle>Resume - Vikas Ravikumar Karjigi</DialogTitle>
                    <a href={rawResumeUrl} download="Vikas_Ravikumar_Karjigi_Resume.pdf" target="_blank" rel="noopener noreferrer">
                        <Button variant="outline" size="sm">
                            <Download className="h-4 w-4 mr-2" />
                            Download
                        </Button>
                    </a>
                </DialogHeader>
                <div className="flex-grow overflow-auto">
                    <iframe 
                        src={rawResumeUrl} 
                        className="w-full h-full" 
                        allow="autoplay"
                        title="Vikas Ravikumar Karjigi Resume"
                    >
                        Your browser does not support iframes. Please <a href={rawResumeUrl} target="_blank" rel="noopener noreferrer">download the resume</a> to view it.
                    </iframe>
                </div>
            </DialogContent>
          </Dialog>

          <ThemeToggle />

          <div className="md:hidden">
           <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
                <div className="flex items-center space-x-2 mb-6 border-b pb-4">
                     <Avatar className="h-8 w-8">
                        <AvatarImage src={profileImageUrl} alt="Vikas Ravikumar Karjigi" className="object-cover scale-105"/>
                        <AvatarFallback>VK</AvatarFallback>
                    </Avatar>
                    <Link href="/" onClick={() => setIsSheetOpen(false)}>
                        <span className="font-bold">Karjigi</span>
                    </Link>
                </div>
                <nav className="flex flex-col items-start gap-4 text-lg">
                    {navLinks.map((link) => (
                    <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setIsSheetOpen(false)}
                        className="transition-colors hover:text-foreground/80 text-foreground/60 w-full"
                    >
                        {link.label}
                    </Link>
                    ))}
                </nav>
            </SheetContent>
          </Sheet>
        </div>
        </div>
      </div>
    </header>
  )
}
