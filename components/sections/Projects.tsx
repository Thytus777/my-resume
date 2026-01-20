"use client";
import { useState } from "react";
import Image from "next/image";
import GlareButton from "../GlareButton";
import GlareOutlineButton from "../GlareOutlineButton";
import "./Projects.css";

interface Project {
  id: number;
  title: string;
  subtitle: string;
  image: string;
  description: string[];
  skills: string[];
  github?: string;
  live?: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "Automotive Detailing",
    subtitle: "Vue + Tailwind Frontend",
    image: "/projects/CK_logo.png",
    description: [
      "This website was created for a client to showcase their automotive detailing business. Version 1 focuses on sharing business information, services, and gallery images.",
      "Version 2, currently in development, will include a booking and payment system for a seamless customer experience.",
      "Through this project, I gained hands-on experience with Vue and Tailwind CSS, honed my skills in responsive design and UI/UX, and learned valuable lessons in client communication, requirement gathering, and managing real-world project expectations."
    ],
    skills: ["Vue", "Tailwind CSS", "UI/UX", "Responsive Design", "GIT"],
    github: "https://github.com/Thytus777/CK-detailing",
    live: "https://ck-detailing.netlify.app",
  },
  {
    id: 2,
    title: "MHSB Insurance",
    subtitle: "Insurance Website (In Progress)",
    image: "/projects/mhsb.png",
    description: [
      "This insurance platform allows users to buy and renew insurance policies online.",
      "Focused primarily on backend functionality, secure authentication, and handling sensitive data.",
      "Strengthened my understanding of web security, APIs, and scalable backend systems."
    ],
    skills: ["React", "Tailwind CSS", "Postgres", "JWT", "Postman"],
  },
  {
    id: 3,
    title: "All In One Real Estate",
    subtitle: "Agent-Tenant Management System",
    image: "/projects/all-in-one.png",
    description: [
      "Developed as part of an industry experience project with a team of 11 members.",
      "Allows agents to manage inspections, rental agreements, and communications.",
      "Gained experience working in Agile teams and handling real-world Git workflows."
    ],
    skills: ["React", "Node.js", "MongoDB", "Meteor", "Tailwind CSS"],
    github: "https://github.com/Monash-FIT3170/2025W1-All-In-One",
  }
];

export default function Projects() {
  const [modalProject, setModalProject] = useState<Project | null>(null);

  return (
    <>
      {/* Projects Section */}
      <section className="projects-section reveal" id="projects">
        <h1 className="projects-title">Projects</h1>

        <div className="projects-grid">
          {projects.map((project) => (
            <div
              key={project.id}
              className="project-card"
              onClick={() => setModalProject(project)}
            >
              <div className="project-image">
                <Image src={project.image} alt={project.title} fill className="img" />
              </div>

              <div className="project-header">
                <h3>{project.title}</h3>
                <p>{project.subtitle}</p>
              </div>

              <div className="project-skills">
                {project.skills.map((skill) => (
                  <span key={skill}>{skill}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Modal (outside the section) */}
      {modalProject && (
        <div className="modal-overlay" onClick={() => setModalProject(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setModalProject(null)}>
              ×
            </button>

            <div className="modal-body">
              {/* Skills Column */}
              <div className="modal-skills">
                <h5>Tech Stack</h5>
                {modalProject.skills.map((skill) => (
                  <span key={skill}>{skill}</span>
                ))}
              </div>

              {/* Text Column */}
              <div className="modal-left">
                <h2>{modalProject.title}</h2>
                <h4>{modalProject.subtitle}</h4>
                {modalProject.description.map((text, i) => (
                  <p key={i}>{text}</p>
                ))}
              </div>

              {/* Image Column */}
              <div className="modal-image-column">
                <div className="modal-image">
                  <Image
                    src={modalProject.image}
                    alt={modalProject.title}
                    fill
                    className="img"
                  />
                </div>

                <div className="modal-links">
                  {modalProject.github && (
                    <GlareOutlineButton href={modalProject.github} target="_blank">
                      GitHub
                    </GlareOutlineButton>
                  )}
                  {modalProject.live && (
                    <GlareButton href={modalProject.live} target="_blank">
                      Live
                    </GlareButton>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
