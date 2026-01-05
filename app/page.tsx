import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/app/_home_components/Hero";
import { About } from "@/app/_home_components/About";

export const metadata = {
  title: "Arifian.dev",
  description: "Arifian's Portfolio Site",
  openGraph: {
    title: "Arifian.dev",
    description: "Arifian's Portfolio Site",
  },
}

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <Hero />
      <About />
      <Footer />
    </div>
  );
}
