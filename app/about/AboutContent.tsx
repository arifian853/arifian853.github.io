"use client"
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
    SiTensorflow
} from "react-icons/si"

const stats = [
    { label: "Years Teaching", value: "2+", color: "bg-teal-500" },
    { label: "Projects Built", value: "15+", color: "bg-teal-500" },
    { label: "Students Taught", value: "100+", color: "bg-teal-500" },
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
]

const socialLinks = [
    { name: "@arifiansaputra_", icon: SiInstagram, url: "https://instagram.com/arifiansaputra_" },
    { name: "Arifian Saputra", icon: SiLinkedin, url: "https://linkedin.com/in/arifiansaputra" },
    { name: "arifian853", icon: SiGithub, url: "https://github.com/arifian853" },
    { name: "@ArifianSaputra1", icon: SiX, url: "https://x.com/ArifianSaputra1" },
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
                                <img
                                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                                    src="ganyu.webp"
                                    alt="Arifian Saputra"
                                />
                            </div>
                        </div>
                        <h3 className="text-xl font-bold font-heading mt-2">Arifian Saputra</h3>
                        <p className="text-sm text-zinc-500 dark:text-zinc-400 text-center mt-1">
                            AI Technical Mentor <br /> @ Infinite Learning Indonesia
                        </p>
                        <p className="text-sm text-zinc-500 dark:text-zinc-400 text-center">
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
                            I've been teaching for{" "}
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
                        <h3 className="text-sm font-bold font-heading mb-4 text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                            Stats
                        </h3>
                        <div className="space-y-4">
                            {stats.map((stat, index) => (
                                <div key={index} className="flex items-center justify-between">
                                    <span className="text-sm text-zinc-600 dark:text-zinc-400">{stat.label}</span>
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
                        <h3 className="text-sm font-bold font-heading mb-4 text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                            Skills & Expertise
                        </h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                            {skills.map((skill, index) => (
                                <motion.div
                                    key={index}
                                    className="flex items-center gap-2 bg-zinc-200 dark:bg-zinc-800 px-3 py-2 rounded-none border border-transparent hover:border-teal-500 dark:hover:border-teal-500 hover:bg-teal-500/10 transition-all duration-300 cursor-default group"
                                    whileHover={{ x: 5 }}
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
                        <h3 className="text-sm font-bold font-heading mb-4 text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                            Get In Touch
                        </h3>

                        {/* Buttons */}
                        <div className="space-y-2 mb-4">
                            <a
                                href="/resume.pdf"
                                download
                                className="flex items-center gap-2 text-sm px-3 py-2 bg-teal-500 text-white rounded-none hover:bg-teal-600 transition-colors duration-300 w-full justify-center"
                            >
                                <Download className="w-4 h-4" />
                                Resume
                            </a>
                            <div className="flex flex-row gap-3">
                                <a
                                href="mailto:arifian@email.com"
                                className="flex items-center gap-2 text-sm px-3 py-2 bg-zinc-200 dark:bg-zinc-800 rounded-none hover:bg-teal-500 hover:text-white dark:hover:bg-teal-500 transition-colors duration-300 w-full justify-center"
                            >
                                <Mail className="w-4 h-4" />
                                Email
                            </a>
                            <a
                                href="mailto:arifian@infinitelearning.id"
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
                                        className="w-5 h-5 text-zinc-400 dark:text-zinc-500 group-hover:text-teal-500 dark:group-hover:text-teal-500 transition-colors duration-300"
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
                                        className="w-7 h-7 text-zinc-400 dark:text-zinc-500 group-hover:text-teal-500 dark:group-hover:text-teal-500 transition-colors duration-300"
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
