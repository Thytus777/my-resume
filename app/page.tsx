'use client';

import { useState } from 'react';
import Experience from '../components/sections/Experience';
import Projects from '../components/sections/Projects';
import Skills from '../components/sections/Skills';
import Hero from '../components/sections/Hero';
import Contact from '../components/sections/Contact';
import Navbar from '@/components/Navbar';
import LoadingScreen from '@/components/LoadingScreen';
import LetterGlitch from '@/components/LetterGlitch';

export default function HomePage() {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      {/* Letter glitch sits at z-index 0, fixed, behind everything */}
      <LetterGlitch
        colors={['#3a220b', '#ff6a00', '#ef9920']}
        glitchSpeed={50}
        glitchChance={0.05}
        cellSize={16}
      />

      <LoadingScreen onDone={() => setLoaded(true)} />

      {loaded && <Navbar />}

      <main className={`relative z-10 ${loaded ? 'main-visible' : 'main-hidden'}`}>
        <Hero ready={loaded} />
        <Experience />
        <Projects />
        <Skills />
        <Contact />
      </main>
    </>
  );
}