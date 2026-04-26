"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion"
import { Send, MessageSquare, AlertCircle, Check, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Message {
    id: string
    content: string
    timestamp: string
    reply?: string
    replyTimestamp?: string
}

interface APIMessage {
    id: string
    message: string
    createdAt: string
    ipAddress: string
    reply?: string
    replyCreatedAt?: string
    isReplied: boolean
}

const API_BASE_URL = "https://arifian853-arifian-ai-v1-1.hf.space"

const formatDate = (dateString: string): string => {
    const date = new Date(dateString)
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    const d = date.getDate()
    const m = months[date.getMonth()]
    const y = date.getFullYear()
    const h = String(date.getHours()).padStart(2, '0')
    const min = String(date.getMinutes()).padStart(2, '0')
    return `${d} ${m} ${y}, ${h}:${min}`
}

const cardVariants = {
    hidden: { opacity: 0, y: 20, filter: "blur(4px)" },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: { duration: 0.4, delay: i * 0.06, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] }
    })
}

function SkeletonCard() {
    return (
        <div className="bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-4 animate-pulse">
            <div className="h-3 bg-zinc-200 dark:bg-zinc-800 rounded mb-2 w-3/4" />
            <div className="h-3 bg-zinc-200 dark:bg-zinc-800 rounded mb-2 w-full" />
            <div className="h-3 bg-zinc-200 dark:bg-zinc-800 rounded w-1/2" />
            <div className="mt-4 pt-3 border-t border-zinc-200 dark:border-zinc-800 flex justify-end">
                <div className="h-2.5 bg-zinc-200 dark:bg-zinc-800 rounded w-24" />
            </div>
        </div>
    )
}

export function MessageContent() {
    const [messages, setMessages] = useState<Message[]>([])
    const [input, setInput] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [isFetching, setIsFetching] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState(false)

    const charLimit = 500
    const charRatio = input.length / charLimit
    const charColor = charRatio > 0.9 ? "text-red-500" : charRatio > 0.7 ? "text-amber-500" : "text-zinc-400"

    const fetchMessages = async () => {
        setIsFetching(true)
        try {
            const response = await fetch(`${API_BASE_URL}/confessions/public/list?limit=50`)
            if (!response.ok) throw new Error("Failed to fetch messages")
            const data = await response.json()
            const messageList = Array.isArray(data) ? data : (data.confessions || data.messages || [])
            const transformed = messageList.map((msg: APIMessage, index: number) => ({
                id: msg.id || `msg-${index}`,
                content: msg.message,
                timestamp: formatDate(msg.createdAt),
                reply: msg.reply,
                replyTimestamp: msg.replyCreatedAt ? formatDate(msg.replyCreatedAt) : undefined
            }))
            setMessages(transformed)
        } catch (err) {
            console.error("Error fetching messages:", err)
            setError("Failed to load messages")
        } finally {
            setIsFetching(false)
        }
    }

    useEffect(() => { fetchMessages() }, [])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!input.trim() || isLoading) return
        setIsLoading(true)
        setError(null)
        setSuccess(false)
        try {
            const response = await fetch(`${API_BASE_URL}/confessions/public/submit`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: input.trim() })
            })
            if (!response.ok) {
                const result = await response.json()
                throw new Error(result.detail || "Failed to send message")
            }
            setInput("")
            setSuccess(true)
            setTimeout(() => setSuccess(false), 3000)
            await fetchMessages()
        } catch (err) {
            setError(err instanceof Error ? err.message : "An error occurred")
        } finally {
            setIsLoading(false)
        }
    }

    const sectionRef = useRef<HTMLElement>(null)
    const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] })
    const bgY = useTransform(scrollYProgress, [0, 1], [0, 100])

    return (
        <section ref={sectionRef} className="relative min-h-screen py-20 overflow-hidden">
            {/* Toast notifications — fixed bottom-right */}
            <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 pointer-events-none">
                <AnimatePresence>
                    {success && (
                        <motion.div
                            initial={{ opacity: 0, y: 16, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 8, scale: 0.95 }}
                            transition={{ duration: 0.25 }}
                            className="flex items-center gap-2.5 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 text-xs px-4 py-3 shadow-lg"
                        >
                            <Check className="w-3.5 h-3.5 shrink-0 text-sblue-400 dark:text-sblue-600" />
                            Message sent! Thanks for reaching out.
                        </motion.div>
                    )}
                </AnimatePresence>
                <AnimatePresence>
                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: 16, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 8, scale: 0.95 }}
                            transition={{ duration: 0.25 }}
                            className="flex items-center gap-2.5 bg-red-600 text-white text-xs px-4 py-3 shadow-lg"
                        >
                            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                            {error}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
            {/* Parallax Orb */}
            <motion.div
                className="absolute left-1/2 top-1/4 -translate-x-1/2 w-[600px] h-[600px] pointer-events-none rounded-full"
                style={{
                    y: bgY,
                    background: "radial-gradient(circle, rgba(112,137,168,0.06) 0%, transparent 70%)",
                    filter: "blur(60px)"
                }}
            />

            <div className="relative z-10 w-full max-w-6xl mx-auto px-6 pt-16">
                {/* Eyebrow */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-10 flex items-center gap-3"
                >
                    <span className="inline-block w-6 h-px bg-sblue-500/50" />
                    <span className="text-xs font-heading tracking-[0.2em] uppercase text-sblue-500/70">Messages</span>
                </motion.div>

                {/* Split layout */}
                <div className="flex flex-col lg:flex-row gap-0 border border-zinc-200 dark:border-zinc-800">

                    {/* ── Left Panel: Form ── */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="lg:w-80 shrink-0 bg-zinc-100 dark:bg-zinc-900 border-b lg:border-b-0 lg:border-r border-zinc-200 dark:border-zinc-800 flex flex-col p-6 lg:max-h-[700px]"
                    >
                        {/* Heading */}
                        <div className="mb-6">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-8 h-8 bg-sblue-500 flex items-center justify-center shrink-0">
                                    <Mail className="w-4 h-4 text-white" />
                                </div>
                                <h1 className="text-xl font-bold font-heading">
                                    Send a <span className="text-sblue-500">Message</span>
                                </h1>
                            </div>
                            <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                                Drop an anonymous message. I read every single one and might reply!
                            </p>
                        </div>

                        <div className="w-full h-px bg-zinc-200 dark:border-zinc-800 mb-5" />

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="flex flex-col">
                            <div className="relative bg-background border border-zinc-200 dark:border-zinc-800 focus-within:border-sblue-500 transition-colors duration-300">
                                <textarea
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder="Write your message here..."
                                    disabled={isLoading}
                                    rows={4}
                                    maxLength={charLimit}
                                    className="w-full h-full bg-transparent p-4 border-none outline-none resize-none text-sm placeholder:text-zinc-400 dark:placeholder:text-zinc-600"
                                />
                                <div className="flex items-center justify-between px-4 py-2 border-t border-zinc-200 dark:border-zinc-800">
                                    <span className={`text-xs tabular-nums transition-colors duration-200 ${charColor}`}>
                                        {input.length}/{charLimit}
                                    </span>
                                    <motion.div whileHover={{ x: 2 }} transition={{ duration: 0.15 }}>
                                        <Button
                                            type="submit"
                                            disabled={isLoading || !input.trim()}
                                            className="rounded-none bg-sblue-500 hover:bg-sblue-600 disabled:bg-sblue-500/40 h-8 px-4 text-xs gap-1.5"
                                        >
                                            {isLoading ? (
                                                <>
                                                    <motion.span
                                                        animate={{ rotate: 360 }}
                                                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                                        className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full inline-block"
                                                    />
                                                    Sending
                                                </>
                                            ) : (
                                                <>
                                                    <Send className="w-3 h-3" />
                                                    Send
                                                </>
                                            )}
                                        </Button>
                                    </motion.div>
                                </div>
                            </div>
                        </form>

                        {/* Footer note */}
                        <div className="mt-auto pt-5">
                            <div className="w-full h-px bg-zinc-200 dark:bg-zinc-800 mb-4" />
                            <p className="text-xs text-zinc-400 dark:text-zinc-600 leading-relaxed">
                                Messages are anonymous. Unappropriate messages will be deleted without hesitate.
                            </p>
                        </div>
                    </motion.div>

                    {/* ── Right Panel: Feed ── */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="flex-1 flex flex-col bg-background min-h-[500px]"
                    >
                        {/* Feed header */}
                        <div className="px-6 py-4 border-b border-zinc-200 dark:border-zinc-800 flex items-center gap-3">
                            <span className="text-xs font-heading tracking-[0.15em] uppercase text-zinc-400 dark:text-zinc-500">
                                All Messages
                            </span>
                            {!isFetching && (
                                <span className="text-xs text-zinc-400 bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 tabular-nums">
                                    {messages.length}
                                </span>
                            )}
                        </div>

                        {/* Feed content */}
                        <div className="flex-1 overflow-y-auto p-6">
                            {isFetching ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
                                </div>
                            ) : messages.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {messages.map((msg, i) => (
                                        <motion.div
                                            key={msg.id}
                                            custom={i}
                                            variants={cardVariants}
                                            initial="hidden"
                                            animate="visible"
                                            className={`relative flex flex-col bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-4 ${msg.reply ? "border-l-2 border-l-sblue-500" : ""}`}
                                        >
                                            {/* Replied badge */}
                                            {msg.reply && (
                                                <span className="absolute top-3 right-3 text-[10px] font-heading tracking-wider uppercase text-sblue-500 bg-sblue-500/10 px-1.5 py-0.5">
                                                    Replied
                                                </span>
                                            )}

                                            {/* Message */}
                                            <p className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300 mb-3 pr-12">
                                                {msg.content}
                                            </p>

                                            {/* Reply */}
                                            {msg.reply && (
                                                <div className="mt-auto pt-3 border-t border-zinc-200 dark:border-zinc-700">
                                                    <div className="flex items-start gap-2">
                                                        <div className="w-0.5 self-stretch bg-sblue-500 shrink-0 mt-0.5" />
                                                        <div className="flex-1">
                                                            <span className="text-xs font-medium text-sblue-500 block mb-1">Arifian replied</span>
                                                            <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">{msg.reply}</p>
                                                            {msg.replyTimestamp && (
                                                                <span className="text-[10px] text-zinc-400 dark:text-zinc-600 mt-1 block">{msg.replyTimestamp}</span>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            )}

                                            {/* Timestamp */}
                                            <div className={`flex justify-end ${msg.reply ? "mt-2" : "mt-auto pt-3 border-t border-zinc-200 dark:border-zinc-800"}`}>
                                                <span className="text-[10px] text-zinc-400 dark:text-zinc-600 tabular-nums">
                                                    {msg.timestamp}
                                                </span>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            ) : (
                                <div className="h-full flex flex-col items-center justify-center text-center p-12">
                                    <MessageSquare className="w-10 h-10 text-zinc-200 dark:text-zinc-800 mb-4" />
                                    <p className="text-zinc-400 dark:text-zinc-600 text-sm">
                                        No messages yet.
                                    </p>
                                    <p className="text-zinc-400 dark:text-zinc-600 text-xs mt-1">
                                        Leave the first one.
                                    </p>
                                </div>
                            )}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
