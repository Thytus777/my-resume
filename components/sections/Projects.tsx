"use client";
import { useState } from "react";
import Image from "next/image";
import GlareButton from "../GlareButton"; // filled glare
import GlareOutlineButton from "../GlareOutlineButton"; // outline glare
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
      "Through this project, I gained hands-on experience with Vue and Tailwind CSS, honed my skills in responsive design and UI/UX, and learned valuable lessons in client communication, requirement gathering, and managing real-world project expectations as my first professional client project."
    ],
    skills: ["Vue", "Tailwind CSS", "UI/UX", "Responsive Design", "GIT"],
    github: "https://github.com/Thytus777/CK-detailing",
    live: "https://ck-detailing.netlify.app",
  },
  {
    id: 2,
    title: "MHSB Insurance",
    subtitle: "Insurance Website (In Progress)",
    image: "/projects/mhsb.jpg",
    description: [
      "This insurance platform allows users to buy and renew insurance policies online, providing a secure and reliable experience.",
      "During development, I focused primarily on backend functionality, including database management, secure user authentication, and handling sensitive data responsibly.",
      "This project helped me strengthen my understanding of web security best practices, API development, and server-side logic, while also learning to implement robust and scalable backend systems for real-world applications."
    ],
    skills: ["GIT", "React", "Tailwind CSS", "PostGres", "JWT Auth", "Postman"],
  },
  {
    id: 3,
    title: "All In One Real Estate",
    subtitle: "Agent-Tenant Management System",
    image: "/projects/all-in-one.png",
    description: [
      "This real estate platform was developed as part of an industry experience project during university, working for a full year with a team of 11 members.",
      "The system allows agents to efficiently manage tenant inspections, rental agreements, and all tenant communications in one place, providing a streamlined workflow for property management.",
      "Through this project, I gained practical experience in client communication, working within an Agile methodology, and maintaining team organization, which was essential for coordinating tasks, handling Git merges, and collaborating effectively on a large-scale team project."
    ],
    skills: ["React", "Node.js", "MongoDB", "Meteor", "Tailwind CSS", "Cloudinary API", "Google API"],
    github: "https://github.com/Monash-FIT3170/2025W1-All-In-One",
    live: "https://realestate-site.com",
  }
];

export default function Projects() {
  const [modalProject, setModalProject] = useState<Project | null>(null);

  return (
    <section className="projects-section" id="projects">
      <h1 className="projects-title">Projects</h1>

      <div className="projects-grid">
        {projects.map((project) => (
          <div
            key={project.id}
            className="project-card"
            onClick={() => setModalProject(project)}
          >
            <div className="project-image">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="img"
              />
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

      {/* MODAL */}
      {modalProject && (
        <div className="modal-overlay" onClick={() => setModalProject(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button
              className="modal-close"
              onClick={() => setModalProject(null)}
            >
              ×
            </button>

            <div className="modal-body">
              {/* LEFT – TECH STACK */}
              <div className="modal-skills">
                <h5>Tech Stack</h5>
                {modalProject.skills.map((skill) => (
                  <span key={skill}>{skill}</span>
                ))}
              </div>

              {/* CENTER – CONTENT */}
              <div className="modal-left">
                <h2>{modalProject.title}</h2>
                <h4>{modalProject.subtitle}</h4>

                {modalProject.description.map((text, i) => (
                  <p key={i}>{text}</p>
                ))}
              </div>

              {/* RIGHT – IMAGE + LINKS */}
              <div className="modal-image-column">
                <div className="modal-image">
                  <Image
                    src={modalProject.image}
                    alt={modalProject.title}
                    fill
                    className="img"
                  />
                </div>

                <div className="modal-links" style={{ marginTop: "16px", display: "flex", gap: "16px" }}>
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
    </section>
  );
}
