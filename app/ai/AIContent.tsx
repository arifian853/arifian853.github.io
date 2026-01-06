"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Send, Trash2, Sparkles, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"

interface Message {
    role: "user" | "assistant"
    content: string
}

interface HistoryItem {
    role: "user" | "model"
    parts: { text: string }[]
}

const suggestedMessages = [
    { message: "Siapakah kamu, Arifian?" },
    { message: "Tanggal berapa kamu lahir?" },
    { message: "Dari mana kamu berasal?" },
    { message: "Kamu bekerja dimana?" },
    { message: "Dimana kamu tinggal?" },
    { message: "Apa hobi kamu?" },
    { message: "Apa keahlian utama Anda?" },
    { message: "Chatbot apa ini?" },
    { message: "Berapa umurmu?" },
    { message: "Apa profil Instagram Anda?" },
    { message: "Apa profil LinkedIn Anda?" },
    { message: "Halo, Arifian!" },
    { message: "Kamu kuliah dimana?" },
]

const API_ENDPOINT = "https://arifian853-arifian-ai-v1-1.hf.space/chat"

export function AIContent() {
    const [messages, setMessages] = useState<Message[]>([])
    const [history, setHistory] = useState<HistoryItem[]>([])
    const [input, setInput] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [showWelcome, setShowWelcome] = useState(false)
    const [dontShowAgain, setDontShowAgain] = useState(false)
    const messagesEndRef = useRef<HTMLDivElement>(null)
    const inputRef = useRef<HTMLInputElement>(null)

    // Load from localStorage on mount
    useEffect(() => {
        const savedMessages = localStorage.getItem("arifian-ai-messages")
        const savedHistory = localStorage.getItem("arifian-ai-history")
        const hideWelcome = localStorage.getItem("arifian-ai-hide-welcome")

        if (savedMessages) {
            setMessages(JSON.parse(savedMessages))
        }
        if (savedHistory) {
            setHistory(JSON.parse(savedHistory))
        }
        if (!hideWelcome) {
            setShowWelcome(true)
        }
    }, [])

    // Save to localStorage when messages change
    useEffect(() => {
        if (messages.length > 0) {
            localStorage.setItem("arifian-ai-messages", JSON.stringify(messages))
        }
    }, [messages])

    useEffect(() => {
        if (history.length > 0) {
            localStorage.setItem("arifian-ai-history", JSON.stringify(history))
        }
    }, [history])

    // Scroll to bottom
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [messages])

    const handleCloseWelcome = () => {
        if (dontShowAgain) {
            localStorage.setItem("arifian-ai-hide-welcome", "true")
        }
        setShowWelcome(false)
    }

    const sendMessage = async (messageText: string) => {
        if (!messageText.trim() || isLoading) return

        setError(null)
        const userMessage: Message = { role: "user", content: messageText }
        setMessages(prev => [...prev, userMessage])
        setInput("")
        setIsLoading(true)

        try {
            const response = await fetch(API_ENDPOINT, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    message: messageText,
                    history: history
                })
            })

            if (!response.ok) {
                throw new Error("Failed to get response")
            }

            const data = await response.json()
            const assistantMessage: Message = {
                role: "assistant",
                content: data.response || data.message || "Maaf, saya tidak bisa menjawab saat ini."
            }

            setMessages(prev => [...prev, assistantMessage])

            // Update history for context
            setHistory(prev => [
                ...prev,
                { role: "user", parts: [{ text: messageText }] },
                { role: "model", parts: [{ text: assistantMessage.content }] }
            ])

        } catch (err) {
            setError("Gagal menghubungi AI. Silakan coba lagi.")
            console.error(err)
        } finally {
            setIsLoading(false)
            inputRef.current?.focus()
        }
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        sendMessage(input)
    }

    const handleSuggestedClick = (message: string) => {
        sendMessage(message)
    }

    const clearChat = () => {
        setMessages([])
        setHistory([])
        localStorage.removeItem("arifian-ai-messages")
        localStorage.removeItem("arifian-ai-history")
    }

    // Get random 4 suggestions
    const randomSuggestions = suggestedMessages
        .sort(() => Math.random() - 0.5)
        .slice(0, 4)

    return (
        <section id="ai" className="relative min-h-screen flex flex-col py-20 overflow-hidden">
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

            {/* Welcome Dialog */}
            <Dialog open={showWelcome} onOpenChange={setShowWelcome}>
                <DialogContent className="sm:max-w-[450px] rounded-none border-zinc-200 dark:border-zinc-800">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-heading flex items-center gap-2">
                            <Sparkles className="w-6 h-6 text-teal-500" />
                            Selamat Datang di Arifian.AI
                        </DialogTitle>
                        <DialogDescription className="text-base pt-2">
                            Ini adalah AI chatbot personal yang dibangun dengan teknologi RAG menggunakan
                            Google Gemini 2.5 Flash dengan data dan persona Arifian sendiri.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="py-4 space-y-4">
                        <p className="text-sm text-zinc-600 dark:text-zinc-400">
                            Kamu bisa bertanya tentang Arifian, latar belakangnya, skill, pengalaman,
                            dan berbagai hal lainnya. Gunakan suggested prompts untuk hasil terbaik!
                        </p>

                        <div className="flex items-center space-x-2">
                            <Checkbox
                                id="dontShow"
                                checked={dontShowAgain}
                                onCheckedChange={(checked) => setDontShowAgain(checked as boolean)}
                            />
                            <label
                                htmlFor="dontShow"
                                className="text-sm text-zinc-500 dark:text-zinc-400 cursor-pointer"
                            >
                                Jangan tampilkan lagi
                            </label>
                        </div>
                    </div>

                    <Button
                        onClick={handleCloseWelcome}
                        className="w-full rounded-none bg-teal-500 hover:bg-teal-600"
                    >
                        Mulai Chat
                    </Button>
                </DialogContent>
            </Dialog>

            {/* Content Container */}
            <div className="relative z-10 w-full max-w-3xl mx-auto px-6 pt-16 flex flex-col flex-1">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-8"
                >
                    <h1 className="text-3xl md:text-4xl font-bold font-heading">
                        Arifian<span className="text-teal-500">.AI</span>
                    </h1>
                    <p className="text-zinc-500 dark:text-zinc-400 text-sm mt-2">
                        RAG-powered chatbot with Google Gemini 2.5 Flash
                    </p>
                </motion.div>

                {/* Chat Area */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="flex-1 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-4 mb-4 overflow-hidden flex flex-col"
                    style={{ minHeight: "400px", maxHeight: "500px" }}
                >
                    <div className="flex-1 overflow-y-auto space-y-4">
                        {messages.length === 0 ? (
                            // Empty State with Suggestions
                            <div className="h-full flex flex-col items-center justify-center text-center p-4">
                                <p className="text-zinc-500 dark:text-zinc-400 mb-6">
                                    Mulai percakapan dengan memilih pertanyaan di bawah atau ketik sendiri
                                </p>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 w-full max-w-md">
                                    {randomSuggestions.map((item, index) => (
                                        <motion.button
                                            key={index}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.3, delay: index * 0.1 }}
                                            onClick={() => handleSuggestedClick(item.message)}
                                            className="text-left text-sm px-4 py-3 bg-zinc-200 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 hover:border-teal-500 dark:hover:border-teal-500 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-all duration-300"
                                        >
                                            {item.message}
                                        </motion.button>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            // Messages
                            <AnimatePresence>
                                {messages.map((message, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                                    >
                                        <div
                                            className={`max-w-[80%] px-4 py-3 ${message.role === "user"
                                                    ? "bg-teal-500 text-white"
                                                    : "bg-zinc-200 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100"
                                                }`}
                                        >
                                            <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        )}

                        {/* Loading Indicator */}
                        {isLoading && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="flex justify-start"
                            >
                                <div className="bg-zinc-200 dark:bg-zinc-800 px-4 py-3">
                                    <div className="flex gap-1">
                                        <span className="w-2 h-2 bg-teal-500 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                                        <span className="w-2 h-2 bg-teal-500 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                                        <span className="w-2 h-2 bg-teal-500 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {/* Error Message */}
                        {error && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="flex justify-center"
                            >
                                <div className="bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 px-4 py-2 text-sm flex items-center gap-2">
                                    <AlertCircle className="w-4 h-4" />
                                    {error}
                                </div>
                            </motion.div>
                        )}

                        <div ref={messagesEndRef} />
                    </div>
                </motion.div>

                {/* Input Area */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <form onSubmit={handleSubmit} className="flex gap-2">
                        <input
                            ref={inputRef}
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Tanya sesuatu tentang Arifian..."
                            disabled={isLoading}
                            className="flex-1 px-4 py-3 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 focus:border-teal-500 dark:focus:border-teal-500 outline-none transition-colors duration-300 text-sm"
                        />
                        <Button
                            type="submit"
                            disabled={isLoading || !input.trim()}
                            className="rounded-none bg-teal-500 hover:bg-teal-600 disabled:opacity-50 px-4"
                        >
                            <Send className="w-4 h-4" />
                        </Button>
                        {messages.length > 0 && (
                            <Button
                                type="button"
                                variant="outline"
                                onClick={clearChat}
                                className="rounded-none border-zinc-300 dark:border-zinc-700 hover:border-red-500 hover:text-red-500 px-4"
                            >
                                <Trash2 className="w-4 h-4" />
                            </Button>
                        )}
                    </form>

                    {/* Suggested Prompts (when there are messages) */}
                    {messages.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-2">
                            {suggestedMessages.slice(0, 3).map((item, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleSuggestedClick(item.message)}
                                    disabled={isLoading}
                                    className="text-xs px-3 py-1.5 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-teal-500 dark:hover:border-teal-500 transition-colors duration-300 disabled:opacity-50"
                                >
                                    {item.message}
                                </button>
                            ))}
                        </div>
                    )}
                </motion.div>
            </div>
        </section>
    )
}
