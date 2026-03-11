'use client';

import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import { FaGraduationCap, FaBriefcase, FaUser } from 'react-icons/fa';
import './Hero.css';

const Lanyard = dynamic(() => import('../Lanyard'), { ssr: false });

// ✅ ssr: false prevents leaflet from running on the server
const MelbourneMap = dynamic(
  () => import('../MelbourneMap'),
  { ssr: false, loading: () => <div className="melb-map-loading" /> }
);

const infoCards = [
  {
    icon: <FaUser />,
    title: 'About Me',
    text: 'Motivated final-year Software Engineering student with practical experience in full-stack web development. Skilled in building user-friendly interfaces and reliable backend systems. Seeking an internship or entry-level role where I can apply my technical skills, contribute to real-world projects, and continue growing as a full-stack engineer and AI engineer.',
    large: true,
    mapCard: false,
  },
  {
    icon: <FaGraduationCap />,
    title: 'Education',
    text: 'Software Engineering (Honours) & Commerce (Business Analytics) — Monash University',
    large: false,
    mapCard: false,
  },
  {
    icon: <FaBriefcase />,
    title: 'Currently Working',
    text: 'Software Developer — Building scalable applications',
    large: false,
    mapCard: false,
  },
  {
    icon: null,
    title: 'Location',
    text: '',
    large: false,
    mapCard: true,
  },
];

const CARD_BASE_DELAY = 0.3;
const CARD_STEP = 0.15;

interface HeroProps {
  ready?: boolean;
}

export default function Hero({ ready = false }: HeroProps) {
  const anim = ready ? 'seq-fade' : 'seq-hidden';

  return (
    <section id="hero" className="hero">
      <div className="hero-layout">

        <div className="hero-left">
          <div className="hero-intro">
            <h1 className={anim} style={{ animationDelay: '0.05s' }}>
              Hi, I&apos;m <span className="hero-name">Thytus Benjamin</span>
            </h1>
            <p className={`hero-role ${anim}`} style={{ animationDelay: '0.25s' }}>
              Software Developer
            </p>
          </div>

          <div className="hero-grid">
            {infoCards.map((card, idx) => (
              <div
                key={idx}
                className={`hero-card ${anim}${card.large ? ' hero-card--large' : ''}${card.mapCard ? ' hero-card--map' : ''}`}
                style={{ animationDelay: `${CARD_BASE_DELAY + idx * CARD_STEP}s` }}
              >
                {card.mapCard ? (
                  <MelbourneMap />
                ) : card.large ? (
                  <>
                    <div className="hero-card-icon">{card.icon}</div>
                    <div className="hero-card-content">
                      <h3 className="hero-card-title">{card.title}</h3>
                      <p className="hero-card-text">{card.text}</p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="hero-card-icon">{card.icon}</div>
                    <h3 className="hero-card-title">{card.title}</h3>
                    <p className="hero-card-text">{card.text}</p>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>

        <div
          className={`hero-right ${anim}`}
          style={{ animationDelay: '0.9s' }}
        >
          <Suspense fallback={null}>
            <Lanyard position={[0, 0, 20]} fov={30} gravity={[0, -60, 0]} />
          </Suspense>
        </div>

      </div>
    </section>
  );
}