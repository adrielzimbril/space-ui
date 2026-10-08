/**
 * Pre-rendered loops for the landing and /tools cards.
 *
 * Rendered with /tools/card-studio (`pnpm cards`) into public/launch/demos, whose manifest.json is
 * read here directly, then uploaded to the CDN. A card in the manifest plays its video in place of
 * its live demo, unless one of its videos is heavier than MAX_VIDEO_BYTES or it's listed in
 * KEEP_LIVE; any other card keeps running live.
 */
import manifest from '../../public/launch/demos/manifest.json'

export const CARD_MEDIA_BASE = 'https://cdn.spaceui.one/atom/launch/demos'

/** A loop heavier than this costs more to download than the live demo costs to run. */
export const MAX_VIDEO_BYTES = 1024 * 1024

/** Rendered, but better live (say, it reacts to the cursor). */
const KEEP_LIVE = new Set<string>(['github', 'github-activity', 'image-split', 'audio', 'squircle'])

export type CardMediaTheme = 'light' | 'dark'

export interface CardMediaEntry {
  /** Rendered demo area in CSS px: its aspect ratio sizes the video box. */
  width: number
  height: number
  /** Render timestamp, appended to the URLs so the CDN serves the new files after a re-render. */
  v: number
  renderedAt?: string
  /** Loop length (s), frame rate and pixel ratio of the render. */
  loop?: number
  fps?: number
  scale?: number
  /** Bytes per theme. */
  files?: Partial<Record<CardMediaTheme, { video: number; poster: number }>>
}

const ALL_MEDIA = manifest as Record<string, CardMediaEntry>

function playable(id: string, entry: CardMediaEntry) {
  if (KEEP_LIVE.has(id)) return false
  const files = Object.values(entry.files ?? {})
  // Both themes rendered, each within budget.
  return files.length === 2 && files.every((file) => file.video <= MAX_VIDEO_BYTES)
}

export const CARD_MEDIA: Record<string, CardMediaEntry> = Object.fromEntries(
  Object.entries(ALL_MEDIA).filter(([id, entry]) => playable(id, entry)),
)

/** Every rendered card, playable or not (Card Studio shows why one isn't used). */
export const CARD_MEDIA_RENDERED = ALL_MEDIA

export function cardMediaUrl(id: string, theme: CardMediaTheme, kind: 'video' | 'poster', v?: number) {
  const file = `${id}-${theme}.${kind === 'video' ? 'mp4' : 'jpg'}`
  return `${CARD_MEDIA_BASE}/${file}${v ? `?v=${v}` : ''}`
}
