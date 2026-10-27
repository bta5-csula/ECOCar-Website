(() => {
  const details = document.querySelector('[data-bachzilla-details]');
  const trigger = document.querySelector('[data-bachzilla-trigger]');
  const slot = document.querySelector('[data-bachzilla-slot]');
  if (!details || !trigger || !slot) return;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let hideTimer = 0;

  const finishHide = () => {
    slot.hidden = true;
  };

  const hide = () => {
    window.clearTimeout(hideTimer);
    trigger.setAttribute('aria-expanded', 'false');
    slot.classList.remove('is-visible');
    if (reduceMotion.matches) finishHide();
    else hideTimer = window.setTimeout(finishHide, 480);
  };

  const show = () => {
    window.clearTimeout(hideTimer);
    slot.hidden = false;
    trigger.setAttribute('aria-expanded', 'true');
    // Commit the unhidden state before starting the transition so the card
    // reliably paints even when the tab's animation frames are throttled.
    void slot.offsetWidth;
    slot.classList.add('is-visible');
  };

  trigger.addEventListener('click', () => {
    if (slot.hidden) show();
    else hide();
  });

  details.addEventListener('toggle', () => {
    if (!details.open) hide();
  });
})();
