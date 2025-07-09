// Analytics and Tracking Management

class AnalyticsManager {
  constructor() {
    this.isEnabled = false;
    this.consentGiven = false;
    this.trackingQueue = [];
    this.isDebug =
      typeof process !== "undefined" && process.env?.NODE_ENV === "development";

    this.init();
  }

  init() {
    // Check for existing consent
    this.checkConsent();

    // Initialize analytics if consent is given
    if (this.consentGiven) {
      this.enableTracking();
    } else {
      this.showConsentBanner();
    }

    // Set up event listeners
    this.setupEventListeners();
  }

  checkConsent() {
    try {
      const consent = localStorage.getItem("analytics_consent");
      // Validate the stored value to prevent injection
      this.consentGiven = consent === "true";
    } catch (error) {
      // Handle localStorage access errors (e.g., in private browsing)
      this.consentGiven = false;
    }
  }

  enableTracking() {
    this.isEnabled = true;

    // Load Google Analytics if not already loaded
    this.loadGoogleAnalytics();

    // Process queued events
    this.processQueue();

    // Track page view
    this.trackPageView();
  }

  loadGoogleAnalytics() {
    // Only load if GA ID is available and not already loaded
    const gaId = "G-XXXXXXXXXX"; // Replace with actual GA4 ID

    if (!window.gtag && gaId !== "G-XXXXXXXXXX") {
      // Load GA4
      const script = document.createElement("script");
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
      document.head.appendChild(script);

      // Initialize gtag
      window.dataLayer = window.dataLayer || [];
      window.gtag = function () {
        dataLayer.push(arguments);
      };

      gtag("js", new Date());
      gtag("config", gaId, {
        anonymize_ip: true,
        cookie_flags: "SameSite=None;Secure",
      });
    }
  }

  showConsentBanner() {
    if (document.querySelector(".consent-banner")) return;

    const banner = this.createConsentBanner();
    this.addConsentStyles();
    document.body.appendChild(banner);
    this.setupConsentHandlers(banner);
  }

  createConsentBanner() {
    const banner = document.createElement("div");
    banner.className = "consent-banner";

    const content = document.createElement("div");
    content.className = "consent-banner__content";

    const text = document.createElement("p");
    text.textContent =
      "We use cookies to improve your experience and analyze site usage. By continuing to browse, you consent to our use of cookies.";

    const actions = document.createElement("div");
    actions.className = "consent-banner__actions";

    const rejectBtn = this.createConsentButton(
      "reject",
      "Decline",
      "btn btn--sm btn--secondary",
    );
    const acceptBtn = this.createConsentButton(
      "accept",
      "Accept",
      "btn btn--sm btn--primary",
    );

    actions.appendChild(rejectBtn);
    actions.appendChild(acceptBtn);
    content.appendChild(text);
    content.appendChild(actions);
    banner.appendChild(content);

    return banner;
  }

  createConsentButton(consentValue, textContent, className) {
    const button = document.createElement("button");
    button.className = className;
    button.textContent = textContent;
    button.dataset.consent = consentValue;
    return button;
  }

  addConsentStyles() {
    if (document.querySelector("#consent-styles")) return;

    const styleSheet = document.createElement("style");
    styleSheet.id = "consent-styles";
    styleSheet.textContent = `
      .consent-banner {
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(26, 42, 71, 0.95);
        color: white;
        padding: 1rem;
        z-index: 1000;
        backdrop-filter: blur(10px);
      }
      .consent-banner__content {
        max-width: 1200px;
        margin: 0 auto;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
      }
      .consent-banner__actions {
        display: flex;
        gap: 0.5rem;
      }
      @media (max-width: 768px) {
        .consent-banner__content {
          flex-direction: column;
          text-align: center;
        }
      }
    `;
    document.head.appendChild(styleSheet);
  }

  setupConsentHandlers(banner) {
    banner.addEventListener("click", (e) => {
      const { consent } = e.target.dataset;
      if (consent === "accept") {
        this.giveConsent();
        banner.remove();
      } else if (consent === "reject") {
        this.rejectConsent();
        banner.remove();
      }
    });
  }

  giveConsent() {
    localStorage.setItem("analytics_consent", "true");
    this.consentGiven = true;
    this.enableTracking();
  }

  rejectConsent() {
    localStorage.setItem("analytics_consent", "false");
    this.consentGiven = false;
  }

  setupEventListeners() {
    // Track button clicks
    document.addEventListener("click", (e) => {
      if (e.target.matches(".btn, .card--interactive, .cta-button")) {
        this.trackEvent("click", "button", {
          text: e.target.textContent.trim(),
          url: window.location.pathname,
        });
      }
    });

    // Track form submissions
    document.addEventListener("submit", (e) => {
      if (e.target.matches("form")) {
        this.trackEvent("submit", "form", {
          form_id: e.target.id || "unknown",
          url: window.location.pathname,
        });
      }
    });

    // Track outbound links
    document.addEventListener("click", (e) => {
      if (e.target.tagName === "A" && e.target.href) {
        const isOutbound = !e.target.href.includes(window.location.hostname);
        if (isOutbound && e.target.href.startsWith("http")) {
          this.trackEvent("click", "outbound_link", {
            url: e.target.href,
            text: e.target.textContent.trim(),
          });
        }
      }
    });

    // Track scroll depth
    this.trackScrollDepth();
  }

  trackEvent(action, category, parameters = {}) {
    const eventData = {
      action,
      category,
      timestamp: Date.now(),
      url: window.location.pathname,
      ...parameters,
    };

    if (this.isEnabled && window.gtag) {
      gtag("event", action, {
        event_category: category,
        ...parameters,
      });
    } else {
      // Queue the event for later
      this.trackingQueue.push(eventData);
    }

    // Also send to custom analytics if needed
    this.sendToCustomAnalytics(eventData);
  }

  trackPageView() {
    if (this.isEnabled && window.gtag) {
      gtag("event", "page_view", {
        page_title: document.title,
        page_location: window.location.href,
      });
    }
  }

  trackScrollDepth() {
    const tracker = new ScrollDepthTracker(this);
    tracker.init();
  }

  processQueue() {
    while (this.trackingQueue.length > 0) {
      const event = this.trackingQueue.shift();
      this.trackEvent(event.action, event.category, event);
    }
  }
}

class ScrollDepthTracker {
  constructor(analyticsManager) {
    this.analytics = analyticsManager;
    this.maxScroll = 0;
    this.thresholds = [25, 50, 75, 90];
    this.tracked = new Set();
    this.ticking = false;
  }

  init() {
    const scrollHandler = () => this.handleScroll();
    window.addEventListener("scroll", scrollHandler, { passive: true });
  }

  handleScroll() {
    if (!this.ticking) {
      requestAnimationFrame(() => {
        this.trackScroll();
        this.ticking = false;
      });
      this.ticking = true;
    }
  }

  trackScroll() {
    const scrollPercent = this.calculateScrollPercent();

    if (scrollPercent > this.maxScroll) {
      this.maxScroll = scrollPercent;
      this.checkThresholds(scrollPercent);
    }
  }

  calculateScrollPercent() {
    return Math.round(
      (window.scrollY /
        (document.documentElement.scrollHeight - window.innerHeight)) *
        100,
    );
  }

  checkThresholds(scrollPercent) {
    this.thresholds.forEach((threshold) => {
      if (scrollPercent >= threshold && !this.tracked.has(threshold)) {
        this.tracked.add(threshold);
        this.analytics.trackEvent("scroll", "scroll_depth", {
          scroll_depth: threshold,
        });
      }
    });
  }

  sendToCustomAnalytics(eventData) {
    // Implement custom analytics endpoint if needed
    // This could be your own analytics server or third-party service
    if (this.isDebug) {
      console.log("Analytics Event:", eventData);
    }
  }

  // Public method to track custom events
  static track(action, category, parameters = {}) {
    if (window.analyticsManager) {
      window.analyticsManager.trackEvent(action, category, parameters);
    }
  }
}

// Initialize analytics manager
const analyticsManager = new AnalyticsManager();
window.analyticsManager = analyticsManager;

export default AnalyticsManager;
