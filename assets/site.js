(() => {
  'use strict';

  const menuButton = document.getElementById('menu');
  const mobileNav = document.getElementById('mobile');

  if (menuButton && mobileNav) {
    const closeMenu = () => {
      mobileNav.classList.remove('open');
      menuButton.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('menu-open');
    };

    menuButton.addEventListener('click', () => {
      const open = menuButton.getAttribute('aria-expanded') === 'true';
      menuButton.setAttribute('aria-expanded', String(!open));
      mobileNav.classList.toggle('open', !open);
      document.body.classList.toggle('menu-open', !open);
    });

    mobileNav.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
    window.addEventListener('resize', () => {
      if (window.innerWidth > 900) closeMenu();
    });
  }

  const form = document.getElementById('form');
  if (form) {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      if (!form.reportValidity()) return;

      const data = new FormData(form);
      const name = String(data.get('name') || '').trim();
      const phone = String(data.get('phone') || '').trim();
      const email = String(data.get('email') || '').trim();
      const service = String(data.get('service') || '').trim();
      const message = String(data.get('message') || '').trim();

      const subject = `Consultation request from ${name || 'website visitor'}`;
      const body = [
        `Name: ${name}`,
        `Phone: ${phone || 'Not provided'}`,
        `Email: ${email}`,
        `Service of interest: ${service || 'Not specified'}`,
        '',
        'How can we help?',
        message || 'No additional details provided.'
      ].join('\n');

      const button = form.querySelector('button[type="submit"]');
      const originalText = button ? button.textContent : '';
      if (button) {
        button.disabled = true;
        button.textContent = 'Opening your email…';
      }

      window.location.href = `mailto:info@evercaresupport.ca?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

      window.setTimeout(() => {
        if (button) {
          button.disabled = false;
          button.textContent = originalText;
        }
      }, 2500);
    });
  }

  const year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());
})();
