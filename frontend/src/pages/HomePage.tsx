import { Analytics } from "@/components/home/Analytics";
import { Community } from "@/components/home/Community";
import { CTA } from "@/components/home/CTA";
import { EventManagement } from "@/components/home/EventManagement";
import { Features } from "@/components/home/Features";
import { Footer } from "@/components/home/Footer";
import { Hero } from "@/components/home/Hero";

const HomePage = () => {
  return (
    <main className="min-h-screen">
      <Hero />
      <Features />
      <EventManagement />
      <Community />
      <Analytics />
      <CTA />
      <Footer />
    </main>
  );
};

export default HomePage;
