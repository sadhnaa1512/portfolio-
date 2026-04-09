/* ===== TYPING ANIMATION ===== */
const roles = ['Software Developer', 'Data Analyst', 'Python Developer', 'ML Enthusiast', 'Problem Solver'];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingEl = document.getElementById('typing-text');

function typeEffect() {
  const currentRole = roles[roleIndex];

  if (!isDeleting) {
    typingEl.textContent = currentRole.substring(0, charIndex + 1);
    charIndex++;
    if (charIndex === currentRole.length) {
      isDeleting = true;
      setTimeout(typeEffect, 1800);
      return;
    }
    setTimeout(typeEffect, 80);
  } else {
    typingEl.textContent = currentRole.substring(0, charIndex - 1);
    charIndex--;
    if (charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      setTimeout(typeEffect, 400);
      return;
    }
    setTimeout(typeEffect, 40);
  }
}

typeEffect();

/* ===== YEAR ===== */
document.getElementById('year').textContent = new Date().getFullYear();

/* ===== HAMBURGER MENU ===== */
const hamburger = document.getElementById('hamburger');
const nav = document.getElementById('nav');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  nav.classList.toggle('open');
});

// Close nav on link click
nav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    nav.classList.remove('open');
  });
});

/* ===== PROJECT FILTERING ===== */
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;

    let visibleIndex = 0;
    projectCards.forEach(card => {
      if (filter === 'all' || card.dataset.category === filter) {
        card.classList.remove('hidden');
        card.style.animationDelay = (visibleIndex * 0.06) + 's';
        card.style.animation = 'none';
        card.offsetHeight; // trigger reflow
        card.style.animation = '';
        visibleIndex++;
      } else {
        card.classList.add('hidden');
      }
    });
  });
});

/* ===== SCROLL REVEAL ===== */
function initReveal() {
  const revealElements = document.querySelectorAll(
    '.section-title, .section-subtitle, .about-text, .about-highlights, ' +
    '.skill-category, .project-card, .timeline-item, .cert-card, .contact-card, ' +
    '.hero-content, .hero-stats, .filter-tabs'
  );

  revealElements.forEach(el => el.classList.add('reveal'));

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );

  revealElements.forEach(el => observer.observe(el));
}

initReveal();

/* ===== ACTIVE NAV HIGHLIGHT ===== */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav a[href^="#"]');

function highlightNav() {
  const scrollY = window.scrollY + 100;

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');

    if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
      navLinks.forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href') === '#' + sectionId) {
          link.style.color = 'var(--primary-light)';
        }
      });
    }
  });
}

/* ===== HEADER SCROLL EFFECT ===== */
const header = document.querySelector('.site-header');

function handleHeaderScroll() {
  if (window.scrollY > 40) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
}

/* ===== BACK TO TOP ===== */
const backToTop = document.getElementById('backToTop');

function handleBackToTop() {
  if (window.scrollY > 500) {
    backToTop.classList.add('visible');
  } else {
    backToTop.classList.remove('visible');
  }
}

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ===== SMOOTH SCROLL FOR NAV LINKS ===== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

/* ===== COMBINED SCROLL HANDLER ===== */
let ticking = false;
window.addEventListener('scroll', () => {
  if (!ticking) {
    requestAnimationFrame(() => {
      highlightNav();
      handleHeaderScroll();
      handleBackToTop();
      ticking = false;
    });
    ticking = true;
  }
}, { passive: true });

/* ===== STAGGERED REVEAL DELAYS ===== */
function applyStaggerDelays() {
  const groups = [
    '.skills-grid .skill-category',
    '.projects-grid .project-card:not(.hidden)',
    '.certs-grid .cert-card',
    '.contact-grid .contact-card',
    '.about-highlights .highlight-card'
  ];

  groups.forEach(selector => {
    document.querySelectorAll(selector).forEach((el, i) => {
      el.style.transitionDelay = (i * 0.08) + 's';
    });
  });
}

applyStaggerDelays();
