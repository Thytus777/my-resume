'use client';

import { X, ExternalLink, Github } from 'lucide-react';
import { Project } from './sections/Projects';

interface Props {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: Props) {
  if (!project) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>

        {/* Image header */}
        <div className="modal-image-wrap">
          <img src={project.image} alt={project.title} className="modal-image" />
          <button className="modal-close" onClick={onClose}>
            <X size={18} />
          </button>
          <span className="modal-category">{project.subtitle}</span>
        </div>

        {/* Body */}
        <div className="modal-body">
          <div className="modal-header">
            <div>
              <p className="modal-num">{project.number}</p>
              <h2 className="modal-title">{project.title}</h2>
            </div>
            <div className="modal-links">
              {project.live && (
                <a href={project.live} target="_blank" rel="noopener noreferrer" className="modal-link modal-link--primary">
                  <ExternalLink size={14} /> Live
                </a>
              )}
              {project.github && (
                <a href={project.github} target="_blank" rel="noopener noreferrer" className="modal-link">
                  <Github size={14} /> GitHub
                </a>
              )}
            </div>
          </div>

          {/* Description */}
          <div className="modal-desc">
            {project.description.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>

          {/* Skills */}
          <div className="modal-section">
            <h3 className="modal-section-label">Tech Stack</h3>
            <div className="modal-skills">
              {project.skills.map((s) => (
                <span key={s} className="modal-skill">{s}</span>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}