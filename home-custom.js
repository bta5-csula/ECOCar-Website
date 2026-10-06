const homeTextReplacements=new Map([
 ['Experience liftoff with the next-gen agent platform','Engineering the next generation of sustainable mobility'],
 ['Google Antigravity is our agentic development platform, allowing anyone to build in the agent-first era.','Cal State LA EcoCAR is a multidisciplinary student engineering team building for the future of electrified mobility.'],
 ['Antigravity 2.0','2026 Jeep Cherokee Hybrid'],
 ['Your command center to manage multiple local agents in parallel. Group conversations into Projects, operate across multiple workspaces, and automate routine tasks with scheduled messages.','We are converting a production hybrid into a P4 electrified vehicle with a student-built high-voltage battery and electric rear drive.'],
 ['Antigravity CLI','High-Voltage Battery'],
 ['The lightweight, fast, terminal-first surface to work with Antigravity agents. Run autonomous coding agents, execute shell commands directly, and manage background subagents all from your keyboard.','Cells, modules, pack structure and thermal limits come together in the system that defines the vehicle architecture.'],
 ['Antigravity SDK','Rear Drive Integration'],
 ['Prototype custom agents leveraging Antigravity’s harness with minimal code. Simple Python scripts to iterate on agentic applications, automate software engineering tasks, and run evaluations on top of the Antigravity agent harness.','The electric rear axle, motors, inverters, mounts and load paths turn the hybrid Cherokee into a through-the-road all-wheel-drive vehicle.'],
 ["Prototype custom agents leveraging Antigravity's harness with minimal code. Simple Python scripts to iterate on agentic applications, automate software engineering tasks, and run evaluations on top of the Antigravity agent harness.",'The electric rear axle, motors, inverters, mounts and load paths turn the hybrid Cherokee into a through-the-road all-wheel-drive vehicle.'],
 ['Antigravity IDE','Controls / Embedded'],
 ['The fully-featured, agentic IDE. Complete with the agent manager, artifacts, and a deep understanding of your codebase.','Real-time controls, CAN communication and safe-state logic coordinate the powertrain as one vehicle.'],
 ['Built for developers for the agent-first era','Built by students for the future of mobility'],
 ['Built for developers','Built by students'],['for the agent-first era','for the future of mobility'],
 ["Google Antigravity is built for user trust, whether you're a professional developer working in a large enterprise codebase, a hobbyist vibe-coding in their spare time, or anyone in between.",'Real deadlines, scored deliverables and industry judges turn classroom knowledge into hands-on vehicle engineering experience.'],
 ['Full stack developer','Vehicle integration'],['Enterprise developer','Battery engineering'],['Frontend developer','Controls and CAN'],
 ['Build production-ready applications with confidence with thoroughly designed artifacts and comprehensive verification tests.','Integrate electrical, mechanical and software systems into one safe, capable vehicle.'],
 ['Google Antigravity empowers the next era of enterprise builders.','Design the energy-storage system that defines the vehicle architecture.'],
 ['Streamline UX development by leveraging browser-in-the-loop agents to automate repetitive tasks.','Develop the embedded logic and network messages that coordinate every subsystem.'],
 ['Available at no charge','Open to all students'],['For developers','Friday meetings'],['Achieve new heights','Build something real'],
 ['Now Available!','Get involved'],['For organizations','For future partners'],['Level up your entire team','Support the team'],
 ['Latest Blogs','Latest updates'],['View blog','View news'],['Download Google Antigravity','Join Cal State LA EcoCAR'],['Download Google Antigravity for Windows','Join Cal State LA EcoCAR'],
 ['Explore Product','Explore vehicle'],
 ['Download on Desktop','Meet the team in B-13'],['Available on macOS, Windows, Linux, and Googlebook','General meetings are Fridays from 12–1 p.m. in the Engineering Building garage.'],['Send link to desktop','Email the team'],['Experience liftoff','Cal State LA EcoCAR']
 ,['Join Cal State LA EcoCAR for Windows','Join Cal State LA EcoCAR']
]);

async function installIconSprite(){
 if(document.querySelector('[data-local-icon-sprite]'))return;
 const markup=await fetch('.reference/sprite-icons.svg').then(response=>response.text());
 const holder=document.createElement('div');holder.innerHTML=markup;
 const sprite=holder.firstElementChild;sprite.removeAttribute('style');sprite.setAttribute('data-local-icon-sprite','');sprite.setAttribute('aria-hidden','true');sprite.style.cssText='position:absolute;width:0;height:0;overflow:hidden;pointer-events:none';document.body.prepend(sprite);
 document.querySelectorAll('use[href*="sprite-icons.svg#"]').forEach(use=>use.setAttribute('href','#'+use.getAttribute('href').split('#').pop()));
}

function replaceText(root=document.body){
 const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);const nodes=[];while(walker.nextNode())nodes.push(walker.currentNode);
 nodes.forEach(node=>{const original=node.nodeValue;let value=original;homeTextReplacements.forEach((next,current)=>{if(value.includes(current))value=value.split(current).join(next)});if(value!==original)node.nodeValue=value});
 root.querySelectorAll?.('[aria-label],[alt],[title]').forEach(element=>['aria-label','alt','title'].forEach(attribute=>{const original=element.getAttribute(attribute);if(!original)return;let value=original;homeTextReplacements.forEach((next,current)=>{if(value.includes(current))value=value.split(current).join(next)});if(value!==original)element.setAttribute(attribute,value)}));
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

function positionCaseCursor(container){
 const content=container.querySelector('.typed-content'),cursor=container.querySelector('.cursor-container');if(!content||!cursor)return;
 const base=container.getBoundingClientRect();let x=0,y=0;
 if(content.textContent){const walker=document.createTreeWalker(content,NodeFilter.SHOW_TEXT);let node,last;while((node=walker.nextNode()))if(node.nodeValue?.length)last=node;if(last){const range=document.createRange();range.setStart(last,last.nodeValue.length-1);range.setEnd(last,last.nodeValue.length);const end=range.getBoundingClientRect();x=end.right-base.left;y=end.top-base.top}}
 x=Math.max(0,x);y=Math.max(0,y);cursor.style.setProperty('--cursor-pos-x',`${x}px`);cursor.style.setProperty('--cursor-pos-y',`${y}px`);cursor.style.transform=`translate(${x}px,${y}px)`;
}

function typeCaseTitle(container){
 const content=container.querySelector('.typed-content'),cursor=container.querySelector('.cursor-container'),text=container.dataset.ecoCaseTitle||'';if(!content||!cursor)return;
 const run=(Number(container.dataset.ecoTypingRun)||0)+1;container.dataset.ecoTypingRun=String(run);cursor.style.opacity='1';
 if(matchMedia('(prefers-reduced-motion: reduce)').matches){content.textContent=text;positionCaseCursor(container);return}
 content.textContent='';positionCaseCursor(container);let index=0;
 const tick=()=>{if(Number(container.dataset.ecoTypingRun)!==run)return;index+=1;content.textContent=text.slice(0,index);positionCaseCursor(container);if(index<text.length)setTimeout(tick,38)};setTimeout(tick,90);
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
 const go=direction=>{if(moving||count<2)return;moving=true;const next=(index+direction+count)%count,from=slides[index],to=slides[next];to.classList.add('eco-loop-visible');to.style.transition='none';to.style.transform=`translateX(${direction>0?100:-100}%)`;to.style.opacity='1';void to.offsetWidth;from.classList.add('eco-loop-visible');from.style.transition='transform .48s cubic-bezier(.22,.7,.18,1)';to.style.transition='transform .48s cubic-bezier(.22,.7,.18,1)';requestAnimationFrame(()=>{from.style.transform=`translateX(${direction>0?-100:100}%)`;to.style.transform='translateX(0)'});setCopy(next);setTimeout(()=>{from.classList.remove('is-active','eco-loop-visible');from.style.cssText='';to.classList.add('is-active');to.classList.remove('eco-loop-visible');to.style.cssText='';index=next;slider.dataset.activeIndex=String(index);moving=false},500)};
 const controls=section.querySelector('.slider-controls');if(!controls)return;const clean=controls.cloneNode(true);controls.replaceWith(clean);const previous=clean.querySelector('[data-arrow-left]'),next=clean.querySelector('[data-arrow-right]');const enable=()=>[previous,next].forEach(button=>{if(button){button.disabled=false;button.removeAttribute('disabled')}});enable();new MutationObserver(enable).observe(clean,{subtree:true,attributes:true,attributeFilter:['disabled']});previous?.addEventListener('click',event=>{event.preventDefault();event.stopImmediatePropagation();go(-1)},true);next?.addEventListener('click',event=>{event.preventDefault();event.stopImmediatePropagation();go(1)},true);setCopy(index);
}

function installFeaturedVideo(){
 const wrapper=document.querySelector('[data-video-wrapper]');if(!wrapper||wrapper.dataset.ecoVideoReady)return;wrapper.dataset.ecoVideoReady='true';wrapper.dataset.ecoReady='true';wrapper.setAttribute('role','button');wrapper.setAttribute('tabindex','0');wrapper.setAttribute('aria-label','Play Cal State LA EcoCAR video');
 wrapper.innerHTML='<div class="home-video-preview"><iframe src="https://www.youtube-nocookie.com/embed/oibPfvqW1zg?autoplay=1&mute=1&loop=1&playlist=oibPfvqW1zg&controls=0&modestbranding=1&playsinline=1&rel=0" title="Cal State LA EcoCAR video preview" allow="autoplay; encrypted-media" tabindex="-1"></iframe></div><div class="home-video-follow" aria-hidden="true"><span class="home-video-play">▶</span><span>Play video</span></div><div class="video-control-button home-video-control" aria-hidden="true">▶</div>';
 const follower=wrapper.querySelector('.home-video-follow'),control=wrapper.querySelector('.home-video-control');const move=event=>{const rect=wrapper.getBoundingClientRect();follower.style.transform=`translate(${event.clientX-rect.left}px,${event.clientY-rect.top}px) translate(-50%,-50%) scale(1)`};wrapper.addEventListener('pointerenter',event=>{move(event);follower.classList.add('is-visible');control.classList.add('is-hidden')});wrapper.addEventListener('pointermove',move);wrapper.addEventListener('pointerleave',()=>{follower.classList.remove('is-visible');control.classList.remove('is-hidden')});
 const open=()=>{if(document.querySelector('.home-video-modal'))return;const modal=document.createElement('div');modal.className='home-video-modal';modal.setAttribute('role','dialog');modal.setAttribute('aria-modal','true');modal.setAttribute('aria-label','Cal State LA EcoCAR video');modal.innerHTML='<button class="home-video-close" type="button" aria-label="Close video">×</button><div class="home-video-frame"><iframe src="https://www.youtube-nocookie.com/embed/oibPfvqW1zg?autoplay=1&rel=0" title="Cal State LA EcoCAR video" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe></div>';document.body.appendChild(modal);document.body.classList.add('eco-video-open');const close=()=>{modal.remove();document.body.classList.remove('eco-video-open');wrapper.focus()};modal.querySelector('.home-video-close').addEventListener('click',close);modal.addEventListener('click',event=>{if(event.target===modal)close()});modal.addEventListener('keydown',event=>{if(event.key==='Escape')close()});modal.querySelector('.home-video-close').focus()};wrapper.addEventListener('click',open);wrapper.addEventListener('keydown',event=>{if(event.key==='Enter'||event.key===' '){event.preventDefault();open()}});
}

function installFeaturedVideoScale(){
 const section=document.querySelector('.landing-video-section');if(!section||section.dataset.ecoScaleReady)return;section.dataset.ecoScaleReady='true';if(matchMedia('(prefers-reduced-motion: reduce)').matches){section.style.transform='scale(1)';return}let frame=0;
 const measure=()=>{if(frame)return;frame=requestAnimationFrame(()=>{frame=0;const end=Math.max(1,section.offsetTop),scale=.5+.5*Math.min(1,Math.max(0,scrollY/end));section.style.transform=`translate3d(0,0,0) scale(${scale})`})};section.style.transform='translate3d(0,0,0) scale(.5)';addEventListener('scroll',measure,{passive:true});addEventListener('resize',measure,{passive:true});measure();
}

function customizeHome(){
 ensureHomeMetadata();
 document.querySelectorAll('use[href*="sprite-icons.svg"]').forEach(use=>use.setAttribute('href',use.getAttribute('href').replace(/^https:\/\/antigravity\.google\/assets\/image\/icons\/sprite-icons\.svg/,'.reference/sprite-icons.svg')));
 const logoLink=document.querySelector('[data-logo-link]');if(logoLink){logoLink.href='index.html';logoLink.setAttribute('aria-label','Cal State LA EcoCAR');logoLink.innerHTML='<span class="eco-brand"><img src="assets/ecocar-logo.jpg" alt="">Cal State LA EcoCAR</span>';}
 const heroLogo=document.querySelector('.logo-container.astro-lcdefpme');if(heroLogo)heroLogo.innerHTML='<div class="home-team-logo"><img src="assets/ecocar-logo.jpg" alt="">Cal State LA EcoCAR</div>';
 const nav=document.querySelector('header nav.nav');if(nav)nav.innerHTML='<div class="nav-item"><a class="call-to-action--nav button button-nav button-compact nav-trigger-btn" href="about.html"><span>About</span></a></div><div class="nav-item"><a class="call-to-action--nav button button-nav button-compact nav-trigger-btn" href="vehicle.html"><span>Vehicle</span></a></div><div class="nav-item"><a class="call-to-action--nav button button-nav button-compact nav-trigger-btn" href="team.html"><span>Team</span></a></div><div class="nav-item"><a class="call-to-action--nav button button-nav button-compact nav-trigger-btn" href="news.html"><span>News</span></a></div>';
 document.querySelectorAll('.rocket-link').forEach(link=>link.style.display='none');
 document.querySelectorAll('.download-button').forEach(link=>{link.href='join.html';link.querySelector('.icon')?.remove();const span=link.querySelector('span');if(span)span.textContent='Join the team'});
 const mobile=document.querySelector('[data-mobile-menu] .mobile-menu-content');if(mobile)mobile.innerHTML='<nav class="eco-mobile-links"><a href="about.html">About</a><a href="vehicle.html">Vehicle</a><a href="team.html">Team</a><a href="news.html">News</a><a href="join.html">Join the team</a></nav>';
 installFeaturedVideo();installFeaturedVideoScale();
 const featurePhotos=['assets/images/Geoffrey Chavez, Ayaan Gulwani, Dr. Masood Shahverdi, and the 2026 Jeep Cherokee.jpg','assets/images/Geoffrey and Dr. Shahverdi.jpg','assets/images/Geoffrey.jpg'];document.querySelectorAll('.feature-media').forEach((media,index)=>{if(media.dataset.ecoReady)return;media.dataset.ecoReady='true';media.innerHTML=`<img class="eco-editorial-photo" src="${featurePhotos[index%featurePhotos.length]}" alt="Cal State LA EcoCAR at the 2026 launch workshop">`});
 const caseLabels=['Vehicle integration','Battery engineering','Controls and CAN'];const casePhotos=['assets/images/Geoffrey Chavez, Ayaan Gulwani, Dr. Masood Shahverdi, and the 2026 Jeep Cherokee.jpg','assets/images/Geoffrey and Dr. Shahverdi.jpg','assets/images/Geoffrey Dart.jpg'];document.querySelectorAll('.landing-use-case-section .slide-image').forEach((slide,index)=>{slide.classList.add('eco-static-case');slide.removeAttribute('data-youtube-url');slide.removeAttribute('role');slide.removeAttribute('tabindex');slide.removeAttribute('aria-label');slide.querySelectorAll('.custom-cursor-wrapper,.video-control-button').forEach(element=>element.remove());const title=slide.querySelector('.slide-image-overlay [data-typed-header],.slide-image-overlay [data-eco-case-title]');if(title){title.removeAttribute('data-typed-header');title.dataset.ecoCaseTitle=caseLabels[index]||'Team media';const hidden=title.querySelector('.visually-hidden');if(hidden)hidden.textContent=title.dataset.ecoCaseTitle;const content=title.querySelector('.typed-content');if(content)content.textContent=title.dataset.ecoCaseTitle}const wrapper=slide.querySelector('.slide-image-wrapper');if(wrapper&&!wrapper.dataset.ecoReady){wrapper.dataset.ecoReady='true';wrapper.innerHTML=`<div class="eco-case-placeholder"><img src="${casePhotos[index%casePhotos.length]}" alt="Cal State LA EcoCAR workshop"></div>`}});
 const updates=document.querySelector('[data-latest-blogs-section] .slider-inner');if(updates)updates.innerHTML='<a href="news.html" class="list-item"><div class="list-image-wrapper"><img class="list-image" src="assets/images/Geoffrey Chavez, Ayaan Gulwani, Dr. Masood Shahverdi, and the 2026 Jeep Cherokee.jpg" alt="Cal State LA EcoCAR representatives with the 2026 Jeep Cherokee"></div><div class="list-item-content"><p class="heading-6 item-title">EcoCAR begins in Atlanta</p><div class="list-item-metadata"><span class="caption">September 2026</span><span class="caption">Competition</span></div><span class="caption arrow-link">Read update</span></div></a><a href="about.html" class="list-item"><div class="list-image-wrapper"><img class="list-image" src="assets/images/Geoffrey and Dr. Shahverdi.jpg" alt="Cal State LA EcoCAR at the launch workshop"></div><div class="list-item-content"><p class="heading-6 item-title">California’s EcoCAR team</p><div class="list-item-metadata"><span class="caption">April 2026</span><span class="caption">Team</span></div><span class="caption arrow-link">Read more</span></div></a><a href="join.html" class="list-item"><div class="list-image-wrapper"><img class="list-image" src="assets/images/Geoffrey Axe.jpg" alt="Cal State LA EcoCAR workshop activity"></div><div class="list-item-content"><p class="heading-6 item-title">Join the build</p><div class="list-item-metadata"><span class="caption">Fridays · 12–1 p.m.</span><span class="caption">B-13</span></div><span class="caption arrow-link">Get involved</span></div></a>';
 const downloadCta=document.querySelector('[data-cta-container]');if(downloadCta&&!downloadCta.querySelector('.eco-join-cta'))downloadCta.innerHTML='<a href="join.html" class="eco-join-cta call-to-action button button-primary-inverse"><span>Join the team</span></a>';
 const mobileNotice=document.querySelector('[data-mobile-footer-notice]');if(mobileNotice&&!mobileNotice.querySelector('.eco-mobile-notice-title')){mobileNotice.classList.add('eco-mobile-notice');mobileNotice.innerHTML='<p class="eco-mobile-notice-title">Meet the team in B-13</p><p class="eco-mobile-notice-copy">General meetings are Fridays from 12–1 p.m. in the Engineering Building garage.</p><a class="button button-secondary-inverse" href="mailto:ecocarchargingeagles@gmail.com">Email the team</a>'}
 document.querySelectorAll('a').forEach(link=>{const label=link.textContent.trim();if(label==='Download'||label.startsWith('Download for')){link.href='join.html';const span=link.querySelector('span');if(span)span.textContent='Join the team'}if(label==='Email the team')link.href='mailto:ecocarchargingeagles@gmail.com';if(label==='Explore Product'||label==='View case')link.href='vehicle.html';if(label==='Read More')link.href='about.html';if(label==='View news')link.href='news.html';});
 document.querySelectorAll('a[href*="antigravity.google"]').forEach(link=>{link.removeAttribute('href');link.setAttribute('aria-hidden','true');link.tabIndex=-1});
 const footerInner=document.querySelector('footer .footer-inner');if(footerInner&&!footerInner.dataset.ecoReady){footerInner.dataset.ecoReady='true';footerInner.classList.add('eco-footer-layout');footerInner.innerHTML='<div class="eco-footer-title"><p class="footer-title heading-5">Cal State LA EcoCAR</p></div><div class="eco-footer-nav"><p class="caption">Explore</p><a class="call-to-action call-to-action--nav" href="about.html">About</a><a class="call-to-action call-to-action--nav" href="vehicle.html">Vehicle</a><a class="call-to-action call-to-action--nav" href="team.html">Team</a></div><div class="eco-footer-nav"><p class="caption">Connect</p><a class="call-to-action call-to-action--nav" href="news.html">News</a><a class="call-to-action call-to-action--nav" href="join.html">Join the team</a><a class="call-to-action call-to-action--nav" href="https://www.instagram.com/csulaecocar/">Instagram</a></div>'}
 const footerWord=document.querySelector('[data-antigravity-footer-wrapper]');if(footerWord)footerWord.innerHTML='<div class="home-footer-word">EcoCAR</div>';
 const footerLinks=document.querySelector('.footer-google-links');if(footerLinks)footerLinks.innerHTML='<div class="home-footer-meta">California State University, Los Angeles · Fridays 12–1 p.m. · B-13 Engineering Building garage</div>';
 replaceText();
 document.querySelectorAll('[data-typed-header]').forEach(container=>{const accessibleText=container.querySelector('.visually-hidden')?.textContent.trim();if(accessibleText)container.dataset.ecoText=accessibleText});
 const iconSection=[...document.querySelectorAll('section')].find(section=>section.textContent.includes('multidisciplinary student engineering team'));if(iconSection){iconSection.id='icon-row';if(location.hash==='#icon-row')iconSection.scrollIntoView()}
 document.documentElement.classList.add('ecocar-ready');
}

customizeHome();installIconSprite();
installUseCaseTyping();installLoopingUseCaseSlider();
const replacementObserver=new MutationObserver(records=>records.forEach(record=>{if(record.type==='characterData'){replaceText(record.target.parentElement||document.body);return}record.addedNodes.forEach(node=>{if(node.nodeType===Node.TEXT_NODE){replaceText(node.parentElement||document.body)}else if(node.nodeType===Node.ELEMENT_NODE){replaceText(node)}})}));
replacementObserver.observe(document.body,{subtree:true,childList:true,characterData:true});
document.addEventListener('DOMContentLoaded',()=>{customizeHome();installUseCaseTyping();installLoopingUseCaseSlider();setTimeout(()=>installLoopingUseCaseSlider(true),100);setTimeout(customizeHome,300);setTimeout(customizeHome,1200);setTimeout(()=>{customizeHome();replacementObserver.disconnect()},3500)});
