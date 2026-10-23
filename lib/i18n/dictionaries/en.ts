export const en = {
  meta: {
    siteTitle: "Yvan Jordan Nguetse — Software Engineer & Product Builder",
    siteDescription:
      "NY-Jordan. Building real products, one system at a time — modern web products, SaaS platforms, and AI-powered applications.",
  },
  nav: {
    work: "Work",
    writing: "Writing",
    about: "About",
    now: "Now",
    contact: "Contact",
  },
  hero: {
    eyebrow: "Software Engineer & Product Builder",
    name: "Yvan Jordan",
    statement: "Building real products, one system at a time.",
    description:
      "I design, build, ship and maintain modern web products, SaaS platforms and AI-powered applications — under the NY-Jordan brand.",
    ctaWork: "View my work",
    ctaWriting: "Read my writing",
    ctaContact: "Get in touch",
  },
  home: {
    selectedWork: {
      eyebrow: "Selected work",
      title: "Products I've designed and shipped",
      viewAll: "View all work",
    },
    whatIBuild: {
      eyebrow: "What I build",
      title: "Four things I keep coming back to",
      pillars: [
        {
          title: "Product engineering",
          description:
            "Full-stack web applications built with React, Next.js and TypeScript — from the first component to a production deploy.",
        },
        {
          title: "AI-powered systems",
          description:
            "Conversational and voice AI products that handle real workflows, like an AI receptionist that manages calls for dental clinics.",
        },
        {
          title: "SaaS platforms",
          description:
            "Multi-tenant platforms for service businesses — auth, billing, onboarding, and the operational details that make software usable at scale.",
        },
        {
          title: "Infrastructure & deployment",
          description:
            "Docker-based deployments and AWS infrastructure that keep products running reliably long after launch day.",
        },
      ],
    },
    currentFocus: {
      eyebrow: "Current focus",
      title: "What I'm doing right now",
      viewAll: "See the full /now page",
    },
    writingPreview: {
      eyebrow: "Writing",
      title: "Recent notes on building software",
      viewAll: "Read all articles",
      empty: "The first articles are being written — check back soon.",
    },
    aboutPreview: {
      eyebrow: "About",
      title: "Self-taught, based in Cameroon, building for the world",
      body: "I got into programming by taking things apart to understand how they worked, then rebuilding them. That instinct hasn't changed — it just moved from hobby projects to shipping SaaS platforms and AI-powered products for clients across three continents.",
      cta: "More about me",
    },
    contactCta: {
      eyebrow: "Contact",
      title: "Have a product to build?",
      body: "I'm open to conversations about ambitious products, hard technical problems, and long-term collaborations.",
      cta: "Get in touch",
    },
  },
  work: {
    eyebrow: "Work",
    title: "Case studies",
    intro:
      "A closer look at products I've designed, built and shipped — the problems behind them, the decisions I made, and what I'd do differently.",
    backToWork: "All work",
    overview: "Overview",
    problem: "Problem",
    solution: "Solution",
    role: "My role",
    architecture: "Architecture",
    technologies: "Technologies",
    keyDecisions: "Key technical decisions",
    results: "Results",
    media: "Screenshots",
    lessons: "Lessons learned",
    links: "Links",
    status: {
      shipped: "Shipped",
      "in-progress": "In progress",
    },
    placeholderNotice:
      "This case study is a placeholder outline — full details coming soon.",
  },
  writing: {
    eyebrow: "Writing",
    title: "Writing",
    intro:
      "Technical notes on software engineering, architecture, SaaS development, and lessons from building Callora, Zyraa and other products.",
    readingTime: "min read",
    tableOfContents: "On this page",
    relatedArticles: "Related articles",
    backToWriting: "All articles",
    empty: "The first articles are being written — check back soon.",
    publishedOn: "Published",
    likeAction: "Like this article",
    likedState: "Liked",
    viewsLabel: "views",
    likesLabel: "likes",
  },
  about: {
    eyebrow: "About",
    title: "About",
    paragraphs: [
      "I'm a self-taught software engineer based in Cameroon, working with teams and clients across France, Senegal, and beyond. I got into programming by taking things apart to understand how they worked, then rebuilding them — that instinct hasn't changed since; it just moved from hobby projects to shipping SaaS platforms and AI-powered products.",
      "I build modern web products end to end: React and Next.js on the front end, Laravel, PHP or Node.js on the back end, MySQL for storage, deployed on AWS or Docker-based infrastructure. Recently that's meant an AI receptionist that holds real conversations for dental clinics (Callora), and a multi-tenant SaaS platform for beauty salons (Zyraa).",
      "My approach to engineering favors clear architecture over clever tricks — clean boundaries between layers, decisions that are easy to explain to the next person, and systems that are still legible six months later. I care as much about how something is built as whether it works.",
      "Outside of shipping code, I spend time with music and training — both are where I go to think, and both taught me the same lesson as engineering: consistency beats intensity.",
    ],
    experienceTitle: "Experience",
  },
  now: {
    eyebrow: "Now",
    title: "What I'm doing now",
    intro:
      "A snapshot of what I'm building, learning and exploring at the moment — updated as things change, in the spirit of nownownow.com.",
    lastUpdated: "Last updated",
  },
  contact: {
    eyebrow: "Contact",
    title: "Get in touch",
    intro:
      "The fastest way to reach me is email. I read everything, even if a reply takes a few days.",
    emailLabel: "Email",
    githubLabel: "GitHub",
    linkedinLabel: "LinkedIn",
  },
  footer: {
    tagline: "Building real products, one system at a time.",
    rights: "All rights reserved.",
    subscribeTitle: "Stay in the loop",
    subscribePlaceholder: "you@email.com",
    subscribeCta: "Subscribe",
    subscribeSuccess: "You're subscribed — thanks!",
    subscribeDuplicate: "You're already on the list.",
    subscribeError: "Something went wrong. Try again.",
  },
  common: {
    readMore: "Read more",
    backHome: "Back home",
    notFoundTitle: "Page not found",
    notFoundBody: "The page you're looking for doesn't exist or has moved.",
  },
};

export type Dictionary = typeof en;
