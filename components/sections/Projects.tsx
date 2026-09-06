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
    title: 'Car Crash AI',
    desc: 'An AI-powered system that analyzes vehicle crash images to automatically identify damaged components and estimate repair costs. Users upload crash photos, and the system uses vision-enabled language models to detect the vehicle model and damaged parts before estimating replacement costs using external pricing data and search results. The platform demonstrates how AI models can be integrated with traditional software pipelines to automate complex real-world assessments.',
    bullets: [
      'Built an asynchronous FastAPI backend exposing REST endpoints for image uploads, AI damage analysis, and repair cost estimation workflows',
      'Integrated vision-capable LLMs (Gemini/OpenAI) to identify vehicle models and detect damaged components from uploaded crash images',
      'Implemented structured parsing pipelines to convert model outputs into machine-readable JSON damage reports used for downstream cost estimation',
      'Developed a multi-stage pricing pipeline combining live Google search (SerpAPI), structured CSV price datasets, and AI-based price estimation to determine replacement part costs',
      'Implemented image preprocessing and concurrent external API orchestration using Pillow, AsyncIO, and httpx',
      'Built a Streamlit interface to visualize uploaded images, detected damage areas, and generated repair cost reports',
      'Applied a structured AI engineering workflow using project-level Agents.md, Skills.md, Learning.md, and Setup.md files to guide AI-assisted research, experimentation, and system design',
    ],
    tech: ['Python', 'FastAPI', 'Streamlit', 'Gemini', 'OpenAI', 'SerpAPI', 'AsyncIO', 'Pillow'],
    cover: 'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?w=600&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?w=600&q=80',
      'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=600&q=80',
    ],
    status: 'live',
    statusLabel: 'Live | Demo Available',
    github: 'https://github.com/Thytus777/car-crash-ai',
  },
  {
    title: 'Automotive Detailing Booking',
    desc: 'A full-stack booking platform designed for automotive detailing businesses to manage customer appointments and service availability. Customers can browse services, select available time slots, and create bookings through a streamlined interface, while administrators manage schedules, bookings, and user accounts through a secure backend system. The platform prevents scheduling conflicts, handles timezone-aware bookings, and ensures reliable appointment management through database-level constraints and transactional logic.',
    bullets: [
      'Built a Vue.js frontend with a responsive Tailwind UI for service browsing, booking management, and real-time availability feedback',
      'Implemented a TypeScript-based Node.js/Express REST API using a layered architecture (Controller–Service–Repository) to enforce separation between API logic, business rules, and database access',
      'Designed a normalized PostgreSQL schema using UUID primary keys, foreign key constraints, and GiST exclusion constraints to prevent overlapping booking times directly at the database level',
      'Implemented secure authentication and authorization using JWT access tokens, refresh token rotation, bcrypt password hashing, and role-based access control (RBAC)',
      'Built availability validation logic with transactional queries, timezone-safe booking handling, and parameterized SQL queries to ensure data integrity and prevent race conditions',
      'Deployed the backend on Render and frontend on Netlify, configuring environment-based secrets, CORS policies, and secure service integration with Supabase',
      'Used a structured AI-assisted backend engineering workflow leveraging Agents.md, Skills.md, Learning.md, and Setup.md documentation to guide AI tools during development — primarily for database schema design suggestions, security hardening recommendations, and backend architecture validation, ensuring best practices in PostgreSQL constraints, authentication flows, and API security',
    ],
    tech: ['Vue.js', 'Tailwind CSS', 'TypeScript', 'Node.js', 'Express', 'PostgreSQL', 'Supabase', 'JWT'],
    cover: 'https://images.unsplash.com/photo-1507136566006-cfc505b114fc?w=600&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1507136566006-cfc505b114fc?w=600&q=80',
      'https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?w=600&q=80',
      'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=600&q=80',
    ],
    status: 'live',
    statusLabel: 'Live',
    live: 'https://ck-detailing.netlify.app',
  },
  {
    title: 'Merpati Insurance Platform',
    desc: 'A full-stack insurance management platform designed to support the creation, processing, and management of insurance quotes and policy applications. The system guides users through a multi-step quote workflow while allowing administrators and internal staff to manage applications, track status changes, and maintain audit trails. The platform emphasizes secure authentication, structured workflows, and reliable data management suitable for real-world insurance operations.',
    bullets: [
      'Built a React single-page application (SPA) interacting with a Spring Boot REST API designed using a layered architecture with JPA/Hibernate',
      'Modeled a normalized PostgreSQL schema including JSONB fields for flexible policy attributes, composite indexes for performance, and Flyway versioned migrations for reliable schema evolution',
      'Implemented stateless authentication using Spring Security and JWT, including BCrypt password hashing, RBAC authorization policies, and a custom security filter chain',
      'Designed a quote workflow state machine to manage multi-step insurance applications with status transitions, validation rules, and audit logging',
      'Configured secure production infrastructure, including HTTPS/TLS, CORS policies, and Docker-based local development environments',
      'Added integration testing using JUnit and Testcontainers, enabling reliable automated testing with real PostgreSQL instances',
    ],
    tech: ['React 19', 'Spring Boot 3', 'Spring Security', 'Java 17', 'PostgreSQL', 'JWT', 'Flyway', 'Docker'],
    cover: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&q=80',
      'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&q=80',
    ],
    status: 'wip',
    statusLabel: 'In Progress',
  },
  {
    title: 'All-In-One Property Management',
    desc: 'A real-time property management platform that enables landlords, tenants, and property managers to coordinate rental operations within a single system. The platform supports rental applications, maintenance ticket workflows, messaging between users, inspection scheduling, and document/media management. By leveraging Meteor\'s reactive data architecture, the system provides real-time updates across dashboards, ensuring users see live changes to property information, tickets, and communications.',
    bullets: [
      'Built a React-based frontend integrated with Meteor\'s real-time data layer, enabling live updates via DDP/WebSocket-based reactive synchronization',
      'Designed and maintained 20+ MongoDB collections using SimpleSchema validation for rental applications, inspection scheduling, ticket management, messaging, and role-specific dashboards',
      'Implemented secure authentication and role-based routing using Meteor Accounts with bcrypt password hashing and protected publications/subscriptions',
      'Integrated external services including Google Maps API, Gemini AI, Cloudinary, Azure Blob Storage, and SMTP email services for mapping, AI-powered price estimation, media storage, and notifications',
      'Deployed the system to Galaxy Cloud, configuring environment-specific API keys and implementing Mocha-based unit and integration tests',
    ],
    tech: ['React 18', 'Meteor 3', 'MongoDB', 'Tailwind CSS', 'MUI', 'WebSockets', 'Galaxy Cloud'],
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

  // ── Scroll-reveal state ──
  const [inView, setInView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const scrollAccRef = useRef(0);
  const scrollTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const cardWrapRef = useRef<HTMLDivElement>(null);
  const total = PROJECTS.length;

  // ── IntersectionObserver: fires once when section enters viewport ──
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect(); // only trigger once
        }
      },
      { threshold: 0.15 } // 15% of section visible before firing
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const goTo = useCallback((idx: number) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setIsFading(true);

    const next = ((idx % total) + total) % total;
    setCurrent(next);

    setTimeout(() => setIsFading(false), 220);
    setTimeout(() => setIsTransitioning(false), 600);
  }, [isTransitioning, total]);

  // Wheel handler on card
  useEffect(() => {
    const el = cardWrapRef.current;
    if (!el) return;

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

    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
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
  const projectNumber = String(current + 1).padStart(2, '0');

  // Helper: build class string, adding prj-reveal only once inView is true
  const reveal = (base: string, delay: string) =>
    `${base} prj-reveal${inView ? ' prj-reveal--visible' : ''}`;

  return (
    <section id="projects" className="prj-circular-section" ref={sectionRef}>

      {/* Header — animates in first */}
      <p
        className={reveal('prj-section-label', '0s')}
        style={{ animationDelay: '0s' }}
      >
        // selected work
      </p>
      <h2
        className={reveal('prj-section-title', '0.15s')}
        style={{ animationDelay: '0.15s' }}
      >
        Projects
      </h2>

      <div className="prj-showcase">
        {/* TOP: title + description (full width) */}
        <div
          className={reveal('prj-project-header', '0.3s')}
          style={{ animationDelay: '0.3s' }}
        >
          <p className="prj-project-number">Project {projectNumber}</p>
          <div className="prj-title-stack">
            {PROJECTS.map((proj, i) => (
              <h3 key={i} className={`prj-project-title ${i === current ? 'active' : ''}`}>
                {proj.title}
              </h3>
            ))}
          </div>
          <div className={`prj-project-desc-wrap ${isFading ? 'fading' : ''}`}>
            <p className="prj-project-desc">{p.desc}</p>
          </div>
        </div>

        {/* BOTTOM LEFT: bullets, tech, links */}
        <div
          className={reveal('prj-project-info', '0.4s')}
          style={{ animationDelay: '0.4s' }}
        >
          <div className={`prj-project-details ${isFading ? 'fading' : ''}`}>
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

        {/* BOTTOM RIGHT: image card */}
        <div
          className={reveal('prj-carousel-wrap', '0.5s')}
          style={{ animationDelay: '0.5s' }}
          ref={cardWrapRef}
        >
          <div className="prj-notch-card">
            {PROJECTS.map((proj, i) => (
              <div key={i} className={`prj-card-slide ${i === current ? 'active' : ''}`}>
                <img src={proj.cover} alt={proj.title} loading="lazy" />
              </div>
            ))}
            <div className={`prj-notch prj-notch--${p.status}`}>
              <span className="prj-notch-pulse" />
              {p.statusLabel}
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
            <span>{projectNumber}</span> / {String(total).padStart(2, '0')}
          </p>
        </div>
      </div>

      {/* Gallery Modal */}
      <div
        className={`prj-modal-overlay ${modalOpen ? 'open' : ''}`}
        onClick={(e) => { if (e.target === e.currentTarget) setModalOpen(false); }}
      >
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