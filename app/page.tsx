import dynamic from "next/dynamic";
import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/app/_home_components/Hero";

// Dynamic imports for below-the-fold components to reduce initial JS bundle
const About = dynamic(() => import("@/app/_home_components/About").then(mod => mod.About), {
  loading: () => <div className="min-h-screen" />,
});

const FeaturedProjects = dynamic(() => import("./_home_components/FeaturedProjects").then(mod => mod.FeaturedProjects), {
  loading: () => <div className="min-h-screen" />,
});

const Experiences = dynamic(() => import("./_home_components/Experiences").then(mod => mod.Experiences), {
  loading: () => <div className="min-h-screen" />,
});

const ContactCTA = dynamic(() => import("./_home_components/ContactCTA").then(mod => mod.ContactCTA), {
  loading: () => <div className="py-20" />,
});

const Footer = dynamic(() => import("@/components/layout/Footer").then(mod => mod.Footer), {
  loading: () => <div className="h-20" />,
});

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
      <ContactCTA />
      <Footer />
    </div>
  );
}
