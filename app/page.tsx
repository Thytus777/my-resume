'use client';

import { useState } from 'react';
import ParticlesBackground from '@/components/ParticlesBackground';
import Experience from '../components/sections/Experience';
import Projects from '../components/sections/Projects';
import Skills from '../components/sections/Skills';
import Hero from '../components/sections/Hero';
import Contact from '../components/sections/Contact';
import Navbar from '@/components/Navbar';
import LoadingScreen from '@/components/LoadingScreen';

export default function HomePage() {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      {!loaded && <LoadingScreen onDone={() => setLoaded(true)} />}

      {/* Navbar only appears once loading is done */}
      {loaded && <Navbar />}

      <ParticlesBackground />

      <main className="relative z-10">
        <Hero />
        <Experience />
        <Projects />
        <Skills />
        <Contact />
      </main>
    </>
  );
}