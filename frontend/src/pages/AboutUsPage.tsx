import { AboutHero } from "@/components/AboutUs/AboutHero";
import { ProjectInfo } from "@/components/AboutUs/ProjectInfo";
import { Team } from "@/components/AboutUs/Team";

const AboutUsPage = () => {
  return (
    <main className="min-h-screen">
      <AboutHero />
      <ProjectInfo />
      <Team />
    </main>
  );
};

export default AboutUsPage;
