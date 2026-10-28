(function () {
  "use strict";

  var openBtn = document.querySelector("[data-cv-open]");
  var dialog = document.querySelector(".cv-modal");
  if (!openBtn || !dialog || typeof dialog.showModal !== "function") return;

  dialog.addEventListener("close", function () {
    openBtn.focus();
  });

  openBtn.addEventListener("click", function () {
    dialog.showModal();
  });

  dialog
    .querySelector("[data-cv-close]")
    .addEventListener("click", function () {
      dialog.close();
    });

  dialog.addEventListener("click", function (event) {
    if (event.target === dialog) dialog.close();
  });
})();
