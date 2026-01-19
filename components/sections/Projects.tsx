"use client";

import { useState } from "react";
import Image from "next/image";
import "./Projects.css";

interface Project {
  id: number;
  title: string;
  subtitle: string;
  image: string;
  description: string;
  skills: string[];
  github?: string;
  live?: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "Automotive Detailing Website",
    subtitle: "Vue + Tailwind Frontend",
    image: "/projects/detailing.png",
    description:
      "A modern automotive detailing website with smooth animations and responsive layout. Future plans include bookings and payments.",
    skills: ["Vue", "Tailwind CSS", "UI/UX", "Responsive Design"],
    github: "https://github.com/yourname",
    live: "https://your-site.com"
  },
  {
    id: 2,
    title: "Portfolio Resume Website",
    subtitle: "Next.js + React",
    image: "/projects/portfolio.png",
    description:
      "Personal resume website built with Next.js App Router featuring animated sections, particles background, and clean UI.",
    skills: ["Next.js", "React", "CSS", "Animations"],
    github: "https://github.com/yourname"
  },
  {
    id: 3,
    title: "Portfolio Resume Website",
    subtitle: "Next.js + React",
    image: "/projects/portfolio.png",
    description:
      "Personal resume website built with Next.js App Router featuring animated sections, particles background, and clean UI.",
    skills: ["Next.js", "React", "CSS", "Animations"],
    github: "https://github.com/yourname"
  },
  {
    id: 4,
    title: "Portfolio Resume Website",
    subtitle: "Next.js + React",
    image: "/projects/portfolio.png",
    description:
      "Personal resume website built with Next.js App Router featuring animated sections, particles background, and clean UI.",
    skills: ["Next.js", "React", "CSS", "Animations"],
    github: "https://github.com/yourname"
  },
  {
    id: 5,
    title: "Portfolio Resume Website",
    subtitle: "Next.js + React",
    image: "/projects/portfolio.png",
    description:
      "Personal resume website built with Next.js App Router featuring animated sections, particles background, and clean UI.",
    skills: ["Next.js", "React", "CSS", "Animations"],
    github: "https://github.com/yourname"
  }
];

export default function Projects() {
  const [activeId, setActiveId] = useState<number | null>(null);

  return (
    <section className="projects-section" id ="projects">
      <h1>Projects</h1>

      <div className="projects-grid">
        {projects.map((project) => {
          const isOpen = activeId === project.id;

          return (
            <div
              key={project.id}
              className={`project-card ${isOpen ? "open" : ""}`}
              onClick={() => setActiveId(isOpen ? null : project.id)}
            >
              {/* Image */}
              <div className="project-image">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="img"
                />
              </div>

              {/* Header */}
              <div className="project-header">
                <h3>{project.title}</h3>
                <p>{project.subtitle}</p>
              </div>

              {/* Expandable */}
              <div className="project-content">
                <p className="project-description">
                  {project.description}
                </p>

                <div className="project-skills">
                  {project.skills.map((skill) => (
                    <span key={skill}>{skill}</span>
                  ))}
                </div>

                <div className="project-links">
                  {project.github && (
                    <a href={project.github} target="_blank">
                      GitHub →
                    </a>
                  )}
                  {project.live && (
                    <a href={project.live} target="_blank">
                      Live →
                    </a>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
