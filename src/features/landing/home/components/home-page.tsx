"use client";

import { HeroSection } from "./hero-section";
import { FeaturesSection } from "./features-section";
import { CtaSection } from "./cta-section";

export function HomePage() {
  return (
    <div>
      <HeroSection />
      <FeaturesSection />
      <CtaSection />
    </div>
  );
}
