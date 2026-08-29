

"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

const CAT_MEMES = [
  "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExcTFwZjY2enRwMGF6eGVkNXV5ZzB4eHN5NmRiZHJtMDI2YWVwYzh0NyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/1OrIIOIcRTDaNidc5p/giphy.gif",
  "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExaWR4b2V4cmE1dW5ic2UycTF3YmVqMzJidHRyaXBoejBvMDA4N3B5ZSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/wr7oA0rSjnWuiLJOY5/giphy.gif",
  "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExZThsdTN1cDFrb25rd3R4NGpkcTNvaWo4cWJqeThxdzRxNjBndW4wZyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/Zl7u48zLVFgLpRwq6f/giphy.gif",
  "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExdm1iYnJmdm82cTc5ODQxbnZic2IyeXpwZzMwMndramRqbGlyenB2NSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/ASvQ3A2Q7blzq/giphy.gif",
  "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExYnp5c2E4ZHp1cnBybnh2cWdtZXFxcmNvdzRsaWI1enZzdndocW02ZiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/jfKiMjWolBzuWkdbw0/giphy.gif",
  "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExYzlkN3ZrcWpzNnRwMTduZmN4YjR4dGRyZ3llbG5jbThoYjgwZGh3ZCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/P1wkYq6EZPWfNMLmEJ/giphy.gif",
  "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExM2ZucXZjMmlvZTdqaWlsaGJyODZmZDl4ZWV3eXkycXJ4MzVxZWJtayZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/MDJ9IbxxvDUQM/giphy.gif",
  "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExZHIwbmI2YjZoeGxrcHhlNzVtdTdwenY3MHM1MjZpaWEya2ZodzQ0ZyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/kqRb2OuD8OskE/giphy.gif",
  "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExZzYxbnJ4c2Z2eWsyY3dzYXpoZnh2NWF4bHJtYXk5NHByaXJoeXdxcyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/nR4L10XlJcSeQ/giphy.gif",
  "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExczFlc3lucW1zM295czlqMDdhbHc1ZGNranVvM2loZ296ZWVxMjFteCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/ufFCIpCX558dwvejkn/giphy.gif",
  "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExaHZ5OW96dDAwMG1zcDExaGpzMzBob2NrYzY2MGt4dWs3a2sxZzg0OSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/iXbnkZTxCo4t8l8mxK/giphy.gif",
  "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExbHh1amx3NHd2bnV4ZnpoNHgxMzZuOHJxMHlpdHcxM2h0cWFwZG5lZCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/D10MRUuHblyFfRzQiQ/giphy.gif",
  "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExbTljYTUxOHdjZ210NWlmMjRkaWg1ZzR2N2VwbGpraG5qcW96MjB2YSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/pY8jLmZw0ElqvVeRH4/giphy.gif",
  "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExbzV1ZWhzaGdrZDkwaTQ3anR1dzliY3ExNTNhajRtdjVmM3NxN2hvMiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/cbm0J4DEIqKHsKxYHA/giphy.gif",
  "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExbjZjcmQ0emg3cXk1b2tkanA1Nm82NHY4MWh3ZGs0ODkwc2VudnByMCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/y4nk5bgwpWL6T5Ax9y/giphy.gif"
]

export const Footer = () => {
  const [randomMeme, setRandomMeme] = useState<string | null>(null)

  // Choose a random meme once per mount
  useEffect(() => {
    const id = requestAnimationFrame(() => {
      const randomIndex = Math.floor(Math.random() * CAT_MEMES.length)
      setRandomMeme(CAT_MEMES[randomIndex])
    })
    return () => cancelAnimationFrame(id)
  }, [])

  return (
    <footer className="w-full mt-auto z-10 bg-background transition-colors duration-300">
      {/* High-contrast Dashed Border */}
      <div className="w-full border-t border-dashed border-foreground/30 dark:border-foreground/45" />

      {/* Main Footer Content */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex flex-col items-center text-center gap-1">
          <p className="text-sm font-heading font-medium">
            Arifian S., {new Date().getFullYear()}. Made with{" "}
            <span className="text-brand-500 font-semibold hover:underline">Next.js</span>
          </p>
          <span className="text-xs text-muted-foreground font-heading">
            50% human-crafted, 50% vibe-coded.
          </span>
        </div>
      </div>

      {/* Cat Meme Section below footer */}
      {randomMeme && (
        <div className="w-full border-t border-dashed border-foreground/20 dark:border-foreground/30 py-6 bg-secondary/15 flex flex-col items-center justify-center gap-2">
          {/* Retro CRT TV frame */}
          <div className="relative group overflow-hidden border-2 border-foreground bg-zinc-950 p-1 w-36 h-28 shadow-sm">
            <Image
              src={randomMeme}
              alt="Random Cat Meme"
              width={144}
              height={112}
              unoptimized
              className="w-full h-full object-cover"
            />
            {/* Scanlines / CRT overlay effect */}
            <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.12)_50%)] bg-[size:100%_4px] opacity-40" />
          </div>
        </div>
      )}
    </footer>
  )
}
