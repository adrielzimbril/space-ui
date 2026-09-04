/**
 * Truncates text to a maximum length and adds ellipsis if needed
 *
 * @param text - The text to truncate
 * @param options - Configuration options
 * @param options.type - Type of truncation: 'char' for characters, 'word' for words (default: 'char')
 * @param options.maxLength - Maximum length before truncation (default: 40)
 *
 * @returns The truncated text with ellipsis if needed
 *
 * @example
 * truncateText("This is a very long text", { type: 'char', maxLength: 10 }) // returns "This is a..."
 * truncateText("This is a very long text", { type: 'word', maxLength: 3 }) // returns "This is a..."
 */
export function truncateText(text: string, options: { type?: 'char' | 'word'; maxLength?: number } = {}): string {
  const { type = 'char', maxLength = 40 } = options

  if (type === 'word') {
    const words = text.split(' ')
    if (words.length <= maxLength) return text
    return words.slice(0, maxLength).join(' ') + '...'
  }

  // Default: character-based truncation
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength) + '...'
}

export interface RandomWordOptions {
  /**
   * Number of words to generate.
   *
   * @default 1
   */
  count?: number
  /**
   * Length (number of characters) of each word.
   * If omitted, a natural random length between 3 and 8 characters is used.
   */
  length?: number
  /**
   * Casing style of the output word(s).
   *
   * @default 'lowercase'
   */
  casing?: 'lowercase' | 'uppercase' | 'capitalize'
  /**
   * Separator when generating multiple words.
   *
   * @default ' '
   */
  separator?: string
  /**
   * If true, includes numbers inside the generated word(s).
   *
   * @default false
   */
  alphanumeric?: boolean
}

/**
 * Procedurally generates random pseudo-lorem words on the fly without any pre-defined word dictionary.
 * Alternates vowels and consonants to create natural-sounding pseudo-Latin words.
 *
 * @param options - Configuration options
 * @returns The generated random word(s)
 *
 * @example
 * randomWord() // e.g. "visota", "peluxo", "dorem"
 * randomWord({ count: 3 }) // e.g. "velita norisa panuto"
 * randomWord({ casing: 'capitalize' }) // e.g. "Falune"
 * randomWord({ length: 6, alphanumeric: true }) // e.g. "v3lora"
 */
export function randomWord(options: RandomWordOptions = {}): string {
  const { count = 1, length, casing = 'lowercase', separator = ' ', alphanumeric = false } = options

  const consonants = 'bcdfghjklmnpqrstvwxz'
  const vowels = 'aeiou'
  const digits = '0123456789'

  const generateSingleWord = (): string => {
    const targetLength = length ?? Math.floor(Math.random() * 6) + 3 // 3 to 8 chars
    let word = ''
    let isVowel = Math.random() > 0.5

    while (word.length < targetLength) {
      if (alphanumeric && Math.random() < 0.25) {
        word += digits[Math.floor(Math.random() * digits.length)]
      } else {
        const pool = isVowel ? vowels : consonants
        word += pool[Math.floor(Math.random() * pool.length)]
        isVowel = !isVowel
      }
    }

    return word.slice(0, targetLength)
  }

  const words: string[] = []
  for (let i = 0; i < count; i++) {
    const raw = generateSingleWord()
    let formatted = raw
    if (casing === 'uppercase') {
      formatted = raw.toUpperCase()
    } else if (casing === 'capitalize') {
      formatted = raw.charAt(0).toUpperCase() + raw.slice(1).toLowerCase()
    } else {
      formatted = raw.toLowerCase()
    }
    words.push(formatted)
  }

  return words.join(separator)
}
