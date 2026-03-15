// ParkFolio — minimal JS: nav scroll state + scroll-reveal animations

// Nav: add .scrolled class when page scrolls past hero
const nav = document.getElementById('nav');
function updateNav() {
  if (window.scrollY > 60) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
}
window.addEventListener('scroll', updateNav, { passive: true });
updateNav();

// Scroll-reveal: add .visible to .reveal elements when they enter viewport
const revealElements = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // only animate once
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
);
revealElements.forEach((el) => observer.observe(el));

// Handle missing screenshots: show placeholder, hide broken img
document.querySelectorAll('.phone-screen').forEach((img) => {
  img.addEventListener('error', function () {
    this.style.display = 'none';
    const placeholder = this.nextElementSibling;
    if (placeholder && placeholder.classList.contains('phone-placeholder')) {
      placeholder.style.display = 'flex';
    }
  });
  img.addEventListener('load', function () {
    this.style.display = 'block';
    const placeholder = this.nextElementSibling;
    if (placeholder && placeholder.classList.contains('phone-placeholder')) {
      placeholder.style.display = 'none';
    }
  });
});

// Handle missing logo/CTA logo images gracefully
['cta-logo', 'footer-logo-img'].forEach((id) => {
  const el = document.getElementById(id);
  if (el) el.addEventListener('error', () => { el.style.display = 'none'; });
});
