/**
 * MUHAMAD FATIH RIZQI — Portfolio JavaScript
 * Handles navigation interactions, active links, modal, and responsive behavior.
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Menu Toggle
  const menuToggle = document.getElementById('menuToggle');
  const navMenu = document.getElementById('navMenu');

  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', isOpen);
    });

    // Close menu when clicking any nav link
    const navLinks = navMenu.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // 2. Active Navigation Link on Scroll (ScrollSpy)
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const updateActiveLink = () => {
    const scrollPosition = window.scrollY + 100;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });

    // If at the very top, keep 'Work' or clear
    if (window.scrollY < 200) {
      navLinks.forEach(link => link.classList.remove('active'));
      const workLink = document.querySelector('.nav-link[href="#work"]');
      if (workLink) workLink.classList.add('active');
    }
  };

  window.addEventListener('scroll', updateActiveLink, { passive: true });

  // 3. Hire Me Modal Logic
  const openHireModalBtn = document.getElementById('openHireModal');
  const closeHireModalBtn = document.getElementById('closeHireModal');
  const hireModal = document.getElementById('hireModal');

  const openModal = (e) => {
    if (e) e.preventDefault();
    if (hireModal) {
      hireModal.classList.add('active');
      hireModal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }
  };

  const closeModal = () => {
    if (hireModal) {
      hireModal.classList.remove('active');
      hireModal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
  };

  if (openHireModalBtn) openHireModalBtn.addEventListener('click', openModal);
  if (closeHireModalBtn) closeHireModalBtn.addEventListener('click', closeModal);

  // Close modal when clicking on the backdrop
  if (hireModal) {
    hireModal.addEventListener('click', (e) => {
      if (e.target === hireModal) {
        closeModal();
      }
    });
  }

  // Close modal on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && hireModal && hireModal.classList.contains('active')) {
      closeModal();
    }
  });

  // 4. Subtle Interactive Parallax on Hero Title
  const heroStage = document.querySelector('.hero-typography-stage');
  const foregroundName = document.querySelector('.hero-foreground-name');

  if (heroStage && foregroundName && window.matchMedia('(pointer: fine)').matches) {
    heroStage.addEventListener('mousemove', (e) => {
      const rect = heroStage.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      
      foregroundName.style.transform = `translateY(calc(-50% + ${y * 10}px)) translateX(${x * 12}px) scaleY(1.08)`;
    });

    heroStage.addEventListener('mouseleave', () => {
      foregroundName.style.transform = 'translateY(-50%) translateX(0px) scaleY(1.08)';
    });
  }
});
