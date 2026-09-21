import type { Project } from "@/types";

/**
 * PLACEHOLDER CASE STUDY — Callora is real and current, but the detailed
 * narrative below is realistic placeholder copy, not confirmed fact.
 * Replace overview/problem/solution/architecture/technologies/keyDecisions
 * with the real specifics before publishing.
 */
export const callora: Project = {
  slug: "callora",
  title: "Callora",
  tagline: {
    en: "An AI receptionist that answers and manages calls for dental clinics.",
    fr: "Une réceptionniste IA qui répond et gère les appels pour les cliniques dentaires.",
  },
  status: "in-progress",
  year: "2025",
  role: {
    en: "Founder & engineer — product, voice AI pipeline, and infrastructure. [placeholder — confirm scope]",
    fr: "Fondateur & ingénieur — produit, pipeline de voix IA et infrastructure. [placeholder — à confirmer]",
  },
  overview: {
    en: "Callora is an AI receptionist built for dental clinics: it answers inbound calls, books and reschedules appointments, and handles common patient questions, so front-desk staff can focus on the patients in front of them instead of the phone. [Placeholder overview — replace with real product detail.]",
    fr: "Callora est une réceptionniste IA conçue pour les cliniques dentaires : elle répond aux appels entrants, prend et replanifie des rendez-vous, et répond aux questions courantes des patients, afin que le personnel d'accueil se concentre sur les patients présents plutôt que sur le téléphone. [Aperçu provisoire — à remplacer par le détail réel du produit.]",
  },
  problem: {
    en: "Dental clinics lose bookings and staff time to phone calls that interrupt front-desk work — missed calls during busy hours, repetitive scheduling questions, and after-hours requests that go to voicemail. [Placeholder — replace with the real problem statement.]",
    fr: "Les cliniques dentaires perdent des rendez-vous et du temps de personnel à cause des appels qui interrompent le travail à l'accueil — appels manqués aux heures de pointe, questions de planning répétitives, et demandes hors horaires qui finissent en messagerie. [Placeholder — à remplacer par le vrai constat.]",
  },
  solution: {
    en: "Callora answers calls with a voice AI agent that can hold a real conversation, check availability, book or reschedule appointments, and hand off to a human when a call needs one. [Placeholder — replace with the real solution description.]",
    fr: "Callora répond aux appels avec un agent vocal IA capable de tenir une vraie conversation, de vérifier les disponibilités, de prendre ou replanifier des rendez-vous, et de transférer à un humain quand c'est nécessaire. [Placeholder — à remplacer par la vraie description de la solution.]",
  },
  architecture: {
    en: "A voice pipeline (speech-to-text → LLM → text-to-speech) integrated with clinic scheduling, deployed on cloud infrastructure with monitoring for call quality and latency. [Placeholder architecture — replace with the actual system design.]",
    fr: "Un pipeline vocal (reconnaissance vocale → LLM → synthèse vocale) intégré à la planification des cliniques, déployé sur une infrastructure cloud avec un suivi de la qualité d'appel et de la latence. [Architecture provisoire — à remplacer par la conception réelle du système.]",
  },
  technologies: ["Voice AI", "Next.js", "Node.js", "AWS"],
  keyDecisions: [
    {
      title: { en: "Voice-first over chat-first", fr: "Priorité à la voix plutôt qu'au chat" },
      detail: {
        en: "Placeholder — replace with the actual reasoning behind building a voice agent instead of a chat/booking widget.",
        fr: "Placeholder — à remplacer par le raisonnement réel derrière le choix d'un agent vocal plutôt qu'un widget de chat/réservation.",
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
