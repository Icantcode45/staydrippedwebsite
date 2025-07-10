/**
 * Premium Header Enhancement System
 * Provides smooth interactions, scroll effects, and mobile menu functionality
 */

class HeaderEnhancer {
  constructor() {
    this.header = document.querySelector('.site-header');
    this.mobileToggle = document.querySelector('.mobile-menu-toggle');
    this.mobileMenu = document.querySelector('.mobile-menu');
    this.mobileClose = document.querySelector('.mobile-menu__close');
    this.lastScrollY = window.scrollY;
    this.isMenuOpen = false;

    this.init();
  }

  init() {
    if (!this.header) return;

    this.bindEvents();
    this.setupScrollEffects();
    this.setupMobileMenu();
    this.setupKeyboardNavigation();
    this.setupSmoothScrolling();
    this.addLoadingStates();
  }

  bindEvents() {
    // Scroll effects
    window.addEventListener('scroll', this.handleScroll.bind(this), {
      passive: true,
    });

    // Mobile menu toggle
    if (this.mobileToggle) {
      this.mobileToggle.addEventListener(
        'click',
        this.toggleMobileMenu.bind(this),
      );
    }

    // Mobile menu close
    if (this.mobileClose) {
      this.mobileClose.addEventListener(
        'click',
        this.closeMobileMenu.bind(this),
      );
    }

    // Close menu on overlay click
    if (this.mobileMenu) {
      const overlay = this.mobileMenu.querySelector('.mobile-menu__overlay');
      if (overlay) {
        overlay.addEventListener('click', this.closeMobileMenu.bind(this));
      }
    }

    // Resize handler
    window.addEventListener('resize', this.handleResize.bind(this));

    // Escape key to close menu
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isMenuOpen) {
        this.closeMobileMenu();
      }
    });
  }

  setupScrollEffects() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.header.classList.remove('scrolled');
          } else {
            this.header.classList.add('scrolled');
          }
        });
      },
      { threshold: 0.1 },
    );

    // Create a sentinel element at the top of the page
    const sentinel = document.createElement('div');
    sentinel.style.height = '1px';
    sentinel.style.position = 'absolute';
    sentinel.style.top = '0';
    sentinel.style.left = '0';
    sentinel.style.width = '100%';
    sentinel.style.pointerEvents = 'none';
    document.body.prepend(sentinel);

    observer.observe(sentinel);
  }

  handleScroll() {
    const currentScrollY = window.scrollY;

    // Add/remove scrolled class based on scroll position
    if (currentScrollY > 20) {
      this.header.classList.add('scrolled');
    } else {
      this.header.classList.remove('scrolled');
    }

    // Hide/show header on scroll (optional)
    if (currentScrollY > this.lastScrollY && currentScrollY > 100) {
      this.header.style.transform = 'translateY(-100%)';
    } else {
      this.header.style.transform = 'translateY(0)';
    }

    this.lastScrollY = currentScrollY;
  }

  setupMobileMenu() {
    // Add animation classes
    if (this.mobileMenu) {
      this.mobileMenu.style.transition =
        'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
    }
  }

  toggleMobileMenu() {
    if (this.isMenuOpen) {
      this.closeMobileMenu();
    } else {
      this.openMobileMenu();
    }
  }

  openMobileMenu() {
    if (!this.mobileMenu || !this.mobileToggle) return;

    this.isMenuOpen = true;
    this.mobileMenu.classList.add('active');
    this.mobileToggle.classList.add('active');
    this.mobileToggle.setAttribute('aria-expanded', 'true');

    // Prevent body scroll
    document.body.style.overflow = 'hidden';

    // Focus management
    this.mobileMenu.setAttribute('aria-hidden', 'false');

    // Animate menu items
    const menuItems = this.mobileMenu.querySelectorAll('.mobile-menu__link');
    menuItems.forEach((item, index) => {
      item.style.transform = 'translateX(-20px)';
      item.style.opacity = '0';

      setTimeout(
        () => {
          item.style.transition = 'all 0.3s ease-out';
          item.style.transform = 'translateX(0)';
          item.style.opacity = '1';
        },
        index * 100 + 100,
      );
    });

    // Add ripple effect to toggle button
    this.addRippleEffect(this.mobileToggle);
  }

  closeMobileMenu() {
    if (!this.mobileMenu || !this.mobileToggle) return;

    this.isMenuOpen = false;
    this.mobileMenu.classList.remove('active');
    this.mobileToggle.classList.remove('active');
    this.mobileToggle.setAttribute('aria-expanded', 'false');

    // Restore body scroll
    document.body.style.overflow = '';

    // Focus management
    this.mobileMenu.setAttribute('aria-hidden', 'true');

    // Reset menu items animation
    const menuItems = this.mobileMenu.querySelectorAll('.mobile-menu__link');
    menuItems.forEach((item) => {
      item.style.transition = '';
      item.style.transform = '';
      item.style.opacity = '';
    });
  }

  handleResize() {
    // Close mobile menu on desktop
    if (window.innerWidth >= 1024 && this.isMenuOpen) {
      this.closeMobileMenu();
    }
  }

  setupKeyboardNavigation() {
    // Enhanced focus management for navigation
    const navLinks = this.header.querySelectorAll('a, button');

    navLinks.forEach((link) => {
      link.addEventListener('focus', (e) => {
        e.target.classList.add('focused');
      });

      link.addEventListener('blur', (e) => {
        e.target.classList.remove('focused');
      });
    });

    // Dropdown keyboard navigation
    const dropdownItems = this.header.querySelectorAll('.main-nav__item');
    dropdownItems.forEach((item) => {
      const link = item.querySelector('.main-nav__link');
      const dropdown = item.querySelector('.main-nav__dropdown');

      if (link && dropdown) {
        link.addEventListener('keydown', (e) => {
          if (e.key === 'ArrowDown' || e.key === 'Enter') {
            e.preventDefault();
            const firstDropdownLink = dropdown.querySelector(
              '.main-nav__dropdown-link',
            );
            if (firstDropdownLink) {
              firstDropdownLink.focus();
            }
          }
        });
      }
    });
  }

  setupSmoothScrolling() {
    // Smooth scroll for anchor links
    const anchorLinks = this.header.querySelectorAll('a[href^="#"]');

    anchorLinks.forEach((link) => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href === '#') return;

        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();

          const headerHeight = this.header.offsetHeight;
          const targetPosition = target.offsetTop - headerHeight - 20;

          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth',
          });

          // Close mobile menu if open
          if (this.isMenuOpen) {
            this.closeMobileMenu();
          }
        }
      });
    });
  }

  addLoadingStates() {
    // Add loading states to CTA buttons
    const ctaButtons = this.header.querySelectorAll('.btn--primary');

    ctaButtons.forEach((button) => {
      button.addEventListener('click', (e) => {
        // Don't add loading state if it's a phone link or already loading
        if (
          button.href &&
          (button.href.startsWith('tel:') || button.href.startsWith('mailto:'))
        ) {
          return;
        }

        if (button.classList.contains('btn--loading')) {
          return;
        }

        // Add ripple effect
        this.addRippleEffect(button, e);
      });
    });
  }

  addRippleEffect(element, event = null) {
    const ripple = document.createElement('div');
    ripple.classList.add('ripple-effect');

    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);

    let x, y;
    if (event) {
      x = event.clientX - rect.left - size / 2;
      y = event.clientY - rect.top - size / 2;
    } else {
      x = rect.width / 2 - size / 2;
      y = rect.height / 2 - size / 2;
    }

    ripple.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      left: ${x}px;
      top: ${y}px;
      background: rgba(255, 255, 255, 0.3);
      border-radius: 50%;
      transform: scale(0);
      animation: ripple-animation 0.6s ease-out;
      pointer-events: none;
      z-index: 1;
    `;

    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    element.appendChild(ripple);

    // Remove ripple after animation
    setTimeout(() => {
      if (ripple.parentNode) {
        ripple.parentNode.removeChild(ripple);
      }
    }, 600);
  }

  // Public methods for external control
  showHeader() {
    this.header.style.transform = 'translateY(0)';
  }

  hideHeader() {
    this.header.style.transform = 'translateY(-100%)';
  }

  isHeaderScrolled() {
    return this.header.classList.contains('scrolled');
  }
}

// CSS for ripple animation
const rippleStyles = `
  @keyframes ripple-animation {
    to {
      transform: scale(2);
      opacity: 0;
    }
  }
  
  .ripple-effect {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.3);
    transform: scale(0);
    animation: ripple-animation 0.6s ease-out;
    pointer-events: none;
  }
  
  .focused {
    outline: 2px solid rgba(0, 122, 255, 0.5);
    outline-offset: 2px;
  }
`;

// Inject styles
const styleSheet = document.createElement('style');
styleSheet.textContent = rippleStyles;
document.head.appendChild(styleSheet);

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.headerEnhancer = new HeaderEnhancer();
  });
} else {
  window.headerEnhancer = new HeaderEnhancer();
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
  module.exports = HeaderEnhancer;
}
