(()=>{'use strict';
const photoNames=[
'Снимок экрана 2026-10-02 111322.png','Снимок экрана 2026-10-02 111332.png','Снимок экрана 2026-10-02 111339.png',
'Снимок экрана 2026-10-02 111347.png','Снимок экрана 2026-10-02 111358.png','Снимок экрана 2026-10-02 111405.png',
'Снимок экрана 2026-10-02 111417.png','Снимок экрана 2026-10-02 111427.png','Снимок экрана 2026-10-02 111439.png',
'Снимок экрана 2026-10-02 111446.png','Снимок экрана 2026-10-02 111501.png','Снимок экрана 2026-10-02 111514.png',
'Снимок экрана 2026-10-02 111524.png','Снимок экрана 2026-10-02 111529.png','Снимок экрана 2026-10-02 111537.png',
'Снимок экрана 2026-10-02 111543.png','Снимок экрана 2026-10-02 111548.png','Снимок экрана 2026-10-02 111601.png',
'Снимок экрана 2026-10-02 111609.png','Снимок экрана 2026-10-02 111616.png','Снимок экрана 2026-10-02 111628.png',
'Снимок экрана 2026-10-02 111642.png','Снимок экрана 2026-10-02 111654.png'
];
const base='assets/originals/';
const grid=document.getElementById('photoGrid');
if(grid){
  photoNames.forEach((name,i)=>{
    const button=document.createElement('button');
    button.className='gallery-item';
    button.type='button';
    button.dataset.index=String(i);
    button.setAttribute('aria-label','Открыть фото '+String(i+1));
    const img=document.createElement('img');
    img.src=encodeURI(base+name);
    img.alt='Vredina — фото из галереи '+String(i+1);
    img.loading='lazy';
    img.decoding='async';
    img.addEventListener('error',()=>button.hidden=true,{once:true});
    button.appendChild(img);
    grid.appendChild(button);
  });
}
const header=document.querySelector('.site-header');
const menu=document.querySelector('.menu-button');
const nav=document.getElementById('main-nav');
if(header&&menu&&nav){
  const close=()=>{header.classList.remove('nav-open');menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label','Открыть меню')};
  menu.addEventListener('click',()=>{const open=header.classList.toggle('nav-open');menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?'Закрыть меню':'Открыть меню')});
  nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',close));
  document.addEventListener('click',e=>{if(!header.contains(e.target))close()});
}
const lightbox=document.getElementById('lightbox');
if(lightbox&&grid){
  const image=lightbox.querySelector('img');
  const counter=document.getElementById('lightboxCounter');
  const closeBtn=lightbox.querySelector('.lightbox-close');
  const prev=lightbox.querySelector('.lightbox-prev');
  const next=lightbox.querySelector('.lightbox-next');
  let current=0,returnFocus=null;
  const available=()=>[...grid.querySelectorAll('.gallery-item:not([hidden])')];
  const show=n=>{
    const items=available(); if(!items.length)return;
    current=(n+items.length)%items.length;
    const item=items[current],img=item.querySelector('img');
    image.src=img.src; image.alt=img.alt;
    counter.textContent=String(current+1).padStart(2,'0')+' / '+String(items.length).padStart(2,'0');
  };
  const open=item=>{
    const items=available(); current=Math.max(0,items.indexOf(item)); returnFocus=item;
    lightbox.hidden=false;document.body.style.overflow='hidden';show(current);closeBtn.focus();
  };
  const close=()=>{lightbox.hidden=true;document.body.style.overflow='';image.src='';returnFocus?.focus()};
  grid.addEventListener('click',e=>{const item=e.target.closest('.gallery-item');if(item)open(item)});
  closeBtn.addEventListener('click',close);prev.addEventListener('click',()=>show(current-1));next.addEventListener('click',()=>show(current+1));
  lightbox.addEventListener('click',e=>{if(e.target===lightbox)close()});
  document.addEventListener('keydown',e=>{if(lightbox.hidden)return;if(e.key==='Escape')close();if(e.key==='ArrowLeft')show(current-1);if(e.key==='ArrowRight')show(current+1)});
}
})();