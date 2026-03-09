'use client';

import React, { useCallback, useEffect, useRef } from 'react';
import gsap from 'gsap';
import './CubesBackground.css';

const GRID = 22;
const MAX_ANGLE = 65;
const RADIUS = 3;
const ENTER_DUR = 0.3;
const LEAVE_DUR = 0.6;
const FACE_COLOR = '#1a1a1a';
const BORDER = '1px solid rgba(255, 106, 0, 0.18)';
const RIPPLE_COLOR = 'rgba(255, 106, 0, 0.35)';
const RIPPLE_SPEED = 2;

export default function CubesBackground() {
  const sceneRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const idleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const userActiveRef = useRef(false);
  const simPosRef = useRef({ x: Math.random() * GRID, y: Math.random() * GRID });
  const simTargetRef = useRef({ x: Math.random() * GRID, y: Math.random() * GRID });
  const simRAFRef = useRef<number | null>(null);

  const tiltAt = useCallback((rowCenter: number, colCenter: number) => {
    if (!sceneRef.current) return;
    sceneRef.current.querySelectorAll<HTMLDivElement>('.cubes-cube').forEach(cube => {
      const r = +cube.dataset.row!;
      const c = +cube.dataset.col!;
      const dist = Math.hypot(r - rowCenter, c - colCenter);
      if (dist <= RADIUS) {
        const pct = 1 - dist / RADIUS;
        const angle = pct * MAX_ANGLE;
        gsap.to(cube, { duration: ENTER_DUR, ease: 'power3.out', overwrite: true, rotateX: -angle, rotateY: angle });
      } else {
        gsap.to(cube, { duration: LEAVE_DUR, ease: 'power3.out', overwrite: true, rotateX: 0, rotateY: 0 });
      }
    });
  }, []);

  const resetAll = useCallback(() => {
    if (!sceneRef.current) return;
    sceneRef.current.querySelectorAll<HTMLDivElement>('.cubes-cube').forEach(cube =>
      gsap.to(cube, { duration: LEAVE_DUR, rotateX: 0, rotateY: 0, ease: 'power3.out' })
    );
  }, []);

  const onPointerMove = useCallback((e: PointerEvent) => {
    userActiveRef.current = true;
    if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    const rect = sceneRef.current!.getBoundingClientRect();
    const colCenter = (e.clientX - rect.left) / (rect.width / GRID);
    const rowCenter = (e.clientY - rect.top) / (rect.height / GRID);
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => tiltAt(rowCenter, colCenter));
    idleTimerRef.current = setTimeout(() => { userActiveRef.current = false; }, 3000);
  }, [tiltAt]);

  const onClick = useCallback((e: MouseEvent) => {
    if (!sceneRef.current) return;
    const rect = sceneRef.current.getBoundingClientRect();
    const cellW = rect.width / GRID;
    const cellH = rect.height / GRID;
    const colHit = Math.floor((e.clientX - rect.left) / cellW);
    const rowHit = Math.floor((e.clientY - rect.top) / cellH);

    const spreadDelay = 0.15 / RIPPLE_SPEED;
    const animDuration = 0.3 / RIPPLE_SPEED;
    const holdTime = 0.6 / RIPPLE_SPEED;

    const rings: Record<number, HTMLDivElement[]> = {};
    sceneRef.current.querySelectorAll<HTMLDivElement>('.cubes-cube').forEach(cube => {
      const r = +cube.dataset.row!;
      const c = +cube.dataset.col!;
      const ring = Math.round(Math.hypot(r - rowHit, c - colHit));
      if (!rings[ring]) rings[ring] = [];
      rings[ring].push(cube);
    });

    Object.keys(rings).map(Number).sort((a, b) => a - b).forEach(ring => {
      const delay = ring * spreadDelay;
      const faces = rings[ring].flatMap(cube => Array.from(cube.querySelectorAll<HTMLElement>('.cubes-face')));
      gsap.to(faces, { backgroundColor: RIPPLE_COLOR, duration: animDuration, delay, ease: 'power3.out' });
      gsap.to(faces, { backgroundColor: FACE_COLOR, duration: animDuration, delay: delay + animDuration + holdTime, ease: 'power3.out' });
    });
  }, []);

  // Auto-animate idle wandering
  useEffect(() => {
    if (!sceneRef.current) return;
    const speed = 0.02;
    const loop = () => {
      if (!userActiveRef.current) {
        const pos = simPosRef.current;
        const tgt = simTargetRef.current;
        pos.x += (tgt.x - pos.x) * speed;
        pos.y += (tgt.y - pos.y) * speed;
        tiltAt(pos.y, pos.x);
        if (Math.hypot(pos.x - tgt.x, pos.y - tgt.y) < 0.1) {
          simTargetRef.current = { x: Math.random() * GRID, y: Math.random() * GRID };
        }
      }
      simRAFRef.current = requestAnimationFrame(loop);
    };
    simRAFRef.current = requestAnimationFrame(loop);
    return () => { if (simRAFRef.current != null) cancelAnimationFrame(simRAFRef.current); };
  }, [tiltAt]);

  // Pointer & click listeners
  useEffect(() => {
    const el = sceneRef.current;
    if (!el) return;
    el.addEventListener('pointermove', onPointerMove);
    el.addEventListener('pointerleave', resetAll);
    el.addEventListener('click', onClick);
    return () => {
      el.removeEventListener('pointermove', onPointerMove);
      el.removeEventListener('pointerleave', resetAll);
      el.removeEventListener('click', onClick);
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    };
  }, [onPointerMove, resetAll, onClick]);

  const cells = Array.from({ length: GRID });

  return (
    <div className="cubes-bg-wrapper">
      <div
        className="cubes-bg-animation"
        style={{ '--cubes-face-border': BORDER, '--cubes-face-bg': FACE_COLOR } as React.CSSProperties}
      >
        <div
          ref={sceneRef}
          className="cubes-scene"
          style={{
            gridTemplateColumns: `repeat(${GRID}, 1fr)`,
            gridTemplateRows: `repeat(${GRID}, 1fr)`,
            columnGap: '4%',
            rowGap: '4%',
          }}
        >
          {cells.map((_, r) =>
            cells.map((__, c) => (
              <div key={`${r}-${c}`} className="cubes-cube" data-row={r} data-col={c}>
                <div className="cubes-face cubes-face--top" />
                <div className="cubes-face cubes-face--bottom" />
                <div className="cubes-face cubes-face--left" />
                <div className="cubes-face cubes-face--right" />
                <div className="cubes-face cubes-face--front" />
                <div className="cubes-face cubes-face--back" />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
