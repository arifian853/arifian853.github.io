"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CopyMarkdownButtonProps {
  rawMarkdown: string;
}

export function CopyMarkdownButton({ rawMarkdown }: CopyMarkdownButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(rawMarkdown);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy markdown: ", err);
    }
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleCopy}
      className="rounded-none border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-brand-500 gap-2 h-9 cursor-pointer"
    >
      {copied ? (
        <>
          <Check className="w-4.5 h-4.5 text-brand-500" />
          <span>Copied!</span>
        </>
      ) : (
        <>
          <Copy className="w-4.5 h-4.5" />
          <span>Copy as .md</span>
        </>
      )}
    </Button>
  );
}
