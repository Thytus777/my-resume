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
      className={`exp-modal-overlay${job ? ' open' : ''}`}
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

  const sectionRef       = useRef<HTMLElement>(null);
  const travelerRef      = useRef<HTMLDivElement>(null);
  const jobsRef          = useRef<HTMLDivElement>(null);
  const cardsRef         = useRef<(HTMLDivElement | null)[]>([]);
  const dotsRef          = useRef<(HTMLDivElement | null)[]>([]);
  const [titleInView, setTitleInView] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setTitleInView(true); obs.disconnect(); }
    }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const traveler = travelerRef.current;
    const jobs = jobsRef.current;
    if (!traveler || !jobs) return;

    let currentRotation = 0;
    let lastScrollY = window.scrollY;
    const revealedCards = new Set<number>();
    let rafId: number;
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const onScroll = () => {
      const scrollY = window.scrollY;
      const delta = scrollY - lastScrollY;
      lastScrollY = scrollY;
      currentRotation = lerp(currentRotation, Math.max(-15, Math.min(15, delta * 1.5)), 0.2);
      traveler.style.transform = `rotate(${currentRotation}deg)`;
      const rect = jobs.getBoundingClientRect();
      const progress = Math.max(0, Math.min(1, (scrollY - (rect.top + scrollY)) / jobs.offsetHeight));
      traveler.style.marginLeft = `${Math.sin(progress * Math.PI * 6) * 18}px`;
    };

    const animFrame = () => {
      currentRotation = lerp(currentRotation, 0, 0.08);
      traveler.style.transform = `rotate(${currentRotation}deg)`;
      const threshold = window.innerHeight * 0.45 + 60;
      dotsRef.current.forEach((dot, i) => {
        if (!dot || revealedCards.has(i)) return;
        if (dot.getBoundingClientRect().top <= threshold) {
          revealedCards.add(i);
          cardsRef.current[i]?.classList.add('visible');
        }
      });
      rafId = requestAnimationFrame(animFrame);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    rafId = requestAnimationFrame(animFrame);
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section id="experience" className="exp-section" ref={sectionRef}>
      <p className={`exp-sec-label exp-reveal${titleInView ? ' exp-reveal--visible' : ''}`}
         style={{ animationDelay: '0s' }}>
        // Career
      </p>
      <h2 className={`exp-sec-title exp-reveal${titleInView ? ' exp-reveal--visible' : ''}`}
          style={{ animationDelay: '0.15s' }}>
        The Road So Far
      </h2>

      <div className="exp-wrap">

        {/* Visual road — purely decorative, centered with CSS */}
        <div className="exp-road" aria-hidden="true">
          <div className="exp-road__dashes" />
        </div>

        {/* Traveler sticks to viewport center as you scroll */}
        <div className="exp-traveler-rail">
          <div className="exp-traveler" ref={travelerRef}>
            <img src="/roller_skating.png" alt="" className="exp-traveler__img" />
          </div>
        </div>

        {/* All job stops */}
        <div className="exp-stops" ref={jobsRef}>
          {JOBS.map((job, i) => {
            const side = i % 2 === 0 ? 'left' : 'right';
            return (
              <div key={i} className={`exp-stop exp-stop--${side}`}>

                {/* The dot sits at position: absolute, left: 50% of exp-stops */}
                <div
                  className="exp-dot"
                  ref={(el) => { dotsRef.current[i] = el; }}
                />

                {/* Card floats to left or right of center */}
                <div
                  className="exp-card"
                  ref={(el) => { cardsRef.current[i] = el; }}
                  onClick={() => setModalJob(job)}
                >
                  <p className="exp-card__year">{job.year}</p>
                  <h3 className="exp-card__title">{job.title}</h3>
                  <p className="exp-card__company">{job.company}</p>
                  <p className="exp-card__snippet">{job.snippet}</p>
                  <div className="exp-card__tags">
                    {job.tags.map((t, ti) => (
                      <span key={ti} className="exp-card__tag">{t}</span>
                    ))}
                  </div>
                  <p className="exp-card__cta">Read more →</p>
                </div>

              </div>
            );
          })}
          <div className="exp-stops__spacer" />
        </div>

        {/* End sign */}
        <div className="exp-end">
          <div className="exp-end__board">
            <span className="exp-end__top">Route 2026</span>
            <span className="exp-end__main">✦ Still Travelling ✦</span>
            <span className="exp-end__sub">More stops ahead</span>
          </div>
        </div>

      </div>

      <Modal job={modalJob} onClose={closeModal} />
    </section>
  );
}