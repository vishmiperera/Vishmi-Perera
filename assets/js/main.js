/**
 * Vishmi Perera - Portfolio Main JavaScript
 * High-Converting Interactions, Custom Cursor, Accordions, Animations & Theme Controller
 */

document.addEventListener('DOMContentLoaded', () => {
  initCustomCursor();
  initMobileNav();
  initThemeToggle();
  initServicesAccordion();
  initMetricsCounter();
  initToolsFilter();
  initContactForm();
  initScrollAnimations();
  initBackToTop();
  initStampBadge();
});

/* ==========================================================================
   1. Custom Cursor with Smooth Lag
   ========================================================================== */
function initCustomCursor() {
  const dot = document.querySelector('.cursor-dot');
  const follower = document.querySelector('.cursor-follower');

  if (!dot || !follower) return;

  // Don't activate on touch devices
  if (window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 992) {
    dot.style.display = 'none';
    follower.style.display = 'none';
    return;
  }

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let followerX = mouseX;
  let followerY = mouseY;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    // Instant update for center dot
    dot.style.left = `${mouseX}px`;
    dot.style.top = `${mouseY}px`;
  });

  // Smooth lerp loop for follower circle
  function renderCursor() {
    followerX += (mouseX - followerX) * 0.15;
    followerY += (mouseY - followerY) * 0.15;

    follower.style.left = `${followerX}px`;
    follower.style.top = `${followerY}px`;

    requestAnimationFrame(renderCursor);
  }
  requestAnimationFrame(renderCursor);

  // Hover states on interactive elements
  const interactives = document.querySelectorAll('a, button, .service-card, .tool-card, .filter-btn, .social-icon-btn, .stamp-badge, input, textarea, select');
  interactives.forEach(el => {
    el.addEventListener('mouseenter', () => {
      document.body.classList.add('cursor-hover');
    });
    el.addEventListener('mouseleave', () => {
      document.body.classList.remove('cursor-hover');
    });
  });
}

/* ==========================================================================
   2. Mobile Navigation Drawer
   ========================================================================== */
function initMobileNav() {
  const toggleBtn = document.querySelector('.mobile-nav-toggle');
  const drawer = document.querySelector('.mobile-nav-drawer');
  const navLinks = document.querySelectorAll('.mobile-nav-link');

  if (!toggleBtn || !drawer) return;

  function toggleMenu() {
    const isOpen = drawer.classList.contains('open');
    if (isOpen) {
      drawer.classList.remove('open');
      toggleBtn.classList.remove('open');
      document.body.style.overflow = '';
    } else {
      drawer.classList.add('open');
      toggleBtn.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
  }

  toggleBtn.addEventListener('click', toggleMenu);

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      drawer.classList.remove('open');
      toggleBtn.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  // Close when clicking outside content
  drawer.addEventListener('click', (e) => {
    if (e.target === drawer) {
      toggleMenu();
    }
  });
}

/* ==========================================================================
   3. Dark / Light Mode Theme Controller
   ========================================================================== */
function initThemeToggle() {
  const toggleBtns = document.querySelectorAll('.theme-toggle-btn');
  const storedTheme = localStorage.getItem('vishmi-theme') || 'light';

  document.documentElement.setAttribute('data-theme', storedTheme);
  updateThemeIcons(storedTheme);

  toggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('vishmi-theme', newTheme);
      updateThemeIcons(newTheme);
    });
  });

  function updateThemeIcons(theme) {
    toggleBtns.forEach(btn => {
      const icon = btn.querySelector('i');
      if (icon) {
        if (theme === 'dark') {
          icon.className = 'fa-solid fa-sun';
          btn.setAttribute('title', 'Switch to Warm Cream Mode');
        } else {
          icon.className = 'fa-solid fa-moon';
          btn.setAttribute('title', 'Switch to Dark Mode');
        }
      }
    });
  }
}

/* ==========================================================================
   4. Services Accordion (Matching Jenny Scott UI design)
   ========================================================================== */
function initServicesAccordion() {
  const serviceCards = document.querySelectorAll('.service-card');

  if (!serviceCards.length) return;

  serviceCards.forEach(card => {
    card.addEventListener('click', () => {
      const isActive = card.classList.contains('active');

      // Close other cards for accordion effect
      serviceCards.forEach(other => {
        other.classList.remove('active');
        const arrow = other.querySelector('.service-arrow-btn i');
        if (arrow) arrow.className = 'fa-solid fa-arrow-up-right';
      });

      if (!isActive) {
        card.classList.add('active');
        const arrow = card.querySelector('.service-arrow-btn i');
        if (arrow) arrow.className = 'fa-solid fa-arrow-up-right';
      }
    });
  });
}

/* ==========================================================================
   5. Dynamic Metrics Counter on Scroll
   ========================================================================== */
function initMetricsCounter() {
  const counters = document.querySelectorAll('.counter-val');
  if (!counters.length) return;

  let animated = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animated) {
        animated = true;
        counters.forEach(counter => {
          const target = parseFloat(counter.getAttribute('data-target'));
          const isFloat = counter.getAttribute('data-float') === 'true';
          const prefix = counter.getAttribute('data-prefix') || '';
          const suffix = counter.getAttribute('data-suffix') || '';
          const duration = 2000;
          const startTime = performance.now();

          function updateCount(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out quart
            const easeProgress = 1 - Math.pow(1 - progress, 4);

            const current = progress === 1 ? target : (target * easeProgress);

            if (isFloat) {
              counter.textContent = `${prefix}${current.toFixed(1)}${suffix}`;
            } else {
              counter.textContent = `${prefix}${Math.floor(current).toLocaleString()}${suffix}`;
            }

            if (progress < 1) {
              requestAnimationFrame(updateCount);
            } else {
              if (isFloat) {
                counter.textContent = `${prefix}${target.toFixed(1)}${suffix}`;
              } else {
                counter.textContent = `${prefix}${target.toLocaleString()}${suffix}`;
              }
            }
          }

          requestAnimationFrame(updateCount);
        });
      }
    });
  }, { threshold: 0.3 });

  const section = document.querySelector('.results-section') || document.querySelector('.results-grid');
  if (section) observer.observe(section);
}

/* ==========================================================================
   6. Tools & Technology Filter
   ========================================================================== */
function initToolsFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const toolCards = document.querySelectorAll('.tool-card');

  if (!filterBtns.length || !toolCards.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      toolCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 10);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(10px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });
}

/* ==========================================================================
   7. Interactive Contact Form with Mailto & Toast Notification
   ========================================================================== */
function initContactForm() {
  const form = document.querySelector('.contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = form.querySelector('[name="name"]').value.trim();
    const email = form.querySelector('[name="email"]').value.trim();
    const subject = form.querySelector('[name="subject"]')?.value.trim() || 'Portfolio Inquiry';
    const message = form.querySelector('[name="message"]').value.trim();

    if (!name || !email || !message) {
      showToast('Please fill in all required fields.', 'warning');
      return;
    }

    // Trigger direct mail client with pre-filled content
    const mailtoUrl = `mailto:vishmi.sp@gmail.com?subject=${encodeURIComponent(`[Portfolio Inquiry] ${subject} - from ${name}`)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;

    window.open(mailtoUrl, '_blank');

    showToast(`Thank you, ${name}! Your email client has been prepared.`);
    form.reset();
  });
}

function showToast(message, type = 'success') {
  let toast = document.querySelector('.toast-notice');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast-notice';
    document.body.appendChild(toast);
  }

  const icon = type === 'warning' ? 'fa-triangle-exclamation' : 'fa-circle-check';
  toast.innerHTML = `<i class="fa-solid ${icon}" style="color: var(--accent-orange); font-size: 1.2rem;"></i> <span>${message}</span>`;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 4500);
}

/* ==========================================================================
   8. Scroll Reveal Animations
   ========================================================================== */
function initScrollAnimations() {
  const animElements = document.querySelectorAll('.fade-in-up');
  if (!animElements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  animElements.forEach(el => observer.observe(el));
}

/* ==========================================================================
   9. Back to Top Button
   ========================================================================== */
function initBackToTop() {
  const btn = document.querySelector('.back-to-top-btn');
  if (!btn) return;

  btn.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/* ==========================================================================
   10. Circular Stamp Badge Hover Interactions
   ========================================================================== */
function initStampBadge() {
  const stamp = document.querySelector('.stamp-badge');
  if (!stamp) return;

  stamp.addEventListener('click', () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.href = 'contact.html';
    }
  });
}

