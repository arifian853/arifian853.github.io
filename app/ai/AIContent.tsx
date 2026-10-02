"use client"

import { ELARA_API_URL } from "@/lib/api-config"

import { useState, useEffect, useRef, useMemo } from "react"
import Image from "next/image"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import rehypeRaw from "rehype-raw"
import { m as motion, useScroll, useTransform } from "framer-motion"
import { Send, Trash2, Sparkles, AlertCircle, Info, RefreshCw, Copy, Check } from "lucide-react"
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
    role: "user" | "assistant" | "model"
    content: string
}

const PROJECT_REQUEST_SUGGESTION = {
    category: "Project Request & Consultation",
    message: "Aku mau buat proyek / konsultasi dengan Arifian",
    description: "Konsultasikan ide proyek, pembuatan web app, AI system, integrasi backend, atau ajak kerja sama freelance.",
}

const generalSuggestedMessages = [
    { category: "Bio & Career", message: "Siapakah Arifian Saputra?" },
    { category: "Bio & Career", message: "Apa latar belakang pendidikan dan pekerjaan Arifian?" },
    { category: "Projects", message: "Proyek unggulan apa saja yang telah dibangun Arifian?" },
    { category: "Tech Stack", message: "Apa keahlian dan tech stack utama Arifian?" },
    { category: "Elara", message: "Siapa kamu Elara, dan apa peranmu di sini?" },
    { category: "Contact", message: "Bagaimana cara menghubungi atau bekerja sama dengan Arifian?" },
    { category: "Tech Architecture", message: "Bagaimana sistem RAG dan backend Elara bekerja?" },
]

const API_BASE = ELARA_API_URL
const API_ENDPOINT = `${API_BASE}/chat`

export function AIContent() {
    const [messages, setMessages] = useState<Message[]>([])
    const [history, setHistory] = useState<HistoryItem[]>([])
    const [sessionId, setSessionId] = useState<string>("")
    const [input, setInput] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [showWelcome, setShowWelcome] = useState(false)
    const [showInfo, setShowInfo] = useState(false)
    const [dontShowAgain, setDontShowAgain] = useState(false)
    const [mounted, setMounted] = useState(false)
    const [quickSuggestions, setQuickSuggestions] = useState<typeof generalSuggestedMessages>([])
    const [copiedIndex, setCopiedIndex] = useState<number | null>(null)

    const messagesEndRef = useRef<HTMLDivElement>(null)
    const inputRef = useRef<HTMLInputElement>(null)

    const sectionRef = useRef<HTMLElement>(null)
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end start"]
    })
    const bgY = useTransform(scrollYProgress, [0, 1], [0, 100])

    // Pick 4 general suggestions for empty state
    const randomSuggestions = useMemo(() => {
        return [...generalSuggestedMessages]
            .sort(() => Math.random() - 0.5)
            .slice(0, 4)
    }, [])

    // Shuffle 3 suggestions for quick bottom choices
    const refreshQuickSuggestions = () => {
        const shuffled = [...generalSuggestedMessages]
            .sort(() => Math.random() - 0.5)
            .slice(0, 3)
        setQuickSuggestions(shuffled)
    }

    // Load from localStorage on mount
    useEffect(() => {
        setMounted(true)
        let sid = localStorage.getItem("elara-ai-session-id")
        if (!sid) {
            sid = "elara_usr_" + Math.random().toString(36).substring(2, 11) + "_" + Date.now().toString(36)
            localStorage.setItem("elara-ai-session-id", sid)
        }
        setSessionId(sid)

        const savedMessages = localStorage.getItem("elara-ai-messages") || localStorage.getItem("arifian-ai-messages")
        const savedHistory = localStorage.getItem("elara-ai-history") || localStorage.getItem("arifian-ai-history")
        const hideWelcome = localStorage.getItem("elara-ai-hide-welcome")

        if (savedMessages) {
            try { setMessages(JSON.parse(savedMessages)) } catch (e) { console.error(e) }
        }
        if (savedHistory) {
            try { setHistory(JSON.parse(savedHistory)) } catch (e) { console.error(e) }
        }
        if (!hideWelcome) {
            setShowWelcome(true)
        }
        refreshQuickSuggestions()
    }, [])

    // Save to localStorage when messages change
    useEffect(() => {
        if (messages.length > 0) {
            localStorage.setItem("elara-ai-messages", JSON.stringify(messages))
        }
    }, [messages])

    useEffect(() => {
        if (history.length > 0) {
            localStorage.setItem("elara-ai-history", JSON.stringify(history))
        }
    }, [history])

    // Scroll to bottom when new messages arrive
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
            localStorage.setItem("elara-ai-hide-welcome", "true")
        }
        setShowWelcome(false)
    }

    const copyToClipboard = (text: string, index: number) => {
        navigator.clipboard.writeText(text)
        setCopiedIndex(index)
        setTimeout(() => setCopiedIndex(null), 2000)
    }

    // Render rich markdown content (bold, lists, headings, links, tables, code, blockquotes) safely
    const renderMarkdownContent = (text: string) => {
        return (
            <div className="prose prose-invert max-w-none text-sm leading-relaxed space-y-2 [&_p]:my-1.5 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:my-2 [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:my-2 [&_li]:my-0.5 [&_strong]:font-bold [&_strong]:text-brand-700 dark:[&_strong]:text-brand-400 [&_h1]:text-base [&_h1]:font-bold [&_h2]:text-sm [&_h2]:font-bold [&_h3]:text-xs [&_h3]:font-bold [&_hr]:my-3 [&_hr]:border-border">
                <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeRaw]}
                    components={{
                        a: ({ href, children }) => (
                            <a
                                href={href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-brand-700 dark:text-brand-400 font-semibold hover:underline break-all inline"
                            >
                                {children}
                            </a>
                        ),
                        table: ({ children }) => (
                            <div className="my-3 w-full overflow-x-auto border border-border bg-card/60">
                                <table className="w-full text-left text-xs border-collapse font-sans">
                                    {children}
                                </table>
                            </div>
                        ),
                        thead: ({ children }) => (
                            <thead className="bg-secondary/80 border-b border-border text-foreground font-mono uppercase text-[11px]">
                                {children}
                            </thead>
                        ),
                        tbody: ({ children }) => (
                            <tbody className="divide-y divide-border/60">
                                {children}
                            </tbody>
                        ),
                        tr: ({ children }) => (
                            <tr className="hover:bg-secondary/30 transition-colors">
                                {children}
                            </tr>
                        ),
                        th: ({ children }) => (
                            <th className="p-2.5 font-bold tracking-wider border-r border-border/40 last:border-r-0 text-foreground">
                                {children}
                            </th>
                        ),
                        td: ({ children }) => (
                            <td className="p-2.5 text-muted-foreground border-r border-border/40 last:border-r-0 leading-relaxed">
                                {children}
                            </td>
                        ),
                        pre: ({ children }) => (
                            <pre className="my-2.5 p-3 bg-secondary/80 border border-border font-mono text-xs overflow-x-auto text-foreground">
                                {children}
                            </pre>
                        ),
                        code: ({ children, className }) => {
                            const isBlock = className?.includes("language-")
                            if (isBlock) {
                                return <code className="font-mono text-xs text-foreground block">{children}</code>
                            }
                            return (
                                <code className="font-mono bg-secondary/80 text-brand-700 dark:text-brand-400 px-1.5 py-0.5 text-xs border border-border/40">
                                    {children}
                                </code>
                            )
                        },
                        blockquote: ({ children }) => (
                            <blockquote className="border-l-4 border-brand-500 dark:border-brand-400 pl-3 py-1 my-2 bg-secondary/20 italic text-muted-foreground text-xs">
                                {children}
                            </blockquote>
                        ),
                    }}
                >
                    {text}
                </ReactMarkdown>
            </div>
        )
    }

    // Helper to extract option chips & step templates from assistant message text
    const extractOptionChips = (text: string): string[] => {
        const optionRegex = /\[([^\]]+)\]/g
        const chips: string[] = []
        let match
        while ((match = optionRegex.exec(text)) !== null) {
            const option = match[1].trim()
            if (!option.startsWith("Step ") && !option.startsWith("http") && !option.includes("http") && !chips.includes(option)) {
                chips.push(option)
            }
        }

        if (chips.length > 0) return chips

        // Step template hints for 6 intake steps
        const lower = text.toLowerCase()

        // 1. If intake is COMPLETED or CANCELLED, return NO option chips (back to normal RAG mode)
        if (
            lower.includes("terima kasih") ||
            lower.includes("request kamu sudah") ||
            lower.includes("akan segera menghubungi") ||
            lower.includes("dibatalkan")
        ) {
            return []
        }

        // 2. Step 6 Confirmation Check (asking if summary is correct)
        if (
            lower.includes("sudah benar") ||
            lower.includes("rangkuman request") ||
            lower.includes("kalau iya, aku kirim") ||
            lower.includes("konfirmasi")
        ) {
            return ["Ya, Kirim", "Batal"]
        }
        if (lower.includes("jasa apa") || lower.includes("step 1")) {
            return ["Web App", "Skripsi/TA", "Coaching", "Desain UI/UX", "Lainnya"]
        }
        if (lower.includes("ceritain proyek") || lower.includes("step 2") || lower.includes("tujuan dan fitur")) {
            return ["Bikin Web App Modern Next.js", "Sistem RAG & AI Chatbot Integrasi Telegram", "Refactoring Backend FastAPI & Database"]
        }
        if (lower.includes("estimasi budget") || lower.includes("budget kamu") || lower.includes("step 3")) {
            return ["<1jt", "1-3jt", "3-5jt", "5jt+", "Belum Tahu"]
        }
        if (lower.includes("targetnya kapan") || lower.includes("target deadline") || lower.includes("step 4")) {
            return ["Buru-buru (<2 mgg)", "1 Bulan", "2-3 Bulan", "Santai"]
        }
        if (lower.includes("kontak yang bisa dihubungi") || lower.includes("nomor wa") || lower.includes("step 5")) {
            return ["WA: 08", "Telegram: @", "Email: "]
        }

        return []
    }

    // Populate input field with option/template without auto-sending
    const handleOptionChipClick = (chipText: string) => {
        setInput(chipText)
        setTimeout(() => inputRef.current?.focus(), 50)
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
                    session_id: sessionId,
                    history: history
                })
            })

            if (!response.ok) {
                throw new Error("Failed to get response")
            }

            const data = await response.json()
            const assistantMessage: Message = {
                role: "assistant",
                content: data.response || data.message || "Maaf, saya tidak dapat memproses permintaan Anda saat ini."
            }

            setMessages(prev => [...prev, assistantMessage])

            setHistory(prev => [
                ...prev,
                { role: "user", content: messageText },
                { role: "assistant", content: assistantMessage.content }
            ])

        } catch (err) {
            setError("Gagal terhubung dengan Elara. Silakan coba beberapa saat lagi.")
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
        const newSid = "elara_usr_" + Math.random().toString(36).substring(2, 11) + "_" + Date.now().toString(36)
        localStorage.setItem("elara-ai-session-id", newSid)
        setSessionId(newSid)
        localStorage.removeItem("elara-ai-messages")
        localStorage.removeItem("elara-ai-history")
        localStorage.removeItem("arifian-ai-messages")
        localStorage.removeItem("arifian-ai-history")
    }

    if (!mounted) {
        return (
            <section ref={sectionRef} className="relative min-h-screen flex flex-col py-12 md:py-20 overflow-hidden bg-background">
                <div className="relative z-10 w-full max-w-4xl mx-auto px-6 pt-16 flex flex-col flex-1">
                    <div className="flex items-center justify-center flex-1">
                        <p className="text-muted-foreground text-sm font-mono">Memuat Elara AI...</p>
                    </div>
                </div>
            </section>
        )
    }

    return (
        <section ref={sectionRef} id="ai" className="relative min-h-screen flex flex-col py-12 md:py-20 overflow-hidden bg-background">
            {/* Ambient Background Glow in the Brand Accent */}
            <motion.div
                className="absolute left-1/2 top-1/4 -translate-x-1/2 w-[500px] h-[500px] pointer-events-none rounded-full"
                style={{
                    y: bgY,
                    background: "radial-gradient(circle, color-mix(in srgb, var(--color-brand-500) 4%, transparent) 0%, transparent 70%)",
                    filter: "blur(70px)"
                }}
            />

            {/* Welcome Dialog */}
            <Dialog open={showWelcome} onOpenChange={setShowWelcome}>
                <DialogContent className="w-[calc(100%-2rem)] max-w-[420px] rounded-none border-border bg-card">
                    <DialogHeader>
                        <div className="flex items-center gap-3 mb-2">
                            <div className="relative w-10 h-10 border border-brand-500/40 bg-secondary shrink-0 overflow-hidden">
                                <Image src="/Elara_Asterwyne.png" alt="Elara AI" fill sizes="40px" className="object-cover" />
                            </div>
                            <div>
                                <DialogTitle className="text-xl font-heading font-bold text-foreground">
                                    Halo, Saya Elara
                                </DialogTitle>
                                <p className="text-xs text-brand-700 dark:text-brand-400 font-mono">
                                    Arifian&apos;s Personal Assistant
                                </p>
                            </div>
                        </div>
                        <DialogDescription className="text-xs pt-1 text-muted-foreground leading-relaxed">
                            Saya adalah asisten AI pribadi Arifian yang ditenagai oleh teknologi Hybrid RAG (Gemini Embeddings 2 + Supabase pgvector), Gemma 4 26B Reranker, dan Groq GPT-OSS 120B.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="py-3 space-y-3">
                        <div className="bg-secondary/50 p-3.5 border-l-4 border-brand-500">
                            <p className="text-xs text-muted-foreground leading-relaxed">
                                Anda dapat menanyakan apa saja mengenai latar belakang, karya proyek, keahlian teknis, maupun kontak pribadi Arifian.
                            </p>
                        </div>

                        <div className="flex items-center space-x-2 pt-1">
                            <Checkbox
                                id="dontShow"
                                checked={dontShowAgain}
                                onCheckedChange={(checked) => setDontShowAgain(checked as boolean)}
                            />
                            <label
                                htmlFor="dontShow"
                                className="text-xs text-muted-foreground cursor-pointer select-none"
                            >
                                Jangan tampilkan pesan ini lagi
                            </label>
                        </div>
                    </div>

                    <Button
                        onClick={handleCloseWelcome}
                        className="w-full rounded-none bg-brand-700 hover:bg-brand-800 text-white font-medium text-xs h-10 transition-colors"
                    >
                        Mulai Percakapan
                    </Button>
                </DialogContent>
            </Dialog>

            {/* Info Dialog */}
            <Dialog open={showInfo} onOpenChange={setShowInfo}>
                <DialogContent className="flex max-h-[calc(100svh-2rem)] w-[calc(100%-2rem)] flex-col rounded-none border-border bg-card p-5 sm:max-w-[520px] sm:p-6">
                    <DialogHeader className="shrink-0 pr-6 text-left">
                        <div className="flex items-center gap-3 mb-1">
                            <div className="relative w-8 h-8 border border-brand-500/40 bg-secondary shrink-0 overflow-hidden">
                                <Image src="/Elara_Asterwyne.png" alt="Elara AI" fill sizes="32px" className="object-cover" />
                            </div>
                            <DialogTitle className="text-xl leading-snug font-heading font-bold">
                                Tentang Elara AI
                            </DialogTitle>
                        </div>
                        <DialogDescription className="text-sm leading-relaxed text-muted-foreground">
                            Informasi teknis dan arsitektur RAG Elara.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="min-h-0 space-y-5 overflow-y-auto py-1 pr-1">
                        <div>
                            <h3 className="mb-4 font-heading text-sm font-semibold text-foreground">Technical Architecture</h3>
                            <dl className="divide-y divide-border text-sm leading-relaxed text-muted-foreground [&_dt]:font-mono [&_dt]:text-xs [&_dt]:font-semibold [&_dt]:text-brand-700 dark:[&_dt]:text-brand-400 [&_dd]:mt-1.5 [&_code]:inline-block [&_code]:max-w-full [&_code]:break-all [&_code]:border [&_code]:border-border [&_code]:bg-secondary/60 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-xs [&_code]:text-foreground">
                                <div className="pb-3">
                                    <dt>LLM Generation</dt>
                                    <dd>
                                        <p>Groq GPT-OSS 120B</p>
                                        <code className="mt-1">openai/gpt-oss-120b</code>
                                    </dd>
                                </div>
                                <div className="py-3">
                                    <dt>Vector Embeddings</dt>
                                    <dd>
                                        <p>Google AI Studio</p>
                                        <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1">
                                            <code>gemini-embedding-2</code>
                                            <span className="text-xs">768 dimensions</span>
                                        </div>
                                    </dd>
                                </div>
                                <div className="py-3">
                                    <dt>LLM Reranker</dt>
                                    <dd>
                                        <p>Google AI Studio</p>
                                        <code className="mt-1">gemma-4-26b-a4b-it</code>
                                    </dd>
                                </div>
                                <div className="py-3">
                                    <dt>Vector Database</dt>
                                    <dd>
                                        <p>Supabase PostgreSQL</p>
                                        <code className="mt-1">pgvector 0.8.2</code>
                                        <p className="mt-1 text-xs">HNSW + FTS GIN via RRF</p>
                                    </dd>
                                </div>
                                <div className="pt-3">
                                    <dt>Backend Engine</dt>
                                    <dd>
                                        <p>FastAPI (Python 3.11+)</p>
                                        <p className="mt-1 text-xs">+ Hermes Telegram Agent Bridge</p>
                                    </dd>
                                </div>
                            </dl>
                        </div>

                        <div className="bg-secondary/50 p-3.5 border-l-4 border-brand-500">
                            <h3 className="text-sm font-semibold mb-1">Catatan Server</h3>
                            <p className="text-xs text-muted-foreground leading-relaxed">
                                Jika respon pertama memerlukan waktu beberapa detik, server backend mungkin sedang melakukan cold start dari status standby.
                            </p>
                        </div>

                        <div className="border-t border-border pt-4 text-xs leading-relaxed text-muted-foreground">
                            Riwayat pesan disimpan secara lokal di browser Anda dan tidak diunggah ke pihak ketiga secara permanen.
                        </div>
                    </div>

                    <Button
                        onClick={() => setShowInfo(false)}
                        className="w-full shrink-0 rounded-none bg-brand-700 hover:bg-brand-800 text-white font-medium text-xs h-10 transition-colors"
                    >
                        Tutup
                    </Button>
                </DialogContent>
            </Dialog>

            {/* Main App Container */}
            <div className="relative z-10 w-full max-w-3xl mx-auto px-4 sm:px-6 pt-6 flex flex-col flex-1 min-h-0">

                {/* Elegant Minimalist Header */}
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-border">
                    <div className="flex items-center gap-3">
                        <div className="relative w-8 h-8 border border-brand-500/40 bg-secondary shrink-0 overflow-hidden">
                            <Image src="/Elara_Asterwyne.png" alt="Elara Avatar" fill sizes="32px" className="object-cover" />
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                <span className="font-heading font-bold text-base tracking-tight text-foreground">
                                    Elara
                                </span>
                            </div>
                            <p className="text-[11px] text-muted-foreground hidden sm:block">
                                Arifian&apos;s AI Assistant
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-1.5 sm:gap-2">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setShowInfo(true)}
                            className="rounded-none hover:bg-secondary text-muted-foreground hover:text-foreground text-xs px-2.5 h-8 gap-1.5 border border-transparent hover:border-border"
                        >
                            <Info className="w-3.5 h-3.5 text-brand-700 dark:text-brand-400" />
                            <span className="hidden sm:inline">Info Elara</span>
                        </Button>
                        {messages.length > 0 && (
                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="rounded-none text-muted-foreground hover:text-destructive hover:bg-destructive/10 text-xs px-2.5 h-8 gap-1.5 border border-transparent hover:border-border"
                                    >
                                        <Trash2 className="w-3.5 h-3.5" />
                                        <span className="hidden sm:inline">Hapus Chat</span>
                                    </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent className="rounded-none border-border bg-card">
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Hapus Riwayat Percakapan?</AlertDialogTitle>
                                        <AlertDialogDescription className="text-sm text-muted-foreground">
                                            Tindakan ini akan menghapus semua pesan di layar secara permanen dari browser Anda.
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
                    /* ── Elegant Empty State ── */
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex-1 flex flex-col items-center justify-center py-6 md:py-8"
                    >
                        {/* Centered Elara Avatar & Greeting */}
                        <div className="relative mb-4">
                            <div className="w-20 h-20 border-2 border-brand-500/40 bg-secondary p-0.5 overflow-hidden shadow-sm">
                                <Image src="/Elara_Asterwyne.png" alt="Elara" width={80} height={80} className="object-cover w-full h-full" />
                            </div>
                            <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-brand-700 border-2 border-background rounded-full flex items-center justify-center">
                                <Sparkles className="w-2.5 h-2.5 text-white" />
                            </span>
                        </div>

                        <h2 className="text-xl md:text-3xl font-heading font-bold text-center mb-1.5 tracking-tight">
                            Halo, Aku <span className="text-brand-700 dark:text-brand-400">Elara</span>
                        </h2>
                        <p className="text-xs md:text-sm text-muted-foreground text-center mb-6 max-w-md leading-relaxed">
                            Asisten AI pribadi Arifian. Tanyakan apa saja seputar portofolio, keahlian, proyek, atau pengalaman kerja Arifian!
                        </p>

                        {/* Centered Chat Input */}
                        <form onSubmit={handleSubmit} className="w-full max-w-2xl flex gap-2 mb-8 shadow-sm">
                            <input
                                ref={inputRef}
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Tanyakan sesuatu tentang Arifian..."
                                disabled={isLoading}
                                className="flex-1 px-4 h-12 bg-card border border-border focus:border-brand-500 outline-none transition-colors duration-200 text-sm rounded-none"
                            />
                            <Button
                                type="submit"
                                disabled={isLoading || !input.trim()}
                                className="rounded-none bg-brand-700 hover:bg-brand-800 disabled:bg-brand-700/40 text-white h-12 px-6 shrink-0 transition-colors"
                            >
                                <Send className="w-4 h-4" />
                            </Button>
                        </form>

                        {/* Suggested Questions Grid with Pinned Project Request at Top */}
                        <div className="w-full max-w-2xl space-y-3">
                            <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground/70 mb-1 block text-center">
                                Rekomendasi Pertanyaan
                            </span>

                            {/* Featured Top Card: Project Request & Consultation */}
                            <motion.button
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                onClick={() => handleSuggestedClick(PROJECT_REQUEST_SUGGESTION.message)}
                                disabled={isLoading}
                                className="w-full text-left p-3.5 sm:p-4 bg-gradient-to-r from-brand-500/15 via-brand-500/5 to-transparent border border-brand-500/40 hover:border-brand-500 text-muted-foreground hover:text-foreground transition-all duration-200 rounded-none flex items-center justify-between group shadow-xs cursor-pointer"
                            >
                                <div className="flex flex-col pr-3">
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="text-[9px] sm:text-[10px] font-mono font-semibold text-brand-700 dark:text-brand-400 uppercase tracking-wider bg-brand-700/10 px-2 py-0.5 border border-brand-500/20">
                                            {PROJECT_REQUEST_SUGGESTION.category}
                                        </span>
                                        <span className="text-[10px] text-brand-700 dark:text-brand-400 font-mono hidden sm:inline">
                                            • Rekomendasi Utama
                                        </span>
                                    </div>
                                    <span className="text-xs sm:text-sm font-semibold text-foreground group-hover:text-brand-700 dark:group-hover:text-brand-400 transition-colors">
                                        {PROJECT_REQUEST_SUGGESTION.message}
                                    </span>
                                    <p className="text-[11px] sm:text-xs text-muted-foreground mt-0.5 leading-relaxed">
                                        {PROJECT_REQUEST_SUGGESTION.description}
                                    </p>
                                </div>
                                <div className="shrink-0 flex items-center gap-1.5 bg-brand-700 text-white px-3 py-2 text-xs font-medium group-hover:bg-brand-800 transition-colors shadow-xs">
                                    <span className="hidden sm:inline">Mulai</span>
                                    <Send className="w-3 h-3" />
                                </div>
                            </motion.button>

                            {/* 4 General Suggestion Cards (2x2 Grid) */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                                {randomSuggestions.map((item, index) => (
                                    <motion.button
                                        key={item.message}
                                        initial={{ opacity: 0, y: 8 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                        onClick={() => handleSuggestedClick(item.message)}
                                        disabled={isLoading}
                                        className="w-full text-left text-xs p-3.5 bg-card border border-border hover:border-brand-500 hover:bg-brand-700/[0.03] text-muted-foreground hover:text-foreground transition-all duration-200 rounded-none flex items-center justify-between group cursor-pointer"
                                    >
                                        <div className="flex flex-col">
                                            <span className="text-[9px] font-mono text-brand-700 dark:text-brand-400 uppercase tracking-wider mb-0.5">{item.category}</span>
                                            <span className="text-xs text-foreground/90 group-hover:text-foreground">{item.message}</span>
                                        </div>
                                        <Send className="w-3 h-3 text-brand-700 opacity-0 group-hover:opacity-100 transition-opacity duration-200 shrink-0 ml-2" />
                                    </motion.button>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                ) : (
                    /* ── Active Conversation Stream ── */
                    <div className="flex-1 flex flex-col min-h-0 relative">
                        {/* Messages Stream */}
                        <div className="flex-1 overflow-y-auto space-y-5 pb-4 pr-1 scrollbar-thin">
                            {messages.map((message, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.25 }}
                                    className={`flex flex-col ${message.role === "user" ? "items-end" : "items-start"}`}
                                >
                                    {/* Role Header label */}
                                    <div className="text-[10px] font-mono tracking-wider text-muted-foreground uppercase mb-1.5 flex items-center gap-2">
                                        {message.role === "user" ? (
                                            <span>Anda</span>
                                        ) : (
                                            <div className="flex items-center gap-1.5">
                                                <div className="relative w-4 h-4 border border-brand-500/40 bg-secondary overflow-hidden shrink-0">
                                                    <Image src="/Elara_Asterwyne.png" alt="Elara" fill sizes="16px" className="object-cover" />
                                                </div>
                                                <span className="font-semibold text-brand-700 dark:text-brand-400">ELARA</span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Document-styled message box */}
                                    <div className={`relative group max-w-[90%] md:max-w-[85%] px-4 md:px-5 py-3.5 text-sm leading-relaxed rounded-none border ${
                                        message.role === "user"
                                            ? "bg-secondary/60 border-border text-foreground"
                                            : "bg-card border-border border-l-4 border-l-brand-500 text-foreground shadow-sm"
                                    }`}>
                                        {renderMarkdownContent(message.content)}

                                        {/* Interactive Quick-Action Option Chips for Project Intake */}
                                        {message.role === "assistant" && extractOptionChips(message.content).length > 0 && (
                                            <div className="mt-3 pt-2.5 border-t border-border/60 flex flex-wrap gap-2">
                                                {extractOptionChips(message.content).map((chip, chipIdx) => (
                                                    <button
                                                        key={chipIdx}
                                                        onClick={() => handleOptionChipClick(chip)}
                                                        disabled={isLoading}
                                                        className="text-xs px-3 py-1.5 bg-brand-700/10 hover:bg-brand-700 text-brand-700 dark:text-brand-400 hover:text-white border border-brand-500/30 font-medium transition-all duration-150 rounded-none flex items-center gap-1.5 shrink-0 shadow-sm"
                                                        title="Klik untuk memasukkan ke input teks"
                                                    >
                                                        <span>{chip}</span>
                                                    </button>
                                                ))}
                                            </div>
                                        )}

                                        {/* Copy button for assistant responses */}
                                        {message.role === "assistant" && (
                                            <button
                                                onClick={() => copyToClipboard(message.content, index)}
                                                className="absolute top-2 right-2 p-1 text-muted-foreground hover:text-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                                                title="Copy response"
                                            >
                                                {copiedIndex === index ? (
                                                    <Check className="w-3.5 h-3.5 text-emerald-500" />
                                                ) : (
                                                    <Copy className="w-3.5 h-3.5" />
                                                )}
                                            </button>
                                        )}
                                    </div>
                                </motion.div>
                            ))}

                            {isLoading && (
                                <div className="flex flex-col items-start">
                                    <div className="text-[10px] font-mono tracking-wider text-brand-700 uppercase mb-1.5 flex items-center gap-1.5">
                                        <div className="relative w-4 h-4 border border-brand-500/40 bg-secondary overflow-hidden shrink-0">
                                            <Image src="/Elara_Asterwyne.png" alt="Elara" fill sizes="16px" className="object-cover" />
                                        </div>
                                        <span className="font-semibold text-brand-700 dark:text-brand-400">ELARA</span>
                                    </div>
                                    <div className="bg-card border border-border border-l-4 border-l-brand-500 px-5 py-4 rounded-none flex items-center gap-2">
                                        <span className="text-xs text-muted-foreground font-mono">Mengetik</span>
                                        <div className="flex gap-1">
                                            <span className="w-1.5 h-1.5 bg-brand-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                                            <span className="w-1.5 h-1.5 bg-brand-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                                            <span className="w-1.5 h-1.5 bg-brand-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                                        </div>
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

                        {/* Bottom Bar Input Form */}
                        <div className="bg-background pt-3 pb-2 border-t border-border">

                            {/* Always-visible Project Action Bar */}
                            <div className="w-full mb-2 flex items-center justify-between gap-2 px-3.5 py-2 bg-card border border-brand-500/35 hover:border-brand-500 bg-gradient-to-r from-brand-500/10 via-brand-500/5 to-transparent transition-all shadow-xs">
                                <div className="flex items-center gap-2 min-w-0">
                                    <span className="text-xs text-foreground/90 font-medium truncate">
                                        Mau buat proyek atau konsultasi dengan Arifian?
                                    </span>
                                </div>
                                <button
                                    onClick={() => sendMessage(PROJECT_REQUEST_SUGGESTION.message)}
                                    disabled={isLoading}
                                    className="shrink-0 text-[11px] sm:text-xs px-2.5 py-1 bg-brand-700 hover:bg-brand-800 disabled:opacity-50 text-white font-medium transition-colors shadow-xs flex items-center gap-1 cursor-pointer"
                                    title="Kirim permintaan proyek / konsultasi"
                                >
                                    <Sparkles className="w-3 h-3" />
                                    <span>Request Proyek</span>
                                </button>
                            </div>

                            {/* Suggestions during conversation */}
                            {quickSuggestions.length > 0 && (
                                <div className="w-full mb-2 flex items-center gap-2 select-none">
                                    <button
                                        onClick={refreshQuickSuggestions}
                                        disabled={isLoading}
                                        className="p-1.5 bg-card border border-border hover:border-brand-500 text-muted-foreground hover:text-brand-700 transition-colors duration-200 disabled:opacity-50 rounded-none shrink-0 cursor-pointer"
                                        title="Acak Pertanyaan"
                                    >
                                        <RefreshCw className="w-3 h-3" />
                                    </button>
                                    <div className="flex gap-2 overflow-x-auto scrollbar-none flex-1 min-w-0" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                                        {quickSuggestions.map((item, index) => (
                                            <button
                                                key={`${item.message}-${index}`}
                                                onClick={() => handleSuggestedClick(item.message)}
                                                disabled={isLoading}
                                                className="text-xs px-3 py-1.5 bg-card border border-border hover:border-brand-500 transition-colors duration-200 disabled:opacity-50 text-muted-foreground hover:text-foreground rounded-none shrink-0 whitespace-nowrap cursor-pointer"
                                            >
                                                {item.message}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Text input form */}
                            <form onSubmit={handleSubmit} className="w-full flex gap-2 shadow-sm">
                                <input
                                    ref={inputRef}
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder="Kirim pesan ke Elara..."
                                    disabled={isLoading}
                                    className="flex-1 px-4 h-11 bg-card border border-border focus:border-brand-500 outline-none transition-colors duration-200 text-sm rounded-none"
                                />
                                <Button
                                    type="submit"
                                    disabled={isLoading || !input.trim()}
                                    className="rounded-none bg-brand-700 hover:bg-brand-800 disabled:bg-brand-700/40 text-white h-11 px-5 shrink-0 transition-colors cursor-pointer"
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
