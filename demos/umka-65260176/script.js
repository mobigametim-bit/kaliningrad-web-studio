(()=>{'use strict';
const header=document.querySelector('.header');
const menu=document.querySelector('.menu-button');
const nav=document.getElementById('main-menu');
if(header&&menu&&nav){
const closeMenu=()=>{header.classList.remove('nav-open');menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label','Открыть меню')};
menu.addEventListener('click',()=>{let open=header.classList.toggle('nav-open');menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?'Закрыть меню':'Открыть меню')});
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&header.classList.contains('nav-open')){closeMenu();menu.focus()}});
window.matchMedia('(min-width:901px)').addEventListener('change',e=>{if(e.matches)closeMenu()});
}
const grid=document.getElementById('gallery-grid');
const more=document.getElementById('show-more');
const cards=grid?[...grid.querySelectorAll('button[data-lightbox]')]:[];
if(grid&&more){if(cards.every(c=>!c.hidden))more.hidden=true;
more.addEventListener('click',()=>{cards.forEach(c=>c.hidden=false);more.hidden=true;const b=cards[8];if(b){b.setAttribute('tabindex','-1');b.focus({preventScroll:true});b.scrollIntoView({block:'nearest',behavior:window.matchMedia('(prefers-reduced-motion:reduce)').matches?'auto':'smooth'});b.removeAttribute('tabindex')}});
}
const modal=document.getElementById('lightbox');
const image=document.getElementById('lightbox-image');
const caption=document.getElementById('lightbox-caption');
const count=document.getElementById('lightbox-count');
const close=document.getElementById('lightbox-close');
const prev=document.getElementById('lightbox-prev');
const next=document.getElementById('lightbox-next');
if(!modal||!image||!caption||!count||!close||!prev||!next||!cards.length)return;
let index=0,lastTrigger=null;
const active=()=>cards.filter(x=>!x.hidden);
const show=i=>{const list=active();if(!list.length)return;index=(i+list.length)%list.length;const item=list[index],src=item.querySelector('img');image.src=src.currentSrc||src.src;image.alt=src.alt;caption.textContent=src.alt;count.textContent=String(index+1).padStart(2,'0')+' / '+String(list.length).padStart(2,'0');};
cards.forEach(card=>card.addEventListener('click',()=>{const list=active();lastTrigger=card;show(list.indexOf(card));modal.showModal();document.body.classList.add('modal-open');close.focus()}));
close.addEventListener('click',()=>modal.close());
prev.addEventListener('click',()=>show(index-1));
next.addEventListener('click',()=>show(index+1));
modal.addEventListener('click',e=>{if(e.target===modal)modal.close()});
modal.addEventListener('keydown',e=>{if(e.key==='ArrowLeft'){e.preventDefault();show(index-1)}else if(e.key==='ArrowRight'){e.preventDefault();show(index+1)}});
modal.addEventListener('close',()=>{document.body.classList.remove('modal-open');if(lastTrigger&&lastTrigger.isConnected&&!lastTrigger.hidden)lastTrigger.focus()});
})();