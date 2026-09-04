/**
 * Parses a string value into its native JavaScript data type if possible.
 *
 * @param {string | undefined} value - The raw string value to parse.
 * @param {boolean} [isItRetry=false] - Internal flag to retry parsing with quotes.
 * @returns {any} The parsed value (JSON, primitive, or undefined).
 */
export const parseToDataType = (value: string | undefined, isItRetry = false): any => {
  try {
    return value === 'undefined' || value === undefined ? undefined : JSON.parse(value)
  } catch (e) {
    if (!isItRetry) {
      return parseToDataType(`"${value?.replaceAll?.('"', '')}"`, true)
    }
    return undefined
  }
}

/**
 * Converts a typed value into a string suitable for cookie storage.
 *
 * @template T
 * @param {T} value - The value to serialize.
 * @returns {string} The string representation of the value.
 */
export const parseToCookieType = <T>(value: T): string => {
  if (typeof value === 'string') {
    return value
  }
  return JSON.stringify(value)
}

/**
 * Retrieves the value of a specific cookie by its name.
 *
 * @param {string} name - The name of the cookie.
 * @returns {any} The parsed cookie value, or `undefined` if not found.
 *
 * @example
 * const token = getCookie('auth_token');
 */
export const getCookie = (name: string): any => {
  if (typeof document === 'undefined') return undefined
  const value = `; ${document.cookie}`
  const [_, cookie] = value.split(`; ${name}=`)
  return cookie ? parseToDataType(cookie.split(';')[0]) : undefined
}

/**
 * Retrieves all cookies formatted as a key-value record object.
 *
 * @param {string[]} [cookies=[]] - Optional list of specific cookie keys to extract.
 * @returns {Record<string, any>} An object containing all matching cookie key-value pairs.
 *
 * @example
 * const allCookies = getCookies();
 * const authCookies = getCookies(['user_id', 'session_id']);
 */
export const getCookies = (cookies: string[] = []): Record<string, any> => {
  if (typeof document === 'undefined') return {}
  if (cookies.length) {
    return cookies.reduce((result, cookie) => ({ ...result, [cookie]: getCookie(cookie) }), {})
  }

  return Object.fromEntries(
    document.cookie
      .split('; ')
      .filter(Boolean)
      .map((c) => {
        const [key, value] = c.split('=')
        return [key, parseToDataType(value)]
      }),
  )
}

/**
 * Sets a cookie in the browser with an expiration time in days.
 *
 * @template T
 * @param {string} name - The name of the cookie.
 * @param {T} value - The value to store in the cookie.
 * @param {number} expireDays - Expiration time in days from now.
 *
 * @example
 * setCookie('theme', 'dark', 30); // Expires in 30 days
 */
export const setCookie = <T>(name: string, value: T, expireDays: number): void => {
  if (typeof document === 'undefined') return
  const date = new Date()
  const millisecondsInADay = 24 * 60 * 60 * 1000
  date.setTime(date.getTime() + expireDays * millisecondsInADay)
  const expires = `expires=${date.toUTCString()}`
  document.cookie = `${name}=${parseToCookieType(value)}; ${expires}; path=/;`
}

/**
 * Deletes a cookie by expiring its date in the past.
 *
 * @param {string} name - The name of the cookie to remove.
 *
 * @example
 * deleteCookie('auth_token');
 */
export const deleteCookie = (name: string): void => {
  if (typeof document === 'undefined') return
  document.cookie = `${name}=; path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;`
}
