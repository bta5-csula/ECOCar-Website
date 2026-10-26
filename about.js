(() => {
  const canvas = document.querySelector('.about-particle-canvas');
  const heading = document.querySelector('[data-about-heading]');
  if (!canvas || !heading) return;

  const context = canvas.getContext('2d', { alpha: true });
  if (!context) return;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const colors = ['#dba0dd', '#87318a', '#5f338c', '#27235e', '#ffce00'];
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
  let pointerActive = false;
  let pointerTrail = [];

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
        offsetX: 0,
        offsetY: 0,
        velocityX: 0,
        velocityY: 0,
        charge: 0,
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
        offsetX: 0,
        offsetY: 0,
        velocityX: 0,
        velocityY: 0,
        charge: 0,
        field: true
      });
    }

    draw(0);
  };

  const draw = (time) => {
    context.clearRect(0, 0, width, height);
    const settle = reducedMotion.matches ? 1 : Math.min(1, time / 1450);
    const eased = 1 - Math.pow(1 - settle, 3);

    if (!reducedMotion.matches) {
      pointerTrail.forEach((point) => { point.life *= pointerActive ? .91 : .84; });
      pointerTrail = pointerTrail.filter((point) => point.life > .035);
      if (pointerTrail.length > 1) {
        context.save();
        context.lineCap = 'round';
        context.lineJoin = 'round';
        for (let i = 1; i < pointerTrail.length; i += 1) {
          const previous = pointerTrail[i - 1];
          const point = pointerTrail[i];
          context.beginPath();
          context.moveTo(previous.x, previous.y);
          context.lineTo(point.x, point.y);
          context.strokeStyle = i % 2
            ? `rgba(255,206,0,${Math.min(previous.life, point.life) * .24})`
            : `rgba(135,49,138,${Math.min(previous.life, point.life) * .32})`;
          context.lineWidth = 1.2 + Math.min(previous.life, point.life) * 1.8;
          context.stroke();
        }
        context.restore();
      }
    }

    particles.forEach((particle, particleIndex) => {
      if (!particle.field) {
        particle.x += (particle.targetX - particle.x) * (.018 + eased * .045);
        particle.y += (particle.targetY - particle.y) * (.018 + eased * .045);
      }

      const waveX = reducedMotion.matches ? 0 : Math.sin(time * .00055 * particle.speed + particle.phase) * (particle.field ? 5 : 2.4);
      const waveY = reducedMotion.matches ? 0 : Math.cos(time * .00048 * particle.speed + particle.phase) * (particle.field ? 4 : 1.8);
      const baseX = particle.x + waveX;
      const baseY = particle.y + waveY;
      const distanceX = pointerX - baseX;
      const distanceY = pointerY - baseY;
      const distance = Math.hypot(distanceX, distanceY);
      const radius = width < 900 ? 150 : 205;
      const influence = pointerActive && distance && distance < radius ? Math.pow((radius - distance) / radius, 1.85) : 0;
      const strength = particle.field ? 11 : 18;
      const current = particle.field ? 4 : 7;
      const targetOffsetX = influence ? ((distanceX / distance) * strength + (-distanceY / distance) * current) * influence : 0;
      const targetOffsetY = influence ? ((distanceY / distance) * strength + (distanceX / distance) * current) * influence : 0;

      if (reducedMotion.matches) {
        particle.offsetX = 0;
        particle.offsetY = 0;
        particle.charge = 0;
      } else {
        particle.velocityX += (targetOffsetX - particle.offsetX) * .038;
        particle.velocityY += (targetOffsetY - particle.offsetY) * .038;
        particle.velocityX *= .86;
        particle.velocityY *= .86;
        particle.offsetX += particle.velocityX;
        particle.offsetY += particle.velocityY;
        particle.charge += (influence - particle.charge) * .075;
      }

      const pulsePosition = (time * .00016) % 1;
      const pulseDistance = Math.abs((particle.targetY / Math.max(height, 1)) - pulsePosition);
      const pulse = particle.field ? 0 : Math.max(0, 1 - pulseDistance / .055);
      const charged = Math.max(particle.charge, pulse * .72);
      context.globalAlpha = particle.field ? .38 + charged * .24 : .76 + Math.sin(time * .001 + particle.phase) * .12;
      context.fillStyle = charged > .3 ? (pulse > .25 || particle.phase > Math.PI ? '#ffce00' : '#87318a') : particle.color;
      context.shadowColor = particle.charge > .18 ? 'rgba(135,49,138,.55)' : 'transparent';
      context.shadowBlur = charged * 12;
      context.beginPath();
      context.arc(baseX + particle.offsetX, baseY + particle.offsetY, particle.size, 0, Math.PI * 2);
      context.fill();

      if (!reducedMotion.matches && particleIndex % 19 === 0 && particle.charge > .38) {
        const drawX = baseX + particle.offsetX;
        const drawY = baseY + particle.offsetY;
        const bend = Math.sin(time * .006 + particle.phase) * 5;
        context.globalAlpha = particle.charge * .2;
        context.strokeStyle = particle.phase > Math.PI ? '#ffce00' : '#dba0dd';
        context.lineWidth = .7;
        context.beginPath();
        context.moveTo(drawX, drawY);
        context.quadraticCurveTo(
          (drawX + pointerX) / 2 + bend,
          (drawY + pointerY) / 2 - bend,
          pointerX,
          pointerY
        );
        context.stroke();
      }
    });

    context.globalAlpha = 1;
    context.shadowBlur = 0;
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
    const lines = ['Building mobility', 'skills for tomorrow’s', 'toughest missions'];
    const text = lines.join(' ');
    heading.setAttribute('aria-label', text);
    heading.innerHTML = `<span class="about-typed-lines" aria-hidden="true">${lines.map((line) => `<span class="about-typed-line"><span class="about-typed-line-reserve">${line}</span><span class="about-typed-line-live"></span></span>`).join('')}</span>`;
    const typedLines = [...heading.querySelectorAll('.about-typed-line-live')];
    let lineIndex = 0;
    let characterIndex = 0;
    const cursor = document.createElement('span');
    cursor.className = 'about-typed-cursor';
    cursor.setAttribute('aria-hidden', 'true');
    typedLines[0].append(cursor);
    const typeNext = () => {
      const line = lines[lineIndex];
      characterIndex += 1;
      typedLines[lineIndex].textContent = line.slice(0, characterIndex);
      typedLines[lineIndex].append(cursor);
      if (characterIndex < line.length) {
        window.setTimeout(typeNext, line[characterIndex] === ' ' ? 16 : 30);
        return;
      }
      if (lineIndex < lines.length - 1) {
        lineIndex += 1;
        characterIndex = 0;
        typedLines[lineIndex].append(cursor);
        window.setTimeout(typeNext, 90);
      }
    };
    window.setTimeout(typeNext, 260);
  };

  canvas.closest('.about-hero')?.addEventListener('pointermove', (event) => {
    const rect = canvas.getBoundingClientRect();
    pointerX = event.clientX - rect.left;
    pointerY = event.clientY - rect.top;
    pointerActive = true;
    const lastPoint = pointerTrail[pointerTrail.length - 1];
    if (!lastPoint || Math.hypot(pointerX - lastPoint.x, pointerY - lastPoint.y) > 8) {
      pointerTrail.push({ x: pointerX, y: pointerY, life: 1 });
      if (pointerTrail.length > 15) pointerTrail.shift();
    }
  }, { passive: true });

  canvas.closest('.about-hero')?.addEventListener('pointerleave', () => {
    pointerActive = false;
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
