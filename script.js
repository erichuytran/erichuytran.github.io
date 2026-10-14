/* =========================================================
   Portfolio scripts — no dependencies
   1. Theme toggle   2. Mobile menu   3. Scroll effects
   4. Reveal on scroll   5. Footer year
   ========================================================= */

(function () {
  "use strict";

  var root = document.documentElement;
  root.classList.add("js"); // lets CSS hide .reveal items only when JS is running

  /* ---------- 1. Theme toggle (light / dark) ---------- */
  var themeBtn = document.getElementById("themeToggle");

  function currentTheme() {
    var saved = root.getAttribute("data-theme");
    if (saved) return saved;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  themeBtn.addEventListener("click", function () {
    var next = currentTheme() === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    try { localStorage.setItem("theme", next); } catch (e) {}
  });

  /* ---------- 2. Mobile menu ---------- */
  var burger = document.getElementById("burger");
  var navLinks = document.getElementById("navLinks");

  function setMenu(open) {
    navLinks.classList.toggle("is-open", open);
    burger.setAttribute("aria-expanded", String(open));
  }

  burger.addEventListener("click", function () {
    setMenu(!navLinks.classList.contains("is-open"));
  });
  navLinks.addEventListener("click", function (e) {
    if (e.target.tagName === "A") setMenu(false);
  });

  /* ---------- 3. Scroll effects (progress bar + sticky nav style) ---------- */
  var nav = document.getElementById("nav");
  var progress = document.getElementById("progress");
  var ticking = false;

  function onScroll() {
    var scrollTop = window.scrollY;
    var max = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.transform = "scaleX(" + (max > 0 ? scrollTop / max : 0) + ")";
    nav.classList.toggle("is-scrolled", scrollTop > 20);
    ticking = false;
  }

  window.addEventListener("scroll", function () {
    if (!ticking) {
      window.requestAnimationFrame(onScroll);
      ticking = true;
    }
  }, { passive: true });
  onScroll();

  /* Highlight the nav link of the section currently in view */
  var links = document.querySelectorAll('.nav__links a[href^="#"]:not(.nav__cta)');
  var sectionObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      links.forEach(function (link) {
        link.classList.toggle("is-active", link.getAttribute("href") === "#" + entry.target.id);
      });
    });
  }, { rootMargin: "-45% 0px -50% 0px" });

  links.forEach(function (link) {
    var section = document.querySelector(link.getAttribute("href"));
    if (section) sectionObserver.observe(section);
  });

  /* ---------- 4. Reveal on scroll ---------- */
  var revealItems = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    var revealObserver = new IntersectionObserver(function (entries, observer) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target); // animate only once
        }
      });
    }, { threshold: 0.12 });

    revealItems.forEach(function (el) { revealObserver.observe(el); });
  } else {
    revealItems.forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* ---------- 5. Footer year ---------- */
  document.getElementById("year").textContent = new Date().getFullYear();
})();
