(function () {
  'use strict';

  const header = document.getElementById('site-header');
  const toggle = document.querySelector('.nav__toggle');
  const links  = document.getElementById('nav-links');

  // Sticky shadow on scroll
  window.addEventListener('scroll', function () {
    header.classList.toggle('scrolled', window.scrollY > 8);
  }, { passive: true });

  // Mobile menu toggle
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      const expanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!expanded));
      links.classList.toggle('open', !expanded);
      document.body.style.overflow = expanded ? '' : 'hidden';
    });

    // Close on link click
    links.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        toggle.setAttribute('aria-expanded', 'false');
        links.classList.remove('open');
        document.body.style.overflow = '';
      });
    });

    // Close on outside click
    document.addEventListener('click', function (e) {
      if (!header.contains(e.target) && links.classList.contains('open')) {
        toggle.setAttribute('aria-expanded', 'false');
        links.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  }

  // Active nav link based on current page
  var current = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav__link').forEach(function (link) {
    var href = link.getAttribute('href');
    if (href === current || (current === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
}());
