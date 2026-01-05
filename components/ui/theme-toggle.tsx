"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import { Button } from "./button"

export function ThemeToggle() {
    const { theme, setTheme, resolvedTheme } = useTheme()
    const [mounted, setMounted] = React.useState(false)

    // Avoid hydration mismatch
    React.useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return (
            <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 rounded-full"
                aria-label="Toggle theme"
            >
                <span className="h-4 w-4" />
            </Button>
        )
    }

    const isDark = resolvedTheme === "dark"

    return (
        <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(isDark ? "light" : "dark")}
            className="relative h-9 w-9 rounded-full bg-transparent hover:bg-accent-muted transition-all duration-[var(--motion-base)]"
            aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
        >
            {/* Sun Icon */}
            <svg
                className={`h-4 w-4 absolute transition-all duration-[var(--motion-base)] ${isDark
                    ? "rotate-0 scale-100 opacity-100"
                    : "rotate-90 scale-0 opacity-0"
                    }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                />
            </svg>

            {/* Moon Icon */}
            <svg
                className={`h-4 w-4 absolute transition-all duration-[var(--motion-base)] ${isDark
                    ? "-rotate-90 scale-0 opacity-0"
                    : "rotate-0 scale-100 opacity-100"
                    }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                />
            </svg>
        </Button>
    )
}
