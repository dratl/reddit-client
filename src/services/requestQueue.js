// src/services/requestQueue.js
class RequestQueue {
    constructor() {
      this.queue = [];
      this.isProcessing = false;
      this.lastRequestTime = 0;
      this.MIN_INTERVAL = 1100; // 1.1s between requests (55 requests/min)
    }
  
    async add(requestFn) {
      return new Promise((resolve) => {
        this.queue.push({ requestFn, resolve });
        this.processQueue();
      });
    }
  
    async processQueue() {
      if (this.isProcessing || this.queue.length === 0) return;
      
      this.isProcessing = true;
      const now = Date.now();
      const timeSinceLast = now - this.lastRequestTime;
      const delay = Math.max(0, this.MIN_INTERVAL - timeSinceLast);
  
      setTimeout(async () => {
        const { requestFn, resolve } = this.queue.shift();
        try {
          const result = await requestFn();
          resolve(result);
        } catch (error) {
          console.error('Request failed:', error);
          resolve(null);
        } finally {
          this.lastRequestTime = Date.now();
          this.isProcessing = false;
          this.processQueue();
        }
      }, delay);
    }
  }
  
  export const requestQueue = new RequestQueue();