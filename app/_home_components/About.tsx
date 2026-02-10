"use client"
import Image from "next/image"
import { motion } from "framer-motion"
import { Code2, Brain, Database, Globe, Sparkles, BookOpen } from "lucide-react"
import {
    SiReact,
    SiNodedotjs,
    SiExpress,
    SiMongodb,
    SiTailwindcss,
    SiBootstrap,
    SiPython,
    SiFramer,
    SiKeras,
    SiRedhat,
    SiNextdotjs,
    SiTensorflow,
    SiDocker
} from "react-icons/si"

const stats = [
    { label: "Years Teaching", value: "2+", color: "bg-sblue-700" },
    { label: "Projects Built", value: "15+", color: "bg-sblue-700" },
    { label: "Students Taught", value: "100+", color: "bg-sblue-700" },
]

const skills = [
    { name: "Machine Learning", icon: Brain },
    { name: "LLM & NLP", icon: Sparkles },
    { name: "Full Stack Dev", icon: Code2 },
    { name: "Database", icon: Database },
    { name: "Web Apps", icon: Globe },
    { name: "Teaching", icon: BookOpen },
]

const techStack = [
    { name: "Next.js", icon: SiNextdotjs },
    { name: "React", icon: SiReact },
    { name: "Node.js", icon: SiNodedotjs },
    { name: "Express", icon: SiExpress },
    { name: "MongoDB", icon: SiMongodb },
    { name: "Tailwind CSS", icon: SiTailwindcss },
    { name: "Bootstrap", icon: SiBootstrap },
    { name: "Python", icon: SiPython },
    { name: "Framer Motion", icon: SiFramer },
    { name: "TensorFlow", icon: SiTensorflow },
    { name: "Keras", icon: SiKeras },
    { name: "Red Hat", icon: SiRedhat },
    { name: "Docker", icon: SiDocker },
]

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

export function About() {
    return (
        <section id="about" className="relative min-h-screen flex items-center py-20 overflow-hidden">
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
                        About <span className="text-sblue-500">Me</span>
                    </h2>
                    <div className="w-20 h-1 bg-sblue-500 mt-4" />
                </motion.div>

                {/* Bento Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4"
                >
                    {/* Profile Card - Spans 2 rows */}
                    <motion.div
                        variants={itemVariants}
                        className="md:row-span-2 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-none p-6 flex flex-col items-center justify-center group hover:border-sblue-500 dark:hover:border-sblue-500 transition-colors duration-300"
                    >
                        <div className="relative mb-4">
                            <div className="w-32 h-32 overflow-hidden rounded-none border-2 border-sblue-500">
                                <Image
                                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                                    src="/ganyu.webp"
                                    alt="Arifian Saputra"
                                    width={128}
                                    height={128}
                                    quality={80}
                                    placeholder="blur"
                                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAUH/8QAIhAAAQMDBAMAAAAAAAAAAAAAAQIDBAAFESExQVESE2H/xAAVAQEBAAAAAAAAAAAAAAAAAAADBP/EABkRAAIDAQAAAAAAAAAAAAAAAAACAQMRIf/aAAwDAQACEQMRAD8AxmK8h0rcKUhR0SCc8UUotfEe0qSoqJIOuaKKVbpGxP/Z"
                                />
                            </div>
                        </div>
                        <h3 className="text-xl font-bold font-heading mt-2">Arifian Saputra</h3>
                        <p className="text-sm text-zinc-600 dark:text-zinc-300 text-center mt-1">
                            AI Technical Mentor <br /> @ Infinite Learning Indonesia
                        </p>
                        <p className="text-sm text-zinc-600 dark:text-zinc-300 text-center">
                            Full Stack Web Developer
                        </p>
                    </motion.div>

                    {/* About Text Card - Spans 2 columns */}
                    <motion.div
                        variants={itemVariants}
                        className="md:col-span-2 lg:col-span-2 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-none p-6 hover:border-sblue-500 dark:hover:border-sblue-500 transition-colors duration-300"
                    >
                        <h3 className="text-lg font-bold font-heading mb-3 flex items-center gap-2">
                            Who Am I?
                        </h3>
                        <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed font-sans">
                            A passionate individual with deep interest in{" "}
                            <span className="border-b-2 border-sblue-500 font-medium">AI and Web Development</span>.
                            I&apos;ve been teaching for{" "}
                            <span className="border-b-2 border-sblue-500 font-medium">2+ years in AI</span> field,
                            specializing in Machine Learning, Large Language Models, Natural Language Processing,
                            and building production-ready web applications.
                        </p>
                    </motion.div>

                    {/* Stats Cards - Single column */}
                    <motion.div
                        variants={itemVariants}
                        className="bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-none p-6 hover:border-sblue-500 dark:hover:border-sblue-500 transition-colors duration-300"
                    >
                        <h3 className="text-sm font-bold font-heading mb-4 text-zinc-600 dark:text-zinc-300 uppercase tracking-wider">
                            Stats
                        </h3>
                        <div className="space-y-4">
                            {stats.map((stat, index) => (
                                <div key={index} className="flex items-center justify-between">
                                    <span className="text-sm text-zinc-700 dark:text-zinc-300">{stat.label}</span>
                                    <span className={`${stat.color} text-white text-sm font-bold px-3 py-1 rounded-none`}>
                                        {stat.value}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Skills Grid - Spans 2 columns */}
                    <motion.div
                        variants={itemVariants}
                        className="md:col-span-2 lg:col-span-2 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-none p-6 hover:border-sblue-500 dark:hover:border-sblue-500 transition-colors duration-300"
                    >
                        <h3 className="text-sm font-bold font-heading mb-4 text-zinc-600 dark:text-zinc-300 uppercase tracking-wider">
                            Skills & Expertise
                        </h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                            {skills.map((skill, index) => (
                                <motion.div
                                    key={index}
                                    className="flex items-center gap-2 bg-zinc-200 dark:bg-zinc-800 px-3 py-2 rounded-none border-b-2 border-transparent hover:border-b-2 hover:border-sblue-500 dark:hover:border-sblue-500 hover:bg-sblue-500/10 transition-all duration-300 cursor-default group"
                                >
                                    <skill.icon className="w-4 h-4 text-sblue-500 group-hover:scale-110 transition-transform" />
                                    <span className="text-sm font-medium">{skill.name}</span>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Quote Card */}
                    <motion.div
                        variants={itemVariants}
                        className="bg-sblue-700 text-white rounded-none p-6 flex flex-col justify-center hover:bg-sblue-800 transition-colors duration-300"
                    >
                        <blockquote className="text-lg font-medium italic">
                            &ldquo;Teaching is learning twice.&rdquo;
                        </blockquote>
                        <cite className="text-sm mt-2 opacity-80">— Joseph Joubert</cite>
                    </motion.div>

                    {/* Tech Stack Card - Full Width */}
                    <motion.div
                        variants={itemVariants}
                        className="md:col-span-3 lg:col-span-4 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-none p-6 hover:border-sblue-500 dark:hover:border-sblue-500 transition-colors duration-300"
                    >
                        <div className="flex flex-wrap justify-center gap-6">
                            {techStack.map((tech, index) => (
                                <div
                                    key={index}
                                    className="relative group cursor-pointer"
                                >
                                    <tech.icon
                                        className="w-7 h-7 text-zinc-500 dark:text-zinc-400 group-hover:text-sblue-600 dark:group-hover:text-sblue-400 transition-colors duration-300"
                                    />
                                    {/* Tooltip */}
                                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 text-xs px-3 py-1.5 rounded-none opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap z-10">
                                        {tech.name}
                                        {/* Arrow */}
                                        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-zinc-900 dark:bg-zinc-100 rotate-45" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    )
}
