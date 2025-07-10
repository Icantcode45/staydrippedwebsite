// Main JavaScript entry point for Stay Dripped Mobile IV

// Import utilities
import "./utilities/dom.js";
import "./utilities/validation.js";
import "./utilities/event-manager.js";
import "./utilities/theme-manager.js";
import "./utilities/lazy-loading.js";
import "./utilities/analytics.js";

// Import components
import "./components/premium-button-enhancer.js";
import "./components/intakeq-widget-manager.js";
import "./components/header-enhancer.js";
import "./components/mobile-menu.js";
import "./components/navigation-enhancer.js";
import "./components/smooth-scroll.js";
import "./components/back-to-top.js";
import "./components/intakeq-booking.js";

// Import modules
import App from "./modules/app.js";

// Application initialization
document.addEventListener("DOMContentLoaded", () => {
  try {
    // Initialize the application
    new App();
  } catch (error) {
    // Log sanitized error message to prevent information disclosure
    console.error("Failed to initialize application");
  }
});
