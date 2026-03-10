'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import './Projects.css';

export interface Project {
  id: number;
  number: string;
  title: string;
  subtitle: string;
  image: string;
  description: string[];
  skills: string[];
  github?: string;
  live?: string;
}

interface CarouselProject {
  title: string;
  desc: string;
  bullets: string[];
  tech: string[];
  cover: string;
  gallery: string[];
  status: 'live' | 'wip';
  statusLabel: string;
  live?: string;
  github?: string;
}

const PROJECTS: CarouselProject[] = [
  {
    title: 'Automotive Detailing',
    desc: 'Website for a client to showcase their automotive detailing business. Features gallery, services info, and responsive design.',
    bullets: [
      'Modern UI with smooth animations and transitions',
      'Responsive design optimised for all devices',
      'SEO-friendly with fast load times',
    ],
    tech: ['Vue', 'Tailwind CSS', 'UI/UX', 'Responsive Design', 'GIT'],
    cover: 'https://images.unsplash.com/photo-1507136566006-cfc505b114fc?w=600&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1507136566006-cfc505b114fc?w=600&q=80',
      'https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?w=600&q=80',
      'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=600&q=80',
    ],
    status: 'live',
    statusLabel: 'Live',
    live: 'https://ck-detailing.netlify.app',
    github: 'https://github.com/Thytus777/CK-detailing',
  },
  {
    title: 'MHSB Insurance',
    desc: 'Insurance platform allowing users to buy and renew policies online. Focused on backend, secure auth, and sensitive data handling.',
    bullets: [
      'Secure JWT-based authentication system',
      'Policy management with renewal workflows',
      'RESTful API with comprehensive Postman testing',
    ],
    tech: ['React', 'Tailwind CSS', 'Postgres', 'JWT', 'Postman'],
    cover: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&q=80',
      'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&q=80',
    ],
    status: 'wip',
    statusLabel: 'In Progress',
  },
  {
    title: 'All In One Real Estate',
    desc: 'Industry experience project with a team of 11. Agents manage inspections, rental agreements, and communications.',
    bullets: [
      'Collaborative team project with 11 developers',
      'Agent-tenant management with inspection scheduling',
      'Real-time communication and agreement tracking',
    ],
    tech: ['React', 'Node.js', 'MongoDB', 'Meteor', 'Tailwind CSS'],
    cover: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&q=80',
      'https://images.unsplash.com/photo-1582407947092-45c027cb1b15?w=600&q=80',
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&q=80',
    ],
    status: 'live',
    statusLabel: 'Live',
    live: 'https://all-in-one.meteorapp.com',
    github: 'https://github.com/Monash-FIT3170/2025W1-All-In-One',
  },
];

export default function Projects() {
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isFading, setIsFading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const ringRef = useRef<HTMLDivElement>(null);
  const scrollAccRef = useRef(0);
  const scrollTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const total = PROJECTS.length;

  const goTo = useCallback((idx: number) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setIsFading(true);

    const next = ((idx % total) + total) % total;
    setCurrent(next);

    setTimeout(() => setIsFading(false), 220);
    setTimeout(() => setIsTransitioning(false), 600);
  }, [isTransitioning, total]);

  // Wheel handler on ring
  useEffect(() => {
    const ring = ringRef.current;
    if (!ring) return;

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      scrollAccRef.current += e.deltaY;

      if (scrollTimerRef.current) clearTimeout(scrollTimerRef.current);
      scrollTimerRef.current = setTimeout(() => {
        if (Math.abs(scrollAccRef.current) > 30) {
          goTo(scrollAccRef.current > 0 ? current + 1 : current - 1);
        }
        scrollAccRef.current = 0;
      }, 60);
    };

    ring.addEventListener('wheel', onWheel, { passive: false });
    return () => ring.removeEventListener('wheel', onWheel);
  }, [goTo, current]);

  // Keyboard nav
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (modalOpen) {
        if (e.key === 'Escape') setModalOpen(false);
        return;
      }
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') goTo(current - 1);
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') goTo(current + 1);
    };

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [goTo, current, modalOpen]);

  const p = PROJECTS[current];

  return (
    <section id="projects" className="prj-circular-section">
      <p className="prj-section-label">// selected work</p>
      <h2 className="prj-section-title">Projects</h2>

      <div className="prj-showcase">
        {/* LEFT: Card Carousel */}
        <div className="prj-carousel-wrap">
          <div className="prj-carousel-ring" ref={ringRef}>
            <div className="prj-ring-inner">
              <div className="prj-slides-track">
                {PROJECTS.map((proj, i) => (
                  <div key={i} className={`prj-slide ${i === current ? 'active' : ''}`}>
                    <img src={proj.cover} alt={proj.title} loading="lazy" />
                    <span className="prj-slide-badge">{proj.title.toUpperCase()}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="prj-carousel-controls">
            <button className="prj-ctrl-btn" onClick={() => goTo(current - 1)} aria-label="Previous">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <div className="prj-dot-track">
              {PROJECTS.map((_, i) => (
                <div key={i} className={`prj-dot ${i === current ? 'active' : ''}`} onClick={() => goTo(i)} />
              ))}
            </div>
            <button className="prj-ctrl-btn" onClick={() => goTo(current + 1)} aria-label="Next">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M5 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>

          <p className="prj-slide-counter">
            <span>{String(current + 1).padStart(2, '0')}</span> / {String(total).padStart(2, '0')}
          </p>
        </div>

        {/* RIGHT: Project Info */}
        <div className={`prj-project-info ${isFading ? 'fading' : ''}`}>
          <p className="prj-project-number">Project {String(current + 1).padStart(2, '0')}</p>
          <h3 className="prj-project-title">{p.title}</h3>
          <p className="prj-project-desc">{p.desc}</p>
          <ul className="prj-project-bullets">
            {p.bullets.map((b, i) => (
              <li key={i}>{b}</li>
            ))}
          </ul>
          <div className="prj-info-divider" />
          <div>
            <p className="prj-tech-label">Tech Stack</p>
            <div className="prj-tech-tags">
              {p.tech.map((t, i) => (
                <span key={i} className="prj-tech-tag">{t}</span>
              ))}
            </div>
          </div>
          <div className="prj-project-links">
            {p.live && (
              <a href={p.live} target="_blank" rel="noopener noreferrer" className="prj-view-btn">
                Live Demo
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            )}
            {p.github && (
              <a href={p.github} target="_blank" rel="noopener noreferrer" className="prj-view-btn ghost">
                GitHub
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            )}
          </div>
          <button className="prj-view-btn" onClick={() => setModalOpen(true)}>
            View Gallery
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Gallery Modal */}
      <div className={`prj-modal-overlay ${modalOpen ? 'open' : ''}`} onClick={(e) => { if (e.target === e.currentTarget) setModalOpen(false); }}>
        <div className="prj-modal-box">
          <div className="prj-modal-header">
            <h3>{p.title} — Gallery</h3>
            <button className="prj-modal-close" onClick={() => setModalOpen(false)}>✕</button>
          </div>
          <div className="prj-modal-gallery">
            {p.gallery.map((src, i) => (
              <img key={i} src={src} alt="screenshot" loading="lazy" />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
