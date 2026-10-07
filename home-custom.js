const reducedMotion=window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const homeHeader=document.querySelector('[data-header]');
const updateHeader=()=>homeHeader?.classList.toggle('is-scrolled',window.scrollY>24);
updateHeader();
window.addEventListener('scroll',updateHeader,{passive:true});

const revealObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{
  if(entry.isIntersecting){entry.target.classList.add('is-visible');revealObserver.unobserve(entry.target)}
}),{threshold:.08,rootMargin:'0px 0px -5%'});
document.querySelectorAll('.reveal-home').forEach(element=>revealObserver.observe(element));

function typeText(target,cursor,text,speed=48,delay=0){
  if(!target)return;
  target.textContent='';cursor?.classList.remove('is-finished');
  if(reducedMotion){target.append(...text.split('|').flatMap((part,index)=>index?[document.createElement('br'),document.createTextNode(part)]:[document.createTextNode(part)]));cursor?.classList.add('is-finished');return}
  let index=0;
  const tick=()=>{
    const character=text[index++];
    if(character==='|')target.appendChild(document.createElement('br'));else target.append(character);
    if(index<text.length)setTimeout(tick,speed);else setTimeout(()=>cursor?.classList.add('is-finished'),700);
  };
  setTimeout(tick,delay);
}

requestAnimationFrame(()=>{
  document.querySelector('.hero-logo-enter')?.classList.add('is-ready');
  document.querySelector('.hero-cta-enter')?.classList.add('is-ready');
  typeText(document.querySelector('.hero-typed'),document.querySelector('.hero-cursor'),'Engineering the next generation of|sustainable mobility',45,180);
});

const introTitle=document.querySelector('.intro-typed');
if(introTitle){
  const introObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{
    if(!entry.isIntersecting)return;
    typeText(introTitle,document.querySelector('.intro-cursor'),'Cal State LA EcoCAR is a multidisciplinary student engineering team building for the future of electrified mobility.',28,100);
    introObserver.disconnect();
  }),{threshold:.25});
  introObserver.observe(introTitle.closest('h2'));
}

const heroInner=document.querySelector('.home-hero-inner');
const heroCanvas=document.querySelector('[data-particles="hero"]');
const videoSection=document.querySelector('.home-video-section');
let scrollFrame=0;
const updateScrollEffects=()=>{
  scrollFrame=0;if(reducedMotion)return;
  const y=window.scrollY;
  if(heroInner&&y<window.innerHeight*1.3){const progress=Math.min(1,y/window.innerHeight);heroInner.style.transform=`translate3d(0,${progress*72}px,0) scale(${1-progress*.035})`;heroInner.style.opacity=String(1-progress*.72)}
  if(heroCanvas)heroCanvas.style.opacity=String(Math.max(0,1-y/(window.innerHeight*.72)));
  if(videoSection){const rect=videoSection.getBoundingClientRect();const progress=Math.max(0,Math.min(1,(window.innerHeight-rect.top)/(window.innerHeight*.82)));videoSection.style.transform=`scale(${.5+progress*.5})`}
};
const requestScrollEffects=()=>{if(!scrollFrame)scrollFrame=requestAnimationFrame(updateScrollEffects)};
window.addEventListener('scroll',requestScrollEffects,{passive:true});window.addEventListener('resize',requestScrollEffects,{passive:true});updateScrollEffects();

function openVideo(){
  if(document.querySelector('.home-video-modal'))return;
  const modal=document.createElement('div');modal.className='home-video-modal';modal.setAttribute('role','dialog');modal.setAttribute('aria-modal','true');modal.setAttribute('aria-label','Cal State LA EcoCAR video');
  modal.innerHTML='<button class="home-video-close" type="button" aria-label="Close video">×</button><div class="home-video-frame"><iframe src="https://www.youtube-nocookie.com/embed/oibPfvqW1zg?autoplay=1&rel=0" title="Cal State LA EcoCAR video" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe></div>';
  document.body.appendChild(modal);document.body.classList.add('eco-video-open');
  const close=()=>{modal.remove();document.body.classList.remove('eco-video-open');videoWrapper?.focus()};
  modal.querySelector('.home-video-close').addEventListener('click',close);modal.addEventListener('click',event=>{if(event.target===modal)close()});modal.addEventListener('keydown',event=>{if(event.key==='Escape')close()});modal.querySelector('.home-video-close').focus();
}
const videoWrapper=document.querySelector('[data-video-wrapper]');
if(videoWrapper){
  const follower=videoWrapper.querySelector('.home-video-follow'),control=videoWrapper.querySelector('.home-video-control');
  const moveFollower=event=>{const rect=videoWrapper.getBoundingClientRect();follower.style.transform=`translate(${event.clientX-rect.left}px,${event.clientY-rect.top}px) translate(-50%,-50%) scale(1)`};
  videoWrapper.addEventListener('pointerenter',event=>{moveFollower(event);follower.classList.add('is-visible');control.classList.add('is-hidden')});videoWrapper.addEventListener('pointermove',moveFollower);videoWrapper.addEventListener('pointerleave',()=>{follower.classList.remove('is-visible');control.classList.remove('is-hidden')});videoWrapper.addEventListener('click',openVideo);videoWrapper.addEventListener('keydown',event=>{if(event.key==='Enter'||event.key===' '){event.preventDefault();openVideo()}});
}

const carousel=document.querySelector('[data-case-carousel]');
if(carousel){
  const slides=[...carousel.querySelectorAll('.case-slide')],typed=carousel.querySelector('.typed-case'),copy=carousel.querySelector('[data-case-copy]'),current=carousel.querySelector('[data-case-current]'),cursor=carousel.querySelector('.typed-cursor');
  let index=0,moving=false,typeTimer=0,typeRun=0;
  const typeTitle=slide=>{const text=slide.dataset.title||'';typeRun+=1;const run=typeRun;clearTimeout(typeTimer);cursor.classList.remove('is-finished');typed.textContent='';if(reducedMotion){typed.textContent=text;cursor.classList.add('is-finished');return}let position=0;const tick=()=>{if(run!==typeRun)return;position+=1;typed.textContent=text.slice(0,position);if(position<text.length)typeTimer=setTimeout(tick,38)};typeTimer=setTimeout(tick,90)};
  const go=direction=>{if(moving)return;moving=true;const nextIndex=(index+direction+slides.length)%slides.length,from=slides[index],to=slides[nextIndex];to.classList.add('is-moving');to.style.transform=`translateX(${direction>0?100:-100}%)`;void to.offsetWidth;from.classList.add('is-moving');requestAnimationFrame(()=>{from.style.transform=`translateX(${direction>0?-100:100}%)`;to.style.transform='translateX(0)'});copy.style.opacity='0';copy.style.transform='translateY(12px)';setTimeout(()=>{copy.textContent=to.dataset.copy;copy.style.opacity='1';copy.style.transform='none'},210);typeTitle(to);setTimeout(()=>{from.classList.remove('is-active','is-moving');from.style.transform='';to.classList.add('is-active');to.classList.remove('is-moving');to.style.transform='';index=nextIndex;current.textContent=String(index+1);moving=false},540)};
  copy.style.transition='opacity .25s,transform .25s';carousel.querySelector('[data-case-previous]').addEventListener('click',()=>go(-1));carousel.querySelector('[data-case-next]').addEventListener('click',()=>go(1));typeTitle(slides[0]);
}

function seededRandom(seed){let value=seed%2147483647;if(value<=0)value+=2147483646;return()=>{value=value*16807%2147483647;return(value-1)/2147483646}}
function createParticleField(canvas,fieldIndex){
  const context=canvas.getContext('2d'),kind=canvas.dataset.particles,random=seededRandom(7411+fieldIndex*3571);
  const colors=kind==='join'?['#4168ff','#6d8dff','#8aa3ff']:['#4768e8','#e24664','#e5a91b','#239b70','#8b61c5'];
  const count=kind==='paths'?220:kind==='join'?250:300;
  const particles=Array.from({length:count},(_,index)=>kind==='paths'?{x:random(),y:random(),size:.7+random()*1.7,speed:.000008+random()*.000018,phase:random()*Math.PI*2,alpha:.2+random()*.45}:{angle:random()*Math.PI*2,ring:Math.floor(random()*(kind==='hero'?13:10))+1,jitter:(random()-.5)*.055,size:1+random()*1.9,speed:(.000005+random()*.000012)*(index%2?1:-1),color:colors[index%colors.length],alpha:.42+random()*.43});
  let width=1,height=1,dpr=1,visible=true,running=false;
  const resize=()=>{const rect=canvas.getBoundingClientRect();dpr=Math.min(2,devicePixelRatio||1);width=Math.max(1,rect.width);height=Math.max(1,rect.height);canvas.width=Math.round(width*dpr);canvas.height=Math.round(height*dpr);context.setTransform(dpr,0,0,dpr,0,0)};
  const draw=time=>{context.clearRect(0,0,width,height);if(kind==='paths'){particles.forEach(p=>{const x=p.x*width+Math.sin(time*p.speed*7+p.phase)*9,y=((p.y+time*p.speed)%1)*height;context.globalAlpha=p.alpha;context.fillStyle='#111318';context.beginPath();context.arc(x,y,p.size,0,Math.PI*2);context.fill()})}else{const cx=width*(kind==='hero'?.47:.62),cy=height*(kind==='hero'?.49:.48),maxX=width*(kind==='hero'?.055:.062),maxY=height*(kind==='hero'?.052:.066);particles.forEach(p=>{const angle=p.angle+(reducedMotion?0:time*p.speed),rx=maxX*p.ring*(1+p.jitter),ry=maxY*p.ring*(1+p.jitter),x=cx+Math.cos(angle)*rx,y=cy+Math.sin(angle)*ry;context.save();context.translate(x,y);context.rotate(angle+Math.PI/2);context.globalAlpha=p.alpha;context.fillStyle=p.color;context.fillRect(-p.size*1.7,-p.size*.48,p.size*3.4,p.size*.96);context.restore()})}context.globalAlpha=1;if(visible&&!reducedMotion)requestAnimationFrame(draw);else running=false};
  const start=()=>{if(running)return;running=true;requestAnimationFrame(draw)};
  const observer=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;if(visible)start()});observer.observe(canvas);new ResizeObserver(resize).observe(canvas);resize();if(reducedMotion)draw(0);else start();
}
document.querySelectorAll('canvas[data-particles]').forEach(createParticleField);
