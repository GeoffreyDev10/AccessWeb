document.addEventListener("DOMContentLoaded", () => {
  /* =========================
     MENU BURGER
  ========================= */
  const navToggle = document.querySelector(".nav-toggle");
  const navLinks = document.querySelectorAll(".nav-link");
  const mqDesktop = window.matchMedia("(min-width: 900px)");

  function syncMenuWithViewport() {
    if (!navToggle) return;
    if (mqDesktop.matches) {
      navToggle.setAttribute("open", "");
    } else {
      navToggle.removeAttribute("open");
    }
  }

  // Initial + changement breakpoint
  syncMenuWithViewport();
  mqDesktop.addEventListener("change", syncMenuWithViewport);

  // Fermer le menu en cliquant sur un lien (mobile uniquement)
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (navToggle && !mqDesktop.matches) {
        navToggle.removeAttribute("open");
      }
    });
  });

  // Fermer le menu si clic en dehors (mobile uniquement)
  document.addEventListener("click", (event) => {
    if (navToggle && !mqDesktop.matches && !navToggle.contains(event.target)) {
      navToggle.removeAttribute("open");
    }
  });

  // Fermer avec Echap (mobile uniquement)
  document.addEventListener("keydown", (event) => {
    if (navToggle && !mqDesktop.matches && event.key === "Escape") {
      navToggle.removeAttribute("open");
    }
  });

  /* =========================
     TEXTAREA AUTO-GROW
  ========================= */
  const autoGrowAreas = document.querySelectorAll("textarea[data-autogrow='true']");

  function autoGrow(textarea) {
    textarea.style.height = "auto";
    textarea.style.height = textarea.scrollHeight + "px";
  }

  autoGrowAreas.forEach((ta) => {
    autoGrow(ta);
    ta.addEventListener("input", () => autoGrow(ta));
  });

  /* =========================
     POPUP CONFIRMATION (SIMULATION)
  ========================= */
  const form = document.querySelector(".contact-form");
  const popup = document.getElementById("contact-popup");

  if (form && popup) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      popup.hidden = false;

      // Relancer anim coche si re-submit
      const check = popup.querySelector(".popup-checkmark");
      if (check) {
        check.style.animation = "none";
        void check.offsetWidth;
        check.style.animation = "";
      }

      window.clearTimeout(window.__popupTimer);
      window.__popupTimer = window.setTimeout(() => {
        popup.hidden = true;
      }, 2500);

      form.reset();
      autoGrowAreas.forEach((ta) => autoGrow(ta));
    });
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const viewport = document.querySelector(".carousel-viewport");
  const track = document.querySelector(".carousel-track");
  const slides = document.querySelectorAll(".carousel-slide");
  const btnPrev = document.querySelector(".carousel-btn-prev");
  const btnNext = document.querySelector(".carousel-btn-next");

  const btnPause = document.querySelector(".carousel-btn-pause");
  let isPaused = false;

  // Si on n'est pas sur produit.html ou si le carrousel n'existe pas, on stop
  if (!viewport || !track || slides.length === 0) return;

  let currentIndex = 0;
  const intervalMs = 7000;
  let timer = null;
  let isUserInteracting = false;
  let resumeTimeout = null;

  function getSlideWidth() {
    return viewport.clientWidth;
  }

  function goToSlide(index) {
    const maxIndex = slides.length - 1;
    currentIndex = Math.min(Math.max(index, 0), maxIndex);

    viewport.scrollTo({
      left: currentIndex * getSlideWidth(),
      behavior: "smooth",
    });
  }

  function nextSlide() {
    const next = (currentIndex + 1) % slides.length;
    goToSlide(next);
  }

  function prevSlide() {
    const prev = (currentIndex - 1 + slides.length) % slides.length;
    goToSlide(prev);
  }

  function startAuto() {
  stopAuto();
  if (isPaused) return;

  timer = window.setInterval(() => {
    if (!isUserInteracting && !isPaused) {
      nextSlide();
    }
  }, intervalMs);
}

  function stopAuto() {
    if (timer) {
      window.clearInterval(timer);
      timer = null;
    }
  }

  function pauseAndResumeLater() {
    isUserInteracting = true;

    window.clearTimeout(resumeTimeout);
    resumeTimeout = window.setTimeout(() => {
      isUserInteracting = false;
    }, 4000);
  }

  // Boutons
  if (btnNext) {
    btnNext.addEventListener("click", () => {
      pauseAndResumeLater();
      nextSlide();
    });
  }

  if (btnPrev) {
    btnPrev.addEventListener("click", () => {
      pauseAndResumeLater();
      prevSlide();
    });
  }

  if (btnPause) {
    btnPause.addEventListener("click", () => {
      isPaused = !isPaused;

      btnPause.setAttribute("aria-pressed", String(isPaused));
      btnPause.textContent = isPaused ? "Lecture" : "Pause";
      btnPause.setAttribute(
        "aria-label",
        isPaused
          ? "Relancer le défilement automatique du carrousel"
          : "Mettre le carrousel en pause"
      );

      if (isPaused) {
        stopAuto();
      } else {
        startAuto();
      }
    });
  }

  // Scroll manuel => on détecte l'index actuel
  let scrollTimeout = null;
  viewport.addEventListener("scroll", () => {
    pauseAndResumeLater();

    window.clearTimeout(scrollTimeout);
    scrollTimeout = window.setTimeout(() => {
      const w = getSlideWidth();
      const index = Math.round(viewport.scrollLeft / w);
      currentIndex = Math.min(Math.max(index, 0), slides.length - 1);
    }, 120);
  });

  // Clavier (quand la zone est focus)
  viewport.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      pauseAndResumeLater();
      nextSlide();
    }
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      pauseAndResumeLater();
      prevSlide();
    }
  });

  // Resize => recale sur la slide courante
  window.addEventListener("resize", () => {
    viewport.scrollTo({
      left: currentIndex * getSlideWidth(),
      behavior: "auto",
    });
  });

  // Démarrage
  goToSlide(0);
  startAuto();
});

document.addEventListener("DOMContentLoaded", () => {
  const dialog = document.getElementById("about-dialog");
  const openBtn = document.querySelector("[data-open-about]");
  const closeBtn = document.querySelector("[data-close-about]");

  if (!dialog || !openBtn || !closeBtn) return;

  function openDialog() {
    if (typeof dialog.showModal === "function") {
      dialog.showModal();
    } else {
      // fallback si un navigateur ne supporte pas <dialog>
      dialog.setAttribute("open", "");
    }
  }

  function closeDialog() {
    if (typeof dialog.close === "function") {
      dialog.close();
    } else {
      dialog.removeAttribute("open");
    }
  }

  openBtn.addEventListener("click", openDialog);
  closeBtn.addEventListener("click", closeDialog);

  // clic sur fond pour fermer
  dialog.addEventListener("click", (e) => {
    const rect = dialog.getBoundingClientRect();
    const inDialog =
      rect.top <= e.clientY &&
      e.clientY <= rect.top + rect.height &&
      rect.left <= e.clientX &&
      e.clientX <= rect.left + rect.width;

    if (!inDialog) closeDialog();
  });

  // ESC géré nativement par <dialog>, mais on garde fallback
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && dialog.hasAttribute("open")) {
      closeDialog();
    }
  });
});
