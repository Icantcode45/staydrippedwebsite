// Shared JavaScript functionality for Stay Dripped Mobile IV

// Header scroll effect
function initHeaderScroll() {
  window.addEventListener("scroll", () => {
    const header = document.getElementById("header");
    if (header) {
      if (window.scrollY > 100) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }
    }
  });
}

// Fade in animation on scroll
function initFadeInAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, observerOptions);

  document.querySelectorAll(".fade-in").forEach((el) => {
    observer.observe(el);
  });
}

// Analytics tracking
function trackPageView(pageTitle) {
  if (typeof gtag !== "undefined") {
    gtag("event", "page_view", {
      page_title: pageTitle,
      page_location: window.location.href,
    });
  }
}

// Initialize shared functionality
document.addEventListener("DOMContentLoaded", function () {
  initHeaderScroll();
  initFadeInAnimations();
});

// Export functions for module usage
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    initHeaderScroll,
    initFadeInAnimations,
    trackPageView,
  };
}
