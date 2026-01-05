import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { AboutContent } from "./AboutContent";

export const metadata = {
  title: "Arifian.dev - About",
  description: "Arifian's Portfolio Site - About",
  openGraph: {
    title: "Arifian.dev - About",
    description: "Arifian's Portfolio Site - About",
  },
}

export default function About() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <AboutContent />
      <Footer />
    </div>
  );
}
