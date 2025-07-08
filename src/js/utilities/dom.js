/**
 * DOM Utilities for common operations
 */

export const DOM = {
  /**
   * Create element with attributes and content
   */
  create(tag, attributes = {}, content = "") {
    const element = document.createElement(tag);

    Object.entries(attributes).forEach(([key, value]) => {
      if (key === "className") {
        element.className = value;
      } else if (key === "dataset") {
        Object.entries(value).forEach(([dataKey, dataValue]) => {
          element.dataset[dataKey] = dataValue;
        });
      } else {
        element.setAttribute(key, value);
      }
    });

    if (content) {
      element.innerHTML = content;
    }

    return element;
  },

  /**
   * Find element safely
   */
  find(selector, context = document) {
    try {
      return context.querySelector(selector);
    } catch (error) {
      console.warn(`Invalid selector: ${selector}`);
      return null;
    }
  },

  /**
   * Find all elements safely
   */
  findAll(selector, context = document) {
    try {
      return Array.from(context.querySelectorAll(selector));
    } catch (error) {
      console.warn(`Invalid selector: ${selector}`);
      return [];
    }
  },

  /**
   * Add event listener with error handling
   */
  on(element, event, handler, options = {}) {
    if (!element || typeof handler !== "function") return;

    const safeHandler = (e) => {
      try {
        handler(e);
      } catch (error) {
        console.error("Error in event handler:", error);
      }
    };

    element.addEventListener(event, safeHandler, options);
    return () => element.removeEventListener(event, safeHandler, options);
  },

  /**
   * Toggle class with optional condition
   */
  toggleClass(element, className, condition) {
    if (!element) return;

    if (condition !== undefined) {
      element.classList.toggle(className, condition);
    } else {
      element.classList.toggle(className);
    }
  },

  /**
   * Set multiple styles at once
   */
  setStyles(element, styles) {
    if (!element || !styles) return;

    Object.assign(element.style, styles);
  },

  /**
   * Remove element safely
   */
  remove(element) {
    if (element && element.parentNode) {
      element.parentNode.removeChild(element);
    }
  },

  /**
   * Check if element is in viewport
   */
  isInViewport(element) {
    if (!element) return false;

    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= window.innerHeight &&
      rect.right <= window.innerWidth
    );
  },
};

export default DOM;
