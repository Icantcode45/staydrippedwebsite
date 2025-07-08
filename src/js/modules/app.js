// Application initialization and management

class App {
  constructor() {
    this.version = "2.0.0";
    this.isDebug =
      typeof process !== "undefined" && process.env?.NODE_ENV === "development";

    // Constants
    this.RIPPLE_DURATION = 400;
    this.TOAST_DURATION = 3000;
    this.TOAST_SHOW_DELAY = 100;
    this.TOAST_HIDE_DELAY = 300;
    this.FORM_SUBMIT_TIMEOUT = 2000;
    this.ANNOUNCEMENT_CLEANUP_DELAY = 1000;

    this.init();
  }

  init() {
    // Log app initialization
    if (this.isDebug) {
      console.log(`Stay Dripped Mobile IV - v${this.version} initialized`);
    }

    // Initialize core functionality
    this.initServiceWorker();
    this.initErrorHandling();
    this.initPerformanceMonitoring();
    this.initAccessibilityEnhancements();

    // Custom events for module communication
    this.setupCustomEvents();

    // Initialize interactive elements
    this.initInteractiveElements();
    this.initFormEnhancements();

    // Announce to screen readers that page is ready
    this.announcePageReady();

    // Trigger custom event for other scripts
    window.dispatchEvent(
      new CustomEvent("appReady", {
        detail: { version: this.version },
      }),
    );
  }

  initServiceWorker() {
    if (!this.isServiceWorkerSupported()) return;

    window.addEventListener("load", () => this.registerServiceWorker());
  }

  isServiceWorkerSupported() {
    return (
      "serviceWorker" in navigator &&
      window.location.protocol === "https:" &&
      !this.isDebug
    );
  }

  async registerServiceWorker() {
    try {
      const registration = await navigator.serviceWorker.register("/sw.js");
      this.handleServiceWorkerUpdate(registration);
    } catch (error) {
      if (this.isDebug) console.log("SW registration failed: ", error);
    }
  }

  handleServiceWorkerUpdate(registration) {
    registration.addEventListener("updatefound", () => {
      const newWorker = registration.installing;
      newWorker.addEventListener("statechange", () => {
        if (
          newWorker.state === "installed" &&
          navigator.serviceWorker.controller
        ) {
          this.showUpdateAvailable();
        }
      });
    });
  }

  initErrorHandling() {
    window.addEventListener("error", this.handleError.bind(this));
    window.addEventListener(
      "unhandledrejection",
      this.handleRejection.bind(this),
    );
  }

  handleError(event) {
    if (this.isDebug) {
      console.error("Global error:", event.message || "Unknown error");
    }
  }

  handleRejection(event) {
    event.preventDefault();
    if (this.isDebug) {
      console.error("Unhandled promise rejection:", event.reason?.toString());
    }
  }

  initPerformanceMonitoring() {
    if (!("PerformanceObserver" in window)) return;

    this.observeLargestContentfulPaint();
  }

  observeLargestContentfulPaint() {
    try {
      new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        if (entries.length > 0) {
          const lastEntry = entries[entries.length - 1];
          if (this.isDebug && lastEntry.startTime) {
            console.log("LCP:", Math.round(lastEntry.startTime));
          }
        }
      }).observe({ entryTypes: ["largest-contentful-paint"] });
    } catch (error) {
      if (this.isDebug) {
        console.warn("Performance observer not supported:", error);
      }
    }
  }

  initAccessibilityEnhancements() {
    // Keyboard navigation for custom elements
    document.addEventListener("keydown", (e) => {
      this.handleKeyboardNavigation(e);
    });

    // Focus management
    document.addEventListener("focusin", (e) => {
      if (
        e.target.matches(".btn, .card--interactive, a, input, textarea, select")
      ) {
        e.target.classList.add("focus-visible");
      }
    });

    document.addEventListener("focusout", (e) => {
      e.target.classList.remove("focus-visible");
    });

    // Reduced motion preference
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      document.documentElement.classList.add("reduce-motion");
    }
  }

  handleKeyboardNavigation(e) {
    // Escape key handling
    if (e.key === "Escape") {
      const openElements = document.querySelectorAll(
        ".mobile-menu.active, .dropdown.open",
      );
      openElements.forEach((el) => {
        el.classList.remove("active", "open");
      });
    }
  }

  initInteractiveElements() {
    // Add ripple effect to buttons
    document.addEventListener("click", (e) => {
      if (e.target.matches(".btn:not(.btn--link)")) {
        this.createRippleEffect(e);
      }
    });

    // Copy to clipboard functionality
    document.addEventListener("click", (e) => {
      if (e.target.matches("[data-copy]")) {
        this.copyToClipboard(e.target.dataset.copy);
      }
    });
  }

  createRippleEffect(e) {
    const button = e.target;
    const ripple = this.buildRippleElement(e, button);

    // Remove existing ripple
    const existing = button.querySelector(".ripple");
    if (existing) existing.remove();

    button.appendChild(ripple);
    setTimeout(() => ripple.remove(), 400);
  }

  buildRippleElement(e, button) {
    const ripple = document.createElement("span");
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);

    Object.assign(ripple.style, {
      width: `${size}px`,
      height: `${size}px`,
      left: `${e.clientX - rect.left - size / 2}px`,
      top: `${e.clientY - rect.top - size / 2}px`,
    });

    ripple.classList.add("ripple");
    return ripple;
  }

  async copyToClipboard(text) {
    try {
      await navigator.clipboard.writeText(text);
      this.showToast("Copied to clipboard!");
    } catch (err) {
      console.error("Failed to copy: ", err);
      this.showToast("Failed to copy", "error");
    }
  }

  initFormEnhancements() {
    // Real-time validation
    document.addEventListener("input", (e) => {
      if (e.target.matches("input[required], textarea[required]")) {
        this.validateField(e.target);
      }
    });

    // Form submission enhancement
    document.addEventListener("submit", (e) => {
      if (e.target.matches("form[data-enhanced]")) {
        this.handleFormSubmission(e);
      }
    });
  }

  validateField(field) {
    const isValid = field.checkValidity();
    field.classList.toggle("is-valid", isValid);
    field.classList.toggle("is-invalid", !isValid);
    field.setAttribute("aria-invalid", !isValid);
  }

  handleFormSubmission(e) {
    e.preventDefault();
    const form = e.target;
    const submitButton = form.querySelector('button[type="submit"]');

    if (submitButton) {
      submitButton.classList.add("btn--loading");
      submitButton.disabled = true;
    }

    // Simulate form processing
    setTimeout(() => {
      if (submitButton) {
        submitButton.classList.remove("btn--loading");
        submitButton.disabled = false;
      }
      this.showToast("Form submitted successfully!", "success");
    }, 2000);
  }

  setupCustomEvents() {
    // Theme change event
    window.addEventListener("themeChanged", (e) => {
      if (this.isDebug) {
        console.log("Theme changed to:", e.detail.theme);
      }
    });
  }

  showUpdateAvailable() {
    if (confirm("A new version is available! Would you like to update?")) {
      window.location.reload();
    }
  }

  showToast(message, type = "info") {
    const toast = document.createElement("div");
    toast.className = `toast toast--${type}`;
    toast.textContent = message;
    toast.setAttribute("role", "alert");

    document.body.appendChild(toast);

    setTimeout(() => toast.classList.add("toast--visible"), 100);
    setTimeout(() => {
      toast.classList.remove("toast--visible");
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }

  announcePageReady() {
    const announcement = document.createElement("div");
    announcement.setAttribute("aria-live", "polite");
    announcement.setAttribute("aria-atomic", "true");
    announcement.className = "sr-only";
    announcement.textContent = "Page loaded and ready for interaction";

    document.body.appendChild(announcement);
    setTimeout(() => announcement.remove(), 1000);
  }
}

// Make App available globally
window.App = App;

// Export for module usage
export default App;
