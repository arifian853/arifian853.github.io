"use client"
import Image from "next/image"
import { motion } from "framer-motion"
import { Code2, Brain, Database, Globe, Sparkles, BookOpen, Download, Mail, Building2 } from "lucide-react"
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
    SiInstagram,
    SiLinkedin,
    SiGithub,
    SiX,
    SiNextdotjs,
    SiTensorflow,
    SiDocker,
    SiTypescript,
    SiFastapi,
    SiGooglegemini,
    SiShadcnui
} from "react-icons/si"

const stats = [
    { label: "Years Teaching", value: "2+", color: "bg-teal-700" },
    { label: "Projects Built", value: "15+", color: "bg-teal-700" },
    { label: "Students Taught", value: "100+", color: "bg-teal-700" },
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

const socialLinks = [
    { name: "@arifiansaputra_", icon: SiInstagram, url: "https://instagram.com/arifiansaputra_" },
    { name: "Arifian Saputra", icon: SiLinkedin, url: "https://linkedin.com/in/arifiansaputra" },
    { name: "arifian853", icon: SiGithub, url: "https://github.com/arifian853" },
    { name: "@ArifianSaputra0", icon: SiX, url: "https://x.com/ArifianSaputra0" },
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

export function AboutContent() {
    return (
        <section id="about" className="relative min-h-screen flex items-center py-20 overflow-hidden">
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
            <div className="relative z-10 w-full max-w-7xl mx-auto px-6 mt-16">
                {/* Section Title */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-12"
                >
                    <h2 className="text-4xl md:text-5xl font-bold font-heading">
                        About <span className="text-teal-500">Me</span>
                    </h2>
                    <div className="w-20 h-1 bg-teal-500 mt-4" />
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
                        className="md:row-span-2 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-none p-6 flex flex-col items-center justify-center group hover:border-teal-500 dark:hover:border-teal-500 transition-colors duration-300"
                    >
                        <div className="relative mb-4">
                            <div className="w-32 h-32 overflow-hidden rounded-none border-2 border-teal-500">
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
                        className="md:col-span-2 lg:col-span-2 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-none p-6 hover:border-teal-500 dark:hover:border-teal-500 transition-colors duration-300"
                    >
                        <h3 className="text-lg font-bold font-heading mb-3 flex items-center gap-2">
                            Who Am I?
                        </h3>
                        <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed">
                            A passionate individual with deep interest in{" "}
                            <span className="border-b-2 border-teal-500 font-medium">AI and Web Development</span>.
                            I&apos;ve been teaching for{" "}
                            <span className="border-b-2 border-teal-500 font-medium">2+ years in AI</span> field,
                            specializing in Machine Learning, Large Language Models, Natural Language Processing,
                            and building production-ready web applications.
                        </p>
                    </motion.div>

                    {/* Stats Cards - Single column */}
                    <motion.div
                        variants={itemVariants}
                        className="bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-none p-6 hover:border-teal-500 dark:hover:border-teal-500 transition-colors duration-300"
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
                        className="md:col-span-2 lg:col-span-2 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-none p-6 hover:border-teal-500 dark:hover:border-teal-500 transition-colors duration-300"
                    >
                        <h3 className="text-sm font-bold font-heading mb-4 text-zinc-600 dark:text-zinc-300 uppercase tracking-wider">
                            Skills & Expertise
                        </h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                            {skills.map((skill, index) => (
                                <motion.div
                                    key={index}
                                    className="flex items-center gap-2 bg-zinc-200 dark:bg-zinc-800 px-3 py-2 rounded-none border-b-2 border-transparent hover:border-b-2 hover:border-teal-500 dark:hover:border-teal-500 hover:bg-teal-500/10 transition-all duration-300 cursor-default group"
                                >
                                    <skill.icon className="w-4 h-4 text-teal-500 group-hover:scale-110 transition-transform" />
                                    <span className="text-sm font-medium">{skill.name}</span>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Contact Card */}
                    <motion.div
                        variants={itemVariants}
                        className="bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-none p-6 flex flex-col justify-center hover:border-teal-500 dark:hover:border-teal-500 transition-colors duration-300"
                    >
                        <h3 className="text-sm font-bold font-heading mb-4 text-zinc-600 dark:text-zinc-300 uppercase tracking-wider">
                            Get In Touch
                        </h3>

                        {/* Buttons */}
                        <div className="space-y-2 mb-4">
                            <a
                                href="/cv_Arifian.pdf"
                                download
                                className="flex items-center gap-2 text-sm px-3 py-2 bg-teal-700 text-white rounded-none hover:bg-teal-800 transition-colors duration-300 w-full justify-center"
                            >
                                <Download className="w-4 h-4" />
                                Resume
                            </a>
                            <div className="flex flex-row gap-3">
                                <a
                                    href="mailto:arifiansaputra43@gmail.com"
                                    className="flex items-center gap-2 text-sm px-3 py-2 bg-zinc-200 dark:bg-zinc-800 rounded-none hover:bg-teal-500 hover:text-white dark:hover:bg-teal-500 transition-colors duration-300 w-full justify-center"
                                >
                                    <Mail className="w-4 h-4" />
                                    Email
                                </a>
                                <a
                                    href="mailto:arifian.saputra@infinitelearning.id"
                                    className="flex items-center gap-2 text-sm px-3 py-2 bg-zinc-200 dark:bg-zinc-800 rounded-none hover:bg-teal-500 hover:text-white dark:hover:bg-teal-500 transition-colors duration-300 w-full justify-center"
                                >
                                    <Building2 className="w-4 h-4" />
                                    Office
                                </a>
                            </div>
                        </div>

                        {/* Social Icons */}
                        <div className="flex justify-center gap-4 pt-2 border-t border-zinc-200 dark:border-zinc-700">
                            {socialLinks.map((social, index) => (
                                <a
                                    key={index}
                                    href={social.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="relative group cursor-pointer"
                                >
                                    <social.icon
                                        className="w-5 h-5 text-zinc-500 dark:text-zinc-400 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors duration-300"
                                    />
                                    {/* Tooltip */}
                                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 text-xs px-3 py-1.5 rounded-none opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap z-10">
                                        {social.name}
                                        {/* Arrow */}
                                        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-zinc-900 dark:bg-zinc-100 rotate-45" />
                                    </div>
                                </a>
                            ))}
                        </div>
                    </motion.div>

                    {/* Tech Stack Card - Full Width */}
                    <motion.div
                        variants={itemVariants}
                        className="md:col-span-3 lg:col-span-4 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-none p-6 hover:border-teal-500 dark:hover:border-teal-500 transition-colors duration-300"
                    >
                        <div className="flex flex-wrap justify-center gap-6">
                            {techStack.map((tech, index) => (
                                <div
                                    key={index}
                                    className="relative group cursor-pointer"
                                >
                                    <tech.icon
                                        className="w-7 h-7 text-zinc-500 dark:text-zinc-400 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors duration-300"
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

                {/* More About Me Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mt-16"
                >
                    <h3 className="text-2xl md:text-3xl font-bold font-heading mb-8">
                        What I <span className="text-teal-500">Offer</span>
                    </h3>

                    {/* Services Grid */}
                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        {/* Web Development */}
                        <motion.div
                            variants={itemVariants}
                            className="bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 hover:border-teal-500 dark:hover:border-teal-500 transition-colors duration-300"
                        >
                            <Code2 className="w-8 h-8 text-teal-500 mb-4" />
                            <h4 className="font-heading font-bold text-lg mb-3">Web Development</h4>
                            <ul className="space-y-2 text-sm text-zinc-700 dark:text-zinc-300">
                                <li className="flex items-start gap-2">
                                    <span className="text-teal-500">•</span>
                                    Frontend (HTML, CSS, JS, React, Tailwind)
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-teal-500">•</span>
                                    Backend (Express, Flask, FastAPI) + Database
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-teal-500">•</span>
                                    Full Stack (MERN Stack, Next.js)
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-teal-500">•</span>
                                    WordPress Development
                                </li>
                            </ul>
                        </motion.div>

                        {/* AI & Machine Learning */}
                        <motion.div
                            variants={itemVariants}
                            className="bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 hover:border-teal-500 dark:hover:border-teal-500 transition-colors duration-300"
                        >
                            <Brain className="w-8 h-8 text-teal-500 mb-4" />
                            <h4 className="font-heading font-bold text-lg mb-3">AI & Machine Learning</h4>
                            <ul className="space-y-2 text-sm text-zinc-700 dark:text-zinc-300">
                                <li className="flex items-start gap-2">
                                    <span className="text-teal-500">•</span>
                                    Python API & AI Chatbot Development
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-teal-500">•</span>
                                    ML Modelling (Deep Learning, NLP, CV)
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-teal-500">•</span>
                                    Recommendation & Time Series
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-teal-500">•</span>
                                    Model Deployment with Python Backend
                                </li>
                            </ul>
                        </motion.div>

                        {/* Mentoring & Others */}
                        <motion.div
                            variants={itemVariants}
                            className="bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 hover:border-teal-500 dark:hover:border-teal-500 transition-colors duration-300"
                        >
                            <BookOpen className="w-8 h-8 text-teal-500 mb-4" />
                            <h4 className="font-heading font-bold text-lg mb-3">Mentoring & Others</h4>
                            <ul className="space-y-2 text-sm text-zinc-700 dark:text-zinc-300">
                                <li className="flex items-start gap-2">
                                    <span className="text-teal-500">•</span>
                                    Private Mentoring (AI & Web Dev)
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-teal-500">•</span>
                                    DevOps & Linux Tutorials
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-teal-500">•</span>
                                    Deployment Guidance
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-teal-500">•</span>
                                    Webinar Request (Institutional)
                                </li>
                            </ul>
                        </motion.div>
                    </motion.div>

                    {/* CTA Button */}
                    <div className="flex justify-center mb-16">
                        <a href="mailto:arifiansaputra43@gmail.com?subject=Project%20Request">
                            <button className="bg-teal-700 hover:bg-teal-800 text-white font-medium px-8 py-3 transition-colors duration-300 flex items-center gap-2">
                                <Mail className="w-5 h-5" />
                                Request a Project / Collaborate
                            </button>
                        </a>
                    </div>

                    {/* Education Section */}
                    <h3 className="text-2xl md:text-3xl font-bold font-heading mb-8">
                        <span className="text-teal-500">Education</span>
                    </h3>

                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-2 gap-4"
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        {/* University */}
                        <motion.div
                            variants={itemVariants}
                            className="bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 hover:border-teal-500 dark:hover:border-teal-500 transition-colors duration-300"
                        >
                            <div className="flex items-start justify-between mb-3">
                                <span className="bg-teal-700 text-white text-xs font-medium px-2 py-1">
                                    2020 - 2024
                                </span>
                                <span className="text-xs text-zinc-600 dark:text-zinc-300">
                                    Bachelor&apos;s Degree
                                </span>
                            </div>
                            <h4 className="font-heading font-bold text-lg mb-1">
                                S1 Teknik Informatika
                            </h4>
                            <p className="text-zinc-700 dark:text-zinc-300 text-sm mb-1">
                                Universitas Maritim Raja Ali Haji
                            </p>
                            <p className="text-zinc-600 dark:text-zinc-400 text-xs flex items-center gap-1">
                                <Globe className="w-3 h-3" />
                                Tanjungpinang, Kepulauan Riau, Indonesia
                            </p>
                        </motion.div>

                        {/* High School */}
                        <motion.div
                            variants={itemVariants}
                            className="bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 hover:border-teal-500 dark:hover:border-teal-500 transition-colors duration-300"
                        >
                            <div className="flex items-start justify-between mb-3">
                                <span className="bg-zinc-500 text-white text-xs font-medium px-2 py-1">
                                    2017 - 2020
                                </span>
                                <span className="text-xs text-zinc-600 dark:text-zinc-300">
                                    High School
                                </span>
                            </div>
                            <h4 className="font-heading font-bold text-lg mb-1">
                                Matematika dan Ilmu Alam
                            </h4>
                            <p className="text-zinc-700 dark:text-zinc-300 text-sm mb-1">
                                SMA Negeri 1 Bintan Utara
                            </p>
                            <p className="text-zinc-600 dark:text-zinc-400 text-xs flex items-center gap-1">
                                <Globe className="w-3 h-3" />
                                Tanjunguban, Kepulauan Riau, Indonesia
                            </p>
                        </motion.div>
                    </motion.div>

                    {/* About This Website Section */}
                    <motion.div
                        className="mt-16"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h3 className="text-2xl md:text-3xl font-bold font-heading mb-4">
                            About This <span className="text-teal-500">Website</span>
                        </h3>
                        <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed mb-8 max-w-3xl">
                            This website is a hobby project I built to showcase my portfolio, projects, and skills.
                            It&apos;s designed with a clean, modern aesthetic and built using some of the latest web technologies.
                            Feel free to explore and get inspired! Anyway, this website is 50% human-crafted and 50% vibe-coded lol.
                        </p>

                        <motion.div
                            className="grid grid-cols-1 md:grid-cols-2 gap-4"
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                        >
                            {/* Frontend Stack */}
                            <motion.div
                                variants={itemVariants}
                                className="bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 hover:border-teal-500 dark:hover:border-teal-500 transition-colors duration-300"
                            >
                                <h4 className="font-heading font-bold text-sm text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-4">
                                    Frontend
                                </h4>
                                <div className="flex flex-wrap gap-4">
                                    <div className="flex items-center gap-2 bg-zinc-200 dark:bg-zinc-800 px-3 py-2">
                                        <SiNextdotjs className="w-5 h-5 text-teal-500" />
                                        <span className="text-sm font-medium">Next.js</span>
                                    </div>
                                    <div className="flex items-center gap-2 bg-zinc-200 dark:bg-zinc-800 px-3 py-2">
                                        <SiReact className="w-5 h-5 text-teal-500" />
                                        <span className="text-sm font-medium">React</span>
                                    </div>
                                    <div className="flex items-center gap-2 bg-zinc-200 dark:bg-zinc-800 px-3 py-2">
                                        <SiTypescript className="w-5 h-5 text-teal-500" />
                                        <span className="text-sm font-medium">TypeScript</span>
                                    </div>
                                    <div className="flex items-center gap-2 bg-zinc-200 dark:bg-zinc-800 px-3 py-2">
                                        <SiTailwindcss className="w-5 h-5 text-teal-500" />
                                        <span className="text-sm font-medium">Tailwind CSS</span>
                                    </div>
                                    <div className="flex items-center gap-2 bg-zinc-200 dark:bg-zinc-800 px-3 py-2">
                                        <SiShadcnui className="w-5 h-5 text-teal-500" />
                                        <span className="text-sm font-medium">shadcn/ui</span>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Backend AI Stack */}
                            <motion.div
                                variants={itemVariants}
                                className="bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 hover:border-teal-500 dark:hover:border-teal-500 transition-colors duration-300"
                            >
                                <h4 className="font-heading font-bold text-sm text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-4">
                                    Backend AI
                                </h4>
                                <div className="flex flex-wrap gap-4">
                                    <div className="flex items-center gap-2 bg-zinc-200 dark:bg-zinc-800 px-3 py-2">
                                        <SiFastapi className="w-5 h-5 text-teal-500" />
                                        <span className="text-sm font-medium">FastAPI</span>
                                    </div>
                                    <div className="flex items-center gap-2 bg-zinc-200 dark:bg-zinc-800 px-3 py-2">
                                        <SiPython className="w-5 h-5 text-teal-500" />
                                        <span className="text-sm font-medium">Python</span>
                                    </div>
                                    <div className="flex items-center gap-2 bg-zinc-200 dark:bg-zinc-800 px-3 py-2">
                                        <SiGooglegemini className="w-5 h-5 text-teal-500" />
                                        <span className="text-sm font-medium">Google Gemini AI</span>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>

                        {/* Design System Section */}
                        <motion.div
                            className="mt-8"
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                        >
                            <h3 className="text-2xl md:text-3xl font-bold font-heading mb-6">
                                Design <span className="text-teal-500">System</span>
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* Typography */}
                                <motion.div
                                    variants={itemVariants}
                                    className="bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 hover:border-teal-500 dark:hover:border-teal-500 transition-colors duration-300"
                                >
                                    <h5 className="font-heading font-bold text-sm text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-4">
                                        Typography
                                    </h5>
                                    <div className="space-y-4">
                                        <div className="border-b border-zinc-200 dark:border-zinc-800 pb-3">
                                            <p className="font-heading text-lg font-bold mb-1">Lexend Deca</p>
                                            <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-2">Headings &amp; Titles</p>
                                            <code className="text-xs bg-zinc-200 dark:bg-zinc-800 px-2 py-1">--font-heading / font-heading</code>
                                        </div>
                                        <div>
                                            <p className="font-sans text-lg font-medium mb-1">Inclusive Sans</p>
                                            <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-2">Body Text &amp; UI</p>
                                            <code className="text-xs bg-zinc-200 dark:bg-zinc-800 px-2 py-1">--font-sans / font-sans</code>
                                        </div>
                                    </div>
                                </motion.div>

                                {/* Color Palette */}
                                <motion.div
                                    variants={itemVariants}
                                    className="bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 hover:border-teal-500 dark:hover:border-teal-500 transition-colors duration-300"
                                >
                                    <h5 className="font-heading font-bold text-sm text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-4">
                                        Color Palette
                                    </h5>
                                    <div className="space-y-3">
                                        {/* Primary Accent */}
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 bg-teal-500 border border-zinc-300 dark:border-zinc-700" />
                                            <div>
                                                <p className="text-sm font-medium">Teal 500 (Primary Accent)</p>
                                                <p className="text-xs text-zinc-500 dark:text-zinc-400">teal-500 | #14b8a6</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 bg-teal-700 border border-zinc-300 dark:border-zinc-700" />
                                            <div>
                                                <p className="text-sm font-medium">Teal 700 (Buttons)</p>
                                                <p className="text-xs text-zinc-500 dark:text-zinc-400">teal-700 | #0f766e</p>
                                            </div>
                                        </div>
                                        {/* Background Light */}
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 border border-zinc-300 dark:border-zinc-700" style={{ backgroundColor: '#FFFBFF' }} />
                                            <div>
                                                <p className="text-sm font-medium">Background (Light)</p>
                                                <p className="text-xs text-zinc-500 dark:text-zinc-400">background | #FFFBFF</p>
                                            </div>
                                        </div>
                                        {/* Background Dark */}
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 border border-zinc-300 dark:border-zinc-700" style={{ backgroundColor: '#191919' }} />
                                            <div>
                                                <p className="text-sm font-medium">Background (Dark)</p>
                                                <p className="text-xs text-zinc-500 dark:text-zinc-400">background | #191919</p>
                                            </div>
                                        </div>
                                        {/* Foreground */}
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 bg-zinc-100 border border-zinc-300 dark:border-zinc-700" />
                                            <div>
                                                <p className="text-sm font-medium">Card Background</p>
                                                <p className="text-xs text-zinc-500 dark:text-zinc-400">zinc-100/zinc-900 | #f4f4f5 / #18181b</p>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>

                                {/* Animation System */}
                                <motion.div
                                    variants={itemVariants}
                                    className="bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 hover:border-teal-500 dark:hover:border-teal-500 transition-colors duration-300"
                                >
                                    <h5 className="font-heading font-bold text-sm text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-4">
                                        Animation System
                                    </h5>
                                    <div className="space-y-3 text-sm">
                                        <div className="flex justify-between items-center border-b border-zinc-200 dark:border-zinc-800 pb-2">
                                            <span className="text-zinc-600 dark:text-zinc-300">Library</span>
                                            <span className="font-medium">Framer Motion</span>
                                        </div>
                                        <div className="flex justify-between items-center border-b border-zinc-200 dark:border-zinc-800 pb-2">
                                            <span className="text-zinc-600 dark:text-zinc-300">Fade-in Duration</span>
                                            <code className="text-xs bg-zinc-200 dark:bg-zinc-800 px-2 py-1">500-600ms</code>
                                        </div>
                                        <div className="flex justify-between items-center border-b border-zinc-200 dark:border-zinc-800 pb-2">
                                            <span className="text-zinc-600 dark:text-zinc-300">Stagger Children</span>
                                            <code className="text-xs bg-zinc-200 dark:bg-zinc-800 px-2 py-1">100ms (0.1s)</code>
                                        </div>
                                        <div className="flex justify-between items-center border-b border-zinc-200 dark:border-zinc-800 pb-2">
                                            <span className="text-zinc-600 dark:text-zinc-300">Easing Function</span>
                                            <code className="text-xs bg-zinc-200 dark:bg-zinc-800 px-2 py-1">easeOut</code>
                                        </div>
                                        <div className="flex justify-between items-center border-b border-zinc-200 dark:border-zinc-800 pb-2">
                                            <span className="text-zinc-600 dark:text-zinc-300">Translate Y (Start)</span>
                                            <code className="text-xs bg-zinc-200 dark:bg-zinc-800 px-2 py-1">20px</code>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-zinc-600 dark:text-zinc-300">Hover Transitions</span>
                                            <code className="text-xs bg-zinc-200 dark:bg-zinc-800 px-2 py-1">300ms</code>
                                        </div>
                                    </div>
                                </motion.div>

                                {/* Design Principles */}
                                <motion.div
                                    variants={itemVariants}
                                    className="bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 hover:border-teal-500 dark:hover:border-teal-500 transition-colors duration-300"
                                >
                                    <h5 className="font-heading font-bold text-sm text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-4">
                                        Design Principles
                                    </h5>
                                    <ul className="space-y-3 text-sm">
                                        <li className="flex items-start gap-2">
                                            <span className="text-teal-500 mt-0.5">•</span>
                                            <div>
                                                <span className="font-medium">Non-Rounded Design</span>
                                                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">All corners use <code className="bg-zinc-200 dark:bg-zinc-800 px-1">rounded-none</code> for brutalist aesthetic</p>
                                            </div>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-teal-500 mt-0.5">•</span>
                                            <div>
                                                <span className="font-medium">Bento Grid Layout</span>
                                                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">Modular card-based layout with varying spans</p>
                                            </div>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-teal-500 mt-0.5">•</span>
                                            <div>
                                                <span className="font-medium">Hover Border Accent</span>
                                                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">Cards highlight with <code className="bg-zinc-200 dark:bg-zinc-800 px-1">border-teal-500</code> on hover</p>
                                            </div>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-teal-500 mt-0.5">•</span>
                                            <div>
                                                <span className="font-medium">Grayscale-to-Color</span>
                                                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">Images start grayscale, colorize on hover</p>
                                            </div>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-teal-500 mt-0.5">•</span>
                                            <div>
                                                <span className="font-medium">Underline Highlights</span>
                                                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">Key text uses <code className="bg-zinc-200 dark:bg-zinc-800 px-1">border-b-2 border-teal-500</code></p>
                                            </div>
                                        </li>
                                    </ul>
                                </motion.div>
                            </div>
                        </motion.div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    )
}

