(() => {
  const legacyCanvas = document.querySelector('[data-join-particles]');
  if (legacyCanvas) {
    const particles = document.createElement('div');
    particles.className = 'join-particles';
    particles.setAttribute('data-main-particles-component', '');
    particles.setAttribute('data-theme', 'light');
    particles.setAttribute('data-ring-width', '0.15');
    particles.setAttribute('data-ring-width2', '0.05');
    particles.setAttribute('data-ring-displacement', '0.15');
    particles.setAttribute('data-density', '200');
    particles.setAttribute('data-particles-scale', '0.75');
    particles.setAttribute('aria-hidden', 'true');
    const container = document.createElement('div');
    container.className = 'join-particle-canvas';
    container.setAttribute('data-container', '');
    particles.appendChild(container);
    legacyCanvas.replaceWith(particles);
  }

  const emailListItem = [...document.querySelectorAll('.join-card li')]
    .find((item) => item.textContent.trim() === 'ecocarchargingeagles@gmail.com');
  if (emailListItem) {
    emailListItem.classList.add('join-email-address');
    const breakOpportunity = document.createElement('wbr');
    emailListItem.replaceChildren('ecocarchargingeagles@', breakOpportunity, 'gmail.com');
  }

  const heading = document.querySelector('[data-join-heading]');
  const typed = document.querySelector('[data-join-typed]');
  const cursor = document.querySelector('[data-join-cursor]');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!heading || !typed) return;

  const fragment = document.createDocumentFragment();
  (heading.getAttribute('aria-label') || '').split(' ').forEach((word, wordIndex, words) => {
    const wordElement = document.createElement('span');
    wordElement.className = 'join-word';
    [...word].forEach((character) => {
      const characterElement = document.createElement('span');
      characterElement.className = 'join-char';
      characterElement.textContent = character;
      wordElement.appendChild(characterElement);
    });
    fragment.appendChild(wordElement);
    if (wordIndex === words.length - 1) wordElement.classList.add('is-last');
  });
  typed.replaceChildren(fragment);

  const characters = [...typed.querySelectorAll('.join-char')];
  if (reduceMotion) {
    characters.forEach((character) => character.classList.add('is-typed'));
    cursor?.classList.add('is-finished');
    return;
  }

  const moveCursor = (character) => {
    if (!cursor || !character) return;
    const headingRect = heading.getBoundingClientRect();
    const characterRect = character.getBoundingClientRect();
    cursor.style.left = `${characterRect.right - headingRect.left - 1}px`;
    cursor.style.top = `${characterRect.top - headingRect.top + (characterRect.height - cursor.offsetHeight) / 2}px`;
  };

  const first = characters[0];
  if (first && cursor) {
    const headingRect = heading.getBoundingClientRect();
    const firstRect = first.getBoundingClientRect();
    cursor.style.left = `${firstRect.left - headingRect.left}px`;
    cursor.style.top = `${firstRect.top - headingRect.top + (firstRect.height - cursor.offsetHeight) / 2}px`;
  }

  let index = 0;
  window.setTimeout(() => {
    const typeNext = () => {
      const character = characters[index];
      if (!character) {
        window.setTimeout(() => cursor?.classList.add('is-finished'), 650);
        return;
      }
      character.classList.add('is-typed');
      moveCursor(character);
      index += 1;
      window.setTimeout(typeNext, 34 + (index % 5 === 0 ? 16 : 0));
    };
    typeNext();
  }, 300);
})();
