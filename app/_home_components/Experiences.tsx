"use client"

import { motion } from "framer-motion"
import { Building2, MapPin, Calendar } from "lucide-react"

const experiences = [
  {
    id: 1,
    position: "Mentee - Front-End Web & React Developer",
    company: "Dicoding Indonesia",
    type: "Apprenticeship (MSIB)",
    workMode: "Remote",
    time: "Aug 2022 - Dec 2022",
    location: "Tanjungpinang, Riau Islands",
    description: "Completed MSIB program at Dicoding Indonesia, learning Front-End Web Development, ReactJS, Progressive Web Apps (PWA), and deployment techniques.",
    skillset: [
      "HTML", "CSS", "JavaScript", "React", "PWA"
    ]
  },
  {
    id: 2,
    position: "Mentee - RHCSA & IBM AI/Cybersecurity",
    company: "Infinite Learning Indonesia",
    type: "Apprenticeship (MSIB)",
    workMode: "Hybrid",
    time: "Feb 2023 - Jul 2023",
    location: "Batam, Riau Islands",
    description: "Completed MSIB program with RedHat Certified System Administrator training, IBM AI Practitioner & Cybersecurity Practitioner certifications, and AI capstone project.",
    skillset: [
      "RedHat Administration", "Linux", "AI", "Cybersecurity", "IBM Cloud"
    ]
  },
  {
    id: 3,
    position: "Mentor for IBM Academy: Hybrid Cloud and AI",
    company: "Infinite Learning Indonesia",
    type: "Contract + Internship",
    workMode: "On-site",
    time: "Aug 2023 - Feb 2024",
    location: "Batam, Riau Islands",
    description: "Mentored at IBM Academy Hybrid Cloud & AI program, teaching RHEL System Administration, AI fundamentals, ethics, and Cybersecurity essentials.",
    skillset: [
      "RedHat Administration", "Linux", "CLI", "AI", "Cybersecurity"
    ]
  },
  {
    id: 4,
    position: "Mentor for IBM Academy: Advance AI",
    company: "Infinite Learning Indonesia",
    type: "Contract",
    workMode: "On-site",
    time: "February 2024 - July 2024",
    location: "Batam, Riau Islands",
    description: "Mentored students at IBM Academy Advance AI program, teaching Data Science, Generative AI, ML, and Deep Learning using IBM Cloud technologies.",
    skillset: [
      "AI Development", "Data Science", "TensorFlow", "Keras", "Python", "Flask"
    ]
  },
  {
    id: 5,
    position: "Lead Mentor for IBM Academy: Advance AI",
    company: "Infinite Learning Indonesia",
    type: "Contract",
    workMode: "On-site",
    time: "July 2024 - January 2025",
    location: "Batam, Riau Islands",
    description: "Led mentor team at IBM Academy Advance AI program, guiding students in ML, Generative AI, Deep Learning, and WatsonX.ai on IBM Cloud platform.",
    skillset: [
      "Team Management", "Leadership", "AI Development", "TensorFlow", "Keras", "Python"
    ]
  },
  {
    id: 6,
    position: "Head of AI Development Program",
    company: "Infinite Learning Indonesia",
    type: "Contract",
    workMode: "On-site",
    time: "January 2025 - Present",
    location: "Batam, Riau Islands",
    description: "Leading the AI Development KMM Program, mentoring mentees in ML, Data Science, and model deployment. Managing mentor teams and ensuring quality capstone project delivery.",
    skillset: [
      "Team Management", "Leadership", "AI Development", "TensorFlow", "Python", "Flask"
    ]
  },
]

const getExperiencesSortedByNewest = () => {
  return [...experiences].sort((a, b) => b.id - a.id)
}

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

export function Experiences() {
  return (
    <section id="experiences" className="relative min-h-screen flex items-center py-20 overflow-hidden">
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
            Work <span className="text-teal-500">Experience</span>
          </h2>
          <div className="w-20 h-1 bg-teal-500 mt-4" />
        </motion.div>

        {/* Experience Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-4"
        >
          {getExperiencesSortedByNewest().map((exp, index) => {
            const isLatest = index === 0 // First item after sorting = highest ID = latest

            return (
              <motion.div
                key={exp.id}
                variants={itemVariants}
                className={`
                                    bg-zinc-100 dark:bg-zinc-900 
                                    border border-zinc-200 dark:border-zinc-800 
                                    rounded-none p-6 
                                    hover:border-teal-500 dark:hover:border-teal-500 
                                    transition-all duration-300
                                    ${isLatest ? 'border-l-4 border-l-teal-500 dark:border-l-teal-500' : ''}
                                `}
              >
                {/* Top Row: Date & Type */}
                <div className="flex items-center gap-3 flex-wrap mb-3">
                  <span className="bg-teal-700 text-white text-xs font-medium px-2 py-1 rounded-none flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {exp.time}
                  </span>
                  <span className="text-xs text-zinc-600 dark:text-zinc-300 bg-zinc-200 dark:bg-zinc-800 px-2 py-1 rounded-none">
                    {exp.type}
                  </span>
                  <span className="text-xs text-zinc-600 dark:text-zinc-300 bg-zinc-200 dark:bg-zinc-800 px-2 py-1 rounded-none">
                    {exp.workMode}
                  </span>
                  {isLatest && (
                    <span className="text-xs text-teal-500 font-medium animate-pulse">
                      Current
                    </span>
                  )}
                </div>

                {/* Position */}
                <h3 className="font-heading font-bold leading-tight mb-2 text-lg md:text-xl">
                  {exp.position}
                </h3>

                {/* Company & Location */}
                <div className="flex items-center gap-4 flex-wrap text-sm text-zinc-600 dark:text-zinc-300 mb-3">
                  <span className="flex items-center gap-1">
                    <Building2 className="w-4 h-4" />
                    {exp.company}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {exp.location}
                  </span>
                </div>

                {/* Description */}
                <p className="text-zinc-700 dark:text-zinc-300 text-sm leading-relaxed mb-4">
                  {exp.description}
                </p>

                {/* Skills */}
                <div className="flex items-center gap-2 flex-wrap">
                  {exp.skillset.map((skill, skillIndex) => (
                    <span
                      key={skillIndex}
                      className="text-xs px-2 py-1 bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 rounded-none border-b-2 border-transparent hover:border-teal-500 transition-colors duration-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
