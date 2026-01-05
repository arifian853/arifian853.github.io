"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { RotatingText } from "@/app/_home_components/rotating-text"

const getTimeGreeting = () => {
    const hour = new Date().getHours()

    if (hour >= 5 && hour < 12) {
        return "Morning"
    } else if (hour >= 12 && hour < 17) {
        return "Afternoon"
    } else if (hour >= 17 && hour < 22) {
        return "Evening"
    } else {
        return "Night"
    }
}

export function Hero() {
    return (
        <section className="relative min-h-screen pt-20 flex items-center overflow-hidden">
            {/* Grid Background Pattern */}
            <div
                className="absolute inset-0 top-16 opacity-[0.08] dark:opacity-[0.12]"
                style={{
                    backgroundImage: `
            linear-gradient(to right, currentColor 1px, transparent 1px),
            linear-gradient(to bottom, currentColor 1px, transparent 1px)
          `,
                    backgroundSize: '40px 40px',
                }}
            />

            {/* Content Container - 2 columns */}
            <div className="relative z-10 w-full max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Left Side - Greeting with fade-in */}
                <motion.div
                    className="flex flex-col justify-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                >
                    <h1 className="font-heading text-3xl md:text-4xl lg:text-4xl font-semibold tracking-tight">
                        Good <span className="text-teal-500">{getTimeGreeting()}.</span>
                    </h1>
                    <p className="tracking-tight font-sans text-lg">
                        Welcome, I&apos;m <span className="border-b border-teal-500">Arifian</span>.
                    </p>
                    <p className="tracking-tight font-sans text-lg">
                        I teach <span className="border-b border-teal-500">AI</span> and build <RotatingText />
                    </p>
                    <div className="flex gap-4">
                        <Button className="mt-4 w-25 rounded-none border-b-2 border-transparent hover:border-b-2 hover:border-teal-500 hover:text-teal-500 hover:cursor-pointer">
                            Explore
                        </Button>
                        <Button className="mt-4 w-25 rounded-none border-b-2 border-transparent hover:border-b-2 hover:border-teal-500 hover:text-teal-500 hover:cursor-pointer">
                            Resume
                        </Button>
                    </div>
                </motion.div>

                {/* Right Side - Empty for now */}
                <div className="hidden md:block">
                    {/* Reserved for future content */}
                </div>
            </div>
        </section>

    )
}
