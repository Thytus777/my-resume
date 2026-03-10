'use client';

import { useState } from 'react';
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

      {loaded && <Navbar />}

      <main className={`relative z-10 ${loaded ? 'main-visible' : 'main-hidden'}`}>
        <Hero />
        <Experience />
        <Projects />
        <Skills />
        <Contact />
      </main>
    </>
  );
}