import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { MessageContent } from "./MessageContent";

export const metadata = {
  title: "Arifian.dev - Message",
  description: "Send an anonymous message to Arifian",
  openGraph: {
    title: "Arifian.dev - Message",
    description: "Send an anonymous message to Arifian",
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
