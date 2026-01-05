import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/app/_home_components/Hero";
import { About } from "@/app/_home_components/About";
import { FeaturedProjects } from "./_home_components/FeaturedProjects";
import { Experiences } from "./_home_components/Experiences";

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
    <div className="relative min-h-screen flex flex-col">
      {/* Grid Background Pattern - Global */}
      <div
        className="fixed inset-0 top-16 opacity-[0.08] dark:opacity-[0.12] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, currentColor 1px, transparent 1px),
            linear-gradient(to bottom, currentColor 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />

      <Navbar />
      <Hero />
      <About />
      <FeaturedProjects />
      <Experiences />
      <Footer />
    </div>
  );
}
