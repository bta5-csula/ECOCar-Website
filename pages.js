const header = document.querySelector('.site-header');
const toggle = document.querySelector('.menu-toggle');
const mobileNav = document.querySelector('.mobile-nav');

const updateHeader = () => header?.classList.toggle('scrolled', window.scrollY > 12);
updateHeader();
window.addEventListener('scroll', updateHeader, { passive: true });

toggle?.addEventListener('click', () => {
  const open = toggle.getAttribute('aria-expanded') === 'true';
  toggle.setAttribute('aria-expanded', String(!open));
  mobileNav?.classList.toggle('open', !open);
});

mobileNav?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  toggle?.setAttribute('aria-expanded', 'false');
  mobileNav.classList.remove('open');
}));

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: .12 });

document.querySelectorAll('.reveal').forEach(element => revealObserver.observe(element));

const filters = document.querySelectorAll('[data-filter]');
const stories = document.querySelectorAll('.story[data-category]');
filters.forEach(button => button.addEventListener('click', () => {
  filters.forEach(item => item.classList.remove('active'));
  button.classList.add('active');
  const selected = button.dataset.filter;
  stories.forEach(story => {
    story.hidden = selected !== 'All' && story.dataset.category !== selected;
  });
}));
