const menuButton=document.querySelector('.menu-toggle');
const mobileNav=document.querySelector('.mobile-nav');
menuButton?.addEventListener('click',()=>{const open=mobileNav.classList.toggle('open');menuButton.setAttribute('aria-expanded',String(open));menuButton.setAttribute('aria-label',open?'Close menu':'Open menu');});
mobileNav?.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>{mobileNav.classList.remove('open');menuButton?.setAttribute('aria-expanded','false');menuButton?.setAttribute('aria-label','Open menu')}));

document.querySelectorAll('.cases-stage .case-tabs,.cases-stage .case-display,.join-card').forEach(element=>element.classList.add('reveal'));

const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target)}}),{threshold:.08});
document.querySelectorAll('.reveal').forEach(element=>observer.observe(element));

const caseData={
  bdu:['Battery Disconnect Unit','Contactors, precharge, fusing and busbars form the safety-critical assembly that connects—and disconnects—the high-voltage battery.'],
  battery:['High-Voltage Battery','Cells become modules, modules become a pack, and voltage, current, energy and thermal limits shape the entire vehicle architecture.'],
  drive:['Rear Drive Integration','The electric rear axle, motors and inverters must fit beneath the vehicle with sound mounts, load paths and clearance.'],
  controls:['Controls / Embedded','Firmware reads sensors, makes decisions, drives outputs and brings every system to a safe state when something goes wrong.'],
  can:['CAN','Vehicle modules communicate on a shared bus. The team listens, decodes signals and develops the messages that coordinate the vehicle.'],
  thermal:['Thermal','Heat sets the operating limit. Cooling plates, coolant loops and ambient conditions determine how hard the battery and drive unit can work.']
};
const caseTabs=[...document.querySelectorAll('.case-tab')];
const selectCase=tab=>{
  caseTabs.forEach(item=>{const active=item===tab;item.classList.toggle('active',active);item.setAttribute('aria-selected',String(active));item.tabIndex=active?0:-1});
  const data=caseData[tab.dataset.case];if(!data)return;
  const display=document.querySelector('.case-display');display?.classList.add('is-changing');
  window.setTimeout(()=>{document.querySelector('#case-title').textContent=data[0];document.querySelector('#case-copy').textContent=data[1];document.querySelector('#case-symbol').replaceChildren(tab.querySelector('svg').cloneNode(true));display?.classList.remove('is-changing')},180);
};
caseTabs.forEach((tab,index)=>{tab.addEventListener('click',()=>selectCase(tab));tab.addEventListener('keydown',event=>{if(!['ArrowDown','ArrowRight','ArrowUp','ArrowLeft','Home','End'].includes(event.key))return;event.preventDefault();let next=index;if(event.key==='Home')next=0;else if(event.key==='End')next=caseTabs.length-1;else next=(index+(event.key==='ArrowDown'||event.key==='ArrowRight'?1:-1)+caseTabs.length)%caseTabs.length;caseTabs[next].focus();selectCase(caseTabs[next])})});

document.querySelectorAll('.filter').forEach(button=>button.addEventListener('click',()=>{
  document.querySelectorAll('.filter').forEach(item=>item.classList.remove('active'));button.classList.add('active');
  document.querySelectorAll('.story').forEach(story=>story.classList.add('is-filtering'));
  window.setTimeout(()=>document.querySelectorAll('.story').forEach(story=>{story.hidden=button.dataset.filter!=='All'&&story.dataset.category!==button.dataset.filter;story.classList.remove('is-filtering')}),180);
}));
