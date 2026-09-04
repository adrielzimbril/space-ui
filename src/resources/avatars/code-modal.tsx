'use client'

import { useEffect, useMemo, useState, type ReactNode } from 'react'
import { IconCheck, IconCopy, IconDownload, IconExternalLink, IconX } from '@tabler/icons-react'
import { createAvatar, type AvatarEffect, type AvatarVariant } from '@usespaceui/avatars'
import { Avatar } from '@usespaceui/avatars/react'
import { bloomSound, slideSound } from '@/components/providers/sound-provider'
import { DynamicCodeBlock } from '@/components/docs/code/dynamic-codeblock'
import { MorphIcon } from '@/registry/components/spaceui/morph-icon'
import { useClipboard } from '@/registry/hooks/browser/use-clipboard'
import { useMediaQuery } from '@/registry/hooks/browser/use-media-query'
import { cn } from '@/registry/lib/utils'
import {
  Drawer,
  DrawerClose,
  DrawerDescription,
  DrawerHeader,
  DrawerPanel,
  DrawerPopup,
  DrawerTitle,
} from '@/registry/primitives/drawer'
import { Select, SelectItem, SelectPopup, SelectTrigger, SelectValue } from '@/registry/primitives/select'

const AVATAR_API_BASE_URL = 'https://avatars.spaceui.one'

export interface AvatarModalTarget {
  seed: string
  variant: AvatarVariant | 'all'
  colors?: string[]
}

export interface AvatarModalConfig {
  size: number
  circle: boolean
  effect: AvatarEffect
  animate: boolean
}

type ExportFormat = 'svg' | 'png' | 'webp'
type ModalTab = 'jsx' | 'rest' | 'svg' | 'base64'

function svgDataUrl(svg: string) {
  const bytes = new TextEncoder().encode(svg)
  let binary = ''
  for (const byte of bytes) binary += String.fromCharCode(byte)
  return `data:image/svg+xml;base64,${btoa(binary)}`
}

async function rasterizeSvg(svg: string, format: 'png' | 'webp', size: number) {
  const source = URL.createObjectURL(new Blob([svg], { type: 'image/svg+xml;charset=utf-8' }))
  try {
    const image = new Image()
    await new Promise<void>((resolve, reject) => {
      image.onload = () => resolve()
      image.onerror = () => reject(new Error('Avatar SVG could not be rendered'))
      image.src = source
    })
    const canvas = document.createElement('canvas')
    canvas.width = size
    canvas.height = size
    const context = canvas.getContext('2d')
    if (!context) throw new Error('Canvas is unavailable')
    context.drawImage(image, 0, 0, size, size)
    return await new Promise<Blob>((resolve, reject) => {
      canvas.toBlob(
        (blob) => (blob ? resolve(blob) : reject(new Error('Avatar image could not be encoded'))),
        `image/${format}`,
        1,
      )
    })
  } finally {
    URL.revokeObjectURL(source)
  }
}

function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement('a')
  anchor.href = url
  anchor.download = filename
  anchor.click()
  URL.revokeObjectURL(url)
}

function codeFor(target: AvatarModalTarget, config: AvatarModalConfig) {
  const lines = [`<Avatar`, `  name="${target.seed}"`, `  variant="${target.variant}"`, `  size={${config.size}}`]
  if (target.colors?.length) lines.push(`  colors={[${target.colors.map((color) => `"${color}"`).join(', ')}]}`)
  if (config.animate) lines.push('  animate')
  if (config.effect !== 'none') lines.push(`  effect="${config.effect}"`)
  if (config.circle) lines.push('  circle')
  lines.push('/>')
  return `import { Avatar } from '@usespaceui/avatars/react';\n\n${lines.join('\n')}`
}

function restFor(target: AvatarModalTarget, config: AvatarModalConfig) {
  const params = [
    config.size !== 128 ? `size=${config.size}` : '',
    config.circle ? 'circle=true' : '',
    config.effect !== 'none' ? `effect=${config.effect}` : '',
    config.animate ? 'animate=true' : '',
    target.colors?.length ? `colors=${target.colors.map((color) => color.replace(/^#/, '')).join(',')}` : '',
  ].filter(Boolean)
  return `${AVATAR_API_BASE_URL}/v1/${target.variant}/${encodeURIComponent(target.seed)}.svg${params.length ? `?${params.join('&')}` : ''}`
}

function ActionButton({
  children,
  onClick,
  label,
  active = false,
}: {
  children: ReactNode
  onClick: () => void
  label: string
  active?: boolean
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="inline-flex h-9 items-center justify-center gap-1.5 rounded-xl bg-muted px-3 text-xs font-medium uppercase transition-[background-color,color,scale] hover:bg-muted hover:text-foreground active:scale-[0.96] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
    >
      {children}
      {active && <IconCheck aria-hidden="true" className="size-3.5" />}
    </button>
  )
}

export function AvatarCodeModal({
  target,
  config,
  onClose,
  open = true,
}: {
  target: AvatarModalTarget | null
  config: AvatarModalConfig
  onClose: () => void
  open?: boolean
}) {
  const [tab, setTab] = useState<ModalTab>('jsx')
  const [visibleTarget, setVisibleTarget] = useState<AvatarModalTarget | null>(target)
  const isOpen = open && Boolean(target)
  const isDesktop = useMediaQuery('(min-width: 768px)', true)
  const { copy, copied } = useClipboard({ timeout: 1600 })

  const [exportFormat, setExportFormat] = useState<ExportFormat>('png')
  const [exportSize, setExportSize] = useState<string>('512')
  const [exportCircle, setExportCircle] = useState<boolean>(config.circle)

  useEffect(() => {
    if (target) {
      setTab('jsx')
      setExportFormat('png')
      setExportSize('512')
      setExportCircle(config.circle)
      setVisibleTarget(target)
    }
  }, [target, config.circle])

  const actualExportSize = Number(exportSize)

  const svg = useMemo(() => {
    if (!visibleTarget) return ''
    return createAvatar({
      name: visibleTarget.seed,
      variant: visibleTarget.variant,
      size: actualExportSize,
      colors: visibleTarget.colors,
      circle: exportCircle,
      effect: config.effect,
      animate: config.animate,
    })
  }, [config.animate, exportCircle, config.effect, actualExportSize, visibleTarget])

  const code = useMemo(() => {
    if (!visibleTarget) return ''
    if (tab === 'svg') return svg
    if (tab === 'base64') return svgDataUrl(svg)
    const exportConfig = { ...config, size: actualExportSize, circle: exportCircle }
    return tab === 'jsx' ? codeFor(visibleTarget, exportConfig) : restFor(visibleTarget, exportConfig)
  }, [visibleTarget, config, actualExportSize, exportCircle, tab, svg])

  if (!visibleTarget) return null

  const copyCode = () => {
    void copy(code).then((ok) => {
      if (ok) bloomSound()
    })
  }

  const download = async () => {
    try {
      const filename = `space-avatar-${visibleTarget.seed}.${exportFormat}`
      const downloadSvg = createAvatar({
        name: visibleTarget.seed,
        variant: visibleTarget.variant,
        size: actualExportSize,
        colors: visibleTarget.colors,
        circle: exportCircle,
        effect: config.effect,
        animate: config.animate,
      })
      if (exportFormat === 'svg') {
        downloadBlob(new Blob([downloadSvg], { type: 'image/svg+xml;charset=utf-8' }), filename)
      } else {
        downloadBlob(await rasterizeSvg(downloadSvg, exportFormat, actualExportSize), filename)
      }
      bloomSound()
    } catch {
      /* ignore rasterize errors */
    }
  }

  return (
    <Drawer
      open={isOpen}
      onOpenChange={(nextOpen) => {
        if (!nextOpen) {
          slideSound()
          onClose()
        }
      }}
      position={isDesktop ? 'right' : 'bottom'}
    >
      <DrawerPopup
        className={cn(
          'max-w-lg border-none bg-muted p-2! shadow-none before:shadow-none dark:before:shadow-none',
          !isDesktop && 'pt-8',
        )}
        variant="inset"
        showBar={!isDesktop}
      >
        <DrawerHeader className="rounded-2xl bg-background px-5 py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex min-w-0 items-center gap-3">
              <div className="min-w-0">
                <DrawerDescription className="text-xs font-medium uppercase tracking-tight">
                  Selected avatar
                </DrawerDescription>
                <DrawerTitle className="mt-1 truncate text-lg tracking-tight">
                  {visibleTarget.seed}{' '}
                  <span className="text-sm font-normal text-muted-foreground">/ {visibleTarget.variant}</span>
                </DrawerTitle>
              </div>
            </div>
            <DrawerClose
              render={
                <button
                  type="button"
                  aria-label="Close avatar details"
                  className="grid size-10 shrink-0 place-items-center rounded-xl bg-muted text-muted-foreground transition-[background-color,color,scale] hover:text-foreground active:scale-[0.96] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground [&_svg]:size-auto"
                >
                  <IconX aria-hidden="true" className="size-4" />
                </button>
              }
            />
          </div>
        </DrawerHeader>

        <DrawerPanel className="px-1 pt-2">
          <div className="grid gap-1.5 lg:grid-cols-[1fr_10rem]">
            <div className="flex min-h-60 items-center justify-center rounded-2xl bg-background p-8">
              <Avatar
                name={visibleTarget.seed}
                size={160}
                variant={visibleTarget.variant}
                colors={visibleTarget.colors}
                animate={config.animate}
                effect={config.effect}
                circle={exportCircle}
              />
            </div>
            <div className="grid grid-cols-2 gap-1.5 lg:grid-cols-1">
              <div className="rounded-2xl bg-background p-3">
                <p className="px-1 text-[0.625rem] uppercase tracking-tight text-muted-foreground">Variant</p>
                <p className="mt-1.5 px-1 text-sm font-medium capitalize">{visibleTarget.variant.replace(/-/g, ' ')}</p>
              </div>
              <div className="rounded-2xl bg-background p-3">
                <p className="px-1 text-[0.625rem] uppercase tracking-tight text-muted-foreground">Shape</p>
                <Select
                  value={exportCircle ? 'circle' : 'square'}
                  onValueChange={(value) => {
                    if (value) setExportCircle(value === 'circle')
                  }}
                >
                  <SelectTrigger className="mt-1 h-7 w-full min-w-full border-none bg-muted px-2 text-sm font-medium shadow-none">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectPopup>
                    <SelectItem value="square">Square</SelectItem>
                    <SelectItem value="circle">Circle</SelectItem>
                  </SelectPopup>
                </Select>
              </div>
              <div className="rounded-2xl bg-background p-3">
                <p className="px-1 text-[0.625rem] uppercase tracking-tight text-muted-foreground">Size</p>
                <Select
                  value={exportSize}
                  onValueChange={(value) => {
                    if (value) setExportSize(value)
                  }}
                >
                  <SelectTrigger className="mt-1 h-7 w-full min-w-full border-none bg-muted px-2 text-sm font-medium tabular-nums shadow-none">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectPopup>
                    <SelectItem value="128">128px</SelectItem>
                    <SelectItem value="256">256px</SelectItem>
                    <SelectItem value="512">512px</SelectItem>
                    <SelectItem value="1024">1024px</SelectItem>
                    <SelectItem value="2048">2048px</SelectItem>
                    <SelectItem value="4096">4096px</SelectItem>
                  </SelectPopup>
                </Select>
              </div>
            </div>
          </div>

          <section className="mt-1.5 rounded-2xl bg-background p-4">
            <div className="mb-3 flex items-center justify-between gap-3">
              <h3 className="text-[0.625rem] font-medium uppercase tracking-tight text-muted-foreground">Export</h3>
              <span className="text-[0.6875rem] text-muted-foreground">SVG, PNG or WebP</span>
            </div>
            <div className="grid grid-cols-2 gap-1.5">
              <Select
                value={exportFormat}
                onValueChange={(value) => {
                  if (value) setExportFormat(value as ExportFormat)
                }}
              >
                <SelectTrigger className="min-w-full border-none uppercase">
                  <SelectValue />
                </SelectTrigger>
                <SelectPopup>
                  <SelectItem value="png">PNG</SelectItem>
                  <SelectItem value="webp">WebP</SelectItem>
                  <SelectItem value="svg">SVG</SelectItem>
                </SelectPopup>
              </Select>
              <ActionButton onClick={() => void download()} label={`Download ${exportFormat}`}>
                <IconDownload aria-hidden="true" className="size-4" /> Download
              </ActionButton>
            </div>
          </section>

          <section className="mt-1.5 rounded-2xl bg-background p-4">
            <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
              <div className="w-full sm:w-52">
                <fieldset aria-label="Code format" className="grid grid-cols-4 items-center rounded-2xl bg-muted p-1">
                  {(['jsx', 'rest', 'svg', 'base64'] as const).map((nextTab) => (
                    <button
                      key={nextTab}
                      type="button"
                      onClick={() => setTab(nextTab)}
                      className={cn(
                        'relative min-w-0 rounded-xl px-1.5 py-2 text-xs font-medium transition-colors',
                        tab === nextTab
                          ? 'bg-background text-foreground'
                          : 'text-muted-foreground hover:text-foreground',
                      )}
                    >
                      {nextTab === 'jsx' ? 'JSX' : nextTab === 'rest' ? 'REST' : nextTab === 'svg' ? 'SVG' : 'Base64'}
                    </button>
                  ))}
                </fieldset>
              </div>
              <div className="flex items-center gap-1.5">
                {tab === 'rest' && (
                  <a
                    href={restFor(visibleTarget, { ...config, size: actualExportSize, circle: exportCircle })}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Open REST API URL"
                    className="grid size-8 place-items-center rounded-xl bg-muted text-muted-foreground transition-[background-color,color,scale] hover:text-foreground active:scale-[0.96] [&_svg]:size-auto"
                  >
                    <IconExternalLink aria-hidden="true" className="size-4" />
                  </a>
                )}
                <button
                  type="button"
                  onClick={copyCode}
                  aria-label="Copy code"
                  className="grid size-8 place-items-center rounded-xl bg-muted text-muted-foreground transition-[background-color,color,scale] hover:text-foreground active:scale-[0.96]"
                >
                  <MorphIcon activeKey={copied ? 'copied' : 'idle'} variant="blur-scale">
                    {copied ? <IconCheck className="size-4" /> : <IconCopy className="size-4" />}
                  </MorphIcon>
                </button>
              </div>
            </div>
            <DynamicCodeBlock
              code={code}
              lang={tab === 'rest' ? 'bash' : tab === 'svg' ? 'xml' : tab === 'base64' ? 'plaintext' : 'tsx'}
              allowCopy={false}
              className="my-0"
            />
          </section>
        </DrawerPanel>
      </DrawerPopup>
    </Drawer>
  )
}
