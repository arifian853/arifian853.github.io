import Link from "next/link"
import { Home } from "lucide-react"

export default function NotFound() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center px-6 relative overflow-hidden">
            {/* Grid Background Pattern */}
            <div
                className="absolute inset-0 opacity-[0.08] dark:opacity-[0.12]"
                style={{
                    backgroundImage: `
                        linear-gradient(to right, currentColor 1px, transparent 1px),
                        linear-gradient(to bottom, currentColor 1px, transparent 1px)
                    `,
                    backgroundSize: '40px 40px',
                }}
            />

            {/* Content */}
            <div className="relative z-10 text-center max-w-md">
                {/* 404 Number */}
                <h1 className="text-8xl md:text-9xl font-bold font-heading text-sblue-500 mb-4">
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
                    <button className="flex items-center justify-center gap-2 bg-sblue-500 hover:bg-sblue-600 text-white px-8 py-3 font-medium transition-colors duration-300 mx-auto">
                        <Home className="w-4 h-4" />
                        Go Home
                    </button>
                </Link>
            </div>

            {/* Decorative Footer */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-black dark:text-black text-xs bg-sblue-500 p-2">
                Lost? It happens to the best of us.
            </div>
        </div>
    )
}