/**
 * Validation utilities for Stay Dripped Mobile IV
 */

export const ValidationUtils = {
  /**
   * Check if element exists in DOM
   */
  isElementValid(element) {
    return element && element instanceof HTMLElement;
  },

  /**
   * Check if string is valid UUID format
   */
  isValidUUID(uuid) {
    const uuidPattern =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return typeof uuid === 'string' && uuidPattern.test(uuid);
  },

  /**
   * Check if service configuration is valid
   */
  isValidServiceConfig(service) {
    return (
      service &&
      typeof service === 'object' &&
      typeof service.id === 'string' &&
      typeof service.name === 'string' &&
      service.id.length > 0 &&
      service.name.length > 0
    );
  },

  /**
   * Sanitize string for DOM insertion
   */
  sanitizeString(str) {
    if (typeof str !== 'string') return '';

    const entityMap = new Map([
      ['<', '&lt;'],
      ['>', '&gt;'],
      ['"', '&quot;'],
      ['\'', '&#39;'],
      ['&', '&amp;'],
    ]);

    return str.replace(/[<>'"&]/g, (char) => entityMap.get(char) || char);
  },

  /**
   * Check if URL is valid and safe
   */
  isValidURL(url) {
    try {
      const parsedUrl = new URL(url);

      // Only allow HTTP and HTTPS protocols
      if (parsedUrl.protocol !== 'http:' && parsedUrl.protocol !== 'https:') {
        return false;
      }

      // Validate hostname - prevent localhost, private IPs, etc.
      const hostname = parsedUrl.hostname.toLowerCase();

      // Block localhost and private network ranges
      if (
        hostname === 'localhost' ||
        hostname === '127.0.0.1' ||
        hostname === '::1' ||
        hostname.startsWith('192.168.') ||
        hostname.startsWith('10.') ||
        /^172\.(1[6-9]|2[0-9]|3[0-1])\./.test(hostname) ||
        hostname.includes('.local') ||
        hostname === '0.0.0.0'
      ) {
        return false;
      }

      return true;
    } catch {
      return false;
    }
  },
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = ValidationUtils;
}
