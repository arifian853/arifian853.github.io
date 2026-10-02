import { pageMetadata } from "@/lib/seo";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { AIContent } from "./AIContent";

export const metadata = pageMetadata("Elara AI Assistant", "Chat with Elara, Arifian Saputra's AI assistant powered by Hybrid RAG, Gemini Embeddings 2, Supabase pgvector, Gemma 4 26B reranking, and Groq GPT-OSS 120B.", "/ai");

export default function AI() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main id="main-content">
        <AIContent />
      </main>
      <Footer />
    </div>
  );
}
