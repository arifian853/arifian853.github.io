"use client"

import { useState, useEffect, useRef, useMemo } from "react"
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion"
import { Send, Trash2, Sparkles, AlertCircle, MessageSquare, Info, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Checkbox } from "@/components/ui/checkbox"

interface Message {
    role: "user" | "assistant"
    content: string
}

interface HistoryItem {
    role: "user" | "model"
    content: string
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
    const [showInfo, setShowInfo] = useState(false)
    const [dontShowAgain, setDontShowAgain] = useState(false)
    const [mounted, setMounted] = useState(false)
    const [quickSuggestions, setQuickSuggestions] = useState<typeof suggestedMessages>([])
    const messagesEndRef = useRef<HTMLDivElement>(null)
    const inputRef = useRef<HTMLInputElement>(null)

    const sectionRef = useRef<HTMLElement>(null)
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end start"]
    })
    const bgY = useTransform(scrollYProgress, [0, 1], [0, 100])

    // Fixed random suggestions (only randomize once on mount)
    const randomSuggestions = useMemo(() => {
        return [...suggestedMessages]
            .sort(() => Math.random() - 0.5)
            .slice(0, 6)
    }, [])

    // Function to refresh quick suggestions
    const refreshQuickSuggestions = () => {
        const shuffled = [...suggestedMessages]
            .sort(() => Math.random() - 0.5)
            .slice(0, 3)
        setQuickSuggestions(shuffled)
    }

    // Load from localStorage on mount
    useEffect(() => {
        setMounted(true)
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
        // Initialize quick suggestions
        refreshQuickSuggestions()
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

    // Scroll to bottom only when new messages are added (not on initial load from localStorage)
    const prevMessageCount = useRef(0)
    useEffect(() => {
        // Only scroll if message count increased by 1 or 2 (user message + AI response)
        const countDiff = messages.length - prevMessageCount.current
        if (countDiff > 0 && countDiff <= 2 && prevMessageCount.current > 0) {
            messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
        }
        prevMessageCount.current = messages.length
    }, [messages])

    const handleCloseWelcome = () => {
        if (dontShowAgain) {
            localStorage.setItem("arifian-ai-hide-welcome", "true")
        }
        setShowWelcome(false)
    }

    // Parse markdown links and make them clickable
    const parseContent = (text: string) => {
        // Match markdown links [text](url) and plain URLs
        const linkRegex = /\[([^\]]+)\]\(([^)]+)\)|https?:\/\/[^\s]+/g
        const parts = []
        let lastIndex = 0
        let match

        while ((match = linkRegex.exec(text)) !== null) {
            // Add text before the match
            if (match.index > lastIndex) {
                parts.push(text.slice(lastIndex, match.index))
            }

            if (match[1] && match[2]) {
                // Markdown link [text](url)
                parts.push(
                    <a
                        key={match.index}
                        href={match[2]}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sblue-500 font-semibold hover:underline"
                    >
                        {match[1]}
                    </a>
                )
            } else {
                // Plain URL
                parts.push(
                    <a
                        key={match.index}
                        href={match[0]}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sblue-500 font-semibold hover:underline break-all"
                    >
                        {match[0]}
                    </a>
                )
            }

            lastIndex = match.index + match[0].length
        }

        // Add remaining text
        if (lastIndex < text.length) {
            parts.push(text.slice(lastIndex))
        }

        return parts.length > 0 ? parts : text
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
                content: data.response || data.message || "Sorry, I couldn't process that request."
            }

            setMessages(prev => [...prev, assistantMessage])

            // Update history for context
            setHistory(prev => [
                ...prev,
                { role: "user", content: messageText },
                { role: "model", content: assistantMessage.content }
            ])

        } catch (err) {
            setError("Failed to connect to AI. Please try again.")
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

    if (!mounted) {
        return (
            <section ref={sectionRef} className="relative min-h-screen flex flex-col py-20 overflow-hidden">
                <div className="relative z-10 w-full max-w-4xl mx-auto px-6 pt-16 flex flex-col flex-1">
                    <div className="flex items-center justify-center flex-1">
                        <p className="text-zinc-400 text-sm">Loading...</p>
                    </div>
                </div>
            </section>
        )
    }

    return (
        <section ref={sectionRef} id="ai" className="relative min-h-screen flex flex-col py-20 overflow-hidden">
            {/* Parallax Orb */}
            <motion.div
                className="absolute left-1/2 top-1/4 -translate-x-1/2 w-[600px] h-[600px] pointer-events-none rounded-full"
                style={{
                    y: bgY,
                    background: "radial-gradient(circle, rgba(112,137,168,0.06) 0%, transparent 70%)",
                    filter: "blur(60px)"
                }}
            />
            {/* Dialogs unchanged */}

            {/* Welcome Dialog */}
            <Dialog open={showWelcome} onOpenChange={setShowWelcome}>
                <DialogContent className="w-[calc(100%-2rem)] max-w-[400px] rounded-none border-zinc-200 dark:border-zinc-800">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-heading">
                            Welcome
                        </DialogTitle>
                        <DialogDescription className="text-base pt-2">
                            This is Arifian&apos;s personal AI assistant powered by RAG technology
                            and Groq LLaMA 3.3 70B.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="py-4 space-y-4">
                        <div className="bg-zinc-100 dark:bg-zinc-800 p-4 border-l-4 border-sblue-500">
                            <p className="text-sm text-zinc-600 dark:text-zinc-400">
                                Please use this AI responsibly. Avoid spamming or abusing the service.
                                The AI has limited knowledge based on Arifian&apos;s personal public data.
                            </p>
                        </div>

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
                                Don&apos;t show this again
                            </label>
                        </div>
                    </div>

                    <Button
                        onClick={handleCloseWelcome}
                        className="w-full rounded-none bg-sblue-500 hover:bg-sblue-600"
                    >
                        Start Chatting
                    </Button>
                </DialogContent>
            </Dialog>

            {/* Info Dialog */}
            <Dialog open={showInfo} onOpenChange={setShowInfo}>
                <DialogContent className="w-[calc(100%-2rem)] max-w-[450px] rounded-none border-zinc-200 dark:border-zinc-800">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-heading">
                            About This AI
                        </DialogTitle>
                        <DialogDescription className="text-base pt-2">
                            Technical details and usage information.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="py-4 space-y-4">
                        <div>
                            <h3 className="text-sm font-semibold mb-2">Technology Stack</h3>
                            <ul className="text-sm text-zinc-600 dark:text-zinc-400 space-y-1.5">
                                <li>• LLaMA 3.3 70B via Groq (LLM)</li>
                                <li>• Multilingual SentenceTransformer (embeddings)</li>
                                <li>• Cosine similarity vector search</li>
                                <li>• FastAPI backend</li>
                            </ul>
                        </div>

                        <div className="bg-zinc-100 dark:bg-zinc-800 p-4 border-l-4 border-sblue-500">
                            <h3 className="text-sm font-semibold mb-2">Note</h3>
                            <p className="text-sm text-zinc-600 dark:text-zinc-400">
                                If the response takes longer than expected, the server may be starting up. Please wait a moment.
                            </p>
                        </div>

                        <div className="text-sm text-zinc-500 dark:text-zinc-400">
                            Your chat history is stored locally in your browser and is never sent to any server.
                        </div>
                    </div>

                    <Button
                        onClick={() => setShowInfo(false)}
                        className="w-full rounded-none bg-sblue-500 hover:bg-sblue-600"
                    >
                        Got It
                    </Button>
                </DialogContent>
            </Dialog>


            {/* Content Container — split screen */}
            <div className="relative z-10 w-full max-w-6xl mx-auto px-6 pt-16 flex flex-col flex-1">
                <div className="flex flex-col lg:flex-row gap-0 flex-1 border border-zinc-200 dark:border-zinc-800">

                    {/* ── Left Panel: Branding + Suggestions ── */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        className="lg:w-72 shrink-0 bg-zinc-100 dark:bg-zinc-900 border-b lg:border-b-0 lg:border-r border-zinc-200 dark:border-zinc-800 flex flex-col p-6"
                    >
                        {/* Branding */}
                        <div className="mb-6">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-8 h-8 bg-sblue-500 flex items-center justify-center shrink-0">
                                    <Sparkles className="w-4 h-4 text-white" />
                                </div>
                                <h1 className="text-xl font-bold font-heading">
                                    Arifian<span className="text-sblue-500">.AI</span>
                                </h1>
                            </div>
                            <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                                Personal AI built with RAG + Groq LLaMA 3.3 70B. Ask me anything about Arifian.
                            </p>
                        </div>

                        <div className="w-full h-px bg-zinc-200 dark:bg-zinc-800 mb-5" />

                        {/* Suggested questions */}
                        <div className="mb-5">
                            <span className="text-xs font-heading tracking-[0.15em] uppercase text-zinc-400 dark:text-zinc-500 mb-3 block">
                                Try asking
                            </span>
                            <div className="space-y-2">
                                {randomSuggestions.slice(0, 5).map((item, index) => (
                                    <motion.button
                                        key={item.message}
                                        initial={{ opacity: 0, x: -8 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.1 + index * 0.05 }}
                                        onClick={() => handleSuggestedClick(item.message)}
                                        disabled={isLoading}
                                        className="w-full text-left text-xs px-3 py-2.5 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 hover:border-sblue-500 dark:hover:border-sblue-500 text-zinc-600 dark:text-zinc-300 hover:text-foreground transition-all duration-200 disabled:opacity-50"
                                    >
                                        {item.message}
                                    </motion.button>
                                ))}
                            </div>
                        </div>

                        {/* Footer info */}
                        <div className="mt-auto">
                            <div className="w-full h-px bg-zinc-200 dark:bg-zinc-800 mb-4" />
                            <div className="flex items-center gap-2 mb-3">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => setShowInfo(true)}
                                    className="rounded-none hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-500 text-xs px-2 h-8 gap-1.5"
                                >
                                    <Info className="w-3.5 h-3.5" />
                                    About this AI
                                </Button>
                            </div>
                            <p className="text-xs text-zinc-400 dark:text-zinc-600 leading-relaxed">
                                Chat history stored locally. Never sent to any server.
                            </p>
                        </div>
                    </motion.div>

                    {/* ── Right Panel: Chat ── */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="flex-1 flex flex-col bg-background min-h-[500px]"
                    >
                        {/* Chat messages */}
                        <div className="flex-1 overflow-y-auto p-5 space-y-4">
                            {messages.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-center p-6">
                                    <MessageSquare className="w-10 h-10 text-zinc-200 dark:text-zinc-800 mb-4" />
                                    <p className="text-zinc-400 dark:text-zinc-500 text-sm max-w-xs">
                                        Select a question from the left, or type your own below
                                    </p>
                                </div>
                            ) : (
                                <AnimatePresence>
                                    {messages.map((message, index) => (
                                        <motion.div
                                            key={index}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0 }}
                                            transition={{ duration: 0.25 }}
                                            className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                                        >
                                            <div className={`max-w-[80%] px-4 py-3 text-sm leading-relaxed ${
                                                message.role === "user"
                                                    ? "bg-sblue-500 text-white"
                                                    : "bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100"
                                            }`}>
                                                {parseContent(message.content)}
                                            </div>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            )}

                            {isLoading && (
                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                                    <div className="bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-4 py-3 flex gap-1.5">
                                        <span className="w-1.5 h-1.5 bg-sblue-500 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                                        <span className="w-1.5 h-1.5 bg-sblue-500 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                                        <span className="w-1.5 h-1.5 bg-sblue-500 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                                    </div>
                                </motion.div>
                            )}

                            {error && (
                                <div className="flex justify-center">
                                    <div className="bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 text-red-500 px-4 py-2 text-xs flex items-center gap-2">
                                        <AlertCircle className="w-3.5 h-3.5" />
                                        {error}
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input row */}
                        <div className="border-t border-zinc-200 dark:border-zinc-800 p-4">
                            {/* Quick suggestions (when chatting) */}
                            {messages.length > 0 && quickSuggestions.length > 0 && (
                                <div className="mb-3 flex flex-wrap items-center gap-2">
                                    <button
                                        onClick={refreshQuickSuggestions}
                                        disabled={isLoading}
                                        className="p-1 text-zinc-400 hover:text-sblue-500 transition-colors duration-200 disabled:opacity-50"
                                        title="Refresh"
                                    >
                                        <RefreshCw className="w-3 h-3" />
                                    </button>
                                    {quickSuggestions.map((item, index) => (
                                        <button
                                            key={`${item.message}-${index}`}
                                            onClick={() => handleSuggestedClick(item.message)}
                                            disabled={isLoading}
                                            className="text-xs px-2.5 py-1 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-sblue-500 transition-colors duration-200 disabled:opacity-50 text-zinc-600 dark:text-zinc-400"
                                        >
                                            {item.message}
                                        </button>
                                    ))}
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="flex gap-2">
                                <input
                                    ref={inputRef}
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder="Ask something about Arifian..."
                                    disabled={isLoading}
                                    className="flex-1 px-4 h-11 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 focus:border-sblue-500 outline-none transition-colors duration-300 text-sm"
                                />
                                <Button
                                    type="submit"
                                    disabled={isLoading || !input.trim()}
                                    className="rounded-none bg-sblue-500 hover:bg-sblue-600 disabled:bg-sblue-500/40 h-11 px-5"
                                >
                                    <Send className="w-4 h-4" />
                                </Button>
                                {messages.length > 0 && (
                                    <AlertDialog>
                                        <AlertDialogTrigger asChild>
                                            <Button
                                                type="button"
                                                variant="outline"
                                                className="rounded-none border-zinc-300 dark:border-zinc-700 hover:border-red-500 hover:text-red-500 h-11 px-4"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent className="rounded-none border-zinc-200 dark:border-zinc-800">
                                            <AlertDialogHeader>
                                                <AlertDialogTitle>Clear Chat History?</AlertDialogTitle>
                                                <AlertDialogDescription>
                                                    This will permanently delete all messages. This action cannot be undone.
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                                <AlertDialogCancel className="rounded-none">Cancel</AlertDialogCancel>
                                                <AlertDialogAction onClick={clearChat} className="rounded-none bg-red-500 hover:bg-red-600">
                                                    Clear All
                                                </AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                )}
                            </form>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
