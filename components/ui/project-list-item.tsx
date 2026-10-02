import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import type { Project } from "@/lib/data/projects"
import { ProjectIcon } from "@/components/ui/project-icon"

export function ProjectListItem({ project }: { project: Project }) {
    const description = project.description.replace(/\*\*(.*?)\*\*/g, "$1")

    return (
        <Link
            href={`/projects/${project.id}`}
            className="group grid grid-cols-[2rem_minmax(0,1fr)_1rem] items-center gap-x-3 border-b border-border py-6 transition-colors duration-300 hover:bg-secondary/15 hover:border-brand-500 dark:hover:border-brand-500 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-500 md:grid-cols-[3rem_minmax(0,1fr)_auto_1rem] md:gap-x-6"
        >
            <span className="font-heading text-lg font-bold tabular-nums text-brand-700 dark:text-brand-400 md:text-xl">
                {project.id.toString().padStart(2, "0")}
            </span>

            <div className="min-w-0">
                <h3 className="font-heading text-base font-semibold leading-snug text-foreground transition-colors duration-300 group-hover:text-brand-700 group-focus-visible:text-brand-700 dark:group-hover:text-brand-400 dark:group-focus-visible:text-brand-400 md:text-xl lg:text-2xl">
                    {project.title}
                </h3>
                <p className="mt-2 truncate text-sm leading-relaxed text-muted-foreground">
                    {description}
                </p>

                <ul aria-label="Tech stack" className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-2 text-xs font-medium text-brand-700 dark:text-brand-400 sm:gap-x-3 sm:text-sm">
                    {project.tags.map((tag, index) => (
                        <li key={`${tag.iconName}-${tag.name}`} className="flex items-center gap-2 sm:gap-3">
                            {index > 0 && <span aria-hidden="true" className="font-normal text-muted-foreground/50">/</span>}
                            <span className="inline-flex items-center gap-1.5">
                                <ProjectIcon iconName={tag.iconName} className="size-3.5 shrink-0 sm:size-4" />
                                <span>{tag.name}</span>
                            </span>
                        </li>
                    ))}
                </ul>

                <span className="mt-3 block font-mono text-xs text-muted-foreground md:hidden">{project.year}</span>
            </div>

            <span className="hidden font-mono text-sm text-muted-foreground md:block">{project.year}</span>
            <ArrowUpRight aria-hidden="true" className="size-4 text-brand-700 transition-transform duration-300 motion-safe:group-hover:-translate-y-0.5 motion-safe:group-hover:translate-x-0.5 dark:text-brand-400" />
        </Link>
    )
}
