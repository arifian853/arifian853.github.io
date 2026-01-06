"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, ExternalLink, Github } from "lucide-react"
import { Project } from "@/lib/data/projects"
import { ProjectIcon } from "@/components/ui/project-icon"
import { Button } from "@/components/ui/button"

interface ProjectDetailContentProps {
    project: Project
}

export function ProjectDetailContent({ project }: ProjectDetailContentProps) {
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
                return <strong key={index} className="font-semibold text-teal-500">{part}</strong>
            }
            return part
        })
    }

    return (
        <section className="relative min-h-screen py-20 overflow-hidden">
            {/* Grid Background Pattern */}
            <div
                className="absolute inset-0 opacity-[0.08] top-16 dark:opacity-[0.12]"
                style={{
                    backgroundImage: `
                        linear-gradient(to right, currentColor 1px, transparent 1px),
                        linear-gradient(to bottom, currentColor 1px, transparent 1px)
                    `,
                    backgroundSize: '40px 40px',
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
                        className="inline-flex items-center gap-2 text-zinc-500 hover:text-teal-500 transition-colors duration-300 mb-8"
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
                    <span className="font-heading font-bold text-5xl md:text-6xl text-teal-500">
                        {formatNumber(project.id)}
                    </span>

                    {/* Title & Year */}
                    <div className="mt-4 flex items-start gap-3 flex-wrap">
                        <h1 className="text-3xl md:text-4xl font-bold font-heading leading-tight">
                            {project.title}
                        </h1>
                        <span className="bg-teal-500 text-white text-sm font-medium px-3 py-1 rounded-none shrink-0 mt-1">
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
                                <ProjectIcon iconName={tag.iconName} className="w-4 h-4 text-teal-500" />
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
                            className="object-cover"
                            priority
                            quality={80}
                            placeholder="blur"
                            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAUH/8QAIhAAAQMDBAMAAAAAAAAAAAAAAQIDBAAFESExQVESE2H/xAAVAQEBAAAAAAAAAAAAAAAAAAADBP/EABkRAAIDAQAAAAAAAAAAAAAAAAACAQMRIf/aAAwDAQACEQMRAD8AxmK8h0rcKUhR0SCc8UUotfEe0qSoqJIOuaKKVbpGxP/Z"
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
                    <div className="text-zinc-600 dark:text-zinc-400 leading-relaxed whitespace-pre-line">
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
                                className="rounded-none border-zinc-300 dark:border-zinc-700 hover:border-teal-500 hover:text-teal-500 transition-all duration-300"
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
                                className="rounded-none bg-teal-500 hover:bg-teal-600 text-white transition-all duration-300"
                            >
                                <ExternalLink className="w-4 h-4 mr-2" />
                                {demo.btn_name}
                            </Button>
                        </a>
                    ))}
                </motion.div>
            </div>
        </section>
    )
}
