// Enhanced Mobile Menu Functionality with 3D Effects and Professional Interactions

class MobileMenu {
  constructor() {
    this.toggle = document.querySelector(
      ".mobile-menu-btn, .mobile-menu-toggle",
    );
    this.menu = document.querySelector(".mobile-menu");
    this.overlay = document.querySelector(".mobile-menu__overlay");
    this.closeBtn = document.querySelector(".mobile-menu__close");
    this.links = document.querySelectorAll(".mobile-menu__link");
    this.isOpen = false;
    this.isAnimating = false;
    this.touchStartY = 0;
    this.touchEndY = 0;

    this.init();
  }

  init() {
    if (!this.toggle || !this.menu) return;

    // Bind event listeners
    this.toggle.addEventListener("click", (e) => {
      e.preventDefault();
      this.toggleMenu();
    });

    if (this.closeBtn) {
      this.closeBtn.addEventListener("click", (e) => {
        e.preventDefault();
        this.closeMenu();
      });
    }

    if (this.overlay) {
      this.overlay.addEventListener("click", () => this.closeMenu());
    }

    // Close menu when clicking on links
    this.links.forEach((link) => {
      link.addEventListener("click", (e) => {
        // Don't close for external links or phone/sms links
        const href = link.getAttribute("href");
        if (
          href &&
          !href.startsWith("tel:") &&
          !href.startsWith("sms:") &&
          !href.startsWith("mailto:")
        ) {
          setTimeout(() => this.closeMenu(), 150);
        }
      });
    });

    // Close menu on escape key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && this.isOpen) {
        this.closeMenu();
      }
    });

    // Handle window resize
    window.addEventListener("resize", () => {
      if (window.innerWidth >= 1024 && this.isOpen) {
        this.closeMenu();
      }
    });

    // Prevent scroll when menu is open
    this.menu.addEventListener("touchmove", (e) => {
      e.stopPropagation();
    });

    // Add smooth reveal animation for menu items
    this.addMenuItemAnimations();

    // Add touch gestures
    this.addTouchGestures();

    // Add enhanced keyboard navigation
    this.addKeyboardNavigation();
  }

  toggleMenu() {
    if (this.isAnimating) return;

    if (this.isOpen) {
      this.closeMenu();
    } else {
      this.openMenu();
    }
  }

  addTouchGestures() {
    if (!this.menu) return;

    this.menu.addEventListener(
      "touchstart",
      (e) => {
        this.touchStartY = e.touches[0].clientY;
      },
      { passive: true },
    );

    this.menu.addEventListener(
      "touchend",
      (e) => {
        this.touchEndY = e.changedTouches[0].clientY;
        this.handleSwipeGesture();
      },
      { passive: true },
    );
  }

  handleSwipeGesture() {
    const swipeDistance = this.touchStartY - this.touchEndY;
    const minSwipeDistance = 50;

    // Swipe up to close menu
    if (swipeDistance > minSwipeDistance) {
      this.closeMenu();
    }
  }

  addKeyboardNavigation() {
    if (!this.menu) return;

    this.menu.addEventListener("keydown", (e) => {
      const focusableElements = this.menu.querySelectorAll(
        'a, button, [tabindex]:not([tabindex="-1"])',
      );
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (e.key === "Tab") {
        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    });
  }

  openMenu() {
    if (this.isAnimating) return;

    this.isAnimating = true;
    this.isOpen = true;

    // Add classes
    this.menu.classList.add("active");
    this.toggle.classList.add("active");
    document.body.classList.add("menu-open");

    // Prevent scrolling
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    // Update toggle button aria
    this.toggle.setAttribute("aria-expanded", "true");

    // Animate hamburger
    this.animateHamburger(true);

    // Focus management for accessibility
    this.trapFocus();

    // Animate menu items
    this.animateMenuItems(true);

    // Trigger custom event
    window.dispatchEvent(new CustomEvent("mobileMenuOpened"));

    setTimeout(() => {
      this.isAnimating = false;
    }, 300);
  }

  closeMenu() {
    if (this.isAnimating) return;

    this.isAnimating = true;
    this.isOpen = false;

    // Animate out menu items first
    this.animateMenuItems(false);

    setTimeout(() => {
      // Remove classes
      this.menu.classList.remove("active");
      this.toggle.classList.remove("active");
      document.body.classList.remove("menu-open");

      // Restore scrolling
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";

      // Update toggle button aria
      this.toggle.setAttribute("aria-expanded", "false");

      // Animate hamburger
      this.animateHamburger(false);

      // Return focus to toggle button
      this.toggle.focus();

      // Trigger custom event
      window.dispatchEvent(new CustomEvent("mobileMenuClosed"));

      this.isAnimating = false;
    }, 150);
  }

  animateHamburger(open) {
    const spans = this.toggle.querySelectorAll(".hamburger span");

    if (open) {
      spans[0].style.transform = "rotate(45deg) translate(6px, 6px)";
      spans[1].style.opacity = "0";
      spans[2].style.transform = "rotate(-45deg) translate(6px, -6px)";
    } else {
      spans[0].style.transform = "";
      spans[1].style.opacity = "";
      spans[2].style.transform = "";
    }
  }

  trapFocus() {
    const focusableElements = this.menu.querySelectorAll(
      'a[href], button:not([disabled]), textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select',
    );

    const firstFocusableElement = focusableElements[0];
    const lastFocusableElement =
      focusableElements[focusableElements.length - 1];

    // Focus first element
    if (firstFocusableElement) {
      setTimeout(() => firstFocusableElement.focus(), 100);
    }

    // Handle tab navigation
    const handleTabKey = (e) => {
      if (e.key === "Tab") {
        if (e.shiftKey) {
          // Shift + Tab
          if (document.activeElement === firstFocusableElement) {
            lastFocusableElement.focus();
            e.preventDefault();
          }
        } else {
          // Tab
          if (document.activeElement === lastFocusableElement) {
            firstFocusableElement.focus();
            e.preventDefault();
          }
        }
      }
    };

    // Add event listener
    this.menu.addEventListener("keydown", handleTabKey);

    // Store reference to remove later
    this.tabHandler = handleTabKey;
  }

  addMenuItemAnimations() {
    // Add CSS classes for animation
    const menuItems = this.menu.querySelectorAll(".mobile-menu__item");
    menuItems.forEach((item, index) => {
      item.style.setProperty("--delay", `${index * 50}ms`);
    });
  }

  animateMenuItems(show) {
    const menuItems = this.menu.querySelectorAll(".mobile-menu__item");

    menuItems.forEach((item, index) => {
      const delay = show ? index * 50 : (menuItems.length - index - 1) * 30;

      setTimeout(() => {
        if (show) {
          item.style.transform = "translateX(0)";
          item.style.opacity = "1";
        } else {
          item.style.transform = "translateX(-20px)";
          item.style.opacity = "0";
        }
      }, delay);
    });
  }

  // Method to programmatically close menu
  close() {
    if (this.isOpen) {
      this.closeMenu();
    }
  }

  // Method to check if menu is open
  get opened() {
    return this.isOpen;
  }
}

// Initialize mobile menu when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  new MobileMenu();
});

export default MobileMenu;
