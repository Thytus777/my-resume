'use client';

import { useEffect, useRef, useState } from 'react';
import './LoadingScreen.css';

const BOOT_LINES = [
  { g: 'POST check ·············', ok: ' OK' },
  { g: 'Loading environment...' },
  { o: 'node', g: '@20.11.0  ··········', ok: ' ✓' },
  { o: 'react', g: '@18.3     ··········', ok: ' ✓' },
  { o: 'next', g: '@14.2     ··········', ok: ' ✓' },
  { o: 'typescript', g: '@5.4  ·····', ok: ' ✓' },
  { g: 'Building static assets...' },
  { hi: 'dist/index.js  ', o: '248kb', g: ' gz' },
  { hi: 'dist/styles.css', o: '  42kb' },
  { g: 'CDN connected  ·········', ok: ' ✓' },
  { o: 'thytus.dev', g: '  ── ready' },
];

type LinePart = { o?: string; g?: string; ok?: string; hi?: string };

function renderLine(parts: LinePart) {
  return (
    <>
      {parts.g  && <span className="ls-grey">{parts.g}</span>}
      {parts.o  && <span className="ls-orange">{parts.o}</span>}
      {parts.ok && <span className="ls-green">{parts.ok}</span>}
      {parts.hi && <span className="ls-bright">{parts.hi}</span>}
    </>
  );
}

// Each boot line can have parts in a specific order — rebuild as ordered array
const BOOT_LINES_ORDERED: Array<Array<{ cls: string; text: string }>> = [
  [{ cls: 'ls-grey', text: 'POST check ·············' }, { cls: 'ls-green', text: ' OK' }],
  [{ cls: 'ls-grey', text: 'Loading environment...' }],
  [{ cls: 'ls-orange', text: 'node' }, { cls: 'ls-grey', text: '@20.11.0  ··········' }, { cls: 'ls-green', text: ' ✓' }],
  [{ cls: 'ls-orange', text: 'react' }, { cls: 'ls-grey', text: '@18.3     ··········' }, { cls: 'ls-green', text: ' ✓' }],
  [{ cls: 'ls-orange', text: 'next' }, { cls: 'ls-grey', text: '@14.2     ··········' }, { cls: 'ls-green', text: ' ✓' }],
  [{ cls: 'ls-orange', text: 'typescript' }, { cls: 'ls-grey', text: '@5.4  ·····' }, { cls: 'ls-green', text: ' ✓' }],
  [{ cls: 'ls-grey', text: 'Building static assets...' }],
  [{ cls: 'ls-bright', text: 'dist/index.js  ' }, { cls: 'ls-orange', text: '248kb' }, { cls: 'ls-grey', text: ' gz' }],
  [{ cls: 'ls-bright', text: 'dist/styles.css' }, { cls: 'ls-orange', text: '  42kb' }],
  [{ cls: 'ls-grey', text: 'CDN connected  ·········' }, { cls: 'ls-green', text: ' ✓' }],
  [{ cls: 'ls-orange', text: 'thytus.dev' }, { cls: 'ls-grey', text: '  ── ready' }],
];

export default function LoadingScreen({ onDone }: { onDone?: () => void }) {
  const sceneRef  = useRef<HTMLDivElement>(null);
  const laptopRef = useRef<HTMLDivElement>(null);
  const bezelRef  = useRef<HTMLDivElement>(null);

  const [visibleLines, setVisibleLines] = useState<number[]>([]);
  const [showProg, setShowProg]         = useState(false);
  const [progress, setProgress]         = useState(0);
  const [showMini, setShowMini]         = useState(false);
  const [bootHidden, setBootHidden]     = useState(false);
  const [laptopStill, setLaptopStill]   = useState(false);
  const [bgFading, setBgFading]          = useState(false);
  const [sceneFading, setSceneFading]   = useState(false);
  const [done, setDone]                 = useState(false);

  /* ── 1. Print boot lines ── */
  useEffect(() => {
    let cancelled = false;

    function printLine(i: number) {
      if (cancelled || i >= BOOT_LINES_ORDERED.length) {
        if (!cancelled) startProgress();
        return;
      }
      setTimeout(() => {
        setVisibleLines(prev => [...prev, i]);
        printLine(i + 1);
      }, i < 3 ? 130 : 68);
    }

    const t = setTimeout(() => printLine(0), 400);
    return () => { cancelled = true; clearTimeout(t); };
  }, []);

  /* ── 2. Progress bar ── */
  function startProgress() {
    setShowProg(true);
    let p = 0;
    const iv = setInterval(() => {
      p += Math.random() * 3.5 + 0.5;
      if (p >= 100) {
        p = 100;
        clearInterval(iv);
        setTimeout(() => {
          setBootHidden(true);
          setTimeout(() => setShowMini(true), 450);
        }, 300);
      }
      setProgress(p);
    }, 32);
  }

  /* ── 3. After mini shows, wait then zoom ── */
  useEffect(() => {
    if (!showMini) return;
    const t = setTimeout(doZoom, 1900);
    return () => clearTimeout(t);
  }, [showMini]);

  /* ── 4. Zoom into screen ── */
  function doZoom() {
    const scene  = sceneRef.current;
    const laptop = laptopRef.current;
    const bezel  = bezelRef.current;
    if (!scene || !laptop || !bezel) return;

    setLaptopStill(true);

    const r     = bezel.getBoundingClientRect();
    const vw    = window.innerWidth;
    const vh    = window.innerHeight;
    const scale = Math.max(vw / r.width, vh / r.height);
    const ox    = ((r.left + r.width  / 2) / vw * 100).toFixed(3);
    const oy    = ((r.top  + r.height / 2) / vh * 100).toFixed(3);

    scene.style.transition      = 'transform 1.25s cubic-bezier(0.76,0,0.24,1)';
    scene.style.transformOrigin = `${ox}% ${oy}%`;
    scene.style.transform       = `scale(${scale})`;

    setTimeout(fadeOut, 1260);
  }

  /* ── 5. Fade bg to site color, then fade scene out ── */
  function fadeOut() {
    setBgFading(true);
    setTimeout(() => {
      setSceneFading(true);
      setTimeout(() => {
        setDone(true);
        onDone?.();
      }, 600);
    }, 500);
  }

  if (done) return null;

  return (
    <div
      ref={sceneRef}
      className={`ls-scene${bgFading ? ' ls-scene--bg-fade' : ''}${sceneFading ? ' ls-scene--fading' : ''}`}
    >
      <div
        ref={laptopRef}
        className={`ls-laptop${laptopStill ? ' ls-laptop--still' : ''}`}
      >
        {/* ── Lid + Screen ── */}
        <div className="ls-lid">
          <div ref={bezelRef} className="ls-bezel">
            <div className="ls-screen">

              {/* Boot terminal */}
              <div className={`ls-boot${bootHidden ? ' ls-boot--hidden' : ''}`}>
                <div className="ls-boot-lines">
                  {BOOT_LINES_ORDERED.map((parts, i) => (
                    <div
                      key={i}
                      className={`ls-line${visibleLines.includes(i) ? ' ls-line--visible' : ''}`}
                    >
                      {parts.map((p, j) => (
                        <span key={j} className={p.cls}>{p.text}</span>
                      ))}
                    </div>
                  ))}
                </div>

                <div className={`ls-prog${showProg ? ' ls-prog--visible' : ''}`}>
                  <div className="ls-prog-label">
                    Initializing portfolio
                    <span>{Math.round(progress)}%</span>
                  </div>
                  <div className="ls-prog-track">
                    <div
                      className="ls-prog-fill"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Mini screen: name centred */}
              <div className={`ls-mini${showMini ? ' ls-mini--visible' : ''}`}>
                <div className="ls-mini-grid" />
                <div className="ls-mini-glow" />
                <div className="ls-mini-center">
                  <div className="ls-mini-name-row">
                    <span className="ls-mini-thytus">THYTUS</span>
                    <span className="ls-mini-benjamin">BENJAMIN</span>
                  </div>
                  <div className="ls-mini-rule" />
                  <div className="ls-mini-role-row">
                    <span className="ls-mini-software">DIGITAL</span>
                    <span className="ls-mini-engineer">PORTFOLIO</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* ── Base ── */}
        <div className="ls-base" />
      </div>
    </div>
  );
}