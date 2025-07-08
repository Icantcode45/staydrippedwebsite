// Main JavaScript entry point for Stay Dripped Mobile IV

// Import utilities
import "./utils/theme-manager.js";
import "./utils/lazy-loading.js";
import "./utils/analytics.js";

// Import components
import "./components/mobile-menu.js";
import "./components/smooth-scroll.js";
import "./components/back-to-top.js";

// Import modules
import "./modules/app.js";

// Application initialization
document.addEventListener("DOMContentLoaded", () => {
  // Initialize the application
  if (window.App) {
    new window.App();
  }
});
