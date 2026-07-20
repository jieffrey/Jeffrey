import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { BsGithub, BsGlobe } from "react-icons/bs";
import { cn } from "@/lib/utils";
import type { Project } from "../type";

const STATUS_CONFIG = {
    live: { label: "Live", className: "bg-emerald-500 text-white" },
    development: { label: "In Progress", className: "bg-amber-500 text-white" },
    archived: { label: "Archived", className: "bg-zinc-500 text-white" },
};

interface ProjectCardProps {
    project: Project;
    index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ delay: 0.05 * index, duration: 0.25 }}
            className="group overflow-hidden rounded-[20px] bg-zinc-50 transition-all duration-300 hover:-translate-y-1 dark:bg-zinc-900/60"
        >
            <Link href={`/projects/${project.slug}`}>
                <div className="relative h-32 w-full overflow-hidden bg-emerald-50 dark:bg-emerald-950/30">
                    <Image
                        src={project.thumbnail}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                </div>

                <div className="p-4">
                    <span
                        className={cn(
                            "inline-block rounded-full px-2.5 py-0.5 text-xs font-medium",
                            STATUS_CONFIG[project.status].className
                        )}
                    >
                        {STATUS_CONFIG[project.status].label}
                    </span>

                    <p className="mt-2.5 text-base font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
                        {project.title}
                    </p>
                    <p className="mt-0.5 text-xs text-zinc-400 dark:text-zinc-500">
                        {project.category} · {project.year}
                    </p>

                    <div className="mt-3 flex flex-wrap gap-1.5">
                        {project.techStack.slice(0, 3).map((tech) => (
                            <span
                                key={tech}
                                className="rounded-full bg-zinc-100 px-2 py-0.5 text-xs text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400"
                            >
                                {tech}
                            </span>
                        ))}
                    </div>
                </div>
            </Link>

            <div className="flex items-center gap-3 border-t border-zinc-200/70 px-4 py-2.5 dark:border-zinc-700/40">
                {project.githubUrl && (
                    <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="flex items-center gap-1.5 text-xs text-zinc-400 transition-colors hover:text-zinc-700 dark:hover:text-zinc-300"
                    >
                        <BsGithub size={12} />
                        Source
                    </a>
                )}
                {project.liveUrl && (
                    <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="flex items-center gap-1.5 text-xs text-zinc-400 transition-colors hover:text-zinc-700 dark:hover:text-zinc-300"
                    >
                        <BsGlobe size={12} />
                        Live
                    </a>
                )}
            </div>
        </motion.div>
    );
}