import { pageMetadata } from "@/lib/seo";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { ProjectContent } from "./ProjectContent";

export const metadata = pageMetadata("Projects", "Explore AI, machine learning, and full stack web projects by Arifian Saputra, with screenshots, technical details, and the technology behind each project.", "/projects");

export default function Project() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main id="main-content">
        <ProjectContent />
      </main>
      <Footer />
    </div>
  );
}
