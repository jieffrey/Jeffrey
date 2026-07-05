import type { Mission } from "../types";

export const mission: Mission = {
  title: "Full Stack Developer",
  description: "Building elegant solutions to complex problems",
  status: "active",
  currentFocus: "Platform Dashboard Module",
  progress: 65,
  deadline: "2026-08-15",
  priority: "High",
  reward: "Senior Developer Badge",
  checklist: [
    { id: "1", text: "Complete dashboard widget foundation", completed: true },
    { id: "2", text: "Implement responsive grid layout", completed: true },
    { id: "3", text: "Add dark mode support", completed: true },
    { id: "4", text: "Integrate real API data sources", completed: false },
    { id: "5", text: "Write unit tests for all components", completed: false },
  ],
};
