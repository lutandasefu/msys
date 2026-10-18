// ============================================================
// MSYSINTERTECH — Main JS
// ============================================================

document.addEventListener('DOMContentLoaded', () => {

  // Enable scroll animations ONLY now that we know JS is running.
  // (See css/style.css — .fade-up content is visible by default;
  // this class switches on the fade/observer behaviour.)
  document.documentElement.classList.add('fade-up-init');

  // ── NAVBAR SCROLL ──────────────────────────────────────────
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 20);
    });
  }

  // ── HAMBURGER MENU ─────────────────────────────────────────
  const hamburger = document.querySelector('.hamburger');
  const mobileNav = document.querySelector('.mobile-nav');
  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      mobileNav.classList.toggle('open');
      const isOpen = mobileNav.classList.contains('open');
      hamburger.setAttribute('aria-expanded', isOpen);
    });
    document.addEventListener('click', (e) => {
      if (!hamburger.contains(e.target) && !mobileNav.contains(e.target)) {
        mobileNav.classList.remove('open');
      }
    });
  }

  // ── SCROLL ANIMATIONS ──────────────────────────────────────
  const fadeEls = document.querySelectorAll('.fade-up');
  if (fadeEls.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => entry.target.classList.add('visible'), i * 80);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    fadeEls.forEach(el => observer.observe(el));
  }

  // ── POPUP ──────────────────────────────────────────────────
  const popup = document.getElementById('voipPopup');
  if (popup) {
    const shown = sessionStorage.getItem('popupShown');
    if (!shown) {
      setTimeout(() => {
        popup.classList.add('active');
        sessionStorage.setItem('popupShown', '1');
      }, 1500);
    }

    popup.addEventListener('click', (e) => {
      if (e.target === popup) popup.classList.remove('active');
    });

    const closeBtn = popup.querySelector('.popup-close');
    if (closeBtn) closeBtn.addEventListener('click', () => popup.classList.remove('active'));

    const skipBtn = popup.querySelector('.popup-skip');
    if (skipBtn) skipBtn.addEventListener('click', () => popup.classList.remove('active'));

    const products = popup.querySelectorAll('.popup-product');
    products.forEach(p => {
      p.addEventListener('click', () => {
        products.forEach(x => x.classList.remove('selected'));
        p.classList.add('selected');
      });
    });

    const popupCta = popup.querySelector('.popup-cta');
    if (popupCta) {
      popupCta.addEventListener('click', () => {
        popup.classList.remove('active');
        const selected = popup.querySelector('.popup-product.selected');
        const productName = selected ? selected.querySelector('h4').textContent : '';
        const quoteSection = document.getElementById('quoteSection');
        if (quoteSection) {
          quoteSection.scrollIntoView({ behavior: 'smooth' });
          const serviceSelect = document.getElementById('serviceSelect');
          if (serviceSelect) serviceSelect.value = 'voip';
          const msgArea = document.getElementById('msgArea');
          if (msgArea && productName) {
            msgArea.value = `I'm interested in the ${productName} VoIP phone for my business.`;
          }
        } else {
          window.location.href = 'quote.html';
        }
      });
    }
  }

  // ── QUOTE FORM ─────────────────────────────────────────────
  // Submission handled by Web3Forms — no JS interception needed.
  // contact.html uses access key: bee0a659-d77b-4604-9d43-cc8cabe2f52a
  // quote.html uses access key:   11d5fcf2-f7fe-481a-ad9e-8306ddbba5a0

  // ── ACTIVE NAV ─────────────────────────────────────────────
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.navbar__nav a, .mobile-nav a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === currentPage) a.classList.add('active');
    if (currentPage === '' && href === 'index.html') a.classList.add('active');
  });

  // ── COUNTER ANIMATION ──────────────────────────────────────
  const counters = document.querySelectorAll('[data-count]');
  if (counters.length) {
    const countObs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.dataset.count);
          const suffix = el.dataset.suffix || '';
          let current = 0;
          const inc = target / 60;
          const timer = setInterval(() => {
            current += inc;
            if (current >= target) { current = target; clearInterval(timer); }
            el.textContent = Math.floor(current) + suffix;
          }, 20);
          countObs.unobserve(el);
        }
      });
    }, { threshold: 0.5 });
    counters.forEach(c => countObs.observe(c));
  }

  // ── YEAR ───────────────────────────────────────────────────
  const yearEl = document.getElementById('currentYear');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ── CUSTOM CURSOR (dot + ring follower) ─────────────────────
  if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    const dot = document.createElement('div');
    dot.className = 'cursor-dot cursor-hidden';
    const ring = document.createElement('div');
    ring.className = 'cursor-ring cursor-hidden';
    document.body.appendChild(dot);
    document.body.appendChild(ring);

    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;
    let started = false;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.left = mouseX + 'px';
      dot.style.top = mouseY + 'px';
      if (!started) {
        started = true;
        ringX = mouseX;
        ringY = mouseY;
        dot.classList.remove('cursor-hidden');
        ring.classList.remove('cursor-hidden');
      }
    });

    function animateRing() {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      ring.style.left = ringX + 'px';
      ring.style.top = ringY + 'px';
      requestAnimationFrame(animateRing);
    }
    animateRing();

    document.addEventListener('mouseleave', () => {
      dot.classList.add('cursor-hidden');
      ring.classList.add('cursor-hidden');
    });
    document.addEventListener('mouseenter', () => {
      dot.classList.remove('cursor-hidden');
      ring.classList.remove('cursor-hidden');
    });

    const interactiveSelector = 'a, button, input, select, textarea, .service-card, .pricing-card, .popup-product, .testimonial-card, .team-card';
    document.addEventListener('mouseover', (e) => {
      if (e.target.closest(interactiveSelector)) {
        dot.classList.add('cursor-hover');
        ring.classList.add('cursor-hover');
      }
    });
    document.addEventListener('mouseout', (e) => {
      if (e.target.closest(interactiveSelector)) {
        dot.classList.remove('cursor-hover');
        ring.classList.remove('cursor-hover');
      }
    });

    document.addEventListener('mousedown', () => ring.style.transform = 'translate(-50%, -50%) scale(0.85)');
    document.addEventListener('mouseup', () => ring.style.transform = 'translate(-50%, -50%) scale(1)');
  }

});
