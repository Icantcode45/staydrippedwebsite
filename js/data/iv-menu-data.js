/**
 * IV Menu Data and Template System
 * Reduces code duplication by centralizing service data
 */

const IVMenuData = {
  categories: [
    {
      id: "basic-hydration",
      title: "💧 Basic Hydration Solutions",
      description: "Essential hydration and electrolyte replenishment",
      services: [
        {
          id: "rehydrate-iv",
          name: "Rehydrate IV Drip",
          price: "$155",
          sku: "25.00",
          icon: "💧",
          description:
            "500mL saline IV solution with Vitamin B Complex for essential hydration and energy boost.",
          ingredients: [
            "500mL Saline Solution",
            "Vitamin B Complex",
            "Electrolytes",
            "Sterile IV Setup",
          ],
          serviceId: "73e00621-4069-486a-9fa8-a5a94a089618",
          widgetId: "rehydrate-widget",
        },
        {
          id: "rehydrate-plus-iv",
          name: "Rehydrate Plus IV Drip",
          price: "$165",
          sku: "26.00",
          icon: "💧",
          description:
            "1000mL saline IV solution with enhanced Vitamin B Complex for superior hydration and recovery.",
          ingredients: [
            "1000mL Saline Solution",
            "Enhanced B Complex",
            "Electrolyte Blend",
            "Mineral Support",
          ],
          serviceId: "ae66ce7c-fa68-408c-9ab0-a04b287f6b31",
          widgetId: "rehydrate-plus-widget",
          featured: true,
        },
      ],
    },
    {
      id: "myers-family",
      title: "⚡ Myers' Cocktail Family",
      description:
        "Classic vitamin and mineral IV therapy in various strengths",
      services: [
        {
          id: "jr-myers-iv",
          name: "Jr. Myers' Cocktail IV",
          price: "$185",
          sku: "3.00",
          icon: "🌟",
          description:
            "Gentle IV solution with Vitamin C, B-Complex and Glutathione, perfect for first-time patients.",
          ingredients: [
            "Vitamin C",
            "B-Complex Vitamins",
            "Glutathione",
            "Normal Saline",
            "Magnesium",
            "Calcium",
          ],
          serviceId: "065ab682-3334-403a-9635-ea461e520a6d",
          widgetId: "jr-myers-widget",
        },
        {
          id: "myers-iv",
          name: "Myers' Cocktail IV",
          price: "$205",
          sku: "1.00",
          icon: "⚡",
          description:
            "Classic vitamin and mineral IV with B-12, Zinc, Magnesium, Glutathione, Vitamin C and B-Complex.",
          ingredients: [
            "Vitamin B-12",
            "Zinc",
            "Magnesium",
            "Glutathione",
            "Vitamin C",
            "B-Complex",
            "Calcium",
            "Normal Saline",
          ],
          serviceId: "c13f904a-a8d0-43b1-bd5f-570387ee77d6",
          widgetId: "myers-widget",
          featured: true,
        },
        {
          id: "mega-myers-iv",
          name: "Mega Myers' Cocktail",
          price: "$235",
          sku: "2.00",
          icon: "💥",
          description:
            "High-dose version of Myers' Cocktail with enhanced vitamins and minerals for maximum wellness benefit.",
          ingredients: [
            "High-dose Vitamin C",
            "Double B-Complex",
            "Enhanced Magnesium",
            "Zinc",
            "Glutathione",
            "B-12",
            "Calcium",
            "Normal Saline",
          ],
          serviceId: "e14cdb17-a9d1-47cb-90e1-d3050059bcf3",
          widgetId: "mega-myers-widget",
        },
      ],
    },
    {
      id: "specialty-treatments",
      title: "🌿 Specialty Treatments",
      description: "Targeted therapy for specific wellness goals",
      services: [
        {
          id: "hangover-iv",
          name: "The Day After Hangover Relief",
          price: "$195",
          sku: "8.00",
          icon: "🍃",
          description:
            "Fast-acting hangover relief with anti-nausea medication and comprehensive vitamin replenishment.",
          ingredients: [
            "B-Complex Vitamins",
            "Vitamin B-12",
            "Anti-nausea medication",
            "Electrolytes",
            "Normal Saline",
            "Glutathione",
          ],
          serviceId: "a7d83ea1-cf5e-4865-923e-bfe2232de898",
          widgetId: "hangover-widget",
        },
        {
          id: "arizona-detox-iv",
          name: 'The "Arizona" Detox & Cleanse',
          price: "$265",
          sku: "9.00",
          icon: "🌵",
          description:
            "Comprehensive detox and cleanse therapy to eliminate toxins and support natural processes.",
          ingredients: [
            "High-dose Glutathione",
            "Alpha Lipoic Acid",
            "Vitamin C",
            "B-Complex",
            "Magnesium",
            "Zinc",
            "Selenium",
            "Normal Saline",
          ],
          serviceId: "3fb4cbbb-5e12-447c-a236-869573ef730f",
          widgetId: "arizona-detox-widget",
          featured: true,
        },
      ],
    },
    {
      id: "premium-recovery",
      title: "👑 Premium Recovery",
      description: "Our most comprehensive treatments for ultimate wellness",
      services: [
        {
          id: "gold-hydration-iv",
          name: 'The "Gold" Ultimate Hydration',
          price: "$325",
          sku: "6.00",
          icon: "🥇",
          description:
            "Enhanced IV solution for hydration and recovery with double doses of Vitamin C and Glutathione.",
          ingredients: [
            "Double Vitamin C",
            "Double Glutathione",
            "High-dose B-Complex",
            "Magnesium",
            "Calcium",
            "Zinc",
            "B-12",
            "Normal Saline",
          ],
          serviceId: "3519d39a-31ac-4944-80c9-4eb667a13df4",
          widgetId: "gold-widget",
        },
        {
          id: "platinum-hydration-iv",
          name: 'The "Platinum" Ultimate Recovery',
          price: "$355",
          sku: "5.00",
          icon: "👑",
          description:
            "Our most luxurious hydration experience with comprehensive IV solution for ultimate recovery.",
          ingredients: [
            "Triple Glutathione",
            "High-dose Vitamin C",
            "Premium B-Complex",
            "Magnesium",
            "Calcium",
            "Zinc",
            "B-12",
            "Alpha Lipoic Acid",
            "Normal Saline",
          ],
          serviceId: "0c0c56b7-85a4-4e01-9b9c-180bc714fa94",
          widgetId: "platinum-widget",
          featured: true,
        },
      ],
    },
    {
      id: "nad-therapy",
      title: "🧬 NAD+ Anti-Aging Therapy",
      description:
        "Cutting-edge NAD+ therapy for cellular repair and longevity",
      services: [
        {
          id: "basic-nad-iv",
          name: "The Basic NAD+ IV",
          price: "$400",
          sku: "17.00",
          icon: "🧬",
          description:
            "IV therapy focused on NAD+ supplementation for cellular repair and anti-aging benefits.",
          ingredients: [
            "NAD+ (100mg)",
            "B-Complex",
            "Magnesium",
            "Normal Saline",
            "Electrolytes",
          ],
          serviceId: "7c8dcca4-35b4-44bd-a242-d1fdc722ddb5",
          widgetId: "nad-widget",
        },
        {
          id: "diamond-nad-iv",
          name: "The Diamond NAD+ Therapy",
          price: "$525",
          sku: "19.00",
          icon: "💎",
          description:
            "Premium NAD+ therapy with double dose of Vitamin C for maximum anti-aging benefits.",
          ingredients: [
            "NAD+ (250mg)",
            "Double Vitamin C",
            "High-dose B-Complex",
            "Glutathione",
            "Magnesium",
            "Zinc",
            "Alpha Lipoic Acid",
            "Normal Saline",
          ],
          serviceId: "ddf30134-b441-4226-bfe9-27eed5368949",
          widgetId: "diamond-nad-widget",
          featured: true,
        },
      ],
    },
  ],
};

const IVMenuRenderer = {
  generateCategoryHTML(category) {
    return `
      <div class="category-header fade-in">
        <h3 class="category-title">${category.title}</h3>
        <p class="category-description">${category.description}</p>
      </div>
      <div class="menu-grid">
        ${category.services.map((service) => this.generateServiceHTML(service)).join("")}
      </div>
    `;
  },

  generateServiceHTML(service) {
    const featuredClass = service.featured ? "card-featured" : "";
    const ingredientsList = service.ingredients
      .map((ingredient) => `<li>${ingredient}</li>`)
      .join("");

    return `
      <div class="iv-card card-base ${featuredClass} fade-in">
        <div class="card-header">
          <div class="iv-icon">${service.icon}</div>
          <h3 class="iv-name">${service.name}</h3>
          <div class="iv-price">${service.price}</div>
          <div class="iv-sku">SKU: ${service.sku}</div>
        </div>
        <div class="card-content">
          <p class="iv-description">${service.description}</p>
          <div class="ingredients-section">
            <h4 class="ingredients-title">
              <i class="fas fa-flask"></i>
              Key Ingredients
            </h4>
            <ul class="ingredients-list">${ingredientsList}</ul>
          </div>
          <div class="booking-widget">
            <div id="${service.widgetId}"></div>
          </div>
          <div class="booking-fallback">
            <a href="https://Staydripped.intakeq.com/booking?serviceId=${service.serviceId}" target="_blank" class="book-btn book-now-btn">
              <i class="fas fa-calendar-plus"></i>
              Book ${service.name.replace("IV Drip", "").replace("IV", "").trim()} - ${service.price}
            </a>
          </div>
        </div>
      </div>
    `;
  },

  renderMenu(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.replaceChildren();

    IVMenuData.categories.forEach((category) => {
      const categoryElement = this.createCategoryElement(category);
      container.appendChild(categoryElement);
    });
  },

  createCategoryElement(category) {
    const wrapper = document.createElement("div");

    const header = this.createCategoryHeader(category);
    const grid = this.createServiceGrid(category.services);

    wrapper.appendChild(header);
    wrapper.appendChild(grid);

    return wrapper;
  },

  createCategoryHeader(category) {
    const header = document.createElement("div");
    header.className = "category-header fade-in";

    const title = document.createElement("h3");
    title.className = "category-title";
    title.textContent = category.title;

    const description = document.createElement("p");
    description.className = "category-description";
    description.textContent = category.description;

    header.appendChild(title);
    header.appendChild(description);

    return header;
  },

  createServiceGrid(services) {
    const grid = document.createElement("div");
    grid.className = "menu-grid";

    services.forEach((service) => {
      const serviceElement = document.createElement("div");
      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = this.generateServiceHTML(service);
      serviceElement.appendChild(tempDiv.firstElementChild);
      grid.appendChild(serviceElement);
    });

    return grid;
  },
};

// Export for use
if (typeof module !== "undefined" && module.exports) {
  module.exports = { IVMenuData, IVMenuRenderer };
}

// Make available globally
window.IVMenuData = IVMenuData;
window.IVMenuRenderer = IVMenuRenderer;
