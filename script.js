/**
 * Vedant Jadhav Portfolio - Vanilla JavaScript Interactions
 * Executive Portfolio System
 */

document.addEventListener('DOMContentLoaded', () => {
  // --- 1. Sticky Header & Scroll Effects ---
  const header = document.querySelector('.site-header');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 40) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }

  // --- 2. Mobile Drawer Navigation ---
  const navToggleBtn = document.querySelector('.nav-toggle-btn');
  const mobileDrawer = document.querySelector('.mobile-drawer');
  const drawerCloseBtn = document.querySelector('.drawer-close-btn');

  function openDrawer() {
    if (mobileDrawer) {
      mobileDrawer.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeDrawer() {
    if (mobileDrawer) {
      mobileDrawer.classList.remove('open');
      document.body.style.overflow = '';
    }
  }

  if (navToggleBtn) {
    navToggleBtn.addEventListener('click', openDrawer);
  }

  if (drawerCloseBtn) {
    drawerCloseBtn.addEventListener('click', closeDrawer);
  }

  if (mobileDrawer) {
    mobileDrawer.addEventListener('click', (e) => {
      if (e.target === mobileDrawer) {
        closeDrawer();
      }
    });
  }

  // Close drawer on ESC key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileDrawer && mobileDrawer.classList.contains('open')) {
      closeDrawer();
    }
  });

  // --- 3. Active Nav Link Detection ---
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link, .drawer-link');
  navLinks.forEach((link) => {
    const linkHref = link.getAttribute('href');
    if (linkHref === currentPath || (currentPath === '' && linkHref === 'index.html')) {
      link.classList.add('active');
    }
  });

  // --- 4. Back to Top Button ---
  const backToTopBtn = document.querySelector('.btn-back-to-top');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // --- 5. Contact Form Submission Handling ---
  const contactForm = document.getElementById('portfolioContactForm');
  const formToast = document.getElementById('contactFormToast');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const nameInput = document.getElementById('senderName');
      const emailInput = document.getElementById('senderEmail');
      const subjectInput = document.getElementById('messageSubject');
      const messageInput = document.getElementById('messageBody');
      const submitBtn = document.getElementById('submitBtn');

      const name = nameInput ? nameInput.value.trim() : '';
      const email = emailInput ? emailInput.value.trim() : '';
      const subject = subjectInput ? subjectInput.value.trim() : 'Portfolio Inquiry';
      const message = messageInput ? messageInput.value.trim() : '';

      if (!name || !email || !message) {
        alert('Please fill in your name, email address, and message.');
        return;
      }

      // Visual button feedback
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = `<span>Sending...</span>`;
      }

      setTimeout(() => {
        if (formToast) {
          formToast.classList.add('success');
          formToast.style.display = 'flex';
          formToast.innerHTML = `
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
            <div>
              <strong>Thank you, ${name}!</strong> Your message has been prepared. If your email client does not open automatically, you can reach out directly at <a href="mailto:jadhavedant2006@gmail.com" style="text-decoration:underline; font-weight:600;">jadhavedant2006@gmail.com</a>.
            </div>
          `;
        }

        // Open mailto fallback with populated values
        const mailtoUri = `mailto:jadhavedant2006@gmail.com?subject=${encodeURIComponent(subject + ' - via Portfolio by ' + name)}&body=${encodeURIComponent('From: ' + name + ' (' + email + ')\n\n' + message)}`;
        window.location.href = mailtoUri;

        contactForm.reset();
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = `<span>Send Message</span> <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>`;
        }
      }, 700);
    });
  }

  // --- 6. Scroll Entrance Subtle Animations ---
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches && 'IntersectionObserver' in window) {
    const animTargets = document.querySelectorAll('.card, .pillar-card, .timeline-item, .lead-card-mckinsey, .lead-card-aspire, .lead-card-forum, .lead-card-civic, .tech-skill-card, .soft-skill-card');
    
    animTargets.forEach((target) => {
      target.style.opacity = '0';
      target.style.transform = 'translateY(16px)';
      target.style.transition = 'opacity 0.6s ease-out, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
    });

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          obs.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px'
    });

    animTargets.forEach((t) => observer.observe(t));
  }
});
