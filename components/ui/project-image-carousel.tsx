"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react"

interface ProjectImageCarouselProps {
    images: string[]
    title: string
}

export function ProjectImageCarousel({ images, title }: ProjectImageCarouselProps) {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [direction, setDirection] = useState(0)
    const [isLightboxOpen, setIsLightboxOpen] = useState(false)

    const handlePrev = useCallback(() => {
        setDirection(-1)
        setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
    }, [images.length])

    const handleNext = useCallback(() => {
        setDirection(1)
        setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
    }, [images.length])

    const handleSelect = (index: number) => {
        setDirection(index > currentIndex ? 1 : -1)
        setCurrentIndex(index)
    }

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "ArrowLeft") handlePrev()
            if (e.key === "ArrowRight") handleNext()
            if (e.key === "Escape" && isLightboxOpen) setIsLightboxOpen(false)
        }
        window.addEventListener("keydown", handleKeyDown)
        return () => window.removeEventListener("keydown", handleKeyDown)
    }, [handlePrev, handleNext, isLightboxOpen])

    const slideVariants = {
        enter: (dir: number) => ({
            x: dir > 0 ? 300 : -300,
            opacity: 0
        }),
        center: {
            x: 0,
            opacity: 1
        },
        exit: (dir: number) => ({
            x: dir < 0 ? 300 : -300,
            opacity: 0
        })
    }

    return (
        <div className="w-full space-y-4">
            {/* Main Stage */}
            <div className="relative w-full aspect-video bg-card border border-border rounded-none overflow-hidden group">
                <AnimatePresence initial={false} custom={direction} mode="wait">
                    <motion.div
                        key={currentIndex}
                        custom={direction}
                        variants={slideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="absolute inset-0 w-full h-full cursor-pointer"
                        onClick={() => setIsLightboxOpen(true)}
                    >
                        <Image
                            src={images[currentIndex]}
                            alt={`${title} screenshot ${currentIndex + 1}`}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                            className="object-cover"
                            priority={currentIndex === 0}
                            quality={85}
                        />
                    </motion.div>
                </AnimatePresence>

                {/* Counter badge */}
                <div className="absolute top-4 left-4 z-20 bg-black/70 backdrop-blur-md text-white text-xs font-mono px-3 py-1.5 border border-white/10 rounded-none flex items-center gap-2 select-none">
                    <span className="text-brand-400 font-bold">{currentIndex + 1}</span>
                    <span className="text-zinc-400">/</span>
                    <span className="text-zinc-300">{images.length}</span>
                </div>

                {/* Lightbox Trigger Button */}
                <button
                    onClick={() => setIsLightboxOpen(true)}
                    className="absolute top-4 right-4 z-20 bg-black/60 hover:bg-brand-600 backdrop-blur-md text-white p-2 border border-white/10 opacity-0 group-hover:opacity-100 transition-all duration-300"
                    title="View fullscreen"
                    aria-label="View fullscreen"
                >
                    <Maximize2 className="w-4 h-4" />
                </button>

                {/* Previous / Next Arrows */}
                <button
                    onClick={(e) => {
                        e.stopPropagation()
                        handlePrev()
                    }}
                    className="absolute left-3 top-1/2 -translate-y-1/2 z-20 bg-black/60 hover:bg-brand-600 backdrop-blur-md text-white p-2.5 border border-white/10 transition-all duration-300 hover:scale-110 active:scale-95"
                    aria-label="Previous image"
                >
                    <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                    onClick={(e) => {
                        e.stopPropagation()
                        handleNext()
                    }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 z-20 bg-black/60 hover:bg-brand-600 backdrop-blur-md text-white p-2.5 border border-white/10 transition-all duration-300 hover:scale-110 active:scale-95"
                    aria-label="Next image"
                >
                    <ChevronRight className="w-5 h-5" />
                </button>
            </div>

            {/* Thumbnail Navigation Strip */}
            <div className="grid grid-cols-6 gap-2 sm:gap-3">
                {images.map((img, idx) => {
                    const isActive = idx === currentIndex
                    return (
                        <button
                            key={idx}
                            onClick={() => handleSelect(idx)}
                            className={`relative aspect-video w-full overflow-hidden border transition-all duration-300 ${
                                isActive
                                    ? "border-brand-500 ring-2 ring-brand-500/50 scale-[1.02] opacity-100 shadow-md"
                                    : "border-border opacity-60 hover:opacity-100 hover:border-zinc-400"
                            }`}
                        >
                            <Image
                                src={img}
                                alt={`Thumbnail ${idx + 1}`}
                                fill
                                sizes="16vw"
                                className="object-cover"
                            />
                            {isActive && (
                                <div className="absolute inset-0 bg-brand-500/10 pointer-events-none" />
                            )}
                        </button>
                    )
                })}
            </div>

            {/* Lightbox Modal */}
            <AnimatePresence>
                {isLightboxOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 bg-black/90 backdrop-blur-lg flex items-center justify-center p-4 md:p-8"
                        onClick={() => setIsLightboxOpen(false)}
                    >
                        {/* Close button */}
                        <button
                            onClick={() => setIsLightboxOpen(false)}
                            className="absolute top-6 right-6 z-50 text-zinc-400 hover:text-white bg-zinc-900/80 p-2.5 border border-zinc-800 transition-colors"
                            aria-label="Close fullscreen"
                        >
                            <X className="w-6 h-6" />
                        </button>

                        {/* Lightbox Main Image */}
                        <div
                            className="relative max-w-6xl w-full aspect-video max-h-[85vh]"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <Image
                                src={images[currentIndex]}
                                alt={`${title} fullscreen screenshot ${currentIndex + 1}`}
                                fill
                                sizes="100vw"
                                className="object-contain"
                                quality={95}
                            />

                            {/* Lightbox Arrows */}
                            <button
                                onClick={handlePrev}
                                className="absolute -left-4 sm:left-4 top-1/2 -translate-y-1/2 bg-black/70 hover:bg-brand-600 text-white p-3 border border-white/10 transition-all"
                                aria-label="Previous image"
                            >
                                <ChevronLeft className="w-6 h-6" />
                            </button>
                            <button
                                onClick={handleNext}
                                className="absolute -right-4 sm:right-4 top-1/2 -translate-y-1/2 bg-black/70 hover:bg-brand-600 text-white p-3 border border-white/10 transition-all"
                                aria-label="Next image"
                            >
                                <ChevronRight className="w-6 h-6" />
                            </button>

                            {/* Lightbox Counter */}
                            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/80 text-white text-xs font-mono px-4 py-2 border border-white/10">
                                {currentIndex + 1} / {images.length}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
