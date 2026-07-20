import { notFound } from "next/navigation";
import { PROJECTS, getProjectBySlug } from "@/modules/projects/data/project";
import ProjectDetail from "@/modules/projects/components/ProjectDetail";

interface PageProps {
    params: Promise<{ slug: string; locale: string }>;
}

export function generateStaticParams() {
    return PROJECTS.map((p) => ({ slug: p.slug }));
}

export default async function ProjectDetailPage({ params }: PageProps) {
    const { slug } = await params;
    const project = getProjectBySlug(slug);

    if (!project) {
        notFound();
    }

    return <ProjectDetail project={project} />;
}