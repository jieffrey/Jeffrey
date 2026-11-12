import { JSX } from "react";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiJavascript,
  SiTailwindcss,
  SiNodedotjs,
  SiExpress,
  SiSupabase,
  SiPostgresql,
  SiMysql,
  SiFlutter,
  SiFigma,
  SiGit,
  SiDocker,
  SiFirebase,
  SiPrisma,
  SiMongodb,
  SiGo
} from "react-icons/si";
import { TbBrandReactNative } from "react-icons/tb";

export type StackCategory = "Utama" | "Frontend" | "Backend" | "Mobile" | "Database" | "Tools";

export type SkillProps = {
  name: string;
  icon: JSX.Element;
  background: string;
  color: string;
  category: StackCategory[];
};

const iconSize = 18;

export const STACKS: SkillProps[] = [
  {
    name: "React",
    icon: <SiReact size={iconSize} />,
    background: "bg-cyan-400/10",
    color: "text-cyan-500",
    category: ["Utama", "Frontend"],
  },
  {
    name: "Next.js",
    icon: <SiNextdotjs size={iconSize} />,
    background: "bg-neutral-400/10",
    color: "text-neutral-700 dark:text-neutral-300",
    category: ["Utama", "Frontend"],
  },
  {
    name: "TypeScript",
    icon: <SiTypescript size={iconSize} />,
    background: "bg-blue-400/10",
    color: "text-blue-500",
    category: ["Utama", "Frontend", "Backend"],
  },
  {
    name: "Node.js",
    icon: <SiNodedotjs size={iconSize} />,
    background: "bg-green-400/10",
    color: "text-green-500",
    category: ["Utama", "Backend"],
  },
  {
    name: "Supabase",
    icon: <SiSupabase size={iconSize} />,
    background: "bg-emerald-400/10",
    color: "text-emerald-500",
    category: ["Utama", "Backend", "Database"],
  },
  {
    name: "React Native",
    icon: <TbBrandReactNative size={iconSize} />,
    background: "bg-cyan-400/10",
    color: "text-cyan-500",
    category: ["Utama", "Mobile"],
  },
  {
    name: "JavaScript",
    icon: <SiJavascript size={iconSize} />,
    background: "bg-yellow-400/10",
    color: "text-yellow-500",
    category: ["Frontend"],
  },
  {
    name: "TailwindCSS",
    icon: <SiTailwindcss size={iconSize} />,
    background: "bg-cyan-400/10",
    color: "text-cyan-400",
    category: ["Frontend"],
  },
  {
    name: "Express.js",
    icon: <SiExpress size={iconSize} />,
    background: "bg-gray-400/10",
    color: "text-gray-500 dark:text-gray-400",
    category: ["Backend"],
  },
  {
    name: "Prisma",
    icon: <SiPrisma size={iconSize} />,
    background: "bg-teal-400/10",
    color: "text-teal-500",
    category: ["Backend", "Database"],
  },
  {
    name: "Flutter",
    icon: <SiFlutter size={iconSize} />,
    background: "bg-blue-400/10",
    color: "text-blue-400",
    category: ["Mobile"],
  },
  {
    name: "PostgreSQL",
    icon: <SiPostgresql size={iconSize} />,
    background: "bg-blue-600/10",
    color: "text-blue-600 dark:text-blue-400",
    category: ["Database"],
  },
  {
    name: "MySQL",
    icon: <SiMysql size={iconSize} />,
    background: "bg-orange-400/10",
    color: "text-orange-500",
    category: ["Database"],
  },
  {
    name: "MongoDB",
    icon: <SiMongodb size={iconSize} />,
    background: "bg-green-500/10",
    color: "text-green-600 dark:text-green-500",
    category: ["Database"],
  },
  {
    name: "Firebase",
    icon: <SiFirebase size={iconSize} />,
    background: "bg-yellow-400/10",
    color: "text-yellow-500",
    category: ["Database", "Backend"],
  },
  {
    name: "Figma",
    icon: <SiFigma size={iconSize} />,
    background: "bg-pink-400/10",
    color: "text-pink-500",
    category: ["Tools"],
  },
  {
    name: "Docker",
    icon: <SiDocker size={iconSize} />,
    background: "bg-blue-500/10",
    color: "text-blue-500",
    category: ["Tools"],
  },
  {
    name: "Git",
    icon: <SiGit size={iconSize} />,
    background: "bg-orange-500/10",
    color: "text-orange-500",
    category: ["Tools"],
  },
  {
    name: "Go",
    icon: <SiGo size={iconSize} />,
    background: "bg-blue-500/10",
    color: "text-blue-500",
    category: ["Frontend", "Backend"],
  },
];  