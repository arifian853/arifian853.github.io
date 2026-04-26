"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { Building2, MapPin, Calendar } from "lucide-react"
import { useRef } from "react"

const experiences = [
    {
        id: 3,
        position: "Mentor for IBM Academy: Hybrid Cloud and AI",
        company: "Infinite Learning Indonesia",
        type: "Contract + Internship",
        workMode: "On-site",
        time: "Aug 2023 - Feb 2024",
        year: "2023",
        location: "Batam, Riau Islands",
        description: "Mentored at IBM Academy Hybrid Cloud & AI program, teaching RHEL System Administration, AI fundamentals, ethics, and Cybersecurity essentials.",
        skillset: ["RedHat Administration", "Linux", "CLI", "AI", "Cybersecurity"]
    },
    {
        id: 4,
        position: "Mentor for IBM Academy: Advance AI",
        company: "Infinite Learning Indonesia",
        type: "Contract",
        workMode: "On-site",
        time: "February 2024 - July 2024",
        year: "2024",
        location: "Batam, Riau Islands",
        description: "Mentored students at IBM Academy Advance AI program, teaching Data Science, Generative AI, ML, and Deep Learning using IBM Cloud technologies.",
        skillset: ["AI Development", "Data Science", "TensorFlow", "Keras", "Python", "Flask"]
    },
    {
        id: 5,
        position: "Lead Mentor for IBM Academy: Advance AI",
        company: "Infinite Learning Indonesia",
        type: "Contract",
        workMode: "On-site",
        time: "July 2024 - January 2025",
        year: "2024",
        location: "Batam, Riau Islands",
        description: "Led mentor team at IBM Academy Advance AI program, guiding students in ML, Generative AI, Deep Learning, and WatsonX.ai on IBM Cloud platform.",
        skillset: ["Team Management", "Leadership", "AI Development", "TensorFlow", "Keras", "Python"]
    },
    {
        id: 6,
        position: "Head of AI Development Program",
        company: "Infinite Learning Indonesia",
        type: "Contract",
        workMode: "On-site",
        time: "January 2025 - Present",
        year: "2025",
        location: "Batam, Riau Islands",
        description: "Leading the AI Development KMM Program, mentoring mentees in ML, Data Science, and model deployment. Managing mentor teams and ensuring quality capstone project delivery.",
        skillset: ["Team Management", "Leadership", "AI Development", "TensorFlow", "Python", "Flask"]
    },
]

const sorted = [...experiences].sort((a, b) => b.id - a.id)

function ExperienceItem({ exp, index, isLatest }: {
    exp: typeof experiences[0]
    index: number
    isLatest: boolean
}) {
    const ref = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start 90%", "start 50%"]
    })
    const opacity = useTransform(scrollYProgress, [0, 1], [0, 1])
    const x = useTransform(scrollYProgress, [0, 1], [-24, 0])

    return (
        <div ref={ref} className="relative flex gap-6 group">
            {/* Timeline line + dot */}
            <div className="relative flex flex-col items-center">
                <motion.div
                    className={`w-3 h-3 rounded-full shrink-0 mt-1.5 z-10 border-2
                        ${isLatest
                            ? "bg-sblue-500 border-sblue-500"
                            : "bg-transparent border-zinc-400 dark:border-zinc-600 group-hover:border-sblue-500"
                        } transition-colors duration-300`}
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1, type: "spring", stiffness: 300 }}
                />
                {/* Connector line */}
                {index < sorted.length - 1 && (
                    <motion.div
                        className="w-px flex-1 mt-2 bg-gradient-to-b from-zinc-300 dark:from-zinc-700 to-transparent"
                        initial={{ scaleY: 0, originY: 0 }}
                        whileInView={{ scaleY: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                    />
                )}
            </div>

            {/* Card */}
            <motion.div
                style={{ opacity, x }}
                className={`flex-1 pb-8`}
            >
                <div className={`
                    bg-zinc-100 dark:bg-zinc-900
                    border border-zinc-200 dark:border-zinc-800
                    p-5 md:p-6
                    group-hover:border-sblue-500 dark:group-hover:border-sblue-500
                    transition-all duration-300
                    ${isLatest ? "border-l-2 border-l-sblue-500 dark:border-l-sblue-500" : ""}
                `}>
                    {/* Meta row */}
                    <div className="flex items-center gap-2 flex-wrap mb-3">
                        {isLatest && (
                            <span className="text-xs bg-sblue-500 text-white px-2 py-0.5 font-medium">
                                Current
                            </span>
                        )}
                        <span className="text-xs text-zinc-500 dark:text-zinc-400 flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {exp.time}
                        </span>
                        <span className="text-xs text-zinc-500 dark:text-zinc-400 flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {exp.location}
                        </span>
                    </div>

                    <h3 className="font-heading font-bold text-base md:text-lg leading-snug group-hover:text-sblue-500 transition-colors duration-300">
                        {exp.position}
                    </h3>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1 flex items-center gap-1.5">
                        <Building2 className="w-3.5 h-3.5 shrink-0" />
                        {exp.company}
                        <span className="text-zinc-300 dark:text-zinc-700 mx-1">·</span>
                        {exp.type}
                        <span className="text-zinc-300 dark:text-zinc-700 mx-1">·</span>
                        {exp.workMode}
                    </p>

                    <p className="text-zinc-600 dark:text-zinc-400 text-sm mt-3 leading-relaxed">
                        {exp.description}
                    </p>

                    <div className="flex items-center gap-2 flex-wrap mt-4">
                        {exp.skillset.map((skill, i) => (
                            <motion.span
                                key={i}
                                className="text-xs px-2 py-1 bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border-b border-transparent hover:border-sblue-500 transition-colors duration-200 cursor-default"
                                whileHover={{ y: -1 }}
                                transition={{ duration: 0.15 }}
                            >
                                {skill}
                            </motion.span>
                        ))}
                    </div>
                </div>
            </motion.div>
        </div>
    )
}

export function Experiences() {
    const sectionRef = useRef<HTMLElement>(null)
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    })
    const bgOrb = useTransform(scrollYProgress, [0, 1], [-60, 60])

    return (
        <section ref={sectionRef} id="experiences" className="relative min-h-screen py-24 overflow-hidden">
            {/* Parallax bg accent */}
            <motion.div
                className="absolute -left-40 top-1/3 w-[400px] h-[400px] rounded-full pointer-events-none"
                style={{
                    y: bgOrb,
                    background: "radial-gradient(circle, rgba(67,90,118,0.07) 0%, transparent 70%)",
                    filter: "blur(40px)"
                }}
            />

            <div className="relative z-10 w-full max-w-5xl mx-auto px-6">
                {/* Label */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="mb-10 flex items-center gap-3"
                >
                    <span className="inline-block w-6 h-px bg-sblue-500/50" />
                    <span className="text-xs font-heading tracking-[0.2em] uppercase text-sblue-500/70">Experience</span>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: -16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-14"
                >
                    <h2 className="text-4xl md:text-5xl font-bold font-heading">
                        Work <span className="text-sblue-500">Experience</span>
                    </h2>
                    <div className="w-16 h-px bg-sblue-500 mt-4" />
                </motion.div>

                {/* Two-column layout: year ticker + timeline */}
                <div className="flex gap-8 md:gap-12">
                    {/* Year Ticker — sticky sidebar */}
                    <div className="hidden md:flex flex-col items-end pt-1 w-16 shrink-0 select-none">
                        {sorted.map((exp, index) => (
                            <motion.div
                                key={exp.id}
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1, duration: 0.4 }}
                                className="flex flex-col items-end"
                            >
                                <span className={`
                                    font-heading font-bold tabular-nums leading-none
                                    ${index === 0
                                        ? "text-xl text-sblue-500"
                                        : "text-sm text-zinc-300 dark:text-zinc-700"
                                    }
                                `}>
                                    {exp.year}
                                </span>
                                {/* Spacer to align with card height roughly */}
                                {index < sorted.length - 1 && (
                                    <div className="w-px flex-1 my-2 min-h-[120px] bg-gradient-to-b from-zinc-200 dark:from-zinc-800 to-transparent self-center" />
                                )}
                            </motion.div>
                        ))}
                    </div>

                    {/* Timeline */}
                    <div className="flex-1 space-y-0">
                        {sorted.map((exp, index) => (
                            <ExperienceItem
                                key={exp.id}
                                exp={exp}
                                index={index}
                                isLatest={index === 0}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
