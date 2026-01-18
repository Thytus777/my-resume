'use client';

import React, { useState } from 'react';
import './Experience.css';

interface ExperienceCardProps {
  title: string;
  company: string;
  description: string;
  skills: string[];
}

const ExperienceCard: React.FC<ExperienceCardProps> = ({ title, company, description, skills }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className={`experience-card ${expanded ? 'expanded' : ''}`} onClick={() => setExpanded(!expanded)}>
      <h3 className="job-title">{title}</h3>
      <p className="company">{company}</p>
      <div className={`arrow ${expanded ? 'rotated' : ''}`}>&#9662;</div>

      {/* Initial 3 skills */}
      {!expanded && (
        <div className="skills">
          {skills.slice(0, 3).map((skill) => (
            <span key={skill} className="skill">{skill}</span>
          ))}
          {skills.length > 3 && <span className="more-skills">+{skills.length - 3} more</span>}
        </div>
      )}

      {/* Expanded content */}
      <div className={`expanded-content ${expanded ? 'show' : ''}`}>
        <p className="description">{description}</p>
        <div className="skills">
          {skills.map((skill) => (
            <span key={skill} className="skill">{skill}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default function Experience() {
  const experiences = [
    {
      title: "Frontend Developer",
      company: "TechCorp Inc.",
      description: "Developed responsive web applications with React and TypeScript, collaborating with UX designers to implement modern UI/UX.",
      skills: ['React', 'TypeScript', 'CSS', 'Tailwind', 'Next.js'],
    },
    {
      title: "Junior Software Engineer",
      company: "Innovate Solutions",
      description: "Assisted in building internal tools, optimized code performance, and participated in code reviews following best practices.",
      skills: ['JavaScript', 'HTML', 'CSS', 'Git', 'Agile'],
    },
  ];

  return (
    <section id="experience">
      <h1>Experience</h1>
      <div className="experience-container">
        {experiences.map((exp, idx) => (
          <ExperienceCard
            key={idx}
            title={exp.title}
            company={exp.company}
            description={exp.description}
            skills={exp.skills}
          />
        ))}
      </div>
    </section>
  );
}
