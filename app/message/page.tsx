import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { MessageContent } from "./MessageContent";

export const metadata = {
  title: "Arifian.dev - Message",
  description: "Arifian's Portfolio Site - Message",
  openGraph: {
    title: "Arifian.dev - Message",
    description: "Arifian's Portfolio Site - Message",
  },
}

export default function Message() {
  return (
    <div className="min-h-screen">
          <Navbar />
          <MessageContent />
          <Footer />
        </div>
  );
}
