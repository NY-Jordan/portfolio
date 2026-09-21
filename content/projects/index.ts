import type { Project } from "@/types";
import { callora } from "./callora";
import { zyraa } from "./zyraa";
import { ntasks } from "./ntasks";
import { isiquest } from "./isiquest";
import { minders } from "./minders";

export const projects: Project[] = [callora, zyraa, ntasks, isiquest, minders];

export function getAllProjects(): Project[] {
  return projects;
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((project) => project.featured);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
