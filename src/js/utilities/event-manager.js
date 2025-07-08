/**
 * Event Manager for handling and cleaning up event listeners
 */

export class EventManager {
  constructor() {
    this.listeners = new Map();
  }

  /**
   * Add event listener with automatic cleanup tracking
   */
  addListener(element, eventType, handler, options = {}) {
    if (!element || typeof handler !== "function") {
      console.error("Invalid element or handler provided to EventManager");
      return;
    }

    const listenerKey = this.generateListenerKey(element, eventType, handler);

    if (this.listeners.has(listenerKey)) {
      console.warn("Event listener already exists for this combination");
      return;
    }

    const wrappedHandler = (event) => {
      try {
        handler.call(element, event);
      } catch (error) {
        console.error("Error in event handler:", error);
      }
    };

    element.addEventListener(eventType, wrappedHandler, options);

    this.listeners.set(listenerKey, {
      element,
      eventType,
      handler: wrappedHandler,
      options,
      originalHandler: handler,
    });
  }

  /**
   * Remove specific event listener
   */
  removeListener(element, eventType, handler) {
    const listenerKey = this.generateListenerKey(element, eventType, handler);
    const listenerData = this.listeners.get(listenerKey);

    if (listenerData) {
      element.removeEventListener(
        eventType,
        listenerData.handler,
        listenerData.options,
      );
      this.listeners.delete(listenerKey);
    }
  }

  /**
   * Remove all listeners for an element
   */
  removeAllListeners(element) {
    const toRemove = [];

    for (const [key, listenerData] of this.listeners) {
      if (listenerData.element === element) {
        toRemove.push(key);
      }
    }

    toRemove.forEach((key) => {
      const listenerData = this.listeners.get(key);
      listenerData.element.removeEventListener(
        listenerData.eventType,
        listenerData.handler,
        listenerData.options,
      );
      this.listeners.delete(key);
    });
  }

  /**
   * Clean up all event listeners
   */
  cleanup() {
    for (const [key, listenerData] of this.listeners) {
      try {
        listenerData.element.removeEventListener(
          listenerData.eventType,
          listenerData.handler,
          listenerData.options,
        );
      } catch (error) {
        console.warn("Error removing event listener during cleanup:", error);
      }
    }
    this.listeners.clear();
  }

  /**
   * Generate unique key for listener tracking
   */
  generateListenerKey(element, eventType, handler) {
    const elementId = element.id || element.tagName || "unknown";
    const handlerString = handler.toString().substring(0, 50);
    return `${elementId}-${eventType}-${handlerString}`;
  }

  /**
   * Get count of active listeners
   */
  getListenerCount() {
    return this.listeners.size;
  }
}

// Create global instance
const globalEventManager = new EventManager();

// Cleanup on page unload
window.addEventListener("beforeunload", () => {
  globalEventManager.cleanup();
});

export default globalEventManager;
