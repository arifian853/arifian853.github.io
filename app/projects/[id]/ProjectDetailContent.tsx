"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, ArrowRight, ExternalLink, Github } from "lucide-react"
import { Project } from "@/lib/data/projects"
import { ProjectIcon } from "@/components/ui/project-icon"
import { Button } from "@/components/ui/button"

interface ProjectDetailContentProps {
    project: Project
    exploreProjects: Project[]
}

export function ProjectDetailContent({ project, exploreProjects }: ProjectDetailContentProps) {
    // Format number with leading zero
    const formatNumber = (num: number) => {
        return num.toString().padStart(2, '0')
    }

    // Parse markdown bold text
    const parseDescription = (text: string) => {
        // Split by ** and alternate between normal and bold
        const parts = text.split(/\*\*(.*?)\*\*/g)
        return parts.map((part, index) => {
            // Odd indices are the bold parts
            if (index % 2 === 1) {
                return <strong key={index} className="font-semibold text-brand-500">{part}</strong>
            }
            return part
        })
    }

    // Truncate description
    const truncateDescription = (text: string, maxLength: number) => {
        const cleanText = text.replace(/\*\*/g, '')
        if (cleanText.length <= maxLength) return cleanText
        return cleanText.slice(0, maxLength).trim() + '...'
    }

    const sectionRef = useRef<HTMLElement>(null)
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end start"]
    })
    const bgY = useTransform(scrollYProgress, [0, 1], [0, 100])

    return (
        <section ref={sectionRef} className="relative min-h-screen py-20 overflow-hidden">
            {/* Parallax Orb */}
            <motion.div
                className="absolute left-1/2 top-1/4 -translate-x-1/2 w-[600px] h-[600px] pointer-events-none rounded-full"
                style={{
                    y: bgY,
                    background: "radial-gradient(circle, rgba(112,137,168,0.06) 0%, transparent 70%)",
                    filter: "blur(60px)"
                }}
            />

            {/* Content Container */}
            <div className="relative z-10 w-full max-w-4xl mx-auto px-6 pt-16">
                {/* Back Button */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4 }}
                >
                    <Link
                        href="/projects"
                        className="inline-flex items-center gap-2 text-zinc-500 hover:text-brand-500 transition-colors duration-300 mb-8"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        <span className="text-sm font-medium">Back to Projects</span>
                    </Link>
                </motion.div>

                {/* Project Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mb-8"
                >
                    {/* Number */}
                    <span className="font-heading font-bold text-5xl md:text-6xl text-brand-500">
                        {formatNumber(project.id)}
                    </span>

                    {/* Title & Year */}
                    <div className="mt-4 flex items-start gap-3 flex-wrap">
                        <h1 className="text-3xl md:text-4xl font-bold font-heading leading-tight">
                            {project.title}
                        </h1>
                        <span className="bg-brand-700 text-white text-sm font-medium px-3 py-1 rounded-none shrink-0 mt-1">
                            {project.year}
                        </span>
                    </div>

                    {/* Tech Stack */}
                    <div className="mt-6 flex items-center gap-4 flex-wrap">
                        {project.tags.map((tag, index) => (
                            <div
                                key={index}
                                className="flex items-center gap-2 bg-zinc-100 dark:bg-zinc-800 px-3 py-1.5 border border-zinc-200 dark:border-zinc-700 rounded-none"
                            >
                                <ProjectIcon iconName={tag.iconName} className="w-4 h-4 text-brand-500" />
                                <span className="text-sm font-medium">{tag.name}</span>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Project Image */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="mb-8"
                >
                    <div className="relative w-full aspect-video bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-none overflow-hidden">
                        <Image
                            src={project.image}
                            alt={project.title}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                            className="object-cover"
                            priority
                            quality={80}
                        />
                    </div>
                </motion.div>

                {/* Description */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="mb-8"
                >
                    <h2 className="text-xl font-heading font-semibold mb-4">About This Project</h2>
                    <div className="text-zinc-700 dark:text-zinc-300 leading-relaxed whitespace-pre-line">
                        {parseDescription(project.description)}
                    </div>
                </motion.div>

                {/* Links */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="flex flex-wrap gap-4"
                >
                    {project.link.map((link, index) => (
                        <a
                            key={index}
                            href={link.repo_link}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Button
                                variant="outline"
                                className="rounded-none bg-white dark:bg-zinc-900 border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:border-brand-500 hover:text-brand-500 transition-all duration-300"
                            >
                                <Github className="w-4 h-4 mr-2" />
                                {link.btn_name}
                            </Button>
                        </a>
                    ))}
                    {project.demo.map((demo, index) => (
                        <a
                            key={index}
                            href={demo.demo_link}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Button
                                className="rounded-none bg-brand-700 hover:bg-brand-800 text-white transition-all duration-300"
                            >
                                <ExternalLink className="w-4 h-4 mr-2" />
                                {demo.btn_name}
                            </Button>
                        </a>
                    ))}
                </motion.div>

                {/* Explore More Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="mt-16 pt-8 border-t border-zinc-200 dark:border-zinc-800"
                >
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="mb-6 flex items-center gap-3"
                    >
                        <span className="text-xs font-heading tracking-[0.15em] uppercase text-zinc-400 dark:text-zinc-500">Explore More</span>
                        <div className="flex-1 h-px bg-zinc-200 dark:bg-zinc-800" />
                    </motion.div>

                    <div className="space-y-0">
                        {exploreProjects.map((p) => (
                            <Link key={p.id} href={`/projects/${p.id}`}>
                                <div className="group py-5 px-4 -mx-4 border-b border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900/60 transition-all duration-300 cursor-pointer">
                                    <div className="flex items-center gap-6">
                                        {/* Number */}
                                        <span className="font-heading font-bold text-xl text-brand-500/50 group-hover:text-brand-500 transition-colors duration-300 w-10 shrink-0 tabular-nums">
                                            {formatNumber(p.id)}
                                        </span>

                                        {/* Content */}
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-3 flex-wrap">
                                                <h3 className="font-heading font-semibold text-base md:text-lg group-hover:text-brand-500 transition-colors duration-300">
                                                    {p.title}
                                                </h3>
                                                <span className="text-zinc-400 dark:text-zinc-500 text-xs">
                                                    {p.year}
                                                </span>
                                            </div>
                                            {/* Description reveal on hover */}
                                            <p className="text-zinc-500 dark:text-zinc-400 text-sm mt-1 max-h-0 overflow-hidden group-hover:max-h-12 transition-all duration-300 leading-relaxed">
                                                {truncateDescription(p.description, 120)}
                                            </p>
                                        </div>

                                        {/* Tech icons — fade in on hover */}
                                        <div className="hidden md:flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 shrink-0">
                                            {p.tags.slice(0, 4).map((tag, tagIndex) => (
                                                <div key={tagIndex} className="text-brand-500" title={tag.name}>
                                                    <ProjectIcon iconName={tag.iconName} className="w-4 h-4" />
                                                </div>
                                            ))}
                                        </div>

                                        {/* Arrow */}
                                        <ArrowRight className="w-4 h-4 text-zinc-300 dark:text-zinc-600 group-hover:text-brand-500 group-hover:translate-x-1 transition-all duration-300 shrink-0" />
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </motion.div>

            </div>
        </section>
    )
}

