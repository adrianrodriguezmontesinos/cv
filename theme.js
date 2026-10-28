(function () {
  'use strict';

  var switchBtn = document.querySelector('[data-theme-switch]');
  if (!switchBtn) return;

  var root = document.documentElement;

  function currentTheme() {
    return root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
  }

  function sync() {
    var dark = currentTheme() === 'dark';
    switchBtn.setAttribute('aria-pressed', String(dark));
    switchBtn.setAttribute('aria-label', dark ? 'Switch to light theme' : 'Switch to dark theme');
  }

  switchBtn.addEventListener('click', function () {
    var next = currentTheme() === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    try {
      localStorage.setItem('theme', next);
    } catch (e) {}
    sync();
  });

  sync();
})();
