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

const lightningCanvas=document.querySelector('[data-about-lightning]');
if(lightningCanvas){
  const context=lightningCanvas.getContext('2d'),reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const polygon=[[.58,.04],[.24,.53],[.47,.53],[.34,.96],[.77,.39],[.54,.39]];
  const inside=(x,y)=>{let hit=false;for(let i=0,j=polygon.length-1;i<polygon.length;j=i++){const a=polygon[i],b=polygon[j];if((a[1]>y)!==(b[1]>y)&&x<(b[0]-a[0])*(y-a[1])/(b[1]-a[1])+a[0])hit=!hit}return hit};
  let seed=8183;const random=()=>{seed=seed*16807%2147483647;return(seed-1)/2147483646};
  const particles=[];while(particles.length<820){const x=random(),y=random();if(inside(x,y))particles.push({x,y,size:.9+random()*2.1,phase:random()*Math.PI*2,color:['#f3bc16','#e6a900','#4168e8','#191a1d'][particles.length%4],alpha:.55+random()*.45})}
  let width=1,height=1,dpr=1,running=false;
  const resize=()=>{const rect=lightningCanvas.getBoundingClientRect();dpr=Math.min(2,devicePixelRatio||1);width=Math.max(1,rect.width);height=Math.max(1,rect.height);lightningCanvas.width=Math.round(width*dpr);lightningCanvas.height=Math.round(height*dpr);context.setTransform(dpr,0,0,dpr,0,0)};
  const draw=time=>{context.clearRect(0,0,width,height);const scale=Math.min(width*.95,height*1.06),left=width*.5-scale*.5,top=height*.5-scale*.5;particles.forEach((particle,index)=>{const drift=reduced?0:Math.sin(time*.00035+particle.phase)*2.6,x=left+particle.x*scale+drift,y=top+particle.y*scale+Math.cos(time*.00028+particle.phase)*1.8;context.save();context.translate(x,y);context.rotate(-.18+Math.sin(particle.phase)*.12);context.globalAlpha=particle.alpha;context.fillStyle=particle.color;if(index%3===0)context.fillRect(-particle.size*1.8,-particle.size*.5,particle.size*3.6,particle.size);else{context.beginPath();context.arc(0,0,particle.size,0,Math.PI*2);context.fill()}context.restore()});context.globalAlpha=1;if(running&&!reduced)requestAnimationFrame(draw)};
  const start=()=>{if(running)return;running=true;requestAnimationFrame(draw)};
  new ResizeObserver(resize).observe(lightningCanvas);new IntersectionObserver(entries=>{if(entries[0].isIntersecting){if(!reduced)start()}else running=false}).observe(lightningCanvas);resize();if(reduced)draw(0);else start();
}
