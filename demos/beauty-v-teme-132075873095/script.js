(()=>{'use strict';
const header=document.querySelector('.site-header');
const menu=document.querySelector('.menu-button');
const nav=document.getElementById('main-nav');
if(header&&menu&&nav){
  const close=()=>{header.classList.remove('nav-open');menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label','Открыть меню')};
  menu.addEventListener('click',()=>{
    const open=header.classList.toggle('nav-open');
    menu.setAttribute('aria-expanded',String(open));
    menu.setAttribute('aria-label',open?'Закрыть меню':'Открыть меню');
  });
  nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',close));
  document.addEventListener('click',e=>{if(!header.contains(e.target))close()});
}

const filters=[...document.querySelectorAll('.filter')];
const items=[...document.querySelectorAll('.gallery-item')];
filters.forEach(btn=>btn.addEventListener('click',()=>{
  const kind=btn.dataset.filter;
  filters.forEach(x=>{const active=x===btn;x.classList.toggle('active',active);x.setAttribute('aria-pressed',String(active))});
  items.forEach(item=>{item.hidden=kind!=='all'&&item.dataset.kind!==kind});
}));

const lightbox=document.getElementById('lightbox');
if(lightbox){
  const img=lightbox.querySelector('img');
  const closeBtn=lightbox.querySelector('.lightbox-close');
  const prevBtn=lightbox.querySelector('.lightbox-prev');
  const nextBtn=lightbox.querySelector('.lightbox-next');
  let activeIndex=0;
  let focusReturn=null;
  const visibleItems=()=>items.filter(x=>!x.hidden);
  const show=(index)=>{
    const current=visibleItems();
    if(!current.length)return;
    activeIndex=(index+current.length)%current.length;
    const item=current[activeIndex];
    img.src=item.dataset.src;
    img.alt=item.querySelector('img')?.alt||'Фото работы Beauty V Teme';
  };
  const open=(item)=>{
    const current=visibleItems();
    activeIndex=Math.max(0,current.indexOf(item));
    focusReturn=item;
    lightbox.hidden=false;
    document.body.style.overflow='hidden';
    show(activeIndex);
    closeBtn.focus();
  };
  const close=()=>{
    lightbox.hidden=true;
    document.body.style.overflow='';
    img.src='';
    focusReturn?.focus();
  };
  items.forEach(item=>item.addEventListener('click',()=>open(item)));
  closeBtn.addEventListener('click',close);
  prevBtn.addEventListener('click',()=>show(activeIndex-1));
  nextBtn.addEventListener('click',()=>show(activeIndex+1));
  lightbox.addEventListener('click',e=>{if(e.target===lightbox)close()});
  document.addEventListener('keydown',e=>{
    if(lightbox.hidden)return;
    if(e.key==='Escape')close();
    if(e.key==='ArrowLeft')show(activeIndex-1);
    if(e.key==='ArrowRight')show(activeIndex+1);
  });
}
})();