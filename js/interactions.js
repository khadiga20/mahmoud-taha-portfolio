/**
 * interactions.js
 * Custom cursor, navbar scroll, hamburger, back-to-top, contact form
 */

'use strict';

/* ============================================================
   1. CUSTOM CURSOR (desktop only)
   ============================================================ */
function initCursor() {
  const cursor = document.getElementById('cursor');
  const follower = document.getElementById('cursorFollower');

  if (!cursor || !follower) return;

  // Hide on touch devices
  if (window.matchMedia('(hover: none)').matches) {
    cursor.style.display = 'none';
    follower.style.display = 'none';
    document.body.style.cursor = 'auto';
    return;
  }

  let mouseX = 0, mouseY = 0;
  let followerX = 0, followerY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = mouseX + 'px';
    cursor.style.top = mouseY + 'px';
  });

  // Smooth follower via rAF
  function animateFollower() {
    followerX += (mouseX - followerX) * 0.14;
    followerY += (mouseY - followerY) * 0.14;
    follower.style.left = followerX + 'px';
    follower.style.top = followerY + 'px';
    requestAnimationFrame(animateFollower);
  }
  animateFollower();

  // Hover state on interactive elements
  bindCursorElements();

  // Hide when leaving window
  document.addEventListener('mouseleave', () => {
    cursor.style.opacity = '0';
    follower.style.opacity = '0';
  });
  document.addEventListener('mouseenter', () => {
    cursor.style.opacity = '1';
    follower.style.opacity = '1';
  });
}

function bindCursorElements() {
  if (window.matchMedia('(hover: none)').matches) return;

  const cursor = document.getElementById('cursor');
  const follower = document.getElementById('cursorFollower');
  if (!cursor || !follower) return;

  const targets = document.querySelectorAll(
    'a, button, .btn, .stack-badge, .float-chip, .skill-card, .expertise-card, .about-tag, .cert-card, .leadership-card, .contact-info-card, .project-featured, input, textarea'
  );

  targets.forEach((el) => {
    if (el.dataset.cursorBound) return;
    el.dataset.cursorBound = '1';

    el.addEventListener('mouseenter', () => {
      cursor.classList.add('cursor-hover');
      follower.classList.add('cursor-hover');
    });
    el.addEventListener('mouseleave', () => {
      cursor.classList.remove('cursor-hover');
      follower.classList.remove('cursor-hover');
    });
  });
}

/* ============================================================
   2. NAVBAR — scroll effect & active section
   ============================================================ */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  if (!navbar) return;

  // Scroll class
  function handleScroll() {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Active section highlight
    let current = '';
    sections.forEach(section => {
      const offset = section.offsetTop - parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) - 40;
      if (window.scrollY >= offset) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      link.removeAttribute('aria-current');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
        link.setAttribute('aria-current', 'page');
      }
    });
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

/* ============================================================
   3. HAMBURGER MENU
   ============================================================ */
function initHamburger() {
  const burger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');

  if (!burger || !navLinks) return;

  function closeMenu() {
    burger.classList.remove('active');
    navLinks.classList.remove('open');
    burger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  burger.addEventListener('click', () => {
    const isOpen = navLinks.classList.contains('open');
    if (isOpen) {
      closeMenu();
    } else {
      burger.classList.add('active');
      navLinks.classList.add('open');
      burger.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    }
  });

  // Close on link click
  navLinks.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navLinks.classList.contains('open')) closeMenu();
  });
}

/* ============================================================
   4. SMOOTH SCROLL (for all anchor links)
   ============================================================ */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();

      const navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 72;
      const top = target.getBoundingClientRect().top + window.scrollY - navH;

      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
}

/* ============================================================
   5. BACK TO TOP
   ============================================================ */
function initBackToTop() {
  const btn = document.getElementById('backToTop');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ============================================================
   6. CONTACT FORM (mailto fallback)
   ============================================================ */
function initContactForm() {
  const form = document.getElementById('contactForm');
  const submitBtn = document.getElementById('formSubmitBtn');
  if (!form) return;

  const fields = {
    name: { el: document.getElementById('contactName'), err: document.getElementById('nameError') },
    email: { el: document.getElementById('contactEmail'), err: document.getElementById('emailError') },
    subject: { el: document.getElementById('contactSubject'), err: document.getElementById('subjectError') },
    message: { el: document.getElementById('contactMessage'), err: document.getElementById('messageError') },
  };

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function clearError(key) {
    fields[key].err.textContent = '';
    fields[key].el.closest('.form-field').classList.remove('has-error');
  }

  function setError(key, msg) {
    fields[key].err.textContent = msg;
    fields[key].el.closest('.form-field').classList.add('has-error');
  }

  // Live validation on blur
  Object.keys(fields).forEach(key => {
    fields[key].el.addEventListener('input', () => clearError(key));
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let valid = true;

    // Validate name
    const name = fields.name.el.value.trim();
    if (!name) { setError('name', 'Please enter your name.'); valid = false; }
    else clearError('name');

    // Validate email
    const email = fields.email.el.value.trim();
    if (!email) { setError('email', 'Please enter your email address.'); valid = false; }
    else if (!validateEmail(email)) { setError('email', 'Please enter a valid email address.'); valid = false; }
    else clearError('email');

    // Validate subject
    const subject = fields.subject.el.value.trim();
    if (!subject) { setError('subject', 'Please enter a subject.'); valid = false; }
    else clearError('subject');

    // Validate message
    const message = fields.message.el.value.trim();
    if (!message || message.length < 10) { setError('message', 'Please enter a message (at least 10 characters).'); valid = false; }
    else clearError('message');

    if (!valid) return;

    // Build mailto link
    const recipient = 'mahmoud.taha.os.90@gmail.com';
    const mailtoSubject = encodeURIComponent(`[Portfolio] ${subject}`);
    const mailtoBody = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\n${message}`
    );
    const mailtoHref = `mailto:${recipient}?subject=${mailtoSubject}&body=${mailtoBody}`;

    // Visual feedback
    submitBtn.classList.add('loading');
    const btnSpan = submitBtn.querySelector('span');
    if (btnSpan) btnSpan.textContent = 'Opening email client...';

    setTimeout(() => {
      window.location.href = mailtoHref;
      submitBtn.classList.remove('loading');
      if (btnSpan) btnSpan.textContent = 'Send Message';
      form.reset();
    }, 600);
  });
}

/* ============================================================
   7. CARD HOVER TILT (subtle 3D tilt on project + about cards)
   ============================================================ */
function initCardTilt() {
  if (window.matchMedia('(hover: none)').matches) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const cards = document.querySelectorAll('.project-featured, .expertise-card');

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      card.style.transform = `perspective(900px) rotateY(${x * 4}deg) rotateX(${-y * 4}deg) translateY(-4px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}

/* ============================================================
   8. FOOTER YEAR
   ============================================================ */
function initFooterYear() {
  const el = document.getElementById('footerYear');
  if (el) el.textContent = new Date().getFullYear();
}

/* ============================================================
   INIT ALL
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  initCursor();
  initNavbar();
  initHamburger();
  initSmoothScroll();
  initBackToTop();
  initContactForm();
  initCardTilt();
  initFooterYear();
});

