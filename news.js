(() => {
  const body = document.body;
  const grid = document.querySelector('.story-grid');
  const cards = [...document.querySelectorAll('[data-news-card]')];
  const filters = [...document.querySelectorAll('[data-news-filter]')];
  const indicator = document.querySelector('[data-news-indicator]');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const filterRow = document.querySelector('.filter-row');
  if (filterRow && !filterRow.querySelector('.news-follow-link')) {
    const follow = document.createElement('a');
    follow.className = 'news-follow-link';
    follow.href = 'https://www.instagram.com/csulaecocar/';
    follow.target = '_blank';
    follow.rel = 'noopener noreferrer';
    follow.textContent = 'Instagram';
    follow.setAttribute('aria-label', 'Follow Cal State LA EcoCAR on Instagram');
    filterRow.appendChild(follow);
  }

  const positionIndicator = (button, animate = true) => {
    if (!button || !indicator) return;
    if (!animate) indicator.style.transition = 'none';
    indicator.style.width = `${button.offsetWidth}px`;
    indicator.style.transform = `translateX(${button.offsetLeft}px)`;
    if (!animate) requestAnimationFrame(() => { indicator.style.transition = ''; });
  };

  const revealCards = (visibleCards) => {
    visibleCards.forEach((card, index) => {
      card.classList.remove('news-card-visible');
      card.style.setProperty('--news-card-delay', reduceMotion ? '0ms' : `${index * 50}ms`);
    });
    if (reduceMotion) {
      visibleCards.forEach((card) => card.classList.add('news-card-visible'));
      return;
    }
    void grid?.offsetWidth;
    requestAnimationFrame(() => visibleCards.forEach((card) => card.classList.add('news-card-visible')));
  };

  const selectFilter = (selected) => {
    filters.forEach((filter) => {
      const active = filter === selected;
      filter.classList.toggle('active', active);
      filter.setAttribute('aria-selected', String(active));
      filter.tabIndex = active ? 0 : -1;
    });
    positionIndicator(selected);

    const category = selected.dataset.filter || 'All';
    const visibleCards = cards.filter((card) => category === 'All' || card.dataset.category === category);
    cards.forEach((card) => {
      card.hidden = !visibleCards.includes(card);
      card.classList.remove('news-card-visible');
    });
    revealCards(visibleCards);
  };

  body.classList.add('news-motion-ready');
  requestAnimationFrame(() => requestAnimationFrame(() => body.classList.add('news-entered')));

  const activeFilter = filters.find((filter) => filter.classList.contains('active'));
  positionIndicator(activeFilter, false);

  filters.forEach((filter, index) => {
    filter.addEventListener('click', () => selectFilter(filter));
    filter.addEventListener('keydown', (event) => {
      let next = index;
      if (event.key === 'ArrowRight') next = (index + 1) % filters.length;
      else if (event.key === 'ArrowLeft') next = (index - 1 + filters.length) % filters.length;
      else if (event.key === 'Home') next = 0;
      else if (event.key === 'End') next = filters.length - 1;
      else return;
      event.preventDefault();
      filters[next].focus();
      selectFilter(filters[next]);
    });
  });

  if (reduceMotion || !('IntersectionObserver' in window)) {
    revealCards(cards);
  } else {
    const observer = new IntersectionObserver((entries) => {
      if (!entries.some((entry) => entry.isIntersecting)) return;
      revealCards(cards.filter((card) => !card.hidden));
      observer.disconnect();
    }, {threshold: .08, rootMargin: '0px 0px -10%'});
    if (grid) observer.observe(grid);
  }

  window.addEventListener('resize', () => {
    const current = filters.find((filter) => filter.classList.contains('active'));
    positionIndicator(current, false);
  }, {passive: true});
})();
