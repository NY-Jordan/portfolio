import type { Interest } from "@/types";

export const interests: Interest[] = [
  {
    slug: "musique",
    title: { fr: "Musique", en: "Music" },
    description: {
      fr: "La musique m'accompagne au quotidien, que ce soit pour me concentrer en codant ou pour décompresser après une longue session de debug.",
      en: "Music is part of my daily routine, whether it's to focus while coding or to unwind after a long debugging session.",
    },
    image: "/images/about/musique.png",
    icon: "music",
  },
  {
    slug: "sport",
    title: { fr: "Sport & discipline", en: "Sport & discipline" },
    description: {
      fr: "Le sport m'aide à garder l'esprit clair et la discipline nécessaire pour tenir la distance sur des projets longs.",
      en: "Sport helps me keep a clear mind and the discipline needed to stay the course on long projects.",
    },
    image: "/images/about/sport.jpeg",
    icon: "dumbbell",
  },
];
