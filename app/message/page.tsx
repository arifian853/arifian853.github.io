import { pageMetadata } from "@/lib/seo";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { MessageContent } from "./MessageContent";

export const metadata = pageMetadata("Anonymous Messages", "Leave an anonymous message for Arifian Saputra. Share your thoughts, feedback, or a friendly greeting on the public message board.", "/message");

export default function Message() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main id="main-content">
        <MessageContent />
      </main>
      <Footer />
    </div>
  );
}
