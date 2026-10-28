(function () {
  'use strict';

  var toggle = document.querySelector('[data-menu-toggle]');
  var menu = document.querySelector('[data-mobile-menu]');
  if (!toggle || !menu) return;

  var open = false;

  function setOpen(next, restoreFocus) {
    open = next;
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    menu.classList.toggle('is-open', open);
    document.body.classList.toggle('menu-open', open);
    if (open) {
      var firstLink = menu.querySelector('a');
      if (firstLink) firstLink.focus();
    } else if (restoreFocus !== false) {
      toggle.focus();
    }
  }

  toggle.addEventListener('click', function () {
    setOpen(!open);
  });

  document.addEventListener('keydown', function (event) {
    if (open && event.key === 'Escape') setOpen(false);
  });

  menu.addEventListener('click', function (event) {
    if (event.target.closest('a')) setOpen(false, false);
  });

  var mq = window.matchMedia('(min-width: 48rem)');
  function onChange() {
    if (open) setOpen(false, false);
  }
  if (mq.addEventListener) mq.addEventListener('change', onChange);
  else if (mq.addListener) mq.addListener(onChange);
})();
