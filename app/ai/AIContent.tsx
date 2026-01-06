"use client"

import { useState, useEffect, useRef, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Send, Trash2, Sparkles, AlertCircle, MessageSquare, Info } from "lucide-react"
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
    const messagesEndRef = useRef<HTMLDivElement>(null)
    const inputRef = useRef<HTMLInputElement>(null)

    // Fixed random suggestions (only randomize once on mount)
    const randomSuggestions = useMemo(() => {
        return [...suggestedMessages]
            .sort(() => Math.random() - 0.5)
            .slice(0, 6)
    }, [])

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
                        className="text-teal-500 font-semibold hover:underline"
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
                        className="text-teal-500 font-semibold hover:underline break-all"
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

    if (!mounted) return null

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
                <DialogContent className="w-[calc(100%-2rem)] max-w-[400px] rounded-none border-zinc-200 dark:border-zinc-800">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-heading">
                            Welcome
                        </DialogTitle>
                        <DialogDescription className="text-base pt-2">
                            This is Arifian&apos;s personal AI assistant powered by RAG technology
                            and Google Gemini 2.5 Flash.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="py-4 space-y-4">
                        <div className="bg-zinc-100 dark:bg-zinc-800 p-4 border-l-4 border-teal-500">
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
                        className="w-full rounded-none bg-teal-500 hover:bg-teal-600"
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
                                <li>• Google Gemini 2.5 Flash (LLM)</li>
                                <li>• SentenceTransformer for embeddings</li>
                                <li>• Cosine similarity vector search</li>
                                <li>• FastAPI backend</li>
                            </ul>
                        </div>

                        <div className="bg-zinc-100 dark:bg-zinc-800 p-4 border-l-4 border-teal-500">
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
                        className="w-full rounded-none bg-teal-500 hover:bg-teal-600"
                    >
                        Got It
                    </Button>
                </DialogContent>
            </Dialog>

            {/* Content Container */}
            <div className="relative z-10 w-full max-w-4xl mx-auto px-6 pt-16 flex flex-col flex-1">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-8"
                >
                    <div className="bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6">
                        <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-teal-500 flex items-center justify-center">
                                    <Sparkles className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <h1 className="text-2xl md:text-3xl font-bold font-heading">
                                        Arifian<span className="text-teal-500">.AI</span>
                                    </h1>
                                </div>
                            </div>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setShowInfo(true)}
                                className="rounded-none hover:bg-zinc-200 dark:hover:bg-zinc-800"
                            >
                                <Info className="w-5 h-5 text-zinc-500" />
                            </Button>
                        </div>
                        <p className="text-zinc-500 dark:text-zinc-400 text-sm">
                            Personal AI assistant built with RAG technology and Google Gemini 2.5 Flash.
                            Ask me anything about Arifian!
                        </p>
                    </div>
                </motion.div>

                {/* Chat Area */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="flex-1 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 mb-4 overflow-hidden flex flex-col"
                    style={{ minHeight: "350px", maxHeight: "450px" }}
                >
                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                        {messages.length === 0 ? (
                            // Empty State with Suggestions
                            <div className="h-full flex flex-col items-center justify-center text-center p-4">
                                <MessageSquare className="w-12 h-12 text-zinc-300 dark:text-zinc-700 mb-4" />
                                <p className="text-zinc-500 dark:text-zinc-400 mb-6 text-sm">
                                    Start a conversation by selecting a question below or type your own
                                </p>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 w-full max-w-lg">
                                    {randomSuggestions.map((item, index) => (
                                        <motion.button
                                            key={item.message}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.3, delay: index * 0.05 }}
                                            onClick={() => handleSuggestedClick(item.message)}
                                            className="text-left text-sm px-4 py-3 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 hover:border-teal-500 dark:hover:border-teal-500 hover:bg-zinc-50 dark:hover:bg-zinc-700 transition-all duration-300"
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
                                            className={`max-w-[85%] px-4 py-3 ${message.role === "user"
                                                ? "bg-teal-500 text-white"
                                                : "bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100"
                                                }`}
                                        >
                                            <p className="text-sm whitespace-pre-wrap leading-relaxed">{parseContent(message.content)}</p>
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
                                <div className="bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 px-4 py-3">
                                    <div className="flex gap-1.5">
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
                                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 px-4 py-2 text-sm flex items-center gap-2">
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
                            placeholder="Ask something about Arifian..."
                            disabled={isLoading}
                            className="flex-1 px-4 h-12 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 focus:border-teal-500 dark:focus:border-teal-500 outline-none transition-colors duration-300 text-sm"
                        />
                        <Button
                            type="submit"
                            disabled={isLoading || !input.trim()}
                            className="rounded-none bg-teal-500 hover:bg-teal-600 disabled:bg-teal-500/50 h-12 px-6"
                        >
                            <Send className="w-5 h-5" />
                        </Button>
                        {messages.length > 0 && (
                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        className="rounded-none bg-white dark:bg-zinc-900 border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:border-red-500 hover:text-red-500 h-12 px-6"
                                    >
                                        <Trash2 className="w-5 h-5" />
                                    </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent className="rounded-none border-zinc-200 dark:border-zinc-800">
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Clear Chat History?</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            This will permanently delete all messages and conversation history.
                                            This action cannot be undone.
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel className="rounded-none">Cancel</AlertDialogCancel>
                                        <AlertDialogAction
                                            onClick={clearChat}
                                            className="rounded-none bg-red-500 hover:bg-red-600"
                                        >
                                            Clear All
                                        </AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        )}
                    </form>

                    {/* Quick Suggestions (when there are messages) */}
                    {messages.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-2">
                            <span className="text-xs text-zinc-400 dark:text-zinc-500 mr-1 self-center">Try:</span>
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
