"use client";
import React from "react";
import "./Skills.css";

const skills = [
  "Python", "Java", "JavaScript", "TypeScript", "React", "Next.js", "Tailwind CSS", 
  "CSS", "HTML", "Node.js", "Express", "MongoDB", "PostgreSQL", "Git", "Docker", 
  "Kubernetes", "AWS", "Firebase", "GraphQL", "Redux", "Vue.js", "SASS", "Bootstrap",
  "C++", "C#", "Rust", "Go", "PHP", "Laravel", "Swift", "Kotlin", "Material UI",
  "Jest", "PyTest", "Postman", "REST API", "Agile", "Scrum", "CI/CD", "Linux", "Bash"
];

// Helper: assign skills to one of 4 rows randomly
const rowsCount = 4;
const rows: string[][] = Array.from({ length: rowsCount }, () => []);

skills.forEach(skill => {
  const randomRow = Math.floor(Math.random() * rowsCount);
  rows[randomRow].push(skill);
});

export default function Skills() {
  return (
    <section className="skills-section reveal" id="skills">
      <h1 className="skills-title">Skills</h1>

      <div className="skills-container">
        {rows.map((row, rowIndex) => (
          <div className={`skills-row row-${rowIndex}`} key={rowIndex}>
            <div className="skills-track">
              {row.concat(row).map((skill, i) => ( // duplicate for seamless loop
                <span className="skill-item" key={`${rowIndex}-${i}`}>
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
