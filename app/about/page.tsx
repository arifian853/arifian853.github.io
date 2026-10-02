import { pageMetadata } from "@/lib/seo";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { AboutContent } from "./AboutContent";

export const metadata = pageMetadata("About", "Learn about Arifian Saputra, an AI Technical Mentor and full stack developer based in Batam, Indonesia. Explore his experience, skills, and services.", "/about");

export default function About() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main id="main-content">
        <AboutContent />
      </main>
      <Footer />
    </div>
  );
}
