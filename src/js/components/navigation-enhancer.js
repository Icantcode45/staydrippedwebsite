// Navigation Enhancement System with 3D Effects and Smart Routing

class NavigationEnhancer {
  constructor() {
    this.currentPage = this.getCurrentPage();
    this.pageMap = this.createPageMap();
    this.stickyElements = [];

    this.init();
  }

  init() {
    this.enhanceNavigation();
    this.addStickyEffects();
    this.validatePageLinks();
    this.addSmartRedirects();
    this.enhanceButtonInteractions();
    this.addProgressiveEnhancement();
  }

  getCurrentPage() {
    const path = window.location.pathname;
    const filename = path.split("/").pop() || "index.html";
    return filename.replace(".html", "") || "index";
  }

  createPageMap() {
    return {
      index: "/",
      home: "/",
      services: "pages/services.html",
      "iv-therapy": "pages/iv-therapy.html",
      "iv-menu": "pages/iv-menu.html",
      pricing: "pages/pricing.html",
      booking: "pages/booking.html",
      "booking-iv-therapy": "pages/booking-iv-therapy.html",
      "booking-vitamin-shots": "pages/booking-vitamin-shots.html",
      "booking-membership": "pages/booking-membership.html",
      membership: "pages/membership.html",
      testimonials: "pages/testimonials.html",
      "client-portal": "pages/client-portal.html",
      "corporate-events": "pages/corporate-events.html",
      aesthetic: "pages/aesthetic.html",
      "blood-testing": "pages/blood-testing.html",
      "injection-shots": "pages/injection-shots.html",
      "hormone-replacement": "pages/hormone-replacement.html",
      franchise: "pages/franchise.html",
      partnerships: "pages/partnerships.html",
      micronutrient: "pages/micronutrient.html",
    };
  }

  enhanceNavigation() {
    // Update all navigation links to be relative from root
    const navLinks = document.querySelectorAll(
      'a[href*="pages/"], a[href^="#"]',
    );

    navLinks.forEach((link) => {
      const href = link.getAttribute("href");

      // Handle page links
      if (href && href.includes("pages/")) {
        this.enhancePageLink(link);
      }

      // Handle anchor links
      if (href && href.startsWith("#")) {
        this.enhanceAnchorLink(link);
      }
    });

    // Set active states
    this.setActiveNavigationStates();
  }

  enhancePageLink(link) {
    const href = link.getAttribute("href");

    // Validate href to prevent malicious URLs
    if (!this.isValidPageHref(href)) {
      return;
    }

    const cleanHref = href.startsWith("/") ? href : `/${href}`;

    // Ensure proper linking from any page level
    const isOnSubpage = window.location.pathname.includes("/pages/");
    const adjustedHref =
      isOnSubpage && !href.startsWith("../") && !href.startsWith("/")
        ? `../${href}`
        : cleanHref;

    link.setAttribute("href", adjustedHref);

    // Add enhanced hover effects
    link.addEventListener("mouseenter", () => {
      link.style.transform = "translateY(-2px) scale(1.02)";
      link.style.boxShadow = "0 4px 12px rgba(0, 122, 255, 0.3)";
    });

    link.addEventListener("mouseleave", () => {
      link.style.transform = "";
      link.style.boxShadow = "";
    });

    // Add loading state for page transitions
    link.addEventListener("click", (e) => {
      if (!e.ctrlKey && !e.metaKey) {
        this.addPageTransition(link);
      }
    });
  }

  enhanceAnchorLink(link) {
    link.addEventListener("click", (e) => {
      e.preventDefault();

      const targetId = link.getAttribute("href").substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        this.smoothScrollToElement(targetElement);
      } else {
        // If anchor doesn't exist on current page, try to navigate to home page
        if (
          window.location.pathname !== "/" &&
          window.location.pathname !== "/index.html"
        ) {
          const href = link.getAttribute("href");
          // Validate the href to prevent XSS
          if (href && href.startsWith("#") && /^#[a-zA-Z0-9_-]+$/.test(href)) {
            window.location.href = `/${href}`;
          }
        }
      }
    });
  }

  smoothScrollToElement(element) {
    const headerHeight =
      document.querySelector(".header, .site-header")?.offsetHeight || 80;
    const targetPosition =
      element.getBoundingClientRect().top +
      window.pageYOffset -
      headerHeight -
      20;

    // Add smooth scroll with easing
    this.animatedScrollTo(targetPosition, 800);

    // Add highlight effect to target element
    this.highlightElement(element);
  }

  animatedScrollTo(targetY, duration) {
    const startY = window.pageYOffset;
    const distance = targetY - startY;
    const startTime = performance.now();

    const easeInOutCubic = (t) => {
      return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
    };

    const animateScroll = (currentTime) => {
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);
      const easedProgress = easeInOutCubic(progress);

      window.scrollTo(0, startY + distance * easedProgress);

      if (progress < 1) {
        requestAnimationFrame(animateScroll);
      }
    };

    requestAnimationFrame(animateScroll);
  }

  highlightElement(element) {
    element.style.transition = "all 0.3s ease";
    element.style.transform = "scale(1.02)";
    element.style.boxShadow = "0 0 20px rgba(0, 122, 255, 0.3)";

    setTimeout(() => {
      element.style.transform = "";
      element.style.boxShadow = "";
    }, 1000);
  }

  addPageTransition(link) {
    const overlay = this.createTransitionOverlay();
    this.addSpinnerStyles();
    this.showTransitionOverlay(overlay);
    this.scheduleOverlayCleanup(overlay);
  }

  createTransitionOverlay() {
    const overlay = document.createElement("div");
    overlay.className = "page-transition-overlay";
    overlay.style.cssText = this.getOverlayStyles();

    const content = this.createOverlayContent();
    overlay.appendChild(content);

    document.body.appendChild(overlay);
    return overlay;
  }

  getOverlayStyles() {
    return `
      position: fixed; top: 0; left: 0; width: 100%; height: 100%;
      background: linear-gradient(145deg, rgba(0, 122, 255, 0.9), rgba(90, 200, 250, 0.9));
      z-index: 10000; opacity: 0; transition: opacity 0.3s ease;
      display: flex; align-items: center; justify-content: center;
      color: white; font-size: 1.2rem; font-weight: 600; backdrop-filter: blur(10px);
    `;
  }

  createOverlayContent() {
    const container = document.createElement("div");
    container.style.textAlign = "center";

    const spinner = document.createElement("div");
    spinner.className = "loading-spinner";

    const text = document.createElement("div");
    text.textContent = "Loading...";

    container.appendChild(spinner);
    container.appendChild(text);

    return container;
  }

  addSpinnerStyles() {
    if (document.querySelector("#loading-spinner-styles")) return;

    const style = document.createElement("style");
    style.id = "loading-spinner-styles";
    style.textContent = `
      .loading-spinner {
        width: 40px; height: 40px; margin: 0 auto 1rem;
        border: 3px solid rgba(255,255,255,0.3);
        border-top: 3px solid white; border-radius: 50%;
        animation: spin 1s linear infinite;
      }
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `;
    document.head.appendChild(style);
  }

  showTransitionOverlay(overlay) {
    requestAnimationFrame(() => {
      overlay.style.opacity = "1";
    });
  }

  scheduleOverlayCleanup(overlay) {
    setTimeout(() => {
      if (overlay.parentNode) {
        overlay.remove();
      }
    }, 5000);
  }

  setActiveNavigationStates() {
    const navLinks = document.querySelectorAll(".nav-link, .mobile-menu__link");
    const currentPath = window.location.pathname;

    navLinks.forEach((link) => {
      const href = link.getAttribute("href");
      let isActive = false;

      // Check for exact match or page match
      if (
        href === currentPath ||
        href === `.${currentPath}` ||
        href === `..${currentPath}` ||
        (href &&
          currentPath.includes(href.replace("../", "").replace("./", "")))
      ) {
        isActive = true;
      }

      // Special case for home page
      if (
        (currentPath === "/" ||
          currentPath === "/index.html" ||
          currentPath.endsWith("index.html")) &&
        (href === "#home" || href === "/" || href === "./index.html")
      ) {
        isActive = true;
      }

      if (isActive) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });
  }

  addStickyEffects() {
    // Make header truly sticky with enhanced effects
    const header = document.querySelector(".header, .site-header");
    if (header) {
      this.enhanceStickyHeader(header);
    }

    // Add sticky back-to-top button
    this.addStickyBackToTop();

    // Add sticky contact buttons
    this.addStickyContactButtons();
  }

  enhanceStickyHeader(header) {
    let lastScrollY = window.pageYOffset;
    let ticking = false;

    const updateHeader = () => {
      const scrollY = window.pageYOffset;
      const scrollDirection = scrollY > lastScrollY ? "down" : "up";

      if (scrollY > 100) {
        header.classList.add("scrolled");

        // Hide header on scroll down, show on scroll up
        if (scrollDirection === "down" && scrollY > 200) {
          header.style.transform = "translateY(-100%)";
        } else if (scrollDirection === "up") {
          header.style.transform = "translateY(0)";
        }
      } else {
        header.classList.remove("scrolled");
        header.style.transform = "translateY(0)";
      }

      lastScrollY = scrollY;
      ticking = false;
    };

    window.addEventListener("scroll", () => {
      if (!ticking) {
        requestAnimationFrame(updateHeader);
        ticking = true;
      }
    });
  }

  addStickyBackToTop() {
    const backToTop = document.createElement("button");
    backToTop.className = "btn btn--floating back-to-top";
    const icon = document.createElement("i");
    icon.className = "fas fa-arrow-up";
    backToTop.appendChild(icon);
    backToTop.setAttribute("aria-label", "Back to top");

    backToTop.style.cssText = `
      position: fixed;
      bottom: 2rem;
      right: 2rem;
      width: 3.5rem;
      height: 3.5rem;
      border-radius: 50%;
      background: linear-gradient(145deg, #007AFF, #0056CC);
      color: white;
      border: none;
      box-shadow: 0 8px 16px rgba(0, 122, 255, 0.3);
      cursor: pointer;
      opacity: 0;
      visibility: hidden;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      z-index: 1000;
      display: flex;
      align-items: center;
      justify-content: center;
    `;

    // Show/hide based on scroll position
    window.addEventListener("scroll", () => {
      if (window.pageYOffset > 300) {
        backToTop.style.opacity = "1";
        backToTop.style.visibility = "visible";
      } else {
        backToTop.style.opacity = "0";
        backToTop.style.visibility = "hidden";
      }
    });

    // Smooth scroll to top
    backToTop.addEventListener("click", () => {
      this.animatedScrollTo(0, 600);
    });

    // Enhanced hover effects
    backToTop.addEventListener("mouseenter", () => {
      backToTop.style.transform = "translateY(-3px) scale(1.1)";
      backToTop.style.boxShadow = "0 12px 24px rgba(0, 122, 255, 0.4)";
    });

    backToTop.addEventListener("mouseleave", () => {
      backToTop.style.transform = "";
      backToTop.style.boxShadow = "0 8px 16px rgba(0, 122, 255, 0.3)";
    });

    document.body.appendChild(backToTop);
  }

  addStickyContactButtons() {
    const contactContainer = document.createElement("div");
    contactContainer.className = "sticky-contact-buttons";
    contactContainer.style.cssText = `
      position: fixed;
      bottom: 6rem;
      right: 2rem;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      z-index: 999;
    `;

    // Phone button
    const phoneBtn = document.createElement("a");
    phoneBtn.href = "tel:+16026889825";
    phoneBtn.className = "btn btn--success btn--icon";
    const phoneIcon = document.createElement("i");
    phoneIcon.className = "fas fa-phone";
    phoneBtn.appendChild(phoneIcon);
    phoneBtn.setAttribute("aria-label", "Call us");
    phoneBtn.style.cssText = `
      width: 3rem;
      height: 3rem;
      border-radius: 50%;
      box-shadow: 0 6px 12px rgba(52, 199, 89, 0.3);
      animation: pulse 2s infinite;
    `;

    // Book button
    const bookBtn = document.createElement("a");
    bookBtn.href = "pages/booking.html";
    bookBtn.className = "btn btn--primary btn--icon";
    const bookIcon = document.createElement("i");
    bookIcon.className = "fas fa-calendar-plus";
    bookBtn.appendChild(bookIcon);
    bookBtn.setAttribute("aria-label", "Book appointment");
    bookBtn.style.cssText = `
      width: 3rem;
      height: 3rem;
      border-radius: 50%;
      box-shadow: 0 6px 12px rgba(0, 122, 255, 0.3);
    `;

    contactContainer.appendChild(phoneBtn);
    contactContainer.appendChild(bookBtn);
    document.body.appendChild(contactContainer);
  }

  validatePageLinks() {
    // Check if all linked pages exist and add fallbacks
    const pageLinks = document.querySelectorAll('a[href*="pages/"]');

    pageLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        // Add error handling for missing pages
        const handleError = () => {
          e.preventDefault();
          this.showPageNotFound(link.href);
        };

        // You could implement a HEAD request here to check if page exists
        // For now, we'll rely on normal navigation with error handling
      });
    });
  }

  showPageNotFound(href) {
    const modal = this.createModal();
    const content = this.createModalContent();

    modal.appendChild(content);
    document.body.appendChild(modal);

    this.scheduleModalCleanup(modal);
  }

  createModal() {
    const modal = document.createElement("div");
    modal.style.cssText = `
      position: fixed; top: 0; left: 0; width: 100%; height: 100%;
      background: rgba(0, 0, 0, 0.8); display: flex;
      align-items: center; justify-content: center; z-index: 10000;
    `;
    return modal;
  }

  createModalContent() {
    const content = document.createElement("div");
    content.style.cssText = `
      background: white; padding: 2rem; border-radius: 1rem;
      text-align: center; max-width: 400px;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
    `;

    const title = document.createElement("h3");
    title.textContent = "Page Not Found";
    title.style.cssText = "margin-bottom: 1rem; color: #ff3b30;";

    const message = document.createElement("p");
    message.textContent = "The page you're looking for is coming soon!";
    message.style.cssText = "margin-bottom: 2rem; color: #666;";

    const button = document.createElement("button");
    button.className = "btn btn--primary";
    button.textContent = "OK";
    button.addEventListener("click", (e) => {
      const modal = e.target.closest('[style*="position: fixed"]');
      if (modal) {
        modal.remove();
      }
    });

    content.appendChild(title);
    content.appendChild(message);
    content.appendChild(button);

    return content;
  }

  scheduleModalCleanup(modal) {
    setTimeout(() => {
      if (modal.parentNode) {
        modal.remove();
      }
    }, 5000);
  }

  addSmartRedirects() {
    // Handle legacy URLs and common misspellings
    const urlParams = new URLSearchParams(window.location.search);
    const redirect = urlParams.get("redirect");

    // Validate redirect parameter to prevent open redirect attacks
    if (redirect && this.isValidRedirect(redirect) && this.pageMap[redirect]) {
      window.location.href = this.pageMap[redirect];
    }
  }

  isValidRedirect(redirect) {
    // Only allow alphanumeric characters, hyphens, and underscores
    return /^[a-zA-Z0-9_-]+$/.test(redirect) && redirect.length < 50;
  }

  enhanceButtonInteractions() {
    // Add enhanced 3D button effects to all buttons
    const buttons = document.querySelectorAll(".btn");

    buttons.forEach((button) => {
      // Skip if already enhanced
      if (button.classList.contains("enhanced")) return;

      button.classList.add("enhanced");

      // Add ripple effect on click
      button.addEventListener("click", (e) => {
        this.createRippleEffect(e, button);
      });

      // Add 3D hover effects
      button.addEventListener("mouseenter", () => {
        if (!button.disabled) {
          button.style.transform = "translateY(-3px) scale(1.02)";
          button.style.transition = "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)";
        }
      });

      button.addEventListener("mouseleave", () => {
        button.style.transform = "";
      });

      // Add keyboard interaction
      button.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          button.style.transform = "translateY(-1px) scale(0.98)";
        }
      });

      button.addEventListener("keyup", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          button.style.transform = "";
        }
      });
    });
  }

  createRippleEffect(e, button) {
    const ripple = document.createElement("span");
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    ripple.style.cssText = `
      position: absolute;
      top: ${y}px;
      left: ${x}px;
      width: ${size}px;
      height: ${size}px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.5);
      transform: scale(0);
      animation: ripple 0.6s linear;
      pointer-events: none;
    `;

    // Add ripple animation if not exists
    if (!document.querySelector("#ripple-animation")) {
      const style = document.createElement("style");
      style.id = "ripple-animation";
      style.textContent = `
        @keyframes ripple {
          to {
            transform: scale(4);
            opacity: 0;
          }
        }
      `;
      document.head.appendChild(style);
    }

    button.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
    }, 600);
  }

  addProgressiveEnhancement() {
    // Add loading states for slow connections
    if (
      "connection" in navigator &&
      navigator.connection.effectiveType === "slow-2g"
    ) {
      document.body.classList.add("slow-connection");

      // Reduce animations for slow connections
      const style = document.createElement("style");
      style.textContent = `
        .slow-connection * {
          animation-duration: 0.1s !important;
          transition-duration: 0.1s !important;
        }
      `;
      document.head.appendChild(style);
    }

    // Add intersection observer for performance
    if ("IntersectionObserver" in window) {
      const images = document.querySelectorAll("img[data-src]");
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.add("loaded");
            imageObserver.unobserve(img);
          }
        });
      });

      images.forEach((img) => imageObserver.observe(img));
    }
  }
}

// Auto-initialize when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    new NavigationEnhancer();
  });
} else {
  new NavigationEnhancer();
}

export default NavigationEnhancer;
