// Professional Theme Manager
// Handles user preferences and system theme detection without emoji icons

class ThemeManager {
  constructor() {
    this.init();
  }

  init() {
    // Check for saved theme preference or default to system preference
    let savedTheme = null;
    try {
      const stored = localStorage.getItem('staydripped-theme');
      // Validate stored theme value
      if (stored && (stored === 'light' || stored === 'dark')) {
        savedTheme = stored;
      }
    } catch (error) {
      // Handle localStorage access errors
      console.warn('Unable to access theme preference:', error);
    }

    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)')
      .matches
      ? 'dark'
      : 'light';
    const currentTheme = savedTheme || systemTheme;

    // Apply initial theme
    this.setTheme(currentTheme);

    // Listen for system theme changes
    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', (e) => {
        if (!localStorage.getItem('staydripped-theme')) {
          this.setTheme(e.matches ? 'dark' : 'light');
        }
      });

    // Handle theme toggle if available (for future use)
    this.setupThemeToggle();
  }

  setTheme(theme) {
    const root = document.documentElement;

    if (theme === 'dark') {
      root.classList.add('dark-theme');
      root.setAttribute('data-theme', 'dark');
    } else {
      root.classList.remove('dark-theme');
      root.setAttribute('data-theme', 'light');
    }

    // Update meta theme-color for mobile browsers
    const themeColorMeta = document.querySelector('meta[name="theme-color"]');
    if (themeColorMeta) {
      themeColorMeta.content = theme === 'dark' ? '#1F2937' : '#FFFFFF';
    }

    // Trigger custom event for other components
    window.dispatchEvent(
      new CustomEvent('themeChanged', {
        detail: { theme },
      }),
    );
  }

  toggleTheme() {
    const currentTheme = document.documentElement.classList.contains(
      'dark-theme',
    )
      ? 'dark'
      : 'light';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    this.setTheme(newTheme);
    try {
      // Validate theme value before storing
      if (newTheme === 'light' || newTheme === 'dark') {
        localStorage.setItem('staydripped-theme', newTheme);
      }
    } catch (error) {
      console.warn('Unable to store theme preference:', error);
    }
  }

  setupThemeToggle() {
    // Look for theme toggle buttons (if any exist in the future)
    const toggleButtons = document.querySelectorAll('[data-theme-toggle]');

    toggleButtons.forEach((button) => {
      button.addEventListener('click', () => this.toggleTheme());
    });
  }

  getCurrentTheme() {
    return document.documentElement.classList.contains('dark-theme')
      ? 'dark'
      : 'light';
  }

  // Method to apply high contrast mode for accessibility
  setHighContrast(enabled) {
    const root = document.documentElement;

    if (enabled) {
      root.classList.add('high-contrast');
    } else {
      root.classList.remove('high-contrast');
    }

    localStorage.setItem('staydripped-high-contrast', enabled.toString());
  }

  // Method to apply reduced motion for accessibility
  setReducedMotion(enabled) {
    const root = document.documentElement;

    if (enabled) {
      root.classList.add('reduce-motion');
    } else {
      root.classList.remove('reduce-motion');
    }

    localStorage.setItem('staydripped-reduced-motion', enabled.toString());
  }

  // Initialize accessibility preferences
  initAccessibility() {
    // Check for saved high contrast preference
    const savedHighContrast = localStorage.getItem('staydripped-high-contrast');
    if (savedHighContrast === 'true') {
      this.setHighContrast(true);
    }

    // Check for saved reduced motion preference or system preference
    const savedReducedMotion = localStorage.getItem(
      'staydripped-reduced-motion',
    );
    const systemReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    if (savedReducedMotion === 'true' || systemReducedMotion) {
      this.setReducedMotion(true);
    }

    // Listen for system reduced motion changes
    window
      .matchMedia('(prefers-reduced-motion: reduce)')
      .addEventListener('change', (e) => {
        if (!localStorage.getItem('staydripped-reduced-motion')) {
          this.setReducedMotion(e.matches);
        }
      });
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    const themeManager = new ThemeManager();
    themeManager.initAccessibility();

    // Store theme manager safely without polluting global namespace
    if (!window.stayDrippedApp) {
      window.stayDrippedApp = {};
    }
    window.stayDrippedApp.themeManager = themeManager;
  });
} else {
  const themeManager = new ThemeManager();
  themeManager.initAccessibility();
  // Store theme manager safely without polluting global namespace
  if (!window.stayDrippedApp) {
    window.stayDrippedApp = {};
  }
  window.stayDrippedApp.themeManager = themeManager;
}

export default ThemeManager;
