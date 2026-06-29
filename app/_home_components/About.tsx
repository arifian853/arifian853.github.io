"use client";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Code2,
  Brain,
  Database,
  Globe,
  Sparkles,
  BookOpen,
} from "lucide-react";
import { useRef } from "react";
import { ShimmerCard } from "@/components/ui/shimmer-card";
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
  SiDocker,
} from "react-icons/si";
import { SiPlaywright } from "@/components/ui/project-icon";

const stats = [
  { label: "Years Teaching", value: "2+" },
  { label: "Projects Built", value: "15+" },
  { label: "Students Taught", value: "100+" },
];

const skills = [
  { name: "Machine Learning", icon: Brain },
  { name: "LLM & NLP", icon: Sparkles },
  { name: "Full Stack Dev", icon: Code2 },
  { name: "Database", icon: Database },
  { name: "Web Apps", icon: Globe },
  { name: "Teaching", icon: BookOpen },
];

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
  { name: "Playwright", icon: SiPlaywright },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 32, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
    },
  },
};

// TiltCard replaced by SpotlightCard (ShimmerCard)

export function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const sectionY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative min-h-screen flex items-center py-24 overflow-hidden"
    >
      {/* Subtle background accent */}
      <motion.div
        className="absolute -right-40 top-1/4 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(112,137,168,0.06) 0%, transparent 70%)",
          y: sectionY,
        }}
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-10 flex items-center gap-3"
        >
          <span className="inline-block w-6 h-px bg-brand-500/50" />
          <span className="text-xs font-heading tracking-[0.2em] uppercase text-brand-500/70">
            About
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold font-heading">
            About <span className="text-brand-500">Me</span>
          </h2>
          <div className="w-16 h-px bg-brand-500 mt-4" />
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
          <motion.div variants={cardVariants} className="md:row-span-2">
            <ShimmerCard className="h-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-none p-6 flex flex-col items-center justify-center group hover:border-brand-500 dark:hover:border-brand-500 transition-colors duration-300">
              <div className="relative mb-4">
                <div className="w-32 h-32 overflow-hidden rounded-none border-2 border-brand-500">
                  <Image
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                    src="/profile.avif"
                    alt="Arifian Saputra"
                    width={128}
                    height={128}
                    quality={80}
                    placeholder="blur"
                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAUH/8QAIhAAAQMDBAMAAAAAAAAAAAAAAQIDBAAFESExQVESE2H/xAAVAQEBAAAAAAAAAAAAAAAAAAADBP/EABkRAAIDAQAAAAAAAAAAAAAAAAACAQMRIf/aAAwDAQACEQMRAD8AxmK8h0rcKUhR0SCc8UUotfEe0qSoqJIOuaKKVbpGxP/Z"
                  />
                </div>
              </div>
              <h3 className="text-xl font-bold font-heading mt-2">
                Arifian Saputra
              </h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-300 text-center mt-1">
                AI Technical Mentor <br /> @ Infinite Learning Indonesia
              </p>
              <p className="text-sm text-zinc-600 dark:text-zinc-300 text-center mt-0.5">
                Full Stack Web Developer
              </p>
            </ShimmerCard>
          </motion.div>

          {/* About Text Card - Spans 2 columns */}
          <motion.div
            variants={cardVariants}
            className="md:col-span-2 lg:col-span-2"
          >
            <ShimmerCard className="h-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-none p-6 hover:border-brand-500 dark:hover:border-brand-500 transition-colors duration-300">
              <h3 className="text-lg font-bold font-heading mb-3 flex items-center gap-2">
                Who Am I?
              </h3>
              <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed text-sm md:text-base">
                A passionate individual with deep interest in{" "}
                <span className="border-b-2 border-brand-500 font-medium text-foreground">
                  AI and Web Development
                </span>
                . I&apos;ve been teaching for{" "}
                <span className="border-b-2 border-brand-500 font-medium text-foreground">
                  2+ years in AI
                </span>{" "}
                field, specializing in Machine Learning, Large Language Models,
                Natural Language Processing, building production-ready web
                applications, and QA automation with Playwright.
              </p>
            </ShimmerCard>
          </motion.div>

          {/* Stats Cards - Single column */}
          <motion.div variants={cardVariants}>
            <ShimmerCard className="h-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-none p-6 hover:border-brand-500 dark:hover:border-brand-500 transition-colors duration-300">
              <h3 className="text-sm font-bold font-heading mb-4 text-zinc-600 dark:text-zinc-300 uppercase tracking-wider">
                Stats
              </h3>
              <div className="space-y-4">
                {stats.map((stat, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between"
                  >
                    <span className="text-sm text-zinc-700 dark:text-zinc-300">
                      {stat.label}
                    </span>
                    <span className="bg-brand-700 text-white text-sm font-bold px-3 py-1 rounded-none">
                      {stat.value}
                    </span>
                  </div>
                ))}
              </div>
            </ShimmerCard>
          </motion.div>

          {/* Skills Grid - Spans 2 columns */}
          <motion.div
            variants={cardVariants}
            className="md:col-span-2 lg:col-span-2"
          >
            <ShimmerCard className="h-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-none p-6 hover:border-brand-500 dark:hover:border-brand-500 transition-colors duration-300">
              <h3 className="text-sm font-bold font-heading mb-4 text-zinc-600 dark:text-zinc-300 uppercase tracking-wider">
                Skills & Expertise
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {skills.map((skill, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 bg-zinc-200 dark:bg-zinc-800 px-3 py-2 rounded-none border-b-2 border-transparent hover:border-b-2 hover:border-brand-500 dark:hover:border-brand-500 hover:bg-brand-500/10 transition-all duration-300 cursor-default group"
                  >
                    <skill.icon className="w-4 h-4 text-brand-500 group-hover:scale-110 transition-transform" />
                    <span className="text-sm font-medium">{skill.name}</span>
                  </div>
                ))}
              </div>
            </ShimmerCard>
          </motion.div>

          {/* Quote */}
          <motion.div variants={cardVariants}>
            <ShimmerCard className="h-full bg-brand-600 dark:bg-brand-800 text-white p-6 flex flex-col justify-center transition-colors duration-300 group overflow-hidden relative">
              <motion.div
                className="absolute -top-6 -right-6 w-32 h-32 rounded-full bg-white/5 pointer-events-none"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <blockquote className="text-sm md:text-base font-medium italic leading-relaxed relative z-10">
                &ldquo;Teaching is learning twice.&rdquo;
              </blockquote>
              <cite className="text-xs md:text-sm mt-4 opacity-80 relative z-10 block">
                — Joseph Joubert
              </cite>
            </ShimmerCard>
          </motion.div>

          {/* Tech Stack Card - Full Width */}
          <motion.div
            variants={cardVariants}
            className="md:col-span-3 lg:col-span-4"
          >
            <ShimmerCard className="h-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-none p-6 hover:border-brand-500 dark:hover:border-brand-500 transition-colors duration-300">
              <div className="flex flex-wrap justify-center gap-6">
                {techStack.map((tech, index) => {
                  const anchorName = `--home-tech-anchor-${index}`;
                  return (
                    <div
                      key={index}
                      className="relative group cursor-pointer"
                      style={{ anchorName } as React.CSSProperties}
                    >
                      <tech.icon className="w-7 h-7 text-zinc-500 dark:text-zinc-400 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors duration-300" />
                      {/* Tooltip with Anchor Positioning support and absolute fallback */}
                      <div
                        style={{ "--anchor-target": anchorName } as React.CSSProperties}
                        className="tech-tooltip bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 text-xs px-3 py-1.5 rounded-none opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap z-50"
                      >
                        {tech.name}
                        {/* Arrow */}
                        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-zinc-900 dark:bg-zinc-100 rotate-45" />
                      </div>
                    </div>
                  );
                })}
              </div>
            </ShimmerCard>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
