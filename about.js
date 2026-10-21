(() => {
  const canvas = document.querySelector('.about-particle-canvas');
  const heading = document.querySelector('[data-about-heading]');
  if (!canvas || !heading) return;

  const context = canvas.getContext('2d', { alpha: true });
  if (!context) return;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const colors = ['#365fdd', '#5b76e8', '#745bbd', '#9d8221', '#f2c500'];
  const bolt = [
    [0.56, 0.03], [0.25, 0.52], [0.47, 0.52],
    [0.34, 0.98], [0.78, 0.39], [0.55, 0.39]
  ];
  let particles = [];
  let width = 0;
  let height = 0;
  let frame = 0;
  let pointerX = 0;
  let pointerY = 0;

  const insidePolygon = (x, y, polygon) => {
    let inside = false;
    for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
      const [xi, yi] = polygon[i];
      const [xj, yj] = polygon[j];
      const intersects = ((yi > y) !== (yj > y)) &&
        (x < ((xj - xi) * (y - yi)) / (yj - yi) + xi);
      if (intersects) inside = !inside;
    }
    return inside;
  };

  const boltPoint = () => {
    for (let attempt = 0; attempt < 80; attempt += 1) {
      const x = Math.random();
      const y = Math.random();
      if (insidePolygon(x, y, bolt)) return [x, y];
    }
    return [0.5, 0.5];
  };

  const targetFor = (point) => {
    const mobile = width < 900;
    const shapeWidth = mobile ? width * .53 : Math.min(width * .36, 520);
    const shapeHeight = mobile ? height * .46 : Math.min(height * .76, 690);
    const originX = mobile ? width * .49 - shapeWidth / 2 : width * .76 - shapeWidth / 2;
    const originY = mobile ? height * .48 : height * .11;
    return {
      x: originX + point[0] * shapeWidth,
      y: originY + point[1] * shapeHeight
    };
  };

  const rebuild = () => {
    const rect = canvas.getBoundingClientRect();
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    width = rect.width;
    height = rect.height;
    canvas.width = Math.round(width * ratio);
    canvas.height = Math.round(height * ratio);
    context.setTransform(ratio, 0, 0, ratio, 0, 0);

    const boltCount = width < 900 ? 330 : 620;
    const fieldCount = width < 900 ? 90 : 180;
    particles = [];

    for (let i = 0; i < boltCount; i += 1) {
      const point = boltPoint();
      const target = targetFor(point);
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        targetX: target.x,
        targetY: target.y,
        size: .7 + Math.random() * 1.45,
        phase: Math.random() * Math.PI * 2,
        speed: .45 + Math.random() * .75,
        color: colors[Math.floor(Math.random() * colors.length)],
        field: false
      });
    }

    for (let i = 0; i < fieldCount; i += 1) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      particles.push({
        x, y, targetX: x, targetY: y,
        size: .45 + Math.random() * 1.1,
        phase: Math.random() * Math.PI * 2,
        speed: .25 + Math.random() * .45,
        color: colors[Math.floor(Math.random() * colors.length)],
        field: true
      });
    }

    draw(0);
  };

  const draw = (time) => {
    context.clearRect(0, 0, width, height);
    const settle = reducedMotion.matches ? 1 : Math.min(1, time / 1450);
    const eased = 1 - Math.pow(1 - settle, 3);

    particles.forEach((particle) => {
      if (!particle.field) {
        particle.x += (particle.targetX - particle.x) * (.018 + eased * .045);
        particle.y += (particle.targetY - particle.y) * (.018 + eased * .045);
      }

      const waveX = reducedMotion.matches ? 0 : Math.sin(time * .00055 * particle.speed + particle.phase) * (particle.field ? 5 : 2.4);
      const waveY = reducedMotion.matches ? 0 : Math.cos(time * .00048 * particle.speed + particle.phase) * (particle.field ? 4 : 1.8);
      const distanceX = particle.x - pointerX;
      const distanceY = particle.y - pointerY;
      const distance = Math.hypot(distanceX, distanceY);
      const influence = distance && distance < 120 ? (120 - distance) / 120 : 0;
      const repelX = influence ? (distanceX / distance) * influence * 9 : 0;
      const repelY = influence ? (distanceY / distance) * influence * 9 : 0;

      context.globalAlpha = particle.field ? .38 : .76 + Math.sin(time * .001 + particle.phase) * .14;
      context.fillStyle = particle.color;
      context.beginPath();
      context.arc(particle.x + waveX + repelX, particle.y + waveY + repelY, particle.size, 0, Math.PI * 2);
      context.fill();
    });

    context.globalAlpha = 1;
  };

  const animate = (time) => {
    draw(time);
    frame = window.requestAnimationFrame(animate);
  };

  const start = () => {
    window.cancelAnimationFrame(frame);
    if (!reducedMotion.matches && !document.hidden) frame = window.requestAnimationFrame(animate);
  };

  const typeHeading = () => {
    if (reducedMotion.matches) return;
    const text = heading.textContent.trim();
    heading.setAttribute('aria-label', text);
    heading.innerHTML = '<span class="about-typed-text" aria-hidden="true"></span><span class="about-typed-cursor" aria-hidden="true"></span>';
    const typed = heading.querySelector('.about-typed-text');
    let index = 0;
    const typeNext = () => {
      index += 1;
      typed.textContent = text.slice(0, index);
      if (index < text.length) window.setTimeout(typeNext, text[index] === ' ' ? 12 : 24);
    };
    window.setTimeout(typeNext, 260);
  };

  canvas.closest('.about-hero')?.addEventListener('pointermove', (event) => {
    const rect = canvas.getBoundingClientRect();
    pointerX = event.clientX - rect.left;
    pointerY = event.clientY - rect.top;
  }, { passive: true });

  canvas.closest('.about-hero')?.addEventListener('pointerleave', () => {
    pointerX = -1000;
    pointerY = -1000;
  });

  window.addEventListener('resize', rebuild, { passive: true });
  document.addEventListener('visibilitychange', start);
  reducedMotion.addEventListener?.('change', () => { rebuild(); start(); });

  pointerX = -1000;
  pointerY = -1000;
  rebuild();
  start();
  typeHeading();
})();

(() => {
  if (!window.location.hash) return;
  const target = document.querySelector(window.location.hash);
  if (!target) return;

  window.addEventListener('load', () => {
    window.setTimeout(() => target.scrollIntoView({ block: 'start' }), 150);
  }, { once: true });
})();
