const menuButton=document.querySelector('.menu-toggle');
const mobileNav=document.querySelector('.mobile-nav');
const setMenuState=open=>{mobileNav?.classList.toggle('open',open);menuButton?.setAttribute('aria-expanded',String(open));menuButton?.setAttribute('aria-label',open?'Close menu':'Open menu');mobileNav?.setAttribute('aria-hidden',String(!open));if(mobileNav)mobileNav.inert=!open};
const closeMenu=()=>setMenuState(false);
setMenuState(false);
menuButton?.addEventListener('click',()=>setMenuState(!mobileNav?.classList.contains('open')));
mobileNav?.querySelectorAll('a').forEach(link=>link.addEventListener('click',closeMenu));
document.addEventListener('keydown',event=>{if(event.key==='Escape')closeMenu()});
const desktopNavQuery=window.matchMedia('(min-width:901px)');
const closeMenuAtDesktop=event=>{if(event.matches)closeMenu()};
if(desktopNavQuery.addEventListener)desktopNavQuery.addEventListener('change',closeMenuAtDesktop);else desktopNavQuery.addListener(closeMenuAtDesktop);
const pageHeader=document.querySelector('.site-header');
const updateHeader=()=>pageHeader?.classList.toggle('scrolled',window.scrollY>8);
window.addEventListener('scroll',updateHeader,{passive:true});updateHeader();

document.querySelectorAll('.cases-stage .case-tabs,.cases-stage .case-display,.join-card').forEach(element=>element.classList.add('reveal'));

const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target)}}),{threshold:.08});
document.querySelectorAll('.reveal:not([data-page-reveal])').forEach(element=>observer.observe(element));

document.querySelectorAll('.filter:not([data-news-filter])').forEach(button=>button.addEventListener('click',()=>{
  document.querySelectorAll('.filter').forEach(item=>item.classList.remove('active'));button.classList.add('active');
  document.querySelectorAll('.story').forEach(story=>story.classList.add('is-filtering'));
  window.setTimeout(()=>document.querySelectorAll('.story').forEach(story=>{story.hidden=button.dataset.filter!=='All'&&story.dataset.category!==button.dataset.filter;story.classList.remove('is-filtering')}),180);
}));

document.querySelectorAll('img').forEach(image=>{
  const path=decodeURIComponent(new URL(image.src,document.baseURI).pathname).replace(/\\/g,'/');
  if(!/\/assets\/images\/(?:Geoffrey|Goeffrey)[^/]*\.(?:jpe?g|png)$/i.test(path))return;
  const host=image.parentElement;
  if(!host||host.querySelector(':scope > .eco-photo-credit'))return;
  host.classList.add('eco-photo-credit-host');
  host.insertAdjacentHTML('beforeend','<span class="eco-photo-credit" aria-hidden="true">Photo: EcoCAR</span>');
});
