/**
 * Google Reviews Widget Module
 * Handles Google Reviews display and interactions
 */

class GoogleReviewsWidget {
  constructor() {
    this.init();
  }

  init() {
    this.setupAnimations();
    this.setupEventListeners();
    this.loadReviewsOnScroll();
  }

  setupAnimations() {
    const reviewCards = document.querySelectorAll(".google-review-card");
    const headerCard = document.querySelector(".reviews-header-card");

    // Intersection Observer for fade-in animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
        }
      });
    }, observerOptions);

    // Initialize cards with hidden state
    if (headerCard) {
      headerCard.style.opacity = "0";
      headerCard.style.transform = "translateY(20px)";
      headerCard.style.transition =
        "opacity 0.6s ease-out, transform 0.6s ease-out";
      observer.observe(headerCard);
    }

    reviewCards.forEach((card, index) => {
      card.style.opacity = "0";
      card.style.transform = "translateY(20px)";
      card.style.transition = `opacity 0.6s ease-out ${index * 0.1}s, transform 0.6s ease-out ${index * 0.1}s`;
      observer.observe(card);
    });
  }

  setupEventListeners() {
    // Handle review card clicks for enhanced interaction
    const reviewCards = document.querySelectorAll(".google-review-card");

    reviewCards.forEach((card) => {
      card.addEventListener("mouseenter", this.onCardHover.bind(this));
      card.addEventListener("mouseleave", this.onCardLeave.bind(this));
      card.addEventListener("click", this.onCardClick.bind(this));
    });

    // Handle "View All Reviews" button
    const viewAllBtn = document.querySelector(".view-all-reviews-btn");
    if (viewAllBtn) {
      viewAllBtn.addEventListener("click", this.trackReviewsClick.bind(this));
    }

    // Handle Google logo click
    const googleLogo = document.querySelector(".google-logo");
    if (googleLogo) {
      googleLogo.addEventListener("click", this.onGoogleLogoClick.bind(this));
      googleLogo.style.cursor = "pointer";
    }
  }

  onCardHover(event) {
    const card = event.currentTarget;
    const googleIcon = card.querySelector(".google-icon");

    if (googleIcon) {
      googleIcon.style.opacity = "1";
      googleIcon.style.transform = "scale(1.1)";
      googleIcon.style.transition = "opacity 0.3s ease, transform 0.3s ease";
    }
  }

  onCardLeave(event) {
    const card = event.currentTarget;
    const googleIcon = card.querySelector(".google-icon");

    if (googleIcon) {
      googleIcon.style.opacity = "0.7";
      googleIcon.style.transform = "scale(1)";
    }
  }

  onCardClick(event) {
    // Optional: Add click analytics or interaction
    this.trackReviewInteraction("card_click");
  }

  onGoogleLogoClick() {
    // Open Google reviews in new tab
    window.open(
      "https://www.google.com/search?q=Stay+Dripped+Mobile+IV+reviews",
      "_blank",
      "noopener,noreferrer",
    );
    this.trackReviewInteraction("logo_click");
  }

  trackReviewsClick(event) {
    // Track when user clicks "View All Reviews"
    this.trackReviewInteraction("view_all_click");
  }

  trackReviewInteraction(action) {
    // Analytics tracking (if Google Analytics is available)
    if (typeof gtag !== "undefined") {
      gtag("event", "reviews_interaction", {
        event_category: "Google Reviews Widget",
        event_label: action,
        value: 1,
      });
    }

    // Custom analytics tracking
    if (window.analytics && typeof window.analytics.track === "function") {
      window.analytics.track("Reviews Widget Interaction", {
        action: action,
        section: "google_reviews",
      });
    }
  }

  loadReviewsOnScroll() {
    // Simulate loading more reviews on scroll (for future enhancement)
    const reviewsSection = document.querySelector(".google-reviews");
    if (!reviewsSection) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.animateStars();
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 },
    );

    observer.observe(reviewsSection);
  }

  animateStars() {
    // Add a subtle animation to the main rating stars
    const starsLarge = document.querySelector(".stars-large");
    if (starsLarge) {
      starsLarge.style.animation = "starGlow 2s ease-in-out";
    }

    // Add CSS for star glow animation
    if (!document.querySelector("#star-glow-styles")) {
      const style = document.createElement("style");
      style.id = "star-glow-styles";
      style.textContent = `
        @keyframes starGlow {
          0%, 100% { 
            text-shadow: 0 0 5px rgba(255, 215, 0, 0.3); 
          }
          50% { 
            text-shadow: 0 0 15px rgba(255, 215, 0, 0.6), 0 0 25px rgba(255, 215, 0, 0.4); 
          }
        }
      `;
      document.head.appendChild(style);
    }
  }

  // Method to update reviews data (for future API integration)
  updateReviews(reviewsData) {
    if (!reviewsData || !Array.isArray(reviewsData)) return;

    const reviewsGrid = document.querySelector(".reviews-grid");
    if (!reviewsGrid) return;

    // Clear existing reviews
    reviewsGrid.innerHTML = "";

    // Add new reviews
    reviewsData.forEach((review) => {
      const reviewCard = this.createReviewCard(review);
      reviewsGrid.appendChild(reviewCard);
    });

    // Re-setup animations for new cards
    this.setupAnimations();
  }

  createReviewCard(reviewData) {
    const card = document.createElement("div");
    card.className = "google-review-card";

    const avatarContent = reviewData.avatar
      ? `<img src="${reviewData.avatar}" alt="${reviewData.name}" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex'" />`
      : "";

    const avatarFallback = reviewData.name
      ? reviewData.name
          .split(" ")
          .map((n) => n.charAt(0))
          .join("")
          .toUpperCase()
      : "??";

    card.innerHTML = `
      <div class="review-header">
        <div class="reviewer-avatar">
          ${avatarContent}
          <div class="avatar-fallback" style="${reviewData.avatar ? "display: none" : "display: flex"}">${avatarFallback}</div>
        </div>
        <div class="reviewer-info">
          <h4 class="reviewer-name">${reviewData.name || "Anonymous"}</h4>
          <div class="review-stars">${"★".repeat(reviewData.rating || 5)}</div>
          <div class="review-date">${reviewData.date || "Recently"}</div>
        </div>
        <div class="google-icon">
          <svg width="20" height="20" viewBox="0 0 48 48" fill="none">
            <path d="M47.532 24.43C47.532 22.437 47.362 20.443 47.005 18.496H24V29.595H36.4229C35.8571 32.487 34.3829 35.0972 32.112 36.8676V43.0027H39.9548C44.6762 38.618 47.532 31.808 47.532 24.43Z" fill="#4285F4"/>
            <path d="M24 48C30.48 48 35.952 45.84 39.9548 43.0027L32.112 36.8676C30.0048 38.3488 27.288 39.168 24 39.168C17.7617 39.168 12.4571 34.9473 10.5376 29.1902H2.96429V35.336C6.44971 42.1357 14.6109 48 24 48Z" fill="#34A853"/>
            <path d="M10.5376 29.1902C9.63976 26.6984 9.15714 23.996 9.15714 21.168C9.15714 18.34 9.63976 15.6376 10.5376 13.1458V7H2.96429C0.984286 11.11 0 15.8857 0 21.168C0 26.4503 0.984286 31.226 2.96429 35.336L10.5376 29.1902Z" fill="#FBBC04"/>
            <path d="M24 9.672C27.5143 9.672 30.6571 11 33.0229 13.2472L39.5457 6.7248C35.8857 3.408 30.48 2 24 2C14.6109 2 6.44971 7.8643 2.96429 14.664L10.5376 20.8098C12.4571 15.0527 17.7617 10.832 24 9.672Z" fill="#EA4335"/>
          </svg>
        </div>
      </div>
      <p class="review-text">${reviewData.text || ""}</p>
    `;

    return card;
  }
}

// Initialize the Google Reviews Widget when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new GoogleReviewsWidget();
});

// Export for module systems
if (typeof module !== "undefined" && module.exports) {
  module.exports = GoogleReviewsWidget;
}
