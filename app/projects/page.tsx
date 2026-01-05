import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { ProjectContent } from "./ProjectContent";

export const metadata = {
  title: "Arifian.dev - Project",
  description: "Arifian's Portfolio Site - Project",
  openGraph: {
    title: "Arifian.dev - Project",
    description: "Arifian's Portfolio Site - Project",
  },
}

export default function Project() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <ProjectContent />
      <Footer />
    </div>
  );
}
