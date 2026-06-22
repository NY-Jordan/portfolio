"use client";

import { useState } from "react";

import { Navbar } from "@/components/layout/navbar";
import { HorizontalScrollContainer } from "@/components/layout/horizontal-scroll-container";
import { Loader } from "@/components/shared/loader";
import { HeroSection } from "@/components/sections/hero-section";
import { AboutSection } from "@/components/sections/about-section";
import { SkillsSection } from "@/components/sections/skills-section";
import { ExperienceSection } from "@/components/sections/experience-section";
import { ProjectsSection } from "@/components/sections/projects-section";

export default function Home() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {loading ? <Loader onComplete={() => setLoading(false)} /> : 

        <>
          <Navbar />
          <HorizontalScrollContainer>
            <HeroSection />
            <AboutSection />
            <SkillsSection />
            <ExperienceSection />
            <ProjectsSection />
        </HorizontalScrollContainer>
        </>
        }
      
    </>
  );
}
