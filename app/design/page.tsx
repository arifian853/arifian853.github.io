import fs from "fs";
import path from "path";
import Link from "next/link";
import { ArrowLeft, FileText } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { CopyMarkdownButton } from "./CopyMarkdownButton";

const inclusiveSansMono = "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace";

function parseInline(text: string): React.ReactNode[] {
  const regex = /(\*\*[^*]+\*\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/g;
  const parts = text.split(regex);
  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      const boldText = part.slice(2, -2);
      if (boldText.includes('`')) {
        const subParts = boldText.split(/(`[^`]+`)/g);
        return (
          <strong key={index} className="font-bold text-foreground">
            {subParts.map((sub, subIdx) => {
              if (sub.startsWith('`') && sub.endsWith('`')) {
                return (
                  <code key={subIdx} className="text-xs bg-zinc-200 dark:bg-zinc-800 px-1 py-0.5 font-mono border border-zinc-300/40 dark:border-zinc-700 text-brand-500">
                    {sub.slice(1, -1)}
                  </code>
                );
              }
              return sub;
            })}
          </strong>
        );
      }
      return <strong key={index} className="font-bold text-foreground">{boldText}</strong>;
    }
    if (part.startsWith('`') && part.endsWith('`')) {
      return (
        <code key={index} className="text-xs bg-zinc-200 dark:bg-zinc-800 px-1.5 py-0.5 font-mono border border-zinc-300/40 dark:border-zinc-700 text-brand-500">
          {part.slice(1, -1)}
        </code>
      );
    }
    if (part.startsWith('[') && part.includes('](')) {
      const closeBracket = part.indexOf(']');
      const linkText = part.slice(1, closeBracket);
      const linkUrl = part.slice(closeBracket + 2, -1);
      return (
        <a key={index} href={linkUrl} target="_blank" rel="noopener noreferrer" className="text-brand-500 hover:underline font-medium">
          {linkText}
        </a>
      );
    }
    
    // Auto-detect and render color swatches for Hex colors in text/tables
    const trimmed = part.trim();
    if (/^#[A-Fa-f0-9]{6}$/.test(trimmed)) {
      return (
        <span key={index} className="inline-flex items-center gap-1.5 font-mono select-all">
          <span className="w-3.5 h-3.5 border border-zinc-300 dark:border-zinc-700 inline-block shrink-0 shadow-sm" style={{ backgroundColor: trimmed }} />
          <span>{part}</span>
        </span>
      );
    }

    return part;
  });
}

function parseMarkdown(md: string) {
  const lines = md.split('\n');
  const elements: React.ReactNode[] = [];
  let i = 0;

  const flushList = (listItems: React.ReactNode[], key: number) => {
    return (
      <ul key={`list-${key}`} className="list-disc pl-6 space-y-2 mb-6 text-zinc-700 dark:text-zinc-300 text-sm md:text-base leading-relaxed">
        {listItems}
      </ul>
    );
  };

  const flushTable = (headers: string[], rows: string[][], key: number) => {
    return (
      <div key={`table-container-${key}`} className="overflow-x-auto mb-8 border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950/20">
        <table className="w-full text-left text-sm border-collapse">
          <thead>
            <tr className="bg-zinc-100/80 dark:bg-zinc-900/60 border-b border-zinc-200 dark:border-zinc-800">
              {headers.map((h, i) => (
                <th key={i} className="p-3.5 font-heading font-bold uppercase text-[10px] md:text-xs tracking-wider text-zinc-500 dark:text-zinc-400">
                  {parseInline(h)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i} className="border-b border-zinc-200 dark:border-zinc-800 hover:bg-zinc-200/20 dark:hover:bg-zinc-800/10 transition-colors">
                {row.map((cell, j) => (
                  <td key={j} className="p-3.5 text-zinc-700 dark:text-zinc-300 text-xs md:text-sm">
                    {parseInline(cell)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  while (i < lines.length) {
    const line = lines[i].trim();

    if (!line) {
      i++;
      continue;
    }

    // Unordered List parsing
    if (line.startsWith('* ') || line.startsWith('- ')) {
      const listItems: React.ReactNode[] = [];
      let listKey = i;
      while (i < lines.length && (lines[i].trim().startsWith('* ') || lines[i].trim().startsWith('- '))) {
        const itemLine = lines[i].trim();
        listItems.push(
          <li key={i} className="pl-1">
            {parseInline(itemLine.slice(2))}
          </li>
        );
        i++;
      }
      elements.push(flushList(listItems, listKey));
      continue;
    }

    // Table parsing
    if (line.startsWith('|')) {
      let tableKey = i;
      let headers: string[] = [];
      let rows: string[][] = [];
      
      while (i < lines.length && lines[i].trim().startsWith('|')) {
        const tableLine = lines[i].trim();
        const parts = tableLine
          .split('|')
          .map(s => s.trim())
          .filter((_, idx, arr) => idx > 0 && idx < arr.length - 1);
        
        // Skip header visual separator (e.g. | :--- | :--- |)
        if (parts.every(p => p.startsWith(':') || p.startsWith('-') || p.endsWith('-'))) {
          i++;
          continue;
        }

        if (headers.length === 0) {
          headers = parts;
        } else {
          rows.push(parts);
        }
        i++;
      }
      elements.push(flushTable(headers, rows, tableKey));
      continue;
    }

    // Headings & Horizontal rules & Paragraphs
    if (line.startsWith('# ')) {
      elements.push(
        <h1 key={i} className="text-3xl md:text-4xl font-bold font-heading mb-6 border-b-2 border-foreground pb-4 mt-4 text-foreground flex items-center gap-3">
          <FileText className="w-7 h-7 text-brand-500 shrink-0" />
          <span>{parseInline(line.slice(2))}</span>
        </h1>
      );
    } else if (line.startsWith('## ')) {
      elements.push(
        <h2 key={i} className="text-xl md:text-2xl font-bold font-heading mt-10 mb-5 text-foreground border-l-4 border-brand-500 pl-3">
          {parseInline(line.slice(3))}
        </h2>
      );
    } else if (line.startsWith('### ')) {
      elements.push(
        <h3 key={i} className="text-sm md:text-base font-bold font-heading mt-8 mb-4 text-brand-500 uppercase tracking-wider">
          {parseInline(line.slice(4))}
        </h3>
      );
    } else if (line.startsWith('---')) {
      elements.push(
        <hr key={i} className="my-10 border-t border-dashed border-foreground/25 dark:border-foreground/35" />
      );
    } else {
      elements.push(
        <p key={i} className="mb-4 text-zinc-700 dark:text-zinc-300 leading-relaxed text-sm md:text-base">
          {parseInline(line)}
        </p>
      );
    }
    i++;
  }

  return elements;
}

export const metadata = {
  title: "Arifian.dev - Design System",
  description: "Explore the design philosophy, color system, typography, and animation choices behind arifian.dev.",
  openGraph: {
    title: "Arifian.dev - Design System",
    description: "Explore the design philosophy, color system, typography, and animation choices behind arifian.dev.",
  },
};

export default function DesignPage() {
  const filePath = path.join(process.cwd(), "DESIGN.md");
  const content = fs.readFileSync(filePath, "utf8");
  const parsedContent = parseMarkdown(content);

  return (
    <div className="min-h-screen flex flex-col bg-background selection:bg-brand-500/25">
      <Navbar />
      
      <main className="flex-1 w-full max-w-4xl mx-auto px-4 sm:px-6 py-24">
        {/* Navigation & Actions */}
        <div className="flex justify-between items-center mb-8 gap-4">
          <Link href="/about">
            <Button variant="outline" size="sm" className="rounded-none border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-brand-500">
              <ArrowLeft className="w-4 h-4 mr-2" /> Back to About
            </Button>
          </Link>
          <CopyMarkdownButton rawMarkdown={content} />
        </div>
        
        {/* Rendered Document Box */}
        <div className="bg-card border border-zinc-200 dark:border-zinc-800 p-6 sm:p-12 shadow-sm rounded-none">
          <div className="prose dark:prose-invert max-w-none">
            {parsedContent}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
