import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { AIContent } from "./AIContent";

export const metadata = {
  title: "Arifian.dev - AI",
  description: "Arifian.AI - Arifian's personal AI assistant powered by RAG technology and GPT-OSS 20B.",
  openGraph: {
    title: "Arifian.dev - AI",
    description: "Arifian.AI - Arifian's personal AI assistant powered by RAG technology and GPT-OSS 20B.",
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
