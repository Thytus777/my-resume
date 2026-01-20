'use client';

import React from 'react';
import './About.css';

interface EducationItem {
  title: string;
  institution: string;
  score: string;
}

const education: EducationItem[] = [
  { title: "Software Engineering (honours) and Commerce (Major in Business Management)", institution: "Monash University", score: "3.0 GPA" },
  { title: "Victorian Certificate of Education", institution: "Lakeview Senior College", score: "94.35" },
];

export default function About() {
  return (
    <section id="about" className="about-section reveal">
      <h1 className="about-title">About Me</h1>

      <div className="about-container">
        {/* Education Column */}
        <div className="education-container">
          <h2 className="section-subtitle1">Education</h2>
          <div className="education-items">
            {education.map((edu, idx) => (
              <div key={idx} className="education-box">
                <h3 className="edu-title">{edu.title}</h3>
                <p className="edu-institution">{edu.institution}</p>
                <p className="edu-score">{edu.score}</p>
              </div>
            ))}
          </div>
        </div>

        {/* About Me Column */}
        <div className="about-text">
          <h2 className="section-subtitle">Who I Am</h2>
          <p className="about-paragraph-text">
            I am a passionate software developer dedicated to creating innovative software solutions
            that make an impact. I thrive on solving complex problems and constantly learning new
            technologies to build efficient, scalable, and user-friendly applications.
          </p>
        </div>
      </div>
    </section>
  );
}
