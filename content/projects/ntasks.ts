import type { Project } from "@/types";

/**
 * PLACEHOLDER CASE STUDY — NTASKS is real and current, but the detailed
 * narrative below is realistic placeholder copy, not confirmed fact.
 * Replace overview/problem/solution/architecture/technologies/keyDecisions
 * with the real specifics before publishing.
 */
export const ntasks: Project = {
  slug: "ntasks",
  title: "NTASKS",
  tagline: {
    en: "Developer productivity and desktop tooling to keep engineering work organized.",
    fr: "Un outil desktop de productivité pour développeurs, pour garder le travail d'ingénierie organisé.",
  },
  status: "in-progress",
  year: "2025",
  role: {
    en: "Founder & engineer — product and desktop application. [placeholder — confirm scope]",
    fr: "Fondateur & ingénieur — produit et application desktop. [placeholder — à confirmer]",
  },
  overview: {
    en: "NTASKS is a desktop productivity tool built for developers, aimed at keeping day-to-day engineering work — tasks, context, and focus — organized in one place instead of scattered across tabs and notes apps. [Placeholder overview — replace with real product detail.]",
    fr: "NTASKS est un outil desktop de productivité conçu pour les développeurs, visant à garder le travail d'ingénierie au quotidien — tâches, contexte et concentration — organisé en un seul endroit plutôt que dispersé entre onglets et applications de notes. [Aperçu provisoire — à remplacer par le détail réel du produit.]",
  },
  problem: {
    en: "Developers juggle tasks across issue trackers, notes, and terminal history, losing context every time they switch between projects or get interrupted. [Placeholder — replace with the real problem statement.]",
    fr: "Les développeurs jonglent avec des tâches réparties entre gestionnaires de tickets, notes et historique de terminal, perdant le contexte à chaque changement de projet ou interruption. [Placeholder — à remplacer par le vrai constat.]",
  },
  solution: {
    en: "A lightweight desktop app that keeps tasks, notes, and project context together, designed to stay out of the way until it's needed. [Placeholder — replace with the real solution description.]",
    fr: "Une application desktop légère qui regroupe tâches, notes et contexte de projet, conçue pour rester discrète jusqu'à ce qu'on en ait besoin. [Placeholder — à remplacer par la vraie description de la solution.]",
  },
  architecture: {
    en: "A desktop application shell wrapping a local-first data layer, syncing across machines when needed. [Placeholder architecture — replace with the actual system design.]",
    fr: "Une coquille d'application desktop enveloppant une couche de données local-first, avec synchronisation entre machines si besoin. [Architecture provisoire — à remplacer par la conception réelle du système.]",
  },
  technologies: ["TypeScript", "Electron"],
  keyDecisions: [
    {
      title: { en: "Local-first over cloud-first", fr: "Local-first plutôt que cloud-first" },
      detail: {
        en: "Placeholder — replace with the actual reasoning behind the data storage approach.",
        fr: "Placeholder — à remplacer par le raisonnement réel derrière l'approche de stockage des données.",
      },
    },
  ],
  results: [
    {
      label: { en: "Status", fr: "Statut" },
      value: {
        en: "In active development — results to be added once available.",
        fr: "En développement actif — résultats à ajouter dès qu'ils seront disponibles.",
      },
    },
  ],
  lessonsLearned: [
    {
      en: "Placeholder — lessons will be added as the product matures.",
      fr: "Placeholder — les leçons seront ajoutées à mesure que le produit mûrit.",
    },
  ],
  media: [],
  links: [],
  featured: true,
  isPlaceholder: true,
};
