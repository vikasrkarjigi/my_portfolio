
'use client'

import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { AnimatedTextSwitcher } from "../animated-text-switcher"
import Link from "next/link";
import { motion } from "framer-motion";

export function Hero() {
  const roles = ["Data Scientist", "AI/ML Engineer", "Data Engineer", "Data Analyst"];
  const name = "Vikas Ravikumar Karjigi";
  const letters = Array.from(name);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: i * 0.04 },
    }),
  };
  
  const letterVariants = {
    hidden: { 
      opacity: 0, 
      y: 20,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
     },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  const otherItemsVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
        delay: letters.length * 0.05 + 0.5, // Delay until name animation is done
      },
    },
  };


  return (
    <motion.section 
      id="hero" 
      className="container relative mx-auto py-24 sm:py-32"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
       <div aria-hidden="true" className="absolute inset-0 -z-10 -top-40 [mask-image:radial-gradient(100%_100%_at_top,white,transparent)]">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent via-transparent"></div>
        </div>
      
      <div className="text-center">
        <motion.h1 
          className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl font-headline"
          variants={otherItemsVariants}
        >
          <span className="block">Hi, I&apos;m</span>
          <motion.div
            className="animated-sparkle-text"
            aria-label={name}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <span className="block text-primary">
              {letters.map((letter, index) => (
                <motion.span key={index} variants={letterVariants} className="inline-block">
                  {letter === " " ? "\u00A0" : letter}
                </motion.span>
              ))}
            </span>
          </motion.div>
        </motion.h1>
        <motion.div 
          className="mt-6 text-2xl font-semibold leading-8 text-foreground/80 h-8"
          variants={otherItemsVariants}
        >
            <AnimatedTextSwitcher phrases={roles} />
        </motion.div>
        <motion.div 
          className="mt-10 flex items-center justify-center gap-x-6"
          variants={otherItemsVariants}
        >
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
        </motion.div>
      </div>
    </motion.section>
  )
}
