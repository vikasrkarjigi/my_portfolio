'use client'

import { useState, useEffect, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

interface AnimatedTextSwitcherProps {
  phrases: string[]
  className?: string
}

export function AnimatedTextSwitcher({ phrases, className }: AnimatedTextSwitcherProps) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % phrases.length)
    }, 2500) // Change text every 2.5 seconds

    return () => clearInterval(interval)
  }, [phrases])

  return (
    <div className={className}>
      <AnimatePresence mode="wait">
        <motion.span
          key={phrases[index]}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="inline-block"
        >
          {phrases[index]}
        </motion.span>
      </AnimatePresence>
    </div>
  )
}
