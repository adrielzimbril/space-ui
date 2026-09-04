/**
 * Sleep function
 * @param ms - The number of milliseconds to sleep
 * @returns A promise that resolves after the specified number of milliseconds
 *
 * @example
 * await sleep(1000);           // Sleep for 1000ms => 1 second
 * await sleep("2000ms").then(() => { console.log("Done"); });       // Sleep for 2s and then log "Done"
 */
export const sleep = (ms: number | `${number}ms`): Promise<void> => {
  let duration: number
  if (typeof ms === 'string') {
    duration = Number.parseInt(ms, 10)
  } else {
    duration = ms
  }
  return new Promise((resolve) => setTimeout(resolve, duration))
}
