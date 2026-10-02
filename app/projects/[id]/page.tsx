import { pageMetadata } from "@/lib/seo";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { projects, getProjectById, Project } from "@/lib/data/projects";
import { notFound } from "next/navigation";
import { ProjectDetailContent } from "./ProjectDetailContent";

// Generate static params for all projects
export async function generateStaticParams() {
    return projects.map((project) => ({
        id: project.id.toString(),
    }));
}

// Generate metadata for each project
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const project = getProjectById(parseInt(id));

    if (!project) {
        return {
            title: "Project Not Found",
            robots: { index: false, follow: true },
        };
    }

    const description = project.description.replace(/\*\*/g, "").replace(/\s+/g, " ").trim().slice(0, 160);
    return pageMetadata(project.title, description, `/projects/${project.id}`);

}

// Get random projects excluding current one
function getRandomProjects(currentId: number, count: number): Project[] {
    const otherProjects = projects.filter(p => p.id !== currentId);
    const shuffled = [...otherProjects].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
}

export default async function ProjectDetails({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const project = getProjectById(parseInt(id));

    if (!project) {
        notFound();
    }

    const randomProjects = getRandomProjects(project.id, 3);

    return (
        <div className="min-h-screen">
            <Navbar />
            <main id="main-content">
                <ProjectDetailContent project={project} exploreProjects={randomProjects} />
            </main>
            <Footer />
        </div>
    );
}

