import Navbar from "@/components/Navbar";
import Hero, { StatsStrip } from "@/components/Hero";
import { About, Education, Experience, Projects, Skills } from "@/components/Sections";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import GlobalEffects from "@/components/GlobalEffects";
import SettingsWidget from "@/components/SettingsWidget";

export default function Home() {
  return (
    <>
      <GlobalEffects />
      <SettingsWidget />
      <Navbar />
      <main>
        <Hero />
        <StatsStrip />
        <About />
        <Experience />
        <Skills />
        <Projects />
        <Education />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
