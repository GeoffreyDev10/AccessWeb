document.addEventListener("DOMContentLoaded", () => {
  /* =========================
     zone menu burger
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

  syncMenuWithViewport();
  mqDesktop.addEventListener("change", syncMenuWithViewport);

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (navToggle && !mqDesktop.matches) navToggle.removeAttribute("open");
    });
  });

  document.addEventListener("click", (event) => {
    if (navToggle && !mqDesktop.matches && !navToggle.contains(event.target)) {
      navToggle.removeAttribute("open");
    }
  });

  document.addEventListener("keydown", (event) => {
    if (navToggle && !mqDesktop.matches && event.key === "Escape") {
      navToggle.removeAttribute("open");
    }
  });

  /* =========================
     zone textarea auto-grow
  ========================= */
  const autoGrowAreas = document.querySelectorAll("textarea[data-autogrow='true']");

  function autoGrow(textarea) {
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
  }

  autoGrowAreas.forEach((ta) => {
    autoGrow(ta);
    ta.addEventListener("input", () => autoGrow(ta));
  });

  /* =========================
     zone carrousel (produit.html)
  ========================= */
  const viewport = document.querySelector(".carousel-viewport");
  const track = document.querySelector(".carousel-track");
  const slides = document.querySelectorAll(".carousel-slide");
  const btnPrev = document.querySelector(".carousel-btn-prev");
  const btnNext = document.querySelector(".carousel-btn-next");
  const btnPause = document.querySelector(".carousel-btn-pause");

  if (viewport && track && slides.length > 0) {
    let currentIndex = 0;
    const intervalMs = 7000;
    let timer = null;
    let isUserInteracting = false;
    let resumeTimeout = null;
    let isPaused = false;

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
      goToSlide((currentIndex + 1) % slides.length);
    }

    function prevSlide() {
      goToSlide((currentIndex - 1 + slides.length) % slides.length);
    }

    function stopAuto() {
      if (!timer) return;
      window.clearInterval(timer);
      timer = null;
    }

    function startAuto() {
      stopAuto();
      if (isPaused) return;

      timer = window.setInterval(() => {
        if (!isUserInteracting && !isPaused) nextSlide();
      }, intervalMs);
    }

    function pauseAndResumeLater() {
      isUserInteracting = true;

      window.clearTimeout(resumeTimeout);
      resumeTimeout = window.setTimeout(() => {
        isUserInteracting = false;
      }, 4000);
    }

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

        if (isPaused) stopAuto();
        else startAuto();
      });
    }

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

    window.addEventListener("resize", () => {
      viewport.scrollTo({
        left: currentIndex * getSlideWidth(),
        behavior: "auto",
      });
    });

    goToSlide(0);
    startAuto();
  }

  /* =========================
     zone helpers dialog accessibles
  ========================= */
  function getFocusableElements(container) {
    const selectors = [
      "a[href]",
      "button:not([disabled])",
      "input:not([disabled])",
      "select:not([disabled])",
      "textarea:not([disabled])",
      '[tabindex]:not([tabindex="-1"])',
    ];

    return Array.from(container.querySelectorAll(selectors.join(","))).filter(
      (el) => !el.hasAttribute("disabled") && !el.getAttribute("aria-hidden")
    );
  }

  function trapFocus(dialog, event) {
    if (event.key !== "Tab") return;

    const focusables = getFocusableElements(dialog);
    if (focusables.length === 0) return;

    const first = focusables[0];
    const last = focusables[focusables.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  function makeDialogAccessible(dialog, { closeBtnSelector } = {}) {
    if (!dialog) return null;

    let lastActiveElement = null;

    function openDialog(triggerEl) {
      lastActiveElement = triggerEl || document.activeElement;

      if (typeof dialog.showModal === "function") dialog.showModal();
      else dialog.setAttribute("open", "");

      const focusables = getFocusableElements(dialog);
      const closeBtn = closeBtnSelector ? dialog.querySelector(closeBtnSelector) : null;

      if (closeBtn) closeBtn.focus();
      else if (focusables[0]) focusables[0].focus();
      else dialog.focus();
    }

    function closeDialog() {
      if (typeof dialog.close === "function") dialog.close();
      else dialog.removeAttribute("open");

      if (lastActiveElement && typeof lastActiveElement.focus === "function") {
        lastActiveElement.focus();
      }
      lastActiveElement = null;
    }

    dialog.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        closeDialog();
        return;
      }
      trapFocus(dialog, e);
    });

    dialog.addEventListener("click", (e) => {
      const rect = dialog.getBoundingClientRect();
      const inDialog =
        rect.top <= e.clientY &&
        e.clientY <= rect.top + rect.height &&
        rect.left <= e.clientX &&
        e.clientX <= rect.left + rect.width;

      if (!inDialog) closeDialog();
    });

    return { openDialog, closeDialog };
  }

  /* =========================
     zone dialog "à propos"
  ========================= */
  const aboutDialog = document.getElementById("about-dialog");
  const openAbout = document.querySelector("[data-open-about]");
  const closeAbout = document.querySelector("[data-close-about]");

  const aboutAPI = makeDialogAccessible(aboutDialog, {
    closeBtnSelector: "[data-close-about]",
  });

  if (aboutAPI && openAbout) {
    openAbout.addEventListener("click", () => aboutAPI.openDialog(openAbout));
  }
  if (aboutAPI && closeAbout) {
    closeAbout.addEventListener("click", () => aboutAPI.closeDialog());
  }

  /* =========================
     zone contact (validation + popup + dialog)
  ========================= */
  const form = document.getElementById("contact-form");
  if (form) {
    const errorsBox = document.getElementById("form-errors");
    const popup = document.getElementById("contact-popup");

    const confirmDialog = document.getElementById("confirm-dialog");
    const confirmClose = document.getElementById("confirm-close");

    const confirmAPI = makeDialogAccessible(confirmDialog, {
      closeBtnSelector: "#confirm-close",
    });

    if (confirmAPI && confirmClose) {
      confirmClose.addEventListener("click", () => confirmAPI.closeDialog());
    }

    const fields = {
      prenom: form.querySelector("#prenom"),
      nom: form.querySelector("#nom"),
      naissance: form.querySelector("#naissance"),
      email: form.querySelector("#email"),
      telephone: form.querySelector("#telephone"),
      message: form.querySelector("#message"),
    };

    function showFieldError(input, message) {
      if (!input) return;

      input.setAttribute("aria-invalid", "true");

      let err = input.parentElement.querySelector(".field-error");
      if (!err) {
        err = document.createElement("p");
        err.className = "field-error";
        err.setAttribute("role", "alert");
        input.parentElement.appendChild(err);
      }

      err.textContent = message;
      const errId = `${input.id}-error`;
      err.id = errId;

      const current = (input.getAttribute("aria-describedby") || "").trim();
      const parts = current ? current.split(" ").filter(Boolean) : [];
      if (!parts.includes(errId)) parts.push(errId);
      input.setAttribute("aria-describedby", parts.join(" "));
    }

    function clearFieldError(input) {
      if (!input) return;

      input.removeAttribute("aria-invalid");

      const err = input.parentElement.querySelector(".field-error");
      if (err) err.remove();

      const current = (input.getAttribute("aria-describedby") || "").trim();
      if (!current) return;

      const errId = `${input.id}-error`;
      const parts = current
        .split(" ")
        .filter(Boolean)
        .filter((p) => p !== errId);

      if (parts.length) input.setAttribute("aria-describedby", parts.join(" "));
      else input.removeAttribute("aria-describedby");
    }

    const nameRegex = /^[\p{L}]+(?:[ '\-][\p{L}]+)*$/u;

    function isValidName(value) {
      const v = value.trim();
      return v.length >= 2 && v.length <= 50 && nameRegex.test(v);
    }

    function isValidEmail(value) {
      const v = value.trim();
      return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(v);
    }

    function normalizePhone(value) {
      return value.replace(/\s+/g, "").replace(/-/g, "");
    }

    function isValidPhone(value) {
      const v = normalizePhone(value);
      return /^(\+33|0)[1-9]\d{8}$/.test(v);
    }

    function parseBirthDate(value) {
      const v = value.trim();
      const m = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(v);
      if (!m) return null;

      const dd = Number(m[1]);
      const mm = Number(m[2]);
      const yyyy = Number(m[3]);

      const d = new Date(yyyy, mm - 1, dd);
      if (
        d.getFullYear() !== yyyy ||
        d.getMonth() !== mm - 1 ||
        d.getDate() !== dd
      ) {
        return null;
      }

      return d;
    }

    function isValidBirthDate(value) {
      const d = parseBirthDate(value);
      if (!d) return false;

      const now = new Date();
      if (d > now) return false;

      const age =
        now.getFullYear() -
        d.getFullYear() -
        (now < new Date(now.getFullYear(), d.getMonth(), d.getDate()) ? 1 : 0);

      return age >= 10 && age <= 120;
    }

    function isRadioChecked(name) {
      return !!form.querySelector(`input[name="${name}"]:checked`);
    }

    function showGlobalErrors(list) {
      if (!errorsBox) return;

      errorsBox.hidden = false;
      errorsBox.innerHTML = `<p><strong>Veuillez corriger les points suivants :</strong></p><ul>${list
        .map((msg) => `<li>${msg}</li>`)
        .join("")}</ul>`;
    }

    function clearGlobalErrors() {
      if (!errorsBox) return;

      errorsBox.hidden = true;
      errorsBox.innerHTML = "";
    }

    if (fields.naissance) {
      fields.naissance.addEventListener("input", () => {
        const raw = fields.naissance.value.replace(/[^\d]/g, "").slice(0, 8);
        let out = raw;

        if (raw.length >= 5) out = `${raw.slice(0, 2)}/${raw.slice(2, 4)}/${raw.slice(4)}`;
        else if (raw.length >= 3) out = `${raw.slice(0, 2)}/${raw.slice(2)}`;

        fields.naissance.value = out;
      });
    }

    Object.values(fields).forEach((input) => {
      if (!input) return;

      input.addEventListener("input", () => clearFieldError(input));

      input.addEventListener("blur", () => {
        const id = input.id;

        if (id === "prenom" && input.value.trim() && !isValidName(input.value)) {
          showFieldError(input, "Prénom invalide (lettres, espaces, tirets, apostrophes).");
        }

        if (id === "nom" && input.value.trim() && !isValidName(input.value)) {
          showFieldError(input, "Nom invalide (lettres, espaces, tirets, apostrophes).");
        }

        if (id === "email" && input.value.trim() && !isValidEmail(input.value)) {
          showFieldError(input, "Adresse e-mail invalide (ex : nom@domaine.fr).");
        }

        if (id === "telephone" && input.value.trim() && !isValidPhone(input.value)) {
          showFieldError(input, "Téléphone invalide (ex : 06 12 34 56 78 ou +33...).");
        }

        if (id === "naissance" && input.value.trim() && !isValidBirthDate(input.value)) {
          showFieldError(input, "Date invalide (format JJ/MM/AAAA, date réelle, pas dans le futur).");
        }
      });
    });

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      clearGlobalErrors();

      const errors = [];

      if (!fields.prenom.value.trim()) {
        errors.push("Le prénom est obligatoire.");
        showFieldError(fields.prenom, "Veuillez renseigner votre prénom.");
      } else if (!isValidName(fields.prenom.value)) {
        errors.push("Le prénom n’est pas au bon format.");
        showFieldError(fields.prenom, "Prénom invalide (lettres, espaces, tirets, apostrophes).");
      } else {
        clearFieldError(fields.prenom);
      }

      if (!fields.nom.value.trim()) {
        errors.push("Le nom est obligatoire.");
        showFieldError(fields.nom, "Veuillez renseigner votre nom.");
      } else if (!isValidName(fields.nom.value)) {
        errors.push("Le nom n’est pas au bon format.");
        showFieldError(fields.nom, "Nom invalide (lettres, espaces, tirets, apostrophes).");
      } else {
        clearFieldError(fields.nom);
      }

      if (!fields.naissance.value.trim()) {
        errors.push("La date de naissance est obligatoire.");
        showFieldError(fields.naissance, "Veuillez renseigner votre date de naissance (JJ/MM/AAAA).");
      } else if (!isValidBirthDate(fields.naissance.value)) {
        errors.push("La date de naissance n’est pas valide.");
        showFieldError(fields.naissance, "Date invalide (JJ/MM/AAAA, date réelle, pas dans le futur).");
      } else {
        clearFieldError(fields.naissance);
      }

      if (!fields.email.value.trim()) {
        errors.push("L’adresse e-mail est obligatoire.");
        showFieldError(fields.email, "Veuillez renseigner une adresse e-mail.");
      } else if (!isValidEmail(fields.email.value)) {
        errors.push("L’adresse e-mail n’est pas valide.");
        showFieldError(fields.email, "Adresse e-mail invalide (ex : nom@domaine.fr).");
      } else {
        clearFieldError(fields.email);
      }

      if (fields.telephone.value.trim()) {
        if (!isValidPhone(fields.telephone.value)) {
          errors.push("Le téléphone n’est pas valide.");
          showFieldError(fields.telephone, "Téléphone invalide (ex : 06 12 34 56 78 ou +33...).");
        } else {
          clearFieldError(fields.telephone);
        }
      } else {
        clearFieldError(fields.telephone);
      }

      if (!fields.message.value.trim()) {
        errors.push("Le message est obligatoire.");
        showFieldError(fields.message, "Veuillez écrire votre message.");
      } else if (fields.message.value.trim().length < 10) {
        errors.push("Le message est trop court (minimum 10 caractères).");
        showFieldError(fields.message, "Message trop court (minimum 10 caractères).");
      } else {
        clearFieldError(fields.message);
      }

      if (errors.length) {
        showGlobalErrors(errors);
        const firstInvalid = form.querySelector('[aria-invalid="true"]');
        if (firstInvalid) firstInvalid.focus();
        return;
      }

      if (popup) {
        popup.hidden = false;

        window.clearTimeout(window.__popupTimer);
        window.__popupTimer = window.setTimeout(() => {
          popup.hidden = true;
        }, 2500);
      }

      if (confirmAPI) confirmAPI.openDialog(document.activeElement);

      form.reset();
      autoGrowAreas.forEach((ta) => autoGrow(ta));
    });
  }

  /* =========================
     zone boutons "achat à venir"
  ========================= */
  const comingBtns = document.querySelectorAll("[data-coming='true']");

  comingBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      btn.blur();
    });

    btn.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") e.preventDefault();
    });
  });
});
