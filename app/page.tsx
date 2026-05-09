import { Nav } from "./components/Nav";
import { HeroScrollytelling } from "./components/HeroScrollytelling";
import { FeatureShowcase } from "./components/FeatureShowcase";
import { FriendlyComparison } from "./components/FriendlyComparison";
import { TechStack } from "./components/TechStack";
import { FAQ } from "./components/FAQ";
import { FinalCTA } from "./components/FinalCTA";
import { Footer } from "./components/Footer";

export default function Home() {
  return (
    <div className="min-h-[100dvh] bg-[var(--background)] text-[var(--text-primary)] selection:bg-[var(--accent)]/30">
      <Nav />
      <main>
        {/* The Scrollytelling Hero locks the viewport and plays the story */}
        <HeroScrollytelling />
        
        {/* The Hybrid Showcase section */}
        <FeatureShowcase />

        {/* The Non-aggressive Comparison */}
        <FriendlyComparison />

        {/* Tech Stack & System Requirements */}
        <TechStack />

        {/* FAQ Section */}
        <FAQ />

        {/* Final CTA Section */}
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
