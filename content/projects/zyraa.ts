import type { Project } from "@/types";

export const zyraa: Project = {
  slug: "zyraa",
  title: "Zyraa",
  tagline: {
    en: "A multi-tenant SaaS platform for beauty salons — booking, POS, and client management in one place.",
    fr: "Une plateforme SaaS multi-tenant pour salons de beauté : réservation, encaissement et gestion client réunis en un seul outil.",
  },
  status: "shipped",
  year: "2024",
  role: {
    en: "Solo full-stack developer — architecture, frontend, backend, and deployment.",
    fr: "Développeur full-stack solo — architecture, frontend, backend et déploiement.",
  },
  overview: {
    en: "Zyraa is a SaaS platform that gives beauty salons the tools to run their day-to-day operations: appointment booking, point-of-sale, team management, and a public marketplace where clients can discover and book services directly.",
    fr: "Zyraa est une plateforme SaaS qui donne aux salons de beauté les outils pour gérer leur activité au quotidien : prise de rendez-vous, encaissement, gestion d'équipe et une marketplace publique où les clients peuvent découvrir et réserver des prestations directement.",
  },
  problem: {
    en: "Independent salons typically juggle several disconnected tools — a paper or spreadsheet booking system, a separate payment terminal, and word-of-mouth for discovery — with no single place to manage the business or let clients self-serve.",
    fr: "Les salons indépendants jonglent souvent avec plusieurs outils déconnectés — un carnet de rendez-vous papier ou un tableur, un terminal de paiement séparé, et le bouche-à-oreille pour la visibilité — sans un seul endroit pour piloter l'activité ou laisser les clients réserver eux-mêmes.",
  },
  solution: {
    en: "A multi-tenant SaaS where each salon gets its own workspace with progressive onboarding: they start with booking and grow into POS, team management, and their own public booking page as they need it, with features gated by plan.",
    fr: "Un SaaS multi-tenant où chaque salon dispose de son propre espace avec un onboarding progressif : ils démarrent avec la réservation puis accèdent à l'encaissement, la gestion d'équipe et leur propre page de réservation publique selon leurs besoins, avec des fonctionnalités débloquées par palier.",
  },
  architecture: {
    en: "Built as a monorepo following Clean Architecture principles, separating domain logic from the Next.js frontend and Firebase-backed data/auth layer. This kept the booking engine, POS, and marketplace as independently testable modules sharing a common core.",
    fr: "Construit en monorepo selon les principes de la Clean Architecture, séparant la logique métier du frontend Next.js et de la couche données/authentification basée sur Firebase. Cela a permis de garder le moteur de réservation, l'encaissement et la marketplace comme des modules testables indépendamment tout en partageant un socle commun.",
  },
  technologies: ["Next.js", "Firebase", "Tailwind CSS", "Monorepo", "Clean Architecture"],
  keyDecisions: [
    {
      title: { en: "Monorepo with Clean Architecture", fr: "Monorepo avec Clean Architecture" },
      detail: {
        en: "Chose a monorepo so the admin dashboard, public booking marketplace, and shared domain logic could evolve together without duplicating business rules.",
        fr: "Choix d'un monorepo pour que le back-office, la marketplace publique et la logique métier partagée évoluent ensemble sans dupliquer les règles.",
      },
    },
    {
      title: { en: "Progressive onboarding with feature gating", fr: "Onboarding progressif avec fonctionnalités par palier" },
      detail: {
        en: "Salons unlock POS, team management, and marketplace listing progressively, rather than facing every feature on day one.",
        fr: "Les salons débloquent l'encaissement, la gestion d'équipe et la marketplace progressivement, plutôt que de faire face à toutes les fonctionnalités dès le premier jour.",
      },
    },
    {
      title: { en: "Multi-provider payments", fr: "Paiements multi-fournisseurs" },
      detail: {
        en: "Supporting more than one payment provider so the platform could adapt to regional payment preferences instead of locking salons into a single processor.",
        fr: "Prise en charge de plusieurs fournisseurs de paiement pour s'adapter aux préférences régionales plutôt que d'enfermer les salons dans un seul prestataire.",
      },
    },
  ],
  results: [
    {
      label: { en: "Scope shipped", fr: "Périmètre livré" },
      value: {
        en: "Booking, POS, team management, public marketplace, and automated transactional emails, all in one product.",
        fr: "Réservation, encaissement, gestion d'équipe, marketplace publique et emails transactionnels automatisés, réunis dans un seul produit.",
      },
    },
  ],
  lessonsLearned: [
    {
      en: "Clean Architecture pays off fastest in multi-tenant products, where the same domain rules need to serve very different surfaces (admin, public site, POS).",
      fr: "La Clean Architecture est particulièrement rentable dans les produits multi-tenant, où les mêmes règles métier doivent servir des surfaces très différentes (admin, site public, encaissement).",
    },
    {
      en: "Gating features by onboarding stage reduced early churn more than adding features ever did — salons need to feel in control before they'll trust a new tool with their bookings.",
      fr: "Débloquer les fonctionnalités par étape d'onboarding a réduit le décrochage initial plus efficacement que l'ajout de fonctionnalités — les salons doivent se sentir en confiance avant de faire confiance à un nouvel outil pour leurs rendez-vous.",
    },
  ],
  media: [
    {
      src: "/images/projects/zyra.png",
      alt: { en: "Zyraa salon booking dashboard", fr: "Tableau de bord de réservation Zyraa" },
    },
  ],
  links: [{ label: "GitHub", href: "https://github.com/NY-Jordan/zyra1.0" }],
  featured: true,
};
