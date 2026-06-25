// ============================================
// Studio Vanessa Aravena - Main JavaScript v2
// Mobile-first, optimized for iOS
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  // ── Navigation Scroll Effect ──
  const navbar = document.getElementById('navbar');
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  let lastScrollY = 0;
  let ticking = false;

  function handleNavScroll() {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(handleNavScroll);
      ticking = true;
    }
  }, { passive: true });

  handleNavScroll();

  // ── Mobile Menu Toggle ──
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      const isActive = navToggle.classList.toggle('active');
      navLinks.classList.toggle('active');
      navToggle.setAttribute('aria-expanded', isActive);
      document.body.style.overflow = isActive ? 'hidden' : '';
    });

    // Close menu when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navLinks.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

  // ── Smooth Scroll for anchor links ──
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      e.preventDefault();
      const target = document.querySelector(targetId);
      if (target) {
        const offset = 70;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // ── Intersection Observer for Reveal Animations ──
  const revealElements = document.querySelectorAll('.reveal');

  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    // Show everything immediately
    revealElements.forEach(el => el.classList.add('visible'));
  } else {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -30px 0px'
      }
    );

    revealElements.forEach(el => revealObserver.observe(el));
  }

  // ── Cherry Blossom Falling Petals (only on desktop, respects reduced motion) ──
  const isMobile = window.innerWidth < 768;
  
  if (!prefersReducedMotion && !isMobile) {
    function createPetal() {
      const petal = document.createElement('div');
      petal.classList.add('floating-cherry-blossom');
      petal.textContent = '🌸';

      const startX = Math.random() * window.innerWidth;
      const duration = 7 + Math.random() * 8;
      const size = 0.6 + Math.random() * 0.6;

      petal.style.left = startX + 'px';
      petal.style.top = '-30px';
      petal.style.fontSize = size + 'rem';
      petal.style.animationDuration = duration + 's';

      document.body.appendChild(petal);

      setTimeout(() => petal.remove(), duration * 1000);
    }

    function spawnPetals() {
      createPetal();
      setTimeout(spawnPetals, 4000 + Math.random() * 6000);
    }

    setTimeout(spawnPetals, 3000);
  }

  // ── Parallax Effect on Hero (desktop only, respects reduced motion) ──
  const heroBg = document.querySelector('.hero-bg img');
  
  if (heroBg && !prefersReducedMotion && !isMobile) {
    let parallaxTicking = false;
    
    window.addEventListener('scroll', () => {
      if (!parallaxTicking) {
        requestAnimationFrame(() => {
          const scrolled = window.scrollY;
          const heroHeight = document.querySelector('.hero').offsetHeight;
          
          if (scrolled < heroHeight) {
            heroBg.style.transform = `scale(1.05) translateY(${scrolled * 0.25}px)`;
          }
          parallaxTicking = false;
        });
        parallaxTicking = true;
      }
    }, { passive: true });
  }

  // ── Gallery image lightbox ──
  const galleryItems = document.querySelectorAll('.gallery-item');
  
  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      if (!img) return;
      
      const lightbox = document.createElement('div');
      lightbox.style.cssText = `
        position: fixed;
        inset: 0;
        background: rgba(0, 0, 0, 0.92);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        cursor: pointer;
        animation: fadeIn 0.25s ease-out;
        padding: 1.5rem;
        padding-top: max(1.5rem, env(safe-area-inset-top));
        padding-bottom: max(1.5rem, env(safe-area-inset-bottom));
      `;
      
      const lightboxImg = document.createElement('img');
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
      lightboxImg.style.cssText = `
        max-width: 92%;
        max-height: 88vh;
        object-fit: contain;
        border-radius: 8px;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
        animation: scaleIn 0.25s ease-out;
      `;
      
      const closeBtn = document.createElement('button');
      closeBtn.innerHTML = '&times;';
      closeBtn.style.cssText = `
        position: absolute;
        top: max(16px, env(safe-area-inset-top));
        right: 20px;
        background: none;
        border: none;
        color: white;
        font-size: 2rem;
        cursor: pointer;
        opacity: 0.7;
        transition: opacity 0.2s;
        line-height: 1;
        font-weight: 300;
        min-width: 44px;
        min-height: 44px;
        display: flex;
        align-items: center;
        justify-content: center;
      `;
      
      lightbox.appendChild(lightboxImg);
      lightbox.appendChild(closeBtn);
      document.body.appendChild(lightbox);
      document.body.style.overflow = 'hidden';
      
      function closeLightbox() {
        lightbox.style.animation = 'fadeOut 0.2s ease-out forwards';
        setTimeout(() => {
          lightbox.remove();
          document.body.style.overflow = '';
        }, 200);
      }
      
      lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox || e.target === closeBtn) {
          closeLightbox();
        }
      });
      
      document.addEventListener('keydown', function escHandler(e) {
        if (e.key === 'Escape') {
          closeLightbox();
          document.removeEventListener('keydown', escHandler);
        }
      });
    });
  });

  // ── Hide Splash Screen ──
  const splashScreen = document.getElementById('splashScreen');
  if (splashScreen) {
    window.addEventListener('load', () => {
      // Add a slight delay for a premium feel
      setTimeout(() => {
        splashScreen.classList.add('hidden');
      }, 800);
    });
  }

  // ── FAQ Accordion ──
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    if (questionBtn) {
      questionBtn.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        // Close all other items (accordion behavior)
        faqItems.forEach(otherItem => {
          if (otherItem !== item) {
            otherItem.classList.remove('active');
            const otherBtn = otherItem.querySelector('.faq-question');
            if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
          }
        });

        // Toggle current item
        item.classList.toggle('active', !isActive);
        questionBtn.setAttribute('aria-expanded', !isActive ? 'true' : 'false');
      });
    }
  });
  // ── Instagram Feed (Handled by Elfsight widget in index.html) ──
});
