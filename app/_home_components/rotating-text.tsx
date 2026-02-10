"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

const appTypes = [
    "web apps.",
    "AI apps.",
    "full stack apps.",
    "wordpress apps.",
    "react apps.",
    "frontend apps.",
    "backend apps.",
    "vibe-coded apps."
]



export function RotatingText() {
    const [currentIndex, setCurrentIndex] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % appTypes.length)
        }, 2300) // Change every 1 second

        return () => clearInterval(interval)
    }, [])

    return (
        <span className="inline-block relative min-w-[140px]">
            <AnimatePresence mode="wait">
                <motion.span
                    key={currentIndex}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                    className="inline-block border-b border-sblue-500"
                >
                    {appTypes[currentIndex]}
                </motion.span>
            </AnimatePresence>
        </span>
    )
}
