'use client'

import * as React from 'react'

export interface SanitizeContentOptions {
  allowedTags?: string[]
  allowedAttributes?: Record<string, string[]>
  allowedIframeHostnames?: string[]
  allowedSchemes?: string[]
  stripAllTags?: boolean
}

const DEFAULT_ALLOWED_TAGS = [
  'p',
  'strong',
  'em',
  'u',
  's',
  'b',
  'i',
  'sub',
  'sup',
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'ul',
  'ol',
  'li',
  'blockquote',
  'pre',
  'code',
  'hr',
  'br',
  'span',
  'div',
  'a',
  'img',
  'iframe',
  'table',
  'thead',
  'tbody',
  'tfoot',
  'tr',
  'th',
  'td',
]

const DEFAULT_ALLOWED_ATTRIBUTES: Record<string, string[]> = {
  p: ['style', 'class'],
  strong: ['style', 'class'],
  em: ['style', 'class'],
  u: ['style', 'class'],
  pre: ['style', 'class'],
  sub: ['style'],
  sup: ['style'],
  span: ['style', 'class'],
  div: ['style', 'class'],
  a: ['style', 'href', 'target', 'rel', 'class', 'name', 'title'],
  img: ['src', 'srcset', 'alt', 'title', 'width', 'height', 'loading', 'class', 'style'],
  li: ['style', 'class'],
  iframe: ['src', 'frameborder', 'allowfullscreen', 'class', 'width', 'height', 'title'],
  table: ['class', 'style'],
  th: ['class', 'style', 'scope', 'colspan', 'rowspan'],
  td: ['class', 'style', 'colspan', 'rowspan'],
}

const DEFAULT_ALLOWED_IFRAME_HOSTNAMES = [
  'www.youtube.com',
  'youtube.com',
  'www.youtube-nocookie.com',
  'player.vimeo.com',
  'vimeo.com',
]

const COLOR_REGEX =
  /^#(0x)?[0-9a-f]+$|^rgb(s*(d{1,3})s*,s*(d{1,3})s*,s*(d{1,3})s*)$|^rgba(s*(d{1,3})s*,s*(d{1,3})s*,s*(d{1,3})s*,s*[d.]+)$/i
const TEXT_ALIGN_REGEX = /^(left|right|center|justify)$/i
const FONT_SIZE_REGEX = /^d+(.d+)?(px|em|rem|%)$/i

function sanitizeStyle(styleString: string): string {
  if (!styleString) return ''
  const declarations = styleString.split(';')
  const validStyles: string[] = []

  for (const decl of declarations) {
    const [prop, ...valParts] = decl.split(':')
    if (!prop || valParts.length === 0) continue
    const property = prop.trim().toLowerCase()
    const value = valParts.join(':').trim()

    if (property === 'color' && COLOR_REGEX.test(value)) {
      validStyles.push(`${property}: ${value}`)
    } else if (property === 'background-color' && COLOR_REGEX.test(value)) {
      validStyles.push(`${property}: ${value}`)
    } else if (property === 'text-align' && TEXT_ALIGN_REGEX.test(value)) {
      validStyles.push(`${property}: ${value}`)
    } else if (property === 'font-size' && FONT_SIZE_REGEX.test(value)) {
      validStyles.push(`${property}: ${value}`)
    }
  }

  return validStyles.join('; ')
}

function isSafeHostname(url: string, allowedHostnames: string[]): boolean {
  try {
    const parsed = new URL(url)
    return allowedHostnames.includes(parsed.hostname)
  } catch {
    return false
  }
}

export function sanitizeHtmlContent(rawHtml: string, options: SanitizeContentOptions = {}): string {
  if (typeof window === 'undefined' || !rawHtml) {
    return rawHtml || ''
  }

  const {
    allowedTags = DEFAULT_ALLOWED_TAGS,
    allowedAttributes = DEFAULT_ALLOWED_ATTRIBUTES,
    allowedIframeHostnames = DEFAULT_ALLOWED_IFRAME_HOSTNAMES,
    stripAllTags = false,
  } = options

  const parser = new DOMParser()
  const doc = parser.parseFromString(rawHtml, 'text/html')

  if (stripAllTags) {
    return doc.body.textContent || ''
  }

  function cleanNode(node: Node) {
    const children = Array.from(node.childNodes)
    for (const child of children) {
      if (child.nodeType === Node.ELEMENT_NODE) {
        const element = child as HTMLElement
        const tagName = element.tagName.toLowerCase()

        // Disallow dangerous or unlisted tags
        if (!allowedTags.includes(tagName) || tagName === 'script' || tagName === 'object' || tagName === 'embed') {
          element.remove()
          continue
        }

        // Iframe specific validation
        if (tagName === 'iframe') {
          const src = element.getAttribute('src') || ''
          if (!src || !isSafeHostname(src, allowedIframeHostnames)) {
            element.remove()
            continue
          }
        }

        // Filter element attributes
        const allowedAttrsForTag = allowedAttributes[tagName] || allowedAttributes['*'] || ['class', 'style']
        const attrs = Array.from(element.attributes)
        for (const attr of attrs) {
          const attrName = attr.name.toLowerCase()
          const attrValue = attr.value.trim()

          // Check if attribute is allowed
          if (!allowedAttrsForTag.includes(attrName) && !attrName.startsWith('data-')) {
            element.removeAttribute(attr.name)
            continue
          }

          // Check for JavaScript protocols in URLs
          if (
            (attrName === 'href' || attrName === 'src') &&
            (attrValue.toLowerCase().startsWith('javascript:') || attrValue.toLowerCase().startsWith('vbscript:'))
          ) {
            element.removeAttribute(attr.name)
            continue
          }

          // Sanitize inline CSS styles
          if (attrName === 'style') {
            const cleanCss = sanitizeStyle(attrValue)
            if (cleanCss) {
              element.setAttribute('style', cleanCss)
            } else {
              element.removeAttribute('style')
            }
          }
        }

        cleanNode(element)
      }
    }
  }

  cleanNode(doc.body)
  return doc.body.innerHTML
}

type UseSanitizeContentInput = string | { description: string }

export function useSanitizeContent(input: UseSanitizeContentInput, options: SanitizeContentOptions = {}): string {
  const content = typeof input === 'string' ? input : input?.description || ''
  const [isClient, setIsClient] = React.useState(false)

  React.useEffect(() => {
    setIsClient(true)
  }, [])

  const cleanContent = React.useMemo(() => {
    if (!content) return ''
    return sanitizeHtmlContent(content, options)
  }, [content, options])

  return isClient ? cleanContent : ''
}
