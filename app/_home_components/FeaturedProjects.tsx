"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { getFeaturedProjects } from "@/lib/data/projects"
import { ProjectIcon } from "@/components/ui/project-icon"
import { useRef } from "react"

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1 },
    },
}

const cardVariants = {
    hidden: { opacity: 0, y: 40, filter: "blur(4px)" },
    visible: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: { duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] as [number,number,number,number] },
    },
}

export function FeaturedProjects() {
    const featuredProjects = getFeaturedProjects()
    const sectionRef = useRef<HTMLElement>(null)

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    })
    const bgY = useTransform(scrollYProgress, [0, 1], [50, -50])

    const formatNumber = (num: number) => num.toString().padStart(2, '0')
    const stripMarkdown = (text: string) => text.replace(/\*\*(.*?)\*\*/g, '$1')
    const truncate = (text: string, max: number = 120) => {
        const s = stripMarkdown(text)
        return s.length <= max ? s : s.slice(0, max).trim() + "..."
    }

    return (
        <section ref={sectionRef} id="projects" className="relative min-h-screen flex items-center py-24 overflow-hidden">
            {/* Parallax bg accent */}
            <motion.div
                className="absolute right-0 bottom-1/4 w-[500px] h-[500px] pointer-events-none rounded-full"
                style={{
                    y: bgY,
                    background: "radial-gradient(circle, rgba(112,137,168,0.07) 0%, transparent 70%)",
                    filter: "blur(60px)"
                }}
            />

            <div className="relative z-10 w-full max-w-7xl mx-auto px-6">
                {/* Label */}
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

                <motion.div
                    initial={{ opacity: 0, y: -16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-12"
                >
                    <h2 className="text-4xl md:text-5xl font-bold font-heading">
                        Featured <span className="text-sblue-500">Projects</span>
                    </h2>
                    <div className="w-16 h-px bg-sblue-500 mt-4" />
                </motion.div>

                {/* Featured label */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="mb-5 flex items-center gap-3"
                >
                    <span className="text-xs font-heading tracking-[0.15em] uppercase text-zinc-400 dark:text-zinc-500">Featured</span>
                    <div className="flex-1 h-px bg-zinc-200 dark:bg-zinc-800" />
                </motion.div>

                {/* Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-60px" }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3"
                >
                    {featuredProjects.map((project, index) => {
                        const isFeatured = index === 0

                        if (isFeatured) {
                            return (
                                <motion.div key={project.id} variants={cardVariants} className="md:col-span-2 lg:col-span-3">
                                    <Link href={`/projects/${project.id}`}>
                                        <div className="relative h-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-8 md:p-10 cursor-pointer group overflow-hidden hover:border-sblue-500 dark:hover:border-sblue-500 transition-all duration-300 min-h-[180px]">
                                            {/* Watermark number */}
                                            <span
                                                aria-hidden="true"
                                                className="pointer-events-none select-none absolute right-6 top-1/2 -translate-y-1/2 font-heading font-bold text-[8rem] md:text-[12rem] leading-none text-zinc-200 dark:text-zinc-800 group-hover:text-sblue-500/10 transition-colors duration-500"
                                            >
                                                {formatNumber(project.id)}
                                            </span>

                                            {/* Shimmer */}
                                            <div className="absolute inset-0 bg-gradient-to-r from-sblue-500/0 via-sblue-500/[0.02] to-sblue-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                                            <div className="relative z-10">
                                                <span className="text-xs font-heading tracking-[0.2em] uppercase text-sblue-500/70 mb-3 block">
                                                    Featured Project
                                                </span>
                                                <div className="flex items-center gap-3 flex-wrap mb-3">
                                                    <h3 className="font-heading font-bold text-xl md:text-2xl leading-tight">
                                                        {project.title}
                                                    </h3>
                                                    <span className="bg-sblue-700 text-white text-xs font-medium px-2 py-0.5 shrink-0">
                                                        {project.year}
                                                    </span>
                                                </div>
                                                <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed max-w-2xl">
                                                    {truncate(project.description, 200)}
                                                </p>
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
                                    </Link>
                                </motion.div>
                            )
                        }

                        return (
                            <motion.div key={project.id} variants={cardVariants}>
                                <Link href={`/projects/${project.id}`}>
                                    <div className="h-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 cursor-pointer group overflow-hidden relative hover:border-sblue-500 dark:hover:border-sblue-500 transition-all duration-300 min-h-[220px]">
                                        {/* Subtle watermark */}
                                        <span
                                            aria-hidden="true"
                                            className="pointer-events-none select-none absolute right-4 bottom-4 font-heading font-bold text-5xl leading-none text-zinc-200 dark:text-zinc-800 group-hover:text-sblue-500/10 transition-colors duration-500"
                                        >
                                            {formatNumber(project.id)}
                                        </span>
                                        <div className="relative z-10">
                                            <span className="font-heading font-bold text-2xl text-sblue-500">
                                                {formatNumber(project.id)}
                                            </span>
                                            <div className="mt-3 flex items-start gap-2 flex-wrap">
                                                <h3 className="font-heading font-bold text-lg leading-tight">{project.title}</h3>
                                                <span className="bg-sblue-700 text-white text-xs font-medium px-2 py-0.5 shrink-0 self-start mt-0.5">
                                                    {project.year}
                                                </span>
                                            </div>
                                            <p className="text-zinc-600 dark:text-zinc-400 mt-3 text-sm leading-relaxed">
                                                {truncate(project.description, 100)}
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
                            </motion.div>
                        )
                    })}
                </motion.div>


                {/* View all */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="mt-10 text-center"
                >
                    <Link
                        href="/projects"
                        className="inline-flex items-center gap-2 text-sblue-500 hover:text-sblue-400 font-medium transition-all duration-300 border-b border-transparent hover:border-sblue-500 pb-0.5 group"
                    >
                        View All Projects
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                    </Link>
                </motion.div>
            </div>
        </section>
    )
}
