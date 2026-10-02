/**
 * Kanha Creative Portfolio — Interactive Logic & Motion Controller
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide icons
  if (window.lucide) {
    window.lucide.createIcons();
  }

  /* ==========================================================================
     1. Theme Switcher (Dark Mode default, persists in localStorage)
     ========================================================================== */
  const themeToggleBtn = document.getElementById('theme-toggle');
  const sunIcon = document.getElementById('sun-icon');
  const moonIcon = document.getElementById('moon-icon');
  const htmlEl = document.documentElement;

  // Determine initial theme: check localStorage, otherwise default to dark mode
  const savedTheme = localStorage.getItem('kanha-portfolio-theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initialTheme = savedTheme ? savedTheme : 'dark';

  applyTheme(initialTheme);

  function applyTheme(theme) {
    const sIcon = document.getElementById('sun-icon');
    const mIcon = document.getElementById('moon-icon');

    if (theme === 'dark') {
      htmlEl.classList.add('dark');
      if (sIcon) {
        sIcon.classList.remove('hidden');
        sIcon.style.display = 'block';
      }
      if (mIcon) {
        mIcon.classList.add('hidden');
        mIcon.style.display = 'none';
      }
    } else {
      htmlEl.classList.remove('dark');
      if (sIcon) {
        sIcon.classList.add('hidden');
        sIcon.style.display = 'none';
      }
      if (mIcon) {
        mIcon.classList.remove('hidden');
        mIcon.style.display = 'block';
      }
    }
    localStorage.setItem('kanha-portfolio-theme', theme);
  }

  let isThemeTransitioning = false;

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', (event) => {
      if (isThemeTransitioning) return;

      const isDark = htmlEl.classList.contains('dark');
      const newTheme = isDark ? 'light' : 'dark';

      // Tactile button micro-animation
      themeToggleBtn.style.transform = 'scale(0.88) rotate(45deg)';
      setTimeout(() => {
        themeToggleBtn.style.transform = 'scale(1) rotate(0deg)';
      }, 250);

      // Fallback for browsers that do not support View Transitions or if user prefers reduced motion
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (!document.startViewTransition || prefersReducedMotion) {
        applyTheme(newTheme);
        return;
      }

      // Calculate origin coordinates (pointer click or center of the toggle button)
      const rect = themeToggleBtn.getBoundingClientRect();
      const x = (event && typeof event.clientX === 'number' && event.clientX > 0)
        ? event.clientX
        : rect.left + rect.width / 2;
      const y = (event && typeof event.clientY === 'number' && event.clientY > 0)
        ? event.clientY
        : rect.top + rect.height / 2;

      // Calculate the radius to the furthest corner of the viewport
      const endRadius = Math.hypot(
        Math.max(x, window.innerWidth - x),
        Math.max(y, window.innerHeight - y)
      );

      isThemeTransitioning = true;

      // Start View Transition
      const transition = document.startViewTransition(() => {
        applyTheme(newTheme);
      });

      // Animate the circular clip-path mask from 0px to the furthest corner
      transition.ready.then(() => {
        const animation = document.documentElement.animate(
          {
            clipPath: [
              `circle(0px at ${x}px ${y}px)`,
              `circle(${endRadius}px at ${x}px ${y}px)`
            ]
          },
          {
            duration: 520,
            easing: 'ease-in-out',
            pseudoElement: '::view-transition-new(root)'
          }
        );

        animation.finished.finally(() => {
          isThemeTransitioning = false;
        });
      }).catch(() => {
        isThemeTransitioning = false;
      });

      transition.finished.finally(() => {
        isThemeTransitioning = false;
      });
    });
  }

  /* ==========================================================================
     2. Framer Motion / Motion Scroll Animations
     ========================================================================== */
  const initMotionAnimations = () => {
    // If Motion library (from Framer Motion ecosystem) is loaded
    if (window.Motion && window.Motion.animate) {
      const { animate, inView } = window.Motion;

      // Hero Elements Staggered Fade-in
      const heroBadge = document.getElementById('hero-badge');
      const heroHeading = document.getElementById('hero-heading');
      const heroSubheading = document.getElementById('hero-subheading');
      const heroCtas = document.getElementById('hero-ctas');

      if (heroBadge) {
        animate(heroBadge, { opacity: [0, 1], y: [20, 0] }, { duration: 0.6, easing: [0.16, 1, 0.3, 1] });
      }
      if (heroHeading) {
        animate(heroHeading, { opacity: [0, 1], y: [30, 0] }, { duration: 0.8, delay: 0.1, easing: [0.16, 1, 0.3, 1] });
      }
      if (heroSubheading) {
        animate(heroSubheading, { opacity: [0, 1], y: [25, 0] }, { duration: 0.8, delay: 0.25, easing: [0.16, 1, 0.3, 1] });
      }
      if (heroCtas) {
        animate(heroCtas, { opacity: [0, 1], y: [20, 0] }, { duration: 0.8, delay: 0.4, easing: [0.16, 1, 0.3, 1] });
      }

      // Scroll Reveal for Project Cards
      const projectCards = document.querySelectorAll('.project-card');
      projectCards.forEach((card, index) => {
        // Initial state
        card.style.opacity = '0';
        card.style.transform = 'translateY(40px)';

        inView(card, () => {
          animate(card, { opacity: 1, y: 0 }, { duration: 0.7, delay: (index % 2) * 0.15, easing: [0.16, 1, 0.3, 1] });
        });
      });

      // Scroll Reveal for Timeline Items
      const timelineItems = document.querySelectorAll('.timeline-item');
      timelineItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-25px)';

        inView(item, () => {
          animate(item, { opacity: 1, x: 0 }, { duration: 0.6, delay: index * 0.1, easing: [0.16, 1, 0.3, 1] });
        });
      });

      // Scroll Reveal for Testimonial Cards
      const testimonialCards = document.querySelectorAll('.testimonial-card');
      testimonialCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';

        inView(card, () => {
          animate(card, { opacity: 1, y: 0 }, { duration: 0.6, delay: index * 0.12, easing: [0.16, 1, 0.3, 1] });
        });
      });

    } else {
      // Robust Fallback IntersectionObserver if CDN is blocked or offline
      const observerOptions = { threshold: 0.15, rootMargin: '0px 0px -50px 0px' };
      const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100', 'translate-y-0');
            entry.target.classList.remove('opacity-0', 'translate-y-8');
            observer.unobserve(entry.target);
          }
        });
      }, observerOptions);

      document.querySelectorAll('.project-card, .timeline-item, .testimonial-card').forEach(el => {
        el.classList.add('transition-all', 'duration-700', 'opacity-0', 'translate-y-8');
        revealObserver.observe(el);
      });
    }
  };

  // Run animations after slight render tick
  setTimeout(initMotionAnimations, 100);

  /* ==========================================================================
     3. Testimonials Horizontal Carousel Controls
     ========================================================================== */
  const carousel = document.getElementById('testimonial-carousel');
  const prevBtn = document.getElementById('carousel-prev');
  const nextBtn = document.getElementById('carousel-next');

  if (carousel && prevBtn && nextBtn) {
    const scrollStep = 380;

    nextBtn.addEventListener('click', () => {
      carousel.scrollBy({ left: scrollStep, behavior: 'smooth' });
    });

    prevBtn.addEventListener('click', () => {
      carousel.scrollBy({ left: -scrollStep, behavior: 'smooth' });
    });

    // Mouse drag scrolling functionality
    let isDown = false;
    let startX;
    let scrollLeft;

    carousel.addEventListener('mousedown', (e) => {
      isDown = true;
      carousel.classList.add('active');
      startX = e.pageX - carousel.offsetLeft;
      scrollLeft = carousel.scrollLeft;
    });

    carousel.addEventListener('mouseleave', () => {
      isDown = false;
    });

    carousel.addEventListener('mouseup', () => {
      isDown = false;
    });

    carousel.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - carousel.offsetLeft;
      const walk = (x - startX) * 1.5;
      carousel.scrollLeft = scrollLeft - walk;
    });
  }

  /* ==========================================================================
     4. Video Play / Modal Lightbox System
     ========================================================================== */
  const videoModal = document.getElementById('video-modal');
  const modalVideo = document.getElementById('modal-video');
  const modalTitle = document.getElementById('modal-title');
  const modalDesc = document.getElementById('modal-desc');
  const closeVideoModalBtn = document.getElementById('close-video-modal');

  // Attach click listener to each card / play button
  document.querySelectorAll('.project-card').forEach(card => {
    const video = card.querySelector('video');
    const playBtn = card.querySelector('.video-play-btn');
    const title = card.querySelector('h3') ? card.querySelector('h3').innerText : 'Showcase Video';
    const desc = card.querySelector('p') ? card.querySelector('p').innerText : 'Creative Direction';

    const openModal = () => {
      if (video && videoModal && modalVideo) {
        modalVideo.src = video.getAttribute('src');
        modalVideo.poster = video.getAttribute('poster') || '';
        if (modalTitle) modalTitle.innerText = title;
        if (modalDesc) modalDesc.innerText = desc;
        
        videoModal.classList.remove('hidden');
        videoModal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        modalVideo.play().catch(e => console.log('Autoplay audio policy:', e));
      }
    };

    if (playBtn) {
      playBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        openModal();
      });
    }

    card.addEventListener('click', () => {
      openModal();
    });
  });

  const closeVideoModal = () => {
    if (videoModal && modalVideo) {
      modalVideo.pause();
      modalVideo.src = '';
      videoModal.classList.remove('active');
      videoModal.classList.add('hidden');
      document.body.style.overflow = '';
    }
  };

  if (closeVideoModalBtn) {
    closeVideoModalBtn.addEventListener('click', closeVideoModal);
  }

  if (videoModal) {
    videoModal.addEventListener('click', (e) => {
      if (e.target === videoModal) closeVideoModal();
    });
  }

  /* ==========================================================================
     5. "Book Call" Modal System
     ========================================================================== */
  const bookingModal = document.getElementById('booking-modal');
  const closeBookingModalBtn = document.getElementById('close-booking-modal');
  const bookingForm = document.getElementById('booking-form');
  const bookTriggers = document.querySelectorAll('.book-call-trigger');

  const openBookingModal = () => {
    if (bookingModal) {
      bookingModal.classList.remove('hidden');
      bookingModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  };

  const closeBookingModal = () => {
    if (bookingModal) {
      bookingModal.classList.remove('active');
      bookingModal.classList.add('hidden');
      document.body.style.overflow = '';
    }
  };

  bookTriggers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      // If inside video modal, close it first
      if (videoModal && !videoModal.classList.contains('hidden')) {
        closeVideoModal();
      }
      openBookingModal();
    });
  });

  if (closeBookingModalBtn) {
    closeBookingModalBtn.addEventListener('click', closeBookingModal);
  }

  if (bookingModal) {
    bookingModal.addEventListener('click', (e) => {
      if (e.target === bookingModal) closeBookingModal();
    });
  }

  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      closeBookingModal();
      showToast('Discovery call booked! Calendar invite sent 📅');
      bookingForm.reset();
    });
  }

  // Escape key closes modals
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeVideoModal();
      closeBookingModal();
    }
  });

  /* ==========================================================================
     6. Copy Email to Clipboard Toast
     ========================================================================== */
  const copyEmailBtn = document.getElementById('copy-email-btn');
  const toast = document.getElementById('toast');
  const toastMessage = document.getElementById('toast-message');

  function showToast(message) {
    if (!toast) return;
    if (toastMessage) toastMessage.innerText = message;
    toast.classList.remove('translate-y-20', 'opacity-0');
    toast.classList.add('translate-y-0', 'opacity-100');

    setTimeout(() => {
      toast.classList.add('translate-y-20', 'opacity-0');
      toast.classList.remove('translate-y-0', 'opacity-100');
    }, 3200);
  }

  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', (e) => {
      e.preventDefault();
      navigator.clipboard.writeText('hello@kanha.design')
        .then(() => {
          showToast('Copied hello@kanha.design to clipboard! 📬');
        })
        .catch(() => {
          showToast('Email: hello@kanha.design');
        });
    });
  }

  /* ==========================================================================
     7. Dynamic Year
     ========================================================================== */
  const currentYearEl = document.getElementById('current-year');
  if (currentYearEl) {
    currentYearEl.innerText = new Date().getFullYear();
  }
});
