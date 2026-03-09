'use client';

import { ArrowRight } from 'lucide-react';
import { Project } from './sections/Projects';

interface Props {
  project: Project;
  isActive: boolean;
  onClick: (p: Project) => void;
}

export default function ProjectCard({ project, isActive, onClick }: Props) {
  return (
    <div
      onClick={() => onClick(project)}
      className="project-card"
      style={{ width: isActive ? '520px' : '72px' }}
    >
      {/* Background image */}
      <img
        src={project.image}
        alt={project.title}
        className="project-card-img"
        style={{ transform: isActive ? 'scale(1)' : 'scale(1.05)' }}
      />

      {/* Overlay */}
      <div
        className="project-card-overlay"
        style={{
          background: isActive
            ? 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.1) 60%)'
            : 'rgba(0,0,0,0.55)',
        }}
      />

      {/* Collapsed: vertical title */}
      {!isActive && (
        <div className="project-card-collapsed">
          <div style={{ transform: 'rotate(90deg)', whiteSpace: 'nowrap' }}
               className="project-card-collapsed-inner">
            <span className="project-card-num-small">{project.number}</span>
            <span className="project-card-vtitle">{project.title}</span>
          </div>
        </div>
      )}

      {/* Active: bottom-left label + top-right button */}
      {isActive && (
        <>
          {/* Bottom label */}
          <div className="project-card-label">
            <p className="project-card-label-num">{project.number}</p>
            <p className="project-card-label-title">{project.title}</p>
            <p className="project-card-label-sub">{project.subtitle}</p>
          </div>

          {/* Explore button */}
          <div className="project-card-explore">
            Explore <ArrowRight size={12} />
          </div>
        </>
      )}
    </div>
  );
}