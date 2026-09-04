/**
 * Formats a date string to a relative time
 *
 * @param date - The date string to format
 * @returns A relative time string
 *
 * @example
 * const date = formatDate("2023-01-01");
 * logger.info(date); // Output: Today
 */
export function formatDateDiff(date: string): string {
  const currentDate = new Date().getTime()
  if (!date.includes('T')) {
    date = `${date}T00:00:00`
  }
  const targetDate = new Date(date).getTime()
  const timeDifference = Math.abs(currentDate - targetDate)
  const daysAgo = Math.floor(timeDifference / (1000 * 60 * 60 * 24))

  const fullDate = new Date(date).toLocaleString('en-us', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })

  if (daysAgo < 1) {
    return 'Today'
  } else if (daysAgo < 7) {
    return `${fullDate} (${daysAgo}d ago)`
  } else if (daysAgo < 30) {
    const weeksAgo = Math.floor(daysAgo / 7)
    return `${fullDate} (${weeksAgo}w ago)`
  } else if (daysAgo < 365) {
    const monthsAgo = Math.floor(daysAgo / 30)
    return `${fullDate} (${monthsAgo}mo ago)`
  } else {
    const yearsAgo = Math.floor(daysAgo / 365)
    return `${fullDate} (${yearsAgo}y ago)`
  }
}

/**
 * Returns the current date
 *
 * @param date - The date string or Date object to format (default: today)
 * @param lang - The language to use for formatting (default: "en-US")
 * @param iso - If true, returns the ISO date string (default: false)
 *
 * @returns The formatted date string
 *
 * @example
 * const date = getDate("2023-01-01", "en-US");
 * console.log(date); // Output: Jan 1, 2023
 *
 * @example
 * const date = getDate("2023-01-01", "en-US", true);
 * console.log(date); // Output: 2023-01-01
 *
 * @example
 * const date = getDate("2023-01-01", "en-US", false);
 * console.log(date); // Output: Jan 1, 2023
 */
export function getDate({
  date,
  lang = 'en-US',
  dateStyle = 'medium',
  iso = false,
}: {
  date: string | Date
  lang?: Intl.LocalesArgument
  dateStyle?: Intl.DateTimeFormatOptions['dateStyle']
  iso?: boolean
}): string {
  const d = new Date(date)
  if (!d) return 'Invalid date'
  return iso ? d.toISOString().split('T')[0] || 'Invalid date' : Intl.DateTimeFormat(lang, { dateStyle }).format(d)
}

/**
 * Get the current month
 *
 * @returns The current month
 *
 * @example
 * const month = getThisMonth();
 * console.log(month); // Output: "august"
 */
export const getThisMonth = () => {
  const date = new Date()
  return new Intl.DateTimeFormat('en', { month: 'long' }).format(date).toLowerCase()
}

/**
 * Calculate the difference between two dates with different output formats
 *
 * @param dateArray - An array of two date strings
 * @param options - Optional parameters to customize the output format
 *
 * @returns A string or an object containing the formatted difference and breakdown
 *
 * @example
 * const dateArray = ["2023-01-01", "2023-06-17"];
 * const difference = getDateDifference(dateArray);
 * console.log(difference); // Output: "5 months"
 *
 * @example
 * const difference = getDateDifference(dateArray, { format: 'detailed' });
 * console.log(difference); // Output: { formatted: "5 months", totalDays: 158, breakdown: { years: 0, months: 5, weeks: 0, days: 158, hours: 0, minutes: 0, seconds: 0 } }
 *
 * @example
 * const difference = getDateDifference(dateArray, { format: 'detailed', returnObject: true });
 * console.log(difference); // Output: { formatted: "5 months", totalDays: 158, breakdown: { years: 0, months: 5, weeks: 0, days: 158, hours: 0, minutes: 0, seconds: 0 } }
 *
 * @example
 * const difference = getDateDifference(dateArray, { format: 'precise' });
 * console.log(difference); // Output: "5 months 0 weeks 0 days 0 hours 0 minutes 0 seconds"
 */
export function getDateDifference(
  dateArray: string[],
  options?: {
    format?: 'auto' | 'short' | 'precise' | 'detailed'
    returnObject?: boolean
  },
):
  | string
  | {
      formatted: string
      totalDays: number
      breakdown: {
        years: number
        months: number
        weeks: number
        days: number
        hours: number
        minutes: number
        seconds: number
      }
    } {
  const { format = 'auto', returnObject = false } = options || {}

  if (dateArray.length < 2) {
    return returnObject
      ? {
          formatted: 'Not enough dates',
          totalDays: 0,
          breakdown: {
            years: 0,
            months: 0,
            weeks: 0,
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0,
          },
        }
      : 'Not enough dates'
  }

  if (!dateArray[0] || !dateArray[1]) {
    return returnObject
      ? {
          formatted: 'Invalid dates',
          totalDays: 0,
          breakdown: {
            years: 0,
            months: 0,
            weeks: 0,
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0,
          },
        }
      : 'Invalid dates'
  }

  const date1 = new Date(dateArray[0])
  const date2 = new Date(dateArray[1])

  // Ensure that date2 > date1
  const startDate = date1 < date2 ? date1 : date2
  const endDate = date1 < date2 ? date2 : date1

  // Difference in milliseconds
  const diffMs = endDate.getTime() - startDate.getTime()

  // Conversions
  const seconds = Math.floor(diffMs / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)
  const weeks = Math.floor(days / 7)
  const months = Math.floor(days / 30.44) // Average
  const years = Math.floor(days / 365.25) // With leap years

  // Detailed object for returnObject
  const breakdown = { years, months, weeks, days, hours, minutes, seconds }

  // Formatting according to the requested type
  let formatted: string

  switch (format) {
    case 'short':
      if (years >= 1) formatted = `${years}a`
      else if (months >= 1) formatted = `${months}m`
      else if (weeks >= 1) formatted = `${weeks}sem`
      else if (days >= 1) formatted = `${days}j`
      else if (hours >= 1) formatted = `${hours}h`
      else if (minutes >= 1) formatted = `${minutes}min`
      else formatted = `${seconds}s`
      break

    case 'precise':
      const preciseYears = Math.floor(days / 365)
      const preciseMonths = Math.floor((days % 365) / 30)
      const preciseWeeks = Math.floor(((days % 365) % 30) / 7)
      const preciseDays = ((days % 365) % 30) % 7

      const parts = []
      if (preciseYears > 0) parts.push(`${preciseYears} année${preciseYears > 1 ? 's' : ''}`)
      if (preciseMonths > 0) parts.push(`${preciseMonths} mois`)
      if (preciseWeeks > 0) parts.push(`${preciseWeeks} semaine${preciseWeeks > 1 ? 's' : ''}`)
      if (preciseDays > 0) parts.push(`${preciseDays} jour${preciseDays > 1 ? 's' : ''}`)

      formatted = parts.length > 0 ? parts.join(', ') : '0 jour'
      break

    case 'auto':
    default:
      // Automatic format - the most appropriate
      if (years >= 1) {
        formatted = years === 1 ? (months >= 1 ? `${years + 1} années` : '1 année') : `${years} années`
      } else if (months >= 1) {
        formatted = months === 1 ? (weeks >= 1 ? `${months + 1} mois` : '1 mois') : `${months} mois`
      } else if (weeks >= 1) {
        formatted = weeks === 1 ? (days >= 1 ? `${weeks + 1} semaines` : '1 semaine') : `${weeks} semaines`
      } else if (days >= 1) {
        formatted = days === 1 ? (hours >= 1 ? `${days + 1} jours` : '1 jour') : `${days} jours`
      } else if (hours >= 1) {
        formatted = hours === 1 ? (minutes >= 1 ? `${hours + 1} heures` : '1 heure') : `${hours} heures`
      } else if (minutes >= 1) {
        formatted = minutes === 1 ? (seconds >= 1 ? `${minutes + 1} minutes` : '1 minute') : `${minutes} minutes`
      } else {
        formatted = seconds === 1 ? '1 seconde' : `${seconds} secondes`
      }
      break
  }

  // Return according to the requested type
  if (returnObject || format === 'detailed') {
    return {
      formatted,
      totalDays: days,
      breakdown,
    }
  }

  return formatted
}

/**
 * Formats a number with K or M
 *
 * @param n - The number to format
 *
 * @returns A string representing the formatted number
 *
 * @example
 * formatCount(1000) // returns "1K"
 */
export function formatCount(n: number) {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`
  if (n >= 1_000) return `${Math.floor(n / 1_000)}K`
  return `${n}`
}

/**
 * Formats a date string to a human-readable date
 *
 * @param dateString - The date string to format
 *
 * @returns A string representing the formatted date
 *
 * @example
 * getHumanDate("2023-01-01") // returns "1 January 2023"
 */
export function getHumanDate(dateString: string, withTime?: boolean): string {
  const date = new Date(dateString)

  const formatted = date.toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  const formattedDate = formatted.replace(
    /(\d{1,2}) (\w)(\w+)( \d{4})/,
    (_, d, firstLetter, rest, year) => `${d} ${firstLetter.toUpperCase()}${rest}${year}`,
  )

  if (withTime) {
    const time = date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      timeZoneName: 'short',
    })
    return `${formattedDate} • ${time}`
  }

  return formattedDate
}

/**
 * Formats a date string to a machine-readable date
 *
 * @param dateString - The date string to format
 *
 * @returns A string representing the formatted date
 *
 * @example
 * getMachineDate("2023-01-01") // returns "2023-01-01T00:00:00[Europe/Paris]"
 * getMachineDate("25 Avril 2026 à 14:30 UTC"); // returns "2026-04-25T14:30:00[UTC]"
 * getMachineDate("April 25, 2026 at 2:30 PM"); // returns "2026-04-25T14:30:00[Europe/Paris]"
 * getMachineDate("2026年4月25日 14:30"); // returns "2026-04-25T14:30:00[Europe/Paris]"
 * getMachineDate("2026-04-25T14:30:00Z"); // returns "2026-04-25T14:30:00[Europe/Paris]"
 */
/**
 * Formats a date string to a machine-readable date
 *
 * @param dateString - The date string to format
 *
 * @returns A string representing the formatted date
 *
 * @example
 * getMachineDate("2023-01-01") // returns "2023-01-01T00:00:00[Europe/Paris]"
 * getMachineDate("25 Avril 2026 à 14:30 UTC"); // returns "2026-04-25T14:30:00[UTC]"
 * getMachineDate("April 25, 2026 at 2:30 PM"); // returns "2026-04-25T14:30:00[Europe/Paris]"
 * getMachineDate("2026年4月25日 14:30"); // returns "2026-04-25T14:30:00[Europe/Paris]"
 * getMachineDate("2026-04-25T14:30:00Z"); // returns "2026-04-25T14:30:00[Europe/Paris]"
 */
export function getMachineDate(dateString: string, withTimezone: boolean = false): string {
  // Try to parse directly (works for ISO, timestamps, etc)
  let date = new Date(dateString)

  if (isNaN(date.getTime())) {
    // Pattern: "25 Avril 2026 à 14:30" or "April 25, 2026 at 2:30 PM" or "2026年4月25日 14:30"
    const numberMatch = dateString.match(/(\d{1,2})[^\d\w]*(\d{1,2}|\w+)[^\d]*(\d{4})[^\d]*(\d{1,2})?[^\d]*(\d{1,2})?/)

    if (numberMatch) {
      const [, day, monthOrNum, year, hours = '0', minutes = '0'] = numberMatch

      let month = Number(monthOrNum)

      // Si ce n'est pas un nombre, c'est le nom du mois
      if (isNaN(month)) {
        const monthNames: { [key: string]: number } = {
          // Français
          janvier: 1,
          février: 2,
          mars: 3,
          avril: 4,
          mai: 5,
          juin: 6,
          juillet: 7,
          août: 8,
          septembre: 9,
          octobre: 10,
          novembre: 11,
          décembre: 12,
          // Anglais
          january: 1,
          february: 2,
          march: 3,
          april: 4,
          may: 5,
          june: 6,
          july: 7,
          august: 8,
          september: 9,
          october: 10,
          november: 11,
          december: 12,
          jan: 1,
          feb: 2,
          mar: 3,
          apr: 4,
          jun: 6,
          jul: 7,
          aug: 8,
          sep: 9,
          oct: 10,
          nov: 11,
          dec: 12,
          // Chinois
          一月: 1,
          二月: 2,
          三月: 3,
          四月: 4,
          五月: 5,
          六月: 6,
          七月: 7,
          八月: 8,
          九月: 9,
          十月: 10,
          十一月: 11,
          十二月: 12,
        }
        month = monthNames[monthOrNum?.toLowerCase() || ''] || 1
      }

      date = new Date(Number(year), month - 1, Number(day), Number(hours), Number(minutes))
    }
  }

  if (isNaN(date.getTime())) {
    throw new Error(`Invalid date format: ${dateString}`)
  }

  const isoDate = date.toISOString().replace('Z', '')
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone

  return withTimezone ? `${isoDate}[${timezone}]` : isoDate
}

/**
 * Check if a date string is today
 *
 * @param dateString - The date string to check
 *
 * @returns A boolean indicating if the date is today
 *
 * @example
 * getIsToday("2023-01-01") // returns false
 * getIsToday("2026-04-25") // returns true (if today is 2026-04-25)
 */
export function getIsToday(dateString: string): boolean {
  const d = new Date(getMachineDate(dateString))
  const today = new Date()
  return d.getDate() === today.getDate() && d.getMonth() === today.getMonth() && d.getFullYear() === today.getFullYear()
}
