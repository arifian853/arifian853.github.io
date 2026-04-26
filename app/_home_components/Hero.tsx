"use client"

import { motion, useMotionValue, useSpring, useTransform, useScroll } from "framer-motion"
import { Button } from "@/components/ui/button"
import { RotatingText } from "@/app/_home_components/rotating-text"
import { useRef, useEffect, useState } from "react"

const getTimeGreeting = () => {
    const hour = new Date().getHours()
    if (hour >= 5 && hour < 12) return "Morning"
    else if (hour >= 12 && hour < 17) return "Afternoon"
    else if (hour >= 17 && hour < 22) return "Evening"
    else return "Night"
}

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.12, delayChildren: 0.2 },
    },
}

const lineVariants = {
    hidden: { opacity: 0, y: 40, filter: "blur(4px)" },
    visible: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as [number,number,number,number] },
    },
}

export function Hero() {
    const sectionRef = useRef<HTMLElement>(null)
    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)

    const springConfig = { damping: 40, stiffness: 150 }
    const blobX = useSpring(mouseX, springConfig)
    const blobY = useSpring(mouseY, springConfig)
    
    const [greeting, setGreeting] = useState("Morning")
    
    useEffect(() => {
        const timer = setTimeout(() => {
            setGreeting(getTimeGreeting())
        }, 0)
        return () => clearTimeout(timer)
    }, [])

    // Parallax on scroll
    const { scrollY } = useScroll()
    const textY = useTransform(scrollY, [0, 600], [0, -80])
    const orb1Y = useTransform(scrollY, [0, 600], [0, -40])
    const orb2Y = useTransform(scrollY, [0, 600], [0, 60])

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const rect = sectionRef.current?.getBoundingClientRect()
            if (!rect) return
            mouseX.set(e.clientX - rect.left - rect.width / 2)
            mouseY.set(e.clientY - rect.top - rect.height / 2)
        }
        const section = sectionRef.current
        section?.addEventListener("mousemove", handleMouseMove)
        return () => section?.removeEventListener("mousemove", handleMouseMove)
    }, [mouseX, mouseY])

    return (
        <section
            ref={sectionRef}
            className="relative min-h-screen pt-20 flex items-center overflow-hidden"
        >
            {/* Mouse-reactive glow blob */}
            <motion.div
                className="absolute pointer-events-none"
                style={{
                    x: blobX,
                    y: blobY,
                    left: "50%",
                    top: "40%",
                    translateX: "-50%",
                    translateY: "-50%",
                    width: 480,
                    height: 480,
                    filter: "blur(60px)",
                }}
            >
                {/* Light mode — darker, more saturated glow */}
                <div className="absolute inset-0 dark:hidden" style={{ background: "radial-gradient(circle, rgba(67,90,118,0.18) 0%, transparent 70%)" }} />
                {/* Dark mode — subtle blue glow */}
                <div className="absolute inset-0 hidden dark:block" style={{ background: "radial-gradient(circle, rgba(112,137,168,0.12) 0%, transparent 70%)" }} />
            </motion.div>

            {/* Floating orbs — subtle depth */}
            <motion.div
                className="absolute top-[15%] right-[10%] w-3 h-3 rounded-full bg-sblue-500/50 dark:bg-sblue-500/30 pointer-events-none"
                style={{ y: orb1Y }}
                animate={{
                    scale: [1, 1.4, 1],
                    opacity: [0.5, 0.8, 0.5],
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
                className="absolute top-[60%] right-[20%] w-1.5 h-1.5 rounded-full bg-sblue-400/60 dark:bg-sblue-400/40 pointer-events-none"
                style={{ y: orb2Y }}
                animate={{
                    scale: [1, 1.8, 1],
                    opacity: [0.4, 0.7, 0.4],
                }}
                transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
            />
            <motion.div
                className="absolute top-[35%] left-[5%] w-2 h-2 rounded-full bg-sblue-600/40 dark:bg-sblue-600/25 pointer-events-none"
                animate={{
                    scale: [1, 1.6, 1],
                    opacity: [0.3, 0.6, 0.3],
                }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            />



            {/* Content */}
            <motion.div
                className="relative z-10 w-full max-w-7xl mx-auto px-6"
                style={{ y: textY }}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {/* Eyebrow label */}
                <motion.div variants={lineVariants} className="mb-3">
                    <span className="inline-flex items-center gap-2 text-xs font-heading tracking-[0.2em] uppercase text-sblue-500/70" suppressHydrationWarning>
                        <span className="inline-block w-6 h-px bg-sblue-500/50" />
                        Good {greeting}
                    </span>
                </motion.div>

                {/* Main headline — big, editorial */}
                <div className="max-w-3xl">
                    <motion.h1
                        variants={lineVariants}
                        className="font-heading text-5xl md:text-7xl lg:text-8xl font-semibold tracking-tight leading-[0.95] mb-6"
                    >
                        <span className="block">I&apos;m</span>
                        <span className="block text-sblue-500">Arifian.</span>
                    </motion.h1>

                    <motion.p
                        variants={lineVariants}
                        className="font-sans text-base md:text-lg text-muted-foreground leading-relaxed max-w-lg mb-2"
                    >
                        I teach <span className="border-b border-sblue-500 text-foreground">AI</span> and build{" "}
                        <RotatingText />
                    </motion.p>

                    <motion.p
                        variants={lineVariants}
                        className="font-sans text-sm text-muted-foreground/60 max-w-sm mb-8"
                    >
                        AI Technical Mentor · Full Stack Developer · Batam, Indonesia
                    </motion.p>

                    {/* CTA row */}
                    <motion.div variants={lineVariants} className="flex gap-4 flex-wrap">
                        <a href="#about">
                            <Button
                                className="min-h-[48px] px-7 rounded-none border-b-2 border-transparent
                                    hover:border-sblue-500 hover:text-sblue-500 hover:cursor-pointer
                                    inline-flex items-center justify-center text-sm font-medium
                                    transition-all duration-300"
                            >
                                Explore
                            </Button>
                        </a>
                        <a href="#contact">
                            <Button
                                className="min-h-[48px] px-7 rounded-none border-b-2 border-transparent
                                    hover:border-sblue-500 hover:text-sblue-500 hover:cursor-pointer
                                    inline-flex items-center justify-center text-sm font-medium
                                    transition-all duration-300"
                            >
                                Collaborate
                            </Button>
                        </a>
                    </motion.div>
                </div>
            </motion.div>

            {/* Bottom scroll hint */}
            <motion.div
                className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.8, duration: 0.6 }}
            >
                <motion.div
                    className="w-px h-12 bg-gradient-to-b from-sblue-500/40 to-transparent"
                    animate={{ scaleY: [0, 1, 0], originY: 0 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", repeatDelay: 0.5 }}
                />
            </motion.div>
        </section>
    )
}
