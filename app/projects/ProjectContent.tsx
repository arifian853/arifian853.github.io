"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { getFeaturedProjects, getOlderProjects } from "@/lib/data/projects"
import { ProjectIcon } from "@/components/ui/project-icon"

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
}

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: "easeOut" as const },
    },
}

export function ProjectContent() {
    const featuredProjects = getFeaturedProjects()
    const olderProjects = getOlderProjects()

    // Format number with leading zero
    const formatNumber = (num: number) => {
        return num.toString().padStart(2, '0')
    }

    // Strip markdown bold markers
    const stripMarkdown = (text: string) => {
        return text.replace(/\*\*(.*?)\*\*/g, '$1')
    }

    // Truncate description (with markdown stripped)
    const truncateDescription = (text: string, maxLength: number = 120) => {
        const stripped = stripMarkdown(text)
        if (stripped.length <= maxLength) return stripped
        return stripped.slice(0, maxLength).trim() + "..."
    }

    return (
        <section id="project" className="relative min-h-screen py-20 overflow-hidden">
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
            <div className="relative z-10 w-full max-w-7xl mx-auto px-6">
                {/* Section Title */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-12 pt-16"
                >
                    <h1 className="text-4xl md:text-5xl font-bold font-heading">
                        All <span className="text-teal-500">Projects</span>
                    </h1>
                    <div className="w-20 h-1 bg-teal-500 mt-4" />
                    <p className="text-zinc-600 dark:text-zinc-400 mt-4 max-w-2xl">
                        A collection of projects I&apos;ve built throughout my journey as a developer and AI enthusiast.
                    </p>
                </motion.div>

                {/* Featured Section - Bento Grid */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-8"
                >
                    <h2 className="text-xl font-heading font-semibold text-zinc-500 dark:text-zinc-400 mb-6">
                        Featured Projects
                    </h2>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
                >
                    {featuredProjects.map((project, index) => {
                        const isFeatured = index === 0

                        return (
                            <motion.div
                                key={project.id}
                                variants={itemVariants}
                                className={`
                                    ${isFeatured ? 'md:col-span-2 lg:col-span-2' : ''}
                                `}
                            >
                                <Link href={`/projects/${project.id}`}>
                                    <div className={`
                                        h-full bg-zinc-100 dark:bg-zinc-900 
                                        border border-zinc-200 dark:border-zinc-800 
                                        rounded-none p-6 
                                        hover:border-teal-500 dark:hover:border-teal-500 
                                        transition-all duration-300 
                                        cursor-pointer group
                                        ${isFeatured ? 'min-h-[280px]' : 'min-h-[220px]'}
                                    `}>
                                        {/* Number */}
                                        <span className={`
                                            font-heading font-bold text-teal-500
                                            ${isFeatured ? 'text-3xl' : 'text-2xl'}
                                        `}>
                                            {formatNumber(project.id)}
                                        </span>

                                        {/* Title & Year */}
                                        <div className="mt-3 flex items-start gap-2 flex-wrap">
                                            <h3 className={`
                                                font-heading font-bold leading-tight
                                                ${isFeatured ? 'text-xl md:text-2xl' : 'text-lg'}
                                            `}>
                                                {project.title}
                                            </h3>
                                            <span className="bg-teal-500 text-white text-xs font-medium px-2 py-0.5 rounded-none shrink-0">
                                                {project.year}
                                            </span>
                                        </div>

                                        {/* Description */}
                                        <p className={`
                                            text-zinc-600 dark:text-zinc-400 mt-3 leading-relaxed
                                            ${isFeatured ? 'text-sm md:text-base' : 'text-sm'}
                                        `}>
                                            {truncateDescription(project.description, isFeatured ? 200 : 100)}
                                        </p>

                                        {/* Tech Stack */}
                                        <div className="mt-4 flex items-center gap-3 flex-wrap">
                                            {project.tags.slice(0, isFeatured ? 6 : 4).map((tag, tagIndex) => (
                                                <div
                                                    key={tagIndex}
                                                    className="text-zinc-400 dark:text-zinc-500 group-hover:text-teal-500 dark:group-hover:text-teal-500 transition-colors duration-300"
                                                    title={tag.name}
                                                >
                                                    <ProjectIcon iconName={tag.iconName} className="w-5 h-5" />
                                                </div>
                                            ))}
                                        </div>

                                        {/* Arrow indicator */}
                                        <div className="mt-4 flex items-center text-teal-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            <span className="text-sm font-medium">View Details</span>
                                            <ArrowRight className="w-4 h-4 ml-1" />
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        )
                    })}
                </motion.div>

                {/* Older Projects Section - Bold Numbered List */}
                {olderProjects.length > 0 && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="mt-16 mb-8"
                        >
                            <h2 className="text-xl font-heading font-semibold text-zinc-500 dark:text-zinc-400">
                                More Projects
                            </h2>
                        </motion.div>

                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            className="space-y-0"
                        >
                            {olderProjects.map((project) => (
                                <motion.div
                                    key={project.id}
                                    variants={itemVariants}
                                >
                                    <Link href={`/projects/${project.id}`}>
                                        <div className="group py-6 px-4 -mx-4 border-b border-zinc-200 dark:border-zinc-800 hover:border-teal-500 dark:hover:border-teal-500 bg-background hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-all duration-300 cursor-pointer">
                                            <div className="flex items-start gap-6">
                                                {/* Number */}
                                                <span className="font-heading font-bold text-2xl md:text-3xl text-teal-500 w-12 shrink-0">
                                                    {formatNumber(project.id)}
                                                </span>

                                                {/* Content */}
                                                <div className="flex-1 min-w-0">
                                                    {/* Title & Year */}
                                                    <div className="flex items-center gap-3 flex-wrap">
                                                        <h3 className="font-heading font-bold text-lg md:text-xl">
                                                            {project.title}
                                                        </h3>
                                                        <span className="text-zinc-500 dark:text-zinc-400 text-sm">
                                                            ({project.year})
                                                        </span>
                                                    </div>

                                                    {/* Description - shown on hover with CSS */}
                                                    <p className="text-zinc-600 dark:text-zinc-400 text-sm mt-2 max-h-0 overflow-hidden group-hover:max-h-20 transition-all duration-300">
                                                        {truncateDescription(project.description, 150)}
                                                    </p>

                                                    {/* Tech Stack */}
                                                    <div className="mt-3 flex items-center gap-3 flex-wrap">
                                                        {project.tags.slice(0, 5).map((tag, tagIndex) => (
                                                            <div
                                                                key={tagIndex}
                                                                className="text-zinc-400 dark:text-zinc-500 group-hover:text-teal-500 dark:group-hover:text-teal-500 transition-colors duration-300"
                                                                title={tag.name}
                                                            >
                                                                <ProjectIcon iconName={tag.iconName} className="w-4 h-4" />
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>

                                                {/* Arrow */}
                                                <ArrowRight className="w-5 h-5 text-zinc-400 group-hover:text-teal-500 dark:group-hover:text-teal-500 transition-colors duration-300 shrink-0 mt-1" />
                                            </div>
                                        </div>
                                    </Link>
                                </motion.div>
                            ))}
                        </motion.div>
                    </>
                )}
            </div>
        </section>
    )
}
