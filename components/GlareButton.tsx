import React, { MouseEventHandler } from 'react';
import './GlareButton.css';

interface GlareButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
  className?: string;
  target?: string;
}

const GlareButton: React.FC<GlareButtonProps> = ({
  children,
  href,
  onClick,
  className,
  target,
}) => {
  return (
    <a
      href={href}
      onClick={onClick}
      target={target}
      className={`glare-button ${className ?? ''}`}
      rel={target === '_blank' ? 'noopener noreferrer' : undefined}
    >
      <span className="glare-effect" />
      <span className="glare-content">{children}</span>
    </a>
  );
};

export default GlareButton;
