// Shared JavaScript functionality for Stay Dripped Mobile IV

// Header scroll effect
function initHeaderScroll() {
  const header = document.getElementById("header");
  if (!header) {
    console.warn("Header element not found");
    return;
  }

  const handleScroll = () => {
    try {
      const shouldAddScrollClass = window.scrollY > 100;
      header.classList.toggle("scrolled", shouldAddScrollClass);
    } catch (error) {
      console.error("Error in scroll handler:", error);
    }
  };

  window.addEventListener("scroll", handleScroll, { passive: true });
}

// Fade in animation on scroll
function initFadeInAnimations() {
  if (!window.IntersectionObserver) {
    console.warn("IntersectionObserver not supported");
    return;
  }

  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const handleIntersection = (entries) => {
    entries.forEach((entry) => {
      try {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      } catch (error) {
        console.error("Error in intersection handler:", error);
      }
    });
  };

  const observer = new IntersectionObserver(
    handleIntersection,
    observerOptions,
  );
  const elements = document.querySelectorAll(".fade-in");

  elements.forEach((el) => {
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
