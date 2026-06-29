import Link from "next/link"
import { Home } from "lucide-react"

export default function NotFound() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center px-6 relative overflow-hidden">
            {/* Radial glow */}
            <div
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none rounded-full"
                style={{
                    background: "radial-gradient(circle, rgba(112,137,168,0.06) 0%, transparent 70%)",
                    filter: "blur(60px)"
                }}
            />

            {/* Content */}
            <div className="relative z-10 text-center max-w-md">
                {/* 404 Number */}
                <h1 className="text-8xl md:text-9xl font-bold font-heading text-brand-500 mb-4">
                    404
                </h1>

                {/* Title */}
                <h2 className="text-2xl md:text-3xl font-bold font-heading mb-4">
                    Page Not Found
                </h2>

                {/* Description */}
                <p className="text-zinc-600 dark:text-zinc-400 mb-8">
                    Oops! The page you&apos;re looking for doesn&apos;t exist or has been moved.
                </p>

                {/* Button */}
                <Link href="/">
                    <button className="flex items-center justify-center gap-2 bg-brand-500 hover:bg-brand-600 text-white px-8 py-3 font-medium transition-colors duration-300 mx-auto">
                        <Home className="w-4 h-4" />
                        Go Home
                    </button>
                </Link>
            </div>

            {/* Decorative Footer */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-black dark:text-black text-xs bg-brand-500 p-2">
                Lost? It happens to the best of us.
            </div>
        </div>
    )
}
