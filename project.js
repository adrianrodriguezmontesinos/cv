(function () {
  'use strict';

  var ROOT = '../../';

  // #region Project data
  var PROJECTS = {
    'angular-game': {
      slug: 'angular-game',
      title: 'Angular Game',
      category: 'Front-end',
      description: [
        'Angular Space Strategy Game is an OGame-inspired browser-based strategy game developed with Angular, TypeScript, NgRx Signals, RxJS, and SCSS. It features resource production, planetary development, fleet management, and time-based construction systems. The frontend uses Angular Signals and NgRx for reactive state management, RxJS Observables for asynchronous operations, and HTTP Interceptors for authentication, error handling, and API communication.',
        'The backend is built with C#, ASP.NET Core, and .NET, following Clean Architecture, SOLID principles, and RESTful API design. It implements server-authoritative timers for construction, research, resource generation, and fleet missions, using multithreading, asynchronous programming, background services, and concurrent task processing. The architecture incorporates optimized data structures, scheduling algorithms, thread-safe operations, and concurrency management to handle thousands of simultaneous game events, emphasizing scalability, observability, synchronization, and performance optimization.',
      ],
      technologies: [
        'Angular',
        'RxJS',
        'NGRX',
        'Signals',
        'Biome',
        '.NET',
        'Interceptors',
        'OAuth',
        'Monorepo',
        '.NET',
        'Multithreading',
      ],
    },
    'vk-tech': {
      slug: 'vk-tech',
      title: 'VK Tech',
      category: 'Tech Lead',
      description: [
        'Project focused on providing affordable, professional websites and landing pages for local businesses, startups, and entrepreneurs with limited resources, helping them establish a strong digital presence and reach new customers.',
        'Frontend developed with JavaScript, CSS, and Tailwind CSS, creating modern, responsive, and accessible interfaces. Reusable components and customizable layouts enable fast development while maintaining consistent UI/UX design across different businesses.',
        'Interactive experiences built with Three.js for 3D graphics, GSAP for advanced animations and scroll-based effects, and Lenis for smooth scrolling. Focused on delivering visually engaging websites with optimized performance, fluid transitions, and intuitive navigation.',
        'Dynamic forms powered by Formly to simplify customer interactions, contact requests, and configurable data collection. Emphasis on SEO, accessibility, mobile-first design, performance optimization, and conversion-focused landing pages tailored to each business.',
        'A scalable and cost-effective development approach using reusable templates, modular architecture, and streamlined deployment processes to reduce development time, maintenance costs, and technical complexity for small businesses.',
      ],
      technologies: ['HTML', 'JS', 'CSS', 'Canvas', 'ThreeJS', 'GSAP', 'Lenis', 'Formly', 'Tailwind CSS', 'Web3Forms'],
    },
    'audio-plugins': {
      slug: 'audio-plugins',
      title: 'Code Aw Audio Plugins',
      category: 'Project Manager',
      description: [
        'A collection of audio plugins developed in C++ using the iPlug framework, bringing together guitar amplifiers, pedalboards, drum instruments, and other tools for music production. The project combines software development with an interest in sound and music, exploring how digital tools can support musicians throughout the creative process. Each plugin focuses on a distinct part of that experience, from shaping a guitar tone and experimenting with effects to building the rhythmic foundation of a track.',
        'The guitar-focused plugins explore the relationship between amplification, effects, and tonal character. Amplifiers and pedalboards offer complementary ways to approach sound design, allowing musicians to think about both the core character of their tone and the effects that shape it. The drum instruments extend the collection into rhythm and composition, broadening its scope beyond guitar processing and connecting different aspects of music creation within the same project.',
        'C++ and iPlug provide the technical foundation for developing the collection, connecting audio processing with the controls and visual elements that musicians interact with. Working on these plugins brings together several areas of development, including signal processing, parameter management, and interface implementation. It is a space where technical decisions and creative goals are closely connected, because the way a control behaves can be just as important to the experience as the sound it produces.',
        'Interface design is another central part of the project, with an emphasis on making audio controls clear, approachable, and easy to explore. Familiar concepts from physical music equipment help give each plugin a recognizable structure, while the digital format offers room to refine how those controls are presented. Across the collection, the aim is to create a coherent relationship between sound and interaction, giving musicians tools that encourage experimentation and fit naturally into their creative workflow.',
      ],
      technologies: ['C++', 'iPlug', 'MIDI', 'Audio processing', 'SVG', 'VST3'],
    },
  };
  // #endregion Project data

  // #region Routing
  function currentSlug() {
    var segs = location.pathname.split('/').filter(Boolean);
    var i = segs.lastIndexOf('project');
    if (i === -1 || i === segs.length - 1) return null;
    var slug = segs[i + 1];
    if (/\.html?$/i.test(slug)) return null;
    return slug;
  }

  var slug = currentSlug();
  var project = slug && PROJECTS[slug];

  if (!project) {
    location.replace(ROOT + '404.html');
    return;
  }

  var images = (typeof GALLERY_MANIFEST !== 'undefined' && GALLERY_MANIFEST[slug]) || [];
  var imageSrc = function (file) {
    return ROOT + 'assets/images/' + slug + '/' + file;
  };
  // #endregion Routing

  // #region Metadata
  document.title = project.title + ' — Adrián Rodríguez';
  var metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) {
    metaDesc.setAttribute(
      'content',
      project.title +
        ' — ' +
        project.category +
        ' project case study by Adrián Rodríguez, Software Developer & Tech Lead.'
    );
  }
  // #endregion Metadata

  // #region Shared chrome
  var NAV_SECTIONS = [
    ['experience', 'Experience', '01'],
    ['projects', 'Projects', '02'],
    ['academic', 'Academic', '03'],
    ['skills', 'Skills', '04'],
  ];

  var navItems = NAV_SECTIONS.map(function (s) {
    return (
      '<li><a class="nav__link" href="' + ROOT + 'index.html#' + s[0] + '">' + s[1] + '</a></li>'
    );
  }).join('');

  var mobileItems = NAV_SECTIONS.map(function (s) {
    return (
      '<li style="--i: ' +
      s[2] +
      '">' +
      '<a class="mobile-menu__link" href="' +
      ROOT +
      'index.html#' +
      s[0] +
      '">' +
      '<span class="mobile-menu__index" aria-hidden="true">' +
      s[2] +
      '</span>' +
      '<span class="mobile-menu__name">' +
      s[1] +
      '</span>' +
      '</a></li>'
    );
  }).join('');

  var headerHTML =
    '<a class="skip-link" href="#main">Skip to main content</a>' +
    '<header class="site-header">' +
    '<div class="site-header__inner container">' +
    '<a class="brand" href="' +
    ROOT +
    'index.html">' +
    '<span class="brand__name">Adrián Rodríguez</span>' +
    '<span class="brand__role">Software Developer &amp; Tech Lead</span>' +
    '</a>' +
    '<nav class="nav" aria-label="Primary"><ul class="nav__list">' +
    navItems +
    '<li><a class="nav__link nav__link--external" href="https://landing.wiimapp.com/blog" target="_blank" rel="noopener noreferrer">Blog<span class="nav__external" aria-hidden="true">↗</span></a></li>' +
    '</ul></nav>' +
    '<button class="theme-switch" type="button" aria-pressed="false" aria-label="Switch to dark theme" data-theme-switch>' +
    '<span class="theme-switch__track" aria-hidden="true">' +
    '<span class="theme-switch__icon theme-switch__icon--light">' +
    '<img src="' +
    ROOT +
    'assets/icons/light.webp" alt="" width="150" height="150" decoding="async" />' +
    '</span>' +
    '<span class="theme-switch__icon theme-switch__icon--dark">' +
    '<img src="' +
    ROOT +
    'assets/icons/dark.webp" alt="" width="150" height="150" decoding="async" />' +
    '</span>' +
    '<span class="theme-switch__thumb"></span>' +
    '</span></button>' +
    '<button class="menu-toggle" type="button" aria-expanded="false" aria-controls="mobile-menu" aria-label="Open menu" data-menu-toggle>' +
    '<span class="menu-toggle__bars" aria-hidden="true"><span></span><span></span></span>' +
    '</button>' +
    '</div></header>' +
    '<nav class="mobile-menu" id="mobile-menu" aria-label="Mobile navigation" data-mobile-menu>' +
    '<ul class="mobile-menu__list">' +
    mobileItems +
    '<li style="--i: 4">' +
    '<a class="mobile-menu__link" href="https://landing.wiimapp.com/blog" target="_blank" rel="noopener noreferrer">' +
    '<span class="mobile-menu__index" aria-hidden="true">05</span>' +
    '<span class="mobile-menu__name">Blog</span>' +
    '<span class="mobile-menu__external" aria-hidden="true">↗</span>' +
    '</a></li>' +
    '</ul>' +
    '<p class="mobile-menu__note">Adrián Rodríguez · Madrid, Spain</p>' +
    '</nav>';

  var footerHTML =
    '<footer class="site-footer"><div class="container site-footer__inner">' +
    '<p class="site-footer__brand"><strong>Adrián Rodríguez</strong>' +
    '<span>Software Developer &amp; Tech Lead</span></p>' +
    '<p class="site-footer__copy">© 2026 Adrián Rodríguez. Handcrafted with native HTML &amp; CSS.</p>' +
    '<a class="site-footer__top" href="#top">Back to top ' +
    '<img src="' +
    ROOT +
    'assets/icons/up.webp" alt="" width="40" height="40" decoding="async" />' +
    '</a></div></footer>';
  // #endregion Shared chrome

  // #region Content
  var paragraphsHTML = project.description
    .map(function (p) {
      return '<p>' + p + '</p>';
    })
    .join('');

  var techHTML = project.technologies
    .map(function (t, i) {
      return '<li style="--i: ' + i + '">' + t + '</li>';
    })
    .join('');

  var galleryHTML = '';
  if (images.length) {
    var items = images
      .map(function (file, i) {
        var alt = project.title + ' — screenshot ' + (i + 1);
        return (
          '<li class="project-gallery__item" style="--i: ' +
          i +
          '">' +
          '<button class="project-gallery__btn" type="button" data-index="' +
          i +
          '" aria-label="Enlarge screenshot ' +
          (i + 1) +
          ' of ' +
          project.title +
          '">' +
          '<img src="' +
          imageSrc(file) +
          '" alt="' +
          alt +
          '" loading="lazy" decoding="async" />' +
          '</button></li>'
        );
      })
      .join('');
    galleryHTML =
      '<section class="project-section container" aria-labelledby="gallery-heading">' +
      '<h2 class="project-section__title" id="gallery-heading">Project Gallery</h2>' +
      '<ul class="project-gallery__grid">' +
      items +
      '</ul>' +
      '</section>';
  }

  var mainHTML =
    '<main id="main"><article class="project-page">' +
    '<header class="project-hero">' +
    '<span class="ink ink-star" aria-hidden="true"></span>' +
    '<span class="ink ink-ring" aria-hidden="true"></span>' +
    '<span class="ink ink-branch" aria-hidden="true"></span>' +
    '<div class="container">' +
    '<a class="project-nav-btn project-hero__back" href="' +
    ROOT +
    'index.html#projects">' +
    '<img class="project-nav-btn__icon" src="' +
    ROOT +
    'assets/icons/arrow_left.webp" alt="" width="150" height="114" decoding="async" />Back to Projects</a>' +
    '<p class="project-hero__category">' +
    project.category +
    '</p>' +
    '<h1 class="project-hero__title">' +
    project.title +
    '</h1>' +
    '</div></header>' +
    '<section class="project-section container" aria-labelledby="about-heading">' +
    '<h2 class="project-section__title" id="about-heading">About this project</h2>' +
    '<div class="project-body">' +
    paragraphsHTML +
    '</div>' +
    '</section>' +
    galleryHTML +
    '<section class="project-section container" aria-labelledby="tech-heading">' +
    '<h2 class="project-section__title" id="tech-heading">Technologies &amp; Tools</h2>' +
    '<ul class="pill-list project-tech__list">' +
    techHTML +
    '</ul>' +
    '</section>' +
    '<nav class="project-page__nav container" aria-label="Project navigation">' +
    '<a class="project-nav-btn project-page__cta" href="' +
    ROOT +
    'index.html#projects">' +
    '<img class="project-nav-btn__icon" src="' +
    ROOT +
    'assets/icons/arrow_left.webp" alt="" width="150" height="114" decoding="async" />Back to Projects</a>' +
    '</nav>' +
    '</article></main>';
  // #endregion Content

  // #region Render
  document.body.id = 'top';
  document.body.innerHTML = headerHTML + mainHTML + footerHTML;
  // #endregion Render

  // #region Lightbox
  if (images.length && typeof HTMLDialogElement === 'function') {
    var dialog = document.createElement('dialog');
    dialog.className = 'project-lightbox';
    dialog.setAttribute('aria-label', 'Enlarged project image');
    dialog.innerHTML =
      '<figure class="project-lightbox__frame">' +
      '<img class="project-lightbox__img" src="" alt="" />' +
      '<button class="project-lightbox__close" type="button" aria-label="Close image preview">×</button>' +
      '</figure>';
    document.body.appendChild(dialog);

    var bigImg = dialog.querySelector('.project-lightbox__img');

    document.querySelector('.project-gallery__grid').addEventListener('click', function (event) {
      var btn = event.target.closest('.project-gallery__btn');
      if (!btn) return;
      var i = Number(btn.getAttribute('data-index'));
      bigImg.src = imageSrc(images[i]);
      bigImg.alt = project.title + ' — screenshot ' + (i + 1);
      dialog.showModal();
    });

    dialog.querySelector('.project-lightbox__close').addEventListener('click', function () {
      dialog.close();
    });

    dialog.addEventListener('click', function (event) {
      if (event.target === dialog) dialog.close();
    });
  }
  // #endregion Lightbox
})();
