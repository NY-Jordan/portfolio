import type { Project } from "@/types";

export const minders: Project = {
  slug: "minders",
  title: "Minders",
  tagline: {
    en: "A wellness mobile app for personalized affirmations, guided meditation, and smart habit reminders.",
    fr: "Une application mobile de bien-être pour affirmations personnalisées, méditations guidées et rappels d'habitudes intelligents.",
  },
  status: "shipped",
  year: "2023",
  role: {
    en: "Solo mobile developer — app, backend integration, and native widgets.",
    fr: "Développeur mobile solo — application, intégration backend et widgets natifs.",
  },
  overview: {
    en: "Minders is a mobile app that helps people build positive daily habits through personalized affirmations, guided meditations, and smart reminders, with Android home-screen widgets to keep the practice visible throughout the day.",
    fr: "Minders est une application mobile qui aide à construire des habitudes positives au quotidien grâce à des affirmations personnalisées, des méditations guidées et des rappels intelligents, avec des widgets Android sur l'écran d'accueil pour garder la pratique visible tout au long de la journée.",
  },
  problem: {
    en: "Habit and wellness apps often lose users within days because the content feels generic and the app is easy to forget once it's closed.",
    fr: "Les applications de bien-être et d'habitudes perdent souvent leurs utilisateurs en quelques jours car le contenu semble générique et l'application est facile à oublier une fois fermée.",
  },
  solution: {
    en: "An onboarding flow that captures mood, beliefs, and goals to generate personalized affirmations, paired with native home-screen widgets and smart push reminders so the app stays present without needing to be opened.",
    fr: "Un parcours d'onboarding qui capte l'humeur, les croyances et les objectifs pour générer des affirmations personnalisées, associé à des widgets natifs sur l'écran d'accueil et des rappels intelligents pour que l'application reste présente sans avoir besoin d'être ouverte.",
  },
  architecture: {
    en: "React Native with Expo for cross-platform delivery, Supabase for auth and data, NativeWind for styling, and native Android widget modules (small/rectangle/large) surfacing affirmations directly on the home screen.",
    fr: "React Native avec Expo pour une diffusion cross-plateforme, Supabase pour l'authentification et les données, NativeWind pour le style, et des modules de widgets Android natifs (petit/rectangle/grand) affichant les affirmations directement sur l'écran d'accueil.",
  },
  technologies: ["React Native", "Expo", "Supabase", "TypeScript", "NativeWind", "Tailwind CSS"],
  keyDecisions: [
    {
      title: { en: "Personalized onboarding engine", fr: "Moteur d'onboarding personnalisé" },
      detail: {
        en: "Generated affirmations from onboarding answers (mood, beliefs, goals) instead of shipping a static content library, so the app felt tailored from the first session.",
        fr: "Génération des affirmations à partir des réponses à l'onboarding (humeur, croyances, objectifs) plutôt qu'une bibliothèque de contenu statique, pour que l'application semble adaptée dès la première session.",
      },
    },
    {
      title: { en: "Native home-screen widgets", fr: "Widgets natifs sur l'écran d'accueil" },
      detail: {
        en: "Built native Android widgets rather than relying on push notifications alone, keeping affirmations ambiently visible without requiring an app open.",
        fr: "Développement de widgets Android natifs plutôt que de s'appuyer uniquement sur les notifications push, gardant les affirmations visibles en continu sans ouvrir l'application.",
      },
    },
  ],
  results: [
    {
      label: { en: "Scope shipped", fr: "Périmètre livré" },
      value: {
        en: "Personalized onboarding, affirmation engine, guided meditation player, native widgets, and streak tracking, shipped end to end.",
        fr: "Onboarding personnalisé, moteur d'affirmations, lecteur de méditation guidée, widgets natifs et suivi de séries, livrés de bout en bout.",
      },
    },
  ],
  lessonsLearned: [
    {
      en: "Native widgets were disproportionately effective for retention compared to their build cost — ambient presence beats another push notification.",
      fr: "Les widgets natifs ont eu un effet disproportionné sur la rétention par rapport à leur coût de développement — une présence ambiante vaut mieux qu'une notification push de plus.",
    },
  ],
  media: [
    {
      src: "/images/projects/minders.jpg",
      alt: { en: "Minders wellness app screens", fr: "Écrans de l'application de bien-être Minders" },
    },
  ],
  links: [{ label: "GitHub", href: "https://github.com/NY-Jordan/minders" }],
  featured: false,
};
