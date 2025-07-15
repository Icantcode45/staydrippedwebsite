class CookieConsent {
  constructor() {
    this.consentKey = 'cookies_accepted';
    document.addEventListener('DOMContentLoaded', () => this.init());
  }

  init() {
    if (!this.isAccepted()) {
      this.renderBanner();
    }
  }

  isAccepted() {
    try {
      return localStorage.getItem(this.consentKey) === 'true';
    } catch (e) {
      return false;
    }
  }

  setAccepted() {
    try {
      localStorage.setItem(this.consentKey, 'true');
    } catch (e) {
      /* noop */
    }
  }

  renderBanner() {
    const banner = document.createElement('div');
    banner.className = 'cookie-banner';
    banner.innerHTML = `
      <p>We use cookies to ensure you get the best experience on our website.</p>
      <button class="cookie-accept">Accept</button>
    `;
    document.body.appendChild(banner);
    banner.querySelector('.cookie-accept').addEventListener('click', () => {
      this.setAccepted();
      banner.remove();
    });
  }
}

export default CookieConsent;
