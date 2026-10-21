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
    var submitBtn = form.querySelector('button[type="submit"]');
    var submitLabel = submitBtn ? submitBtn.innerHTML : "";

    function setNote(message, isError) {
      if (!formNote) return;
      formNote.className = isError ? "form-note form-note--error" : "form-note";
      formNote.textContent = message;
      formNote.hidden = false;
    }

    function buildMailto(name, email, message) {
      var subject = "Portfolio message from " + (name || "website visitor");
      var body = "Name: " + (name || "") +
        "\nEmail: " + (email || "") +
        "\n\n" + (message || "");
      return "mailto:nomanqasim.work@gmail.com?subject=" +
        encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
    }

    function showFallback(name, email, message) {
      if (!formNote) return;
      formNote.className = "form-note form-note--error";
      formNote.textContent = "The message couldn't be sent automatically. Please email me directly: ";
      var link = document.createElement("a");
      link.href = buildMailto(name, email, message);
      link.textContent = "open a pre-filled email";
      formNote.appendChild(link);
      formNote.appendChild(document.createTextNode("."));
      formNote.hidden = false;
    }

    function resetButton() {
      if (!submitBtn) return;
      submitBtn.disabled = false;
      submitBtn.innerHTML = submitLabel;
    }

    form.addEventListener("submit", function (event) {
      event.preventDefault();

      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      var honey = form.elements["_honey"];
      if (honey && honey.value) return;

      var name = form.elements["name"].value.trim();
      var email = form.elements["email"].value.trim();
      var message = form.elements["message"].value.trim();

      var isLocal = location.protocol === "file:" ||
        location.hostname === "localhost" ||
        location.hostname === "127.0.0.1";

      if (isLocal) {
        setNote("Preview mode — the form sends through FormSubmit once the site is live. For now, use the email link below.", false);
        return;
      }

      var action = form.getAttribute("action") || "";
      var endpoint = action.replace("https://formsubmit.co/", "https://formsubmit.co/ajax/");

      if (!window.fetch || endpoint === action) {
        showFallback(name, email, message);
        return;
      }

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = "Sending...";
      }
      if (formNote) {
        formNote.hidden = true;
        formNote.textContent = "";
      }

      var controller = window.AbortController ? new AbortController() : null;
      var timer = controller ? setTimeout(function () {
        controller.abort();
      }, 15000) : null;

      fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          name: name,
          email: email,
          message: message,
          _subject: "New portfolio message from " + name,
          _template: "table",
          _captcha: "false"
        }),
        signal: controller ? controller.signal : undefined
      })
        .then(function (response) {
          return response.json().catch(function () {
            return {};
          }).then(function (data) {
            if (!response.ok) throw new Error("HTTP " + response.status);
            return data;
          });
        })
        .then(function (data) {
          if (timer) clearTimeout(timer);
          var success = data && (data.success === true || data.success === "true");
          if (!success) throw new Error((data && data.message) || "Submission failed");
          setNote("Thanks, " + name + " — your message has been sent. I'll get back to you soon.", false);
          form.reset();
        })
        .catch(function () {
          if (timer) clearTimeout(timer);
          showFallback(name, email, message);
        })
        .then(resetButton);
    });
  }

  /* ---------- Footer year ---------- */
  var year = $("#year");
  if (year) year.textContent = String(new Date().getFullYear());
})();
