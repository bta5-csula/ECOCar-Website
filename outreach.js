(() => {
  const cards = [...document.querySelectorAll('[data-research-card]')];
  if (!cards.length) return;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = window.matchMedia('(pointer: fine)').matches;
  const states = [];
  let animationFrame = 0;

  const resize = state => {
    const rect = state.canvas.getBoundingClientRect();
    state.width = Math.max(1, rect.width);
    state.height = Math.max(1, rect.height);
    const scale = Math.min(window.devicePixelRatio || 1, 1.75);
    state.canvas.width = Math.round(state.width * scale);
    state.canvas.height = Math.round(state.height * scale);
    state.context.setTransform(scale, 0, 0, scale, 0, 0);
  };

  const line = (context, points, color, width = 1) => {
    context.beginPath();
    points.forEach(([x, y], index) => index ? context.lineTo(x, y) : context.moveTo(x, y));
    context.strokeStyle = color;
    context.lineWidth = width;
    context.stroke();
  };

  const clamp = (value, minimum, maximum) => Math.min(maximum, Math.max(minimum, value));

  const focusPoint = (state, time, phase = 0) => {
    const automatic = {
      x: state.width * (.5 + Math.cos(time * .00032 + phase) * .22),
      y: state.height * (.36 + Math.sin(time * .00041 + phase) * .16)
    };
    return {
      x: automatic.x + (state.pointer.x - automatic.x) * state.pointer.amount,
      y: automatic.y + (state.pointer.y - automatic.y) * state.pointer.amount
    };
  };

  const drawAwareness = (state, time) => {
    const { context: ctx, width, height } = state;
    const focus = focusPoint(state, time, .4);
    ctx.fillStyle = '#151306';
    ctx.fillRect(0, 0, width, height);
    const spacing = Math.max(34, width / 10);
    const rowHeight = spacing * .86;
    ctx.lineWidth = 1;
    for (let row = -1; row < height / rowHeight + 2; row += 1) {
      for (let col = -1; col < width / spacing + 2; col += 1) {
        const x = col * spacing + (row % 2 ? spacing / 2 : 0);
        const y = row * rowHeight;
        const distance = Math.hypot(x - focus.x, y - focus.y);
        const proximity = Math.max(0, 1 - distance / Math.max(120, width * .42));
        const pulse = .1 + Math.max(0, Math.sin(time * .0015 - (x + y) * .012)) * .18 + proximity * .44;
        ctx.beginPath();
        for (let side = 0; side < 6; side += 1) {
          const angle = Math.PI / 3 * side;
          const px = x + Math.cos(angle) * spacing * .48;
          const py = y + Math.sin(angle) * spacing * .48;
          side ? ctx.lineTo(px, py) : ctx.moveTo(px, py);
        }
        ctx.closePath();
        ctx.strokeStyle = `rgba(225,190,43,${pulse})`;
        ctx.stroke();
      }
    }
    const sweep = (time * .055) % (height + 180) - 90;
    const gradient = ctx.createLinearGradient(0, sweep - 80, 0, sweep + 80);
    gradient.addColorStop(0, 'rgba(242,205,57,0)');
    gradient.addColorStop(.5, 'rgba(242,205,57,.26)');
    gradient.addColorStop(1, 'rgba(242,205,57,0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, sweep - 80, width, 160);

    for (let ring = 0; ring < 3; ring += 1) {
      const radius = ((time * .045 + ring * 76) % 228) + 12;
      ctx.strokeStyle = `rgba(255,225,96,${Math.max(0, .3 - radius / 820)})`;
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.arc(focus.x, focus.y, radius, 0, Math.PI * 2);
      ctx.stroke();
    }

    for (let index = 0; index < 7; index += 1) {
      const x = width * (.12 + ((index * 37) % 79) / 100);
      const y = height * (.12 + ((index * 53) % 73) / 100);
      const nearFocus = Math.max(0, 1 - Math.hypot(x - focus.x, y - focus.y) / 180);
      const radius = 3 + Math.sin(time * .002 + index) * 1.3;
      if (nearFocus > .2) line(ctx, [[focus.x, focus.y], [x, y]], `rgba(255,225,96,${nearFocus * .24})`);
      ctx.fillStyle = `rgba(255,225,96,${.58 + nearFocus * .42})`;
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.shadowBlur = 18;
    ctx.shadowColor = '#ffe160';
    ctx.fillStyle = '#ffe160';
    ctx.beginPath();
    ctx.arc(focus.x, focus.y, 3 + state.pointer.amount * 1.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;
  };

  const drawMobility = (state, time) => {
    const { context: ctx, width, height } = state;
    const constraint = focusPoint(state, time, 2.1);
    ctx.fillStyle = '#130c24';
    ctx.fillRect(0, 0, width, height);
    const points = [[.08,.28],[.28,.17],[.44,.35],[.68,.2],[.9,.32],[.2,.55],[.42,.62],[.68,.53],[.86,.68],[.12,.82],[.38,.86],[.63,.78]]
      .map(([x, y]) => [x * width, y * height]);
    const edges = [[0,1],[1,2],[2,3],[3,4],[0,5],[2,6],[3,7],[4,8],[5,6],[6,7],[7,8],[5,9],[6,10],[7,11],[10,11]];
    edges.forEach(([a, b], index) => line(ctx, [points[a], points[b]], index === 6 ? 'rgba(255,105,91,.46)' : 'rgba(189,166,255,.22)', index === 6 ? 2 : 1));
    points.forEach(([x, y], index) => {
      const glow = 3 + Math.max(0, Math.sin(time * .002 + index)) * 2;
      ctx.fillStyle = index === 7 ? '#ef806f' : 'rgba(211,194,255,.72)';
      ctx.beginPath();
      ctx.arc(x, y, glow, 0, Math.PI * 2);
      ctx.fill();
    });
    const routeIndices = [9, 5, 6, 2, 3, 4];
    const route = routeIndices.map((pointIndex, routeIndex) => {
      const routePoint = [...points[pointIndex]];
      const isAnchored = routeIndex === 0 || routeIndex === routeIndices.length - 1;
      if (state.pointer.amount > .01 && !isAnchored) {
        const deltaX = routePoint[0] - constraint.x;
        const deltaY = routePoint[1] - constraint.y;
        const distance = Math.hypot(deltaX, deltaY);
        const radius = Math.max(150, width * .5);
        const softenedDistance = Math.sqrt(distance ** 2 + 42 ** 2);
        const influence = Math.exp(-(distance ** 2) / (2 * radius ** 2));
        const displacement = influence * 82 * state.pointer.amount;
        routePoint[0] = clamp(routePoint[0] + (deltaX / softenedDistance) * displacement, width * .1, width * .9);
        routePoint[1] = clamp(routePoint[1] + (deltaY / softenedDistance) * displacement, height * .14, height * .84);
      }
      return routePoint;
    });
    line(ctx, route, 'rgba(225,195,71,.75)', 2.2);

    if (state.pointer.amount > .01) {
      const hazardRadius = 34 + Math.sin(time * .004) * 4;
      ctx.setLineDash([5, 7]);
      ctx.strokeStyle = `rgba(255,112,94,${.72 * state.pointer.amount})`;
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.arc(constraint.x, constraint.y, hazardRadius, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);
      line(ctx, [[constraint.x - 8, constraint.y], [constraint.x + 8, constraint.y]], `rgba(255,150,130,${.85 * state.pointer.amount})`, 1.2);
      line(ctx, [[constraint.x, constraint.y - 8], [constraint.x, constraint.y + 8]], `rgba(255,150,130,${.85 * state.pointer.amount})`, 1.2);
    }
    const progress = (time * .000075) % 1;
    const segmentFloat = progress * (route.length - 1);
    const segment = Math.min(route.length - 2, Math.floor(segmentFloat));
    const amount = segmentFloat - segment;
    const x = route[segment][0] + (route[segment + 1][0] - route[segment][0]) * amount;
    const y = route[segment][1] + (route[segment + 1][1] - route[segment][1]) * amount;
    ctx.shadowBlur = 20;
    ctx.shadowColor = '#f0cc4a';
    ctx.fillStyle = '#ffe36b';
    ctx.beginPath();
    ctx.arc(x, y, 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;
  };

  const drawDrone = (state, time) => {
    const { context: ctx, width, height } = state;
    ctx.fillStyle = '#090e22';
    ctx.fillRect(0, 0, width, height);
    const grid = Math.max(42, width / 9);
    for (let x = 0; x <= width; x += grid) line(ctx, [[x,0],[x,height]], 'rgba(128,155,235,.13)');
    for (let y = 0; y <= height; y += grid) line(ctx, [[0,y],[width,y]], 'rgba(128,155,235,.13)');
    const target = focusPoint(state, time, 4.2);
    const centerX = target.x;
    const centerY = target.y;
    const phase = (time * .035) % 90;
    for (let ring = 0; ring < 4; ring += 1) {
      const radius = phase + ring * 90;
      ctx.strokeStyle = `rgba(108,145,255,${Math.max(0,.32-radius/(Math.max(width,height)*1.7))})`;
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.stroke();
    }
    ctx.setLineDash([4, 10]);
    ctx.lineDashOffset = -time * .02;
    const interaction = state.pointer.amount;
    const start = { x: width * .08, y: height * .72 };
    const control1 = { x: width * .28, y: height * .3 + (centerY * .7 - height * .3) * interaction };
    const control2 = { x: width * .62 + (centerX * .72 - width * .62) * interaction, y: height * .82 + (height * .78 - height * .82) * interaction };
    const end = { x: width * .9 + (centerX - width * .9) * interaction, y: height * .22 + (centerY - height * .22) * interaction };
    ctx.beginPath();
    ctx.moveTo(start.x, start.y);
    ctx.bezierCurveTo(control1.x, control1.y, control2.x, control2.y, end.x, end.y);
    ctx.strokeStyle = 'rgba(190,207,255,.62)';
    ctx.lineWidth = 1.5;
    ctx.stroke();
    ctx.setLineDash([]);
    const automaticProgress = (time * .00006) % 1;
    const progress = automaticProgress + (.9 - automaticProgress) * interaction;
    const inverse = 1 - progress;
    const x = inverse ** 3 * start.x + 3 * inverse ** 2 * progress * control1.x + 3 * inverse * progress ** 2 * control2.x + progress ** 3 * end.x;
    const y = inverse ** 3 * start.y + 3 * inverse ** 2 * progress * control1.y + 3 * inverse * progress ** 2 * control2.y + progress ** 3 * end.y;
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(-.35);
    ctx.fillStyle = '#dce5ff';
    ctx.beginPath();
    ctx.moveTo(9, 0);
    ctx.lineTo(-7, -5);
    ctx.lineTo(-3, 0);
    ctx.lineTo(-7, 5);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
    if (interaction > .01) {
      ctx.strokeStyle = `rgba(190,207,255,${.78 * interaction})`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(centerX, centerY, 13, 0, Math.PI * 2);
      ctx.stroke();
      const targetColor = `rgba(190,207,255,${.78 * interaction})`;
      line(ctx, [[centerX - 19, centerY], [centerX - 8, centerY]], targetColor);
      line(ctx, [[centerX + 8, centerY], [centerX + 19, centerY]], targetColor);
      line(ctx, [[centerX, centerY - 19], [centerX, centerY - 8]], targetColor);
      line(ctx, [[centerX, centerY + 8], [centerX, centerY + 19]], targetColor);
    }
  };

  const render = time => {
    animationFrame = 0;
    let visible = false;
    states.forEach(state => {
      if (!state.visible) return;
      visible = true;
      const pointer = state.pointer;
      const response = state.variant === 'mobility' ? .075 : .1;
      const engagement = state.variant === 'mobility' ? .048 : .055;
      pointer.amount += ((pointer.active ? 1 : 0) - pointer.amount) * engagement;
      pointer.x += (pointer.targetX - pointer.x) * response;
      pointer.y += (pointer.targetY - pointer.y) * response;
      if (state.variant === 'awareness') drawAwareness(state, time);
      if (state.variant === 'mobility') drawMobility(state, time);
      if (state.variant === 'drone') drawDrone(state, time);
    });
    if (visible && !reducedMotion) animationFrame = requestAnimationFrame(render);
  };

  const start = () => {
    if (!animationFrame && !reducedMotion) animationFrame = requestAnimationFrame(render);
    if (reducedMotion) render(2400);
  };

  cards.forEach(card => {
    const canvas = card.querySelector('canvas');
    const context = canvas?.getContext('2d');
    if (!canvas || !context) return;
    const state = {
      card,
      canvas,
      context,
      variant: card.dataset.researchCard,
      width: 0,
      height: 0,
      visible: false,
      pointer: { x: 0, y: 0, targetX: 0, targetY: 0, amount: 0, active: false }
    };
    states.push(state);
    resize(state);

    if (finePointer && !reducedMotion) {
      card.addEventListener('pointermove', event => {
        const rect = card.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        state.pointer.targetX = x;
        state.pointer.targetY = y;
        if (!state.pointer.x && !state.pointer.y) {
          state.pointer.x = x;
          state.pointer.y = y;
        }
        state.pointer.active = true;
        card.style.setProperty('--mx', `${x}px`);
        card.style.setProperty('--my', `${y}px`);
        card.style.setProperty('--rx', `${((y / rect.height) - .5) * -3.5}deg`);
        card.style.setProperty('--ry', `${((x / rect.width) - .5) * 3.5}deg`);
      });
      card.addEventListener('pointerleave', () => {
        state.pointer.active = false;
        card.style.setProperty('--mx', '50%');
        card.style.setProperty('--my', '30%');
        card.style.setProperty('--rx', '0deg');
        card.style.setProperty('--ry', '0deg');
      });
    }
  });

  const visibilityObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      const state = states.find(item => item.card === entry.target);
      if (state) state.visible = entry.isIntersecting;
    });
    start();
  }, { rootMargin: '120px 0px', threshold: .05 });
  states.forEach(state => visibilityObserver.observe(state.card));

  const resizeObserver = new ResizeObserver(entries => {
    entries.forEach(entry => {
      const state = states.find(item => item.card === entry.target);
      if (state) resize(state);
    });
    start();
  });
  states.forEach(state => resizeObserver.observe(state.card));

  const contextGrid = document.querySelector('.context-grid');
  if (contextGrid) {
    if (reducedMotion) {
      contextGrid.classList.add('context-active');
    } else {
      const contextObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('context-active');
          contextObserver.unobserve(entry.target);
        });
      }, { threshold: .18 });
      contextObserver.observe(contextGrid);
    }
  }
})();
