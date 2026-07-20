"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
    ArrowLeft,
    Github,
    ExternalLink,
    Sparkles,
    Wrench,
    Milestone,
    AlertTriangle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { Project } from "../type";

const STATUS_CONFIG = {
    live: { label: "Live", className: "bg-emerald-500 text-white" },
    development: { label: "In Progress", className: "bg-amber-500 text-white" },
    archived: { label: "Archived", className: "bg-zinc-500 text-white" },
};

function SectionTitle({ icon: Icon, children }: { icon: typeof Sparkles; children: React.ReactNode }) {
    return (
        <div className="mb-4 flex items-center gap-2">
            <Icon size={18} className="text-emerald-600 dark:text-emerald-400" />
            <h2 className="text-lg font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
                {children}
            </h2>
        </div>
    );
}

export default function ProjectDetail({ project }: { project: Project }) {
    const hasDetail =
        project.detail.problem ||
        project.detail.solution ||
        project.detail.keyFeatures.length > 0;

    return (
        <div className="mx-auto max-w-3xl space-y-10 pb-16">
            <Link
                href="/projects"
                className="inline-flex items-center gap-1.5 text-sm text-zinc-400 transition-colors hover:text-zinc-700 dark:hover:text-zinc-300"
            >
                <ArrowLeft size={14} />
                Back to projects
            </Link>

            {/* Hero */}
            <div className="overflow-hidden rounded-[28px] bg-zinc-50 dark:bg-zinc-900/60">
                <div className="relative h-56 w-full bg-emerald-50 dark:bg-emerald-950/30 sm:h-72">
                    <Image src={project.thumbnail} alt={project.title} fill className="object-cover" />
                </div>
                <div className="p-6 sm:p-8">
                    <span
                        className={cn(
                            "inline-block rounded-full px-2.5 py-0.5 text-xs font-medium",
                            STATUS_CONFIG[project.status].className
                        )}
                    >
                        {STATUS_CONFIG[project.status].label}
                    </span>

                    <h1 className="mt-3 text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-3xl">
                        {project.title}
                    </h1>
                    <p className="mt-1 text-sm text-zinc-400 dark:text-zinc-500">
                        {project.category} · {project.year}
                    </p>
                    <p className="mt-4 max-w-xl text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                        {project.description}
                    </p>

                    <div className="mt-5 flex flex-wrap gap-1.5">
                        {project.techStack.map((tech) => (
                            <span
                                key={tech}
                                className="rounded-full bg-zinc-100 px-2.5 py-0.5 text-xs text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400"
                            >
                                {tech}
                            </span>
                        ))}
                    </div>

                    <div className="mt-6 flex items-center gap-4">
                        {project.githubUrl && (
                            <a
                                href={project.githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 rounded-full bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
                            >
                                <Github size={16} />
                                Source code
                            </a>
                        )}
                        {project.liveUrl && (
                            <a
                                href={project.liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 rounded-full border border-zinc-200 px-4 py-2 text-sm font-medium text-zinc-700 transition-colors hover:border-zinc-300 dark:border-zinc-700 dark:text-zinc-300 dark:hover:border-zinc-600"
                            >
                                <ExternalLink size={16} />
                                Live demo
                            </a>
                        )}
                    </div>
                </div>
            </div>

            {!hasDetail && (
                <p className="rounded-2xl bg-zinc-50 p-6 text-sm text-zinc-400 dark:bg-zinc-900/60 dark:text-zinc-500">
                    Detail sections for this project haven't been written yet — fill in{" "}
                    <code className="rounded bg-zinc-100 px-1 py-0.5 dark:bg-zinc-800">
                        detail
                    </code>{" "}
                    in <code className="rounded bg-zinc-100 px-1 py-0.5 dark:bg-zinc-800">data/projects.ts</code> for
                    this project.
                </p>
            )}

            {/* Problem & solution */}
            {(project.detail.problem || project.detail.solution) && (
                <section className="grid gap-6 sm:grid-cols-2">
                    {project.detail.problem && (
                        <div>
                            <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide text-zinc-400 dark:text-zinc-500">
                                Problem
                            </h2>
                            <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                                {project.detail.problem}
                            </p>
                        </div>
                    )}
                    {project.detail.solution && (
                        <div>
                            <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide text-zinc-400 dark:text-zinc-500">
                                Solution
                            </h2>
                            <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                                {project.detail.solution}
                            </p>
                        </div>
                    )}
                </section>
            )}

            {/* Gallery */}
            {project.detail.gallery.length > 0 && (
                <section>
                    <SectionTitle icon={Sparkles}>Gallery</SectionTitle>
                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                        {project.detail.gallery.map((src) => (
                            <motion.div
                                key={src}
                                whileHover={{ scale: 1.03 }}
                                className="relative aspect-video overflow-hidden rounded-2xl bg-zinc-100 dark:bg-zinc-800"
                            >
                                <Image src={src} alt="" fill className="object-cover" />
                            </motion.div>
                        ))}
                    </div>
                </section>
            )}

            {/* Key features */}
            {project.detail.keyFeatures.length > 0 && (
                <section>
                    <SectionTitle icon={Sparkles}>Key features</SectionTitle>
                    <div className="grid gap-3 sm:grid-cols-2">
                        {project.detail.keyFeatures.map((f) => (
                            <div key={f.title} className="rounded-2xl bg-zinc-50 p-4 dark:bg-zinc-900/60">
                                <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{f.title}</p>
                                <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">{f.description}</p>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Tech decisions */}
            {project.detail.techDecisions.length > 0 && (
                <section>
                    <SectionTitle icon={Wrench}>Tech decisions</SectionTitle>
                    <div className="space-y-4">
                        {project.detail.techDecisions.map((d) => (
                            <div key={d.title} className="border-l-2 border-emerald-500/40 pl-4">
                                <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{d.title}</p>
                                <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">{d.description}</p>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Timeline */}
            {project.detail.timeline.length > 0 && (
                <section>
                    <SectionTitle icon={Milestone}>Timeline</SectionTitle>
                    <div className="space-y-4">
                        {project.detail.timeline.map((t, i) => (
                            <div key={t.phase} className="flex gap-4">
                                <div className="flex flex-col items-center">
                                    <div className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                                    {i < project.detail.timeline.length - 1 && (
                                        <div className="mt-1 w-px flex-1 bg-zinc-200 dark:bg-zinc-800" />
                                    )}
                                </div>
                                <div className="-mt-1 pb-4">
                                    <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{t.phase}</p>
                                    <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">{t.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Challenges */}
            {project.detail.challenges.length > 0 && (
                <section>
                    <SectionTitle icon={AlertTriangle}>Challenges & learnings</SectionTitle>
                    <div className="space-y-4">
                        {project.detail.challenges.map((c) => (
                            <div key={c.title} className="rounded-2xl bg-zinc-50 p-4 dark:bg-zinc-900/60">
                                <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{c.title}</p>
                                <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">{c.description}</p>
                            </div>
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
}