/**
 * Stay Dripped Mobile IV Services Data
 * Comprehensive service catalog with IntakeQ booking integration
 */

const STAY_DRIPPED_SERVICES = {
  // Base IntakeQ configuration
  baseConfig: {
    accountId: "68460f36bc104b6aa9da43e0",
    widgetUrl: "https://intakeq.com/js/widget.min.js?1",
    bookingBaseUrl: "https://Staydripped.intakeq.com/booking?serviceId=",
  },

  // Service categories
  categories: {
    hydration: {
      name: "Hydration & Recovery",
      description: "Essential hydration and recovery treatments",
      icon: "💧",
      color: "#007AFF",
    },
    wellness: {
      name: "Wellness & Immunity",
      description: "Comprehensive wellness and immune support",
      icon: "🌟",
      color: "#34C759",
    },
    performance: {
      name: "Performance & Energy",
      description: "Athletic performance and energy enhancement",
      icon: "⚡",
      color: "#FF9500",
    },
    beauty: {
      name: "Beauty & Anti-Aging",
      description: "Aesthetic and anti-aging treatments",
      icon: "✨",
      color: "#FF3B30",
    },
    nad: {
      name: "NAD+ Therapy",
      description: "Advanced cellular regeneration therapy",
      icon: "🧬",
      color: "#5AC8FA",
    },
    shots: {
      name: "Vitamin Shots",
      description: "Quick vitamin and nutrient injections",
      icon: "💉",
      color: "#AF52DE",
    },
    memberships: {
      name: "Memberships",
      description: "Monthly wellness membership plans",
      icon: "👑",
      color: "#FFD700",
    },
    bundles: {
      name: "Bundle Packages",
      description: "Cost-effective treatment bundles",
      icon: "📦",
      color: "#FF6B6B",
    },
  },

  // All services with complete data
  services: {
    "rehydrate-iv": {
      id: "73e00621-4069-486a-9fa8-a5a94a089618",
      name: "Rehydrate IV Drip",
      shortName: "Rehydrate",
      category: "hydration",
      price: 149,
      duration: "30-45 minutes",
      description:
        "Essential hydration therapy with electrolytes and vitamins for optimal recovery and performance.",
      benefits: [
        "Rapid rehydration",
        "Electrolyte balance",
        "Energy boost",
        "Recovery support",
      ],
      ingredients: ["Normal Saline", "B-Complex", "Vitamin C", "Magnesium"],
      popular: false,
      image: "/assets/images/services/rehydrate-iv.jpg",
    },
    "rehydrate-plus-iv": {
      id: "ae66ce7c-fa68-408c-9ab0-a04b287f6b31",
      name: "Rehydrate Plus IV Drip",
      shortName: "Rehydrate Plus",
      category: "hydration",
      price: 179,
      duration: "30-45 minutes",
      description:
        "Enhanced hydration therapy with additional vitamins and minerals for comprehensive recovery.",
      benefits: [
        "Advanced hydration",
        "Enhanced recovery",
        "Immune support",
        "Antioxidant protection",
      ],
      ingredients: [
        "Normal Saline",
        "B-Complex",
        "Vitamin C",
        "Magnesium",
        "Zinc",
        "Glutathione",
      ],
      popular: true,
      image: "/assets/images/services/rehydrate-plus-iv.jpg",
    },
    "jr-myers-cocktail": {
      id: "065ab682-3334-403a-9635-ea461e520a6d",
      name: "Jr. Myers' Cocktail IV Drip",
      shortName: "Jr. Myers' Cocktail",
      category: "wellness",
      price: 199,
      duration: "45-60 minutes",
      description:
        "A lighter version of the classic Myers' Cocktail with essential vitamins and minerals.",
      benefits: [
        "Immune support",
        "Energy enhancement",
        "Stress relief",
        "Overall wellness",
      ],
      ingredients: ["Vitamin C", "B-Complex", "B12", "Magnesium", "Calcium"],
      popular: false,
      image: "/assets/images/services/jr-myers-cocktail.jpg",
    },
    "myers-cocktail": {
      id: "c13f904a-a8d0-43b1-bd5f-570387ee77d6",
      name: "Myers' Cocktail IV Drip",
      shortName: "Myers' Cocktail",
      category: "wellness",
      price: 249,
      duration: "45-60 minutes",
      description:
        "The classic Myers' Cocktail with a powerful blend of vitamins and minerals for optimal health.",
      benefits: [
        "Comprehensive wellness",
        "Immune boost",
        "Energy increase",
        "Nutrient optimization",
      ],
      ingredients: [
        "High-dose Vitamin C",
        "B-Complex",
        "B12",
        "Magnesium",
        "Calcium",
        "B5",
        "B6",
      ],
      popular: true,
      image: "/assets/images/services/myers-cocktail.jpg",
    },
    "mega-myers-cocktail": {
      id: "e14cdb17-a9d1-47cb-90e1-d3050059bcf3",
      name: "Mega Myers' Cocktail IV Drip",
      shortName: "Mega Myers' Cocktail",
      category: "wellness",
      price: 299,
      duration: "60-75 minutes",
      description:
        "The ultimate Myers' Cocktail with maximum vitamin and mineral concentrations.",
      benefits: [
        "Maximum wellness support",
        "Peak immune function",
        "Optimal energy",
        "Complete nutrient profile",
      ],
      ingredients: [
        "Ultra-high Vitamin C",
        "Full B-Complex",
        "B12",
        "Magnesium",
        "Calcium",
        "Additional minerals",
      ],
      popular: false,
      image: "/assets/images/services/mega-myers-cocktail.jpg",
    },
    "day-after-hangover": {
      id: "a7d83ea1-cf5e-4865-923e-bfe2232de898",
      name: "The Day After Hangover Relief IV Drip",
      shortName: "Hangover Relief",
      category: "hydration",
      price: 199,
      duration: "30-45 minutes",
      description:
        "Rapid hangover relief with hydration, vitamins, and anti-nausea medication.",
      benefits: [
        "Hangover relief",
        "Nausea reduction",
        "Rapid rehydration",
        "Energy restoration",
      ],
      ingredients: [
        "Normal Saline",
        "B-Complex",
        "B12",
        "Anti-nausea medication",
        "Pain relief",
      ],
      popular: true,
      image: "/assets/images/services/hangover-relief.jpg",
    },
    "gold-ultimate": {
      id: "3519d39a-31ac-4944-80c9-4eb667a13df4",
      name: 'The "Gold" Ultimate Hydration & Recovery IV Drip',
      shortName: "Gold Ultimate",
      category: "performance",
      price: 349,
      duration: "60-90 minutes",
      description:
        "Premium hydration and recovery treatment with high-dose vitamins and minerals.",
      benefits: [
        "Ultimate hydration",
        "Peak performance",
        "Advanced recovery",
        "Premium nutrients",
      ],
      ingredients: [
        "High-dose vitamins",
        "Premium minerals",
        "Amino acids",
        "Antioxidants",
      ],
      popular: true,
      featured: true,
      image: "/assets/images/services/gold-ultimate.jpg",
    },
    "platinum-ultimate": {
      id: "0c0c56b7-85a4-4e01-9b9c-180bc714fa94",
      name: 'The "Platinum" Ultimate Hydration & Recovery IV Drip',
      shortName: "Platinum Ultimate",
      category: "performance",
      price: 449,
      duration: "75-90 minutes",
      description:
        "The ultimate hydration and recovery experience with the highest grade nutrients.",
      benefits: [
        "Elite hydration",
        "Maximum performance",
        "Superior recovery",
        "Luxury experience",
      ],
      ingredients: [
        "Ultra-premium vitamins",
        "Elite minerals",
        "Amino acid complex",
        "Advanced antioxidants",
      ],
      popular: true,
      featured: true,
      premium: true,
      image: "/assets/images/services/platinum-ultimate.jpg",
    },
    "arizona-detox": {
      id: "3fb4cbbb-5e12-447c-a236-869573ef730f",
      name: 'The "Arizona" Detox & Cleanse IV Drip',
      shortName: "Arizona Detox",
      category: "wellness",
      price: 279,
      duration: "60-75 minutes",
      description:
        "Comprehensive detoxification therapy to cleanse and rejuvenate your system.",
      benefits: [
        "Body detoxification",
        "Liver support",
        "Antioxidant boost",
        "Cellular cleansing",
      ],
      ingredients: [
        "Glutathione",
        "Vitamin C",
        "Alpha Lipoic Acid",
        "B-Complex",
        "Minerals",
      ],
      popular: false,
      image: "/assets/images/services/arizona-detox.jpg",
    },
    "basic-nad": {
      id: "7c8dcca4-35b4-44bd-a242-d1fdc722ddb5",
      name: "The Basic NAD+ IV Drip",
      shortName: "Basic NAD+",
      category: "nad",
      price: 449,
      duration: "2-3 hours",
      description:
        "Introduction to NAD+ therapy for cellular regeneration and anti-aging benefits.",
      benefits: [
        "Cellular repair",
        "Anti-aging",
        "Mental clarity",
        "Energy enhancement",
      ],
      ingredients: ["NAD+ 250mg", "Normal Saline", "B-Complex", "Magnesium"],
      popular: true,
      image: "/assets/images/services/basic-nad.jpg",
    },
    "fountain-youth-nad": {
      id: "73bbd812-1b77-4e60-a92e-35b64af58379",
      name: 'The "Fountain of Youth" NAD+ IV Drip',
      shortName: "Fountain of Youth NAD+",
      category: "nad",
      price: 649,
      duration: "3-4 hours",
      description:
        "Advanced NAD+ therapy for comprehensive anti-aging and longevity benefits.",
      benefits: [
        "Advanced anti-aging",
        "Longevity support",
        "Cognitive enhancement",
        "Cellular optimization",
      ],
      ingredients: [
        "NAD+ 500mg",
        "Anti-aging cocktail",
        "Peptides",
        "Premium nutrients",
      ],
      popular: true,
      featured: true,
      image: "/assets/images/services/fountain-youth-nad.jpg",
    },
    "diamond-nad": {
      id: "1a0e76e3-7548-4039-a737-efe993bfdbfd",
      name: 'The "Diamond" NAD+ IV Drip',
      shortName: "Diamond NAD+",
      category: "nad",
      price: 849,
      duration: "4-5 hours",
      description:
        "Premium NAD+ therapy with the highest quality and concentration for maximum benefits.",
      benefits: [
        "Maximum NAD+ benefits",
        "Premium experience",
        "Enhanced recovery",
        "Optimal results",
      ],
      ingredients: [
        "NAD+ 750mg",
        "Premium nutrients",
        "Advanced peptides",
        "Luxury formulation",
      ],
      popular: false,
      premium: true,
      image: "/assets/images/services/diamond-nad.jpg",
    },
    "elite-nad": {
      id: "1af0f33f-361e-42db-8a06-a87f653a5cb1",
      name: 'The "Elite" NAD+ IV Drip',
      shortName: "Elite NAD+",
      category: "nad",
      price: 999,
      duration: "5-6 hours",
      description:
        "The ultimate NAD+ experience with maximum dosage and premium support nutrients.",
      benefits: [
        "Ultimate NAD+ therapy",
        "Elite wellness",
        "Maximum longevity",
        "VIP experience",
      ],
      ingredients: [
        "NAD+ 1000mg",
        "Elite nutrient blend",
        "Advanced peptides",
        "Luxury additives",
      ],
      popular: false,
      premium: true,
      featured: true,
      image: "/assets/images/services/elite-nad.jpg",
    },
    "b12-energy-shot": {
      id: "c14d40af-977b-4f6e-9db8-d24c9ad3a35d",
      name: "B12 Energy Shot",
      shortName: "B12 Shot",
      category: "shots",
      price: 49,
      duration: "5-10 minutes",
      description:
        "Quick and effective B12 injection for immediate energy boost and metabolism support.",
      benefits: [
        "Instant energy",
        "Metabolism boost",
        "Mood enhancement",
        "Quick treatment",
      ],
      ingredients: ["Vitamin B12 (Methylcobalamin)", "B-Complex"],
      popular: true,
      image: "/assets/images/services/b12-shot.jpg",
    },
    "sun-devil-energy": {
      id: "65854196-73a1-4e68-a6c5-15cc88a5e346",
      name: 'The "Sun Devil" Energy Booster IV Drip',
      shortName: "Sun Devil Energy",
      category: "performance",
      price: 229,
      duration: "45-60 minutes",
      description:
        "High-energy IV therapy designed for peak performance and endurance.",
      benefits: [
        "Peak energy",
        "Performance enhancement",
        "Endurance boost",
        "Mental focus",
      ],
      ingredients: [
        "B-Complex",
        "B12",
        "Amino acids",
        "Taurine",
        "Caffeine alternative",
      ],
      popular: true,
      image: "/assets/images/services/sun-devil-energy.jpg",
    },
    "d-book-performance": {
      id: "351c5cac-f576-418f-80d1-b8d6c0a1614f",
      name: 'The "D-Book" Performance Booster IV Drip',
      shortName: "D-Book Performance",
      category: "performance",
      price: 299,
      duration: "60-75 minutes",
      description:
        "Athletic performance enhancement therapy for serious athletes and fitness enthusiasts.",
      benefits: [
        "Athletic performance",
        "Recovery acceleration",
        "Muscle support",
        "Endurance",
      ],
      ingredients: [
        "Amino acid complex",
        "B-vitamins",
        "Minerals",
        "Performance enhancers",
      ],
      popular: false,
      image: "/assets/images/services/d-book-performance.jpg",
    },
    "diamond-back-immune": {
      id: "d2f9830e-765d-4f50-89b4-b8ed1d9dc16c",
      name: 'The "Diamond-Back" Immune Booster IV Drip',
      shortName: "Diamond-Back Immune",
      category: "wellness",
      price: 249,
      duration: "45-60 minutes",
      description:
        "Powerful immune system support with high-dose vitamins and minerals.",
      benefits: [
        "Immune system boost",
        "Illness prevention",
        "Recovery support",
        "Antioxidant protection",
      ],
      ingredients: [
        "High-dose Vitamin C",
        "Zinc",
        "B-Complex",
        "Glutathione",
        "Immune support blend",
      ],
      popular: true,
      image: "/assets/images/services/diamond-back-immune.jpg",
    },
    "scottsdale-beauty": {
      id: "68503856-7b7c-487a-ac80-9f6e4aabcb08",
      name: 'The "Scottsdale" Beauty IV Bag',
      shortName: "Scottsdale Beauty",
      category: "beauty",
      price: 299,
      duration: "60-75 minutes",
      description:
        "Beauty-focused IV therapy for radiant skin, hair, and nail health.",
      benefits: [
        "Skin radiance",
        "Hair health",
        "Nail strength",
        "Anti-aging support",
      ],
      ingredients: [
        "Biotin",
        "Vitamin C",
        "Glutathione",
        "Collagen support",
        "Beauty nutrients",
      ],
      popular: true,
      image: "/assets/images/services/scottsdale-beauty.jpg",
    },
    "stress-relief": {
      id: "549f9f59-8bf3-4e62-a4ac-100998a40215",
      name: "The Stress Relief IV Drip",
      shortName: "Stress Relief",
      category: "wellness",
      price: 229,
      duration: "45-60 minutes",
      description:
        "Calming therapy to reduce stress and promote relaxation and mental clarity.",
      benefits: [
        "Stress reduction",
        "Relaxation",
        "Mental clarity",
        "Mood support",
      ],
      ingredients: [
        "Magnesium",
        "B-Complex",
        "Taurine",
        "Calming nutrients",
        "Stress support blend",
      ],
      popular: false,
      image: "/assets/images/services/stress-relief.jpg",
    },
    "mental-clarity": {
      id: "6df0fe13-174e-4cb2-8a99-fd4d9dce4b92",
      name: "The Mental Clarity IV Drip",
      shortName: "Mental Clarity",
      category: "performance",
      price: 249,
      duration: "45-60 minutes",
      description:
        "Cognitive enhancement therapy for improved focus, memory, and mental performance.",
      benefits: [
        "Mental clarity",
        "Focus enhancement",
        "Memory support",
        "Cognitive boost",
      ],
      ingredients: [
        "B-Complex",
        "Nootropics",
        "Amino acids",
        "Brain support nutrients",
      ],
      popular: false,
      image: "/assets/images/services/mental-clarity.jpg",
    },
    "anti-inflammatory": {
      id: "f6362671-bcb3-4b2b-ab08-1f3801ff5249",
      name: "The Anti-Inflammatory IV Drip",
      shortName: "Anti-Inflammatory",
      category: "wellness",
      price: 279,
      duration: "60-75 minutes",
      description:
        "Targeted therapy to reduce inflammation and support recovery from chronic conditions.",
      benefits: [
        "Inflammation reduction",
        "Pain relief",
        "Recovery support",
        "Cellular healing",
      ],
      ingredients: [
        "Glutathione",
        "Vitamin C",
        "Curcumin",
        "Anti-inflammatory blend",
      ],
      popular: false,
      image: "/assets/images/services/anti-inflammatory.jpg",
    },
    "stay-dripped-special": {
      id: "9e6f536c-5907-4c69-93ea-799863fd6495",
      name: "The Stay Dripped Special IV Drip",
      shortName: "Stay Dripped Special",
      category: "wellness",
      price: 199,
      duration: "45-60 minutes",
      description:
        "Our signature blend combining the best elements for overall wellness and vitality.",
      benefits: [
        "Signature wellness",
        "Balanced nutrition",
        "Energy support",
        "Overall health",
      ],
      ingredients: [
        "Signature blend",
        "B-vitamins",
        "Vitamin C",
        "Minerals",
        "Special additives",
      ],
      popular: true,
      featured: true,
      image: "/assets/images/services/stay-dripped-special.jpg",
    },
    "metabolism-booster": {
      id: "af87e9d3-a72c-4a63-9317-4013d18bd576",
      name: "Metabolism Booster IV Drip",
      shortName: "Metabolism Booster",
      category: "performance",
      price: 249,
      duration: "45-60 minutes",
      description:
        "Metabolic enhancement therapy to support weight management and energy production.",
      benefits: [
        "Metabolism boost",
        "Weight support",
        "Energy enhancement",
        "Fat burning",
      ],
      ingredients: [
        "L-Carnitine",
        "B-Complex",
        "Amino acids",
        "Metabolism enhancers",
      ],
      popular: false,
      image: "/assets/images/services/metabolism-booster.jpg",
    },
    // Memberships
    "shot-pass-membership": {
      id: "08549cfc-d53e-4841-9366-d63b9c22251a",
      name: "Monthly Membership: Shot Pass",
      shortName: "Shot Pass",
      category: "memberships",
      price: 99,
      duration: "Monthly",
      description:
        "Monthly membership for unlimited vitamin shots and exclusive member benefits.",
      benefits: [
        "Unlimited shots",
        "Member discounts",
        "Priority booking",
        "Exclusive access",
      ],
      includes: ["All vitamin shots", "Member pricing", "Priority support"],
      popular: true,
      image: "/assets/images/memberships/shot-pass.jpg",
    },
    "wellness-explorer-membership": {
      id: "d7b705fd-04b7-4b2e-bda7-950417d6007d",
      name: "Monthly Membership: Wellness Explorer",
      shortName: "Wellness Explorer",
      category: "memberships",
      price: 199,
      duration: "Monthly",
      description:
        "Comprehensive wellness membership with IV treatments and additional benefits.",
      benefits: [
        "Monthly IV credit",
        "Discounted rates",
        "Wellness coaching",
        "Health tracking",
      ],
      includes: ["$200 IV credit", "15% discount", "Wellness consultation"],
      popular: true,
      image: "/assets/images/memberships/wellness-explorer.jpg",
    },
    "wellness-elite-membership": {
      id: "1421a50e-d0d0-475f-8713-74b0245bc83f",
      name: "Monthly Membership: Wellness Elite",
      shortName: "Wellness Elite",
      category: "memberships",
      price: 349,
      duration: "Monthly",
      description:
        "Elite wellness membership with premium treatments and VIP service.",
      benefits: [
        "Premium IV credit",
        "VIP service",
        "Concierge support",
        "Advanced treatments",
      ],
      includes: ["$400 IV credit", "20% discount", "VIP scheduling"],
      popular: false,
      featured: true,
      image: "/assets/images/memberships/wellness-elite.jpg",
    },
    "wellness-platinum-membership": {
      id: "23cd9dbe-9135-42eb-9d37-9281cffda0f8",
      name: "Monthly Membership: Wellness Platinum",
      shortName: "Wellness Platinum",
      category: "memberships",
      price: 599,
      duration: "Monthly",
      description:
        "Ultimate wellness membership with unlimited treatments and luxury benefits.",
      benefits: [
        "Unlimited treatments",
        "Luxury service",
        "Personal concierge",
        "Exclusive access",
      ],
      includes: ["Unlimited IVs", "25% discount", "Personal wellness coach"],
      popular: false,
      premium: true,
      image: "/assets/images/memberships/wellness-platinum.jpg",
    },
    // Bundles
    "b12-power-pack": {
      id: "e7c6a722-e621-46d7-8f96-af2f96848dc4",
      name: "Bundle Package: B12 Power Pack",
      shortName: "B12 Power Pack",
      category: "bundles",
      price: 199,
      duration: "Package deal",
      description:
        "Cost-effective bundle of B12 energy shots for sustained energy support.",
      benefits: [
        "Cost savings",
        "Sustained energy",
        "Convenient scheduling",
        "Bulk pricing",
      ],
      includes: ["5 B12 shots", "Scheduling flexibility", "20% savings"],
      popular: true,
      image: "/assets/images/bundles/b12-power-pack.jpg",
    },
    "wellness-shot-bundle": {
      id: "1b14cb7a-8e18-44b3-99a1-ecd3b516e8a6",
      name: "Bundle Package: Wellness Shot Bundle",
      shortName: "Wellness Shot Bundle",
      category: "bundles",
      price: 299,
      duration: "Package deal",
      description:
        "Comprehensive vitamin shot bundle for complete wellness support.",
      benefits: [
        "Variety of shots",
        "Cost savings",
        "Wellness support",
        "Flexible scheduling",
      ],
      includes: ["10 mixed shots", "Custom selection", "25% savings"],
      popular: false,
      image: "/assets/images/bundles/wellness-shot-bundle.jpg",
    },
  },

  // Helper functions
  getServiceById(serviceId) {
    return Object.values(this.services).find(
      (service) => service.id === serviceId,
    );
  },

  getServicesByCategory(categoryKey) {
    return Object.values(this.services).filter(
      (service) => service.category === categoryKey,
    );
  },

  getPopularServices() {
    return Object.values(this.services).filter((service) => service.popular);
  },

  getFeaturedServices() {
    return Object.values(this.services).filter((service) => service.featured);
  },

  getPremiumServices() {
    return Object.values(this.services).filter((service) => service.premium);
  },

  getBookingUrl(serviceKey) {
    const service = this.services[serviceKey];
    return service ? `${this.baseConfig.bookingBaseUrl}${service.id}` : null;
  },

  getWidgetScript(serviceKey) {
    const service = this.services[serviceKey];
    if (!service) return null;

    return `(function (c) {
      window.intakeq="${this.baseConfig.accountId}";
      window.intakeqServiceId="${service.id}";
      var i = c.createElement("script");
      i.type = "text/javascript";
      i.async = true;
      i.src = "${this.baseConfig.widgetUrl}";
      document.head.appendChild(i);
    })(document);`;
  },
};

// Export for use in other files
if (typeof module !== "undefined" && module.exports) {
  module.exports = STAY_DRIPPED_SERVICES;
} else if (typeof window !== "undefined") {
  window.STAY_DRIPPED_SERVICES = STAY_DRIPPED_SERVICES;
}
