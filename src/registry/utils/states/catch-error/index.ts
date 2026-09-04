/**
 * catchError
 *
 * @param promise - The promise to catch errors from
 * @returns A tuple containing either the error or the result
 *
 * @example
 * const [error, data] = await catchError(somePromise);
 * if (error) {
 *   // handle error
 * } else {
 *   // use result data
 * }
 */
export async function catchError<T>(fn: Promise<T> | (() => T)): Promise<[undefined, T] | [Error]> {
  try {
    const result = typeof fn === 'function' ? fn() : await fn
    return [undefined, result] as [undefined, T]
  } catch (error) {
    return [error as Error]
  }
}
