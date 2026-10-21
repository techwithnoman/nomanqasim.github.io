/* ==========================================================================
   M Noman Qasim — portfolio behaviour
   ========================================================================== */

(function () {
  "use strict";

  var $ = function (sel, ctx) { return (ctx || document).querySelector(sel); };
  var $$ = function (sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); };

  var header = $("#siteHeader");
  var navToggle = $("#navToggle");
  var nav = $("#siteNav");
  var progress = $("#scrollProgress");
  var toTop = $("#toTop");

  /* ---------- Header, progress bar, back to top ---------- */
  function onScroll() {
    var scrollY = window.scrollY || window.pageYOffset;
    var docHeight = document.documentElement.scrollHeight - window.innerHeight;

    if (header) header.classList.toggle("is-scrolled", scrollY > 8);
    if (progress) {
      var ratio = docHeight > 0 ? Math.min(scrollY / docHeight, 1) : 0;
      progress.style.transform = "scaleX(" + ratio + ")";
    }
    if (toTop) toTop.classList.toggle("is-visible", scrollY > 650);
  }

  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);

  /* ---------- Mobile navigation ---------- */
  function closeNav() {
    if (!header || !navToggle) return;
    header.classList.remove("nav-open");
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.setAttribute("aria-label", "Open menu");
  }

  if (navToggle && header) {
    navToggle.addEventListener("click", function () {
      var isOpen = header.classList.toggle("nav-open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
      navToggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
    });
  }

  if (nav) {
    $$("a", nav).forEach(function (link) {
      link.addEventListener("click", function () {
        closeNav();
        $$("a", nav).forEach(function (other) { other.classList.remove("is-active"); });
        link.classList.add("is-active");
      });
    });
  }

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") closeNav();
  });

  document.addEventListener("click", function (event) {
    if (!header || !header.classList.contains("nav-open")) return;
    if (!header.contains(event.target)) closeNav();
  });

  window.addEventListener("resize", function () {
    if (window.innerWidth > 980) closeNav();
  });

  /* ---------- Reveal on scroll ---------- */
  var revealEls = $$(".reveal");
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if ("IntersectionObserver" in window && !reduceMotion) {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });

    revealEls.forEach(function (el) { revealObserver.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* ---------- Active nav section ---------- */
  var navLinks = nav ? $$("a[href^='#']", nav) : [];
  var sections = navLinks
    .map(function (link) { return document.getElementById(link.getAttribute("href").slice(1)); })
    .filter(Boolean);

  function setActive(id) {
    navLinks.forEach(function (link) {
      link.classList.toggle("is-active", link.getAttribute("href") === "#" + id);
    });
  }

  if (sections.length && "IntersectionObserver" in window) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) setActive(entry.target.id);
      });
    }, { rootMargin: "-42% 0px -52% 0px", threshold: 0 });

    sections.forEach(function (section) { spy.observe(section); });
  }

  /* ---------- Back to top ---------- */
  if (toTop) {
    toTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
    });
  }

  /* ---------- Contact form ---------- */
  var form = $("#contactForm");
  var formNote = $("#formNote");

  if (form) {
    form.addEventListener("submit", function (event) {
      if (!form.checkValidity()) {
        event.preventDefault();
        form.reportValidity();
        return;
      }

      var isLocal = location.protocol === "file:" ||
        location.hostname === "localhost" ||
        location.hostname === "127.0.0.1";

      if (isLocal && formNote) {
        event.preventDefault();
        formNote.hidden = false;
        formNote.innerHTML = "Preview mode — messages are delivered once this site is live on Netlify. For now, email <a href=\"mailto:nomanqasim.work@gmail.com\">nomanqasim.work@gmail.com</a>.";
      }
    });
  }

  /* ---------- Footer year ---------- */
  var year = $("#year");
  if (year) year.textContent = String(new Date().getFullYear());
})();
