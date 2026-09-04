import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const ROOT = path.resolve(__dirname, '..')
const GLOBALS_CSS_PATH = path.join(ROOT, 'src/app/globals.css')
const REGISTRY_DIR = path.join(ROOT, 'src/registry')

/**
 * Convert 3 or 6 digit hex to HSL string: "hsl(h s% l%)"
 */
function hexToHsl(hex: string): string {
  let cleaned = hex.replace('#', '').trim()
  if (cleaned.length === 3) {
    cleaned = cleaned
      .split('')
      .map((c) => c + c)
      .join('')
  }
  if (cleaned.length !== 6) return hex

  const r = parseInt(cleaned.substring(0, 2), 16) / 255
  const g = parseInt(cleaned.substring(2, 4), 16) / 255
  const b = parseInt(cleaned.substring(4, 6), 16) / 255

  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  let h = 0
  let s = 0
  const l = (max + min) / 2

  if (max !== min) {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0)
        break
      case g:
        h = (b - r) / d + 2
        break
      case b:
        h = (r - g) / d + 4
        break
    }
    h /= 6
  }

  const hDeg = Math.round(h * 360)
  const sPct = Math.round(s * 100)
  const lPct = Math.round(l * 100)

  return `hsl(${hDeg} ${sPct}% ${lPct}%)`
}

/**
 * Convert rgba(r, g, b, a) to --alpha(var(...) / X%) or hsl with alpha
 */
function rgbaToAlpha(rgba: string): string {
  const match = rgba.match(/rgba\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*([\d.]+)\s*\)/i)
  if (!match) return rgba

  const r = parseInt(match[1], 10)
  const g = parseInt(match[2], 10)
  const b = parseInt(match[3], 10)
  const alpha = parseFloat(match[4])
  const alphaPct = Math.round(alpha * 100)

  if (r === 0 && g === 0 && b === 0) {
    return `--alpha(var(--color-black) / ${alphaPct}%)`
  }
  if (r === 255 && g === 255 && b === 255) {
    return `--alpha(var(--color-white) / ${alphaPct}%)`
  }

  // fallback to HSL with alpha
  const hex = `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`
  const hsl = hexToHsl(hex)
  return hsl.replace(')', ` / ${alphaPct}%)`)
}

/**
 * Transform color values in a CSS snippet or dictionary
 */
function normalizeColorValues(val: string): string {
  let res = val
  // Convert rgba(...)
  res = res.replace(/rgba\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*,\s*[\d.]+\s*\)/gi, (m) => rgbaToAlpha(m))
  // Convert #hex
  res = res.replace(/#([0-9a-fA-F]{3,6})\b/g, (m) => hexToHsl(m))
  return res
}

/**
 * Parse CSS block properties into a key-value map
 */
function parseCssBlock(cssText: string, selector: string): Record<string, string> {
  const map: Record<string, string> = {}
  // Regex to match selector block: selector { ... }
  const regex = new RegExp(`${selector.replace('.', '\\.')}\\s*\\{([\\s\\S]*?)\\}`, 'm')
  const match = cssText.match(regex)
  if (!match) return map

  const body = match[1]
  const lines = body.split(';')
  for (const line of lines) {
    const trimmed = line.trim()
    if (!trimmed || !trimmed.startsWith('--')) continue
    const colonIdx = trimmed.indexOf(':')
    if (colonIdx === -1) continue
    const propName = trimmed.substring(2, colonIdx).trim()
    const propVal = trimmed.substring(colonIdx + 1).trim()
    map[propName] = propVal
  }
  return map
}

async function run() {
  console.log('🔄 Scanning and synchronizing globals.css with registry styles...')

  if (!fs.existsSync(GLOBALS_CSS_PATH)) {
    console.error(`globals.css not found at ${GLOBALS_CSS_PATH}`)
    return
  }

  let globalsCss = fs.readFileSync(GLOBALS_CSS_PATH, 'utf-8')

  // 1. Convert all Hex in globals.css to HSL / --alpha
  let updatedCss = globalsCss.replace(/#[0-9a-fA-F]{3,6}\b/g, (hex) => hexToHsl(hex))
  updatedCss = updatedCss.replace(/rgba\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*,\s*[\d.]+\s*\)/gi, (rgba) => rgbaToAlpha(rgba))

  if (updatedCss !== globalsCss) {
    fs.writeFileSync(GLOBALS_CSS_PATH, updatedCss, 'utf-8')
    globalsCss = updatedCss
    console.log('✅ Formatted globals.css: replaced hex with HSL and rgba with --alpha().')
  }

  // 2. Extract active CSS variables
  const rootVars = parseCssBlock(globalsCss, ':root')
  const darkVars = parseCssBlock(globalsCss, '.dark')

  // Convert keys to clean dictionary
  const cleanRootVars: Record<string, string> = {}
  for (const [k, v] of Object.entries(rootVars)) {
    cleanRootVars[k] = normalizeColorValues(v)
  }

  const cleanDarkVars: Record<string, string> = {}
  for (const [k, v] of Object.entries(darkVars)) {
    cleanDarkVars[k] = normalizeColorValues(v)
  }

  // 3. Update lib/colors-neutral/registry-item.json
  const colorsNeutralPath = path.join(REGISTRY_DIR, 'lib/colors-neutral/registry-item.json')
  if (fs.existsSync(colorsNeutralPath)) {
    const data = JSON.parse(fs.readFileSync(colorsNeutralPath, 'utf-8'))
    data.cssVars = {
      dark: cleanDarkVars,
      light: cleanRootVars,
    }
    fs.writeFileSync(colorsNeutralPath, JSON.stringify(data, null, 2) + '\n', 'utf-8')
    console.log('✅ Synced lib/colors-neutral/registry-item.json with HSL tokens.')
  }

  // 4. Update lib/style/registry-item.json
  const stylePath = path.join(REGISTRY_DIR, 'lib/style/registry-item.json')
  if (fs.existsSync(stylePath)) {
    const data = JSON.parse(fs.readFileSync(stylePath, 'utf-8'))
    data.cssVars = {
      dark: {
        ...cleanDarkVars,
        'chart-1': 'var(--color-blue-700)',
        'chart-2': 'var(--color-emerald-500)',
        'chart-3': 'var(--color-amber-500)',
        'chart-4': 'var(--color-purple-500)',
        'chart-5': 'var(--color-rose-500)',
      },
      light: {
        ...cleanRootVars,
        'chart-1': 'var(--color-orange-600)',
        'chart-2': 'var(--color-teal-600)',
        'chart-3': 'var(--color-cyan-900)',
        'chart-4': 'var(--color-amber-400)',
        'chart-5': 'var(--color-amber-500)',
      },
      theme: {
        'font-sans': 'var(--font-sans, ui-sans-serif, system-ui, sans-serif)',
        'font-mono': 'var(--font-mono, ui-monospace, monospace)',
        'font-heading': 'var(--font-sans, ui-sans-serif, system-ui, sans-serif)',
      },
    }
    fs.writeFileSync(stylePath, JSON.stringify(data, null, 2) + '\n', 'utf-8')
    console.log('✅ Synced lib/style/registry-item.json with HSL tokens.')
  }

  // 5. Update primitives with cssVars
  const primitivesToSync = ['alert', 'badge', 'button', 'context-menu', 'field', 'menu']
  for (const prim of primitivesToSync) {
    const primPath = path.join(REGISTRY_DIR, `primitives/${prim}/registry-item.json`)
    if (fs.existsSync(primPath)) {
      const data = JSON.parse(fs.readFileSync(primPath, 'utf-8'))
      if (prim === 'alert' || prim === 'badge') {
        data.cssVars = {
          dark: {
            'destructive-foreground': cleanDarkVars['destructive-foreground'] || 'var(--color-red-400)',
            info: cleanDarkVars['info'] || 'var(--color-blue-500)',
            'info-foreground': cleanDarkVars['info-foreground'] || 'var(--color-blue-400)',
            success: cleanDarkVars['success'] || 'var(--color-emerald-500)',
            'success-foreground': cleanDarkVars['success-foreground'] || 'var(--color-emerald-400)',
            warning: cleanDarkVars['warning'] || 'var(--color-amber-500)',
            'warning-foreground': cleanDarkVars['warning-foreground'] || 'var(--color-amber-400)',
          },
          light: {
            'destructive-foreground': cleanRootVars['destructive-foreground'] || 'var(--color-red-500)',
            info: cleanRootVars['info'] || 'var(--color-blue-500)',
            'info-foreground': cleanRootVars['info-foreground'] || 'var(--color-blue-500)',
            success: cleanRootVars['success'] || 'var(--color-emerald-500)',
            'success-foreground': cleanRootVars['success-foreground'] || 'var(--color-emerald-500)',
            warning: cleanRootVars['warning'] || 'var(--color-amber-500)',
            'warning-foreground': cleanRootVars['warning-foreground'] || 'var(--color-amber-500)',
          },
        }
      } else {
        data.cssVars = {
          dark: {
            'destructive-foreground': cleanDarkVars['destructive-foreground'] || 'var(--color-red-400)',
          },
          light: {
            'destructive-foreground': cleanRootVars['destructive-foreground'] || 'var(--color-red-500)',
          },
        }
      }
      fs.writeFileSync(primPath, JSON.stringify(data, null, 2) + '\n', 'utf-8')
      console.log(`✅ Synced primitives/${prim}/registry-item.json.`)
    }
  }

  console.log('✨ All registry style tokens synchronized successfully in HSL and --alpha() format.')
}

run().catch((err) => {
  console.error('Error during style sync:', err)
  process.exit(1)
})
