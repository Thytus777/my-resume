'use client';

import { useEffect, useRef } from 'react';

interface LetterGlitchProps {
  colors?: string[];
  glitchSpeed?: number;
  glitchChance?: number;
  cellSize?: number;
}

const CHARS =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&*<>[]{}|/\\^~`!?';

function randomChar() {
  return CHARS[Math.floor(Math.random() * CHARS.length)];
}

function randomColor(colors: string[]) {
  return colors[Math.floor(Math.random() * colors.length)];
}

export default function LetterGlitch({
  colors = ['#8b3a00', '#6b2f00', '#a04a10', '#7a3800', '#5a2800'],
  glitchSpeed = 50,
  glitchChance = 0.05,
  cellSize = 16,
}: LetterGlitchProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef    = useRef<number>(0);
  const lastRef   = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    type Cell = { char: string; color: string };
    let cells: Cell[][] = [];

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
      const cols = Math.ceil(canvas.width  / cellSize) + 1;
      const rows = Math.ceil(canvas.height / cellSize) + 1;
      cells = Array.from({ length: rows }, () =>
        Array.from({ length: cols }, () => ({
          char:  randomChar(),
          color: randomColor(colors),
        }))
      );
    };

    const draw = (timestamp: number) => {
      rafRef.current = requestAnimationFrame(draw);
      if (timestamp - lastRef.current < glitchSpeed) return;
      lastRef.current = timestamp;

      const W = canvas.width;
      const H = canvas.height;

      // Background
      ctx.globalAlpha = 1;
      ctx.fillStyle = '#0a0a0a';
      ctx.fillRect(0, 0, W, H);

      // Draw all characters
      ctx.font = `${cellSize}px 'Share Tech Mono', monospace`;
      ctx.textBaseline = 'top';
      for (let r = 0; r < cells.length; r++) {
        for (let c = 0; c < cells[r].length; c++) {
          if (Math.random() < glitchChance) {
            cells[r][c].char  = randomChar();
            cells[r][c].color = randomColor(colors);
          }
          ctx.fillStyle = cells[r][c].color;
          ctx.globalAlpha = 0.9;
          ctx.fillText(cells[r][c].char, c * cellSize, r * cellSize);
        }
      }

      ctx.globalAlpha = 1;

      // Single gradient — dark at right, transparent at left
      const grad = ctx.createLinearGradient(0, 0, W, 0);
      grad.addColorStop(0,    'rgba(10,10,10,0)');
      grad.addColorStop(0.4,  'rgba(10,10,10,0.6)');
      grad.addColorStop(0.7,  'rgba(10,10,10,0.9)');
      grad.addColorStop(1,    'rgba(10,10,10,1)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, W, H);
    };

    resize();
    window.addEventListener('resize', resize);
    rafRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
    };
  }, [colors, glitchSpeed, glitchChance, cellSize]);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          display: 'block',
        }}
      />
    </div>
  );
}