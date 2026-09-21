import type { Project } from "@/types";

export const isiquest: Project = {
  slug: "isiquest",
  title: "isiQuest",
  tagline: {
    en: "A multi-product SaaS platform for 360° evaluations, multi-mode voting, and live coaching sessions.",
    fr: "Une plateforme SaaS multi-produits pour évaluations à 360°, vote multi-modalités et sessions de coaching en direct.",
  },
  status: "shipped",
  year: "2023",
  role: {
    en: "Contracted product engineer — built the evaluation, voting, and real-time session features.",
    fr: "Ingénieur produit en prestation — développement des fonctionnalités d'évaluation, de vote et de sessions en temps réel.",
  },
  overview: {
    en: "isiQuest is a SaaS platform for professional evaluation workflows: 360° assessments, multi-mode voting, and a client portal ('Visu') for live webinars and coaching sessions, all behind a multi-guard authentication system.",
    fr: "isiQuest est une plateforme SaaS pour les processus d'évaluation professionnelle : évaluations à 360°, vote multi-modalités et un espace client (« Visu ») pour des webinaires et sessions de coaching en direct, le tout derrière un système d'authentification multi-guard.",
  },
  problem: {
    en: "Organizations running structured evaluations and voting processes needed a single platform that could handle several distinct evaluation products, real-time coaching sessions, and reporting — without stitching together separate tools for each.",
    fr: "Les organisations menant des processus d'évaluation et de vote structurés avaient besoin d'une plateforme unique capable de gérer plusieurs produits d'évaluation distincts, des sessions de coaching en temps réel et du reporting, sans assembler des outils séparés pour chacun.",
  },
  solution: {
    en: "A multi-product platform built around a shared evaluation engine, extended with a 360° module, configurable multi-mode voting, real-time webinar/coaching sessions, and advanced reporting — with full i18n from the start.",
    fr: "Une plateforme multi-produits construite autour d'un moteur d'évaluation partagé, étendue avec un module 360°, un vote multi-modalités configurable, des sessions de webinaire/coaching en temps réel et un reporting avancé — avec une internationalisation complète dès le départ.",
  },
  architecture: {
    en: "Next.js frontend talking to a Laravel API with MySQL storage, using Sanctum for multi-guard authentication (separating admin, evaluator, and client roles) and Laravel Reverb for real-time features in the live coaching sessions.",
    fr: "Frontend Next.js communiquant avec une API Laravel et un stockage MySQL, utilisant Sanctum pour une authentification multi-guard (séparant les rôles admin, évaluateur et client) et Laravel Reverb pour les fonctionnalités temps réel des sessions de coaching en direct.",
  },
  technologies: ["Next.js", "Laravel", "MySQL", "Tailwind CSS", "Clean Architecture", "Laravel Reverb"],
  keyDecisions: [
    {
      title: { en: "Multi-guard authentication", fr: "Authentification multi-guard" },
      detail: {
        en: "Used Sanctum's guard system to keep admin, evaluator, and client sessions fully isolated within one codebase instead of running separate apps.",
        fr: "Utilisation du système de guards de Sanctum pour isoler complètement les sessions admin, évaluateur et client au sein d'une seule base de code plutôt que de faire tourner des applications séparées.",
      },
    },
    {
      title: { en: "Real-time via Laravel Reverb", fr: "Temps réel via Laravel Reverb" },
      detail: {
        en: "Adopted Laravel's own WebSocket server (Reverb) for the live webinar/coaching module, avoiding a third-party real-time vendor.",
        fr: "Adoption du serveur WebSocket natif de Laravel (Reverb) pour le module de webinaire/coaching en direct, évitant un prestataire tiers pour le temps réel.",
      },
    },
  ],
  results: [
    {
      label: { en: "Scope shipped", fr: "Périmètre livré" },
      value: {
        en: "360° evaluation module, multi-mode voting, live coaching portal, and full i18n, deployed to production.",
        fr: "Module d'évaluation 360°, vote multi-modalités, portail de coaching en direct et internationalisation complète, déployés en production.",
      },
    },
  ],
  lessonsLearned: [
    {
      en: "Modeling multiple evaluation 'products' on one shared engine early on made it much cheaper to add the voting module later than if each had been built as a silo.",
      fr: "Modéliser plusieurs « produits » d'évaluation sur un même moteur dès le départ a rendu l'ajout ultérieur du module de vote bien moins coûteux que si chacun avait été construit isolément.",
    },
  ],
  media: [
    {
      src: "/images/projects/isiquest.png",
      alt: { en: "isiQuest evaluation platform interface", fr: "Interface de la plateforme d'évaluation isiQuest" },
    },
  ],
  links: [{ label: "Live", href: "https://qualification.isiquest.com/auth/login" }],
  featured: true,
};
