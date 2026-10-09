import fs from 'fs'
import path from 'path'
import { REGISTRY_STATS } from '@/lib/pricing-config'
import { logger } from '@/registry/utils/logger'

export type WeeklyDropStats = {
  total: number
  components: number
  blocks: number
  interactions: number
  templates: number
  primitives: number
  hooks: number
}

/**
 * Calculates genuine new drops in the last N days (default: 7 days)
 * by reading registry metadata. Demos and internal helpers are excluded.
 */
export async function getWeeklyDropStats(days = 7): Promise<WeeklyDropStats> {
  'use cache'
  const stats: WeeklyDropStats = {
    total: 0,
    components: 0,
    blocks: 0,
    interactions: 0,
    templates: 0,
    primitives: 0,
    hooks: 0,
  }

  try {
    const registryPath = path.join(process.cwd(), 'public', 'r', 'registry.json')
    if (!fs.existsSync(registryPath)) {
      return stats
    }

    const raw = fs.readFileSync(registryPath, 'utf-8')
    const registry = JSON.parse(raw)
    const items = Array.isArray(registry.items) ? registry.items : []

    const cutoffDate = new Date(Date.now() - days * 24 * 60 * 60 * 1000)
    const cutoffStr = cutoffDate.toISOString().slice(0, 10)

    for (const item of items) {
      if (!item || !item.name) continue

      // Exclude demos, libraries and internal tools
      if (
        item.name.startsWith('demo-') ||
        item.type === 'registry:lib' ||
        item.type === 'registry:item' ||
        item.name.startsWith('hooks-utils')
      ) {
        continue
      }

      const itemDate = item.createdAt || item.updatedAt
      if (!itemDate || itemDate < cutoffStr) {
        continue
      }

      stats.total++

      if (item.name.startsWith('interactions-')) {
        stats.interactions++
      } else if (item.name.startsWith('components-')) {
        stats.components++
      } else if (
        item.name.startsWith('block-') ||
        (item.type === 'registry:block' && !item.name.startsWith('template-'))
      ) {
        stats.blocks++
      } else if (item.name.startsWith('template-') || item.type === 'registry:template') {
        stats.templates++
      } else if (item.name.startsWith('primitives-')) {
        stats.primitives++
      } else if (item.name.startsWith('hooks-')) {
        stats.hooks++
      }
    }
  } catch (err) {
    logger.error('[getWeeklyDropStats] Failed to compute registry drop stats:', err)
  }

  return stats
}

/**
 * Generates dynamic rotating hero badge phrases showcasing:
 * 1. Total new items dropped this week (last 7 days)
 * 2. New items by category (components, blocks, interactions, templates...)
 * 3. Space UI evergreen stats and highlights
 */
export async function getHeroBadgePhrases(days = 7): Promise<string[]> {
  const stats = await getWeeklyDropStats(days)
  const phrases: string[] = []

  // 1. Total weekly drops headline
  if (stats.total > 0) {
    phrases.push(`+${stats.total} new drops this week 🔥`)
  } else {
    phrases.push('New drops every week 🔥')
  }

  // 2. Category-specific drops (highlighted whenever drops exist in that category)
  if (stats.interactions > 0) {
    phrases.push(`+${stats.interactions} new interaction${stats.interactions > 1 ? 's' : ''} this week 🤖`)
  }

  if (stats.components > 0) {
    phrases.push(`+${stats.components} new component${stats.components > 1 ? 's' : ''} this week 💎`)
  }

  if (stats.blocks > 0) {
    phrases.push(`+${stats.blocks} new block${stats.blocks > 1 ? 's' : ''} this week 🧱`)
  }

  if (stats.templates > 0) {
    phrases.push(`+${stats.templates} new template${stats.templates > 1 ? 's' : ''} this week 🚀`)
  }

  // 3. Overall catalog metrics & platform badges
  phrases.push(`${REGISTRY_STATS.components}+ production-ready components 🐼`)
  phrases.push('Open-source & MIT licensed 🗿')
  phrases.push("Copy, paste, ship it's yours 🦄")
  phrases.push('Built for Next.js & Base UI 🚀')

  return phrases
}
