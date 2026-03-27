import Hero from "@/components/Hero";
import Terminal from "@/components/Terminal";
import AIDemoWidget from "@/components/AIDemoWidget";
import ProjectsSection from "@/components/ProjectsSection";
import AboutSection from "@/components/AboutSection";
export default function Home() {
  return (
    <main>
      <Hero />
      <Terminal />
      <AIDemoWidget />
      <ProjectsSection />
      <AboutSection />
    </main>
  );
}
