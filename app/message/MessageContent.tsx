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
    hidden: { opacity: 0, y: 15, filter: "blur(3px)" },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: { duration: 0.4, delay: i * 0.05, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] }
    })
}

function SkeletonCard() {
    return (
        <div className="pb-8 border-b border-border animate-pulse flex flex-col">
            <div className="flex justify-between items-center mb-2">
                <div className="h-3 bg-secondary rounded w-16" />
                <div className="h-3 bg-secondary rounded w-28" />
            </div>
            <div className="h-4 bg-secondary rounded mb-2 w-full" />
            <div className="h-4 bg-secondary rounded w-3/4" />
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
    const charColor = charRatio > 0.9 ? "text-destructive" : charRatio > 0.7 ? "text-amber-500" : "text-muted-foreground"

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
        <section ref={sectionRef} className="relative min-h-screen py-12 md:py-20 overflow-hidden bg-background">
            {/* Toast notifications — fixed bottom-right */}
            <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 pointer-events-none">
                <AnimatePresence>
                    {success && (
                        <motion.div
                            initial={{ opacity: 0, y: 16, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 8, scale: 0.95 }}
                            transition={{ duration: 0.25 }}
                            className="flex items-center gap-2.5 bg-[#141413] dark:bg-[#faf9f5] text-[#faf9f5] dark:text-[#141413] text-xs px-4 py-3 shadow-lg rounded-none border border-border"
                        >
                            <Check className="w-3.5 h-3.5 shrink-0 text-brand-500" />
                            Pesan terkirim! Terima kasih telah menyapa.
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
                            className="flex items-center gap-2.5 bg-destructive text-white text-xs px-4 py-3 shadow-lg rounded-none"
                        >
                            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                            {error}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Background Glow */}
            <motion.div
                className="absolute left-1/2 top-1/4 -translate-x-1/2 w-[600px] h-[600px] pointer-events-none rounded-full"
                style={{
                    y: bgY,
                    background: "radial-gradient(circle, rgba(201,100,66,0.03) 0%, transparent 70%)",
                    filter: "blur(60px)"
                }}
            />

            <div className="relative z-10 w-full max-w-2xl mx-auto px-4 sm:px-6 pt-10 md:pt-16">
                
                {/* Header */}
                <div className="mb-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="w-10 h-10 bg-brand-500/10 border border-brand-500/30 flex items-center justify-center mx-auto mb-4"
                    >
                        <Mail className="w-5 h-5 text-brand-500" />
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="text-3xl font-bold font-heading mb-3"
                    >
                        Papan <span className="text-brand-500">Pesan</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-sm text-muted-foreground max-w-md mx-auto leading-relaxed"
                    >
                        Tinggalkan pesan anonim di bawah ini. Saya membaca setiap pesan yang masuk dan sesekali membalasnya secara terbuka.
                    </motion.p>
                </div>

                {/* Inline Message Compose Form */}
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="mb-12 pb-10 border-b border-border"
                >
                    <form onSubmit={handleSubmit} className="flex flex-col">
                        <div className="relative bg-card border border-border focus-within:border-brand-500 focus-within:ring-1 focus-within:ring-brand-500 transition-all duration-300 shadow-sm">
                            <textarea
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Tulis sesuatu secara anonim..."
                                disabled={isLoading}
                                rows={3}
                                maxLength={charLimit}
                                className="w-full bg-transparent p-4 border-none outline-none resize-none text-sm placeholder:text-muted-foreground/50 leading-relaxed"
                            />
                            <div className="flex items-center justify-between px-4 py-3 border-t border-border bg-secondary/10">
                                <span className={`text-xs tabular-nums transition-colors duration-200 ${charColor}`}>
                                    {input.length}/{charLimit}
                                </span>
                                <Button
                                    type="submit"
                                    disabled={isLoading || !input.trim()}
                                    className="rounded-none bg-brand-500 hover:bg-brand-600 text-white disabled:bg-brand-500/40 h-9 px-5 text-xs gap-1.5 transition-colors font-medium"
                                >
                                    {isLoading ? "Mengirim..." : "Kirim Pesan"}
                                </Button>
                            </div>
                        </div>
                    </form>
                    <p className="text-[10px] text-muted-foreground/60 text-center mt-3 leading-relaxed">
                        Pesan bersifat sepenuhnya anonim. Pesan yang tidak pantas (SARA/kekerasan) akan dihapus.
                    </p>
                </motion.div>

                {/* Feed Header */}
                <div className="flex items-center justify-between mb-8">
                    <span className="text-xs font-heading tracking-[0.2em] uppercase text-muted-foreground">
                        Pesan Masuk
                    </span>
                    {!isFetching && (
                        <span className="text-xs text-muted-foreground font-mono bg-secondary px-2.5 py-0.5">
                            Total: {messages.length}
                        </span>
                    )}
                </div>

                {/* Feed Timeline Content */}
                <div className="space-y-8">
                    {isFetching ? (
                        <div className="space-y-8">
                            {Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)}
                        </div>
                    ) : messages.length > 0 ? (
                        <div className="space-y-8">
                            {messages.map((msg, i) => (
                                <motion.div
                                    key={msg.id}
                                    custom={i}
                                    variants={cardVariants}
                                    initial="hidden"
                                    animate="visible"
                                    className="group pb-8 border-b border-border flex flex-col transition-colors"
                                >
                                    {/* Message Info Header */}
                                    <div className="flex justify-between items-center text-[10px] text-muted-foreground/50 font-mono mb-3">
                                        <span>#{messages.length - i}</span>
                                        <span>{msg.timestamp}</span>
                                    </div>

                                    {/* Message Body */}
                                    <p className="text-sm md:text-base leading-relaxed text-foreground/90 font-sans">
                                        {msg.content}
                                    </p>

                                    {/* Nested Reply Area */}
                                    {msg.reply && (
                                        <div className="mt-4 pl-4 border-l-2 border-brand-500 bg-secondary/20 py-3.5 px-4 transition-colors group-hover:bg-secondary/35">
                                            <div className="flex items-center gap-1.5 text-[10px] font-heading font-bold text-brand-500 uppercase tracking-wider mb-1.5">
                                                <span>↳ Arifian membalas</span>
                                                {msg.replyTimestamp && (
                                                    <span className="text-muted-foreground/50 font-normal font-mono lowercase normal-case ml-2">
                                                        ({msg.replyTimestamp})
                                                    </span>
                                                )}
                                            </div>
                                            <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                                                {msg.reply}
                                            </p>
                                        </div>
                                    )}
                                </motion.div>
                            ))}
                        </div>
                    ) : (
                        <div className="py-16 flex flex-col items-center justify-center text-center">
                            <MessageSquare className="w-10 h-10 text-muted-foreground/20 mb-4" />
                            <p className="text-muted-foreground text-sm">
                                Belum ada pesan masuk.
                            </p>
                            <p className="text-muted-foreground/70 text-xs mt-1">
                                Jadilah orang pertama yang mengirimkan pesan di atas!
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </section>
    )
}
