/* ═══════════════════════════════════════════
   ABARIE.COM — MAIN JAVASCRIPT
   ═══════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── ACTIVE NAV LINK ── */
  const navLinks = document.querySelectorAll('.nav-links a');
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  /* ── MOBILE NAV TOGGLE ── */
  const toggle = document.getElementById('navToggle');
  const mobileNav = document.getElementById('mobileNav');
  if (toggle && mobileNav) {
    toggle.addEventListener('click', () => {
      mobileNav.classList.toggle('open');
      document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
    });
    mobileNav.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        mobileNav.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  /* ── HERO IMAGE SLIDESHOW ── */
  initSlider('heroSlides', 'heroDots', 'heroPrev', 'heroNext', 4000);

  /* ── EVENTS CAROUSEL ── */
  initCarousel('eventsTrack', 'eventsDots', 'eventsPrev', 'eventsNext', 300);

  /* ── PAST EVENTS (YT) SLIDER ── */
  initCarousel('ytTrack', null, 'ytPrev', 'ytNext', 320);

  /* ── SCROLL REVEAL ── */
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

});

/* ── HERO SLIDER (full-width crossfade) ── */
function initSlider(trackId, dotsId, prevId, nextId, interval) {
  const track = document.getElementById(trackId);
  if (!track) return;
  const slides = track.children;
  const total = slides.length;
  if (total <= 1) return;
  let current = 0;

  const dots = dotsId ? document.getElementById(dotsId) : null;
  function buildDots() {
    if (!dots) return;
    dots.innerHTML = '';
    for (let i = 0; i < total; i++) {
      const btn = document.createElement('button');
      btn.className = 'hero-slide-dot' + (i === 0 ? ' active' : '');
      btn.setAttribute('aria-label', 'Slide ' + (i + 1));
      btn.addEventListener('click', () => goTo(i));
      dots.appendChild(btn);
    }
  }

  function goTo(n) {
    current = (n + total) % total;
    track.style.transform = `translateX(-${current * 100}%)`;
    track.style.transition = 'transform 0.7s cubic-bezier(0.4, 0, 0.2, 1)';
    if (dots) {
      dots.querySelectorAll('.hero-slide-dot').forEach((d, i) => {
        d.classList.toggle('active', i === current);
      });
    }
  }

  const prevBtn = prevId ? document.getElementById(prevId) : null;
  const nextBtn = nextId ? document.getElementById(nextId) : null;
  if (prevBtn) prevBtn.addEventListener('click', () => goTo(current - 1));
  if (nextBtn) nextBtn.addEventListener('click', () => goTo(current + 1));

  buildDots();
  let timer = setInterval(() => goTo(current + 1), interval);
  track.parentElement.addEventListener('mouseenter', () => clearInterval(timer));
  track.parentElement.addEventListener('mouseleave', () => {
    timer = setInterval(() => goTo(current + 1), interval);
  });

  /* touch swipe */
  let startX = 0;
  track.addEventListener('touchstart', e => { startX = e.touches[0].clientX; });
  track.addEventListener('touchend', e => {
    const diff = startX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) goTo(current + (diff > 0 ? 1 : -1));
  });
}

/* ── CAROUSEL (peek at next card) ── */
function initCarousel(trackId, dotsId, prevId, nextId, cardWidth) {
  const track = document.getElementById(trackId);
  if (!track) return;
  const cards = track.children;
  const total = cards.length;
  if (total <= 1) return;

  let current = 0;
  const gap = 24;

  function getVisible() {
    const wrap = track.parentElement;
    const w = wrap ? wrap.offsetWidth : 900;
    return Math.max(1, Math.floor(w / (cardWidth + gap)));
  }

  const maxIndex = () => Math.max(0, total - getVisible());

  const dots = dotsId ? document.getElementById(dotsId) : null;
  function buildDots() {
    if (!dots) return;
    dots.innerHTML = '';
    const pages = maxIndex() + 1;
    for (let i = 0; i < pages; i++) {
      const btn = document.createElement('button');
      btn.className = 'events-dot' + (i === 0 ? ' active' : '');
      btn.setAttribute('aria-label', 'Page ' + (i + 1));
      btn.addEventListener('click', () => goTo(i));
      dots.appendChild(btn);
    }
  }

  function goTo(n) {
    current = Math.min(Math.max(n, 0), maxIndex());
    const offset = current * (cardWidth + gap);
    track.style.transform = `translateX(-${offset}px)`;
    track.style.transition = 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
    if (dots) {
      dots.querySelectorAll('.events-dot').forEach((d, i) => {
        d.classList.toggle('active', i === current);
      });
    }
  }

  const prevBtn = prevId ? document.getElementById(prevId) : null;
  const nextBtn = nextId ? document.getElementById(nextId) : null;
  if (prevBtn) prevBtn.addEventListener('click', () => goTo(current - 1));
  if (nextBtn) nextBtn.addEventListener('click', () => goTo(current + 1));

  buildDots();
  window.addEventListener('resize', () => { buildDots(); goTo(current); });

  /* touch */
  let startX = 0;
  track.addEventListener('touchstart', e => { startX = e.touches[0].clientX; });
  track.addEventListener('touchend', e => {
    const diff = startX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) goTo(current + (diff > 0 ? 1 : -1));
  });
}
