"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./Navbar.css";

const sections = [
  { id: "hero", label: "Home" },
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
];

export default function Navbar() {
  const [active, setActive] = useState("hero");
  const listRef = useRef<HTMLUListElement>(null);
  const [highlightProps, setHighlightProps] = useState({ left: 0, width: 0 });

  // Update highlight position
  const updateHighlight = (id: string) => {
    const list = listRef.current;
    if (!list) return;

    const item = Array.from(list.children).find(
      (li) => li.id === `nav-${id}`
    ) as HTMLElement;

    if (!item) return;

    setHighlightProps({
      left: item.offsetLeft,
      width: item.offsetWidth,
    });
  };

  useEffect(() => {
    updateHighlight(active);
  }, [active]);

  // IntersectionObserver for scrolling
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    sections.forEach(({ id }) => {
      const section = document.getElementById(id);
      if (!section) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActive(id);
          }
        },
        { rootMargin: "-50% 0px -50% 0px" }
      );

      observer.observe(section);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <nav className="navbar">
      <ul className="navbar-list" ref={listRef}>
        {/* Animated highlight */}
        <AnimatePresence>
          <motion.div
            key={active}
            className="navbar-highlight"
            initial={false}
            animate={{
              left: highlightProps.left,
              width: highlightProps.width,
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
            }}
            style={{
              position: "absolute",
              top: "50%",
              transform: "translateY(-50%)",
              height: "40px",
              borderRadius: "9999px",
              background: "linear-gradient(135deg, #6a55ff, #3b6cff)",
              zIndex: 0,
            }}
          />
        </AnimatePresence>

        {sections.map(({ id, label }) => (
          <li key={id} id={`nav-${id}`} className="navbar-item">
            <a href={`#${id}`}>{label}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
