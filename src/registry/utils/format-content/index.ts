/**
 * Navigation or table of contents tree item structure.
 */
export type ContentStructureItem = {
  label: string
  path: string
  children: ContentStructureItem[]
  isPage: boolean
}

/**
 * Converts a title or headline string into an SEO-friendly URL slug.
 *
 * @param {string} headline - The raw headline text to slugify.
 * @returns {string} The slugified string (e.g. 'getting-started-with-react').
 *
 * @example
 * slugifyHeadline("Getting Started with React!"); // => 'getting-started-with-react'
 * slugifyHeadline("Components & Hooks (v2.0)");  // => 'components-hooks-v20'
 */
export function slugifyHeadline(headline: string): string {
  return headline
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}
