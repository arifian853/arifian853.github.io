"use client"

import { useState, useEffect, useRef, useMemo } from "react"
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion"
import { Send, Trash2, Sparkles, AlertCircle, Info, RefreshCw } from "lucide-react"
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

    // Shuffle and pick 4 suggestions for the empty state
    const randomSuggestions = useMemo(() => {
        return [...suggestedMessages]
            .sort(() => Math.random() - 0.5)
            .slice(0, 4)
    }, [])

    // Shuffle and pick 3 suggestions for quick bottom choices
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

    // Scroll to bottom only when new messages are added
    const prevMessageCount = useRef(0)
    useEffect(() => {
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
        const linkRegex = /\[([^\]]+)\]\(([^)]+)\)|https?:\/\/[^\s]+/g
        const parts = []
        let lastIndex = 0
        let match

        while ((match = linkRegex.exec(text)) !== null) {
            if (match.index > lastIndex) {
                parts.push(text.slice(lastIndex, match.index))
            }

            if (match[1] && match[2]) {
                parts.push(
                    <a
                        key={match.index}
                        href={match[2]}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-brand-500 font-semibold hover:underline"
                    >
                        {match[1]}
                    </a>
                )
            } else {
                parts.push(
                    <a
                        key={match.index}
                        href={match[0]}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-brand-500 font-semibold hover:underline break-all"
                    >
                        {match[0]}
                    </a>
                )
            }

            lastIndex = match.index + match[0].length
        }

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

            setHistory(prev => [
                ...prev,
                { role: "user", content: messageText },
                { role: "model", content: assistantMessage.content }
            ])

        } catch (err) {
            setError("Gagal terhubung ke AI. Silakan coba lagi.")
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
            <section ref={sectionRef} className="relative min-h-screen flex flex-col py-12 md:py-20 overflow-hidden bg-background">
                <div className="relative z-10 w-full max-w-4xl mx-auto px-6 pt-16 flex flex-col flex-1">
                    <div className="flex items-center justify-center flex-1">
                        <p className="text-muted-foreground text-sm">Loading...</p>
                    </div>
                </div>
            </section>
        )
    }

    return (
        <section ref={sectionRef} id="ai" className="relative min-h-screen flex flex-col py-12 md:py-20 overflow-hidden bg-background">
            {/* Background Glow */}
            <motion.div
                className="absolute left-1/2 top-1/4 -translate-x-1/2 w-[600px] h-[600px] pointer-events-none rounded-full"
                style={{
                    y: bgY,
                    background: "radial-gradient(circle, rgba(201,100,66,0.03) 0%, transparent 70%)",
                    filter: "blur(60px)"
                }}
            />

            {/* Welcome Dialog */}
            <Dialog open={showWelcome} onOpenChange={setShowWelcome}>
                <DialogContent className="w-[calc(100%-2rem)] max-w-[400px] rounded-none border-border bg-card">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-heading">
                            Welcome
                        </DialogTitle>
                        <DialogDescription className="text-sm pt-2 text-muted-foreground">
                            Ini adalah asisten AI personal Arifian yang ditenagai oleh teknologi RAG
                            dan model GPT-OSS 20B via Groq.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="py-4 space-y-4">
                        <div className="bg-secondary/40 p-4 border-l-4 border-brand-500">
                            <p className="text-xs text-muted-foreground leading-relaxed">
                                Mohon gunakan AI ini secara bijak. AI memiliki pengetahuan khusus seputar data publik personal dan profesional Arifian Saputra.
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
                                className="text-xs text-muted-foreground cursor-pointer select-none"
                            >
                                Jangan tunjukkan ini lagi
                            </label>
                        </div>
                    </div>

                    <Button
                        onClick={handleCloseWelcome}
                        className="w-full rounded-none bg-brand-500 hover:bg-brand-600 text-white font-medium"
                    >
                        Mulai Chat
                    </Button>
                </DialogContent>
            </Dialog>

            {/* Info Dialog */}
            <Dialog open={showInfo} onOpenChange={setShowInfo}>
                <DialogContent className="w-[calc(100%-2rem)] max-w-[450px] rounded-none border-border bg-card">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-heading">
                            Tentang AI Ini
                        </DialogTitle>
                        <DialogDescription className="text-sm pt-2 text-muted-foreground">
                            Detail teknis dan informasi penggunaan.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="py-4 space-y-4">
                        <div>
                            <h3 className="text-xs font-heading font-semibold uppercase tracking-wider text-muted-foreground mb-2">Technology Stack</h3>
                            <ul className="text-xs text-muted-foreground space-y-1.5">
                                <li>• GPT-OSS 20B via Groq (LLM)</li>
                                <li>• Multilingual SentenceTransformer (Embeddings)</li>
                                <li>• Cosine similarity vector search untuk data RAG</li>
                                <li>• FastAPI backend</li>
                            </ul>
                        </div>

                        <div className="bg-secondary/40 p-4 border-l-4 border-brand-500">
                            <h3 className="text-xs font-semibold mb-1">Catatan</h3>
                            <p className="text-xs text-muted-foreground leading-relaxed">
                                Jika respon pertama memakan waktu lama, server backend mungkin sedang cold start (bangun dari mode tidur). Harap tunggu beberapa detik.
                            </p>
                        </div>

                        <div className="text-xs text-muted-foreground">
                            Riwayat chat Anda disimpan secara lokal di browser dan tidak dikirim ke server mana pun di luar permintaan prompt.
                        </div>
                    </div>

                    <Button
                        onClick={() => setShowInfo(false)}
                        className="w-full rounded-none bg-brand-500 hover:bg-brand-600 text-white font-medium"
                    >
                        Mengerti
                    </Button>
                </DialogContent>
            </Dialog>

            {/* Main App Container */}
            <div className="relative z-10 w-full max-w-3xl mx-auto px-4 sm:px-6 pt-6 flex flex-col flex-1 min-h-0">
                
                {/* Header / Top Bar */}
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-border">
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-brand-500 flex items-center justify-center shrink-0">
                            <Sparkles className="w-3.5 h-3.5 text-white" />
                        </div>
                        <span className="font-heading font-bold text-sm tracking-wider">
                            Arifian<span className="text-brand-500">.AI</span>
                        </span>
                    </div>
                    <div className="flex items-center gap-1.5 sm:gap-2">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setShowInfo(true)}
                            className="rounded-none hover:bg-secondary text-muted-foreground hover:text-foreground text-xs px-2 sm:px-2.5 h-8 gap-1.5"
                        >
                            <Info className="w-3.5 h-3.5" />
                            <span className="hidden sm:inline">Detail AI</span>
                        </Button>
                        {messages.length > 0 && (
                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="rounded-none text-muted-foreground hover:text-destructive hover:bg-destructive/10 text-xs px-2 sm:px-2.5 h-8 gap-1.5"
                                    >
                                        <Trash2 className="w-3.5 h-3.5" />
                                        <span className="hidden sm:inline">Hapus Chat</span>
                                    </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent className="rounded-none border-border bg-card">
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Hapus Riwayat Chat?</AlertDialogTitle>
                                        <AlertDialogDescription className="text-sm text-muted-foreground">
                                            Tindakan ini akan menghapus semua pesan di layar ini secara permanen. Tindakan ini tidak dapat dibatalkan.
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel className="rounded-none">Batal</AlertDialogCancel>
                                        <AlertDialogAction onClick={clearChat} className="rounded-none bg-destructive hover:bg-destructive/95 text-white">
                                            Hapus Semua
                                        </AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        )}
                    </div>
                </div>

                {/* Chat Area */}
                {messages.length === 0 ? (
                    /* ── Empty State / Welcome Screen ── */
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex-1 flex flex-col items-center justify-center py-6 md:py-10"
                    >
                        <h2 className="text-2xl md:text-4xl font-heading font-bold text-center mb-2 tracking-tight">
                            Tanya tentang <span className="text-brand-500">Arifian</span>
                        </h2>
                        <p className="text-xs md:text-sm text-muted-foreground text-center mb-6 md:mb-10 max-w-md">
                            Ketahui latar belakang, kompetensi, atau proyek Arifian dengan bertanya langsung ke asisten AI personalnya.
                        </p>

                        {/* Centered Large Chat Input */}
                        <form onSubmit={handleSubmit} className="w-full max-w-2xl flex gap-2 mb-6 md:mb-10 shadow-sm">
                            <input
                                ref={inputRef}
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Tanyakan sesuatu tentang Arifian..."
                                disabled={isLoading}
                                className="flex-1 px-4 h-12 bg-card border border-border focus:border-brand-500 outline-none transition-colors duration-300 text-sm rounded-none"
                            />
                            <Button
                                type="submit"
                                disabled={isLoading || !input.trim()}
                                className="rounded-none bg-brand-500 hover:bg-brand-600 disabled:bg-brand-500/40 text-white h-12 px-6 shrink-0 transition-colors"
                            >
                                <Send className="w-4 h-4" />
                            </Button>
                        </form>

                        {/* Recommendations Grid */}
                        <div className="w-full max-w-2xl">
                            <span className="text-[10px] md:text-xs font-heading tracking-[0.15em] uppercase text-muted-foreground/60 mb-3 md:mb-4 block text-center">
                                Rekomendasi Pertanyaan
                            </span>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-3">
                                {randomSuggestions.map((item, index) => (
                                    <motion.button
                                        key={item.message}
                                        initial={{ opacity: 0, y: 8 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                        onClick={() => handleSuggestedClick(item.message)}
                                        disabled={isLoading}
                                        className="w-full text-left text-xs p-3.5 md:p-4 bg-card border border-border hover:border-brand-500 hover:bg-brand-500/[0.02] text-muted-foreground hover:text-foreground transition-all duration-300 rounded-none flex items-center justify-between group"
                                    >
                                        <span className="pr-4">{item.message}</span>
                                        <Send className="w-3 h-3 text-brand-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 shrink-0 ml-2" />
                                    </motion.button>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                ) : (
                    /* ── Active Conversation State ── */
                    <div className="flex-1 flex flex-col min-h-0 relative">
                        {/* Messages Stream */}
                        <div className="flex-1 overflow-y-auto space-y-5 pb-4 pr-1 scrollbar-thin">
                            {messages.map((message, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className={`flex flex-col ${message.role === "user" ? "items-end" : "items-start"}`}
                                >
                                    {/* Role Header label */}
                                    <div className="text-[10px] tracking-wider text-muted-foreground uppercase mb-1.5 flex items-center gap-1.5">
                                        {message.role === "user" ? (
                                            <span>Anda</span>
                                        ) : (
                                            <>
                                                <Sparkles className="w-3 h-3 text-brand-500" />
                                                <span className="font-heading font-semibold text-brand-500">Arifian.AI</span>
                                            </>
                                        )}
                                    </div>
                                    
                                    {/* Document-styled message box */}
                                    <div className={`max-w-[90%] md:max-w-[85%] px-4 md:px-5 py-3 md:py-4 text-sm leading-relaxed rounded-none border ${
                                        message.role === "user"
                                            ? "bg-[#e8e6dc]/30 dark:bg-[#30302e]/30 border-border text-foreground"
                                            : "bg-card border-border text-foreground shadow-sm"
                                    }`}>
                                        {parseContent(message.content)}
                                    </div>
                                </motion.div>
                            ))}

                            {isLoading && (
                                <div className="flex flex-col items-start">
                                    <div className="text-[10px] tracking-wider text-brand-500 uppercase mb-1.5 flex items-center gap-1.5">
                                        <Sparkles className="w-3 h-3 text-brand-500" />
                                        <span className="font-heading font-semibold">Arifian.AI</span>
                                    </div>
                                    <div className="bg-card border border-border px-5 py-4 rounded-none flex gap-1.5">
                                        <span className="w-1.5 h-1.5 bg-brand-500 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                                        <span className="w-1.5 h-1.5 bg-brand-500 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                                        <span className="w-1.5 h-1.5 bg-brand-500 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                                    </div>
                                </div>
                            )}

                            {error && (
                                <div className="flex justify-center">
                                    <div className="bg-destructive/10 border border-destructive/20 text-destructive px-4 py-2.5 text-xs flex items-center gap-2 rounded-none">
                                        <AlertCircle className="w-3.5 h-3.5" />
                                        {error}
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Bottom box - Static at bottom of flex layout (No overlap!) */}
                        <div className="bg-background pt-4 pb-2 border-t border-border">
                            
                            {/* Suggestions when chat is in progress - horizontally scrollable row */}
                            {quickSuggestions.length > 0 && (
                                <div className="max-w-2xl mx-auto mb-3 flex items-center gap-2 px-1 py-1 select-none">
                                    <button
                                        onClick={refreshQuickSuggestions}
                                        disabled={isLoading}
                                        className="p-1.5 bg-card border border-border hover:border-brand-500 text-muted-foreground hover:text-brand-500 transition-colors duration-200 disabled:opacity-50 rounded-none shrink-0"
                                        title="Acak Pertanyaan"
                                    >
                                        <RefreshCw className="w-3 h-3" />
                                    </button>
                                    <div className="flex gap-2 overflow-x-auto scrollbar-none shrink-1 min-w-0" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                                        {quickSuggestions.map((item, index) => (
                                            <button
                                                key={`${item.message}-${index}`}
                                                onClick={() => handleSuggestedClick(item.message)}
                                                disabled={isLoading}
                                                className="text-xs px-3 py-1.5 bg-card border border-border hover:border-brand-500 transition-colors duration-200 disabled:opacity-50 text-muted-foreground hover:text-foreground rounded-none shrink-0 whitespace-nowrap"
                                            >
                                                {item.message}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Text input form */}
                            <form onSubmit={handleSubmit} className="max-w-2xl mx-auto flex gap-2 shadow-sm">
                                <input
                                    ref={inputRef}
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder="Tulis pesan ke asisten..."
                                    disabled={isLoading}
                                    className="flex-1 px-4 h-11 bg-card border border-border focus:border-brand-500 outline-none transition-colors duration-300 text-sm rounded-none"
                                />
                                <Button
                                    type="submit"
                                    disabled={isLoading || !input.trim()}
                                    className="rounded-none bg-brand-500 hover:bg-brand-600 disabled:bg-brand-500/40 text-white h-11 px-5 shrink-0 transition-colors"
                                >
                                    <Send className="w-4 h-4" />
                                </Button>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </section>
    )
}
