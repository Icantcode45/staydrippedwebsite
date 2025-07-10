/**
 * Premium Button Enhancement System
 * Adds sophisticated micro-interactions, feedback, and accessibility
 */

class PremiumButtonEnhancer {
  constructor() {
    this.buttons = [];
    this.rippleElements = new WeakMap();
    this.loadingTimeouts = new WeakMap();

    this.init();
  }

  init() {
    this.findButtons();
    this.enhanceButtons();
    this.setupGlobalListeners();
    this.addDynamicStyles();
  }

  findButtons() {
    this.buttons = Array.from(document.querySelectorAll('.btn'));
  }

  enhanceButtons() {
    this.buttons.forEach((button) => {
      this.enhanceButton(button);
    });
  }

  enhanceButton(button) {
    // Skip if already enhanced
    if (button.hasAttribute('data-enhanced')) return;

    button.setAttribute('data-enhanced', 'true');

    // Wrap text content for animations
    this.wrapButtonText(button);

    // Add ripple container
    this.addRippleContainer(button);

    // Add event listeners
    this.addButtonListeners(button);

    // Add accessibility enhancements
    this.enhanceAccessibility(button);

    // Add loading state functionality
    this.addLoadingState(button);
  }

  wrapButtonText(button) {
    const textNodes = Array.from(button.childNodes).filter(
      (node) => node.nodeType === Node.TEXT_NODE && node.textContent.trim(),
    );

    textNodes.forEach((textNode) => {
      const wrapper = document.createElement('span');
      wrapper.className = 'btn__text';
      wrapper.textContent = textNode.textContent;
      button.replaceChild(wrapper, textNode);
    });
  }

  addRippleContainer(button) {
    if (button.querySelector('.btn__ripple-container')) return;

    const rippleContainer = document.createElement('div');
    rippleContainer.className = 'btn__ripple-container';
    button.appendChild(rippleContainer);
    this.rippleElements.set(button, rippleContainer);
  }

  addButtonListeners(button) {
    // Mouse events
    button.addEventListener('mousedown', (e) =>
      this.handleMouseDown(e, button),
    );
    button.addEventListener('mouseup', (e) => this.handleMouseUp(e, button));
    button.addEventListener('mouseleave', (e) =>
      this.handleMouseLeave(e, button),
    );
    button.addEventListener('mouseenter', (e) =>
      this.handleMouseEnter(e, button),
    );

    // Touch events for mobile
    button.addEventListener(
      'touchstart',
      (e) => this.handleTouchStart(e, button),
      { passive: true },
    );
    button.addEventListener('touchend', (e) => this.handleTouchEnd(e, button), {
      passive: true,
    });

    // Keyboard events
    button.addEventListener('keydown', (e) => this.handleKeyDown(e, button));
    button.addEventListener('keyup', (e) => this.handleKeyUp(e, button));

    // Focus events
    button.addEventListener('focus', (e) => this.handleFocus(e, button));
    button.addEventListener('blur', (e) => this.handleBlur(e, button));

    // Click event for special handling
    button.addEventListener('click', (e) => this.handleClick(e, button));
  }

  handleMouseDown(event, button) {
    if (button.disabled) return;

    button.classList.add('btn--pressed');
    this.createRipple(event, button);
    this.addHapticFeedback();
  }

  handleMouseUp(event, button) {
    button.classList.remove('btn--pressed');
  }

  handleMouseLeave(event, button) {
    button.classList.remove('btn--pressed', 'btn--hovered');
  }

  handleMouseEnter(event, button) {
    if (button.disabled) return;
    button.classList.add('btn--hovered');
  }

  handleTouchStart(event, button) {
    if (button.disabled) return;

    button.classList.add('btn--pressed');

    // Create ripple for touch
    const touch = event.touches[0];
    const fakeEvent = {
      clientX: touch.clientX,
      clientY: touch.clientY,
    };
    this.createRipple(fakeEvent, button);
    this.addHapticFeedback();
  }

  handleTouchEnd(event, button) {
    button.classList.remove('btn--pressed');
  }

  handleKeyDown(event, button) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      button.classList.add('btn--pressed');
      this.addHapticFeedback();
    }
  }

  handleKeyUp(event, button) {
    if (event.key === 'Enter' || event.key === ' ') {
      button.classList.remove('btn--pressed');
      // Simulate click for keyboard activation
      setTimeout(() => button.click(), 50);
    }
  }

  handleFocus(event, button) {
    button.classList.add('btn--focused');
  }

  handleBlur(event, button) {
    button.classList.remove('btn--focused', 'btn--pressed');
  }

  handleClick(event, button) {
    // Special handling for different button types
    if (button.classList.contains('btn--phone')) {
      this.handlePhoneClick(event, button);
    } else if (button.classList.contains('btn--primary')) {
      this.handlePrimaryClick(event, button);
    }

    // Analytics tracking
    this.trackButtonClick(button);
  }

  handlePhoneClick(event, button) {
    // Add phone icon animation
    const icon = button.querySelector('svg');
    if (icon) {
      icon.style.transform = 'scale(1.2) rotate(10deg)';
      setTimeout(() => {
        icon.style.transform = '';
      }, 200);
    }
  }

  handlePrimaryClick(event, button) {
    // Add success pulse effect for primary buttons
    if (!button.href || button.href.startsWith('#')) {
      this.addSuccessPulse(button);
    }
  }

  createRipple(event, button) {
    const rippleContainer = this.rippleElements.get(button);
    if (!rippleContainer) return;

    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    const ripple = document.createElement('div');
    ripple.className = 'btn__ripple';
    ripple.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      left: ${x}px;
      top: ${y}px;
      background: rgba(255, 255, 255, 0.6);
      border-radius: 50%;
      transform: scale(0);
      animation: ripple-expand 0.6s ease-out;
      pointer-events: none;
    `;

    rippleContainer.appendChild(ripple);

    // Remove ripple after animation
    setTimeout(() => {
      if (ripple.parentNode) {
        ripple.parentNode.removeChild(ripple);
      }
    }, 600);
  }

  addHapticFeedback() {
    // Add subtle haptic feedback on supported devices
    if ('vibrate' in navigator) {
      navigator.vibrate(10);
    }
  }

  addSuccessPulse(button) {
    button.classList.add('btn--success-pulse');
    setTimeout(() => {
      button.classList.remove('btn--success-pulse');
    }, 600);
  }

  enhanceAccessibility(button) {
    // Ensure proper ARIA labels
    if (!button.getAttribute('aria-label') && !button.textContent.trim()) {
      const icon = button.querySelector('svg');
      if (icon) {
        button.setAttribute('aria-label', 'Button');
      }
    }

    // Add role if not present
    if (
      !button.getAttribute('role') &&
      button.tagName.toLowerCase() !== 'button'
    ) {
      button.setAttribute('role', 'button');
    }

    // Ensure keyboard accessibility
    if (button.tagName.toLowerCase() === 'a' && !button.getAttribute('href')) {
      button.setAttribute('tabindex', '0');
    }
  }

  addLoadingState(button) {
    const originalLoadingMethod = button.setLoading;

    button.setLoading = (loading = true) => {
      if (loading) {
        button.classList.add('btn--loading');
        button.disabled = true;

        // Auto-remove loading state after 5 seconds (safety)
        const timeout = setTimeout(() => {
          button.setLoading(false);
        }, 5000);
        this.loadingTimeouts.set(button, timeout);
      } else {
        button.classList.remove('btn--loading');
        button.disabled = false;

        const timeout = this.loadingTimeouts.get(button);
        if (timeout) {
          clearTimeout(timeout);
          this.loadingTimeouts.delete(button);
        }
      }
    };

    button.isLoading = () => button.classList.contains('btn--loading');
  }

  trackButtonClick(button) {
    const analytics = button.getAttribute('data-analytics');
    if (analytics && window.gtag) {
      window.gtag('event', 'click', {
        event_category: 'Button',
        event_label: analytics,
        value: 1,
      });
    }
  }

  setupGlobalListeners() {
    // Handle dynamically added buttons
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            const buttons = node.matches?.('.btn')
              ? [node]
              : Array.from(node.querySelectorAll?.('.btn') || []);

            buttons.forEach((button) => this.enhanceButton(button));
          }
        });
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  }

  addDynamicStyles() {
    if (document.getElementById('premium-button-styles')) return;

    const styles = document.createElement('style');
    styles.id = 'premium-button-styles';
    styles.textContent = `
      .btn__ripple-container {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        border-radius: inherit;
        overflow: hidden;
        pointer-events: none;
      }
      
      @keyframes ripple-expand {
        from {
          transform: scale(0);
          opacity: 1;
        }
        to {
          transform: scale(2);
          opacity: 0;
        }
      }
      
      .btn--pressed {
        transform: translateY(-1px) scale(0.98) !important;
        transition: all 0.1s ease !important;
      }
      
      .btn--hovered svg {
        transform: scale(1.05);
      }
      
      .btn--focused {
        outline: 2px solid rgba(0, 122, 255, 0.5);
        outline-offset: 2px;
      }
      
      .btn--success-pulse {
        animation: success-pulse 0.6s ease-out;
      }
      
      @keyframes success-pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); box-shadow: 0 0 20px rgba(52, 199, 89, 0.4); }
        100% { transform: scale(1); }
      }
      
      .btn--loading .btn__text {
        opacity: 0;
      }
      
      .btn--loading::before {
        animation: btn-loading-spin 0.8s linear infinite;
      }
      
      @keyframes btn-loading-spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }
      
      /* Enhanced focus for keyboard users */
      .btn:focus-visible {
        outline: 3px solid rgba(0, 122, 255, 0.5);
        outline-offset: 2px;
      }
      
      /* Smooth transitions for all states */
      .btn svg {
        transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1);
      }
      
      /* Mobile touch improvements */
      @media (hover: none) and (pointer: coarse) {
        .btn {
          min-height: 44px; /* iOS recommended touch target */
        }
        
        .btn--sm {
          min-height: 40px;
        }
        
        .btn--xs {
          min-height: 36px;
        }
      }
    `;

    document.head.appendChild(styles);
  }

  // Public API methods
  refresh() {
    this.findButtons();
    this.enhanceButtons();
  }

  enhanceNewButton(button) {
    if (button && button.classList.contains('btn')) {
      this.enhanceButton(button);
    }
  }

  destroy() {
    // Clean up event listeners and timeouts
    this.buttons.forEach((button) => {
      const timeout = this.loadingTimeouts.get(button);
      if (timeout) {
        clearTimeout(timeout);
      }
    });

    // Remove dynamic styles
    const styles = document.getElementById('premium-button-styles');
    if (styles) {
      styles.remove();
    }
  }
}

// Utility functions for external use
window.ButtonUtils = {
  setLoading: (selector, loading = true) => {
    const buttons =
      typeof selector === 'string'
        ? Array.from(document.querySelectorAll(selector))
        : [selector];

    buttons.forEach((button) => {
      if (button && button.setLoading) {
        button.setLoading(loading);
      }
    });
  },

  addSuccessState: (selector) => {
    const buttons =
      typeof selector === 'string'
        ? Array.from(document.querySelectorAll(selector))
        : [selector];

    buttons.forEach((button) => {
      if (button) {
        button.classList.add('btn--success-pulse');
        setTimeout(() => {
          button.classList.remove('btn--success-pulse');
        }, 600);
      }
    });
  },

  disableButton: (selector, disabled = true) => {
    const buttons =
      typeof selector === 'string'
        ? Array.from(document.querySelectorAll(selector))
        : [selector];

    buttons.forEach((button) => {
      if (button) {
        button.disabled = disabled;
        if (disabled) {
          button.setAttribute('aria-disabled', 'true');
        } else {
          button.removeAttribute('aria-disabled');
        }
      }
    });
  },
};

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.premiumButtonEnhancer = new PremiumButtonEnhancer();
  });
} else {
  window.premiumButtonEnhancer = new PremiumButtonEnhancer();
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
  module.exports = PremiumButtonEnhancer;
}
