/**
 * Premium IntakeQ Widget Manager
 * Handles loading and managing IntakeQ booking widgets for each service
 */

class IntakeQWidgetManager {
  constructor() {
    this.loadedWidgets = new Map();
    this.activeWidget = null;
    this.services = null;
    this.initialized = false;

    this.init();
  }

  async init() {
    try {
      // Load services data
      await this.loadServicesData();

      // Setup event listeners
      this.setupEventListeners();

      // Initialize widgets on page
      this.initializeExistingWidgets();

      this.initialized = true;
      console.log("IntakeQ Widget Manager initialized successfully");
    } catch (error) {
      console.error("Failed to initialize IntakeQ Widget Manager:", error);
    }
  }

  async loadServicesData() {
    if (window.STAY_DRIPPED_SERVICES) {
      this.services = window.STAY_DRIPPED_SERVICES;
      return;
    }

    // Dynamically load services data if not available
    try {
      const response = await fetch("/assets/js/services-data.js");
      const script = await response.text();
      eval(script);
      this.services = window.STAY_DRIPPED_SERVICES;
    } catch (error) {
      console.error("Failed to load services data:", error);
      throw error;
    }
  }

  setupEventListeners() {
    // Listen for booking button clicks
    document.addEventListener("click", (e) => {
      const bookingBtn = e.target.closest("[data-service-booking]");
      if (bookingBtn) {
        e.preventDefault();
        const serviceKey = bookingBtn.getAttribute("data-service-booking");
        this.openServiceBooking(serviceKey);
      }
    });

    // Listen for widget container creation
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            const widgetContainers = node.matches?.(".intakeq-widget-container")
              ? [node]
              : Array.from(
                  node.querySelectorAll?.(".intakeq-widget-container") || [],
                );

            widgetContainers.forEach((container) => {
              this.initializeWidgetContainer(container);
            });
          }
        });
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  }

  initializeExistingWidgets() {
    // Find existing widget containers
    const containers = document.querySelectorAll(".intakeq-widget-container");
    containers.forEach((container) => {
      this.initializeWidgetContainer(container);
    });
  }

  initializeWidgetContainer(container) {
    const serviceKey = container.getAttribute("data-service");
    if (!serviceKey || this.loadedWidgets.has(container)) return;

    const service = this.services.services[serviceKey];
    if (!service) {
      console.warn(`Service not found: ${serviceKey}`);
      return;
    }

    // Mark as initialized
    this.loadedWidgets.set(container, {
      serviceKey,
      service,
      loaded: false,
    });

    // Add loading state
    this.showLoadingState(container);

    // Setup intersection observer for lazy loading
    this.setupLazyLoading(container);
  }

  setupLazyLoading(container) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.loadWidget(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: "100px",
      },
    );

    observer.observe(container);
  }

  async loadWidget(container) {
    const widgetData = this.loadedWidgets.get(container);
    if (!widgetData || widgetData.loaded) return;

    try {
      // Clean up any existing IntakeQ instances
      this.cleanupExistingWidget();

      // Set IntakeQ configuration
      window.intakeq = this.services.baseConfig.accountId;
      window.intakeqServiceId = widgetData.service.id;

      // Create widget HTML
      const widgetHtml = this.createWidgetHTML(widgetData.service);
      container.innerHTML = widgetHtml;

      // Load IntakeQ script
      await this.loadIntakeQScript();

      // Mark as loaded
      widgetData.loaded = true;
      this.activeWidget = container;

      // Add loaded class for styling
      container.classList.add("intakeq-widget--loaded");

      // Track analytics
      this.trackWidgetLoad(widgetData.serviceKey);
    } catch (error) {
      console.error("Failed to load IntakeQ widget:", error);
      this.showErrorState(container, error.message);
    }
  }

  createWidgetHTML(service) {
    return `
      <div class="intakeq-service-header">
        <div class="intakeq-service-info">
          <h3 class="intakeq-service-title">${service.name}</h3>
          <p class="intakeq-service-description">${service.description}</p>
          <div class="intakeq-service-details">
            <span class="intakeq-service-price">Starting at $${service.price}</span>
            <span class="intakeq-service-duration">${service.duration}</span>
          </div>
        </div>
        <div class="intakeq-service-actions">
          <a href="${this.services.getBookingUrl(Object.keys(this.services.services).find((key) => this.services.services[key] === service))}" 
             class="btn btn--outline btn--sm" 
             target="_blank" 
             rel="noopener">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 1C8.55228 1 9 1.44772 9 2V7H14C14.5523 7 15 7.44772 15 8C15 8.55228 14.5523 9 14 9H9V14C9 14.5523 8.55228 15 8 15C7.44772 15 7 14.5523 7 14V9H2C1.44772 9 1 8.55228 1 8C1 7.44772 1.44772 7 2 7H7V2C7 1.44772 7.44772 1 8 1Z" fill="currentColor"/>
            </svg>
            Direct Link
          </a>
        </div>
      </div>
      <div class="intakeq-widget-wrapper">
        <div id="intakeq" style="max-width: 720px; width: 100%; min-height: 400px;"></div>
      </div>
    `;
  }

  loadIntakeQScript() {
    return new Promise((resolve, reject) => {
      // Remove existing script if present
      const existingScript = document.querySelector(
        'script[src*="intakeq.com"]',
      );
      if (existingScript) {
        existingScript.remove();
      }

      const script = document.createElement("script");
      script.type = "text/javascript";
      script.async = true;
      script.src = this.services.baseConfig.widgetUrl;

      script.onload = () => {
        // Wait a bit for IntakeQ to initialize
        setTimeout(resolve, 500);
      };

      script.onerror = () => {
        reject(new Error("Failed to load IntakeQ script"));
      };

      document.head.appendChild(script);
    });
  }

  cleanupExistingWidget() {
    // Clear any existing IntakeQ widgets
    const existingWidgets = document.querySelectorAll("#intakeq");
    existingWidgets.forEach((widget) => {
      widget.innerHTML = "";
    });

    // Clear IntakeQ globals
    if (window.intakeq) {
      delete window.intakeq;
    }
    if (window.intakeqServiceId) {
      delete window.intakeqServiceId;
    }
  }

  showLoadingState(container) {
    container.innerHTML = `
      <div class="intakeq-loading">
        <div class="intakeq-loading-spinner">
          <div class="spinner"></div>
        </div>
        <p class="intakeq-loading-text">Loading booking widget...</p>
      </div>
    `;
    container.classList.add("intakeq-widget--loading");
  }

  showErrorState(container, message) {
    container.innerHTML = `
      <div class="intakeq-error">
        <div class="intakeq-error-icon">⚠️</div>
        <h4 class="intakeq-error-title">Booking Widget Error</h4>
        <p class="intakeq-error-message">${message}</p>
        <button class="btn btn--outline btn--sm intakeq-retry-btn">
          Try Again
        </button>
      </div>
    `;

    container.classList.add("intakeq-widget--error");

    // Add retry functionality
    const retryBtn = container.querySelector(".intakeq-retry-btn");
    retryBtn?.addEventListener("click", () => {
      container.classList.remove("intakeq-widget--error");
      this.loadWidget(container);
    });
  }

  // Public API methods
  openServiceBooking(serviceKey) {
    const service = this.services.services[serviceKey];
    if (!service) {
      console.error(`Service not found: ${serviceKey}`);
      return;
    }

    // Open booking in new tab
    const bookingUrl = this.services.getBookingUrl(serviceKey);
    window.open(bookingUrl, "_blank", "noopener,noreferrer");

    // Track analytics
    this.trackBookingClick(serviceKey);
  }

  createServiceWidget(serviceKey, container) {
    if (!container) {
      console.error("Container element required");
      return;
    }

    container.className = "intakeq-widget-container";
    container.setAttribute("data-service", serviceKey);

    this.initializeWidgetContainer(container);
  }

  getServiceInfo(serviceKey) {
    return this.services.services[serviceKey] || null;
  }

  getAllServices() {
    return this.services.services;
  }

  getServicesByCategory(category) {
    return this.services.getServicesByCategory(category);
  }

  // Analytics tracking
  trackWidgetLoad(serviceKey) {
    if (window.gtag) {
      window.gtag("event", "widget_load", {
        event_category: "Booking",
        event_label: serviceKey,
        value: 1,
      });
    }
  }

  trackBookingClick(serviceKey) {
    if (window.gtag) {
      window.gtag("event", "booking_click", {
        event_category: "Booking",
        event_label: serviceKey,
        value: 1,
      });
    }
  }

  // Utility methods
  formatPrice(price) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(price);
  }

  generateServiceSlug(serviceName) {
    return serviceName
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }
}

// Auto-initialize when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    window.intakeQWidgetManager = new IntakeQWidgetManager();
  });
} else {
  window.intakeQWidgetManager = new IntakeQWidgetManager();
}

// Export for module systems
if (typeof module !== "undefined" && module.exports) {
  module.exports = IntakeQWidgetManager;
}
