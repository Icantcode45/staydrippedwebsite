/**
 * IntakeQ Category-Based Booking System for Stay Dripped Mobile IV
 * Handles specific category widgets for each service type
 */

import { ValidationUtils } from "../utilities/validation.js";

class IntakeQCategoryBooking {
  constructor() {
    this.accountId = "68460f36bc104b6aa9da43e0";
    this.baseUrl = "https://Staydripped.intakeq.com/booking";
    this.scriptLoaded = false;
    this.widgets = new Map();

    // Individual service configurations
    this.services = {
      "rehydrate-iv": {
        id: "73e00621-4069-486a-9fa8-a5a94a089618",
        name: "Rehydrate IV Drip",
        containerId: "intakeq-rehydrate-iv",
        icon: "💧",
        description: "Basic hydration and electrolyte replenishment",
      },
      "rehydrate-plus-iv": {
        id: "ae66ce7c-fa68-408c-9ab0-a04b287f6b31",
        name: "Rehydrate Plus IV Drip",
        containerId: "intakeq-rehydrate-plus-iv",
        icon: "💧",
        description: "Enhanced hydration with added vitamins",
      },
      "jr-myers-iv": {
        id: "065ab682-3334-403a-9635-ea461e520a6d",
        name: "Jr. Myers' Cocktail IV Drip",
        containerId: "intakeq-jr-myers-iv",
        icon: "🌟",
        description: "Gentle vitamin and mineral infusion",
      },
      "myers-iv": {
        id: "c13f904a-a8d0-43b1-bd5f-570387ee77d6",
        name: "Myers' Cocktail IV Drip",
        containerId: "intakeq-myers-iv",
        icon: "🌟",
        description: "Classic vitamin and mineral IV therapy",
      },
      "mega-myers-iv": {
        id: "e14cdb17-a9d1-47cb-90e1-d3050059bcf3",
        name: "Mega Myers' Cocktail IV Drip",
        containerId: "intakeq-mega-myers-iv",
        icon: "⚡",
        description: "High-dose vitamin and mineral infusion",
      },
      "hangover-iv": {
        id: "a7d83ea1-cf5e-4865-923e-bfe2232de898",
        name: "The Day After Hangover Relief IV Drip",
        containerId: "intakeq-hangover-iv",
        icon: "🍃",
        description: "Fast hangover relief and recovery",
      },
      "gold-hydration-iv": {
        id: "3519d39a-31ac-4944-80c9-4eb667a13df4",
        name: 'The "Gold" Ultimate Hydration & Recovery IV Drip',
        containerId: "intakeq-gold-hydration-iv",
        icon: "🥇",
        description: "Premium hydration and recovery formula",
      },
      "platinum-hydration-iv": {
        id: "0c0c56b7-85a4-4e01-9b9c-180bc714fa94",
        name: 'The "Platinum" Ultimate Hydration & Recovery IV Drip',
        containerId: "intakeq-platinum-hydration-iv",
        icon: "👑",
        description: "Ultimate luxury hydration experience",
      },
      "arizona-detox-iv": {
        id: "3fb4cbbb-5e12-447c-a236-869573ef730f",
        name: 'The "Arizona" Detox & Cleanse IV Drip',
        containerId: "intakeq-arizona-detox-iv",
        icon: "🌵",
        description: "Comprehensive detox and cleanse therapy",
      },
      "basic-nad-iv": {
        id: "7c8dcca4-35b4-44bd-a242-d1fdc722ddb5",
        name: "The Basic NAD+ IV Drip",
        containerId: "intakeq-basic-nad-iv",
        icon: "🧬",
        description: "Anti-aging and cellular repair therapy",
      },
      "shot-pass-membership": {
        id: "08549cfc-d53e-4841-9366-d63b9c22251a",
        name: "Monthly Membership: Shot Pass",
        containerId: "intakeq-shot-pass-membership",
        icon: "🎫",
        description: "Monthly vitamin shot subscription",
      },
      "wellness-explorer-membership": {
        id: "d7b705fd-04b7-4b2e-bda7-950417d6007d",
        name: "Monthly Membership: Wellness Explorer",
        containerId: "intakeq-wellness-explorer-membership",
        icon: "🌟",
        description: "Entry-level wellness membership",
      },
      "wellness-elite-membership": {
        id: "1421a50e-d0d0-475f-8713-74b0245bc83f",
        name: "Monthly Membership: Wellness Elite",
        containerId: "intakeq-wellness-elite-membership",
        icon: "⭐",
        description: "Premium wellness membership",
      },
      "wellness-platinum-membership": {
        id: "23cd9dbe-9135-42eb-9d37-9281cffda0f8",
        name: "Monthly Membership: Wellness Platinum",
        containerId: "intakeq-wellness-platinum-membership",
        icon: "👑",
        description: "Luxury platinum membership",
      },
      "b12-power-pack": {
        id: "e7c6a722-e621-46d7-8f96-af2f96848dc4",
        name: "Bundle Package: B12 Power Pack",
        containerId: "intakeq-b12-power-pack",
        icon: "⚡",
        description: "Multi-session B12 energy bundle",
      },
      "wellness-shot-bundle": {
        id: "1b14cb7a-8e18-44b3-99a1-ecd3b516e8a6",
        name: "Bundle Package: Wellness Shot Bundle",
        containerId: "intakeq-wellness-shot-bundle",
        icon: "💉",
        description: "Comprehensive vitamin shot package",
      },
      "b12-shot": {
        id: "c14d40af-977b-4f6e-9db8-d24c9ad3a35d",
        name: "B12 Energy Shot",
        containerId: "intakeq-b12-shot",
        icon: "🚀",
        description: "Quick B12 energy boost injection",
      },
    };

    this.init();
  }

  async init() {
    try {
      await this.loadIntakeQScript();
      this.initializeWidgets();
      this.addStyles();
    } catch (error) {
      console.error("Error initializing IntakeQ booking system:", error);
      this.initializeFallbackButtons();
    }
  }

  async loadIntakeQScript() {
    if (this.scriptLoaded || window.intakeq) {
      return Promise.resolve();
    }

    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = "https://intakeq.com/js/widget.min.js?1";
      script.async = true;
      script.onload = () => {
        this.scriptLoaded = true;
        // Set global configuration
        window.intakeq = this.accountId;
        resolve();
      };
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }

  initializeWidgets() {
    Object.keys(this.services).forEach((serviceKey) => {
      this.createServiceWidget(serviceKey);
    });
  }

  createServiceWidget(serviceKey) {
    const service = this.services[serviceKey];

    if (!ValidationUtils.isValidServiceConfig(service)) {
      console.error(`Invalid service configuration for ${serviceKey}`);
      return;
    }

    const container = document.getElementById(service.containerId);
    if (!ValidationUtils.isElementValid(container)) {
      console.warn(`Container not found for service: ${serviceKey}`);
      return;
    }

    try {
      this.renderServiceWidget(container, service, serviceKey);
    } catch (error) {
      this.handleWidgetError(error, container, service);
    }
  }

  renderServiceWidget(container, service, serviceKey) {
    const widgetContainer = this.buildWidgetContainer(service, serviceKey);
    this.setupWidget(container, widgetContainer, serviceKey, service);
  }

  handleWidgetError(error, container, service) {
    console.error(`Error creating widget for ${service.name}:`, error);
    this.createFallbackButton(container, service);
  }

  buildWidgetContainer(service, serviceKey) {
    const widgetContainer = document.createElement("div");
    widgetContainer.className = "intakeq-service-widget";
    widgetContainer.innerHTML = `
      <div class="widget-header">
        <span class="widget-icon">${service.icon}</span>
        <h3 class="widget-title">${service.name}</h3>
        <p class="widget-description">${service.description}</p>
      </div>
      <div class="widget-content">
        <div id="intakeq-widget-${serviceKey}" class="intakeq-embed"></div>
      </div>
      <div class="widget-fallback">
        <button class="book-now-btn" data-service="${serviceKey}">
          <i class="fas fa-calendar-plus"></i>
          Book Now
        </button>
      </div>
    `;
    return widgetContainer;
  }

  setupWidget(container, widgetContainer, serviceKey, service) {
    this.renderWidgetContainer(container, widgetContainer);
    this.configureWidget(container, serviceKey, service);
  }

  renderWidgetContainer(container, widgetContainer) {
    container.innerHTML = "";
    container.appendChild(widgetContainer);
  }

  configureWidget(container, serviceKey, service) {
    this.initializeEmbeddedWidget(serviceKey);
    this.addBookingHandler(container, serviceKey);
    this.storeWidgetReference(serviceKey, container, service);
  }

  addBookingHandler(container, serviceKey) {
    const bookButton = container.querySelector(".book-now-btn");
    if (bookButton) {
      bookButton.addEventListener("click", () => {
        this.openBookingForService(serviceKey);
      });
    }
  }

  storeWidgetReference(serviceKey, container, service) {
    this.widgets.set(serviceKey, {
      container: container,
      service: service,
      initialized: true,
    });
  }

  initializeEmbeddedWidget(serviceKey) {
    const service = this.services[serviceKey];
    const embedContainer = document.getElementById(
      `intakeq-widget-${serviceKey}`,
    );

    if (!embedContainer) return;

    try {
      this.setServiceConfiguration(service.id);
      this.createEmbeddedScript(serviceKey, service.id);
    } catch (error) {
      this.renderWidgetError(error, embedContainer, serviceKey);
    }
  }

  setServiceConfiguration(serviceId) {
    window.intakeqServiceId = serviceId;
  }

  createEmbeddedScript(serviceKey, serviceId) {
    const widgetScript = document.createElement("script");
    widgetScript.innerHTML = this.generateWidgetScript(serviceKey, serviceId);
    document.head.appendChild(widgetScript);
  }

  generateWidgetScript(serviceKey, serviceId) {
    return `
      (function(c) {
        var containerId = 'intakeq-widget-${serviceKey}';
        var container = document.getElementById(containerId);
        if (container && window.intakeq) {
          window.intakeqServiceId = '${serviceId}';
          var widgetDiv = document.createElement('div');
          widgetDiv.id = 'intakeq-${serviceKey}';
          widgetDiv.style.maxWidth = '100%';
          widgetDiv.style.width = '100%';
          widgetDiv.style.minHeight = '400px';
          container.appendChild(widgetDiv);
        }
      })(document);
    `;
  }

  renderWidgetError(error, embedContainer, serviceKey) {
    console.error(
      `Error initializing embedded widget for ${serviceKey}:`,
      error,
    );
    embedContainer.innerHTML = `
      <div class="widget-error">
        <p>Widget temporarily unavailable</p>
        <button class="book-now-btn" data-service="${serviceKey}">
          Book Now
        </button>
      </div>
    `;
  }

  openBookingForService(serviceKey) {
    const service = this.services[serviceKey];
    if (!service) return;

    try {
      // Set the global service ID
      window.intakeqServiceId = service.id;

      // Try to use the IntakeQ widget API
      if (window.IntakeQ && typeof window.IntakeQ.open === "function") {
        window.IntakeQ.open();
      } else {
        // Fallback to direct URL
        this.openDirectBookingUrl(serviceKey);
      }
    } catch (error) {
      console.error("Error opening IntakeQ widget:", error);
      this.openDirectBookingUrl(serviceKey);
    }
  }

  openDirectBookingUrl(serviceKey) {
    const service = this.services[serviceKey];
    const url = `${this.baseUrl}?serviceId=${service.id}`;
    window.open(url, "_blank", "noopener,noreferrer");
  }

  createFallbackButton(container, service) {
    const fallbackHtml = `
      <div class="intakeq-fallback">
        <div class="fallback-header">
          <span class="fallback-icon">${service.icon}</span>
          <h3>${service.name}</h3>
          <p>${service.description}</p>
        </div>
        <button class="fallback-book-btn" onclick="window.IntakeQBooking.openDirectBookingUrl('${container.id.replace("intakeq-", "")}')">
          <i class="fas fa-calendar-plus"></i>
          Book Now
        </button>
      </div>
    `;
    container.innerHTML = fallbackHtml;
  }

  initializeFallbackButtons() {
    Object.keys(this.services).forEach((serviceKey) => {
      const service = this.services[serviceKey];
      const container = document.getElementById(service.containerId);
      if (container) {
        this.createFallbackButton(container, service);
      }
    });
  }

  addStyles() {
    const styles = `
      .intakeq-service-widget {
        background: #fff;
        border-radius: 16px;
        box-shadow: 0 4px 24px rgba(0, 0, 0, 0.1);
        overflow: hidden;
        margin-bottom: 2rem;
      }

      .widget-header {
        background: linear-gradient(135deg, #00e5ff 0%, #0099cc 100%);
        color: white;
        padding: 2rem;
        text-align: center;
      }

      .widget-icon {
        font-size: 3rem;
        display: block;
        margin-bottom: 1rem;
      }

      .widget-title {
        font-size: 1.5rem;
        font-weight: 700;
        margin: 0 0 0.5rem 0;
      }

      .widget-description {
        margin: 0;
        opacity: 0.9;
        font-size: 1rem;
      }

      .widget-content {
        padding: 2rem;
      }

      .intakeq-embed {
        min-height: 400px;
        border-radius: 12px;
        overflow: hidden;
      }

      .widget-fallback {
        padding: 1rem 2rem 2rem;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        align-items: center;
      }

      .book-now-btn, .fallback-book-btn {
        background: linear-gradient(135deg, #00e5ff 0%, #0099cc 100%);
        color: white;
        border: none;
        border-radius: 50px;
        padding: 1rem 2rem;
        font-size: 1.1rem;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
        text-decoration: none;
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        min-width: 200px;
        justify-content: center;
      }

      .book-now-btn:hover, .fallback-book-btn:hover {
        background: linear-gradient(135deg, #00ffa6 0%, #00cc99 100%);
        transform: translateY(-2px);
        box-shadow: 0 8px 25px rgba(0, 229, 255, 0.4);
        text-decoration: none;
        color: white;
      }

      .fallback-link {
        color: #666;
        text-decoration: none;
        font-size: 0.9rem;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        transition: color 0.3s ease;
      }

      .fallback-link:hover {
        color: #00e5ff;
        text-decoration: none;
      }

      .intakeq-fallback {
        background: #f8fafc;
        border-radius: 16px;
        padding: 2rem;
        text-align: center;
        margin-bottom: 2rem;
      }

      .fallback-header {
        margin-bottom: 2rem;
      }

      .fallback-icon {
        font-size: 3rem;
        display: block;
        margin-bottom: 1rem;
      }

      .fallback-header h3 {
        color: #333;
        font-size: 1.5rem;
        margin: 0 0 0.5rem 0;
      }

      .fallback-header p {
        color: #666;
        margin: 0;
      }

      .widget-error {
        background: #fef2f2;
        border: 1px solid #fecaca;
        border-radius: 12px;
        padding: 2rem;
        text-align: center;
      }

      .widget-error p {
        color: #dc2626;
        margin: 0 0 1rem 0;
      }

      @media (max-width: 768px) {
        .widget-header {
          padding: 1.5rem;
        }

        .widget-content {
          padding: 1rem;
        }

        .widget-fallback {
          padding: 1rem;
        }

        .intakeq-fallback {
          padding: 1.5rem;
        }

        .book-now-btn, .fallback-book-btn {
          width: 100%;
          min-width: auto;
        }
      }
    `;

    const styleSheet = document.createElement("style");
    styleSheet.textContent = styles;
    document.head.appendChild(styleSheet);
  }

  // Public methods for manual widget creation
  createBookingWidget(serviceKey, containerId) {
    if (!this.services[serviceKey]) {
      console.error(`Service ${serviceKey} not found`);
      return;
    }

    const service = this.services[serviceKey];
    service.containerId = containerId;
    this.createServiceWidget(serviceKey);
  }

  getBookingUrl(serviceKey) {
    const service = this.services[serviceKey];
    return service ? `${this.baseUrl}?serviceId=${service.id}` : null;
  }

  getAllServices() {
    return Object.keys(this.services).map((key) => ({
      key,
      ...this.services[key],
    }));
  }
}

// Initialize when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  window.IntakeQBooking = new IntakeQCategoryBooking();
});

// Export for module usage
if (typeof module !== "undefined" && module.exports) {
  module.exports = IntakeQCategoryBooking;
}
