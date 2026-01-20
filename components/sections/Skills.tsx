import React from 'react';
import './Skills.css';
import { IoIosGlobe } from "react-icons/io";
import { DiAptana } from "react-icons/di";
import { GrConfigure } from "react-icons/gr";

const Skills: React.FC = () => {
  const skillsData = [
    {
      category: 'Frontend',
      icon: <IoIosGlobe size={24} />, // Using React Icon here
      skills: ['React', 'TypeScript', 'JavaScript', 'HTML5', 'CSS', 'Tailwind CSS', 'Next.js', 'Vite']
    },
    {
      category: 'Backend',
      icon: <DiAptana size={24} />, // React Icon
      skills: ['Node.js', 'Express', 'Python', 'Java', 'PostgreSQL', 'MongoDB', 'REST APIs', 'OracleDB', 'Java', 'C++', 'C']
    },
    {
      category: 'Tools & Others',
      icon: <GrConfigure size={24} />, // React Icon
      skills: ['Git', 'Docker', 'AWS', 'Figma', 'Postman', 'CI/CD', 'Agile', 'Jira', 'Netlify', 'Spring Boot', 'JWT', 'Cloudinary']
    }
  ];

  return (
    <div className="skills-section">
      {skillsData.map((category, index) => (
        <div key={index} className="skill-container">
          <div className="skill-heading">
            <h3>
              <span className="skill-icon">{category.icon}</span>
              {category.category}
            </h3>
          </div>
          <div className="skills-content">
            {category.skills.map((skill, skillIndex) => (
              <span key={skillIndex} className="skill-pill">
                {skill}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Skills;
