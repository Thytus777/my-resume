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

export default function Hero() {
  return (
    <section id="hero" className="hero">
      <div className="hero-layout">

        {/* LEFT: intro + grid */}
        <div className="hero-left">
          <div className="hero-intro">
            <h1>
              Hi, I&apos;m <span className="hero-name">Thytus Benjamin</span>
            </h1>
            <p className="hero-role">Software Developer</p>
          </div>

          <div className="hero-grid">
            {infoCards.map((card, idx) => (
              <div
                key={idx}
                className={`hero-card${card.large ? ' hero-card--large' : ''}`}
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

        {/* RIGHT: lanyard container — same height as left column */}
        <div className="hero-right">
          <Suspense fallback={null}>
            {/* Higher fov + further camera Z = lanyard appears smaller/fitted */}
            <Lanyard position={[0, 0, 20]} fov={30} gravity={[0, -60, 0]} />
          </Suspense>
        </div>

      </div>
    </section>
  );
}