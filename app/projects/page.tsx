import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
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
