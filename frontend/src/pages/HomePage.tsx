import { CTASection } from "@/components/home/CtaSection";
import { FeaturesGrid } from "@/components/home/FeaturesGrid";
import { Footer } from "@/components/home/Footer";
import { HeroSection } from "@/components/home/HeroSection";
import { StatsSection } from "@/components/home/StatsSection";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
      <FeaturesGrid />
      <StatsSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default HomePage;
