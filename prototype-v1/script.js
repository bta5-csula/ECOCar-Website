const header = document.querySelector('.site-header');
const menuButton = document.querySelector('.menu-button');
const mobileMenu = document.querySelector('.mobile-menu');

window.addEventListener('scroll', () => header.classList.toggle('scrolled', window.scrollY > 10), { passive: true });

menuButton.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!open));
  mobileMenu.classList.toggle('open', !open);
});

mobileMenu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  menuButton.setAttribute('aria-expanded', 'false');
  mobileMenu.classList.remove('open');
}));

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

const cases = [
  ['Full stack developer', 'Build production-ready applications with confidence with thoroughly designed artifacts and comprehensive verification tests.'],
  ['Enterprise developer', 'Google Antigravity empowers the next era of enterprise builders.'],
  ['Frontend developer', 'Streamline UX development by leveraging browser-in-the-loop agents to automate repetitive tasks.']
];
const caseTabs = [...document.querySelectorAll('.case-tab')];
let currentCase = 0;

function showCase(index) {
  currentCase = (index + cases.length) % cases.length;
  caseTabs.forEach((tab, i) => tab.classList.toggle('active', i === currentCase));
  document.querySelector('#case-title').textContent = cases[currentCase][0];
  document.querySelector('#case-copy').textContent = cases[currentCase][1];
}

caseTabs.forEach((tab, i) => tab.addEventListener('click', () => showCase(i)));
document.querySelector('.prev').addEventListener('click', () => showCase(currentCase - 1));
document.querySelector('.next').addEventListener('click', () => showCase(currentCase + 1));

const film = document.querySelector('.film-wrap video');
const playButton = document.querySelector('.play-button');
playButton.addEventListener('click', () => {
  if (film.paused) { film.play(); playButton.innerHTML = '<span>Ⅱ</span> Pause intro'; }
  else { film.pause(); playButton.innerHTML = '<span>▶</span> Play intro'; }
});
