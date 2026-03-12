'use client';

import { Suspense, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { FaGraduationCap, FaUser } from 'react-icons/fa';
import './Hero.css';

const Lanyard = dynamic(() => import('../Lanyard'), { ssr: false });
const MelbourneMap = dynamic(
  () => import('../MelbourneMap'),
  { ssr: false, loading: () => <div className="melb-map-loading" /> }
);

/* ─── Deterministic activity heatmap ─────────────────────── */
const WEEKS = 26;
const DAYS  = 7;

function seededRand(seed: number) {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) & 0xffffffff;
    return (s >>> 0) / 0xffffffff;
  };
}

function ActivityHeatmap() {
  const grid = useMemo(() => {
    const rand = seededRand(42);
    return Array.from({ length: WEEKS }, () =>
      Array.from({ length: DAYS }, () => {
        const r = rand();
        if (r > 0.75) return 0;
        if (r > 0.55) return 1;
        if (r > 0.35) return 2;
        if (r > 0.15) return 3;
        return 4;
      })
    );
  }, []);

  const total = grid.flat().filter(Boolean).length * 3;

  const legendColors = [
    'rgba(255,106,0,0.07)',
    'rgba(255,106,0,0.2)',
    'rgba(255,106,0,0.42)',
    'rgba(255,106,0,0.65)',
    'rgba(255,106,0,0.9)',
  ];

  return (
    <>
      <div className="activity-grid">
        {grid.map((week, wi) => (
          <div key={wi} className="activity-col">
            {week.map((level, di) => (
              <div
                key={di}
                className="activity-cell"
                data-level={level === 0 ? undefined : level}
              />
            ))}
          </div>
        ))}
      </div>
      <div className="activity-footer">
        <span className="activity-count">{total} contributions in the last 6 months</span>
        <div className="activity-legend">
          {legendColors.map((bg, i) => (
            <div key={i} className="activity-legend-cell" style={{ background: bg }} />
          ))}
        </div>
      </div>
    </>
  );
}

/* ─── Hero ────────────────────────────────────────────────── */
interface HeroProps {
  ready?: boolean;
}

export default function Hero({ ready = false }: HeroProps) {
  const anim = ready ? 'seq-fade' : 'seq-hidden';
  const d = (i: number) => ({ animationDelay: `${0.3 + i * 0.1}s` });

  return (
    <section id="hero" className="hero">

      {/* Intro */}
      <div className={`hero-intro ${anim}`} style={{ animationDelay: '0.05s' }}>
        <h1>
          Hi, I&apos;m <span className="hero-name">Thytus Benjamin</span>
        </h1>
        <p className="hero-role">Software Developer</p>
      </div>

      {/* Unified full-width bento grid */}
      <div className="hero-grid">

        {/* Row 1, cols 1–9: About */}
        <div className={`hero-card hero-card--about ${anim}`} style={d(0)}>
          <div className="hero-card-corner" aria-hidden />
          <div className="hero-card-icon"><FaUser /></div>
          <p className="hero-card-label">About Me</p>
          <p className="about-text">
            Motivated final-year Software Engineering student with hands-on experience in
            full-stack web development. Skilled in building user-friendly interfaces and
            reliable backend systems — seeking an internship or entry-level role to contribute
            to real-world projects and grow as a full-stack &amp; AI engineer.
          </p>
        </div>

        {/* Rows 1–4, cols 10–12: Lanyard anchor (sizes the grid area) + absolutely positioned card */}
        <div className={`hero-card--lanyard-anchor ${anim}`} style={{ ...d(0), position: 'relative' }}>
          <div className="hero-card hero-card--lanyard">
            <Suspense fallback={null}>
              <Lanyard position={[0, 0, 20]} fov={30} gravity={[0, -60, 0]} />
            </Suspense>
          </div>
        </div>

        {/* Row 2: Education */}
        <div className={`hero-card hero-card--education ${anim}`} style={d(1)}>
          <div className="hero-card-corner" aria-hidden />
          <div className="hero-card-icon"><FaGraduationCap /></div>
          <p className="hero-card-label">Education</p>
          <p className="hero-card-value">
            Software Engineering (Honours)
            <br />
            &amp; Commerce (Business Analytics)
            <br />
            <span style={{ color: '#ff6a00', fontSize: '0.85rem' }}>Monash University</span>
          </p>
        </div>

        {/* Row 3: Availability */}
        <div className={`hero-card hero-card--availability ${anim}`} style={d(2)}>
          <div className="hero-card-corner" aria-hidden />
          <p className="hero-card-label">Status</p>
          <div className="avail-badge">
            <span className="avail-dot" />
            Open to Work
          </div>
          <div className="avail-types">
            <span className="avail-type">Internship</span>
            <span className="avail-type">Grad Role</span>
            <span className="avail-type">Part-time</span>
            <span className="avail-type">Full-time</span>
          </div>
        </div>

        {/* Row 3: Map */}
        <div className={`hero-card hero-card--map ${anim}`} style={d(3)}>
          <MelbourneMap />
        </div>

        {/* Row 3: Activity heatmap */}
        <div className={`hero-card hero-card--activity ${anim}`} style={d(4)}>
          <div className="hero-card-corner" aria-hidden />
          <p className="hero-card-label">GitHub Activity</p>
          <ActivityHeatmap />
        </div>

        {/* Row 3: Explore my work button */}
        <a
          href="#projects"
          className={`hero-card hero-card--explore ${anim}`}
          style={d(5)}
        >
          <div className="explore-inner">
            <span className="explore-arrow">↓</span>
            <span className="explore-label">Explore My Work</span>
            <span className="explore-sub">Projects</span>
          </div>
        </a>

      </div>
    </section>
  );
}