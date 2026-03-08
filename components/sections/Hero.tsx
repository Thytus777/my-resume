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
  },
  {
    icon: <FaGraduationCap />,
    title: 'Education',
    text: 'Software Engineering (Hons) & Commerce — Monash University',
  },
  {
    icon: <FaBriefcase />,
    title: 'Currently Working',
    text: 'Software Developer — Building scalable applications',
  },
  {
    icon: <FaMapMarkerAlt />,
    title: 'Location',
    text: 'Melbourne, Australia',
  },
];

export default function Hero() {
  return (
    <section id="hero" className="hero">
      <div className="hero-layout">
        <div className="hero-left">
          <div className="hero-intro">
            <h1>
              Hi, I&apos;m <span className="hero-name">Thytus Benjamin</span>
            </h1>
            <p className="hero-role">Software Developer</p>
          </div>

          <div className="hero-grid">
            {infoCards.map((card, idx) => (
              <div key={idx} className={`hero-card${idx === 0 ? ' hero-card--large' : ''}`}>
                <div className="hero-card-icon">{card.icon}</div>
                <h3 className="hero-card-title">{card.title}</h3>
                <p className="hero-card-text">{card.text}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="hero-right">
          <div className="hero-lanyard">
            <Suspense fallback={null}>
              <Lanyard />
            </Suspense>
          </div>
        </div>
      </div>
    </section>
  );
}
