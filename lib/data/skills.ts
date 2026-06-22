import type { Skill } from "@/types";

export const skills: Skill[] = [
  { name: "React", category: "Frontend" },
  { name: "Next.js", category: "Frontend" },
  { name: "TailwindCSS", category: "Frontend" },
  { name: "Flutter", category: "Frontend" },
  { name: "PHP", category: "Backend" },
  { name: "Laravel", category: "Backend" },
  { name: "Node.js", category: "Backend" },
  { name: "REST API", category: "Backend" },
  { name: "Clean Architecture", category: "Architecture" },
  { name: "Feature-Sliced Design", category: "Architecture" },
  { name: "Vertical Slice Architecture", category: "Architecture" },
  { name: "Atomic Design", category: "Architecture" },
  { name: "MySQL", category: "Database" },
  { name: "Firebase", category: "Database" },
  { name: "SQL", category: "Database" },
  { name: "Supabase", category: "Database" },
  { name: "Docker", category: "Tools" },
  { name: "Git", category: "Tools" },
  { name: "GitHub", category: "Tools" },
  { name: "GitLab", category: "Tools" },
  { name: "Linux", category: "Tools" },
];

export const skillCategories = [
  "Frontend",
  "Backend",
  "Architecture",
  "Database",
  "Tools",
] as const;
