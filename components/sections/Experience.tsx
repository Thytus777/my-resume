'use client';

import React, { useState } from 'react';
import './Experience.css';

interface ExperienceCardProps {
  title: string;
  company: string;
  description: string[];
  skills: string[];
}

const ExperienceCard: React.FC<ExperienceCardProps> = ({
  title,
  company,
  description,
  skills,
}) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className={`experience-card ${expanded ? 'expanded' : ''}`}
      onClick={() => setExpanded(!expanded)}
    >
      <h3 className="job-title">{title}</h3>
      <p className="company">{company}</p>

      <div className={`arrow ${expanded ? 'rotated' : ''}`}>&#9662;</div>

      {/* Collapsed view */}
      {!expanded && (
        <div className="skills">
          {skills.slice(0, 3).map((skill) => (
            <span key={skill} className="skill">
              {skill}
            </span>
          ))}
          {skills.length > 3 && (
            <span className="more-skills">
              +{skills.length - 3} more
            </span>
          )}
        </div>
      )}

      {/* Expanded view */}
      <div className={`expanded-content ${expanded ? 'show' : ''}`}>
        <div className="description">
          {description.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>

        <div className="skills">
          {skills.map((skill) => (
            <span key={skill} className="skill">
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default function Experience() {
  const experiences = [
    {
      title: 'Senkou Academy',
      company: 'Tutor',
      description: [
        'Developed strong communication and interpersonal skills by teaching students with diverse personalities, learning styles, and academic backgrounds. Adapted explanations to ensure clarity and engagement.',
        'Managed time effectively by teaching multiple students concurrently, balancing lesson preparation, scheduling, and progress tracking under time constraints.',
        'Built leadership, patience, and problem-solving skills while maintaining a professional and supportive learning environment.',
      ],
      skills: ['Communication', 'Time Management', 'Leadership', 'Problem Solving'],
    },
    {
      title: '1Lynx Solutions',
      company: 'Full Stack Developer (Intern)',
      description: [
        'Worked as part of an agile development team, contributing to sprint planning, stand-ups, and iterative development of internal tools.',
        'Communicated directly with clients to gather requirements, clarify expectations, and ensure solutions aligned with business needs.',
        'Learned from senior developers through mentorship and code reviews, gaining experience with JWT authentication, databases, and application security.',
      ],
      skills: [
        'JavaScript',
        'HTML',
        'CSS',
        'Git',
        'Agile',
        'JWT',
        'PostgreSQL',
        'Security',
        'Postman',
      ],
    },
  ];

  return (
    <section id="experience" className="reveal">
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
