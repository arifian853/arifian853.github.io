"use client"

import React, { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

interface ProjectPopoverProps {
    projectId: number
    title: string
    year: string
    description: string
    children: React.ReactNode
}

/**
 * ProjectPopover wraps a project card, tracks mouse hover state,
 * and opens a native Top-Layer Popover after 2 seconds.
 * It uses CSS Anchor Positioning to cleanly align the popover
 * next to the card regardless of overflow-hidden parent containers.
 */
export function ProjectPopover({ projectId, title, year, description, children }: ProjectPopoverProps) {
    const [isOpen, setIsOpen] = useState(false)
    const anchorName = `--project-card-${projectId}`
    const popoverRef = useRef<HTMLDivElement>(null)
    const hoverTimer = useRef<NodeJS.Timeout | null>(null)
    const closeTimer = useRef<NodeJS.Timeout | null>(null)

    const handleMouseEnter = () => {
        // Clear any pending close timers
        if (closeTimer.current) clearTimeout(closeTimer.current)
        if (hoverTimer.current) clearTimeout(hoverTimer.current)

        // Show popover after 2 seconds (2000ms) of active hover
        hoverTimer.current = setTimeout(() => {
            setIsOpen(true)
        }, 2000)
    }

    const handleMouseLeave = () => {
        // Clear hover timer if mouse leaves before 2s
        if (hoverTimer.current) clearTimeout(hoverTimer.current)

        // Give user 300ms transition time to hover onto the popover itself
        closeTimer.current = setTimeout(() => {
            setIsOpen(false)
        }, 300)
    }

    useEffect(() => {
        const popover = popoverRef.current
        if (!popover) return

        if (isOpen) {
            try {
                popover.showPopover()
            } catch (e) {
                // Fallback for browsers not fully supporting showPopover
            }
        } else {
            try {
                popover.hidePopover()
            } catch (e) {
                // Fallback
            }
        }
    }, [isOpen])

    // Clean up timers on unmount
    useEffect(() => {
        return () => {
            if (hoverTimer.current) clearTimeout(hoverTimer.current)
            if (closeTimer.current) clearTimeout(closeTimer.current)
        }
    }, [])

    return (
        <div
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{ anchorName } as React.CSSProperties}
            className="relative h-full w-full"
        >
            {children}

            {/* Popover Element using native Popover API */}
            <div
                ref={popoverRef}
                popover="manual"
                id={`popover-${projectId}`}
                onMouseEnter={() => {
                    if (closeTimer.current) clearTimeout(closeTimer.current)
                }}
                onMouseLeave={handleMouseLeave}
                style={{
                    "--anchor-target": anchorName,
                } as React.CSSProperties}
                className="project-popover border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-950 p-5 shadow-2xl max-w-[320px] pointer-events-auto"
            >
                <div className="relative z-10">
                    <span className="text-[10px] font-heading tracking-[0.2em] uppercase text-brand-500/70 mb-2 block">
                        Quick Preview
                    </span>
                    <div className="flex items-start justify-between gap-3 mb-2">
                        <h4 className="font-heading font-bold text-base leading-tight text-foreground">
                            {title}
                        </h4>
                        <span className="bg-brand-700 text-white text-[10px] font-medium px-2 py-0.5 shrink-0 self-start mt-0.5">
                            {year}
                        </span>
                    </div>
                    <p className="text-zinc-600 dark:text-zinc-400 text-xs leading-relaxed mb-4 text-pretty line-clamp-3">
                        {description}
                    </p>
                    <Link
                        href={`/projects/${projectId}`}
                        className="inline-flex items-center justify-center bg-brand-700 hover:bg-brand-800 text-white font-medium text-xs px-4 py-2.5 transition-all duration-300 w-full text-center gap-1.5 group/btn"
                    >
                        Read More
                        <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform duration-200" />
                    </Link>
                </div>
            </div>
        </div>
    )
}
