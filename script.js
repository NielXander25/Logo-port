// ============================================
// NAV: scrolled state + mobile menu toggle
// ============================================
const nav = document.getElementById('nav');
const navToggle = document.getElementById('navToggle');
const mobileMenu = document.getElementById('mobileMenu');

window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 12);
}, { passive: true });

navToggle.addEventListener('click', () => {
  navToggle.classList.toggle('open');
  mobileMenu.classList.toggle('open');
});

mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navToggle.classList.remove('open');
    mobileMenu.classList.remove('open');
  });
});

// ============================================
// HERO GRID: fade in shortly after load
// ============================================
const heroGrid = document.getElementById('heroGrid');
window.addEventListener('load', () => {
  setTimeout(() => heroGrid.classList.add('show'), 300);
});

// ============================================
// REVEAL ON SCROLL
// ============================================
const revealTargets = document.querySelectorAll('.study, .g-item, .about-inner, .contact-inner, .section-head');
revealTargets.forEach(el => el.classList.add('reveal'));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

revealTargets.forEach(el => revealObserver.observe(el));

// ============================================
// CURSOR DOT (desktop / fine pointer only)
// ============================================
const cursorDot = document.getElementById('cursorDot');
const hasFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

if (hasFinePointer) {
  let mouseX = 0, mouseY = 0, dotX = 0, dotY = 0;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursorDot.style.opacity = '1';
  });

  function animateDot() {
    dotX += (mouseX - dotX) * 0.25;
    dotY += (mouseY - dotY) * 0.25;
    cursorDot.style.left = `${dotX}px`;
    cursorDot.style.top = `${dotY}px`;
    requestAnimationFrame(animateDot);
  }
  animateDot();

  // Grow the dot over interactive elements
  document.querySelectorAll('a, button, .g-item').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursorDot.style.width = '32px';
      cursorDot.style.height = '32px';
    });
    el.addEventListener('mouseleave', () => {
      cursorDot.style.width = '8px';
      cursorDot.style.height = '8px';
    });
  });
} else {
  cursorDot.style.display = 'none';
}

// ============================================
// SMOOTH ANCHOR OFFSET (account for fixed nav)
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const targetId = anchor.getAttribute('href');
    if (targetId.length > 1) {
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const offset = 88;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    }
  });
});
