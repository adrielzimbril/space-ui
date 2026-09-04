/**
 * Checks if a number is negative (strictly less than zero).
 *
 * @param {number} value - The number to evaluate.
 * @returns {boolean} `true` if the value is strictly less than 0, otherwise `false`.
 *
 * @example
 * isNegative(-5); // => true
 * isNegative(0);  // => false
 * isNegative(42); // => false
 */
export function isNegative(value: number): boolean {
  return value < 0
}
