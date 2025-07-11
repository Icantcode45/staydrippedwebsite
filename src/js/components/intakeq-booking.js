/**
 * IntakeQ Category-Based Booking System for Stay Dripped Mobile IV
 * Handles specific category widgets for each service type
 */

import { ValidationUtils } from '../utilities/validation.js';

const SERVICE_CONFIGS = {
  'rehydrate-iv': {
    id: '73e00621-4069-486a-9fa8-a5a94a089618',
    name: 'Rehydrate IV Drip',
    containerId: 'intakeq-rehydrate-iv',
    icon: '💧',
    description: 'Basic hydration and electrolyte replenishment',
  },
  'rehydrate-plus-iv': {
    id: 'ae66ce7c-fa68-408c-9ab0-a04b287f6b31',
    name: 'Rehydrate Plus IV Drip',
    containerId: 'intakeq-rehydrate-plus-iv',
    icon: '💧',
    description: 'Enhanced hydration with added vitamins',
  },
  'jr-myers-iv': {
    id: '065ab682-3334-403a-9635-ea461e520a6d',
    name: 'Jr. Myers\' Cocktail IV Drip',
    containerId: 'intakeq-jr-myers-iv',
    icon: '🌟',
    description: 'Gentle vitamin and mineral infusion',
  },
  'myers-iv': {
    id: 'c13f904a-a8d0-43b1-bd5f-570387ee77d6',
    name: 'Myers\' Cocktail IV Drip',
    containerId: 'intakeq-myers-iv',
    icon: '🌟',
    description: 'Classic vitamin and mineral IV therapy',
  },
  'mega-myers-iv': {
    id: 'e14cdb17-a9d1-47cb-90e1-d3050059bcf3',
    name: 'Mega Myers\' Cocktail IV Drip',
    containerId: 'intakeq-mega-myers-iv',
    icon: '⚡',
    description: 'High-dose vitamin and mineral infusion',
  },
  'hangover-iv': {
    id: 'a7d83ea1-cf5e-4865-923e-bfe2232de898',
    name: 'The Day After Hangover Relief IV Drip',
    containerId: 'intakeq-hangover-iv',
    icon: '🍃',
    description: 'Fast hangover relief and recovery',
  },
  'gold-hydration-iv': {
    id: '3519d39a-31ac-4944-80c9-4eb667a13df4',
    name: 'The "Gold" Ultimate Hydration & Recovery IV Drip',
    containerId: 'intakeq-gold-hydration-iv',
    icon: '🥇',
    description: 'Premium hydration and recovery formula',
  },
  'platinum-hydration-iv': {
    id: '0c0c56b7-85a4-4e01-9b9c-180bc714fa94',
    name: 'The "Platinum" Ultimate Hydration & Recovery IV Drip',
    containerId: 'intakeq-platinum-hydration-iv',
    icon: '👑',
    description: 'Ultimate luxury hydration experience',
  },
  'arizona-detox-iv': {
    id: '3fb4cbbb-5e12-447c-a236-869573ef730f',
    name: 'The "Arizona" Detox & Cleanse IV Drip',
    containerId: 'intakeq-arizona-detox-iv',
    icon: '🌵',
    description: 'Comprehensive detox and cleanse therapy',
  },
  'basic-nad-iv': {
    id: '7c8dcca4-35b4-44bd-a242-d1fdc722ddb5',
    name: 'The Basic NAD+ IV Drip',
    containerId: 'intakeq-basic-nad-iv',
    icon: '🧬',
    description: 'Anti-aging and cellular repair therapy',
  },
  'shot-pass-membership': {
    id: '08549cfc-d53e-4841-9366-d63b9c22251a',
    name: 'Monthly Membership: Shot Pass',
    containerId: 'intakeq-shot-pass-membership',
    icon: '🎫',
    description: 'Monthly vitamin shot subscription',
  },
  'wellness-explorer-membership': {
    id: 'd7b705fd-04b7-4b2e-bda7-950417d6007d',
    name: 'Monthly Membership: Wellness Explorer',
    containerId: 'intakeq-wellness-explorer-membership',
    icon: '🌟',
    description: 'Entry-level wellness membership',
  },
  'wellness-elite-membership': {
    id: '1421a50e-d0d0-475f-8713-74b0245bc83f',
    name: 'Monthly Membership: Wellness Elite',
    containerId: 'intakeq-wellness-elite-membership',
    icon: '⭐',
    description: 'Premium wellness membership',
  },
  'wellness-platinum-membership': {
    id: '23cd9dbe-9135-42eb-9d37-9281cffda0f8',
    name: 'Monthly Membership: Wellness Platinum',
    containerId: 'intakeq-wellness-platinum-membership',
    icon: '👑',
    description: 'Luxury platinum membership',
  },
  'b12-power-pack': {
    id: 'e7c6a722-e621-46d7-8f96-af2f96848dc4',
    name: 'Bundle Package: B12 Power Pack',
    containerId: 'intakeq-b12-power-pack',
    icon: '⚡',
    description: 'Multi-session B12 energy bundle',
  },
  'wellness-shot-bundle': {
    id: '1b14cb7a-8e18-44b3-99a1-ecd3b516e8a6',
    name: 'Bundle Package: Wellness Shot Bundle',
    containerId: 'intakeq-wellness-shot-bundle',
    icon: '💉',
    description: 'Comprehensive vitamin shot package',
  },
  'b12-shot': {
    id: 'c14d40af-977b-4f6e-9db8-d24c9ad3a35d',
    name: 'B12 Energy Shot',
    containerId: 'intakeq-b12-shot',
    icon: '🚀',
    description: 'Quick B12 energy boost injection',
  },
};

class IntakeQCategoryBooking {
  constructor() {
    this.accountId = '68460f36bc104b6aa9da43e0';
    this.baseUrl = 'https://Staydripped.intakeq.com/booking';
    this.scriptLoaded = false;
    this.widgets = new Map();
    this.services = this.getServiceConfigurations();

    this.init();
  }

  getServiceConfigurations() {
    return SERVICE_CONFIGS;
  }

  async init() {
    try {
      await this.loadIntakeQScript();
      this.initializeWidgets();
      this.addStyles();
    } catch (error) {
      // Log sanitized error message to prevent information disclosure
      console.error('Error initializing IntakeQ booking system');
      this.initializeFallbackButtons();
    }
  }

  async loadIntakeQScript() {
    if (this.scriptLoaded || window.intakeq) {
      return Promise.resolve();
    }

    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = 'https://intakeq.com/js/widget.min.js?1';
      script.async = true;
      script.onload = () => {
        this.scriptLoaded = true;
        // Set global configuration
        window.intakeq = this.accountId;
        resolve();
      };
      script.onerror = () => {
        // Reject with sanitized error to prevent information disclosure
        reject(new Error('Script loading failed'));
      };
      document.head.appendChild(script);
    });
  }

  initializeWidgets() {
    Object.keys(this.services).forEach((serviceKey) => {
      this.createServiceWidget(serviceKey);
    });
  }

  createServiceWidget(serviceKey) {
    const service = this.getService(serviceKey);

    if (!ValidationUtils.isValidServiceConfig(service)) {
      console.error('Invalid service configuration');
      return;
    }

    const container = document.getElementById(service.containerId);
    if (!ValidationUtils.isElementValid(container)) {
      console.warn('Container not found for service');
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
    // Log sanitized error message to prevent information disclosure
    console.error('Error creating widget');
    this.createFallbackButton(container, service);
  }

  buildWidgetContainer(service, serviceKey) {
    const container = document.createElement('div');
    container.className = 'intakeq-service-widget';

    const header = this.createWidgetHeader(service);
    const content = this.createWidgetContent(serviceKey);
    const fallback = this.createWidgetFallback(serviceKey);

    container.appendChild(header);
    container.appendChild(content);
    container.appendChild(fallback);

    return container;
  }

  createWidgetHeader(service) {
    const header = document.createElement('div');
    header.className = 'widget-header';

    const icon = document.createElement('span');
    icon.className = 'widget-icon';
    icon.textContent = service.icon;

    const title = document.createElement('h3');
    title.className = 'widget-title';
    title.textContent = service.name;

    const description = document.createElement('p');
    description.className = 'widget-description';
    description.textContent = service.description;

    header.appendChild(icon);
    header.appendChild(title);
    header.appendChild(description);

    return header;
  }

  createWidgetContent(serviceKey) {
    const content = document.createElement('div');
    content.className = 'widget-content';

    const embed = document.createElement('div');
    embed.id = `intakeq-widget-${serviceKey}`;
    embed.className = 'intakeq-embed';

    content.appendChild(embed);
    return content;
  }

  createWidgetFallback(serviceKey) {
    const fallback = document.createElement('div');
    fallback.className = 'widget-fallback';

    const button = document.createElement('button');
    button.className = 'book-now-btn';
    button.dataset.service = serviceKey;

    const icon = document.createElement('i');
    icon.className = 'fas fa-calendar-plus';

    button.appendChild(icon);
    button.appendChild(document.createTextNode(' Book Now'));
    fallback.appendChild(button);

    return fallback;
  }

  setupWidget(container, widgetContainer, serviceKey, service) {
    this.renderWidgetContainer(container, widgetContainer);
    this.configureWidget(container, serviceKey, service);
  }

  renderWidgetContainer(container, widgetContainer) {
    // Clear container safely with loop protection
    let attempts = 0;
    const maxAttempts = 100; // Prevent infinite loops
    while (container.firstChild && attempts < maxAttempts) {
      container.removeChild(container.firstChild);
      attempts++;
    }
    container.appendChild(widgetContainer);
  }

  configureWidget(container, serviceKey, service) {
    this.initializeEmbeddedWidget(serviceKey);
    this.addBookingHandler(container, serviceKey);
    this.storeWidgetReference(serviceKey, container, service);
  }

  addBookingHandler(container, serviceKey) {
    const bookButton = container.querySelector('.book-now-btn');
    if (bookButton) {
      bookButton.addEventListener('click', () =>
        this.openBookingForService(serviceKey),
      );
    }
  }

  storeWidgetReference(serviceKey, container, service) {
    this.widgets.set(serviceKey, { container, service, initialized: true });
  }

  initializeEmbeddedWidget(serviceKey) {
    const service = this.getService(serviceKey);

    // Sanitize serviceKey to prevent DOM clobbering
    const sanitizedKey = this.sanitizeScriptValue(serviceKey);
    if (!sanitizedKey) return;

    const embedContainer = document.getElementById(
      `intakeq-widget-${sanitizedKey}`,
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
    // Store service ID safely without polluting global namespace
    if (!window.intakeqConfig) {
      window.intakeqConfig = {};
    }
    window.intakeqConfig.serviceId = serviceId;
  }

  createEmbeddedScript(serviceKey, serviceId) {
    // Replace dynamic script generation with direct DOM manipulation for security
    this.initializeWidgetDOM(serviceKey, serviceId);
  }

  initializeWidgetDOM(serviceKey, serviceId) {
    // Sanitize inputs to prevent code injection
    const sanitizedServiceKey = this.sanitizeScriptValue(serviceKey);
    const sanitizedServiceId = this.sanitizeScriptValue(serviceId);

    if (!sanitizedServiceKey || !sanitizedServiceId) return;

    const containerId = `intakeq-widget-${sanitizedServiceKey}`;
    const container = document.getElementById(containerId);

    if (container && window.intakeq) {
      // Store service ID safely without polluting global namespace
      if (!window.intakeqConfig) {
        window.intakeqConfig = {};
      }
      window.intakeqConfig.serviceId = sanitizedServiceId;

      // Create widget div using DOM methods instead of script injection
      const widgetDiv = document.createElement('div');
      widgetDiv.id = `intakeq-${sanitizedServiceKey}`;
      widgetDiv.style.maxWidth = '100%';
      widgetDiv.style.width = '100%';
      widgetDiv.style.minHeight = '400px';

      // Clear container and append widget
      while (container.firstChild) {
        container.removeChild(container.firstChild);
      }
      container.appendChild(widgetDiv);
    }
  }

  sanitizeScriptValue(value) {
    if (typeof value !== 'string') return '';
    // Only allow alphanumeric characters, hyphens, and underscores
    return value.replace(/[^a-zA-Z0-9_-]/g, '');
  }

  getService(serviceKey) {
    // Safe object access to prevent prototype pollution
    if (
      typeof serviceKey !== 'string' ||
      !Object.prototype.hasOwnProperty.call(this.services, serviceKey)
    ) {
      return null;
    }
    return this.services[serviceKey];
  }

  renderWidgetError(error, embedContainer, serviceKey) {
    // Log sanitized error message to prevent information disclosure
    console.error('Error initializing embedded widget');

    const errorDiv = document.createElement('div');
    errorDiv.className = 'widget-error';

    const message = document.createElement('p');
    message.textContent = 'Widget temporarily unavailable';

    const button = document.createElement('button');
    button.className = 'book-now-btn';
    button.dataset.service = serviceKey;
    button.textContent = 'Book Now';

    errorDiv.appendChild(message);
    errorDiv.appendChild(button);

    // Clear container safely with loop protection
    let attempts = 0;
    const maxAttempts = 100; // Prevent infinite loops
    while (embedContainer.firstChild && attempts < maxAttempts) {
      embedContainer.removeChild(embedContainer.firstChild);
      attempts++;
    }
    embedContainer.appendChild(errorDiv);
  }

  openBookingForService(serviceKey) {
    const service = this.getService(serviceKey);
    if (!service) return;

    try {
      // Store service ID safely without polluting global namespace
      if (!window.intakeqConfig) {
        window.intakeqConfig = {};
      }
      window.intakeqConfig.serviceId = service.id;

      // Try to use the IntakeQ widget API
      if (window.IntakeQ && typeof window.IntakeQ.open === 'function') {
        window.IntakeQ.open();
      } else {
        // Fallback to direct URL
        this.openDirectBookingUrl(serviceKey);
      }
    } catch (error) {
      // Log sanitized error message to prevent information disclosure
      console.error('Error opening IntakeQ widget');
      this.openDirectBookingUrl(serviceKey);
    }
  }

  openDirectBookingUrl(serviceKey) {
    const service = this.getService(serviceKey);
    if (!service || !service.id) {
      console.error('Invalid service for booking');
      return;
    }

    const url = `${this.baseUrl}?serviceId=${service.id}`;
    if (!ValidationUtils.isValidURL(url)) {
      console.error('Invalid booking URL generated');
      return;
    }

    window.open(url, '_blank', 'noopener,noreferrer');
  }

  createFallbackButton(container, service) {
    const fallback = document.createElement('div');
    fallback.className = 'intakeq-fallback';

    const header = this.createFallbackHeader(service);
    const button = this.createFallbackBookButton(container);

    fallback.appendChild(header);
    fallback.appendChild(button);

    // Clear container safely with loop protection
    let attempts = 0;
    const maxAttempts = 100; // Prevent infinite loops
    while (container.firstChild && attempts < maxAttempts) {
      container.removeChild(container.firstChild);
      attempts++;
    }
    container.appendChild(fallback);
  }

  createFallbackHeader(service) {
    const header = document.createElement('div');
    header.className = 'fallback-header';

    const icon = document.createElement('span');
    icon.className = 'fallback-icon';
    icon.textContent = service.icon;

    const title = document.createElement('h3');
    title.textContent = service.name;

    const description = document.createElement('p');
    description.textContent = service.description;

    header.appendChild(icon);
    header.appendChild(title);
    header.appendChild(description);

    return header;
  }

  createFallbackBookButton(container) {
    const button = document.createElement('button');
    button.className = 'fallback-book-btn';

    const serviceKey = container.id.replace('intakeq-', '');
    button.addEventListener('click', () => {
      this.openDirectBookingUrl(serviceKey);
    });

    const icon = document.createElement('i');
    icon.className = 'fas fa-calendar-plus';

    button.appendChild(icon);
    button.appendChild(document.createTextNode(' Book Now'));

    return button;
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
    this.loadStylesheet('/assets/css/intakeq-widgets.css');
  }

  loadStylesheet(href) {
    // Validate href to prevent malicious stylesheet loading
    if (!ValidationUtils.isValidURL(href)) {
      console.error('Invalid stylesheet URL provided');
      return;
    }

    // Check if stylesheet already exists
    if (document.querySelector(`link[href="${CSS.escape(href)}"]`)) return;

    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;

    // Add security attributes
    link.crossOrigin = 'anonymous';
    link.referrerPolicy = 'no-referrer';

    document.head.appendChild(link);
  }

  // Public methods for manual widget creation
  createBookingWidget(serviceKey, containerId) {
    const service = this.getService(serviceKey);
    if (!service) {
      console.error('Service not found');
      return;
    }
    service.containerId = containerId;
    this.createServiceWidget(serviceKey);
  }

  getBookingUrl(serviceKey) {
    const service = this.getService(serviceKey);
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
document.addEventListener('DOMContentLoaded', () => {
  // Store IntakeQ booking safely without polluting global namespace
  if (!window.stayDrippedApp) {
    window.stayDrippedApp = {};
  }
  window.stayDrippedApp.IntakeQBooking = new IntakeQCategoryBooking();
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = IntakeQCategoryBooking;
}
