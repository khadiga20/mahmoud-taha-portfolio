/**
 * main.js
 * Entry point — initialises Lucide icons, section observers,
 * and any remaining orchestration logic.
 */

'use strict';

/* ============================================================
   1. Lucide Icons
   ============================================================ */
function initIcons() {
  if (typeof lucide !== 'undefined' && lucide.createIcons) {
    lucide.createIcons();
  }
  // Ensure LinkedIn icon renders even if omitted in newer Lucide builds
  const linkedinSvg = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-linkedin" aria-hidden="true"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect width="4" height="12" x="2" y="9"></rect><circle cx="4" cy="4" r="2"></circle></svg>';
  document.querySelectorAll('[data-lucide="linkedin"]').forEach(el => {
    el.outerHTML = linkedinSvg;
  });
}

/* ============================================================
   2. Section visibility observer (for custom reveals
      beyond AOS, e.g. timeline line growth)
   ============================================================ */
function initSectionObserver() {
  if (!('IntersectionObserver' in window)) return;

  const timelineLine = document.querySelector('.timeline-line');
  if (timelineLine) {
    const timelineSection = document.getElementById('experience');
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          timelineLine.style.transform = 'scaleY(1)';
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    if (timelineSection) obs.observe(timelineSection);
  }
}

/* ============================================================
   3. Nav links — dynamic hover indicator line
   ============================================================ */
function initNavHoverLine() {
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('mouseenter', () => link.classList.add('hovered'));
    link.addEventListener('mouseleave', () => link.classList.remove('hovered'));
  });
}

/* ============================================================
   4. Skill cards — staggered entrance on first view
   ============================================================ */
function initSkillCardsEntrance() {
  if (!('IntersectionObserver' in window)) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const cards = document.querySelectorAll('.skill-card');
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  cards.forEach(card => observer.observe(card));
}

/* ============================================================
   5. Leadership cards — border reveal
   ============================================================ */
function initLeadershipCards() {
  if (!('IntersectionObserver' in window)) return;

  const cards = document.querySelectorAll('.leadership-card');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const border = entry.target.querySelector('.leadership-card-border');
        if (border) border.style.transform = 'scaleY(1)';
      }
    });
  }, { threshold: 0.4 });

  cards.forEach(card => observer.observe(card));
}

/* ============================================================
   6. Active cursor interactivity refresh after Lucide renders
   ============================================================ */
function refreshCursorTargets() {
  if (typeof bindCursorElements === 'function') {
    bindCursorElements();
  }
}

/* ============================================================
   7. Keyboard accessibility — focus-visible polyfill
   ============================================================ */
function initKeyboardA11y() {
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
      document.body.classList.add('keyboard-nav');
    }
  });

  document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-nav');
  });

  // Add focus styles when keyboard nav active
  const style = document.createElement('style');
  style.textContent = `
    .keyboard-nav :focus-visible {
      outline: 2px solid var(--accent-cyan) !important;
      outline-offset: 3px !important;
      border-radius: var(--radius-sm) !important;
    }
  `;
  document.head.appendChild(style);
}

/* ============================================================
   9. Lazy load images (if any added later)
   ============================================================ */
function initLazyImages() {
  if (!('IntersectionObserver' in window)) return;

  const images = document.querySelectorAll('img[loading="lazy"]');
  if (!images.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
        }
        obs.unobserve(img);
      }
    });
  });

  images.forEach(img => observer.observe(img));
}

/* ============================================================
   10. Console signature
   ============================================================ */
function logSignature() {
  console.log(
    '%c MT. %c Mahmoud Taha Othman — Control & Automation Engineer ',
    'background: #00D9FF; color: #080D18; font-weight: 700; padding: 4px 8px; border-radius: 4px 0 0 4px;',
    'background: #0D1728; color: #00D9FF; font-weight: 500; padding: 4px 8px; border-radius: 0 4px 4px 0; border: 1px solid rgba(0,217,255,0.3);'
  );
}

/* ============================================================
   11. About Section — VS Code Animated Typing Feature
   ============================================================ */
function initAboutCodeTyping() {
  const codeTarget = document.getElementById('aboutCodeTarget');
  if (!codeTarget) return;

  const codeTokens = [
    { t: 'class', c: 'syn-kwd' },
    { t: ' ' },
    { t: 'Mahmoud', c: 'syn-cls' },
    { t: ' ' },
    { t: '{', c: 'syn-punc' },
    { t: '\n' },
    { t: 'public', c: 'syn-kwd' },
    { t: ':', c: 'syn-punc' },
    { t: '\n' },
    { t: '    ' },
    { t: 'string', c: 'syn-typ' },
    { t: ' ' },
    { t: 'role', c: 'syn-var' },
    { t: ' ' },
    { t: '=', c: 'syn-op' },
    { t: ' ' },
    { t: '"Control & Automation Engineer"', c: 'syn-str' },
    { t: ';', c: 'syn-punc' },
    { t: '\n' },
    { t: '    ' },
    { t: 'string', c: 'syn-typ' },
    { t: ' ' },
    { t: 'focus', c: 'syn-var' },
    { t: ' ' },
    { t: '=', c: 'syn-op' },
    { t: ' ' },
    { t: '"Industrial Automation"', c: 'syn-str' },
    { t: ';', c: 'syn-punc' },
    { t: '\n' },
    { t: '    ' },
    { t: 'string', c: 'syn-typ' },
    { t: ' ' },
    { t: 'passion', c: 'syn-var' },
    { t: ' ' },
    { t: '=', c: 'syn-op' },
    { t: ' ' },
    { t: '"Engineering Innovation"', c: 'syn-str' },
    { t: ';', c: 'syn-punc' },
    { t: '\n\n' },
    { t: '    ' },
    { t: 'void', c: 'syn-typ' },
    { t: ' ' },
    { t: 'buildSolutions', c: 'syn-fn' },
    { t: '()', c: 'syn-punc' },
    { t: ' ' },
    { t: '{', c: 'syn-punc' },
    { t: '\n' },
    { t: '        ' },
    { t: 'readSensors', c: 'syn-call' },
    { t: '();', c: 'syn-punc' },
    { t: '\n' },
    { t: '        ' },
    { t: 'processSignals', c: 'syn-call' },
    { t: '();', c: 'syn-punc' },
    { t: '\n' },
    { t: '        ' },
    { t: 'controlSystems', c: 'syn-call' },
    { t: '();', c: 'syn-punc' },
    { t: '\n' },
    { t: '        ' },
    { t: 'createImpact', c: 'syn-call' },
    { t: '();', c: 'syn-punc' },
    { t: '\n' },
    { t: '    ' },
    { t: '}', c: 'syn-punc' },
    { t: '\n' },
    { t: '};', c: 'syn-punc' }
  ];

  // Helper to render static code immediately (for reduced motion or fallback)
  function renderInstant() {
    codeTarget.innerHTML = '';
    codeTokens.forEach(token => {
      if (token.c) {
        const span = document.createElement('span');
        span.className = token.c;
        span.textContent = token.t;
        codeTarget.appendChild(span);
      } else {
        codeTarget.appendChild(document.createTextNode(token.t));
      }
    });
  }

  // If user prefers reduced motion, render immediately without typing loop
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    renderInstant();
    return;
  }

  // Pre-flatten tokens into individual characters with their styling
  const chars = [];
  codeTokens.forEach(token => {
    for (let i = 0; i < token.t.length; i++) {
      chars.push({
        char: token.t[i],
        className: token.c || null
      });
    }
  });

  let charIndex = 0;
  let activeSpan = null;
  let currentClass = null;
  let timerId = null;
  let isTyping = false;
  let hasStarted = false;

  function typeNextChar() {
    if (charIndex < chars.length) {
      const item = chars[charIndex];
      if (item.className !== currentClass) {
        currentClass = item.className;
        if (currentClass) {
          activeSpan = document.createElement('span');
          activeSpan.className = currentClass;
          codeTarget.appendChild(activeSpan);
        } else {
          activeSpan = null;
        }
      }

      if (activeSpan) {
        activeSpan.textContent += item.char;
      } else {
        codeTarget.appendChild(document.createTextNode(item.char));
      }

      charIndex++;

      // Adaptive typing delay
      let delay = 22 + Math.random() * 14;
      if (item.char === '\n') {
        delay = 140;
      } else if (item.char === ';') {
        delay = 80;
      } else if (item.char === '{' || item.char === '}') {
        delay = 90;
      }

      timerId = setTimeout(typeNextChar, delay);
    } else {
      // Completed full typing — pause comfortably, then smoothly fade and restart
      timerId = setTimeout(() => {
        codeTarget.style.transition = 'opacity 0.6s ease';
        codeTarget.style.opacity = '0';

        setTimeout(() => {
          codeTarget.innerHTML = '';
          codeTarget.style.transition = 'none';
          codeTarget.style.opacity = '1';
          charIndex = 0;
          activeSpan = null;
          currentClass = null;
          // Small pause before retyping
          timerId = setTimeout(typeNextChar, 400);
        }, 650);
      }, 5000);
    }
  }

  function startTyping() {
    if (isTyping) return;
    isTyping = true;
    typeNextChar();
  }

  function pauseTyping() {
    if (!isTyping) return;
    isTyping = false;
    if (timerId) clearTimeout(timerId);
  }

  // Trigger when code editor comes into view
  if ('IntersectionObserver' in window) {
    const editorObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (!hasStarted) {
            hasStarted = true;
            // Short initial delay so user can observe the typing begin
            setTimeout(startTyping, 350);
          } else if (!isTyping) {
            startTyping();
          }
        } else {
          if (isTyping) {
            pauseTyping();
          }
        }
      });
    }, { threshold: 0.25 });

    const editorWindow = codeTarget.closest('.code-editor-window') || codeTarget;
    editorObserver.observe(editorWindow);
  } else {
    // Fallback if IntersectionObserver is not available
    startTyping();
  }
}

/* ============================================================
   INIT ALL
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  initIcons();
  initSectionObserver();
  initNavHoverLine();
  initSkillCardsEntrance();
  initLeadershipCards();
  initAboutCodeTyping();
  initKeyboardA11y();
  initLazyImages();
  logSignature();

  // Refresh cursor bindings after icons render
  setTimeout(refreshCursorTargets, 200);
});

