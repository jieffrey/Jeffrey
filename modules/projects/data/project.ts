import type { Project } from "../type"

export const PROJECTS: Project[] = [
  {
    title: "Todo App with Auth",
    description:
      "Full-stack todo application with JWT authentication, CRUD operations, and persistent storage using PostgreSQL.",
    category: "Fullstack",
    status: "live",
    techStack: ["Next.js", "TypeScript", "PostgreSQL", "Supabase"],
    githubUrl: "#",
    liveUrl: "#",
    year: "2025",
  },
  {
    title: "REST API Boilerplate",
    description:
      "A production-ready REST API boilerplate with Express.js, includes auth, validation, error handling, and Docker setup.",
    category: "Backend",
    status: "live",
    techStack: ["Node.js", "Express.js", "PostgreSQL", "Docker"],
    githubUrl: "#",
    year: "2025",
  },
  {
    title: "Weather App",
    description:
      "Mobile weather app built with React Native, fetches real-time data from OpenWeather API with location support.",
    category: "Mobile",
    status: "live",
    techStack: ["React Native", "TypeScript", "OpenWeather API"],
    githubUrl: "#",
    liveUrl: "#",
    year: "2024",
  },
  {
    title: "Chat App (WebSocket)",
    description:
      "Real-time chat application using WebSocket, supports multiple rooms and online presence tracking.",
    category: "Fullstack",
    status: "development",
    techStack: ["Next.js", "Node.js", "Socket.io", "Redis"],
    githubUrl: "#",
    year: "2025",
  },
  {
    title: "FastAPI CRUD",
    description:
      "Simple CRUD API built with FastAPI and Python. Includes Pydantic validation, SQLAlchemy ORM, and Alembic migrations.",
    category: "Backend",
    status: "live",
    techStack: ["Python", "FastAPI", "PostgreSQL", "SQLAlchemy"],
    githubUrl: "#",
    year: "2025",
  },
  {
    title: "Portfolio v1",
    description:
      "First version of my personal portfolio website built with plain React and Tailwind CSS.",
    category: "Frontend",
    status: "archived",
    techStack: ["React", "TailwindCSS", "JavaScript"],
    githubUrl: "#",
    year: "2024",
  },
];


export const CATEGORIES = ["All", "Fullstack", "Frontend", "Backend", "Mobile"];