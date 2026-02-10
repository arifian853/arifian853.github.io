"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
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
    const months = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ]
    const d = date.getDate()
    const m = months[date.getMonth()]
    const y = date.getFullYear()
    const h = String(date.getHours()).padStart(2, '0')
    const min = String(date.getMinutes()).padStart(2, '0')
    return `${d} ${m} ${y}, ${h}:${min}`
}

export function MessageContent() {
    const [messages, setMessages] = useState<Message[]>([])
    const [input, setInput] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [isFetching, setIsFetching] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState(false)

    // Fetch messages
    const fetchMessages = async () => {
        setIsFetching(true)
        try {
            const response = await fetch(`${API_BASE_URL}/confessions/public/list?limit=50`)
            if (!response.ok) throw new Error("Failed to fetch messages")

            const data = await response.json()

            // API might return array directly or object with array property
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

    useEffect(() => {
        fetchMessages()
    }, [])

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

    return (
        <section className="relative min-h-screen py-20 overflow-hidden">
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
            <div className="relative z-10 w-full max-w-4xl mx-auto px-6 pt-16">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-12"
                >
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-sblue-500 mb-6">
                        <Mail className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold font-heading mb-4">
                        Send a <span className="text-sblue-500">Message</span>
                    </h1>
                    <p className="text-zinc-600 dark:text-zinc-400 max-w-md mx-auto">
                        Want to say something? Drop an anonymous message. I might reply!
                    </p>
                </motion.div>

                {/* Message Form */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="mb-12"
                >
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-4">
                            <textarea
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Write your message here..."
                                disabled={isLoading}
                                rows={4}
                                maxLength={500}
                                className="w-full bg-transparent border-none outline-none resize-none text-sm placeholder:text-zinc-400"
                            />
                            <div className="flex items-center justify-between pt-2 border-t border-zinc-200 dark:border-zinc-800">
                                <span className="text-xs text-zinc-400">
                                    {input.length}/500
                                </span>
                                <Button
                                    type="submit"
                                    disabled={isLoading || !input.trim()}
                                    className="rounded-none bg-sblue-500 hover:bg-sblue-600 disabled:bg-sblue-500/50"
                                >
                                    {isLoading ? (
                                        <span className="flex items-center gap-2">
                                            <motion.span
                                                animate={{ rotate: 360 }}
                                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                                className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                                            />
                                            Sending...
                                        </span>
                                    ) : (
                                        <span className="flex items-center gap-2">
                                            <Send className="w-4 h-4" />
                                            Send Message
                                        </span>
                                    )}
                                </Button>
                            </div>
                        </div>
                    </form>

                    {/* Success Message */}
                    <AnimatePresence>
                        {success && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="mt-4 p-3 bg-sblue-50 dark:bg-sblue-950 border border-sblue-200 dark:border-sblue-800 flex items-center gap-2 text-sblue-600 dark:text-sblue-400 text-sm"
                            >
                                <Check className="w-4 h-4" />
                                Message sent successfully!
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Error Message */}
                    <AnimatePresence>
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="mt-4 p-3 bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 flex items-center gap-2 text-red-600 dark:text-red-400 text-sm"
                            >
                                <AlertCircle className="w-4 h-4" />
                                {error}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>

                {/* Messages Section */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <div className="flex items-center gap-3 mb-6">
                        <h2 className="text-sm font-bold font-heading text-zinc-500 uppercase tracking-wider">
                            Messages
                        </h2>
                        {!isFetching && (
                            <span className="text-xs text-zinc-400 bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5">
                                {messages.length}
                            </span>
                        )}
                    </div>

                    {/* Loading State */}
                    {isFetching ? (
                        <div className="text-center py-12">
                            <p className="text-zinc-500 dark:text-zinc-400 text-sm">Loading messages...</p>
                        </div>
                    ) : messages.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {messages.map((msg) => (
                                <div key={msg.id} className="bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-4">
                                    {/* Message Content */}
                                    <p className="text-sm leading-relaxed mb-3">
                                        {msg.content}
                                    </p>

                                    {/* Reply Section */}
                                    {msg.reply && (
                                        <div className="mt-3 pt-3 border-t border-zinc-200 dark:border-zinc-700">
                                            <div className="flex items-start gap-2">
                                                <div className="w-1 h-full bg-sblue-500 shrink-0" />
                                                <div className="flex-1">
                                                    <span className="text-xs font-medium text-sblue-500 block mb-1">
                                                        Reply
                                                    </span>
                                                    <p className="text-sm text-zinc-600 dark:text-zinc-400">
                                                        {msg.reply}
                                                    </p>
                                                    {msg.replyTimestamp && (
                                                        <span className="text-xs text-zinc-400 dark:text-zinc-500 mt-1 block">
                                                            {msg.replyTimestamp}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* Timestamp */}
                                    <div className="mt-3 pt-2 border-t border-zinc-200 dark:border-zinc-700">
                                        <span className="text-xs text-zinc-400 dark:text-zinc-500">
                                            {msg.timestamp}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                            <MessageSquare className="w-12 h-12 text-zinc-300 dark:text-zinc-700 mx-auto mb-4" />
                            <p className="text-zinc-500 dark:text-zinc-400 text-sm">
                                No messages yet. Be the first to send one!
                            </p>
                        </div>
                    )}
                </motion.div>
            </div>
        </section>
    )
}
