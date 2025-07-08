/**
 * IntakeQ Category-Based Booking System for Stay Dripped Mobile IV
 * Handles specific category widgets for each service type
 */

class IntakeQCategoryBooking {
  constructor() {
    this.accountId = "68460f36bc104b6aa9da43e0";
    this.baseUrl = "https://Staydripped.intakeq.com/booking";
    this.scriptLoaded = false;
    this.widgets = new Map();

    // Service category configurations
    this.categories = {
      "basic-iv": {
        id: "17d0bbca-0d95-4e32-8a8b-3ae8ae2c1152",
        name: "Basic IV Therapy Treatments",
        containerId: "intakeq-basic-iv",
        icon: "💧",
        description: "Essential hydration and wellness IV treatments",
      },
      "standard-iv": {
        id: "2f8be24a-d5ad-40c7-aa8c-5172eed7df3e",
        name: "Standard IV Therapy Treatments",
        containerId: "intakeq-standard-iv",
        icon: "🌟",
        description: "Popular therapeutic IV infusions",
      },
      "specialty-iv": {
        id: "db6a4c57-2e06-4530-a598-899f20c96a04",
        name: "Specialty IV Therapy Treatments",
        containerId: "intakeq-specialty-iv",
        icon: "⚡",
        description: "Advanced and targeted therapy treatments",
      },
      "premium-iv": {
        id: "50438982-ce89-47d1-a5f9-453ea9de5e49",
        name: "Premium IV Therapy Treatments",
        containerId: "intakeq-premium-iv",
        icon: "👑",
        description: "Luxury wellness and anti-aging treatments",
      },
      "nad-iv": {
        id: "ddf30134-b441-4226-bfe9-27eed5368949",
        name: "NAD+ IV Therapy Treatments",
        containerId: "intakeq-nad-iv",
        icon: "🧬",
        description: "Anti-aging and cellular repair therapy",
      },
      membership: {
        id: "55411eac-3c23-47e3-bd15-b5357d784a85",
        name: "Membership Plans",
        containerId: "intakeq-membership",
        icon: "🎖️",
        description: "Monthly membership and subscription plans",
      },
      "vitamin-shots": {
        id: "abff01b9-9274-4984-b601-8e188086ef2f",
        name: "Vitamin Injection Shots",
        containerId: "intakeq-vitamin-shots",
        icon: "💉",
        description: "Quick vitamin and nutrient injections",
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
    Object.keys(this.categories).forEach((categoryKey) => {
      this.createCategoryWidget(categoryKey);
    });
  }

  createCategoryWidget(categoryKey) {
    const category = this.categories[categoryKey];
    const container = document.getElementById(category.containerId);

    if (!container) {
      return; // Container not found on this page
    }

    try {
      // Create widget container
      const widgetContainer = document.createElement("div");
      widgetContainer.className = "intakeq-category-widget";
      widgetContainer.innerHTML = `
        <div class="widget-header">
          <span class="widget-icon">${category.icon}</span>
          <h3 class="widget-title">${category.name}</h3>
          <p class="widget-description">${category.description}</p>
        </div>
        <div class="widget-content">
          <div id="intakeq-widget-${categoryKey}" class="intakeq-embed"></div>
        </div>
        <div class="widget-fallback">
          <button class="book-now-btn" data-category="${categoryKey}">
            <i class="fas fa-calendar-plus"></i>
            Book ${category.name}
          </button>
          <a href="${this.baseUrl}?categoryId=${category.id}" 
             target="_blank" 
             rel="noopener noreferrer" 
             class="fallback-link">
            Open in New Window
            <i class="fas fa-external-link-alt"></i>
          </a>
        </div>
      `;

      // Clear container and add widget
      container.innerHTML = "";
      container.appendChild(widgetContainer);

      // Initialize embedded widget
      this.initializeEmbeddedWidget(categoryKey);

      // Add click handler for booking button
      const bookButton = container.querySelector(".book-now-btn");
      if (bookButton) {
        bookButton.addEventListener("click", () => {
          this.openBookingForCategory(categoryKey);
        });
      }

      // Store widget reference
      this.widgets.set(categoryKey, {
        container: container,
        category: category,
        initialized: true,
      });
    } catch (error) {
      console.error(`Error creating widget for ${category.name}:`, error);
      this.createFallbackButton(container, category);
    }
  }

  initializeEmbeddedWidget(categoryKey) {
    const category = this.categories[categoryKey];
    const embedContainer = document.getElementById(
      `intakeq-widget-${categoryKey}`,
    );

    if (!embedContainer) return;

    try {
      // Set category-specific configuration
      window.intakeqCategoryId = category.id;

      // Create embedded widget script
      const widgetScript = document.createElement("script");
      widgetScript.innerHTML = `
        (function(c) {
          var containerId = 'intakeq-widget-${categoryKey}';
          var container = document.getElementById(containerId);
          if (container && window.intakeq) {
            window.intakeqCategoryId = '${category.id}';
            // Create the widget div
            var widgetDiv = document.createElement('div');
            widgetDiv.id = 'intakeq';
            widgetDiv.style.maxWidth = '100%';
            widgetDiv.style.width = '100%';
            widgetDiv.style.minHeight = '400px';
            container.appendChild(widgetDiv);
          }
        })(document);
      `;

      // Append and execute script
      document.head.appendChild(widgetScript);
    } catch (error) {
      console.error(
        `Error initializing embedded widget for ${categoryKey}:`,
        error,
      );
      embedContainer.innerHTML = `
        <div class="widget-error">
          <p>Widget temporarily unavailable</p>
          <button class="book-now-btn" data-category="${categoryKey}">
            Book ${category.name}
          </button>
        </div>
      `;
    }
  }

  openBookingForCategory(categoryKey) {
    const category = this.categories[categoryKey];
    if (!category) return;

    try {
      // Set the global category ID
      window.intakeqCategoryId = category.id;

      // Try to use the IntakeQ widget API
      if (window.IntakeQ && typeof window.IntakeQ.open === "function") {
        window.IntakeQ.open();
      } else {
        // Fallback to direct URL
        this.openDirectBookingUrl(categoryKey);
      }
    } catch (error) {
      console.error("Error opening IntakeQ widget:", error);
      this.openDirectBookingUrl(categoryKey);
    }
  }

  openDirectBookingUrl(categoryKey) {
    const category = this.categories[categoryKey];
    const url = `${this.baseUrl}?categoryId=${category.id}`;
    window.open(url, "_blank", "noopener,noreferrer");
  }

  createFallbackButton(container, category) {
    const fallbackHtml = `
      <div class="intakeq-fallback">
        <div class="fallback-header">
          <span class="fallback-icon">${category.icon}</span>
          <h3>${category.name}</h3>
          <p>${category.description}</p>
        </div>
        <a href="${this.baseUrl}?categoryId=${category.id}" 
           target="_blank" 
           rel="noopener noreferrer" 
           class="fallback-book-btn">
          <i class="fas fa-calendar-plus"></i>
          Book ${category.name}
        </a>
      </div>
    `;
    container.innerHTML = fallbackHtml;
  }

  initializeFallbackButtons() {
    Object.keys(this.categories).forEach((categoryKey) => {
      const category = this.categories[categoryKey];
      const container = document.getElementById(category.containerId);
      if (container) {
        this.createFallbackButton(container, category);
      }
    });
  }

  addStyles() {
    const styles = `
      .intakeq-category-widget {
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
  createBookingWidget(categoryKey, containerId) {
    if (!this.categories[categoryKey]) {
      console.error(`Category ${categoryKey} not found`);
      return;
    }

    const category = this.categories[categoryKey];
    category.containerId = containerId;
    this.createCategoryWidget(categoryKey);
  }

  getBookingUrl(categoryKey) {
    const category = this.categories[categoryKey];
    return category ? `${this.baseUrl}?categoryId=${category.id}` : null;
  }

  getAllCategories() {
    return Object.keys(this.categories).map((key) => ({
      key,
      ...this.categories[key],
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
