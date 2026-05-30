// ===========================
// HAMBURGER MENU
// ===========================
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navLinks.classList.toggle('open');
});

// Close menu when a nav link is clicked
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navLinks.classList.remove('open');
  });
});

// ===========================
// NAVBAR SCROLL SHADOW
// ===========================
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 20) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ===========================
// SCROLL REVEAL ANIMATION
// (fade in sections on scroll)
// ===========================
const revealElements = document.querySelectorAll('.section, .project-card, .info-card, .skill-category');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

revealElements.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(24px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  revealObserver.observe(el);
});

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.visible').forEach(el => {
    el.style.opacity = '1';
    el.style.transform = 'translateY(0)';
  });
});

// Add visible class handler
const style = document.createElement('style');
style.textContent = '.visible { opacity: 1 !important; transform: translateY(0) !important; }';
document.head.appendChild(style);

// ===========================
// CONTACT FORM
// ===========================
const contactForm = document.getElementById('contact-form');
const formSuccess = document.getElementById('form-success');

contactForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();

  if (!name || !email || !message) {
    alert('Please fill in all fields.');
    return;
  }

  const submitBtn = contactForm.querySelector('button[type="submit"]');
  submitBtn.textContent = 'Sending...';
  submitBtn.disabled = true;

  try {
    const response = await fetch('https://formspree.io/f/xaqkkglj', {
      method: 'POST',
      headers: { 'Accept': 'application/json' },
      body: new FormData(contactForm)
    });

    if (response.ok) {
      formSuccess.style.display = 'block';
      contactForm.reset();
      setTimeout(() => { formSuccess.style.display = 'none'; }, 4000);
    } else {
      alert('Oops! Something went wrong. Please try again.');
    }
  } catch (err) {
    alert('Network error. Please check your connection and try again.');
  }

  submitBtn.textContent = 'Send Message';
  submitBtn.disabled = false;
});

// ===========================
// ACTIVE NAV LINK ON SCROLL
// ===========================
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 80;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });

  navItems.forEach(link => {
    link.style.color = '';
    if (link.getAttribute('href') === '#' + current) {
      link.style.color = 'var(--mocha-dark)';
    }
  });
});
