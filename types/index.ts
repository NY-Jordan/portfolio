export interface LocalizedText {
  fr: string;
  en: string;
}

export interface Project {
  slug: string;
  title: string;
  description: LocalizedText;
  features: LocalizedText[];
  image: string;
  technologies: string[];
  githubUrl?: string;
  demoUrl?: string;
  featured?: boolean;
}

export type SkillCategory =
  | "Frontend"
  | "Backend"
  | "Architecture"
  | "Database"
  | "Tools";

export interface Skill {
  name: string;
  category: SkillCategory;
}

export interface ExperienceItem {
  period: LocalizedText;
  role: LocalizedText;
  company: string;
  location: LocalizedText;
  highlights: LocalizedText[];
  technologies: string[];
}

export interface Interest {
  slug: string;
  title: LocalizedText;
  description: LocalizedText;
  image: string;
  icon: "music" | "dumbbell";
}
