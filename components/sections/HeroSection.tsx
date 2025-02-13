"use client"

import { useEffect, useMemo, memo } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { useMousePosition } from "@/hooks/useMousePosition"
import { useTypewriter } from "@/hooks/useTypewriter"

const CodeBlock = memo(function CodeBlock() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ 
        delay: 2,
        duration: 0.3
      }}
      className="pt-2 space-y-2"
    >
      <div className="flex flex-wrap gap-1">
        <span className="text-blue-700 dark:text-blue-400">function</span>
        <span className="text-amber-700 dark:text-amber-400">Portfolio</span>
        <span className="text-zinc-800 dark:text-white">() {`{`}</span>
      </div>

      <div className="pl-2 sm:pl-4">
        <div className="flex flex-wrap gap-1">
          <span className="text-blue-700 dark:text-blue-400">return</span>
          <span className="text-zinc-800 dark:text-white">(</span>
        </div>

        <motion.div 
          className="pl-4 sm:pl-6 space-y-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.4 }}
        >
          <span className="text-purple-700 dark:text-purple-400">{`<Developer`}</span>
          
          <div className="pl-4 sm:pl-6 flex flex-wrap gap-1">
            <span className="text-sky-700 dark:text-sky-400">name</span>
            <span className="text-zinc-800 dark:text-white">=</span>
            <span className="text-emerald-700 dark:text-emerald-400">&quot;DEVIN KIM&quot;</span>
          </div>
          
          <div className="pl-4 sm:pl-6 flex flex-wrap gap-1">
            <span className="text-sky-700 dark:text-sky-400">role</span>
            <span className="text-zinc-800 dark:text-white">=</span>
            <span className="text-amber-700 dark:text-amber-400">{`{role}`}</span>
          </div>
          
          <span className="text-purple-700 dark:text-purple-400">{` />`}</span>
        </motion.div>
        
        <span className="text-zinc-800 dark:text-white">)</span>
      </div>
      
      <span className="text-zinc-800 dark:text-white">{`}`}</span>
    </motion.div>
  )
})

export default function HeroSection() {
  const { scrollY } = useScroll()
  const { x, y } = useMousePosition()
  
  const moveX = useTransform(x, [0, window.innerWidth], [-10, 10])
  const moveY = useTransform(y, [0, window.innerHeight], [-10, 10])
  const opacity = useTransform(scrollY, [0, 400], [1, 0])
  const scale = useTransform(scrollY, [0, 400], [1, 0.95])
  
  const transforms = useMemo(() => ({
    moveX,
    moveY,
    opacity,
    scale
  }), [moveX, moveY, opacity, scale])

  const importText = useTypewriter("import { Developer } from '@devin/profile'", 50)
  const roleText = useTypewriter("const role = 'Frontend Developer'", 50, 800)
  
  const PortfolioCode = useMemo(() => <CodeBlock />, [])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault()
        const aboutSection = document.getElementById("about")
        if (!aboutSection) return
        
        const aboutOffset = aboutSection.getBoundingClientRect().top + window.scrollY
        const headerHeight = 64
        
        window.scrollTo({
          top: aboutOffset - headerHeight,
          behavior: "smooth"
        })
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  const FileNameLabel = memo(function FileNameLabel() {
    return (
      <span 
        className="text-xs text-primary ml-2 select-none hidden sm:inline-block"
        aria-hidden="true"
      >
        devin-down.js
      </span>
    )
  })

  return (
    <>
      <div className="w-full h-screen" aria-hidden="true" />
      
      <section 
        id="hero"
        className="fixed inset-0 w-full min-h-screen overflow-hidden -mt-16"
      >
        <motion.div 
          className="absolute inset-0"
          style={{ opacity: transforms.opacity }}
          initial={false}
        >
          <div className="absolute inset-0 bg-grid-small-black/[0.05] dark:bg-grid-small-white/[0.05]" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/80 to-background" />
          <div className="absolute inset-0 bg-gradient-radial from-primary/5 via-transparent to-transparent" />
        </motion.div>

        <motion.div 
          className="relative h-screen flex flex-col items-center justify-center"
          style={{ opacity: transforms.opacity, scale: transforms.scale }}
        >
          <motion.div
            className="w-full max-w-3xl mx-auto px-4"
            style={{ x: transforms.moveX, y: transforms.moveY }}
          >
            <div className="rounded-lg border bg-card/30 backdrop-blur-sm overflow-hidden shadow-lg">
              <div className="border-b px-4 py-3 flex items-center justify-between bg-foreground/5">
                <div className="flex items-center gap-2">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/80 hover:bg-red-500 transition-colors" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80 hover:bg-yellow-500 transition-colors" />
                    <div className="w-3 h-3 rounded-full bg-green-500/80 hover:bg-green-500 transition-colors" />
                  </div>
                  <FileNameLabel />
                </div>
                <div className="text-xs text-primary">
                  <span className="px-2 py-1 rounded-md bg-background/80">main</span>
                </div>
              </div>

              <div className="p-4 sm:p-6 space-y-4 font-mono text-xs sm:text-sm overflow-x-auto">
                <motion.div className="group whitespace-nowrap sm:whitespace-normal">
                  <span className="text-zinc-800 dark:text-white">{importText}</span>
                </motion.div>

                <motion.div className="group whitespace-nowrap sm:whitespace-normal">
                  <span className="text-zinc-800 dark:text-white">{roleText}</span>
                </motion.div>

                {PortfolioCode}
              </div>
            </div>
          </motion.div>

          <motion.div
            className="absolute bottom-8 sm:bottom-12 flex flex-col items-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.8 }}
          >
            <span className="text-sm text-muted-foreground font-mono text-center px-4">
              Scroll <kbd className="px-2 py-0.5 rounded bg-muted">↓</kbd> to DEVIN DOWN
            </span>
            <motion.div
              className="w-1 h-8 sm:h-12 rounded-full bg-gradient-to-b from-primary/80 to-transparent"
              animate={{ 
                scaleY: [1, 0.5, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </motion.div>
        </motion.div>
      </section>
    </>
  )
}
