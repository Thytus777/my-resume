'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import './Experience.css';

interface Job {
  year: string;
  title: string;
  company: string;
  snippet: string;
  desc: string;
  highlights: string[];
  tags: string[];
}

const JOBS: Job[] = [
  {
    year: '2024 – Present',
    title: 'Tutor',
    company: '📚 Senkou Academy',
    snippet: 'Teaching students with diverse backgrounds and learning styles.',
    desc: 'Developed strong communication and interpersonal skills by teaching students with diverse personalities, learning styles, and academic backgrounds. Adapted explanations to ensure clarity and engagement.',
    highlights: [
      'Managed time effectively by teaching multiple students concurrently',
      'Balanced lesson preparation, scheduling, and progress tracking',
      'Built leadership, patience, and problem-solving skills',
      'Maintained a professional and supportive learning environment',
    ],
    tags: ['Communication', 'Time Management', 'Leadership', 'Problem Solving'],
  },
  {
    year: '2025',
    title: 'Full Stack Developer (Intern)',
    company: '💻 1Lynx Solutions',
    snippet: 'Agile development, client communication & building internal tools.',
    desc: 'Worked as part of an agile development team, contributing to sprint planning, stand-ups, and iterative development of internal tools. Communicated directly with clients to gather requirements and ensure solutions aligned with business needs.',
    highlights: [
      'Contributed to sprint planning, stand-ups, and iterative development',
      'Communicated directly with clients to gather requirements',
      'Gained experience with JWT authentication and application security',
      'Learned through mentorship and code reviews from senior developers',
    ],
    tags: ['JavaScript', 'HTML/CSS', 'Git', 'Agile', 'JWT', 'PostgreSQL', 'Postman'],
  },
];

function Modal({ job, onClose }: { job: Job | null; onClose: () => void }) {
  useEffect(() => {
    if (!job) return;
    document.body.style.overflow = 'hidden';
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handleKey);
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleKey);
    };
  }, [job, onClose]);

  return (
    <div
      className={`exp-modal-overlay ${job ? 'open' : ''}`}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      {job && (
        <div className="exp-modal-box">
          <button className="exp-modal-close" onClick={onClose}>✕</button>
          <p className="exp-m-year">{job.year}</p>
          <h3 className="exp-m-title">{job.title}</h3>
          <p className="exp-m-company">{job.company}</p>
          <div className="exp-m-divider" />
          <p className="exp-m-desc">{job.desc}</p>
          <ul className="exp-m-highlights">
            {job.highlights.map((h, i) => <li key={i}>{h}</li>)}
          </ul>
          <div className="exp-m-tags">
            {job.tags.map((t, i) => <span key={i} className="exp-m-tag">{t}</span>)}
          </div>
        </div>
      )}
    </div>
  );
}

export default function Experience() {
  const [modalJob, setModalJob] = useState<Job | null>(null);
  const closeModal = useCallback(() => setModalJob(null), []);

  const travelerRef      = useRef<HTMLDivElement>(null);
  const sectionRef       = useRef<HTMLElement>(null);
  const jobsContainerRef = useRef<HTMLDivElement>(null);
  const cardsRef         = useRef<(HTMLDivElement | null)[]>([]);
  const dotsRef          = useRef<(HTMLDivElement | null)[]>([]);

  // ── Title scroll-reveal ──────────────────────────────────────
  const [titleInView, setTitleInView] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTitleInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // ── Scroll-based traveler + card reveal (unchanged) ──────────
  useEffect(() => {
    const traveler      = travelerRef.current;
    const section       = sectionRef.current;
    const jobsContainer = jobsContainerRef.current;
    if (!traveler || !section || !jobsContainer) return;

    let currentRotation = 0;
    let lastScrollY     = window.scrollY;
    const revealedCards = new Set<number>();

    function lerp(a: number, b: number, t: number) {
      return a + (b - a) * t;
    }

    let rafId: number;

    const onScroll = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop;
      const delta   = scrollY - lastScrollY;
      lastScrollY   = scrollY;

      const targetRot = Math.max(-15, Math.min(15, delta * 1.5));
      currentRotation = lerp(currentRotation, targetRot, 0.2);
      traveler.style.transform = `rotate(${currentRotation}deg)`;

      const containerRect = jobsContainer.getBoundingClientRect();
      const containerTop  = containerRect.top + scrollY;
      const containerH    = jobsContainer.offsetHeight;
      const progress      = Math.max(0, Math.min(1, (scrollY - containerTop) / containerH));
      const sway          = Math.sin(progress * Math.PI * 6) * 18;
      traveler.style.marginLeft = sway + 'px';
    };

    const animFrame = () => {
      currentRotation = lerp(currentRotation, 0, 0.08);
      traveler.style.transform = `rotate(${currentRotation}deg)`;

      const travelerScreenY = window.innerHeight * 0.45;
      dotsRef.current.forEach((dot, i) => {
        if (!dot || revealedCards.has(i)) return;
        const dotRect = dot.getBoundingClientRect();
        if (dotRect.top <= travelerScreenY + 60) {
          revealedCards.add(i);
          const card = cardsRef.current[i];
          if (card) card.classList.add('visible');
        }
      });

      rafId = requestAnimationFrame(animFrame);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    document.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    rafId = requestAnimationFrame(animFrame);

    return () => {
      window.removeEventListener('scroll', onScroll);
      document.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section id="experience" className="exp-section" ref={sectionRef}>

      {/* Title — animates in on scroll */}
      <p className={`exp-sec-label exp-reveal${titleInView ? ' exp-reveal--visible' : ''}`}
         style={{ animationDelay: '0s' }}>
        // Career
      </p>
      <h2 className={`exp-sec-title exp-reveal${titleInView ? ' exp-reveal--visible' : ''}`}
          style={{ animationDelay: '0.15s' }}>
        The Road So Far
      </h2>

      <div className="exp-road-wrap">
        <div className="exp-jobs-container" ref={jobsContainerRef}>
          <div className="exp-road-strip" />
          <div className="exp-road-dashes" />
          <div className="exp-road-edge-l" />
          <div className="exp-road-edge-r" />

          <div className="exp-traveler-sticky">
            <div className="exp-traveler" ref={travelerRef}>
              <div className="exp-traveler-icon">🧑‍💻</div>
            </div>
          </div>

          {JOBS.map((job, i) => {
            const side = i % 2 === 0 ? 'left' : 'right';
            return (
              <div key={i} className={`exp-job-stop ${side}`}>
                <div className="exp-card-col">
                  <div
                    className="exp-job-card"
                    ref={(el) => { cardsRef.current[i] = el; }}
                    onClick={() => setModalJob(job)}
                  >
                    <p className="exp-jc-year">{job.year}</p>
                    <h3 className="exp-jc-title">{job.title}</h3>
                    <p className="exp-jc-company">{job.company}</p>
                    <p className="exp-jc-desc">{job.snippet}</p>
                    <div className="exp-jc-tags">
                      {job.tags.map((t, ti) => (
                        <span key={ti} className="exp-jc-tag">{t}</span>
                      ))}
                    </div>
                    <p className="exp-jc-cta">Read more →</p>
                  </div>
                </div>
                <div className="exp-road-col">
                  <div
                    className="exp-milestone-dot"
                    ref={(el) => { dotsRef.current[i] = el; }}
                  />
                </div>
                {/* Empty spacer col to balance layout on both sides */}
                <div className="exp-card-col exp-card-col--spacer" />
              </div>
            );
          })}

          <div style={{ height: '120px', position: 'relative', zIndex: 1 }} />
        </div>

        <div className="exp-road-end">
          <div className="exp-road-end-sign">
            <div className="exp-road-end-sign-board">
              <span className="exp-road-end-sign-top">Route 2026</span>
              <span className="exp-road-end-sign-main">
                <span className="exp-road-end-sign-star">✦</span>
                Still Travelling
                <span className="exp-road-end-sign-star">✦</span>
              </span>
              <span className="exp-road-end-sign-bottom">More stops ahead</span>
            </div>
          </div>
        </div>
      </div>

      <Modal job={modalJob} onClose={closeModal} />
    </section>
  );
}