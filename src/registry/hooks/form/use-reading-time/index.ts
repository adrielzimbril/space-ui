import { useMemo } from 'react'

// ================== BASE UTILITIES ==================

// Function to clean HTML
const parseHTML = (htmlString: string) => {
  if (!htmlString) return ''

  return (
    htmlString
      // Remove scripts and styles
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')
      // Remove HTML comments
      .replace(/<!--[\s\S]*?-->/g, '')
      // Remove all HTML tags
      .replace(/<[^>]*>/g, ' ')
      // Decode HTML entities
      .replace(/&nbsp;/g, ' ')
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      // Remove spaces
      .replace(/\s+/g, ' ')
      .trim()
  )
}

// Function to clean Markdown
const parseMarkdown = (markdownString: string) => {
  if (!markdownString) return ''

  let text = markdownString

  // Remove code blocks
  text = text.replace(/```[\s\S]*?```/g, '')
  text = text.replace(/`[^`]+`/g, '')

  // Remove images
  text = text.replace(/!\[.*?\]\(.*?\)/g, '')

  // Remove links but keep the text
  text = text.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')

  // Remove headers
  text = text.replace(/#{1,6}\s+/g, '')

  // Remove formatting
  text = text.replace(/\*{1,3}([^*]+)\*{1,3}/g, '$1')
  text = text.replace(/_{1,3}([^_]+)_{1,3}/g, '$1')
  text = text.replace(/~~([^~]+)~~/g, '$1')

  // Remove lists
  text = text.replace(/^[\s]*[-*+]\s+/gm, '')
  text = text.replace(/^\d+\.\s+/gm, '')

  // Remove blockquotes
  text = text.replace(/^>\s+/gm, '')

  // Remove horizontal rules
  text = text.replace(/^[-*_]{3,}$/gm, '')

  // Remove spaces
  text = text.replace(/\s+/g, ' ').trim()

  return text
}

// Function to count words
const countWords = (text: string) => {
  if (!text || text.trim().length === 0) return { cjkCount: 0, nonCjkCount: 0 }

  // Split CJK characters and non-CJK words
  const cjkMatches = text.match(/[\u4E00-\u9FFF\u3040-\u309F\u30A0-\u30FF\uAC00-\uD7AF\u3400-\u4DBF]/g) || []

  // Remove CJK characters from text to count non-CJK words
  const nonCjkText = text
    .replace(/[\u4E00-\u9FFF\u3040-\u309F\u30A0-\u30FF\uAC00-\uD7AF\u3400-\u4DBF]/g, ' ')
    .replace(/[，。！？：；""''（）【】]/g, ' ') // Chinese punctuation: comma, period, exclamation, question, colon, semicolon, double quotes, single quotes, parentheses, brackets

  const nonCjkWords = nonCjkText
    .trim()
    .split(/\s+/)
    .filter((word) => word.length > 0 && word.match(/[a-zA-Z0-9]/)) // Exclude empty strings and non-alphanumeric characters

  // Total = CJK characters + non-CJK words
  return { cjkCount: cjkMatches.length, nonCjkCount: nonCjkWords.length }
}

// Function to detect format
const detectFormat = (content: string) => {
  if (!content) return 'text'

  const htmlRegex = /<[^>]+>/
  const markdownRegex = /[#*`_\[\]]/

  if (htmlRegex.test(content)) return 'html'
  if (markdownRegex.test(content)) return 'markdown'
  return 'text'
}

// ================== TYPES ==================

export interface ReadingTimeResult {
  minutes: number
  seconds: number
  totalSeconds: number
  wordCount: number
  words?: number
  time?: { minutes: number; seconds: number; totalSeconds: number }
  format: string
  mainWordCount?: number
  codeWordCount?: number
  imageCount?: number
  breakdown?: {
    text: number
    code: number
    images: number
  }
  debug?: {
    cjkCharacters: number
    nonCjkWords: number
    cjkWPM: number
    nonCjkWPM: number
  }
}

interface ReadingTimeOptions {
  wordsPerMinute?: number
  format?: 'minutes' | 'seconds' | 'auto'
  includeImages?: boolean
  imageTime?: number
  includeCodeBlocks?: boolean
  codeMultiplier?: number
}

// Interface for the pure function
interface CalculateReadingTimeParams {
  content: string
  options?: ReadingTimeOptions
}

// ================== CALCULATION FUNCTIONS (SAFE ON SERVER SIDE) ==================
export const calculateReadingTime = ({ content, options = {} }: CalculateReadingTimeParams): ReadingTimeResult => {
  const {
    wordsPerMinute = 250,
    format = 'auto',
    includeImages = true,
    imageTime = 12,
    includeCodeBlocks = true,
    codeMultiplier = 0.5,
  } = options

  if (!content) {
    return {
      minutes: 0,
      seconds: 0,
      totalSeconds: 0,
      wordCount: 0,
      format: 'unknown',
    }
  }

  const detectedFormat = format === 'auto' ? detectFormat(content) : format
  let cleanText = ''
  let imageCount = 0
  const codeWordCount = { cjkCount: 0, nonCjkCount: 0 }

  // Parse according to the format
  switch (detectedFormat) {
    case 'html':
      cleanText = parseHTML(content)
      if (includeImages) {
        imageCount = (content.match(/<img[^>]*>/gi) || []).length
      }
      if (includeCodeBlocks) {
        const codeBlocks = content.match(/<code[^>]*>[\s\S]*?<\/code>/gi) || []
        const preBlocks = content.match(/<pre[^>]*>[\s\S]*?<\/pre>/gi) || []
        ;[...codeBlocks, ...preBlocks].forEach((block) => {
          const codeText = parseHTML(block)
          const codeWords = countWords(codeText)
          codeWordCount.cjkCount += codeWords.cjkCount
          codeWordCount.nonCjkCount += codeWords.nonCjkCount
        })
      }
      break

    case 'markdown':
      if (includeImages) {
        imageCount = (content.match(/!\[.*?\]\(.*?\)/g) || []).length
      }
      if (includeCodeBlocks) {
        const codeBlocks = content.match(/```[\s\S]*?```/g) || []
        const inlineCode = content.match(/`[^`]+`/g) || []
        ;[...codeBlocks, ...inlineCode].forEach((block) => {
          const codeText = block.replace(/```.*?\n?/g, '').replace(/`/g, '')
          const codeWords = countWords(codeText)
          codeWordCount.cjkCount += codeWords.cjkCount
          codeWordCount.nonCjkCount += codeWords.nonCjkCount
        })
      }
      cleanText = parseMarkdown(content)
      break

    default:
      cleanText = content
      break
  }

  const mainWords = countWords(cleanText)

  const cjkWPFactor = 1.2

  // Separated calculation for CJK and non-CJK
  const cjkWPM = wordsPerMinute / cjkWPFactor // Reading speed for Chinese/Japanese/Korean characters
  const nonCjkWPM = wordsPerMinute // Reading speed for Western words

  // Reading time for the main text
  const mainCjkTime = mainWords.cjkCount / cjkWPM
  const mainNonCjkTime = mainWords.nonCjkCount / nonCjkWPM

  // Reading time for the code (with multiplier)
  const codeCjkTime = (codeWordCount.cjkCount * codeMultiplier) / cjkWPM
  const codeNonCjkTime = (codeWordCount.nonCjkCount * codeMultiplier) / nonCjkWPM

  const totalReadingTimeMinutes = mainCjkTime + mainNonCjkTime + codeCjkTime + codeNonCjkTime

  // Time for images
  const imageTimeMinutes = includeImages ? (imageCount * imageTime) / 60 : 0

  const totalMinutes = totalReadingTimeMinutes + imageTimeMinutes
  const totalSeconds = Math.round(totalMinutes * 60)

  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60

  const totalWordCount = mainWords.cjkCount + mainWords.nonCjkCount + codeWordCount.cjkCount + codeWordCount.nonCjkCount

  return {
    minutes,
    seconds,
    totalSeconds,
    wordCount: totalWordCount,
    mainWordCount: mainWords.cjkCount + mainWords.nonCjkCount,
    codeWordCount: codeWordCount.cjkCount + codeWordCount.nonCjkCount,
    imageCount,
    format: detectedFormat,
    breakdown: {
      text: Math.round((mainCjkTime + mainNonCjkTime) * 60),
      images: Math.round(imageTimeMinutes * 60),
      code: Math.round((codeCjkTime + codeNonCjkTime) * 60),
    },
  }
}

// ================== HOOKS (SAFE ON CLIENT ONLY SIDE) ==================

/**
 * Returns the reading time of a given content.
 *
 * @param content - The content to calculate the reading time for.
 * @param options - The options to use for calculating the reading time.
 *
 * @returns The reading time of the content.
 *
 * @example
 * const readingTime = useReadingTime("This is a sample content.", { wordsPerMinute: 250 });
 * console.log(readingTime);
 * // Result: { minutes: 0, seconds: 1, totalSeconds: 1, wordCount: 5, format: "text" }
 */
export function useReadingTime(
  content: string = '',
  options: ReadingTimeOptions = {
    format: 'auto',
    wordsPerMinute: 200,
    includeImages: true,
    imageTime: 12,
    includeCodeBlocks: true,
    codeMultiplier: 0.5,
  },
): ReadingTimeResult {
  const stringifiedOptions = JSON.stringify(options)
  const memoizedOptions = useMemo(() => JSON.parse(stringifiedOptions), [stringifiedOptions])

  const memoizedReadingTime = useMemo(() => {
    if (!content || typeof content !== 'string') {
      const defaultResult: ReadingTimeResult = {
        minutes: 0,
        seconds: 0,
        totalSeconds: 0,
        wordCount: 0,
        words: 0,
        mainWordCount: 0,
        codeWordCount: 0,
        imageCount: 0,
        format: 'text',
        breakdown: { text: 0, images: 0, code: 0 },
        time: { minutes: 0, seconds: 0, totalSeconds: 0 },
      }
      return defaultResult
    }

    const calculated = calculateReadingTime({
      content,
      options: memoizedOptions,
    })
    calculated.words = calculated.wordCount
    calculated.time = {
      minutes: calculated.minutes,
      seconds: calculated.seconds,
      totalSeconds: calculated.totalSeconds,
    }
    return calculated
  }, [content, memoizedOptions])

  return memoizedReadingTime
}

// ================== FORMATTING ==================

interface ReadingTime {
  minutes: number
  seconds: number
  totalSeconds: number
}

/**
 * Formats the reading time based on the specified format.
 *
 * @param time - The reading time object.
 * @param format - The format to use for formatting the time.
 *
 * @returns The formatted reading time.
 *
 * @example
 * const time = { minutes: 2, seconds: 30, totalSeconds: 150 };
 * console.log(formatTime(time, "minutes")); // Output: "2 min"
 * console.log(formatTime(time, "seconds")); // Output: "150 sec"
 * console.log(formatTime(time, "detailed")); // Output: "2 min 30 sec"
 * console.log(formatTime(time, "short")); // Output: "2m"
 * console.log(formatTime(time)); // Output: "2 min"
 */
export interface ReadingTimeObj {
  minutes?: number
  seconds?: number
  totalSeconds?: number
}

export function formatTime(
  time?: ReadingTimeObj | number | null,
  format: 'minutes' | 'seconds' | 'detailed' | 'short' = 'detailed',
): string {
  if (!time && time !== 0) {
    return format === 'short' ? '0s' : '0 min'
  }

  let minutes = 0
  let seconds = 0
  let totalSeconds = 0

  if (typeof time === 'number') {
    totalSeconds = Math.round(time)
    minutes = Math.floor(totalSeconds / 60)
    seconds = totalSeconds % 60
  } else if (typeof time === 'object') {
    minutes = time.minutes ?? (time.totalSeconds ? Math.floor(time.totalSeconds / 60) : 0)
    seconds = time.seconds ?? (time.totalSeconds ? time.totalSeconds % 60 : 0)
    totalSeconds = time.totalSeconds ?? minutes * 60 + seconds
  }

  switch (format) {
    case 'minutes':
      return minutes > 0 ? `${minutes} min` : '< 1 min'
    case 'seconds':
      return `${totalSeconds} sec`
    case 'detailed':
      return minutes > 0 && seconds > 0
        ? `${minutes} min ${seconds} sec`
        : minutes > 0
          ? `${minutes} min`
          : `${seconds} sec`
    case 'short':
      return minutes > 0 ? `${minutes}m ${seconds}s` : `${seconds}s`
    default:
      return minutes > 0 ? `${minutes} min` : `${seconds} sec`
  }
}
