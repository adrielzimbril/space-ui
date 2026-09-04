export const logger = {
  log: (...args: any[]) => console.log('[🫗LOGGER]', ...args),
  warn: (...args: any[]) => console.warn('[⚠️ LOGGER]', ...args),
  error: (...args: any[]) => console.error('[❌LOGGER]', ...args),
  info: (...args: any[]) => console.info('[ℹ️ LOGGER]', ...args),
  trace: (...args: any[]) => console.trace('[🔎 LOGGER]', ...args),
  debug: (...args: any[]) => {
    if (typeof process !== 'undefined' && process.env?.NODE_ENV === 'development') {
      console.debug('[🪲LOGGER]', ...args)
    }
  },
}
