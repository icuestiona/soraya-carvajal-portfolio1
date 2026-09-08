const menuButton = document.querySelector('.menu-toggle');
const menuPanel = document.querySelector('.menu-panel');
const cursor = document.querySelector('.cursor');

menuButton.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!isOpen));
  menuPanel.setAttribute('aria-hidden', String(isOpen));
  menuPanel.classList.toggle('is-open', !isOpen);
});

document.querySelectorAll('.menu-panel a').forEach((link) => {
  link.addEventListener('click', () => {
    menuButton.setAttribute('aria-expanded', 'false');
    menuPanel.setAttribute('aria-hidden', 'true');
    menuPanel.classList.remove('is-open');
  });
});

if (window.matchMedia('(pointer: fine)').matches) {
  window.addEventListener('pointermove', (event) => {
    cursor.style.left = `${event.clientX}px`;
    cursor.style.top = `${event.clientY}px`;
  }, { passive: true });

  document.querySelectorAll('a, button').forEach((element) => {
    element.addEventListener('mouseenter', () => cursor.classList.add('is-hovering'));
    element.addEventListener('mouseleave', () => cursor.classList.remove('is-hovering'));
  });
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) observer.unobserve(entry.target);
    entry.target.classList.toggle('is-visible', entry.isIntersecting);
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));

const heroMark = document.querySelector('.hero-mark');
let scrollFrame = null;

window.addEventListener('scroll', () => {
  if (scrollFrame) return;
  scrollFrame = window.requestAnimationFrame(() => {
    const shift = Math.min(window.scrollY * 0.12, 90);
    heroMark.style.transform = `translateY(${shift}px) rotate(${shift * 0.08}deg)`;
    document.documentElement.style.setProperty('--scroll-breath', `${1 + Math.min(window.scrollY * 0.00008, 0.035)}`);
    scrollFrame = null;
  });
}, { passive: true });

document.querySelectorAll('.ripple').forEach((element) => {
  element.addEventListener('click', (event) => {
    const ripple = document.createElement('span');
    ripple.className = 'ripple-dot';
    ripple.style.left = `${event.offsetX}px`;
    ripple.style.top = `${event.offsetY}px`;
    element.appendChild(ripple);
    window.setTimeout(() => ripple.remove(), 600);
  });
});
