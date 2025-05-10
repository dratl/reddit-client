// src/services/cache.js
const cache = new Map();
const CACHE_TTL = 60 * 1000; // 1 minute

export const getCacheKey = (url, params) => {
  return `${url}:${JSON.stringify(params)}`;
};

export const getCached = (key) => {
  const entry = cache.get(key);
  if (entry && Date.now() - entry.timestamp < CACHE_TTL) {
    return entry.data;
  }
  return null;
};

export const setCached = (key, data) => {
  cache.set(key, { data, timestamp: Date.now() });
};