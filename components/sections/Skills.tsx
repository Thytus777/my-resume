"use client";

import { useState, useEffect, useRef } from "react";
import "./Skills.css";

const CATEGORIES: Record<string, { label: string; color: string; bg: string }> = {
  lang:   { label: "Languages",      color: "#ff6a00", bg: "#2a1a0f" },
  frame:  { label: "Frameworks",     color: "#ff8c00", bg: "#2a1e0f" },
  infra:  { label: "Infrastructure", color: "#cc5500", bg: "#261a0f" },
  data:   { label: "Data & AI",      color: "#e07020", bg: "#261808" },
  tools:  { label: "Tools",          color: "#ffad33", bg: "#2a200a" },
  db:     { label: "Databases",      color: "#d4750a", bg: "#261a08" },
};

const SKILLS = [
  // ── s-block left: Languages (cols 1–2) ──
  { sym: "JS",  name: "JavaScript",    num: 1,  pro: 90, cat: "lang",  row: 1, col: 1  },
  { sym: "Ts",  name: "TypeScript",    num: 2,  pro: 85, cat: "lang",  row: 1, col: 2  },
  { sym: "Py",  name: "Python",        num: 3,  pro: 88, cat: "lang",  row: 2, col: 1  },
  { sym: "Jv",  name: "Java",          num: 4,  pro: 83, cat: "lang",  row: 2, col: 2  },
  { sym: "Sq",  name: "SQL",           num: 5,  pro: 82, cat: "lang",  row: 3, col: 1  },
  { sym: "Sw",  name: "Swift",         num: 6,  pro: 58, cat: "lang",  row: 3, col: 2  },

  // ── d-block centre: Frontend frameworks (row 1, cols 3–8) ──
  { sym: "Rx",  name: "React",         num: 7,  pro: 90, cat: "frame", row: 1, col: 3  },
  { sym: "Nx",  name: "Next.js",       num: 8,  pro: 82, cat: "frame", row: 1, col: 4  },
  { sym: "Rr",  name: "React Router",  num: 9,  pro: 84, cat: "frame", row: 1, col: 5  },
  { sym: "Tw",  name: "Tailwind",      num: 10, pro: 85, cat: "frame", row: 1, col: 6  },
  { sym: "Mu",  name: "Material UI",   num: 11, pro: 78, cat: "frame", row: 1, col: 7  },
  { sym: "Ht",  name: "HTML/CSS",      num: 12, pro: 88, cat: "frame", row: 1, col: 8  },

  // ── d-block centre: Backend frameworks (row 2, cols 3–8) ──
  { sym: "Nd",  name: "Node.js",       num: 13, pro: 85, cat: "frame", row: 2, col: 3  },
  { sym: "Ex",  name: "Express.js",    num: 14, pro: 84, cat: "frame", row: 2, col: 4  },
  { sym: "Sb",  name: "Spring Boot",   num: 15, pro: 82, cat: "frame", row: 2, col: 5  },
  { sym: "Ss",  name: "Spring Sec.",   num: 16, pro: 76, cat: "frame", row: 2, col: 6  },
  { sym: "Fa",  name: "FastAPI",       num: 17, pro: 78, cat: "frame", row: 2, col: 7  },
  { sym: "Me",  name: "Meteor.js",     num: 18, pro: 65, cat: "frame", row: 2, col: 8  },

  // ── d-block centre: Secondary frameworks + Infra (row 3, cols 3–8) ──
  { sym: "Vu",  name: "Vue.js",        num: 19, pro: 65, cat: "frame", row: 3, col: 3  },
  { sym: "St",  name: "Streamlit",     num: 20, pro: 70, cat: "frame", row: 3, col: 4  },
  { sym: "Dk",  name: "Docker",        num: 21, pro: 82, cat: "infra", row: 3, col: 5  },
  { sym: "Aw",  name: "AWS",           num: 22, pro: 68, cat: "infra", row: 3, col: 6  },
  { sym: "Rl",  name: "Render",        num: 23, pro: 78, cat: "infra", row: 3, col: 7  },
  { sym: "Nl",  name: "Netlify",       num: 24, pro: 80, cat: "infra", row: 3, col: 8  },

  // ── d-block centre: Databases + Data & AI (row 4, cols 3–8) ──
  { sym: "Pg",  name: "PostgreSQL",    num: 25, pro: 85, cat: "db",    row: 4, col: 3  },
  { sym: "Mg",  name: "MongoDB",       num: 26, pro: 75, cat: "db",    row: 4, col: 4  },
  { sym: "Or",  name: "Oracle",        num: 27, pro: 62, cat: "db",    row: 4, col: 5  },
  { sym: "Oa",  name: "OpenAI API",    num: 28, pro: 82, cat: "data",  row: 4, col: 6  },
  { sym: "Gm",  name: "Gemini API",    num: 29, pro: 78, cat: "data",  row: 4, col: 7  },
  { sym: "Cv",  name: "OpenCV",        num: 30, pro: 68, cat: "data",  row: 4, col: 8  },

  // ── d-block centre: Data & AI overflow (row 5, cols 3–6) ──
  { sym: "Mp",  name: "MediaPipe",     num: 31, pro: 65, cat: "data",  row: 5, col: 3  },
  { sym: "Sk",  name: "Sklearn",       num: 32, pro: 67, cat: "data",  row: 5, col: 4  },
  { sym: "Pl",  name: "Pillow",        num: 33, pro: 72, cat: "data",  row: 5, col: 5  },
  { sym: "Pt",  name: "PyTorch",       num: 34, pro: 62, cat: "data",  row: 5, col: 6  },

  // ── p-block right: Tools & Testing (cols 9–10, rows 1–5) ──
  { sym: "Gt",  name: "Git",           num: 35, pro: 90, cat: "tools", row: 1, col: 9  },
  { sym: "Np",  name: "npm",           num: 36, pro: 85, cat: "tools", row: 1, col: 10 },
  { sym: "Mv",  name: "Maven",         num: 37, pro: 75, cat: "tools", row: 2, col: 9  },
  { sym: "Fw",  name: "Flyway",        num: 38, pro: 72, cat: "tools", row: 2, col: 10 },
  { sym: "Ju",  name: "JUnit 5",       num: 39, pro: 76, cat: "tools", row: 3, col: 9  },
  { sym: "Je",  name: "Jest",          num: 40, pro: 74, cat: "tools", row: 3, col: 10 },
  { sym: "Mo",  name: "Mocha",         num: 41, pro: 68, cat: "tools", row: 4, col: 9  },
  { sym: "Rt",  name: "React TL",      num: 42, pro: 70, cat: "tools", row: 4, col: 10 },
  { sym: "Pyt", name: "PyTest",        num: 43, pro: 72, cat: "tools", row: 5, col: 9  },
  { sym: "Tc",  name: "Testcontainer", num: 44, pro: 68, cat: "tools", row: 5, col: 10 },
];

interface Skill {
  sym: string;
  name: string;
  num: number;
  pro: number;
  cat: string;
  row: number;
  col: number;
}

function proficiencyLabel(pro: number) {
  if (pro >= 90) return "Expert";
  if (pro >= 75) return "Advanced";
  if (pro >= 60) return "Proficient";
  return "Familiar";
}

// ── Element tile ──────────────────────────────────────────────
// `sectionInView` is passed down so the existing mount stagger
// only starts once the section has entered the viewport.
function Element({ skill, isActive, isFiltered, onClick, sectionInView }: {
  skill: Skill;
  isActive: boolean;
  isFiltered: boolean;
  onClick: (skill: Skill) => void;
  sectionInView: boolean;
}) {
  const cat = CATEGORIES[skill.cat];
  const [mounted, setMounted] = useState(false);

  // Original stagger — now gated on sectionInView instead of firing immediately
  useEffect(() => {
    if (!sectionInView) return;
    const t = setTimeout(() => setMounted(true), skill.num * 25);
    return () => clearTimeout(t);
  }, [sectionInView, skill.num]);

  const dimmed = isFiltered && !isActive;

  return (
    <div
      onClick={() => onClick(skill)}
      title={skill.name}
      className="periodic-element"
      style={{
        gridRow: skill.row,
        gridColumn: skill.col,
        borderColor: isActive ? cat.color : dimmed ? "#1e1e1e" : "#2e2e2e",
        borderWidth: isActive ? "2px" : "1px",
        background: isActive ? cat.bg : dimmed ? "#111" : "#161616",
        opacity: mounted ? (dimmed ? 0.25 : 1) : 0,
        transform: mounted ? "scale(1)" : "scale(0.8)",
        transitionDelay: `${skill.num * 18}ms`,
        boxShadow: isActive ? `0 0 18px ${cat.color}44` : "none",
      }}
    >
      <span className="element-num" style={{
        color: dimmed ? "#333" : isActive ? cat.color : "#555",
      }}>{skill.num}</span>

      <span className="element-pro" style={{
        color: dimmed ? "#333" : isActive ? cat.color : "#444",
      }}>{skill.pro}</span>

      <span className="element-sym" style={{
        color: isActive ? cat.color : dimmed ? "#2a2a2a" : "#e8e8e8",
      }}>{skill.sym}</span>

      <span className="element-name" style={{
        color: isActive ? cat.color + "cc" : dimmed ? "#2a2a2a" : "#888",
      }}>{skill.name}</span>

      <div className="element-strip" style={{
        background: dimmed ? "#1e1e1e" : cat.color,
        opacity: isActive ? 1 : 0.4,
      }} />
    </div>
  );
}

// ── Main component ────────────────────────────────────────────
export default function Skills() {
  const [selected, setSelected]   = useState<Skill | null>(null);
  const [filterCat, setFilterCat] = useState<string | null>(null);

  // Scroll-reveal: true once section hits 10% in viewport (fires once)
  const [inView, setInView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const handleClick = (skill: Skill) => {
    setSelected(prev => prev?.num === skill.num ? null : skill);
  };

  const selectedCat = selected ? CATEGORIES[selected.cat] : null;

  return (
    <section id="skills" className="skills-section" ref={sectionRef}>
      <div className="skills-inner">

        {/* Header */}
        <div className="skills-header">
          <p className="skills-subtitle">Periodic Table of</p>
          <h1 className="skills-title">Technical Skills</h1>
          <div className="skills-divider">
            <div className="skills-divider-line" />
            <span className="skills-divider-text">
              {SKILLS.length} ELEMENTS · HOVER TO EXPLORE
            </span>
            <div className="skills-divider-line" />
          </div>
        </div>

        {/* Category Legend / Filters */}
        <div className="skills-filters">
          {Object.entries(CATEGORIES).map(([key, cat]) => (
            <button
              key={key}
              onClick={() => setFilterCat(prev => prev === key ? null : key)}
              className="skills-filter-btn"
              style={{
                background: filterCat === key ? cat.bg : "transparent",
                borderColor: filterCat === key ? cat.color : "#333",
              }}
            >
              <div className="skills-filter-dot" style={{ background: cat.color }} />
              <span style={{
                color: filterCat === key ? cat.color : "#888",
              }}>{cat.label}</span>
            </button>
          ))}
          {filterCat && (
            <button
              onClick={() => setFilterCat(null)}
              className="skills-filter-btn skills-filter-clear"
            >CLEAR ×</button>
          )}
        </div>

        {/* Grid — pass sectionInView down to each element */}
        <div className="skills-grid-scroll">
          <div className="skills-grid">
            {SKILLS.map(skill => (
              <Element
                key={skill.num}
                skill={skill}
                isActive={selected?.num === skill.num || filterCat === skill.cat}
                isFiltered={filterCat !== null && filterCat !== skill.cat}
                onClick={handleClick}
                sectionInView={inView}
              />
            ))}
          </div>
        </div>

        {/* Detail Panel — unchanged */}
        <div className="skills-detail" style={{ height: selected ? "auto" : "0" }}>
          {selected && selectedCat && (
            <div className="skills-detail-panel" style={{
              borderColor: selectedCat.color + "44",
              borderLeftColor: selectedCat.color,
              background: selectedCat.bg,
            }}>
              <div className="skills-detail-symbol">
                <div className="skills-detail-sym" style={{ color: selectedCat.color }}>
                  {selected.sym}
                </div>
                <div className="skills-detail-num" style={{ color: selectedCat.color + "88" }}>
                  #{selected.num}
                </div>
              </div>

              <div className="skills-detail-info">
                <div className="skills-detail-name">{selected.name}</div>
                <div className="skills-detail-cat">
                  {CATEGORIES[selected.cat].label}
                </div>
                <div className="skills-detail-bar-wrap">
                  <div className="skills-detail-bar-bg">
                    <div className="skills-detail-bar-fill" style={{
                      width: `${selected.pro}%`,
                      background: selectedCat.color,
                    }} />
                  </div>
                  <span className="skills-detail-bar-pct" style={{ color: selectedCat.color }}>
                    {selected.pro}%
                  </span>
                </div>
              </div>

              <div className="skills-detail-badge" style={{
                borderColor: selectedCat.color + "55",
              }}>
                <div className="skills-detail-level" style={{ color: selectedCat.color }}>
                  {proficiencyLabel(selected.pro)}
                </div>
                <div className="skills-detail-level-label">LEVEL</div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="skills-footer">
          <span>ATOMIC NUMBER = SKILL INDEX · ATOMIC MASS = PROFICIENCY SCORE</span>
          <span>{new Date().getFullYear()} EDITION</span>
        </div>
      </div>
    </section>
  );
}