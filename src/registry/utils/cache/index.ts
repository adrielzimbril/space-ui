/**
 * A lightweight in-memory cache with optional Time-To-Live (TTL) support.
 */
export class MemoryCache<T = any> {
  private cache = new Map<string, { value: T; expires?: number }>()

  /**
   * Stores a value in the cache with an optional TTL in milliseconds.
   *
   * @param {string} key - Unique cache key.
   * @param {T} value - Value to cache.
   * @param {number} [ttlMs] - Time-to-live in milliseconds.
   *
   * @example
   * cache.set('user_123', userData, 60000); // Cached for 1 minute
   */
  set(key: string, value: T, ttlMs?: number): void {
    const expires = ttlMs ? Date.now() + ttlMs : undefined
    this.cache.set(key, { value, expires })
  }

  /**
   * Retrieves a cached value if it exists and has not expired.
   *
   * @param {string} key - Unique cache key.
   * @returns {T | undefined} The cached value or `undefined` if missing/expired.
   */
  get(key: string): T | undefined {
    const item = this.cache.get(key)
    if (!item) return undefined
    if (item.expires && Date.now() > item.expires) {
      this.cache.delete(key)
      return undefined
    }
    return item.value
  }

  /**
   * Checks if a key exists in the cache and is still valid.
   *
   * @param {string} key - Unique cache key.
   * @returns {boolean} `true` if key exists and is valid.
   */
  has(key: string): boolean {
    return this.get(key) !== undefined
  }

  /**
   * Removes a specific item from the cache.
   *
   * @param {string} key - Unique cache key to remove.
   */
  delete(key: string): boolean {
    return this.cache.delete(key)
  }

  /**
   * Clears all items from the cache.
   */
  clear(): void {
    this.cache.clear()
  }
}

/** Global default memory cache instance */
export const memoryCache = new MemoryCache()
