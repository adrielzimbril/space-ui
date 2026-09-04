export interface RangeMapOptions<T = number> {
  /** The total number of elements to generate */
  n: number
  /** Optional mapping function applied to each index */
  fn?: (index: number) => T
}

/**
 * Generates an array of elements by mapping over a range of numbers.
 * Supports both object options `rangeMap({ n: 5, fn: ... })` and direct arguments `rangeMap(5, (i) => ...)`.
 *
 * @template T
 * @param {number | RangeMapOptions<T>} countOrOptions - Number of elements or options object.
 * @param {(index: number) => T} [mapFn] - Optional transformer function for direct argument usage.
 * @returns {T[]} An array of generated elements.
 *
 * @example
 * // Direct usage without typing 'fn:'
 * rangeMap(5);               // => [0, 1, 2, 3, 4]
 * rangeMap(5, (i) => i * 2);  // => [0, 2, 4, 6, 8]
 *
 * // Object option format (original backwards-compatible)
 * rangeMap({ n: 5 });                     // => [0, 1, 2, 3, 4]
 * rangeMap({ n: 5, fn: (i) => 'Item ' + i }); // => ['Item 0', 'Item 1', 'Item 2', 'Item 3', 'Item 4']
 */
export function rangeMap<T = number>(countOrOptions: number | RangeMapOptions<T>, mapFn?: (index: number) => T): T[] {
  let count = 0
  let transform: ((i: number) => T) | undefined = mapFn

  if (typeof countOrOptions === 'number') {
    count = countOrOptions
  } else if (countOrOptions && typeof countOrOptions === 'object') {
    count = countOrOptions.n
    transform = countOrOptions.fn
  }

  const result: T[] = []
  for (let i = 0; i < count; i++) {
    result.push(transform ? transform(i) : (i as unknown as T))
  }
  return result
}

/**
 * Convenient alias for generating ranges of arrays.
 *
 * @example
 * range(5);             // => [0, 1, 2, 3, 4]
 * range(5, (i) => i+1); // => [1, 2, 3, 4, 5]
 */
export const range = rangeMap

/**
 * Maps a numeric value from an input range [inMin, inMax] to an output range [outMin, outMax].
 *
 * @param {number} value - The input value.
 * @param {number} inMin - The lower bound of the input range.
 * @param {number} inMax - The upper bound of the input range.
 * @param {number} outMin - The lower bound of the output range.
 * @param {number} outMax - The upper bound of the output range.
 * @param {boolean} [clamp=false] - Whether to clamp the output to [outMin, outMax].
 * @returns {number} The interpolated numeric value.
 *
 * @example
 * mapRange(0.5, 0, 1, 0, 100);       // => 50
 * mapRange(150, 0, 100, 0, 1, true); // => 1 (clamped)
 */
export function mapRange(
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number,
  clamp = false,
): number {
  if (inMin === inMax) return outMin
  let result = ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin
  if (clamp) {
    const min = Math.min(outMin, outMax)
    const max = Math.max(outMin, outMax)
    result = Math.max(min, Math.min(max, result))
  }
  return result
}
