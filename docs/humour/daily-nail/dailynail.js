(() => {
  const links = Array.from(document.querySelectorAll('.nail-link'));
  if (!links.length) return;

  const lb = document.getElementById('lightbox');
  const img = document.getElementById('lb-image');
  const cap = document.getElementById('lb-caption');
  const btnPrev = document.querySelector('.lb-prev');
  const btnNext = document.querySelector('.lb-next');
  const btnClose = document.querySelector('.lb-close');

  let idx = 0;

  function openLightbox(i) {
    idx = i;
    const link = links[idx];
    const href = link.getAttribute('href');
    const caption = link.dataset.caption || link.querySelector('img')?.alt || '';
    img.src = href;
    img.alt = caption;
    cap.textContent = caption;
    lb.classList.add('active');
    document.body.classList.add('lb-open');
    lb.setAttribute('aria-hidden', 'false');
  }

  function closeLightbox() {
    lb.classList.remove('active');
    document.body.classList.remove('lb-open');
    lb.setAttribute('aria-hidden', 'true');
    img.removeAttribute('src');
  }

  function prev() { openLightbox((idx - 1 + links.length) % links.length); }
  function next() { openLightbox((idx + 1) % links.length); }

  // Intercept clicks on thumbnails
  links.forEach((a, i) => {
    a.addEventListener('click', (e) => {
      e.preventDefault();
      openLightbox(i);
    });
  });

  // Buttons
  btnPrev.addEventListener('click', prev);
  btnNext.addEventListener('click', next);
  btnClose.addEventListener('click', closeLightbox);

  // Click outside image closes
  lb.addEventListener('click', (e) => {
    if (e.target === lb || e.target === cap) closeLightbox();
  });

  // Keyboard controls
  document.addEventListener('keydown', (e) => {
    if (!lb.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') prev();
    if (e.key === 'ArrowRight') next();
  });

  // Simple mobile swipe (horizontal)
  let touchX = null;
  img.addEventListener('touchstart', (e) => (touchX = e.touches[0].clientX), {passive:true});
  img.addEventListener('touchend', (e) => {
    if (touchX === null) return;
    const dx = e.changedTouches[0].clientX - touchX;
    touchX = null;
    if (Math.abs(dx) > 40) (dx > 0 ? prev() : next());
  }, {passive:true});
})();

