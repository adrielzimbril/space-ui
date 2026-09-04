/**
 * Options for formatting byte values into human-readable strings.
 */
export interface FormatBytesOptions {
  /** Number of decimal places to include (default: 2) */
  decimals?: number
  /** Format output with binary prefixes (KiB, MiB, etc.) instead of decimal prefixes (KB, MB, etc.) */
  binary?: boolean
}

/**
 * Converts a raw number of bytes into a localized, human-readable file size string.
 *
 * @param {number} bytes - The number of bytes to format.
 * @param {FormatBytesOptions} [options={}] - Formatting options (decimals, binary mode).
 * @returns {string} The formatted file size string (e.g. '1.50 MB', '512 KB').
 *
 * @example
 * formatBytes(1024);                   // => '1.02 KB'
 * formatBytes(1048576, { decimals: 0 }); // => '1 MB'
 * formatBytes(1048576, { binary: true });// => '1 MiB'
 */
export function formatBytes(bytes: number, options: FormatBytesOptions = {}): string {
  const { decimals = 2, binary = false } = options

  if (bytes === 0) return '0 B'
  if (bytes < 0) return '0 B'

  const k = binary ? 1024 : 1000
  const dm = decimals < 0 ? 0 : decimals
  const sizes = binary ? ['B', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB'] : ['B', 'KB', 'MB', 'GB', 'TB', 'PB']

  const i = Math.floor(Math.log(bytes) / Math.log(k))
  const unitIndex = Math.min(i, sizes.length - 1)

  return `${parseFloat((bytes / Math.pow(k, unitIndex)).toFixed(dm))} ${sizes[unitIndex]}`
}

/**
 * Parses a human-readable file size string (e.g. '10MB', '512KB', '1.5GB') into an exact number of bytes.
 *
 * @param {string | number} input - The input string (e.g. '10MB') or raw number in bytes.
 * @returns {number} The parsed size in raw bytes.
 *
 * @example
 * parseBytes('10MB');   // => 10485760
 * parseBytes('512KB');  // => 524288
 * parseBytes(2048);     // => 2048
 */
export function parseBytes(input: string | number): number {
  if (typeof input === 'number') return input
  if (!input) return 0

  const units: Record<string, number> = {
    b: 1,
    kb: 1024,
    kib: 1024,
    mb: 1024 * 1024,
    mib: 1024 * 1024,
    gb: 1024 * 1024 * 1024,
    gib: 1024 * 1024 * 1024,
    tb: 1024 * 1024 * 1024 * 1024,
    tib: 1024 * 1024 * 1024 * 1024,
  }

  const match = input.trim().match(/^([\d.]+)\s*([a-zA-Z]+)?$/)
  if (!match) return 0

  const value = parseFloat(match[1])
  const unit = (match[2] || 'b').toLowerCase()

  return value * (units[unit] || 1)
}
