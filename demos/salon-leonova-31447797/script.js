'use strict';
(() => {
  const menuButton = document.querySelector('.menu-toggle');
  const mobileNav = document.querySelector('#mobile-nav');
  if (menuButton && mobileNav) {
    const closeMenu = () => {
      mobileNav.hidden = true;
      menuButton.setAttribute('aria-expanded', 'false');
      menuButton.setAttribute('aria-label', 'Открыть меню');
    };
    menuButton.addEventListener('click', () => {
      const opening = !mobileNav.hidden;
      mobileNav.hidden = !opening;
      menuButton.setAttribute('aria-expanded', String(opening));
      menuButton.setAttribute('aria-label', opening ? 'Закрыть меню' : 'Открыть меню');
    });
    mobileNav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
    document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });
  }

  const allFiles = [
    'hair-01-warm-blonde-waves.png','hair-02-styled-blonde-portrait.png',
    'hair-03-beige-blonde-portrait.png','hair-04-smooth-ash-blonde.png',
    'hair-05-silver-waves.png','hair-06-cool-blonde-waves.png',
    'hair-07-silver-short-cut.png','hair-08-blonde-round-bob.png',
    'hair-09-beige-ombre-waves.png','hair-10-warm-blonde-bob.png',
    'hair-11-ash-blonde-bob.png','hair-12-burgundy-layers.png',
    'hair-13-soft-blonde-waves.png','hair-14-cool-ombre-waves.png',
    'hair-15-dark-precise-bob.png','hair-16-blonde-face-framing.png',
    'hair-17-straight-ash-blonde.png','hair-18-soft-ash-curls.png',
    'hair-19-dimension-blonde-waves.png','hair-20-platinum-straight.png',
    'hair-21-platinum-root-detail.png','hair-22-pale-pink-blonde-waves.png',
    'hair-23-copper-curly-portrait.png','hair-24-shiny-dark-bob.png',
    'hair-25-warm-ombre-portrait.png','hair-26-long-straight-blonde.png',
    'hair-27-long-platinum-blonde.png','hair-28-extra-long-platinum.png',
    'hair-29-pink-bob.png','hair-30-platinum-blunt-cut.png',
    'hair-31-pink-violet-ombre.png','hair-32-natural-brown-bob.png',
    'hair-33-straight-neutral-blonde.png','hair-34-straight-brown.png',
    'hair-35-short-natural-curls.png','hair-36-short-brown-cut.png',
    'hair-37-short-undercut.png','hair-38-long-ash-waves.png',
    'hair-39-straight-beige-blonde.png','hair-40-straight-platinum.png',
    'hair-41-bright-pink-long.png','hair-42-dark-angled-bob.png',
    'hair-43-short-dark-curls.png','hair-44-dark-soft-curls-portrait.png'
  ];
  const gallery = document.querySelector('#gallery-grid');
  const more = document.querySelector('#gallery-more');
  const dialog = document.querySelector('#lightbox');
  if (!gallery || !dialog) return;

  const initiallyShown = new Set([...gallery.querySelectorAll('[data-image]')].map(button => button.dataset.image));
  if (more) {
    more.addEventListener('click', () => {
      const fragment = document.createDocumentFragment();
      allFiles.filter(file => !initiallyShown.has(file)).forEach((file, index) => {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'gallery-tile is-extra';
        button.dataset.image = file;
        button.dataset.caption = 'Образ из галереи Beautique';
        button.setAttribute('aria-label', 'Увеличить фотографию: образ ' + String(index + 7));
        const img = document.createElement('img');
        img.src = 'assets/' + file;
        img.alt = 'Образ из галереи Beautique, фото ' + String(index + 7);
        img.loading = 'lazy';
        img.decoding = 'async';
        const tag = document.createElement('span');
        tag.textContent = String(index + 7).padStart(2, '0') + ' / ГАЛЕРЕЯ';
        button.append(img, tag);
        fragment.append(button);
      });
      gallery.append(fragment);
      more.setAttribute('aria-expanded', 'true');
      more.hidden = true;
    }, { once: true });
  }

  const photo = dialog.querySelector('figure img');
  const caption = dialog.querySelector('figcaption');
  const counter = dialog.querySelector('.lightbox-counter');
  const close = dialog.querySelector('.lightbox-close');
  const prev = dialog.querySelector('.lightbox-prev');
  const next = dialog.querySelector('.lightbox-next');
  let current = 0;
  let returnFocus = null;

  const tiles = () => [...gallery.querySelectorAll('.gallery-tile[data-image]')];
  const render = () => {
    const list = tiles();
    if (!list.length) return;
    current = (current + list.length) % list.length;
    const selected = list[current];
    const file = selected.dataset.image;
    photo.src = 'assets/' + file;
    photo.alt = selected.querySelector('img')?.alt || selected.dataset.caption || 'Фотография причёски';
    caption.textContent = selected.dataset.caption || 'Образ Beautique';
    counter.textContent = String(current + 1).padStart(2, '0') + ' / ' + String(list.length).padStart(2, '0');
  };
  const step = delta => { current += delta; render(); };
  gallery.addEventListener('click', event => {
    const tile = event.target.closest('.gallery-tile[data-image]');
    if (!tile) return;
    current = tiles().indexOf(tile);
    if (current < 0) return;
    returnFocus = tile;
    render();
    if (typeof dialog.showModal === 'function') dialog.showModal();
    else dialog.setAttribute('open', '');
  });
  close?.addEventListener('click', () => dialog.close());
  prev?.addEventListener('click', () => step(-1));
  next?.addEventListener('click', () => step(1));
  dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
  dialog.addEventListener('close', () => {
    photo.removeAttribute('src');
    if (returnFocus?.isConnected) returnFocus.focus();
  });
  dialog.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft') { event.preventDefault(); step(-1); }
    if (event.key === 'ArrowRight') { event.preventDefault(); step(1); }
  });
})();