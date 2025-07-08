// Main JavaScript entry point for Stay Dripped Mobile IV

// Import utilities
import "./utilities/validation.js";
import "./utilities/event-manager.js";
import "./utilities/theme-manager.js";
import "./utilities/lazy-loading.js";
import "./utilities/analytics.js";

// Import components
import "./components/mobile-menu.js";
import "./components/smooth-scroll.js";
import "./components/back-to-top.js";
import "./components/intakeq-booking.js";

// Import modules
import App from "./modules/app.js";

// Application initialization
document.addEventListener("DOMContentLoaded", () => {
  // Initialize the application
  if (window.App) {
    new window.App();
  }
});
