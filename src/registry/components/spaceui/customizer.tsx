'use client'

import * as React from 'react'
import {
  Check,
  ChevronRight,
  Copy,
  Dices,
  ExternalLink,
  Lock,
  LockOpen,
  Plus,
  RotateCcw,
  Save,
  Share2,
  Sparkles,
  Trash2,
} from 'lucide-react'

import {
  DEFAULT_REUI_CONFIG,
  decodeReuiPreset,
  encodeReuiPreset,
  getReuiPreviewStyle,
  REUI_BASE_COLORS,
  REUI_CONFIG_STORAGE_KEY,
  REUI_FONTS,
  REUI_ICON_LIBRARIES,
  REUI_MENU_COLORS,
  REUI_PRESETS_STORAGE_KEY,
  REUI_RADII,
  REUI_STYLES,
  REUI_THEMES,
  type ReuiCustomizerConfig,
  type ReuiLockableKey,
  type SavedReuiPreset,
} from '@/lib/reui-customizer'
import { useLocalStorage } from '@/registry/hooks/browser/use-local-storage'
import { useClipboard } from '@/registry/hooks/browser/use-clipboard'
import { cn } from '@/registry/lib/utils'

const fields: {
  key: ReuiLockableKey
  label: string
  values: readonly string[]
}[] = [
  {
    key: 'style',
    label: 'Style',
    values: REUI_STYLES.map((item) => item.value),
  },
  { key: 'baseColor', label: 'Base color', values: REUI_BASE_COLORS },
  { key: 'theme', label: 'Theme', values: REUI_THEMES },
  { key: 'chartColor', label: 'Chart color', values: REUI_THEMES },
  {
    key: 'fontHeading',
    label: 'Heading',
    values: ['inherit', ...REUI_FONTS],
  },
  { key: 'font', label: 'Font', values: REUI_FONTS },
  {
    key: 'radius',
    label: 'Radius',
    values: REUI_RADII.map((item) => item.value),
  },
  { key: 'menuColor', label: 'Menu color', values: REUI_MENU_COLORS },
  { key: 'menuAccent', label: 'Menu accent', values: ['subtle', 'bold'] },
]

function Control({
  field,
  value,
  locked,
  onChange,
  onToggleLock,
}: {
  field: (typeof fields)[number]
  value: string
  locked: boolean
  onChange: (value: string) => void
  onToggleLock: () => void
}) {
  return (
    <div className="grid grid-cols-[82px_1fr_30px] items-center gap-2 border-b border-border/70 py-2.5 last:border-0">
      <label htmlFor={`reui-${field.key}`} className="text-xs font-medium text-muted-foreground">
        {field.label}
      </label>
      <select
        id={`reui-${field.key}`}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-8 min-w-0 rounded-md border bg-background px-2 text-xs capitalize outline-none focus:ring-2 focus:ring-ring/40"
      >
        {field.values.map((option) => (
          <option key={option} value={option}>
            {option.replaceAll('-', ' ')}
          </option>
        ))}
      </select>
      <button
        type="button"
        onClick={onToggleLock}
        aria-label={`${locked ? 'Unlock' : 'Lock'} ${field.label}`}
        className={cn(
          'grid size-8 place-items-center rounded-md border transition-colors',
          locked
            ? 'border-primary/30 bg-primary/10 text-primary'
            : 'text-muted-foreground hover:bg-muted hover:text-foreground',
        )}
      >
        {locked ? <Lock className="size-3.5" /> : <LockOpen className="size-3.5" />}
      </button>
    </div>
  )
}

export function ReuiCustomizer() {
  const [config, setConfig] = useLocalStorage<ReuiCustomizerConfig>(REUI_CONFIG_STORAGE_KEY, DEFAULT_REUI_CONFIG)
  const [locks, setLocks] = React.useState<Set<ReuiLockableKey>>(new Set())
  const [presets, setPresets] = useLocalStorage<SavedReuiPreset[]>(REUI_PRESETS_STORAGE_KEY, [])
  const [presetName, setPresetName] = React.useState('')
  const [mounted, setMounted] = React.useState(false)
  const { copy: copyToClipboard, copied } = useClipboard({ timeout: 1800 })

  React.useEffect(() => {
    const search = new URLSearchParams(window.location.search)
    const shared = search.get('preset')
    if (shared) {
      const decoded = decodeReuiPreset(shared)
      if (decoded) setConfig(decoded)
    }
    setMounted(true)
  }, [setConfig])

  React.useEffect(() => {
    if (!mounted) return
    window.dispatchEvent(new Event('reui:icon-library-changed'))
    document.documentElement.dataset.reuiStyle = config.style
  }, [config.style, mounted])

  const update = React.useCallback(
    (key: ReuiLockableKey, value: string) => {
      setConfig((current) => ({ ...current, [key]: value }))
    },
    [setConfig],
  )

  const toggleLock = (key: ReuiLockableKey) => {
    setLocks((current) => {
      const next = new Set(current)
      if (next.has(key)) {
        next.delete(key)
      } else {
        next.add(key)
      }
      return next
    })
  }

  const randomize = () => {
    const next = { ...config }
    for (const field of fields) {
      if (locks.has(field.key)) continue
      next[field.key] = getRandomItem(field.values, next[field.key])
    }
    setConfig(next)
  }

  const reset = () => {
    setConfig(DEFAULT_REUI_CONFIG)
    setLocks(new Set())
  }

  const savePreset = () => {
    const name = presetName.trim() || `Preset ${presets.length + 1}`
    const next = [{ id: `${Date.now()}`, name, config }, ...presets]
    setPresets(next)
    setPresetName('')
  }

  const removePreset = (id: string) => {
    setPresets((current) => current.filter((preset) => preset.id !== id))
  }

  const share = async () => {
    const url = new URL(window.location.href)
    url.searchParams.set('preset', encodeReuiPreset(config))
    window.history.replaceState(null, '', url)
    void copyToClipboard(url.toString())
  }

  const presetCode = mounted ? encodeReuiPreset(config) : ''
  const styleInfo = REUI_STYLES.find((item) => item.value === config.style)

  return (
    <div className="min-h-[calc(100svh-4rem)] bg-muted/30">
      <div className="mx-auto grid w-full max-w-[1600px] lg:grid-cols-[280px_minmax(0,1fr)]">
        <aside className="border-r bg-background lg:sticky lg:top-0 lg:h-[calc(100svh-4rem)]">
          <div className="flex items-center justify-between border-b px-4 py-3">
            <div>
              <p className="text-sm font-semibold">Design system</p>
              <p className="text-xs text-muted-foreground">Base UI only</p>
            </div>
            <span className="rounded-full bg-primary/10 px-2 py-1 text-[10px] font-bold tracking-wide text-primary uppercase">
              Haumea
            </span>
          </div>

          <div className="max-h-[calc(100svh-15rem)] overflow-y-auto px-3">
            <div className="grid grid-cols-[82px_1fr_30px] items-center gap-2 border-b py-2.5">
              <span className="text-xs font-medium text-muted-foreground">Base</span>
              <div className="flex h-8 items-center rounded-md border bg-muted/40 px-2 text-xs font-medium">
                Base UI
              </div>
              <Lock className="mx-auto size-3.5 text-primary" />
            </div>
            {fields.map((field) => (
              <Control
                key={field.key}
                field={field}
                value={String(config[field.key])}
                locked={locks.has(field.key)}
                onChange={(value) => update(field.key, value)}
                onToggleLock={() => toggleLock(field.key)}
              />
            ))}
          </div>

          <div className="space-y-2 border-t p-3">
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={randomize}
                className="inline-flex h-9 items-center justify-center gap-2 rounded-md border text-xs font-medium hover:bg-muted"
              >
                <Dices className="size-3.5" /> Random
              </button>
              <button
                type="button"
                onClick={() => setConfig(DEFAULT_REUI_CONFIG)}
                className="inline-flex h-9 items-center justify-center gap-2 rounded-md border text-xs font-medium hover:bg-muted"
              >
                <RotateCcw className="size-3.5" /> Reset
              </button>
            </div>
            <button
              type="button"
              onClick={share}
              className="inline-flex h-9 w-full items-center justify-center gap-2 rounded-md bg-primary text-xs font-medium text-primary-foreground"
            >
              {copied ? <Check className="size-3.5" /> : <Share2 className="size-3.5" />}
              {copied ? 'Link copied' : 'Share preset'}
            </button>
            <div className="truncate rounded-md border bg-muted/30 px-2 py-2 font-mono text-[10px] text-muted-foreground">
              --preset {presetCode}
            </div>
          </div>
        </aside>

        <main className="min-w-0 p-4 sm:p-6 lg:p-10">
          <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <div className="mb-2 flex items-center gap-2 text-xs font-medium text-primary">
                <Sparkles className="size-3.5" /> Live component customization
              </div>
              <h1 className="font-heading text-3xl font-semibold tracking-tight">{styleInfo?.label} system</h1>
              <p className="mt-1 text-sm text-muted-foreground">
                {styleInfo?.description}. Every control updates the preview and the shareable preset.
              </p>
            </div>
            <a
              href="/docs/components/reui/input"
              className="inline-flex h-9 items-center gap-2 rounded-md border bg-background px-3 text-sm font-medium"
            >
              Browse 31 input examples <ExternalLink className="size-3.5" />
            </a>
          </div>

          <section
            style={getReuiPreviewStyle(config)}
            className={cn(
              'overflow-hidden border bg-background text-foreground',
              config.style === 'lyra' ? 'rounded-none' : 'rounded-[var(--radius)]',
              config.style === 'haumea' && 'ring-1 ring-violet-400/20 shadow-[0_30px_100px_-45px_oklch(0.54_0.25_293)]',
            )}
          >
            <div
              className={cn(
                'flex items-center justify-between border-b px-5 py-3',
                config.menuColor.includes('inverted')
                  ? 'bg-foreground text-background'
                  : config.menuColor.includes('translucent')
                    ? 'bg-background/65 backdrop-blur-xl'
                    : 'bg-card',
              )}
            >
              <div className="flex items-center gap-3">
                <div className="grid size-8 place-items-center rounded-[calc(var(--radius)-2px)] bg-primary text-primary-foreground">
                  H
                </div>
                <div>
                  <p className="text-sm font-semibold">Haumea workspace</p>
                  <p className="text-[11px] opacity-60">Base UI · {config.style}</p>
                </div>
              </div>
              <button className="rounded-[calc(var(--radius)-2px)] bg-primary px-3 py-2 text-xs font-medium text-primary-foreground">
                New project
              </button>
            </div>

            <div className="grid gap-5 p-5 md:grid-cols-[1.1fr_.9fr] md:p-8">
              <div className="space-y-5">
                <div>
                  <p className="text-sm font-medium">Welcome back</p>
                  <h2 className="mt-1 text-2xl font-semibold" style={{ fontFamily: 'var(--font-heading)' }}>
                    Your product overview
                  </h2>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    ['Revenue', '$48.2k', '+12.4%'],
                    ['Users', '8,491', '+8.1%'],
                    ['Conversion', '7.8%', '+1.2%'],
                  ].map(([label, value, change]) => (
                    <div key={label} className="rounded-[var(--radius)] border bg-card p-4">
                      <p className="text-xs text-muted-foreground">{label}</p>
                      <p className="mt-2 text-lg font-semibold">{value}</p>
                      <p className="mt-1 text-[11px] text-emerald-600">{change}</p>
                    </div>
                  ))}
                </div>
                <div className="rounded-[var(--radius)] border bg-card p-4">
                  <div className="mb-4 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">Performance</p>
                      <p className="text-xs text-muted-foreground">Last 30 days</p>
                    </div>
                    <select className="rounded-md border bg-background px-2 py-1.5 text-xs">
                      <option>Monthly</option>
                      <option>Weekly</option>
                    </select>
                  </div>
                  <div className="flex h-32 items-end gap-2">
                    {[42, 62, 48, 78, 58, 91, 73, 96, 81, 100, 88, 112].map((height, index) => (
                      <div
                        key={index}
                        style={{
                          height,
                          background: index > 8 ? 'var(--primary)' : 'var(--muted)',
                        }}
                        className="flex-1 rounded-t-sm"
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div className="rounded-[var(--radius)] border bg-card p-5">
                <p className="text-sm font-semibold">Create an account</p>
                <p className="mt-1 text-xs text-muted-foreground">Previewing inputs, buttons and form states.</p>
                <div className="mt-5 space-y-4">
                  {['Full name', 'Email address', 'Password'].map((label) => (
                    <label key={label} className="block text-xs font-medium">
                      {label}
                      <input
                        placeholder={label}
                        type={label === 'Password' ? 'password' : 'text'}
                        className="mt-1.5 h-10 w-full rounded-[calc(var(--radius)-2px)] border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring/40"
                      />
                    </label>
                  ))}
                  <label className="flex items-start gap-2 text-xs text-muted-foreground">
                    <input type="checkbox" className="mt-0.5" /> I agree to the terms and privacy policy.
                  </label>
                  <button className="h-10 w-full rounded-[calc(var(--radius)-2px)] bg-primary text-sm font-medium text-primary-foreground">
                    Create account
                  </button>
                  <button className="h-10 w-full rounded-[calc(var(--radius)-2px)] border text-sm font-medium">
                    Continue with {config.iconLibrary}
                  </button>
                </div>
              </div>
            </div>
          </section>

          <section className="mt-8 rounded-xl border bg-background p-4 sm:p-5">
            <div className="flex flex-col gap-3 sm:flex-row">
              <input
                value={presetName}
                onChange={(event) => setPresetName(event.target.value)}
                placeholder="Preset name"
                className="h-10 flex-1 rounded-md border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring/40"
              />
              <button
                type="button"
                onClick={savePreset}
                className="inline-flex h-10 items-center justify-center gap-2 rounded-md bg-foreground px-4 text-sm font-medium text-background"
              >
                <Save className="size-4" /> Save current preset
              </button>
            </div>

            <div className="mt-4 space-y-2">
              {presets.length === 0 ? (
                <div className="grid min-h-24 place-items-center rounded-lg border border-dashed text-sm text-muted-foreground">
                  <span className="inline-flex items-center gap-2">
                    <Plus className="size-4" /> Your saved presets will appear here
                  </span>
                </div>
              ) : (
                presets.map((preset) => (
                  <div key={preset.id} className="flex items-center justify-between rounded-lg border p-3">
                    <button type="button" onClick={() => setConfig(preset.config)} className="min-w-0 flex-1 text-left">
                      <p className="truncate text-sm font-medium">{preset.name}</p>
                      <p className="mt-0.5 truncate text-xs text-muted-foreground">
                        {preset.config.style} · {preset.config.theme} · {preset.config.font} ·{' '}
                        {preset.config.iconLibrary}
                      </p>
                    </button>
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => void copyToClipboard(encodeReuiPreset(preset.config))}
                        className="grid size-8 place-items-center rounded-md hover:bg-muted"
                        aria-label={`Copy ${preset.name}`}
                      >
                        <Copy className="size-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => removePreset(preset.id)}
                        className="grid size-8 place-items-center rounded-md text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                        aria-label={`Delete ${preset.name}`}
                      >
                        <Trash2 className="size-3.5" />
                      </button>
                      <ChevronRight className="size-4 text-muted-foreground" />
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}
