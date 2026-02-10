"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { getFeaturedProjects } from "@/lib/data/projects"
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

export function FeaturedProjects() {
  const featuredProjects = getFeaturedProjects()

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
    <section id="projects" className="relative min-h-screen flex items-center py-20 overflow-hidden">
      {/* Content Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold font-heading">
            Featured <span className="text-sblue-500">Projects</span>
          </h2>
          <div className="w-20 h-1 bg-sblue-500 mt-4" />
        </motion.div>

        {/* Bento Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {featuredProjects.map((project, index) => {
            // First project is featured (larger)
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
                                        hover:border-sblue-500 dark:hover:border-sblue-500 
                                        transition-all duration-300 
                                        cursor-pointer group
                                        ${isFeatured ? 'min-h-[280px]' : 'min-h-[220px]'}
                                    `}>
                    {/* Number */}
                    <span className={`
                                            font-heading font-bold text-sblue-500
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
                      <span className="bg-sblue-700 text-white text-xs font-medium px-2 py-0.5 rounded-none shrink-0">
                        {project.year}
                      </span>
                    </div>

                    {/* Description */}
                    <p className={`
                                            text-zinc-700 dark:text-zinc-300 mt-3 leading-relaxed
                                            ${isFeatured ? 'text-sm md:text-base' : 'text-sm'}
                                        `}>
                      {truncateDescription(project.description, isFeatured ? 200 : 100)}
                    </p>

                    {/* Tech Stack */}
                    <div className="mt-4 flex items-center gap-3 flex-wrap">
                      {project.tags.slice(0, isFeatured ? 6 : 4).map((tag, tagIndex) => (
                        <div
                          key={tagIndex}
                          className="text-zinc-400 dark:text-zinc-500 group-hover:text-sblue-500 dark:group-hover:text-sblue-500 transition-colors duration-300"
                          title={tag.name}
                        >
                          <ProjectIcon iconName={tag.iconName} className="w-5 h-5" />
                        </div>
                      ))}
                    </div>

                    {/* Arrow indicator */}
                    <div className="mt-4 flex items-center text-sblue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="text-sm font-medium">View Details</span>
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </motion.div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 text-center"
        >
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sblue-500 hover:text-sblue-400 font-medium transition-colors duration-300 border-b-2 border-transparent hover:border-sblue-500 pb-1"
          >
            View All Projects
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
