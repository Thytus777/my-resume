'use client';

import React, { useEffect, useState } from 'react';
import './Navbar.css';

const sections = ['hero', 'about', 'experience', 'projects', 'skills', 'certifications'];

export default function Navbar() {
  const [active, setActive] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 100; // offset from top
      let currentSection = 'hero';

      // Check sections in reverse order to prioritize later sections
      for (let i = sections.length - 1; i >= 0; i--) {
        const sectionId = sections[i];
        const section = document.getElementById(sectionId);
        if (section) {
          const offsetTop = section.offsetTop;
          if (scrollPos >= offsetTop) {
            currentSection = sectionId;
            break;
          }
        }
      }

      setActive(currentSection);
    };

    // Throttle scroll events for better performance
    let timeoutId: NodeJS.Timeout;
    const throttledScroll = () => {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(handleScroll, 50);
    };

    window.addEventListener('scroll', throttledScroll);
    handleScroll(); // initial check
    
    return () => {
      window.removeEventListener('scroll', throttledScroll);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <nav className="navbar">
      <ul className="navbar-list">
        {sections.map((section) => (
          <li key={section} className={`navbar-item ${active === section ? 'active' : ''}`}>
            <a 
              href={`#${section}`}
              onClick={(e) => handleClick(e, section)}
            >
              {section.charAt(0).toUpperCase() + section.slice(1)}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}