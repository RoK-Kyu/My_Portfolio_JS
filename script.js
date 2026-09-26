/* Scroll edition: no external libraries and no permanently hidden content. */
(() => {
  'use strict';
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
  const root = document.documentElement;
  const cleanupPointerEffects = [];
  const enabled = true; // Animations start automatically, as requested.
  let frame = 0;
  let printing = false;
  const clamp = value => Math.max(0, Math.min(1, value));
  const items = [];

  // Wait for the portrait pixels before starting its entrance. The previous
  // CSS animation could finish while the large photo was still loading.
  const hero = document.querySelector('.hero');
  const portrait = document.querySelector('.portrait-image img');
  let openingTimer;
  let openingStarted = false;
  function cancelOpening() {
    openingStarted = true;
    clearTimeout(openingTimer);
    hero?.classList.remove('opening-pending', 'hero-opening');
  }
  function startOpening() {
    if (openingStarted) return;
    openingStarted = true;
    clearTimeout(openingTimer);
    if (!enabled || printing || !hero) { cancelOpening(); return; }
    requestAnimationFrame(() => requestAnimationFrame(() => {
      if (!enabled || printing) { cancelOpening(); return; }
      hero.classList.remove('opening-pending');
      hero.classList.add('hero-opening');
    }));
  }
  function prepareOpening() {
    if (!enabled || !hero || !portrait) return;
    // Never delay access to a section opened through a deep link or restored scroll.
    if ((location.hash && location.hash !== '#home') || window.scrollY > 100) return;
    hero.classList.add('opening-pending');
    openingTimer = setTimeout(startOpening, 2500);
    if (typeof portrait.decode === 'function') {
      portrait.decode().then(startOpening, startOpening);
    } else if (portrait.complete) {
      startOpening();
    } else {
      portrait.addEventListener('load', startOpening, { once: true });
      portrait.addEventListener('error', startOpening, { once: true });
    }
    hero.addEventListener('focusin', cancelOpening);
  }

  function register(selector, type, stagger = false) {
    document.querySelectorAll(selector).forEach((element, index) => {
      if (element.hasAttribute('data-reveal')) return;
      element.setAttribute('data-reveal', type);
      element.style.setProperty('--reveal-delay', `${stagger ? index % 4 * 130 : 0}ms`);
      items.push(element);
    });
  }
  register('.section-heading', 'heading');
  register('.about-copy, .project-copy, .archive-title', 'left');
  register('.interest-panel, .orbit-features, .archive-copy', 'right');
  register('.skill-card, .achievement-grid article, .contact-grid > a', 'card', true);
  register('.experience-grid article, .timeline li', 'left', true);
  register('.phone-shot', 'phone', true);
  register('.orbit-gallery figure', 'screen', true);
  register('.resume-panel', 'zoom');

  const progress = document.createElement('div');
  progress.className = 'reading-progress';
  progress.setAttribute('aria-hidden', 'true');
  document.body.append(progress);
  const timeline = document.querySelector('.timeline');
  const sections = Array.from(document.querySelectorAll('main > section[id]'));
  const navLinks = Array.from(document.querySelectorAll('nav a[href^="#"]'));

  function update() {
    frame = 0;
    const height = window.innerHeight;
    const scrollTop = window.scrollY;
    const total = Math.max(1, root.scrollHeight - height);
    progress.style.transform = `scaleX(${clamp(scrollTop / total)})`;

    let current = 'home';
    sections.forEach(section => {
      if (section.getBoundingClientRect().top <= height * .38) current = section.id;
    });
    navLinks.forEach(link => {
      if (link.getAttribute('href') === `#${current}`) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
    if (!enabled || printing) return;

    // Reset only after an item is well outside the viewport. Scrolling back
    // through a section replays its entrance without flickering at the edge.
    items.forEach(element => {
      const rect = element.getBoundingClientRect();
      const focused = element.contains(document.activeElement);
      if (focused || (rect.top < height * .89 && rect.bottom > 0)) {
        element.classList.add('reveal-visible');
      } else if (rect.top > height + 180 || rect.bottom < -180) {
        element.classList.remove('reveal-visible');
      }
    });
    document.querySelectorAll('.phone-shot').forEach((phone, index) => {
      const rect = phone.getBoundingClientRect();
      if (rect.top > height + 120 || rect.bottom < -120) return;
      const position = clamp((height - rect.top) / (height + rect.height)) - .5;
      phone.style.setProperty('--phone-drift', `${position * (index === 1 ? -34 : 24)}px`);
    });
    if (timeline) {
      const rect = timeline.getBoundingClientRect();
      timeline.style.setProperty('--timeline-progress', clamp((height * .7 - rect.top) / rect.height));
    }
  }
  function requestUpdate() {
    if (!frame) frame = requestAnimationFrame(update);
  }
  function applyMode() {
    root.classList.toggle('motion-enabled', enabled && !printing);
    root.classList.toggle('motion-disabled', !enabled || printing);
    items.forEach(element => {
      element.classList.remove('reveal-visible');
      element.style.removeProperty('--phone-drift');
    });
    if (timeline) timeline.style.setProperty('--timeline-progress', enabled ? 0 : 1);
    startPointerEffects();
    requestUpdate();
  }
  document.addEventListener('focusin', event => {
    const target = event.target.closest('[data-reveal]');
    if (target) target.classList.add('reveal-visible');
  });
  window.addEventListener('scroll', requestUpdate, { passive: true });
  window.addEventListener('resize', requestUpdate, { passive: true });
  window.addEventListener('load', requestUpdate);
  window.addEventListener('pageshow', requestUpdate);
  finePointer.addEventListener('change', startPointerEffects);
  window.addEventListener('blur', stopPointerEffects);
  window.addEventListener('focus', startPointerEffects);
  window.addEventListener('beforeprint', () => { printing = true; cancelOpening(); applyMode(); });
  window.addEventListener('afterprint', () => { printing = false; applyMode(); });

  function stopPointerEffects() {
    cleanupPointerEffects.splice(0).forEach(cleanup => cleanup());
  }

  function startPointerEffects() {
    stopPointerEffects();
    if (!enabled || printing || !finePointer.matches) return;
    document.querySelectorAll('.skill-card, .achievement-grid article, .portrait-card')
      .forEach(card => {
        const isPortrait = card.classList.contains('portrait-card');
        let frame = 0;
        let pointerX = 0;
        let pointerY = 0;

        const reset = () => {
          cancelAnimationFrame(frame);
          frame = 0;
          card.classList.remove('pointer-active');
          card.style.removeProperty('--tilt-x');
          card.style.removeProperty('--tilt-y');
          card.style.removeProperty('--pointer-x');
          card.style.removeProperty('--pointer-y');
        };
        const move = event => {
          if (event.pointerType !== 'mouse') return;
          pointerX = event.clientX;
          pointerY = event.clientY;
          if (frame) return;
          frame = requestAnimationFrame(() => {
            frame = 0;
            const rect = card.getBoundingClientRect();
            if (!rect.width || !rect.height) return;
            const x = Math.min(1, Math.max(0, (pointerX - rect.left) / rect.width));
            const y = Math.min(1, Math.max(0, (pointerY - rect.top) / rect.height));
            card.classList.add('pointer-active');
            card.style.setProperty('--pointer-x', `${x * 100}%`);
            card.style.setProperty('--pointer-y', `${y * 100}%`);
            if (isPortrait) {
              card.style.setProperty('--tilt-x', `${(0.5 - y) * 5}deg`);
              card.style.setProperty('--tilt-y', `${(x - 0.5) * 5}deg`);
            }
          });
        };

        card.classList.add('motion-card');
        card.addEventListener('pointermove', move, { passive: true });
        card.addEventListener('pointerleave', reset);
        card.addEventListener('pointercancel', reset);
        cleanupPointerEffects.push(() => {
          reset();
          card.classList.remove('motion-card');
          card.removeEventListener('pointermove', move);
          card.removeEventListener('pointerleave', reset);
          card.removeEventListener('pointercancel', reset);
        });
      });
  }


  applyMode();
  prepareOpening();
})();
