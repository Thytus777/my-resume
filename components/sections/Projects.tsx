'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import './Projects.css';

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
    desc: 'An AI-powered system that analyzes vehicle crash photos to identify damage, estimate repair costs, and generate downloadable reports. What began as a Streamlit prototype has grown into a full-stack Next.js/FastAPI application with persistent history, PDF reporting, and VIN-based vehicle identification, alongside a standalone native iOS client that runs the same AI pipeline independently on-device.',
    bullets: [
      'Rebuilt the original Streamlit MVP into a production Next.js 15 + FastAPI application with a typed API client, PostgreSQL persistence (SQLAlchemy async + Alembic migrations), and Dockerized deployment via docker-compose',
      'Designed a zone-based damage detection pipeline running three focused LLM passes (front/rear/side) merged by worst-severity-per-component, plus an optional consensus mode that runs Gemini and OpenAI in parallel and flags disagreement above a divergence threshold',
      'Integrated the NHTSA vPIC API for authoritative VIN-based vehicle identification, falling back to vision-LLM identification when no VIN is provided',
      'Built a price estimation cascade — live Google search via SerpAPI, a static CSV fallback, and AI-based estimation as a last resort — combined with labor costs into a full repair estimate',
      'Added a second-pass LLM sanity check reviewing each report for cost/severity coherence before returning it to the user',
      'Implemented Jinja2/WeasyPrint PDF report generation with an HTML fallback, plus a PostgreSQL-backed estimate history endpoint',
      'Built a standalone native iOS app (SwiftUI) running the same damage-assessment pipeline independently on-device, with its own Gemini/OpenAI abstraction layer and automatic provider fallback on rate limits',
    ],
    tech: ['Python', 'FastAPI', 'Next.js', 'PostgreSQL', 'Swift', 'SwiftUI', 'Gemini', 'OpenAI', 'Docker', 'SerpAPI'],
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
    status: 'live',
    statusLabel: 'Live',
  },
  {
    title: 'Fashion Transparency Platform',
    desc: 'A multi-tenant B2B SaaS platform that lets fashion brands obtain Digital Product Passport (DPP) certifications and expose them to shoppers through an embeddable sustainability widget. Brand teams, artisans, and third-party auditors each get isolated, role-appropriate dashboards for managing product, provenance, and certification data — built to scale across many concurrent tenants without data leaking between brands.',
    bullets: [
      'Built a multi-tenant B2B SaaS platform enabling fashion brands to obtain Digital Product Passport certifications via an embeddable sustainability widget',
      'Designed a normalised PostgreSQL schema supporting concurrent brand dashboards for product, artisan, and certification data across isolated tenants',
      'Implemented a subscription and credentialing system with role-based access control for brand admins and third-party auditors',
      'Built responsive brand dashboards with React, Next.js, and Tailwind CSS for managing certification workflows',
      'Deployed on AWS with environment-secured RDS and S3 storage, backed by a Node.js API layer',
    ],
    tech: ['React', 'Next.js', 'Tailwind CSS', 'Node.js', 'PostgreSQL', 'AWS (S3, EC2, RDS)'],
    cover: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&q=80',
      'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=600&q=80',
    ],
    status: 'wip',
    statusLabel: 'Completed',
  },
  {
    title: 'Gait Detection & Biometric Identification',
    desc: 'A biometric identification system built in collaboration with the Australian Federal Police that uses human gait as a unique identifier. Per-subject temporal gait signatures are extracted from raw video via pose estimation, then used to re-identify individuals across footage captured under different camera angles, clothing, and terrain — engineered against forensic-grade reliability standards rather than typical consumer-app tolerances.',
    bullets: [
      'Developed a biometric identification system using human gait as a unique identifier, in collaboration with the Australian Federal Police',
      'Built per-subject temporal gait signatures from raw video input using MediaPipe pose estimation',
      'Engineered a feature extraction and classification pipeline with OpenCV, PyTorch, and scikit-learn to re-identify subjects across sessions',
      'Designed the pipeline to remain robust across variable conditions including camera angle, clothing, and terrain',
      'Optimised model robustness with a focus on minimising false positives to meet forensic-grade reliability standards for federal law enforcement use',
    ],
    tech: ['Python', 'OpenCV', 'MediaPipe', 'PyTorch', 'scikit-learn'],
    cover: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&q=80',
      'https://images.unsplash.com/photo-1516110833967-0b5716ca1387?w=600&q=80',
    ],
    status: 'wip',
    statusLabel: 'Research Collaboration',
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
  const [selected, setSelected] = useState<number | null>(null);
  const [galleryIndex, setGalleryIndex] = useState<number | null>(null);

  // ── Scroll-reveal state ──
  const [inView, setInView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const closeModal = useCallback(() => {
    setSelected(null);
    setGalleryIndex(null);
  }, []);

  // Keyboard nav for modal
  useEffect(() => {
    if (selected === null) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (galleryIndex !== null) setGalleryIndex(null);
        else closeModal();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [selected, galleryIndex, closeModal]);

  const active = selected !== null ? PROJECTS[selected] : null;

  return (
    <section id="projects" className="prj-section" ref={sectionRef}>
      <p className={`prj-section-label prj-reveal${inView ? ' prj-reveal--visible' : ''}`} style={{ animationDelay: '0s' }}>
        // selected work
      </p>
      <h2 className={`prj-section-title prj-reveal${inView ? ' prj-reveal--visible' : ''}`} style={{ animationDelay: '0.1s' }}>
        Projects
      </h2>

      <div className="prj-log">
        {PROJECTS.map((proj, i) => (
          <button
            key={i}
            type="button"
            className={`prj-row prj-reveal${inView ? ' prj-reveal--visible' : ''}`}
            style={{ animationDelay: `${0.08 + i * 0.09}s` }}
            onClick={() => setSelected(i)}
          >
            <span className="prj-row-index">{String(i + 1).padStart(2, '0')}</span>

            <div className="prj-row-media">
              <img src={proj.cover} alt={proj.title} loading="lazy" />
              <div className={`prj-notch prj-notch--${proj.status}`}>
                <span className="prj-notch-pulse" />
                {proj.statusLabel}
              </div>
            </div>

            <div className="prj-row-body">
              <h3 className="prj-row-title">{proj.title}</h3>
              <p className="prj-row-desc">{proj.desc}</p>
              <div className="prj-tech-tags">
                {proj.tech.slice(0, 5).map((t, ti) => (
                  <span key={ti} className="prj-tech-tag">{t}</span>
                ))}
                {proj.tech.length > 5 && (
                  <span className="prj-tech-tag prj-tech-tag--more">+{proj.tech.length - 5}</span>
                )}
              </div>
            </div>

            <span className="prj-row-cta">
              View Details
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
          </button>
        ))}
      </div>

      {/* Detail Modal */}
      <div
        className={`prj-modal-overlay ${active ? 'open' : ''}`}
        onClick={(e) => { if (e.target === e.currentTarget) closeModal(); }}
      >
        {active && (
          <div className="prj-modal-box">
            <div className="prj-modal-header">
              <div>
                <h3>{active.title}</h3>
                <div className={`prj-notch prj-notch--${active.status} prj-notch--inline`}>
                  <span className="prj-notch-pulse" />
                  {active.statusLabel}
                </div>
              </div>
              <button className="prj-modal-close" onClick={closeModal} aria-label="Close">✕</button>
            </div>

            <div className="prj-modal-scroll">
              <img className="prj-modal-cover" src={active.cover} alt={active.title} />

              <p className="prj-modal-desc">{active.desc}</p>

              <ul className="prj-project-bullets">
                {active.bullets.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>

              <div className="prj-info-divider" />

              <div>
                <p className="prj-tech-label">Tech Stack</p>
                <div className="prj-tech-tags">
                  {active.tech.map((t, i) => (
                    <span key={i} className="prj-tech-tag">{t}</span>
                  ))}
                </div>
              </div>

              {active.gallery.length > 0 && (
                <div>
                  <p className="prj-tech-label">Gallery</p>
                  <div className="prj-modal-gallery">
                    {active.gallery.map((src, i) => (
                      <img
                        key={i}
                        src={src}
                        alt={`${active.title} screenshot ${i + 1}`}
                        loading="lazy"
                        onClick={() => setGalleryIndex(i)}
                      />
                    ))}
                  </div>
                </div>
              )}

              <div className="prj-project-links">
                {active.live && (
                  <a href={active.live} target="_blank" rel="noopener noreferrer" className="prj-view-btn">
                    Live Demo
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </a>
                )}
                {active.github && (
                  <a href={active.github} target="_blank" rel="noopener noreferrer" className="prj-view-btn ghost">
                    GitHub
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </a>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Lightbox for gallery images */}
      <div
        className={`prj-lightbox-overlay ${galleryIndex !== null ? 'open' : ''}`}
        onClick={() => setGalleryIndex(null)}
      >
        {active && galleryIndex !== null && (
          <img src={active.gallery[galleryIndex]} alt="expanded screenshot" />
        )}
      </div>
    </section>
  );
}
