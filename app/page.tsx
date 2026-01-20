import ParticlesBackground from "@/components/ParticlesBackground";
import About from "../components/sections/About";
import Experience from "../components/sections/Experience";
import Projects from "../components/sections/Projects";
import Skills from "../components/sections/Skills";
import Hero from "../components/sections/Hero";
import Contact from "../components/sections/Contact";
import Navbar from "@/components/Navbar";

export default function HomePage() {
  return (
    <>
      <ParticlesBackground />

      <main className="relative z-10">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Contact />
      </main>
    </>
  );
}
