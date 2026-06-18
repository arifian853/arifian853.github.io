"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import Link from "next/link"
import { useRef } from "react"
import { ShimmerCard } from "@/components/ui/shimmer-card"
import { ArrowRight } from "lucide-react"
import { getFeaturedProjects, getOlderProjects } from "@/lib/data/projects"
import { ProjectIcon } from "@/components/ui/project-icon"
import { ProjectPopover } from "@/components/ui/project-popover"

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.08 },
    },
}

const cardVariants = {
    hidden: { opacity: 0, y: 32, filter: "blur(4px)" },
    visible: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
    },
}

// TiltCard replaced by SpotlightCard (ShimmerCard)

export function ProjectContent() {
    const featuredProjects = getFeaturedProjects()
    const olderProjects = getOlderProjects()

    const formatNumber = (num: number) => num.toString().padStart(2, '0')
    const stripMarkdown = (text: string) => text.replace(/\*\*(.*?)\*\*/g, '$1')
    const truncateDescription = (text: string, maxLength: number = 120) => {
        const stripped = stripMarkdown(text)
        if (stripped.length <= maxLength) return stripped
        return stripped.slice(0, maxLength).trim() + "..."
    }

    const sectionRef = useRef<HTMLElement>(null)
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end start"]
    })
    const bgY = useTransform(scrollYProgress, [0, 1], [0, 200])

    return (
        <section ref={sectionRef} id="project" className="relative min-h-screen py-20 overflow-hidden">
            {/* Parallax Orb */}
            <motion.div
                className="absolute -right-20 top-1/4 w-[600px] h-[600px] pointer-events-none rounded-full"
                style={{
                    y: bgY,
                    background: "radial-gradient(circle, rgba(112,137,168,0.06) 0%, transparent 70%)",
                    filter: "blur(60px)"
                }}
            />

            {/* Content Container */}
            <div className="relative z-10 w-full max-w-7xl mx-auto px-6 pt-16">
                {/* Eyebrow Label */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="mb-10 flex items-center gap-3"
                >
                    <span className="inline-block w-6 h-px bg-sblue-500/50" />
                    <span className="text-xs font-heading tracking-[0.2em] uppercase text-sblue-500/70">Work</span>
                </motion.div>

                {/* Section Title */}
                <motion.div
                    initial={{ opacity: 0, y: -16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-12"
                >
                    <h1 className="text-4xl md:text-5xl font-bold font-heading">
                        All <span className="text-sblue-500">Projects</span>
                    </h1>
                    <div className="w-16 h-px bg-sblue-500 mt-4" />
                    <p className="text-zinc-600 dark:text-zinc-400 mt-4 max-w-2xl text-sm">
                        A collection of projects I&apos;ve built throughout my journey as a developer and AI enthusiast.
                    </p>
                </motion.div>

                {/* Featured Projects */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="mb-6 flex items-center gap-3"
                >
                    <span className="text-xs font-heading tracking-[0.15em] uppercase text-zinc-400 dark:text-zinc-500">Featured</span>
                    <div className="flex-1 h-px bg-zinc-200 dark:bg-zinc-800" />
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-20"
                >
                    {featuredProjects.map((project, index) => {
                        const isFeatured = index === 0

                        if (isFeatured) {
                            // Hero Card — full-width editorial style with watermark number
                            return (
                                <motion.div
                                    key={project.id}
                                    variants={cardVariants}
                                    className="md:col-span-2 lg:col-span-3"
                                >
                                    <ProjectPopover
                                        projectId={project.id}
                                        title={project.title}
                                        year={project.year}
                                        description={project.description}
                                    >
                                        <ShimmerCard className="h-full">
                                            <Link href={`/projects/${project.id}`} className="block h-full">
                                                <div className="relative h-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-sblue-500 dark:hover:border-sblue-500 transition-all duration-300 cursor-pointer group overflow-hidden min-h-[200px] p-8 md:p-10">
                                                    {/* Watermark number — large, absolute, elegant */}
                                                    <span
                                                        aria-hidden="true"
                                                        className="pointer-events-none select-none absolute right-6 top-1/2 -translate-y-1/2 font-heading font-bold text-[10rem] md:text-[14rem] leading-none text-zinc-200 dark:text-zinc-800 group-hover:text-sblue-500/10 transition-colors duration-500"
                                                    >
                                                        {formatNumber(project.id)}
                                                    </span>

                                                    {/* Hover shimmer */}
                                                    <div className="absolute inset-0 bg-gradient-to-r from-sblue-500/0 via-sblue-500/[0.02] to-sblue-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                                                    {/* Content */}
                                                    <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-6 md:gap-12">
                                                        <div className="flex-1 min-w-0">
                                                            {/* Label */}
                                                            <span className="text-xs font-heading tracking-[0.2em] uppercase text-sblue-500/70 mb-3 block">
                                                                Featured Project
                                                            </span>

                                                            {/* Title & Year */}
                                                            <div className="flex items-center gap-3 flex-wrap mb-3">
                                                                <h2 className="font-heading font-bold text-2xl md:text-3xl leading-tight">
                                                                    {project.title}
                                                                </h2>
                                                                <span className="bg-sblue-700 text-white text-xs font-medium px-2 py-0.5 shrink-0">
                                                                    {project.year}
                                                                </span>
                                                            </div>

                                                            {/* Description */}
                                                            <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed max-w-2xl">
                                                                {truncateDescription(project.description, 240)}
                                                            </p>

                                                            {/* Tech Stack + CTA */}
                                                            <div className="mt-5 flex items-center justify-between flex-wrap gap-4">
                                                                <div className="flex items-center gap-3 flex-wrap">
                                                                    {project.tags.slice(0, 7).map((tag, tagIndex) => (
                                                                        <div
                                                                            key={tagIndex}
                                                                            className="text-zinc-400 dark:text-zinc-500 group-hover:text-sblue-500 transition-colors duration-300"
                                                                            title={tag.name}
                                                                        >
                                                                            <ProjectIcon iconName={tag.iconName} className="w-5 h-5" />
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                                <div className="flex items-center gap-1.5 text-sblue-500 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                                    View Details
                                                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Link>
                                        </ShimmerCard>
                                    </ProjectPopover>
                                </motion.div>
                            )
                        }

                        // Regular cards
                        return (
                            <motion.div key={project.id} variants={cardVariants}>
                                <ProjectPopover
                                    projectId={project.id}
                                    title={project.title}
                                    year={project.year}
                                    description={project.description}
                                >
                                    <ShimmerCard className="h-full">
                                        <Link href={`/projects/${project.id}`} className="block h-full">
                                            <div className="h-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-none p-6 hover:border-sblue-500 dark:hover:border-sblue-500 transition-all duration-300 cursor-pointer group min-h-[220px] relative overflow-hidden">
                                                {/* Subtle watermark */}
                                                <span
                                                    aria-hidden="true"
                                                    className="pointer-events-none select-none absolute right-4 bottom-4 font-heading font-bold text-6xl leading-none text-zinc-200 dark:text-zinc-800 group-hover:text-sblue-500/10 transition-colors duration-500"
                                                >
                                                    {formatNumber(project.id)}
                                                </span>

                                                <div className="relative z-10">
                                                    <span className="font-heading font-bold text-2xl text-sblue-500">
                                                        {formatNumber(project.id)}
                                                    </span>

                                                    <div className="mt-3 flex items-start gap-2 flex-wrap">
                                                        <h3 className="font-heading font-bold text-lg leading-tight">
                                                            {project.title}
                                                        </h3>
                                                        <span className="bg-sblue-700 text-white text-xs font-medium px-2 py-0.5 shrink-0 self-start mt-0.5">
                                                            {project.year}
                                                        </span>
                                                    </div>

                                                    <p className="text-zinc-600 dark:text-zinc-400 mt-3 leading-relaxed text-sm">
                                                        {truncateDescription(project.description, 100)}
                                                    </p>

                                                    <div className="mt-4 flex items-center gap-3 flex-wrap">
                                                        {project.tags.slice(0, 4).map((tag, tagIndex) => (
                                                            <div
                                                                key={tagIndex}
                                                                className="text-zinc-400 dark:text-zinc-500 group-hover:text-sblue-500 transition-colors duration-300"
                                                                title={tag.name}
                                                            >
                                                                <ProjectIcon iconName={tag.iconName} className="w-4 h-4" />
                                                            </div>
                                                        ))}
                                                    </div>

                                                    <div className="mt-4 flex items-center text-sblue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 gap-1">
                                                        <span className="text-sm font-medium">View Details</span>
                                                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    </ShimmerCard>
                                </ProjectPopover>
                            </motion.div>
                        )
                    })}
                </motion.div>

                {/* More Projects — editorial numbered list */}
                {olderProjects.length > 0 && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            className="mb-6 flex items-center gap-3"
                        >
                            <span className="text-xs font-heading tracking-[0.15em] uppercase text-zinc-400 dark:text-zinc-500">More</span>
                            <div className="flex-1 h-px bg-zinc-200 dark:bg-zinc-800" />
                        </motion.div>

                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            className="space-y-0"
                        >
                            {olderProjects.map((project) => (
                                <motion.div key={project.id} variants={cardVariants}>
                                    <Link href={`/projects/${project.id}`}>
                                        <div className="group py-5 px-4 -mx-4 border-b border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900/60 transition-all duration-300 cursor-pointer">
                                            <div className="flex items-center gap-6">
                                                {/* Number */}
                                                <span className="font-heading font-bold text-xl text-sblue-500/50 group-hover:text-sblue-500 transition-colors duration-300 w-10 shrink-0 tabular-nums">
                                                    {formatNumber(project.id)}
                                                </span>

                                                {/* Content */}
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center gap-3 flex-wrap">
                                                        <h3 className="font-heading font-semibold text-base md:text-lg group-hover:text-sblue-500 transition-colors duration-300">
                                                            {project.title}
                                                        </h3>
                                                        <span className="text-zinc-400 dark:text-zinc-500 text-xs">
                                                            {project.year}
                                                        </span>
                                                    </div>

                                                    {/* Description reveal on hover */}
                                                    <p className="text-zinc-500 dark:text-zinc-400 text-sm mt-1 max-h-0 overflow-hidden group-hover:max-h-12 transition-all duration-300 leading-relaxed">
                                                        {truncateDescription(project.description, 120)}
                                                    </p>
                                                </div>

                                                {/* Tech icons — fade in on hover */}
                                                <div className="hidden md:flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                    {project.tags.slice(0, 4).map((tag, tagIndex) => (
                                                        <div
                                                            key={tagIndex}
                                                            className="text-sblue-500"
                                                            title={tag.name}
                                                        >
                                                            <ProjectIcon iconName={tag.iconName} className="w-4 h-4" />
                                                        </div>
                                                    ))}
                                                </div>

                                                {/* Arrow */}
                                                <ArrowRight className="w-4 h-4 text-zinc-300 dark:text-zinc-600 group-hover:text-sblue-500 group-hover:translate-x-1 transition-all duration-300 shrink-0" />
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
