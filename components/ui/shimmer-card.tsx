"use client"

import { useRef } from "react"

interface ShimmerCardProps {
    children: React.ReactNode
    className?: string
}

/**
 * SpotlightCard — cursor glow effect.
 * A radial gradient "light" follows the cursor inside the card.
 * The card itself never moves or tilts.
 * No inner wrapper div — flex/grid layout of className passes through cleanly.
 */
export function ShimmerCard({ children, className = "" }: ShimmerCardProps) {
    const ref = useRef<HTMLDivElement>(null)
    const spotRef = useRef<HTMLDivElement>(null)

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const card = ref.current
        const spot = spotRef.current
        if (!card || !spot) return

        const rect = card.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top

        const isDark = document.documentElement.classList.contains("dark")
        // Dark mode: subtle blue glow. Light mode: stronger slate glow for contrast
        const color = isDark
            ? "rgba(112, 137, 168, 0.14)"
            : "rgba(67, 90, 118, 0.12)"

        spot.style.opacity = "1"
        spot.style.background = `radial-gradient(280px circle at ${x}px ${y}px, ${color} 0%, transparent 70%)`
    }

    const handleMouseLeave = () => {
        const spot = spotRef.current
        if (!spot) return
        spot.style.opacity = "0"
    }

    const hasOverflow = className.includes("overflow-")
    return (
        <div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className={`relative ${hasOverflow ? "" : "overflow-hidden"} ${className}`}
        >
            {/* Spotlight glow — absolute, pointer-events-none, sits behind content via z-index */}
            <div
                ref={spotRef}
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300"
                style={{ opacity: 0 }}
            />
            {/* No wrapper div — children render directly, inheriting all flex/grid from className */}
            {children}
        </div>
    )
}
