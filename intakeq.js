/**
 * IntakeQ Category-Based Widget Manager for Stay Dripped Mobile IV
 * Handles category-specific IntakeQ widgets without conflicts
 * LEGACY VERSION - Use intakeq-booking.js for new implementations
 */

class IntakeQManager {
  constructor() {
    this.widgets = new Map();
    this.scriptLoaded = false;
    this.accountId = '68460f36bc104b6aa9da43e0';
    this.init();
  }

  init() {
    // Load IntakeQ script once
    this.loadIntakeQScript().then(() => {
      this.initializeLegacyWidgets();
      this.initializeCategoryWidgets();
    });
  }

  async loadIntakeQScript() {
    if (this.scriptLoaded || window.IntakeQ) {
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
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }

  initializeCategoryWidgets() {
    // New category-based configurations
    const categoryConfigs = [
      {
        containerId: 'intakeq-basic-iv',
        categoryId: '17d0bbca-0d95-4e32-8a8b-3ae8ae2c1152',
        name: 'Basic IV Therapy Treatments',
      },
      {
        containerId: 'intakeq-standard-iv',
        categoryId: '2f8be24a-d5ad-40c7-aa8c-5172eed7df3e',
        name: 'Standard IV Therapy Treatments',
      },
      {
        containerId: 'intakeq-specialty-iv',
        categoryId: 'db6a4c57-2e06-4530-a598-899f20c96a04',
        name: 'Specialty IV Therapy Treatments',
      },
      {
        containerId: 'intakeq-premium-iv',
        categoryId: '50438982-ce89-47d1-a5f9-453ea9de5e49',
        name: 'Premium IV Therapy Treatments',
      },
      {
        containerId: 'intakeq-nad-iv',
        categoryId: 'ddf30134-b441-4226-bfe9-27eed5368949',
        name: 'NAD+ IV Therapy Treatments',
      },
      {
        containerId: 'intakeq-membership',
        categoryId: '55411eac-3c23-47e3-bd15-b5357d784a85',
        name: 'Membership Plans',
      },
      {
        containerId: 'intakeq-vitamin-shots',
        categoryId: 'abff01b9-9274-4984-b601-8e188086ef2f',
        name: 'Vitamin Injection Shots',
      },
    ];

    // Initialize each category widget
    categoryConfigs.forEach((config) => {
      this.createCategoryWidget(config);
    });
  }

  initializeLegacyWidgets() {
    // Legacy service mapping for backward compatibility
    const serviceConfigs = [
      {
        containerId: 'intakeq-myers-cocktail',
        serviceId: 'c13f904a-a8d0-43b1-bd5f-570387ee77d6',
        name: 'Myers Cocktail IV Drip',
      },
      {
        containerId: 'intakeq-mega-myers',
        serviceId: 'e14cdb17-a9d1-47cb-90e1-d3050059bcf3',
        name: 'Mega Myers Cocktail IV Drip',
      },
      {
        containerId: 'intakeq-jr-myers',
        serviceId: '065ab682-3334-403a-9635-ea461e520a6d',
        name: 'Jr Myers Cocktail IV Drip',
      },
      {
        containerId: 'intakeq-hangover',
        serviceId: 'a7d83ea1-cf5e-4865-923e-bfe2232de898',
        name: 'Hangover Relief IV Drip',
      },
      {
        containerId: 'intakeq-basic-rehydrate',
        serviceId: '73e00621-4069-486a-9fa8-a5a94a089618',
        name: 'Basic Rehydrate IV Drip',
      },
      {
        containerId: 'intakeq-rehydrate-plus',
        serviceId: 'ae66ce7c-fa68-408c-9ab0-a04b287f6b31',
        name: 'Rehydrate Plus IV Drip',
      },
      {
        containerId: 'intakeq-gold-hydration',
        serviceId: '3519d39a-31ac-4944-80c9-4eb667a13df4',
        name: 'Gold Ultimate Hydration IV Drip',
      },
      {
        containerId: 'intakeq-platinum-hydration',
        serviceId: '0c0c56b7-85a4-4e01-9b9c-180bc714fa94',
        name: 'Platinum Ultimate Hydration IV Drip',
      },
      {
        containerId: 'intakeq-arizona-detox',
        serviceId: '3fb4cbbb-5e12-447c-a236-869573ef730f',
        name: 'Arizona Detox & Cleanse IV Drip',
      },
      {
        containerId: 'intakeq-basic-nad',
        serviceId: '7c8dcca4-35b4-44bd-a242-d1fdc722ddb5',
        name: 'Basic NAD+ IV Drip',
      },
      {
        containerId: 'intakeq-shot-pass',
        serviceId: '08549cfc-d53e-4841-9366-d63b9c22251a',
        name: 'Monthly Shot Pass Membership',
      },
      {
        containerId: 'intakeq-essentials',
        serviceId: 'd7b705fd-04b7-4b2e-bda7-950417d6007d',
        name: 'Monthly Essentials Membership',
      },
    ];

    // Initialize legacy widgets
    serviceConfigs.forEach((config) => {
      this.createWidget(config);
    });
  }

  createCategoryWidget(config) {
    const container = document.getElementById(config.containerId);
    if (!container) {
      return; // Container not found on this page
    }

    try {
      // Create button that opens IntakeQ booking with category
      const bookingButton = document.createElement('button');
      bookingButton.className = 'intakeq-booking-btn btn btn-primary';
      bookingButton.innerHTML = `
        <i class="fas fa-calendar-plus"></i>
        Book ${config.name}
      `;

      bookingButton.addEventListener('click', () => {
        this.openCategoryBooking(config.categoryId);
      });

      // Clear container and add button
      container.innerHTML = '';
      container.appendChild(bookingButton);

      // Store widget config
      this.widgets.set(`category-${config.containerId}`, config);
    } catch (error) {
      console.error(
        `Error creating IntakeQ category widget for ${config.name}:`,
        error,
      );

      // Fallback: create a direct link
      const fallbackLink = document.createElement('a');
      fallbackLink.href = `https://Staydripped.intakeq.com/booking?categoryId=${config.categoryId}`;
      fallbackLink.target = '_blank';
      fallbackLink.rel = 'noopener noreferrer';
      fallbackLink.className = 'intakeq-fallback-link btn btn-outline';
      fallbackLink.innerHTML = `
        <i class="fas fa-external-link-alt"></i>
        Book ${config.name}
      `;

      container.innerHTML = '';
      container.appendChild(fallbackLink);
    }
  }

  createWidget(config) {
    const container = document.getElementById(config.containerId);
    if (!container) {
      return; // Container not found on this page
    }

    try {
      // Create a unique widget instance
      const widgetId = `widget-${config.containerId}`;

      // Create button that opens IntakeQ booking
      const bookingButton = document.createElement('button');
      bookingButton.className = 'intakeq-booking-btn btn btn-primary';
      bookingButton.innerHTML = `
        <i class="fas fa-calendar-plus"></i>
        Book ${config.name}
      `;

      bookingButton.addEventListener('click', () => {
        this.openBookingWidget(config.serviceId);
      });

      // Clear container and add button
      container.innerHTML = '';
      container.appendChild(bookingButton);

      // Store widget config
      this.widgets.set(widgetId, config);
    } catch (error) {
      console.error(`Error creating IntakeQ widget for ${config.name}:`, error);

      // Fallback: create a direct link
      const fallbackLink = document.createElement('a');
      fallbackLink.href = `https://Staydripped.intakeq.com/booking?serviceId=${config.serviceId}`;
      fallbackLink.target = '_blank';
      fallbackLink.rel = 'noopener noreferrer';
      fallbackLink.className = 'intakeq-fallback-link btn btn-outline';
      fallbackLink.innerHTML = `
        <i class="fas fa-external-link-alt"></i>
        Book ${config.name}
      `;

      container.innerHTML = '';
      container.appendChild(fallbackLink);
    }
  }

  openCategoryBooking(categoryId) {
    try {
      // Set the global category ID
      window.intakeqCategoryId = categoryId;

      // Try to use the IntakeQ widget API
      if (window.IntakeQ && typeof window.IntakeQ.open === 'function') {
        window.IntakeQ.open();
      } else {
        // Fallback to direct URL
        window.open(
          `https://Staydripped.intakeq.com/booking?categoryId=${categoryId}`,
          '_blank',
        );
      }
    } catch (error) {
      console.error('Error opening IntakeQ category widget:', error);
      // Final fallback
      window.open(
        `https://Staydripped.intakeq.com/booking?categoryId=${categoryId}`,
        '_blank',
      );
    }
  }

  openBookingWidget(serviceId) {
    try {
      if (window.IntakeQ && typeof window.IntakeQ.open === 'function') {
        // Set the service ID for the session
        window.intakeqServiceId = serviceId;
        window.IntakeQ.open();
      } else {
        // Fallback to direct URL
        window.open(
          `https://Staydripped.intakeq.com/booking?serviceId=${serviceId}`,
          '_blank',
        );
      }
    } catch (error) {
      console.error('Error opening IntakeQ widget:', error);
      // Final fallback
      window.open(
        `https://Staydripped.intakeq.com/booking?serviceId=${serviceId}`,
        '_blank',
      );
    }
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  // Set global IntakeQ configuration
  window.intakeq = '68460f36bc104b6aa9da43e0';

  // Initialize the manager
  new IntakeQManager();
});

// Add CSS styles for the booking buttons
const style = document.createElement('style');
style.textContent = `
  .intakeq-booking-btn {
    width: 100%;
    padding: 1rem 1.5rem;
    background: var(--gradient-primary, linear-gradient(135deg, #00e5ff 0%, #0099cc 100%));
    color: white;
    border: none;
    border-radius: 12px;
    font-weight: 600;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    box-shadow: 0 4px 15px rgba(0, 229, 255, 0.3);
  }

  .intakeq-booking-btn:hover {
    background: var(--gradient-secondary, linear-gradient(135deg, #00ffa6 0%, #00cc99 100%));
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 229, 255, 0.4);
  }

  .intakeq-booking-btn:active {
    transform: translateY(0);
  }

  .intakeq-fallback-link {
    width: 100%;
    padding: 1rem 1.5rem;
    text-decoration: none;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    transition: all 0.3s ease;
  }

  .intakeq-fallback-link:hover {
    text-decoration: none;
    transform: translateY(-2px);
  }
`;
document.head.appendChild(style);
