const reducedMotion=window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const homeHeader=document.querySelector('[data-header]');
const updateHeader=()=>homeHeader?.classList.toggle('is-scrolled',window.scrollY>24);
updateHeader();
window.addEventListener('scroll',updateHeader,{passive:true});

const revealObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{
  if(entry.isIntersecting){entry.target.classList.add('is-visible');revealObserver.unobserve(entry.target)}
}),{threshold:.08,rootMargin:'0px 0px -5%'});
document.querySelectorAll('.reveal-home').forEach(element=>revealObserver.observe(element));

const hero=document.querySelector('.home-hero');
const heroInner=document.querySelector('.home-hero-inner');
const videoSection=document.querySelector('.home-video-section');
let scrollFrame=0;
const updateScrollEffects=()=>{
  scrollFrame=0;
  if(reducedMotion)return;
  const y=window.scrollY;
  if(heroInner&&y<window.innerHeight*1.3){
    const progress=Math.min(1,y/window.innerHeight);
    heroInner.style.transform=`translate3d(0,${progress*72}px,0) scale(${1-progress*.035})`;
    heroInner.style.opacity=String(1-progress*.72);
  }
  if(videoSection){
    const rect=videoSection.getBoundingClientRect();
    const progress=Math.max(0,Math.min(1,(window.innerHeight-rect.top)/(window.innerHeight*.82)));
    videoSection.style.transform=`scale(${.72+progress*.28})`;
  }
};
const requestScrollEffects=()=>{if(!scrollFrame)scrollFrame=requestAnimationFrame(updateScrollEffects)};
window.addEventListener('scroll',requestScrollEffects,{passive:true});
window.addEventListener('resize',requestScrollEffects,{passive:true});
updateScrollEffects();

function openVideo(){
  if(document.querySelector('.home-video-modal'))return;
  const modal=document.createElement('div');
  modal.className='home-video-modal';modal.setAttribute('role','dialog');modal.setAttribute('aria-modal','true');modal.setAttribute('aria-label','Cal State LA EcoCAR video');
  modal.innerHTML='<button class="home-video-close" type="button" aria-label="Close video">×</button><div class="home-video-frame"><iframe src="https://www.youtube-nocookie.com/embed/oibPfvqW1zg?autoplay=1&rel=0" title="Cal State LA EcoCAR video" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe></div>';
  document.body.appendChild(modal);document.body.classList.add('eco-video-open');
  const close=()=>{modal.remove();document.body.classList.remove('eco-video-open');videoWrapper?.focus()};
  modal.querySelector('.home-video-close').addEventListener('click',close);
  modal.addEventListener('click',event=>{if(event.target===modal)close()});
  modal.addEventListener('keydown',event=>{if(event.key==='Escape')close()});
  modal.querySelector('.home-video-close').focus();
}
const videoWrapper=document.querySelector('[data-video-wrapper]');
if(videoWrapper){
  const follower=videoWrapper.querySelector('.home-video-follow');
  const control=videoWrapper.querySelector('.home-video-control');
  const moveFollower=event=>{const rect=videoWrapper.getBoundingClientRect();follower.style.transform=`translate(${event.clientX-rect.left}px,${event.clientY-rect.top}px) translate(-50%,-50%) scale(1)`};
  videoWrapper.addEventListener('pointerenter',event=>{moveFollower(event);follower.classList.add('is-visible');control.classList.add('is-hidden')});
  videoWrapper.addEventListener('pointermove',moveFollower);
  videoWrapper.addEventListener('pointerleave',()=>{follower.classList.remove('is-visible');control.classList.remove('is-hidden')});
  videoWrapper.addEventListener('click',openVideo);
  videoWrapper.addEventListener('keydown',event=>{if(event.key==='Enter'||event.key===' '){event.preventDefault();openVideo()}});
}

const carousel=document.querySelector('[data-case-carousel]');
if(carousel){
  const slides=[...carousel.querySelectorAll('.case-slide')];
  const typed=carousel.querySelector('.typed-case');
  const copy=carousel.querySelector('[data-case-copy]');
  const current=carousel.querySelector('[data-case-current]');
  let index=0,moving=false,typeTimer=0,typeRun=0;
  const typeTitle=slide=>{
    const text=slide.dataset.title||'';typeRun+=1;const run=typeRun;clearTimeout(typeTimer);
    if(reducedMotion){typed.textContent=text;return}
    typed.textContent='';let position=0;
    const tick=()=>{if(run!==typeRun)return;position+=1;typed.textContent=text.slice(0,position);if(position<text.length)typeTimer=setTimeout(tick,40)};
    typeTimer=setTimeout(tick,120);
  };
  const go=direction=>{
    if(moving)return;moving=true;
    const nextIndex=(index+direction+slides.length)%slides.length;
    const from=slides[index],to=slides[nextIndex];
    to.classList.add('is-moving');to.style.transform=`translateX(${direction>0?100:-100}%)`;
    void to.offsetWidth;from.classList.add('is-moving');
    requestAnimationFrame(()=>{from.style.transform=`translateX(${direction>0?-100:100}%)`;to.style.transform='translateX(0)'});
    copy.style.opacity='0';copy.style.transform='translateY(12px)';
    setTimeout(()=>{copy.textContent=to.dataset.copy;copy.style.opacity='1';copy.style.transform='none'},210);
    typeTitle(to);
    setTimeout(()=>{
      from.classList.remove('is-active','is-moving');from.style.transform='';
      to.classList.add('is-active');to.classList.remove('is-moving');to.style.transform='';
      index=nextIndex;current.textContent=String(index+1);moving=false;
    },540);
  };
  copy.style.transition='opacity .25s,transform .25s';
  carousel.querySelector('[data-case-previous]').addEventListener('click',()=>go(-1));
  carousel.querySelector('[data-case-next]').addEventListener('click',()=>go(1));
  typeTitle(slides[0]);
}

function seededRandom(seed){let value=seed%2147483647;if(value<=0)value+=2147483646;return()=>{value=value*16807%2147483647;return(value-1)/2147483646}}
function createParticleField(canvas,index){
  const context=canvas.getContext('2d');
  const kind=canvas.dataset.particles;
  const random=seededRandom(9031+index*7919);
  const colors=kind==='join'?['#5b79ff','#e6456a','#f5bd23','#52c896','#9a6bd4']:kind==='card'?['rgba(54,91,230,.48)','rgba(232,63,91,.42)','rgba(233,171,20,.44)']:['#4968ec','#e34663','#e4aa19','#249a71','#8b61c5'];
  const count=kind==='card'?54:kind==='join'?190:240;
  const particles=Array.from({length:count},(_,particleIndex)=>({
    angle:random()*Math.PI*2,
    radius:.16+random()*.72,
    orbit:.45+random()*.9,
    speed:(.00008+random()*.00024)*(random()>.5?1:-1),
    size:kind==='card'?1+random()*2.1:1+random()*2.4,
    color:colors[particleIndex%colors.length],
    offset:random()*Math.PI*2
  }));
  let width=0,height=0,dpr=1,pointerX=0,pointerY=0,visible=true;
  const resize=()=>{const rect=canvas.getBoundingClientRect();dpr=Math.min(2,devicePixelRatio||1);width=Math.max(1,rect.width);height=Math.max(1,rect.height);canvas.width=Math.round(width*dpr);canvas.height=Math.round(height*dpr);context.setTransform(dpr,0,0,dpr,0,0)};
  const draw=time=>{
    context.clearRect(0,0,width,height);
    const cx=width*(kind==='hero'?.43:.5)+pointerX*12,cy=height*.5+pointerY*8;
    particles.forEach((particle,particleIndex)=>{
      const motion=reducedMotion?0:time*particle.speed;
      const angle=particle.angle+motion;
      const radiusX=width*particle.radius*(kind==='card'?.42:.65);
      const radiusY=height*particle.radius*(kind==='card'?.4:.52);
      const pulse=1+Math.sin(time*.00045+particle.offset)*.05;
      const x=cx+Math.cos(angle)*radiusX*pulse;
      const y=cy+Math.sin(angle*particle.orbit)*radiusY*pulse;
      const fade=Math.min(1,Math.abs(x-cx)/(width*.12)+.12);
      context.save();context.translate(x,y);context.rotate(angle+Math.PI/2);context.globalAlpha=kind==='join'?.82:fade*.68;context.fillStyle=particle.color;
      if(particleIndex%4===0)context.fillRect(-particle.size*1.7,-particle.size*.55,particle.size*3.4,particle.size*1.1);else{context.beginPath();context.arc(0,0,particle.size,0,Math.PI*2);context.fill()}
      context.restore();
    });
    if(visible&&!reducedMotion)requestAnimationFrame(draw);
  };
  canvas.addEventListener('pointermove',event=>{const rect=canvas.getBoundingClientRect();pointerX=(event.clientX-rect.left)/rect.width-.5;pointerY=(event.clientY-rect.top)/rect.height-.5});
  const observer=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;if(visible&&!reducedMotion)requestAnimationFrame(draw)});
  observer.observe(canvas);new ResizeObserver(resize).observe(canvas);resize();draw(0);
}
document.querySelectorAll('canvas[data-particles]').forEach(createParticleField);
