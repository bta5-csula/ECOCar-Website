const homeIconSequence=['merge','refresh','keyboard_tab','check_circle','code','keyboard_command_key','file_copy','spark','spark','keyboard_return','search_spark','device_hub','dashboard_customize','data_object','terminal','folder','commit','plus_code','developer_mode_tv','deployed_code','code_blocks','pen_spark'];
let homeMotionPromise;

function loadHomeMotion(){
 if(!homeMotionPromise)homeMotionPromise=Promise.all([import('./_astro/gsap.Bi_c5vh2.js'),import('./_astro/ScrollTrigger.BTGKJApg.js')]).then(([gsapModule,scrollModule])=>{const gsap=gsapModule.t,ScrollTrigger=scrollModule.t;gsap.registerPlugin(ScrollTrigger);return{gsap,ScrollTrigger}});
 return homeMotionPromise;
}

function syncHomeIconRow(){
 const uses=document.querySelectorAll('.agent-first-section [data-bouncer-list] use');
 uses.forEach((use,index)=>{if(homeIconSequence[index])use.setAttribute('href',`#${homeIconSequence[index]}`)});
}

async function installIconSprite(){
 if(document.querySelector('[data-local-icon-sprite]'))return;
 const markup=await fetch('.reference/sprite-icons.svg').then(response=>response.text());
 const holder=document.createElement('div');holder.innerHTML=markup;
 const sprite=holder.firstElementChild;sprite.removeAttribute('style');sprite.setAttribute('data-local-icon-sprite','');sprite.setAttribute('aria-hidden','true');sprite.style.cssText='position:absolute;width:0;height:0;overflow:hidden;pointer-events:none';document.body.prepend(sprite);
 document.querySelectorAll('use[href*="sprite-icons.svg#"]').forEach(use=>use.setAttribute('href','#'+use.getAttribute('href').split('#').pop()));
 syncHomeIconRow();
}

function ensureHomeMetadata(){
 const description='Cal State LA EcoCAR is building an electrified 2026 Jeep Cherokee for the EcoCAR Innovation Challenge.';
 const pageUrl=new URL(location.pathname,location.origin).href;
 const imageUrl=new URL('assets/ecocar-logo.jpg',document.baseURI).href;
 document.title='Cal State LA EcoCAR';
 document.querySelector('meta[name="description"]')?.setAttribute('content',description);
 document.querySelectorAll('link[rel="canonical"],link[rel="alternate"],meta[property^="og:"],meta[name^="twitter:"]').forEach(element=>element.remove());
 const addMeta=(attribute,name,content)=>{const meta=document.createElement('meta');meta.setAttribute(attribute,name);meta.content=content;document.head.appendChild(meta)};
 const canonical=document.createElement('link');canonical.rel='canonical';canonical.href=pageUrl;document.head.appendChild(canonical);
 addMeta('property','og:type','website');addMeta('property','og:site_name','Cal State LA EcoCAR');addMeta('property','og:url',pageUrl);addMeta('property','og:title','Cal State LA EcoCAR');addMeta('property','og:description',description);addMeta('property','og:image',imageUrl);
 addMeta('name','twitter:card','summary_large_image');addMeta('name','twitter:title','Cal State LA EcoCAR');addMeta('name','twitter:description',description);addMeta('name','twitter:image',imageUrl);
 document.querySelectorAll('link[rel*="icon"]').forEach(link=>link.remove());const favicon=document.createElement('link');favicon.rel='icon';favicon.type='image/jpeg';favicon.href='assets/ecocar-logo.jpg';document.head.appendChild(favicon);
}

function positionCaseCursor(container,character,after=true){
 const cursor=container.querySelector('.cursor-container');if(!cursor||!character)return;
 const base=container.getBoundingClientRect(),end=character.getBoundingClientRect();let x=(after?end.right:end.left)-base.left,y=end.top-base.top;
 x=Math.max(0,x);y=Math.max(0,y);cursor.style.setProperty('--cursor-pos-x',`${x}px`);cursor.style.setProperty('--cursor-pos-y',`${y}px`);cursor.style.transform=`translate(${x}px,${y}px)`;
}

function prepareCaseTitle(container){
 const content=container?.querySelector('.typed-content'),text=container?.dataset.ecoCaseTitle||'';if(!content)return[];
 let characters=[...content.querySelectorAll('.eco-case-char')];if(content.dataset.ecoPreparedText!==text||characters.length!==[...text].length){content.textContent='';characters=[...text].map(character=>{const span=document.createElement('span');span.className='eco-case-char';span.textContent=character;content.appendChild(span);return span});content.dataset.ecoPreparedText=text}
 return characters;
}

function resetCaseTitle(container){
 if(!container)return;container.dataset.ecoTypingRun=String((Number(container.dataset.ecoTypingRun)||0)+1);prepareCaseTitle(container).forEach(character=>character.classList.remove('is-visible'));const cursor=container.querySelector('.cursor-container');if(cursor)cursor.style.opacity='0';
}

function typeCaseTitle(container){
 const cursor=container.querySelector('.cursor-container');if(!cursor)return;const characters=prepareCaseTitle(container);if(!characters.length)return;
 const run=(Number(container.dataset.ecoTypingRun)||0)+1;container.dataset.ecoTypingRun=String(run);characters.forEach(character=>character.classList.remove('is-visible'));cursor.style.opacity='1';
 positionCaseCursor(container,characters[0],false);
 if(matchMedia('(prefers-reduced-motion: reduce)').matches){characters.forEach(character=>character.classList.add('is-visible'));positionCaseCursor(container,characters.at(-1));return}
 let index=0;const tick=()=>{if(Number(container.dataset.ecoTypingRun)!==run)return;const character=characters[index];character.classList.add('is-visible');positionCaseCursor(container,character);index+=1;if(index<characters.length)setTimeout(tick,38)};setTimeout(tick,90);
}

function installUseCaseTyping(){
 const section=document.querySelector('.landing-use-case-section');if(!section||section.dataset.ecoTypingReady)return;section.dataset.ecoTypingReady='true';let activeIndex='';
 const sync=()=>{const active=section.querySelector('.slide-image.is-active'),next=active?.getAttribute('data-slide-index')||'';if(!active||next===activeIndex)return;activeIndex=next;section.querySelectorAll('[data-eco-case-title] .cursor-container').forEach(cursor=>cursor.style.opacity='0');const title=active.querySelector('[data-eco-case-title]');if(title)typeCaseTitle(title)};
 const observer=new MutationObserver(()=>requestAnimationFrame(sync));section.querySelectorAll('.slide-image').forEach(slide=>observer.observe(slide,{attributes:true,attributeFilter:['class']}));requestAnimationFrame(sync);
}

function installLoopingUseCaseSlider(force=false){
 const section=document.querySelector('.landing-use-case-section'),slider=section?.querySelector('[data-slider]'),track=slider?.querySelector('[data-track]'),copyWrapper=section?.querySelector('[data-copy-wrapper]');if(!section||!slider||!track||!copyWrapper||section.dataset.ecoLoopReady&&!force)return;
 section.dataset.ecoLoopReady='true';const slides=[...track.querySelectorAll('.slide-image')],copies=[...copyWrapper.querySelectorAll('.slider-copy')],count=slides.length;let index=Math.max(0,slides.findIndex(slide=>slide.classList.contains('is-active'))),moving=false;
 const setCopy=next=>copies.forEach((copy,i)=>{const active=i===next;copy.classList.toggle('is-active',active);[...copy.children].forEach(child=>{child.style.opacity=active?'1':'0';child.style.visibility=active?'visible':'hidden';child.style.transform=active?'translateY(0)':'translateY(30px)'})});
 const go=direction=>{if(moving||count<2)return;moving=true;const next=(index+direction+count)%count,from=slides[index],to=slides[next];resetCaseTitle(to.querySelector('[data-eco-case-title]'));to.classList.add('eco-loop-visible');to.style.transition='none';to.style.transform=`translateX(${direction>0?100:-100}%)`;to.style.opacity='1';void to.offsetWidth;from.classList.add('eco-loop-visible');from.style.transition='transform .48s cubic-bezier(.22,.7,.18,1)';to.style.transition='transform .48s cubic-bezier(.22,.7,.18,1)';requestAnimationFrame(()=>{from.style.transform=`translateX(${direction>0?-100:100}%)`;to.style.transform='translateX(0)'});setCopy(next);setTimeout(()=>{from.classList.remove('is-active','eco-loop-visible');from.style.cssText='';to.classList.add('is-active');to.classList.remove('eco-loop-visible');to.style.cssText='';index=next;slider.dataset.activeIndex=String(index);moving=false},500)};
 const controls=section.querySelector('.slider-controls');if(!controls)return;const clean=controls.cloneNode(true);controls.replaceWith(clean);const previous=clean.querySelector('[data-arrow-left]'),next=clean.querySelector('[data-arrow-right]');const enable=()=>[previous,next].forEach(button=>{if(button){button.disabled=false;button.removeAttribute('disabled')}});enable();new MutationObserver(enable).observe(clean,{subtree:true,attributes:true,attributeFilter:['disabled']});previous?.addEventListener('click',event=>{event.preventDefault();event.stopImmediatePropagation();go(-1)},true);next?.addEventListener('click',event=>{event.preventDefault();event.stopImmediatePropagation();go(1)},true);setCopy(index);
}

function installFeaturedVideo(){
 const wrapper=document.querySelector('[data-video-wrapper]');if(!wrapper||wrapper.dataset.ecoVideoReady)return;wrapper.dataset.ecoVideoReady='true';wrapper.dataset.ecoReady='true';wrapper.setAttribute('role','button');wrapper.setAttribute('tabindex','0');wrapper.setAttribute('aria-label','Play Cal State LA EcoCAR video');
 wrapper.innerHTML='<div class="home-video-preview"><video class="home-video-teaser" muted loop playsinline preload="metadata" poster="assets/images/team/team-intro-first-frame.jpg" aria-hidden="true"><source src="assets/images/team/team-intro.mov" type="video/mp4"></video></div><div class="home-video-follow" aria-hidden="true"><svg viewBox="0 -960 960 960" width="24" height="24" fill="currentColor"><path d="M340-238.39V-726.07L723.07-482.23 340-238.39Z"></path></svg><span>Play team video</span></div><div class="video-control-button home-video-control" aria-hidden="true"><svg viewBox="0 -960 960 960" width="24" height="24" fill="currentColor"><path d="M340-238.39V-726.07L723.07-482.23 340-238.39Z"></path></svg></div>';
 const teaser=wrapper.querySelector('.home-video-teaser'),reducedMotion=matchMedia('(prefers-reduced-motion: reduce)').matches;let teaserInView=false;
 const syncTeaser=()=>{if(reducedMotion||!teaserInView||document.querySelector('.home-video-modal'))teaser?.pause();else teaser?.play().catch(()=>{})};
 wrapper.ecoSetTeaserInView=visible=>{teaserInView=visible;syncTeaser()};
 const follower=wrapper.querySelector('.home-video-follow'),control=wrapper.querySelector('.home-video-control');
 if(!reducedMotion)loadHomeMotion().then(({gsap})=>{let active=false,lastX=0,lastY=0;gsap.set(follower,{xPercent:-50,yPercent:-50,scale:0,opacity:0});const moveX=gsap.quickTo(follower,'x',{duration:.35,ease:'power2.out'}),moveY=gsap.quickTo(follower,'y',{duration:.35,ease:'power2.out'});const position=(immediate=false)=>{const rect=wrapper.getBoundingClientRect(),x=lastX-rect.left,y=lastY-rect.top;if(immediate)gsap.set(follower,{x,y});else{moveX(x);moveY(y)}};const show=event=>{if(document.querySelector('.home-video-modal'))return;active=true;lastX=event.clientX;lastY=event.clientY;wrapper.style.cursor='none';position(true);control.classList.add('is-hidden');gsap.to(follower,{scale:1,opacity:1,duration:.3,ease:'back.out(1.7)'})};const hide=()=>{if(!active)return;active=false;wrapper.style.cursor='';control.classList.remove('is-hidden');gsap.to(follower,{scale:0,opacity:0,duration:.2,ease:'power2.in'})};wrapper.addEventListener('pointerenter',show);wrapper.addEventListener('pointermove',event=>{lastX=event.clientX;lastY=event.clientY;if(active)position()});wrapper.addEventListener('pointerleave',hide);addEventListener('scroll',()=>{if(active)position()},{passive:true})}).catch(()=>{follower.style.transition='opacity .2s ease,transform .3s cubic-bezier(.2,.8,.2,1)';const move=event=>{const rect=wrapper.getBoundingClientRect();follower.style.transform=`translate(${event.clientX-rect.left}px,${event.clientY-rect.top}px) translate(-50%,-50%) scale(1)`};wrapper.addEventListener('pointerenter',event=>{move(event);follower.classList.add('is-visible');control.classList.add('is-hidden')});wrapper.addEventListener('pointermove',move);wrapper.addEventListener('pointerleave',()=>{follower.classList.remove('is-visible');control.classList.remove('is-hidden')})});
 const open=()=>{if(document.querySelector('.home-video-modal'))return;teaser?.pause();const modal=document.createElement('div');modal.className='home-video-modal';modal.setAttribute('role','dialog');modal.setAttribute('aria-modal','true');modal.setAttribute('aria-label','Cal State LA EcoCAR team video');modal.innerHTML='<button class="home-video-close" type="button" aria-label="Close video">×</button><div class="home-video-frame"><video controls autoplay playsinline preload="metadata" poster="assets/images/team/team-intro-first-frame.jpg"><source src="assets/images/team/team-intro.mov" type="video/mp4">Your browser does not support this video.</video></div>';document.body.appendChild(modal);document.body.classList.add('eco-video-open');const video=modal.querySelector('video');const close=()=>{video?.pause();modal.remove();document.body.classList.remove('eco-video-open');syncTeaser();wrapper.focus()};modal.querySelector('.home-video-close').addEventListener('click',close);modal.addEventListener('click',event=>{if(event.target===modal)close()});modal.addEventListener('keydown',event=>{if(event.key==='Escape')close()});modal.querySelector('.home-video-close').focus();video?.play().catch(()=>{})};wrapper.addEventListener('click',open);wrapper.addEventListener('keydown',event=>{if(event.key==='Enter'||event.key===' '){event.preventDefault();open()}});
}

function installCaseCursor(slide){
 if(slide.dataset.ecoCursorReady)return;
 slide.dataset.ecoCursorReady='true';
 slide.setAttribute('role','link');slide.setAttribute('tabindex','0');slide.setAttribute('aria-label','View this EcoCAR project area');
 const cursor=document.createElement('div');cursor.className='eco-case-cursor';cursor.setAttribute('aria-hidden','true');
 cursor.innerHTML='<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M5 12h13M13 6l6 6-6 6"></path></svg><span>View project</span>';
 slide.appendChild(cursor);
 const move=event=>{const rect=slide.getBoundingClientRect();cursor.style.transform=`translate(${event.clientX-rect.left}px,${event.clientY-rect.top}px) translate(-50%,-50%) scale(1)`};
 slide.addEventListener('pointerenter',event=>{move(event);cursor.classList.add('is-visible')});
 slide.addEventListener('pointermove',move);
 slide.addEventListener('pointerleave',()=>cursor.classList.remove('is-visible'));
 const openProject=()=>{location.href='vehicle.html'};
 slide.addEventListener('click',openProject);
 slide.addEventListener('keydown',event=>{if(event.key==='Enter'||event.key===' '){event.preventDefault();openProject()}});
}

async function installFeaturedVideoScale(){
 const section=document.querySelector('.landing-video-section'),wrapper=section?.querySelector('[data-video-wrapper]');if(!section||section.dataset.ecoScaleReady)return;section.dataset.ecoScaleReady='true';if(matchMedia('(prefers-reduced-motion: reduce)').matches){section.style.transform='scale(1)';wrapper?.ecoSetTeaserInView?.(false);return}
 try{const{gsap,ScrollTrigger}=await loadHomeMotion(),mobile=innerWidth<=768;gsap.from(section,{scrollTrigger:{trigger:section,start:'top bottom',end:mobile?'top 80%':'top center',scrub:1},scale:mobile?.92:.5,ease:'power2.out'});ScrollTrigger.create({trigger:section,start:'top bottom',end:'bottom top',onEnter:()=>wrapper?.ecoSetTeaserInView?.(true),onLeave:()=>wrapper?.ecoSetTeaserInView?.(false),onEnterBack:()=>wrapper?.ecoSetTeaserInView?.(true),onLeaveBack:()=>wrapper?.ecoSetTeaserInView?.(false)})}
 catch{if('IntersectionObserver'in window)new IntersectionObserver(entries=>wrapper?.ecoSetTeaserInView?.(Boolean(entries[0]?.isIntersecting)),{threshold:.42}).observe(section);else wrapper?.ecoSetTeaserInView?.(true)}
}

function installAccessibleMobileMenu(){
 const menu=document.querySelector('[data-mobile-menu]'),toggle=document.querySelector('[data-mobile-menu-toggle]');if(!menu||!toggle||menu.dataset.ecoA11yReady)return;menu.dataset.ecoA11yReady='true';if(!menu.id)menu.id='eco-mobile-menu';toggle.setAttribute('aria-controls',menu.id);
 const sync=()=>{const open=menu.classList.contains('open');toggle.setAttribute('aria-expanded',String(open));toggle.setAttribute('aria-label',open?'Close navigation menu':'Open navigation menu');menu.setAttribute('aria-hidden',String(!open));menu.inert=!open;menu.querySelectorAll('a').forEach(link=>link.tabIndex=open?0:-1)};
 new MutationObserver(sync).observe(menu,{attributes:true,attributeFilter:['class']});sync();
}

function installPartnerBandInteractions(band){
 if(!band||band.dataset.ecoInteractionReady)return;
 band.dataset.ecoInteractionReady='true';
 const track=band.querySelector('.home-partner-track');
 const viewport=band.querySelector('.home-partner-viewport');
 const cards=[...band.querySelectorAll('.home-partner-card')];
 const reducedMotion=matchMedia('(prefers-reduced-motion: reduce)').matches;
 let rate=1,targetRate=1,rateFrame=0;
 const animateRate=()=>{rate+=(targetRate-rate)*.075;track.getAnimations().forEach(animation=>animation.playbackRate=rate);if(Math.abs(targetRate-rate)>.01)rateFrame=requestAnimationFrame(animateRate);else{rate=targetRate;track.getAnimations().forEach(animation=>animation.playbackRate=rate);rateFrame=0}};
 const setRate=next=>{if(reducedMotion)return;targetRate=next;if(!rateFrame)rateFrame=requestAnimationFrame(animateRate)};
 band.addEventListener('pointerenter',()=>{band.classList.add('is-interacting');setRate(.12)});
 band.addEventListener('pointerleave',()=>{band.classList.remove('is-interacting');setRate(1)});
 band.addEventListener('focusin',()=>setRate(.12));
 band.addEventListener('focusout',()=>requestAnimationFrame(()=>{if(!band.contains(document.activeElement))setRate(1)}));
 cards.forEach(card=>{card.addEventListener('pointermove',event=>{if(reducedMotion)return;const rect=card.getBoundingClientRect(),x=((event.clientX-rect.left)/rect.width-.5)*10,y=((event.clientY-rect.top)/rect.height-.5)*8;card.style.setProperty('--mag-x',`${x}px`);card.style.setProperty('--mag-y',`${y}px`)});card.addEventListener('pointerleave',()=>{card.style.setProperty('--mag-x','0px');card.style.setProperty('--mag-y','0px')})});
 let drag=null,dragged=false;
 const finishDrag=event=>{if(!drag)return;viewport.releasePointerCapture?.(event.pointerId);drag=null;viewport.classList.remove('is-dragging');setTimeout(()=>setRate(band.matches(':hover')?.12:1),420)};
 viewport.addEventListener('pointerdown',event=>{if(reducedMotion||event.pointerType==='mouse'||event.button!==0)return;const animation=track.getAnimations()[0];if(!animation)return;drag={x:event.clientX,time:Number(animation.currentTime)||0,animation,duration:Number(animation.effect?.getTiming().duration)||80000,width:band.querySelector('.home-partner-set')?.scrollWidth||1};dragged=false;viewport.setPointerCapture?.(event.pointerId);viewport.classList.add('is-dragging');animation.pause()});
 viewport.addEventListener('pointermove',event=>{if(!drag)return;const delta=drag.x-event.clientX;if(Math.abs(delta)>6)dragged=true;drag.animation.currentTime=drag.time+delta*(drag.duration/drag.width)});
 viewport.addEventListener('pointerup',finishDrag);viewport.addEventListener('pointercancel',finishDrag);
 viewport.addEventListener('click',event=>{if(dragged){event.preventDefault();event.stopPropagation();dragged=false}},true);
}

function installPartnerDockInteractions(dock){
 if(!dock||dock.dataset.ecoInteractionReady)return;
 dock.dataset.ecoInteractionReady='true';
 const track=dock.querySelector('.home-partner-dock-track');
 const viewport=dock.querySelector('.home-partner-dock-viewport');
 const cards=[...dock.querySelectorAll('.home-partner-card')];
 const reducedMotion=matchMedia('(prefers-reduced-motion: reduce)').matches;
 let rate=1,targetRate=1,rateFrame=0,focusFrame=0,inView=false,hovered=false,cardHovered=false,drag=null,dragged=false,inertiaFrame=0,scrollTimer=0,lastScrollY=scrollY,lastScrollTime=performance.now();
 const animations=()=>track?.getAnimations?.()||[];
 const animateRate=()=>{rate+=(targetRate-rate)*(targetRate>rate?.16:.07);animations().forEach(animation=>animation.playbackRate=rate);if(Math.abs(targetRate-rate)>.008)rateFrame=requestAnimationFrame(animateRate);else{rate=targetRate;animations().forEach(animation=>animation.playbackRate=rate);rateFrame=0}};
 const setRate=next=>{if(reducedMotion)return;targetRate=next;if(!rateFrame)rateFrame=requestAnimationFrame(animateRate)};
 const updateFocus=()=>{if(!inView||reducedMotion){focusFrame=0;return}const rect=viewport.getBoundingClientRect(),center=rect.left+rect.width/2,range=rect.width*.34;cards.forEach(card=>{const cardRect=card.getBoundingClientRect(),distance=Math.abs(cardRect.left+cardRect.width/2-center),influence=Math.max(0,1-distance/range);card.style.setProperty('--center-boost','0');card.style.setProperty('--center-y',`${(influence*-5).toFixed(2)}px`);card.style.setProperty('--center-opacity','1');card.style.setProperty('--center-saturation',(0.98+influence*.06).toFixed(3));card.style.setProperty('--center-brightness',(1+influence*.035).toFixed(3))});focusFrame=requestAnimationFrame(updateFocus)};
 const setInView=visible=>{inView=visible;if(visible){dock.classList.add('is-visible');if(!focusFrame&&!reducedMotion)focusFrame=requestAnimationFrame(updateFocus)}};
 if(!('IntersectionObserver' in window))setInView(true);else new IntersectionObserver(entries=>setInView(entries[0]?.isIntersecting),{threshold:.08}).observe(dock);
 dock.addEventListener('pointermove',event=>{if(reducedMotion)return;const rect=dock.getBoundingClientRect();dock.style.setProperty('--dock-x',`${((event.clientX-rect.left)/rect.width)*100}%`);dock.style.setProperty('--dock-y',`${((event.clientY-rect.top)/rect.height)*100}%`)});
 dock.addEventListener('pointerenter',()=>{hovered=true;setRate(.16)});
 dock.addEventListener('pointerleave',()=>{hovered=false;cardHovered=false;dock.style.setProperty('--dock-x','50%');dock.style.setProperty('--dock-y','46%');if(!drag){rate=Math.max(rate,.42);animations().forEach(animation=>{animation.play();animation.playbackRate=rate});setRate(1)}});
 dock.addEventListener('focusin',event=>{setRate(.16);if(event.target.closest('.home-partner-card'))animations().forEach(animation=>animation.pause())});
 dock.addEventListener('focusout',()=>requestAnimationFrame(()=>{if(!dock.contains(document.activeElement)){animations().forEach(animation=>animation.play());if(!hovered)setRate(1)}}));
 cards.forEach(card=>{
  card.addEventListener('pointerenter',()=>{cardHovered=true;animations().forEach(animation=>animation.pause())});
  card.addEventListener('pointermove',event=>{if(reducedMotion)return;const rect=card.getBoundingClientRect(),x=(event.clientX-rect.left)/rect.width-.5,y=(event.clientY-rect.top)/rect.height-.5;card.style.setProperty('--mag-x',`${x*7}px`);card.style.setProperty('--mag-y',`${y*6}px`);card.style.setProperty('--tilt-x',`${y*-5}deg`);card.style.setProperty('--tilt-y',`${x*7}deg`)});
  card.addEventListener('pointerleave',()=>{cardHovered=false;card.style.setProperty('--mag-x','0px');card.style.setProperty('--mag-y','0px');card.style.setProperty('--tilt-x','0deg');card.style.setProperty('--tilt-y','0deg');if(hovered&&!drag){animations().forEach(animation=>animation.play());setRate(.16)}});
 });
 const resume=()=>{if(cardHovered||dock.contains(document.activeElement)&&document.activeElement.closest('.home-partner-card'))return;animations().forEach(animation=>animation.play());setRate(hovered?.16:1)};
 const runInertia=()=>{if(!drag||Math.abs(drag.velocity)<.018){drag=null;inertiaFrame=0;resume();return}drag.velocity*=.91;drag.time+=drag.velocity*16*(drag.duration/drag.width);drag.animation.currentTime=drag.time;inertiaFrame=requestAnimationFrame(runInertia)};
 viewport.addEventListener('pointerdown',event=>{if(reducedMotion||event.button!==0)return;const animation=animations()[0],setWidth=dock.querySelector('.home-partner-dock-set')?.scrollWidth||1;if(!animation)return;if(inertiaFrame){cancelAnimationFrame(inertiaFrame);inertiaFrame=0}drag={animation,pointerId:event.pointerId,x:event.clientX,lastX:event.clientX,lastAt:performance.now(),time:Number(animation.currentTime)||0,duration:Number(animation.effect?.getTiming().duration)||82000,width:setWidth,velocity:0,active:false};dragged=false});
 viewport.addEventListener('pointermove',event=>{if(!drag||event.pointerId!==drag.pointerId)return;if(!drag.active){if(Math.abs(event.clientX-drag.x)<=6)return;drag.active=true;dragged=true;viewport.setPointerCapture?.(event.pointerId);viewport.classList.add('is-dragging');drag.animation.pause()}const now=performance.now(),delta=drag.lastX-event.clientX,elapsed=Math.max(8,now-drag.lastAt);drag.velocity=drag.velocity*.55+(delta/elapsed)*.45;drag.time+=delta*(drag.duration/drag.width);drag.animation.currentTime=drag.time;drag.lastX=event.clientX;drag.lastAt=now});
 const finishDrag=event=>{if(!drag||event.pointerId!==drag.pointerId)return;if(!drag.active){drag=null;return}viewport.releasePointerCapture?.(event.pointerId);viewport.classList.remove('is-dragging');if(Math.abs(drag.velocity)>.02)inertiaFrame=requestAnimationFrame(runInertia);else{drag=null;resume()}};
 viewport.addEventListener('pointerup',finishDrag);viewport.addEventListener('pointercancel',finishDrag);
 viewport.addEventListener('click',event=>{if(dragged){event.preventDefault();event.stopPropagation();dragged=false}},true);
 addEventListener('scroll',()=>{if(reducedMotion||hovered||drag||!inView)return;const now=performance.now(),delta=Math.abs(scrollY-lastScrollY),elapsed=Math.max(16,now-lastScrollTime),velocity=delta/elapsed;lastScrollY=scrollY;lastScrollTime=now;setRate(Math.min(1.55,1+velocity*.24));clearTimeout(scrollTimer);scrollTimer=setTimeout(()=>setRate(1),150)},{passive:true});
}

function installPartnerRibbons(){
 if(document.querySelector('[data-home-partner-band="top"]'))return;
 const welcome=document.querySelector('.welcome-wrapper');
 const footer=document.querySelector('footer.footer');
 if(!welcome||!footer)return;
 const partners=[
  ['Stellantis','https://www.stellantis.com/','assets/logos/stellantis.jpg','is-stellantis'],
  ['MathWorks','https://www.mathworks.com/','assets/logos/mathworks.png',''],
  ['U.S. Department of Energy','https://www.energy.gov/','assets/logos/doe.png',''],
  ['EcoCAR Innovation Challenge','https://avtcseries.org/about-the-ecocar-innovation-challenge/','assets/logos/ecocar-innovation-challenge.png','is-featured'],
  ['Advanced Vehicle Technology Competitions','https://avtcseries.org/','assets/logos/avtc.png',''],
  ['Argonne National Laboratory','https://www.anl.gov/','assets/logos/argonne.png',''],
  ['Cal State LA','https://www.calstatela.edu/','assets/logos/cal-state-la-primary-a-official.png','is-cal-state-la'],
  ['South Coast AQMD','https://www.aqmd.gov/','assets/logos/south-coast-aqmd.png','is-aqmd'],
  ['Hesse Mechatronics','https://www.hesse-mechatronics.com/en/','assets/logos/hesse-mechatronics.png',''],
  ['Analog Devices','https://www.analog.com/en/index.html','assets/logos/analog-devices.png','is-analog']
 ];
 const makeCards=(items,modifier='')=>items.map(([name,url,image,className],index)=>`<a class="home-partner-card ${modifier} ${className}"${modifier?` style="--dock-index:${index}"`:''} href="${url}" target="_blank" rel="noopener noreferrer" aria-label="Visit ${name} website" title="${name}"><img src="${image}" alt="${name}"></a>`).join('');
 const cards=makeCards(partners);
 const createBand=position=>{
  const section=document.createElement('section');
  section.className=`home-partner-band home-partner-band--${position}`;
  section.dataset.homePartnerBand=position;
  section.setAttribute('aria-label','EcoCAR program partners and Cal State LA EcoCAR sponsors');
  if(position==='top'){
   const dockCards=makeCards(partners,'home-partner-card--dock');
   section.innerHTML=`<div class="home-partner-heading"><span>Program partners and team sponsors</span><div class="home-partner-links"><a href="https://avtcseries.org/about-the-ecocar-innovation-challenge/" target="_blank" rel="noopener noreferrer">About the EcoCAR Innovation Challenge <span aria-hidden="true">↗</span></a><a href="https://www.instagram.com/ecocarchallenge/" target="_blank" rel="noopener noreferrer">EcoCAR Challenge on Instagram <span aria-hidden="true">↗</span></a></div></div><div class="home-partner-dock"><span class="home-partner-dock-focus" aria-hidden="true"></span><div class="home-partner-dock-viewport"><div class="home-partner-dock-track"><div class="home-partner-dock-set">${dockCards}</div><div class="home-partner-dock-set" aria-hidden="true">${dockCards}</div></div></div></div>`;
   section.querySelectorAll('.home-partner-dock-set[aria-hidden="true"] a').forEach(link=>link.tabIndex=-1);
   installPartnerDockInteractions(section.querySelector('.home-partner-dock'));
  }else{
   const programCards=makeCards([partners[0],partners[3],partners[1],partners[2],partners[4],partners[5]],'home-partner-card--showcase');
   const sponsorCards=makeCards([partners[6],partners[7],partners[8],partners[9]],'home-partner-card--showcase');
   section.innerHTML=`<div class="home-partner-showcase"><div class="home-partner-showcase-copy"><p class="home-partner-showcase-kicker">Powered by partnership</p><h2>Program partners<br>and team sponsors</h2><p>Industry, government, and education partners help Cal State LA students turn engineering knowledge into a competition-ready vehicle.</p></div><div class="home-partner-showcase-groups"><div class="home-partner-showcase-group"><p>Program partners</p><div class="home-partner-showcase-grid home-partner-showcase-grid--program">${programCards}</div></div><div class="home-partner-showcase-group home-partner-showcase-group--sponsors"><p>Team sponsors</p><div class="home-partner-showcase-grid home-partner-showcase-grid--sponsors">${sponsorCards}</div></div></div></div>`;
  }
  return section;
 };
 welcome.insertAdjacentElement('afterend',createBand('top'));
 footer.insertAdjacentElement('beforebegin',createBand('bottom'));
}

function customizeHome(){
 ensureHomeMetadata();
 document.querySelectorAll('use[href*="sprite-icons.svg"]').forEach(use=>use.setAttribute('href',use.getAttribute('href').replace(/^https:\/\/antigravity\.google\/assets\/image\/icons\/sprite-icons\.svg/,'.reference/sprite-icons.svg')));
 const logoLink=document.querySelector('[data-logo-link]');if(logoLink){logoLink.href='index.html';logoLink.setAttribute('aria-label','Cal State LA EcoCAR');logoLink.innerHTML='<span class="eco-brand"><img src="assets/ecocar-logo.jpg" alt="">Cal State LA EcoCAR</span>';}
 const heroLogo=document.querySelector('.logo-container.astro-lcdefpme');if(heroLogo)heroLogo.innerHTML='<div class="home-team-logo"><img src="assets/ecocar-logo.jpg" alt="">Cal State LA EcoCAR</div>';
 const nav=document.querySelector('header nav.nav');if(nav)nav.innerHTML='<div class="nav-item"><a class="call-to-action--nav button button-nav button-compact nav-trigger-btn" href="about.html"><span>About</span></a></div><div class="nav-item"><a class="call-to-action--nav button button-nav button-compact nav-trigger-btn" href="vehicle.html"><span>Vehicle</span></a></div><div class="nav-item"><a class="call-to-action--nav button button-nav button-compact nav-trigger-btn" href="team.html"><span>Team</span></a></div><div class="nav-item"><a class="call-to-action--nav button button-nav button-compact nav-trigger-btn" href="outreach.html"><span>Outreach</span></a></div><div class="nav-item"><a class="call-to-action--nav button button-nav button-compact nav-trigger-btn" href="news.html"><span>News</span></a></div>';
 document.querySelectorAll('.rocket-link').forEach(link=>link.style.display='none');
 document.querySelectorAll('.download-button').forEach(link=>{link.href='join.html';link.classList.add('eco-header-join');link.querySelectorAll('.icon,.dropdown-icon').forEach(icon=>icon.remove());const span=link.querySelector('span');if(span)span.textContent='Join the Team'});
 document.querySelectorAll('.welcome-wrapper a[href="join.html"]').forEach(link=>link.classList.add('eco-hero-join'));
 const mobile=document.querySelector('[data-mobile-menu] .mobile-menu-content');if(mobile)mobile.innerHTML='<nav class="eco-mobile-links"><a href="about.html">About</a><a href="vehicle.html">Vehicle</a><a href="team.html">Team</a><a href="outreach.html">Outreach</a><a href="news.html">News</a><a href="join.html">Join the Team</a></nav>';
 installAccessibleMobileMenu();installFeaturedVideo();installFeaturedVideoScale();installPartnerRibbons();syncHomeIconRow();
 const featurePhotos=['assets/images/Geoffrey Chavez, Ayaan Gulwani, Dr. Masood Shahverdi, and the 2026 Jeep Cherokee.jpg','assets/images/Geoffrey and Dr. Shahverdi.jpg','assets/images/Geoffrey.jpg'];document.querySelectorAll('.feature-media').forEach((media,index)=>{if(media.dataset.ecoReady)return;media.dataset.ecoReady='true';media.innerHTML=`<img class="eco-editorial-photo" src="${featurePhotos[index%featurePhotos.length]}" alt="Cal State LA EcoCAR at the 2026 launch workshop">`});
 const caseLabels=['Vehicle integration','Battery engineering','Controls and CAN'];
 const casePhotos=['assets/images/Geoffrey Chavez, Ayaan Gulwani, Dr. Masood Shahverdi, and the 2026 Jeep Cherokee.jpg','assets/images/Geoffrey and Dr. Shahverdi.jpg','assets/images/Geoffrey Dart.jpg'];
 document.querySelectorAll('.landing-use-case-section .slide-image').forEach((slide,index)=>{
  slide.classList.add('eco-static-case');slide.removeAttribute('data-youtube-url');
  slide.querySelectorAll('.custom-cursor-wrapper,.video-control-button').forEach(element=>element.remove());
  const title=slide.querySelector('.slide-image-overlay [data-typed-header],.slide-image-overlay [data-eco-case-title]');
  if(title){title.removeAttribute('data-typed-header');title.dataset.ecoCaseTitle=caseLabels[index]||'Team media';const hidden=title.querySelector('.visually-hidden');if(hidden)hidden.textContent=title.dataset.ecoCaseTitle;prepareCaseTitle(title)}
  const wrapper=slide.querySelector('.slide-image-wrapper');
  if(wrapper&&!wrapper.dataset.ecoReady){wrapper.dataset.ecoReady='true';wrapper.innerHTML=`<div class="eco-case-placeholder"><img src="${casePhotos[index%casePhotos.length]}" alt="Cal State LA EcoCAR workshop"></div>`}
  installCaseCursor(slide);
 });
 const downloadCta=document.querySelector('[data-cta-container]');if(downloadCta&&!downloadCta.querySelector('.eco-join-cta'))downloadCta.innerHTML='<a href="join.html" class="eco-join-cta call-to-action button button-primary-inverse"><span>Join the Team</span></a>';
 const mobileNotice=document.querySelector('[data-mobile-footer-notice]');if(mobileNotice&&!mobileNotice.querySelector('.eco-mobile-notice-title')){mobileNotice.classList.add('eco-mobile-notice');mobileNotice.innerHTML='<p class="eco-mobile-notice-title">Meet the team in B-13</p><p class="eco-mobile-notice-copy">General meetings are Fridays from 12–1 p.m. in the Engineering Building garage.</p><a class="button button-secondary-inverse" href="mailto:ecocarchargingeagles@gmail.com">Email the team</a>'}
 document.querySelectorAll('a').forEach(link=>{const label=link.textContent.trim();if(label==='Download'||label.startsWith('Download for')){link.href='join.html';const span=link.querySelector('span');if(span)span.textContent='Join the Team'}if(label==='Email the team')link.href='mailto:ecocarchargingeagles@gmail.com';if(label==='Explore Product'||label==='View case')link.href='vehicle.html';if(label==='Read More')link.href='about.html';if(label==='View news')link.href='news.html';});
 document.querySelectorAll('a[href*="antigravity.google"]').forEach(link=>{link.removeAttribute('href');link.setAttribute('aria-hidden','true');link.tabIndex=-1});
 const footerInner=document.querySelector('footer .footer-inner');if(footerInner&&!footerInner.dataset.ecoReady){footerInner.dataset.ecoReady='true';footerInner.classList.add('eco-footer-layout');footerInner.innerHTML='<div class="eco-footer-title"><p class="footer-title heading-5">Cal State LA EcoCAR</p></div><div class="eco-footer-nav"><p class="caption">Explore</p><a class="call-to-action call-to-action--nav" href="about.html">About</a><a class="call-to-action call-to-action--nav" href="vehicle.html">Vehicle</a><a class="call-to-action call-to-action--nav" href="team.html">Team</a><a class="call-to-action call-to-action--nav" href="outreach.html">Outreach</a></div><div class="eco-footer-nav"><p class="caption">Connect</p><a class="call-to-action call-to-action--nav" href="news.html">News</a><a class="call-to-action call-to-action--nav" href="join.html">Join the Team</a><a class="call-to-action call-to-action--nav" href="https://www.instagram.com/csulaecocar/">Instagram</a></div>'}
 const footerWord=document.querySelector('[data-antigravity-footer-wrapper]');if(footerWord)footerWord.innerHTML='<div class="home-footer-word">EcoCAR</div>';
 const footerLinks=document.querySelector('.footer-google-links');if(footerLinks)footerLinks.innerHTML='<div class="home-footer-meta">California State University, Los Angeles · Fridays at 12–1 PM · B-13 Engineering Building Garage</div>';
 document.querySelectorAll('[data-typed-header]').forEach(container=>{const accessibleText=container.querySelector('.visually-hidden')?.textContent.trim();if(accessibleText)container.dataset.ecoText=accessibleText});
 const iconSection=[...document.querySelectorAll('section')].find(section=>section.textContent.includes('multidisciplinary student engineering team'));if(iconSection){iconSection.id='icon-row';if(location.hash==='#icon-row')iconSection.scrollIntoView()}
 document.documentElement.classList.add('ecocar-ready');
}

customizeHome();installIconSprite();
installUseCaseTyping();installLoopingUseCaseSlider();
document.addEventListener('DOMContentLoaded',()=>{customizeHome();installUseCaseTyping();installLoopingUseCaseSlider();setTimeout(()=>installLoopingUseCaseSlider(true),100);setTimeout(customizeHome,300);setTimeout(customizeHome,1200);setTimeout(customizeHome,3500)});
