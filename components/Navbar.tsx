"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import "./Navbar.css";

const sections = [
  { id: "hero", label: "Home" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
];

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&";

function useScramble(original: string) {
  const [display, setDisplay] = useState(original);
  const frameRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const scramble = useCallback(() => {
    let iteration = 0;
    const totalFrames = original.length * 3;

    if (frameRef.current) clearInterval(frameRef.current);

    frameRef.current = setInterval(() => {
      setDisplay(
        original
          .split("")
          .map((char, i) => {
            if (char === " ") return " ";
            if (i < iteration / 3) return original[i];
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join("")
      );

      iteration++;
      if (iteration > totalFrames) {
        clearInterval(frameRef.current!);
        setDisplay(original);
      }
    }, 30);
  }, [original]);

  const reset = useCallback(() => {
    if (frameRef.current) clearInterval(frameRef.current);
    setDisplay(original);
  }, [original]);

  useEffect(() => () => { if (frameRef.current) clearInterval(frameRef.current); }, []);

  return { display, scramble, reset };
}

function NavItem({
  id,
  label,
  isActive,
  index,
}: {
  id: string;
  label: string;
  isActive: boolean;
  index: number;
}) {
  const { display, scramble, reset } = useScramble(label);

  return (
    <motion.li
      id={`nav-${id}`}
      className={`navbar-item ${isActive ? "active" : ""}`}
      initial={{ opacity: 0, y: -12, filter: "blur(4px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{
        delay: 0.1 + index * 0.08,
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <a
        href={`#${id}`}
        onMouseEnter={scramble}
        onMouseLeave={reset}
      >
        <span className="nav-label">{display}</span>
        {isActive && <span className="active-glow-outline" aria-hidden="true" />}
      </a>
    </motion.li>
  );
}

export default function Navbar() {
  const [active, setActive] = useState("hero");
  const listRef = useRef<HTMLUListElement>(null);
  const [highlightProps, setHighlightProps] = useState({ left: 0, width: 0 });
  const [mobileOpen, setMobileOpen] = useState(false);

  const updateHighlight = (id: string) => {
    const list = listRef.current;
    if (!list) return;
    const item = Array.from(list.children).find(
      (li) => (li as HTMLElement).id === `nav-${id}`
    ) as HTMLElement;
    if (!item) return;
    setHighlightProps({ left: item.offsetLeft, width: item.offsetWidth });
  };

  useEffect(() => { updateHighlight(active); }, [active]);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    sections.forEach(({ id }) => {
      const section = document.getElementById(id);
      if (!section) return;
      const observer = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id); },
        { rootMargin: "-50% 0px -50% 0px" }
      );
      observer.observe(section);
      observers.push(observer);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <motion.nav
      className="navbar"
      initial={{ opacity: 0, x: "-50%", y: -20 }}
      animate={{ opacity: 1, x: "-50%", y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <div
        className={`hamburger ${mobileOpen ? "open" : ""}`}
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        <div /><div /><div />
      </div>

      <ul
        className={`navbar-list ${mobileOpen ? "open" : ""}`}
        ref={listRef}
        onClick={() => setMobileOpen(false)}
      >
        {/* Sliding neon outline highlight — desktop only */}
        <motion.div
          className="navbar-highlight"
          animate={{ left: highlightProps.left, width: highlightProps.width }}
          transition={{ type: "spring", stiffness: 320, damping: 32 }}
        />

        {sections.map(({ id, label }, index) => (
          <NavItem key={id} id={id} label={label} isActive={active === id} index={index} />
        ))}
      </ul>
    </motion.nav>
  );
}