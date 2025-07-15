/**
 * Premium IntakeQ Widget Manager - Security Enhanced
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

    // Safely load services data if not available
    try {
      // Use dynamic import instead of eval() for security
      const module = await import("/assets/js/services-data.js");
      this.services = window.STAY_DRIPPED_SERVICES;
    } catch (error) {
      // Fallback to script tag method
      try {
        await this.loadServicesScript();
        this.services = window.STAY_DRIPPED_SERVICES;
      } catch (fallbackError) {
        console.error("Failed to load services data:", fallbackError);
        throw fallbackError;
      }
    }
  }

  loadServicesScript() {
    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = "/assets/js/services-data.js";
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }

  setupEventListeners() {
    // Listen for booking button clicks
    document.addEventListener("click", (e) => {
      const bookingBtn = e.target.closest("[data-service-booking]");
      if (bookingBtn && this.initialized) {
        e.preventDefault();
        const serviceId = bookingBtn.dataset.serviceBooking;
        this.loadWidget(bookingBtn.closest(".intakeq-widget-container"));
      }
    });

    // Listen for intersection observer events
    this.setupIntersectionObserver();
  }

  setupIntersectionObserver() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "50px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const container = entry.target;
          const serviceId = container.dataset.serviceId;
          if (serviceId && !this.loadedWidgets.has(serviceId)) {
            // Lazy load widget when it comes into view
            setTimeout(() => this.loadWidget(container), 100);
          }
        }
      });
    }, observerOptions);

    // Observe all widget containers
    document
      .querySelectorAll(".intakeq-widget-container")
      .forEach((container) => {
        observer.observe(container);
      });
  }

  initializeExistingWidgets() {
    // Find existing widgets on the page and prepare them
    const containers = document.querySelectorAll(".intakeq-widget-container");
    containers.forEach((container) => {
      const serviceId = container.dataset.serviceId;
      if (serviceId) {
        this.showLoadingState(container);
      }
    });
  }

  async loadWidget(container) {
    if (!container || !this.services) return;

    const serviceId = container.dataset.serviceId;
    if (!serviceId) return;

    const service = this.services.services[serviceId];
    if (!service) {
      this.showErrorState(container, "Service not found");
      return;
    }

    // Check if widget is already loaded
    const widgetData = this.loadedWidgets.get(serviceId) || {
      service,
      loaded: false,
      container,
    };

    if (widgetData.loaded) {
      // Widget already loaded, just show it
      container.classList.add("intakeq-widget--loaded");
      return;
    }

    // Show loading state
    this.showLoadingState(container);

    try {
      // Clean up any existing IntakeQ instances
      this.cleanupExistingWidget();

      // Set IntakeQ configuration
      window.intakeq = this.services.baseConfig.accountId;
      window.intakeqServiceId = widgetData.service.id;

      // Create widget element safely using DOM methods
      const widgetElement = this.createWidgetElement(widgetData.service);
      container.replaceChildren(widgetElement);

      // Load IntakeQ script
      await this.loadIntakeQScript();

      // Mark as loaded
      widgetData.loaded = true;
      this.activeWidget = container;
      this.loadedWidgets.set(serviceId, widgetData);

      // Add loaded class
      container.classList.remove("intakeq-widget--loading");
      container.classList.add("intakeq-widget--loaded");

      console.log(`IntakeQ widget loaded for service: ${service.name}`);
    } catch (error) {
      console.error("Failed to load IntakeQ widget:", error);
      this.showErrorState(
        container,
        "Failed to load booking widget. Please try again.",
      );
    }
  }

  createWidgetElement(service) {
    // Create widget container
    const container = document.createElement("div");

    // Create header
    const header = document.createElement("div");
    header.className = "intakeq-service-header";

    // Create service info
    const serviceInfo = document.createElement("div");
    serviceInfo.className = "intakeq-service-info";

    const title = document.createElement("h3");
    title.className = "intakeq-service-title";
    title.textContent = service.name;

    const description = document.createElement("p");
    description.className = "intakeq-service-description";
    description.textContent = service.description;

    const details = document.createElement("div");
    details.className = "intakeq-service-details";

    const price = document.createElement("span");
    price.className = "intakeq-service-price";
    price.textContent = `Starting at $${service.price}`;

    const duration = document.createElement("span");
    duration.className = "intakeq-service-duration";
    duration.textContent = service.duration;

    details.appendChild(price);
    details.appendChild(duration);

    serviceInfo.appendChild(title);
    serviceInfo.appendChild(description);
    serviceInfo.appendChild(details);

    // Create actions
    const actions = document.createElement("div");
    actions.className = "intakeq-service-actions";

    const link = document.createElement("a");
    const serviceKey = Object.keys(this.services.services).find(
      (key) => this.services.services[key] === service,
    );
    link.href = this.services.getBookingUrl(serviceKey);
    link.className = "btn btn--outline btn--sm";
    link.target = "_blank";
    link.rel = "noopener";

    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("width", "16");
    svg.setAttribute("height", "16");
    svg.setAttribute("viewBox", "0 0 16 16");
    svg.setAttribute("fill", "none");

    // Create SVG path element safely
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute(
      "d",
      "M8 1C8.55228 1 9 1.44772 9 2V7H14C14.5523 7 15 7.44772 15 8C15 8.55228 14.5523 9 14 9H9V14C9 14.5523 8.55228 15 8 15C7.44772 15 7 14.5523 7 14V9H2C1.44772 9 1 8.55228 1 8C1 7.44772 1.44772 7 2 7H7V2C7 1.44772 7.44772 1 8 1Z",
    );
    path.setAttribute("fill", "currentColor");
    svg.appendChild(path);

    link.appendChild(svg);
    link.appendChild(document.createTextNode(" Direct Link"));

    actions.appendChild(link);

    header.appendChild(serviceInfo);
    header.appendChild(actions);

    // Create widget wrapper
    const wrapper = document.createElement("div");
    wrapper.className = "intakeq-widget-wrapper";

    const widgetDiv = document.createElement("div");
    widgetDiv.id = "intakeq";
    widgetDiv.style.maxWidth = "720px";
    widgetDiv.style.width = "100%";
    widgetDiv.style.minHeight = "400px";

    wrapper.appendChild(widgetDiv);

    container.appendChild(header);
    container.appendChild(wrapper);

    return container;
  }

  cleanupExistingWidget() {
    // Clear any existing IntakeQ widgets
    const existingWidgets = document.querySelectorAll("#intakeq");
    existingWidgets.forEach((widget) => {
      // Use safe DOM manipulation
      widget.replaceChildren();
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
    // Use safe DOM creation instead of innerHTML
    container.replaceChildren();

    const loadingDiv = document.createElement("div");
    loadingDiv.className = "intakeq-loading";

    const spinnerContainer = document.createElement("div");
    spinnerContainer.className = "intakeq-loading-spinner";

    const spinner = document.createElement("div");
    spinner.className = "spinner";

    const loadingText = document.createElement("p");
    loadingText.className = "intakeq-loading-text";
    loadingText.textContent = "Loading booking widget...";

    spinnerContainer.appendChild(spinner);
    loadingDiv.appendChild(spinnerContainer);
    loadingDiv.appendChild(loadingText);
    container.appendChild(loadingDiv);
    container.classList.add("intakeq-widget--loading");
  }

  showErrorState(container, message) {
    // Use safe DOM creation instead of innerHTML
    container.replaceChildren();

    const errorDiv = document.createElement("div");
    errorDiv.className = "intakeq-error";

    const errorIcon = document.createElement("div");
    errorIcon.className = "intakeq-error-icon";
    errorIcon.textContent = "⚠️";

    const errorTitle = document.createElement("h4");
    errorTitle.className = "intakeq-error-title";
    errorTitle.textContent = "Booking Widget Error";

    const errorMessage = document.createElement("p");
    errorMessage.className = "intakeq-error-message";
    errorMessage.textContent = message; // Safe text content instead of innerHTML

    const retryBtn = document.createElement("button");
    retryBtn.className = "btn btn--outline btn--sm intakeq-retry-btn";
    retryBtn.textContent = "Try Again";

    errorDiv.appendChild(errorIcon);
    errorDiv.appendChild(errorTitle);
    errorDiv.appendChild(errorMessage);
    errorDiv.appendChild(retryBtn);
    container.appendChild(errorDiv);

    container.classList.add("intakeq-widget--error");

    // Add retry functionality
    retryBtn.addEventListener("click", () => {
      container.classList.remove("intakeq-widget--error");
      this.loadWidget(container);
    });
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
        // Allow time for IntakeQ to initialize
        setTimeout(resolve, 500);
      };
      script.onerror = reject;

      document.head.appendChild(script);
    });
  }

  // Analytics tracking
  trackWidgetLoad(service) {
    if (typeof gtag !== "undefined") {
      gtag("event", "widget_load", {
        event_category: "intakeq",
        event_label: service.name,
        service_id: service.id,
      });
    }
  }

  trackBookingAttempt(service) {
    if (typeof gtag !== "undefined") {
      gtag("event", "booking_attempt", {
        event_category: "intakeq",
        event_label: service.name,
        service_id: service.id,
        value: service.price,
      });
    }
  }
}

// Initialize the widget manager when DOM is ready
if (typeof window !== "undefined") {
  document.addEventListener("DOMContentLoaded", () => {
    window.intakeQManager = new IntakeQWidgetManager();
  });
}

export default IntakeQWidgetManager;
