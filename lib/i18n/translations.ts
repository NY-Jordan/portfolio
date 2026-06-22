export type Lang = "fr" | "en";

export interface Dictionary {
  nav: {
    top: string;
    about: string;
    skills: string;
    experience: string;
    projects: string;
  };
  hero: {
    greeting: string;
    subtitleLine1: string;
    subtitleLine2: string;
    ctaProjects: string;
    ctaResume: string;
    scroll: string;
  };
  about: {
    eyebrow: string;
    title: string;
    paragraph1: string;
    paragraph2: string;
    interestsLabel: string;
  };
  skills: {
    eyebrow: string;
    title: string;
    description: string;
    categories: {
      Frontend: string;
      Backend: string;
      Architecture: string;
      Database: string;
      Tools: string;
    };
  };
  experience: {
    eyebrow: string;
    title: string;
    description: string;
  };
  projects: {
    eyebrow: string;
    title: string;
    description: string;
  };
}

export const translations: Record<Lang, Dictionary> = {
  fr: {
    nav: {
      top: "Accueil",
      about: "À propos",
      skills: "Compétences",
      experience: "Expérience",
      projects: "Projets",
    },
    hero: {
      greeting: "Hi, I'm",
      subtitleLine1: "Développeur Fullstack avec une appétence",
      subtitleLine2: "particulière pour le frontend.",
      ctaProjects: "Voir mes projets",
      ctaResume: "Télécharger mon CV",
      scroll: "Scroll",
    },
    about: {
      eyebrow: "À propos",
      title:
        "Développeur fullstack passionné par les produits bien construits",
      paragraph1:
        "Je suis développeur fullstack, animé par l'envie de transformer des idées en produits rapides, robustes et agréables à utiliser. J'ai une appétence particulière pour le frontend, là où design et ingénierie se rencontrent, mais je suis tout aussi à l'aise pour construire une API ou modéliser une base de données.",
      paragraph2:
        "Je m'intéresse particulièrement à l'architecture logicielle : comment organiser un code qui reste lisible et évolutif à mesure qu'un produit grandit. C'est cette curiosité qui me pousse à construire des produits de bout en bout, de l'idée jusqu'au déploiement.",
      interestsLabel: "En dehors du code",
    },
    skills: {
      eyebrow: "Compétences",
      title: "Les outils et principes derrière mon travail",
      description:
        "Une stack fullstack, avec une attention particulière portée au frontend et à l'expérience utilisateur.",
      categories: {
        Frontend: "Frontend",
        Backend: "Backend",
        Architecture: "Architecture",
        Database: "Bases de données",
        Tools: "Outils",
      },
    },
    experience: {
      eyebrow: "Expérience",
      title: "Mon parcours en quelques missions",
      description:
        "Des missions fullstack qui ont façonné ma manière de construire des produits.",
    },
    projects: {
      eyebrow: "Projets",
      title: "Quelques réalisations récentes",
      description:
        "Des applications conçues et développées de bout en bout, avec le même soin du détail.",
    },
  },
  en: {
    nav: {
      top: "Home",
      about: "About",
      skills: "Skills",
      experience: "Experience",
      projects: "Projects",
    },
    hero: {
      greeting: "Hi, I'm",
      subtitleLine1: "Fullstack Developer with a soft spot",
      subtitleLine2: "for crafting great frontend experiences.",
      ctaProjects: "View my projects",
      ctaResume: "Download my CV",
      scroll: "Scroll",
    },
    about: {
      eyebrow: "About",
      title: "Fullstack developer passionate about well-built products",
      paragraph1:
        "I'm a fullstack developer, driven by the desire to turn ideas into products that are fast, robust, and a pleasure to use. I have a particular soft spot for frontend work, where design and engineering meet, but I'm just as comfortable building an API or modeling a database.",
      paragraph2:
        "I'm especially interested in software architecture: how to organize code that stays readable and scalable as a product grows. That curiosity is what drives me to build products end-to-end, from idea to deployment.",
      interestsLabel: "Outside of code",
    },
    skills: {
      eyebrow: "Skills",
      title: "The tools and principles behind my work",
      description:
        "A fullstack toolkit, with close attention paid to the frontend and user experience.",
      categories: {
        Frontend: "Frontend",
        Backend: "Backend",
        Architecture: "Architecture",
        Database: "Database",
        Tools: "Tools",
      },
    },
    experience: {
      eyebrow: "Experience",
      title: "My journey through a few key missions",
      description:
        "Fullstack missions that shaped the way I build products.",
    },
    projects: {
      eyebrow: "Projects",
      title: "A few recent works",
      description:
        "Applications designed and built end-to-end, with the same attention to detail.",
    },
  },
};
