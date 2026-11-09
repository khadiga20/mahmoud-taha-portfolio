/**
 * animations.js
 * Hero particles, background animations, AOS init
 */

'use strict';

/* ============================================================
   1. AOS (Animate On Scroll) initialisation
   ============================================================ */
function initAOS() {
  if (typeof AOS === 'undefined') return;
  AOS.init({
    duration: 700,
    once: true,
    offset: 60,
    easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
    disable: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  });
}

/* ============================================================
   2. Hero Particles
   ============================================================ */
function initParticles() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const container = document.getElementById('heroParticles');
  if (!container) return;

  const COUNT = window.innerWidth < 700 ? 14 : 28;

  for (let i = 0; i < COUNT; i++) {
    const p = document.createElement('div');
    p.className = 'particle';

    const size   = Math.random() * 3 + 1.5;
    const x      = Math.random() * 100;
    const y      = Math.random() * 100;
    const dur    = (Math.random() * 6 + 4).toFixed(2);
    const delay  = (Math.random() * 6).toFixed(2);
    const cyan   = Math.random() > 0.4;

    p.style.cssText = `
      left:  ${x}%;
      top:   ${y}%;
      width: ${size}px;
      height: ${size}px;
      background: ${cyan ? 'rgba(0,217,255,0.5)' : 'rgba(57,123,255,0.5)'};
      --dur:   ${dur}s;
      --delay: ${delay}s;
    `;

    container.appendChild(p);
  }
}

/* ============================================================
   3. Scroll Progress Bar
   ============================================================ */
function initScrollProgress() {
  const bar = document.createElement('div');
  bar.className = 'scroll-progress';
  document.body.appendChild(bar);

  function updateProgress() {
    const scrollTop  = window.scrollY;
    const docHeight  = document.documentElement.scrollHeight - window.innerHeight;
    const pct        = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    bar.style.width  = pct.toFixed(2) + '%';
  }

  window.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();
}

/* ============================================================
   4. Hero title character split (subtle stagger)
   ============================================================ */
function initTitleStagger() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const lines = document.querySelectorAll('.hero-title .title-line');
  lines.forEach((line, lineIdx) => {
    const text = line.textContent;
    line.textContent = '';
    line.style.overflow = 'hidden';

    text.split('').forEach((ch, i) => {
      const span = document.createElement('span');
      span.textContent = ch === ' ' ? '\u00A0' : ch;
      span.style.cssText = `
        display: inline-block;
        opacity: 0;
        transform: translateY(20px);
        animation: fadeSlideUp 0.5s cubic-bezier(0.4,0,0.2,1) ${(lineIdx * 0.3 + i * 0.03 + 0.3).toFixed(2)}s forwards;
      `;
      line.appendChild(span);
    });
  });
}

/* ============================================================
   5. Circuit lines entrance
   ============================================================ */
function initCircuitLines() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const lines = document.querySelectorAll('.circuit-line');
  lines.forEach((line, i) => {
    const len = line.getTotalLength ? line.getTotalLength() : 300;
    line.style.strokeDasharray  = len;
    line.style.strokeDashoffset = len;
    line.style.transition = `stroke-dashoffset 1.4s cubic-bezier(0.4,0,0.2,1) ${(i * 0.18 + 0.6).toFixed(2)}s`;
    setTimeout(() => { line.style.strokeDashoffset = 0; }, 50);
  });
}

/* ============================================================
   EXPORT / INIT
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  initAOS();
  initParticles();
  initScrollProgress();
  initCircuitLines();

  // Slight delay for title stagger so AOS doesn't conflict
  setTimeout(initTitleStagger, 100);
});

