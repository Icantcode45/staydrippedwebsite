/**
 * DOM Utilities for common operations
 */

export const DOM = {
  /**
   * Create element with attributes and content
   */
  create(tag, attributes = {}, content = '') {
    const element = document.createElement(tag);

    // Safely iterate over own properties only to prevent prototype pollution
    Object.keys(attributes).forEach((key) => {
      if (!Object.prototype.hasOwnProperty.call(attributes, key)) return;

      const value = attributes[key];
      if (key === 'className') {
        element.className = value;
      } else if (
        key === 'dataset' &&
        typeof value === 'object' &&
        value !== null
      ) {
        Object.keys(value).forEach((dataKey) => {
          if (!Object.prototype.hasOwnProperty.call(value, dataKey)) return;
          element.dataset[dataKey] = value[dataKey];
        });
      } else if (
        typeof key === 'string' &&
        /^[a-zA-Z][a-zA-Z0-9-]*$/.test(key)
      ) {
        element.setAttribute(key, value);
      }
    });

    if (content) {
      if (typeof content === 'string') {
        element.textContent = content;
      } else {
        element.appendChild(content);
      }
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
    if (!element || typeof handler !== 'function') return;

    const safeHandler = (e) => {
      try {
        handler(e);
      } catch (error) {
        // Log sanitized error message to prevent information disclosure
        console.error('Error in event handler');
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
