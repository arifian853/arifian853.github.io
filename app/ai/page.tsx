import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { AIContent } from "./AIContent";

export const metadata = {
  title: "Arifian.dev - Elara AI Assistant",
  description: "Elara - Arifian's personal AI assistant powered by Hybrid RAG (Gemini Embeddings 2 + Supabase pgvector), Gemma 4 26B Reranker, and Groq GPT-OSS 120B.",
  openGraph: {
    title: "Arifian.dev - Elara AI Assistant",
    description: "Elara - Arifian's personal AI assistant powered by Hybrid RAG (Gemini Embeddings 2 + Supabase pgvector), Gemma 4 26B Reranker, and Groq GPT-OSS 120B.",
  },
}

export default function AI() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <AIContent />
      <Footer />
    </div>
  );
}
