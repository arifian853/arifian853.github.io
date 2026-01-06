"use client"

import { motion } from "framer-motion"
import { Code2, Handshake, Mail, Copy, Check, ExternalLink } from "lucide-react"
import {
    SiInstagram,
    SiLinkedin,
    SiGithub,
    SiX,
} from "react-icons/si"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { useState } from "react"

const socialLinks = [
    { name: "@arifiansaputra_", icon: SiInstagram, url: "https://instagram.com/arifiansaputra_" },
    { name: "Arifian Saputra", icon: SiLinkedin, url: "https://linkedin.com/in/arifiansaputra" },
    { name: "arifian853", icon: SiGithub, url: "https://github.com/arifian853" },
    { name: "@ArifianSaputra1", icon: SiX, url: "https://x.com/ArifianSaputra0" },
]

const services = [
    {
        category: "Web Development",
        items: [
            "Frontend (HTML, CSS, JS, React, Tailwind, etc.)",
            "Backend (Express, Flask, FastAPI) with Database",
            "Full Stack (MERN Stack, Next.js)",
            "WordPress Development",
        ]
    },
    {
        category: "AI & Machine Learning",
        items: [
            "Python API & AI Chatbot API",
            "AI Chatbot App (Full Stack)",
            "ML Modelling (Deep Learning, NLP, Computer Vision)",
            "Recommendation Systems & Time Series Forecasting",
            "Model Deployment with Python Backend",
        ]
    },
    {
        category: "Mentoring & Others",
        items: [
            "Private Mentoring (AI & Web Development)",
            "DevOps & Linux Tutorials",
            "Deployment Guidance",
            "Webinar Request (Institutional)",
        ]
    }
]

const EMAIL = "arifiansaputra43@gmail.com"

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

export function ContactCTA() {
    const [copied, setCopied] = useState(false)

    const copyEmail = () => {
        navigator.clipboard.writeText(EMAIL)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <section id="contact" className="relative py-20 overflow-hidden">
            {/* Content Container */}
            <div className="relative z-10 w-full max-w-7xl mx-auto px-6">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16"
                >
                    {/* Left Side - CTA */}
                    <motion.div variants={itemVariants} className="space-y-6">
                        <h2 className="text-4xl md:text-5xl font-bold font-heading">
                            Let&apos;s Build <span className="text-teal-500">Something Amazing</span>
                        </h2>
                        <p className="text-zinc-600 dark:text-zinc-400 text-lg leading-relaxed max-w-md">
                            Have a project idea? Need a custom application or looking for AI/Web expertise?
                            I&apos;m here to help bring your vision to life.
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 pt-4">
                            {/* Request Custom App Dialog */}
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button
                                        size="lg"
                                        className="rounded-none bg-teal-500 hover:bg-teal-600 text-white font-medium"
                                    >
                                        <Code2 className="w-5 h-5 mr-2" />
                                        Request Custom App
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className="w-[calc(100%-2rem)] max-w-[600px] max-h-[85vh] overflow-y-auto rounded-none border-zinc-200 dark:border-zinc-800 mx-auto">
                                    <DialogHeader>
                                        <DialogTitle className="text-2xl font-heading">
                                            What Can I Build For You?
                                        </DialogTitle>
                                        <DialogDescription className="text-base">
                                            Here are the services I offer. Pick what you need and reach out!
                                        </DialogDescription>
                                    </DialogHeader>

                                    <div className="space-y-6 py-4">
                                        {services.map((service, index) => (
                                            <div key={index}>
                                                <h4 className="font-semibold text-teal-500 mb-2">
                                                    {service.category}
                                                </h4>
                                                <ul className="space-y-1">
                                                    {service.items.map((item, itemIndex) => (
                                                        <li
                                                            key={itemIndex}
                                                            className="text-sm text-zinc-600 dark:text-zinc-400 flex items-start gap-2"
                                                        >
                                                            <span className="text-teal-500 mt-1">•</span>
                                                            {item}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="border-t border-zinc-200 dark:border-zinc-800 pt-4">
                                        <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-3">
                                            Interested? Send me an email with your project details:
                                        </p>
                                        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                                            <code className="w-full sm:flex-1 bg-zinc-100 dark:bg-zinc-800 px-3 sm:px-4 py-2 text-xs sm:text-sm font-mono break-all">
                                                {EMAIL}
                                            </code>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="rounded-none"
                                                onClick={copyEmail}
                                            >
                                                {copied ? (
                                                    <Check className="w-4 h-4 text-teal-500" />
                                                ) : (
                                                    <Copy className="w-4 h-4" />
                                                )}
                                            </Button>
                                            <a href={`mailto:${EMAIL}`}>
                                                <Button
                                                    size="sm"
                                                    className="rounded-none bg-teal-500 hover:bg-teal-600"
                                                >
                                                    <Mail className="w-4 h-4 mr-1" />
                                                    Email
                                                </Button>
                                            </a>
                                        </div>
                                    </div>
                                </DialogContent>
                            </Dialog>

                            {/* Collaborate Dialog */}
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button
                                        size="lg"
                                        variant="outline"
                                        className="rounded-none border-zinc-300 dark:border-zinc-600 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-teal-500 hover:border-teal-500 font-medium"
                                    >
                                        <Handshake className="w-5 h-5 mr-2" />
                                        Collaborate With Me
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className="w-[calc(100%-2rem)] max-w-[400px] rounded-none border-zinc-200 dark:border-zinc-800 mx-auto">
                                    <DialogHeader>
                                        <DialogTitle className="text-2xl font-heading">
                                            Let&apos;s Collaborate!
                                        </DialogTitle>
                                        <DialogDescription className="text-base">
                                            Wanna collaborate on any tech stuff? Just drop me an email.
                                        </DialogDescription>
                                    </DialogHeader>

                                    <div className="py-6">
                                        <div className="flex items-center gap-3">
                                            <code className="flex-1 bg-zinc-100 dark:bg-zinc-800 px-3 sm:px-4 py-3 text-xs sm:text-sm font-mono text-center break-all">
                                                {EMAIL}
                                            </code>
                                            <Button
                                                variant="outline"
                                                className="rounded-none"
                                                onClick={copyEmail}
                                            >
                                                {copied ? (
                                                    <>
                                                        <Check className="w-4 h-4 mr-2 text-teal-500" />
                                                        Copied!
                                                    </>
                                                ) : (
                                                    <>
                                                        <Copy className="w-4 h-4 mr-2" />
                                                        Copy
                                                    </>
                                                )}
                                            </Button>
                                        </div>
                                    </div>
                                </DialogContent>
                            </Dialog>
                        </div>
                    </motion.div>

                    {/* Right Side - Connect */}
                    <motion.div
                        variants={itemVariants}
                        className="bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 space-y-6"
                    >
                        <h3 className="text-sm font-bold font-heading text-zinc-500 uppercase tracking-wider">
                            Connect With Me
                        </h3>

                        {/* Social Links */}
                        <div className="space-y-4">
                            {socialLinks.map((social, index) => (
                                <a
                                    key={index}
                                    href={social.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-4 group"
                                >
                                    <div className="w-10 h-10 flex items-center justify-center bg-zinc-200 dark:bg-zinc-800 group-hover:bg-teal-500 dark:group-hover:bg-teal-500 transition-colors duration-300">
                                        <social.icon className="w-5 h-5 text-zinc-500 dark:text-zinc-400 group-hover:text-white dark:group-hover:text-white transition-colors duration-300" />
                                    </div>
                                    <span className="text-zinc-600 dark:text-zinc-400 group-hover:text-teal-500 dark:group-hover:text-teal-500 transition-colors duration-300 font-medium">
                                        {social.name}
                                    </span>
                                    <ExternalLink className="w-4 h-4 text-zinc-600 dark:text-zinc-400 group-hover:text-teal-500 dark:group-hover:text-teal-500 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                                </a>
                            ))}
                        </div>

                        {/* Email */}
                        <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800">
                            <p className="text-sm text-zinc-500 mb-2">Or email me directly:</p>
                            <a
                                href={`mailto:${EMAIL}`}
                                className="text-teal-500 hover:text-teal-400 font-medium flex items-center gap-2"
                            >
                                <Mail className="w-4 h-4" />
                                {EMAIL}
                            </a>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    )
}
