(() => {
  "use strict";

  const languages = ["vi", "en", "zh"];
  const tickerContent = {
    vi: "Công nghệ nông nghiệp thông minh · Viễn thám vệ tinh · Chuyển đổi số · Nông nghiệp xanh · Phân tích dữ liệu · Xuất khẩu nông sản · AI trong nông nghiệp",
    en: "Smart agriculture technology · Satellite remote sensing · Digital transformation · Green agriculture · Data analytics · Agricultural export · AI in agriculture",
    zh: "智慧农业技术 · 卫星遥感 · 数字化转型 · 绿色农业 · 数据分析 · 农产品出口 · 农业人工智能"
  };

  const icons = {
    leaf: '<path d="M20 4C12 4.5 6 9.5 5.2 17.2"/><path d="M20 4c.2 8.6-4.7 14.7-12.8 15.2"/><path d="M4 20c3.7-6.3 8.7-10.3 15-12"/>',
    satellite: '<path d="M9.5 14.5 5 19"/><path d="m14.5 9.5 4.5-4.5"/><rect x="8.5" y="8.5" width="7" height="7" rx="1.5" transform="rotate(45 12 12)"/><path d="M4 8l4-4 3.2 3.2-4 4z"/><path d="M12.8 16.8 16 20l4-4-3.2-3.2"/><path d="M18.5 9.5c1.3 1.3 2.1 2.9 2.4 4.7"/><path d="M3.1 9.8c.3 1.8 1.1 3.4 2.4 4.7"/>',
    chart: '<path d="M4 19h16"/><path d="M6.5 16V9"/><path d="M12 16V5"/><path d="M17.5 16v-4"/><path d="m5 8 4 3 4-6 6 5"/>',
    globe: '<circle cx="12" cy="12" r="8"/><path d="M4 12h16"/><path d="M12 4c2.2 2.4 3.3 5.1 3.3 8S14.2 17.6 12 20"/><path d="M12 4c-2.2 2.4-3.3 5.1-3.3 8S9.8 17.6 12 20"/>',
    document: '<path d="M7 3.5h7l3 3V20H7z"/><path d="M14 3.5V7h3"/><path d="M9.5 11h5"/><path d="M9.5 14h5"/><path d="M9.5 17h3"/>',
    target: '<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="4"/><path d="M12 2v3"/><path d="M12 19v3"/><path d="M2 12h3"/><path d="M19 12h3"/>',
    compass: '<circle cx="12" cy="12" r="8"/><path d="m15.2 8.8-2.1 4.3-4.3 2.1 2.1-4.3z"/>',
    layers: '<path d="m12 3 9 5-9 5-9-5z"/><path d="m3 12 9 5 9-5"/><path d="m3 16 9 5 9-5"/>',
    network: '<circle cx="6" cy="7" r="2.4"/><circle cx="18" cy="7" r="2.4"/><circle cx="12" cy="18" r="2.4"/><path d="M8.2 8.4 10.6 16"/><path d="m15.8 8.4-2.4 7.6"/><path d="M8.5 7h7"/>',
    factory: '<path d="M4 20V9l5 3V9l5 3V6h4v14z"/><path d="M7 17h2"/><path d="M12 17h2"/><path d="M17 17h1"/>',
    code: '<path d="m9 8-4 4 4 4"/><path d="m15 8 4 4-4 4"/><path d="m13 5-2 14"/>',
    mail: '<rect x="4" y="6" width="16" height="12" rx="2"/><path d="m4.8 7.5 7.2 5.3 7.2-5.3"/>',
    phone: '<path d="M8 4.5 10.2 9 8.8 10.8c1.2 2.3 3.1 4.2 5.4 5.4l1.8-1.4 4.5 2.2c-.4 2-1.6 3.4-3.4 3.4C9.8 20.4 3.6 14.2 3.6 6.9c0-1.8 1.4-3 3.4-3.4z"/>',
    pin: '<path d="M12 21s6-5.4 6-11a6 6 0 1 0-12 0c0 5.6 6 11 6 11z"/><circle cx="12" cy="10" r="2"/>',
    building: '<path d="M5 20V5h10v15"/><path d="M15 9h4v11"/><path d="M8 8h2"/><path d="M8 12h2"/><path d="M8 16h2"/><path d="M13 20H3h18"/>',
    shield: '<path d="M12 3 19 6v5c0 4.4-2.8 7.6-7 9-4.2-1.4-7-4.6-7-9V6z"/><path d="m9 12 2 2 4-5"/>',
    wrench: '<path d="M14.8 6.2a4.5 4.5 0 0 0 5 5L10.5 20.5a2.1 2.1 0 0 1-3-3l9.3-9.3a4.5 4.5 0 0 0-2-2z"/><path d="M8 18h.01"/>',
    route: '<circle cx="6" cy="6" r="2"/><circle cx="18" cy="18" r="2"/><path d="M8 6h4a4 4 0 0 1 0 8H9a3 3 0 0 0 0 6h7"/>',
    database: '<ellipse cx="12" cy="5.5" rx="6" ry="2.5"/><path d="M6 5.5v6c0 1.4 2.7 2.5 6 2.5s6-1.1 6-2.5v-6"/><path d="M6 11.5v6c0 1.4 2.7 2.5 6 2.5s6-1.1 6-2.5v-6"/>'
  };

  const iconPlan = {
    ".highlight-icon .lottie-icon": ["leaf", "satellite", "globe", "chart"],
    ".mission-icon": ["compass", "target"],
    ".goal-icon-wrap": ["leaf", "network", "globe"],
    ".project-icon": ["leaf", "satellite", "factory", "database", "code"],
    ".svc-icon": ["satellite", "wrench", "route", "network"],
    ".sf-icon": ["satellite", "chart", "shield"],
    ".ci-icon": ["pin", "mail", "phone", "building"],
    ".about-doc-icon": ["document"]
  };

  function svgIcon(name) {
    return `<svg class="icon-svg" viewBox="0 0 24 24" aria-hidden="true">${icons[name] || icons.leaf}</svg>`;
  }

  function safeStorageGet(key) {
    try {
      return window.localStorage.getItem(key);
    } catch {
      return null;
    }
  }

  function safeStorageSet(key, value) {
    try {
      window.localStorage.setItem(key, value);
    } catch {
      // File previews can disable storage in some browsers.
    }
  }

  function setLanguage(lang) {
    const nextLang = languages.includes(lang) ? lang : "vi";
    document.documentElement.lang = nextLang;
    document.documentElement.dataset.currentLang = nextLang;

    document.querySelectorAll("[data-lang]").forEach((element) => {
      element.classList.toggle("active", element.dataset.lang === nextLang);
    });

    document.querySelectorAll("[data-lang-inline]").forEach((element) => {
      element.classList.toggle("active", element.dataset.langInline === nextLang);
    });

    document.querySelectorAll("[data-lang-btn]").forEach((button) => {
      const active = button.dataset.langBtn === nextLang;
      button.classList.toggle("active", active);
      button.setAttribute("aria-pressed", String(active));
    });

    const ticker = document.getElementById("tickerText");
    if (ticker) {
      const text = tickerContent[nextLang] || tickerContent.vi;
      ticker.textContent = `${text}     ·     ${text}     ·     `;
    }

    safeStorageSet("tpv-language", nextLang);
  }

  function initLanguage() {
    const savedLang = safeStorageGet("tpv-language");
    const initialLang = languages.includes(savedLang) ? savedLang : "vi";

    document.querySelectorAll("[data-lang-btn]").forEach((button) => {
      button.addEventListener("click", () => setLanguage(button.dataset.langBtn));
    });

    setLanguage(initialLang);
  }

  function initNavigation() {
    const nav = document.querySelector(".nav");
    const hamburger = document.getElementById("hamburger");
    const mobileNav = document.getElementById("mobileNav");
    const mobileLinks = mobileNav ? mobileNav.querySelectorAll("a") : [];

    const onScroll = () => {
      if (nav) {
        nav.classList.toggle("scrolled", window.scrollY > 24);
      }
    };

    const closeMenu = () => {
      if (!hamburger || !mobileNav) return;
      hamburger.classList.remove("active");
      hamburger.setAttribute("aria-expanded", "false");
      mobileNav.classList.remove("open");
      mobileNav.setAttribute("aria-hidden", "true");
      document.body.classList.remove("nav-open");
    };

    const openMenu = () => {
      if (!hamburger || !mobileNav) return;
      hamburger.classList.add("active");
      hamburger.setAttribute("aria-expanded", "true");
      mobileNav.classList.add("open");
      mobileNav.setAttribute("aria-hidden", "false");
      document.body.classList.add("nav-open");
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    if (hamburger && mobileNav) {
      hamburger.addEventListener("click", () => {
        const expanded = hamburger.getAttribute("aria-expanded") === "true";
        expanded ? closeMenu() : openMenu();
      });

      mobileLinks.forEach((link) => link.addEventListener("click", closeMenu));

      document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
          closeMenu();
        }
      });

      window.addEventListener("resize", () => {
        if (window.innerWidth > 1180) {
          closeMenu();
        }
      });
    }

    document.querySelectorAll('a[href^="#"]').forEach((link) => {
      link.addEventListener("click", (event) => {
        const href = link.getAttribute("href");
        if (!href || href === "#") return;
        const target = document.querySelector(href);
        if (!target) return;

        event.preventDefault();
        closeMenu();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });
  }

  function initReveal() {
    const elements = document.querySelectorAll(".reveal, .reveal-delay");
    if (!elements.length) return;

    if (!("IntersectionObserver" in window)) {
      elements.forEach((element) => element.classList.add("visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -70px 0px" }
    );

    elements.forEach((element) => observer.observe(element));
  }

  function initBackToTop() {
    const button = document.getElementById("backToTop");
    if (!button) return;

    const toggleButton = () => {
      button.classList.toggle("visible", window.scrollY > 640);
    };

    button.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });

    window.addEventListener("scroll", toggleButton, { passive: true });
    toggleButton();
  }

  function stripEmojiLabels() {
    document.querySelectorAll(".project-badge [data-lang]").forEach((label) => {
      label.textContent = label.textContent.replace(/^[^\p{L}\p{N}]+/u, "").trim();
    });
  }

  function initIcons() {
    Object.entries(iconPlan).forEach(([selector, names]) => {
      document.querySelectorAll(selector).forEach((element, index) => {
        element.innerHTML = svgIcon(names[index % names.length]);
      });
    });

    stripEmojiLabels();
  }

  document.addEventListener("DOMContentLoaded", () => {
    initIcons();
    initLanguage();
    initNavigation();
    initReveal();
    initBackToTop();
  });
})();
