import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { projects, getProjectById } from "@/lib/data/projects";
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
            title: "Project Not Found - Arifian.dev",
        };
    }

    return {
        title: `${project.title} - Arifian.dev`,
        description: project.description.slice(0, 160),
        openGraph: {
            title: `${project.title} - Arifian.dev`,
            description: project.description.slice(0, 160),
        },
    };
}

export default async function ProjectDetails({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const project = getProjectById(parseInt(id));

    if (!project) {
        notFound();
    }

    return (
        <div className="min-h-screen">
            <Navbar />
            <ProjectDetailContent project={project} />
            <Footer />
        </div>
    );
}
