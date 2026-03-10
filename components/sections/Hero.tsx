'use client';

import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import { FaGraduationCap, FaBriefcase, FaMapMarkerAlt, FaUser } from 'react-icons/fa';
import './Hero.css';

const Lanyard = dynamic(() => import('../Lanyard'), { ssr: false });

const infoCards = [
  {
    icon: <FaUser />,
    title: 'About Me',
    text: 'Passionate software developer dedicated to creating innovative solutions that make an impact.',
    large: true,
  },
  {
    icon: <FaGraduationCap />,
    title: 'Education',
    text: 'Software Engineering (Hons) & Commerce — Monash University',
    large: false,
  },
  {
    icon: <FaBriefcase />,
    title: 'Currently Working',
    text: 'Software Developer — Building scalable applications',
    large: false,
  },
  {
    icon: <FaMapMarkerAlt />,
    title: 'Location',
    text: 'Melbourne, Australia',
    large: false,
  },
];

const CARD_BASE_DELAY = 0.3;
const CARD_STEP = 0.15;

interface HeroProps {
  ready?: boolean;
}

export default function Hero({ ready = false }: HeroProps) {
  // Only apply the animation class once the loader is done
  const anim = ready ? 'seq-fade' : 'seq-hidden';

  return (
    <section id="hero" className="hero">
      <div className="hero-layout">

        {/* LEFT: intro + grid */}
        <div className="hero-left">
          <div className="hero-intro">
            <h1
              className={anim}
              style={{ animationDelay: '0.05s' }}
            >
              Hi, I&apos;m <span className="hero-name">Thytus Benjamin</span>
            </h1>
            <p
              className={`hero-role ${anim}`}
              style={{ animationDelay: '0.25s' }}
            >
              Software Developer
            </p>
          </div>

          <div className="hero-grid">
            {infoCards.map((card, idx) => (
              <div
                key={idx}
                className={`hero-card ${anim}${card.large ? ' hero-card--large' : ''}`}
                style={{ animationDelay: `${CARD_BASE_DELAY + idx * CARD_STEP}s` }}
              >
                <div className="hero-card-icon">{card.icon}</div>
                {card.large ? (
                  <div className="hero-card-content">
                    <h3 className="hero-card-title">{card.title}</h3>
                    <p className="hero-card-text">{card.text}</p>
                  </div>
                ) : (
                  <>
                    <h3 className="hero-card-title">{card.title}</h3>
                    <p className="hero-card-text">{card.text}</p>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT: lanyard panel */}
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