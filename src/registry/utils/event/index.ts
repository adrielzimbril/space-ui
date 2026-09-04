/**
 * Safely binds an event listener to any EventTarget (Window, Document, HTMLElement).
 *
 * @template T
 * @param {T | null} target - The target element or object to bind the listener to.
 * @param {...any} args - Standard arguments matching addEventListener (eventName, handler, options).
 *
 * @example
 * bindEvent(window, 'resize', () => console.log('Resized!'), { passive: true });
 */
export function bindEvent<T extends Window | Document | HTMLElement | EventTarget>(
  target: T | null,
  ...args: Parameters<T['addEventListener']> | [string, Function | null, ...any]
): void {
  if (target && target.addEventListener) {
    target.addEventListener(...(args as Parameters<HTMLElement['addEventListener']>))
  }
}

/**
 * Safely unbinds an event listener from any EventTarget (Window, Document, HTMLElement).
 *
 * @template T
 * @param {T | null} target - The target element or object to unbind the listener from.
 * @param {...any} args - Standard arguments matching removeEventListener (eventName, handler, options).
 *
 * @example
 * unbindEvent(window, 'resize', handleResize);
 */
export function unbindEvent<T extends Window | Document | HTMLElement | EventTarget>(
  target: T | null,
  ...args: Parameters<T['removeEventListener']> | [string, Function | null, ...any]
): void {
  if (target && target.removeEventListener) {
    target.removeEventListener(...(args as Parameters<HTMLElement['removeEventListener']>))
  }
}

/**
 * Dispatches a CustomEvent on the global `window` object.
 *
 * @param {string} eventName - The unique name of the custom event.
 * @param {any} [detail] - Optional payload data attached to the event.
 *
 * @example
 * dispatchWindowEvent('app:toggle-sidebar', { open: true });
 */
export function dispatchWindowEvent(eventName: string, detail?: any): void {
  if (typeof window === 'undefined') return
  window.dispatchEvent(new CustomEvent(eventName, { detail }))
}

/**
 * Dispatches a CustomEvent on a specified DOM element or EventTarget.
 *
 * @param {EventTarget} target - The DOM target to dispatch the event on.
 * @param {string} eventName - The unique name of the custom event.
 * @param {any} [detail] - Optional payload data attached to the event.
 *
 * @example
 * dispatchCustomEvent(modalElement, 'modal:close');
 */
export function dispatchCustomEvent(target: EventTarget, eventName: string, detail?: any): void {
  target.dispatchEvent(new CustomEvent(eventName, { detail }))
}
