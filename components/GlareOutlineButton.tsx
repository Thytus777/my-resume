import React, { MouseEventHandler } from 'react';
import './GlareOutlineButton.css';

interface GlareOutlineButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
  target?: string;
  className?: string;
}

const GlareOutlineButton: React.FC<GlareOutlineButtonProps> = ({
  children,
  href,
  onClick,
  target,
  className,
}) => {
  return (
    <a
      href={href}
      onClick={onClick}
      target={target}
      className={`glare-outline-button ${className ?? ''}`}
      rel={target === '_blank' ? 'noopener noreferrer' : undefined}
    >
      <span className="glare-outline-effect" />
      <span className="glare-outline-content">{children}</span>
    </a>
  );
};

export default GlareOutlineButton;
