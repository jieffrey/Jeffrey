import type { Project } from "../type";

// Source of truth for the Projects page and each project's detail page.
// The first entry below is filled out completely as a reference for the
// level of detail worth writing for the others — swap "thumbnail" and
// "gallery" paths for real screenshots once you have them (put images in
// public/images/projects/ and reference them as "/images/projects/...").
export const PROJECTS: Project[] = [
  {
    slug: "todo-app-with-auth",
    title: "Todo App with Auth",
    description:
      "Full-stack todo application with JWT authentication, CRUD operations, and persistent storage using PostgreSQL.",
    category: "Fullstack",
    status: "live",
    techStack: ["Next.js", "TypeScript", "PostgreSQL", "Supabase"],
    githubUrl: "#",
    liveUrl: "#",
    year: "2025",
    thumbnail: "/images/projects/todo-app/thumbnail.png",
    detail: {
      problem:
        "Most todo app tutorials skip authentication entirely, so there's no real reference for how session handling, protected routes, and per-user data isolation should actually work together in a Next.js app.",
      solution:
        "Built a todo app where every task is scoped to an authenticated user via JWT, with protected API routes and a PostgreSQL schema that enforces ownership at the database level, not just in application code.",
      gallery: [
        "/images/projects/todo-app/dashboard.png",
        "/images/projects/todo-app/auth-flow.png",
        "/images/projects/todo-app/mobile.png",
      ],
      keyFeatures: [
        {
          title: "JWT session handling",
          description:
            "Access + refresh token pair with automatic silent refresh on expiry.",
        },
        {
          title: "Optimistic UI updates",
          description:
            "Task create/complete/delete reflect instantly, then reconcile with the server.",
        },
        {
          title: "Per-user data isolation",
          description:
            "Row-level ownership checks at the database layer, not just in route handlers.",
        },
      ],
      techDecisions: [
        {
          title: "Supabase over a self-hosted PostgreSQL instance",
          description:
            "Row Level Security policies handle per-user data isolation directly in the database, removing a whole class of authorization bugs from the application layer.",
        },
        {
          title: "JWT over session cookies",
          description:
            "Kept the API stateless so the same auth layer could later serve a mobile client without rework.",
        },
      ],
      timeline: [
        {
          phase: "Week 1",
          description: "Schema design and auth flow (signup, login, refresh).",
        },
        {
          phase: "Week 2",
          description: "Todo CRUD with optimistic UI and error rollback.",
        },
        { phase: "Week 3", description: "Polish, edge cases, and deployment." },
      ],
      challenges: [
        {
          title: "Silent token refresh race conditions",
          description:
            "Multiple simultaneous requests during token expiry triggered duplicate refresh calls. Solved with a shared in-flight refresh promise so concurrent requests wait on one refresh instead of firing their own.",
        },
      ],
    },
  },

  // TODO: fill out `detail` for the remaining projects the same way —
  // problem/solution, 2-4 gallery images, key features, tech decisions,
  // a rough timeline, and any real challenges you ran into. Placeholder
  // empty state below just keeps the type happy in the meantime.
  {
    slug: "rest-api-boilerplate",
    title: "REST API Boilerplate",
    description:
      "A production-ready REST API boilerplate with Express.js, includes auth, validation, error handling, and Docker setup.",
    category: "Backend",
    status: "live",
    techStack: ["Node.js", "Express.js", "PostgreSQL", "Docker"],
    githubUrl: "#",
    year: "2025",
    thumbnail: "/images/projects/rest-api-boilerplate/thumbnail.png",
    detail: {
      problem: "",
      solution: "",
      gallery: [],
      keyFeatures: [],
      techDecisions: [],
      timeline: [],
      challenges: [],
    },
  },
  {
    slug: "weather-app",
    title: "Weather App",
    description:
      "Mobile weather app built with React Native, fetches real-time data from OpenWeather API with location support.",
    category: "Mobile",
    status: "live",
    techStack: ["React Native", "TypeScript", "OpenWeather API"],
    githubUrl: "#",
    liveUrl: "#",
    year: "2024",
    thumbnail: "/images/projects/weather-app/thumbnail.png",
    detail: {
      problem: "",
      solution: "",
      gallery: [],
      keyFeatures: [],
      techDecisions: [],
      timeline: [],
      challenges: [],
    },
  },
  {
    slug: "chat-app-websocket",
    title: "Chat App (WebSocket)",
    description:
      "Real-time chat application using WebSocket, supports multiple rooms and online presence tracking.",
    category: "Fullstack",
    status: "development",
    techStack: ["Next.js", "Node.js", "Socket.io", "Redis"],
    githubUrl: "#",
    year: "2025",
    thumbnail: "/images/projects/chat-app/thumbnail.png",
    detail: {
      problem: "",
      solution: "",
      gallery: [],
      keyFeatures: [],
      techDecisions: [],
      timeline: [],
      challenges: [],
    },
  },
  {
    slug: "fastapi-crud",
    title: "FastAPI CRUD",
    description:
      "Simple CRUD API built with FastAPI and Python. Includes Pydantic validation, SQLAlchemy ORM, and Alembic migrations.",
    category: "Backend",
    status: "live",
    techStack: ["Python", "FastAPI", "PostgreSQL", "SQLAlchemy"],
    githubUrl: "#",
    year: "2025",
    thumbnail: "/images/projects/fastapi-crud/thumbnail.png",
    detail: {
      problem: "",
      solution: "",
      gallery: [],
      keyFeatures: [],
      techDecisions: [],
      timeline: [],
      challenges: [],
    },
  },
  {
    slug: "portfolio-v1",
    title: "Portfolio v1",
    description:
      "First version of my personal portfolio website built with plain React and Tailwind CSS.",
    category: "Frontend",
    status: "archived",
    techStack: ["React", "TailwindCSS", "JavaScript"],
    githubUrl: "#",
    year: "2024",
    thumbnail: "/images/projects/portfolio-v1/thumbnail.png",
    detail: {
      problem: "",
      solution: "",
      gallery: [],
      keyFeatures: [],
      techDecisions: [],
      timeline: [],
      challenges: [],
    },
  },
];

export const PROJECT_CATEGORIES = [
  "All",
  "Fullstack",
  "Frontend",
  "Backend",
  "Mobile",
];

export function getProjectBySlug(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}
