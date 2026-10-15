(() => {
  const tabs = [...document.querySelectorAll('.case-tab[role="tab"]')];
  const panel = document.querySelector('#project-panel');
  const title = document.querySelector('#vehicle-title');
  const copy = document.querySelector('#case-copy');
  const index = document.querySelector('#case-index');
  const symbol = document.querySelector('#case-symbol');
  const visual = document.querySelector('.case-visual');
  if (!tabs.length || !panel || !title || !copy || !index || !symbol || !visual) return;

  const projects = {
    bdu: ['Battery Disconnect Unit', 'Contactors, precharge, fusing and busbars form the safety-critical assembly that connects—and disconnects—the high-voltage battery.'],
    battery: ['High-Voltage Battery', 'Cells become modules, modules become a pack, and voltage, current, energy and thermal limits shape the entire vehicle architecture.'],
    drive: ['Rear Drive Integration', 'The electric rear axle, motors and inverters must fit beneath the vehicle with sound mounts, load paths and clearance.'],
    controls: ['Controls / Embedded', 'Firmware reads sensors, makes decisions, drives outputs and brings every system to a safe state when something goes wrong.'],
    can: ['CAN', 'Vehicle modules communicate on a shared bus. The team listens, decodes signals and develops the messages that coordinate the vehicle.'],
    thermal: ['Thermal', 'Heat sets the operating limit. Cooling plates, coolant loops and ambient conditions determine how hard the battery and drive unit can work.']
  };

  const activate = (tab, moveFocus = false) => {
    const key = tab.dataset.case;
    const project = projects[key];
    if (!project || tab.getAttribute('aria-selected') === 'true') {
      if (moveFocus) tab.focus();
      return;
    }

    tabs.forEach(item => {
      const selected = item === tab;
      item.classList.toggle('active', selected);
      item.setAttribute('aria-selected', String(selected));
      item.tabIndex = selected ? 0 : -1;
    });

    panel.classList.add('is-changing');
    window.setTimeout(() => {
      const position = tabs.indexOf(tab) + 1;
      title.textContent = project[0];
      copy.textContent = project[1];
      index.textContent = `Project area ${String(position).padStart(2, '0')}`;
      symbol.setAttribute('href', `#vehicle-icon-${key}`);
      visual.dataset.caseTheme = key;
      panel.setAttribute('aria-labelledby', tab.id);
      panel.classList.remove('is-changing');
    }, 190);

    if (moveFocus) {
      tab.focus();
      if (window.matchMedia('(max-width: 980px)').matches) {
        const tabList = tab.parentElement;
        const targetLeft = tab.offsetLeft - (tabList.clientWidth - tab.offsetWidth) / 2;
        tabList.scrollTo({ left: targetLeft, behavior: 'smooth' });
      }
    }
  };

  tabs.forEach((tab, tabIndex) => {
    tab.addEventListener('click', () => activate(tab));
    tab.addEventListener('keydown', event => {
      let nextIndex = null;
      if (event.key === 'ArrowRight' || event.key === 'ArrowDown') nextIndex = (tabIndex + 1) % tabs.length;
      if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') nextIndex = (tabIndex - 1 + tabs.length) % tabs.length;
      if (event.key === 'Home') nextIndex = 0;
      if (event.key === 'End') nextIndex = tabs.length - 1;
      if (nextIndex === null) return;
      event.preventDefault();
      activate(tabs[nextIndex], true);
    });
  });
})();
