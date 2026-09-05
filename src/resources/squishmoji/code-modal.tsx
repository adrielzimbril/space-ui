'use client'

import { useEffect, useMemo, useState, type ReactNode } from 'react'
import { IconCheck, IconCopy, IconDownload, IconX } from '@tabler/icons-react'
import {
  createAvatar,
  resolveExpression,
  resolveShape,
  type SquishBackgroundStyleChoice,
  type SquishExpressionChoice,
  type SquishShapeChoice,
} from '@usespaceui/squishmoji'
import { Squishmoji } from '@usespaceui/squishmoji/react'
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
import { exportRaster, exportSvgMarkup } from '@/resources/components/shared/avatar/export/raster'

export interface SquishmojiModalTarget {
  seed: string
}

export interface SquishmojiModalConfig {
  shape: SquishShapeChoice
  expression: SquishExpressionChoice
  backgroundStyle: SquishBackgroundStyleChoice
  animate: boolean
  animWobble: boolean
  animOnHover: boolean
  animOnClick: boolean
}

type ExportFormat = 'svg' | 'png' | 'webp'
type ModalTab = 'jsx' | 'svg' | 'base64'

function svgDataUrl(svg: string) {
  const bytes = new TextEncoder().encode(svg)
  let binary = ''
  for (const byte of bytes) binary += String.fromCharCode(byte)
  return `data:image/svg+xml;base64,${btoa(binary)}`
}

function codeFor(seed: string, config: SquishmojiModalConfig, size: number) {
  const lines = [
    `<Squishmoji`,
    `  seed="${seed}"`,
    `  shape="${resolveShape(seed, config.shape)}"`,
    `  expression="${resolveExpression(seed, config.expression)}"`,
    `  size={${size}}`,
  ]
  if (config.backgroundStyle !== 'all') lines.push(`  backgroundStyle="${config.backgroundStyle}"`)
  if (!config.animate) lines.push('  animate={false}')
  if (config.animWobble) lines.push('  animWobble')
  if (config.animOnHover) lines.push('  animOnHover')
  if (config.animOnClick) lines.push('  animOnClick')
  lines.push('/>')
  return `import { Squishmoji } from '@usespaceui/squishmoji/react'\n\n${lines.join('\n')}`
}

function ActionButton({
  children,
  onClick,
  label,
}: {
  children: ReactNode
  onClick: () => void
  label: string
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="inline-flex h-9 items-center justify-center gap-1.5 rounded-xl bg-muted px-3 text-xs font-medium uppercase transition-[background-color,color,scale] hover:text-foreground active:scale-[0.96]"
    >
      {children}
    </button>
  )
}

export function SquishmojiCodeModal({
  target,
  config,
  onClose,
}: {
  target: SquishmojiModalTarget | null
  config: SquishmojiModalConfig
  onClose: () => void
}) {
  const [tab, setTab] = useState<ModalTab>('jsx')
  const [visible, setVisible] = useState<SquishmojiModalTarget | null>(target)
  const isOpen = Boolean(target)
  const isDesktop = useMediaQuery('(min-width: 768px)', true)
  const { copy, copied } = useClipboard({ timeout: 1600 })
  const [exportFormat, setExportFormat] = useState<ExportFormat>('png')
  const [exportSize, setExportSize] = useState('512')

  useEffect(() => {
    if (target) {
      setTab('jsx')
      setExportFormat('png')
      setExportSize('512')
      setVisible(target)
    }
  }, [target])

  const size = Number(exportSize)
  const seed = visible?.seed ?? ''
  const svg = useMemo(() => {
    if (!visible) return ''
    return createAvatar(visible.seed, {
      size,
      shape: config.shape,
      expression: config.expression,
      backgroundStyle: config.backgroundStyle,
      animate: config.animate,
      animWobble: config.animWobble,
    })
  }, [visible, size, config])

  const code = useMemo(() => {
    if (!visible) return ''
    if (tab === 'svg') return svg
    if (tab === 'base64') return svgDataUrl(svg)
    return codeFor(visible.seed, config, size)
  }, [visible, config, size, tab, svg])

  if (!visible) return null

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
            <div className="min-w-0">
              <DrawerDescription className="text-xs font-medium uppercase tracking-tight">
                Selected squishmoji
              </DrawerDescription>
              <DrawerTitle className="mt-1 truncate text-lg tracking-tight">
                {seed}{' '}
                <span className="text-sm font-normal capitalize text-muted-foreground">
                  / {resolveShape(seed, config.shape)} · {resolveExpression(seed, config.expression)}
                </span>
              </DrawerTitle>
            </div>
            <DrawerClose
              render={
                <button
                  type="button"
                  aria-label="Close"
                  className="grid size-10 shrink-0 place-items-center rounded-xl bg-muted text-muted-foreground transition-[color,scale] hover:text-foreground active:scale-[0.96]"
                >
                  <IconX className="size-4" />
                </button>
              }
            />
          </div>
        </DrawerHeader>

        <DrawerPanel className="px-1 pt-2">
          <div className="grid gap-1.5 lg:grid-cols-[1fr_10rem]">
            <div className="flex min-h-60 items-center justify-center rounded-2xl bg-background p-8">
              <Squishmoji
                seed={seed}
                size={160}
                shape={config.shape}
                expression={config.expression}
                backgroundStyle={config.backgroundStyle}
                animate={config.animate}
                animWobble={config.animWobble}
                animOnHover={config.animOnHover}
                animOnClick={config.animOnClick}
              />
            </div>
            <div className="grid grid-cols-2 gap-1.5 lg:grid-cols-1">
              <div className="rounded-2xl bg-background p-3">
                <p className="px-1 text-[0.625rem] uppercase tracking-tight text-muted-foreground">Shape</p>
                <p className="mt-1.5 px-1 text-sm font-medium capitalize">{resolveShape(seed, config.shape)}</p>
              </div>
              <div className="rounded-2xl bg-background p-3">
                <p className="px-1 text-[0.625rem] uppercase tracking-tight text-muted-foreground">Expression</p>
                <p className="mt-1.5 px-1 text-sm font-medium capitalize">
                  {resolveExpression(seed, config.expression)}
                </p>
              </div>
              <div className="rounded-2xl bg-background p-3">
                <p className="px-1 text-[0.625rem] uppercase tracking-tight text-muted-foreground">Size</p>
                <Select value={exportSize} onValueChange={(value) => value && setExportSize(value)}>
                  <SelectTrigger className="mt-1 h-7 w-full min-w-full border-none bg-muted px-2 text-sm font-medium tabular-nums shadow-none">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectPopup>
                    <SelectItem value="128">128px</SelectItem>
                    <SelectItem value="256">256px</SelectItem>
                    <SelectItem value="512">512px</SelectItem>
                    <SelectItem value="1024">1024px</SelectItem>
                    <SelectItem value="2048">2048px</SelectItem>
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
              <Select value={exportFormat} onValueChange={(value) => value && setExportFormat(value as ExportFormat)}>
                <SelectTrigger className="min-w-full border-none uppercase">
                  <SelectValue />
                </SelectTrigger>
                <SelectPopup>
                  <SelectItem value="png">PNG</SelectItem>
                  <SelectItem value="webp">WebP</SelectItem>
                  <SelectItem value="svg">SVG</SelectItem>
                </SelectPopup>
              </Select>
              <ActionButton
                label={`Download ${exportFormat}`}
                onClick={() => {
                  const filename = `squishmoji-${seed}`
                  if (exportFormat === 'svg') void exportSvgMarkup(svg, filename)
                  else void exportRaster(svg, filename, exportFormat, size)
                  bloomSound()
                }}
              >
                <IconDownload className="size-4" /> Download
              </ActionButton>
            </div>
          </section>

          <section className="mt-1.5 rounded-2xl bg-background p-4">
            <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
              <fieldset aria-label="Code format" className="grid w-full grid-cols-3 items-center rounded-2xl bg-muted p-1 sm:w-52">
                {(['jsx', 'svg', 'base64'] as const).map((nextTab) => (
                  <button
                    key={nextTab}
                    type="button"
                    onClick={() => setTab(nextTab)}
                    className={cn(
                      'rounded-xl px-1.5 py-2 text-xs font-medium transition-colors',
                      tab === nextTab ? 'bg-background text-foreground' : 'text-muted-foreground hover:text-foreground',
                    )}
                  >
                    {nextTab === 'jsx' ? 'JSX' : nextTab === 'svg' ? 'SVG' : 'Base64'}
                  </button>
                ))}
              </fieldset>
              <button
                type="button"
                onClick={() => void copy(code).then((ok) => ok && bloomSound())}
                aria-label="Copy code"
                className="grid size-8 place-items-center rounded-xl bg-muted text-muted-foreground hover:text-foreground"
              >
                <MorphIcon activeKey={copied ? 'copied' : 'idle'} variant="blur-scale">
                  {copied ? <IconCheck className="size-4" /> : <IconCopy className="size-4" />}
                </MorphIcon>
              </button>
            </div>
            <DynamicCodeBlock
              code={code}
              lang={tab === 'svg' ? 'xml' : tab === 'base64' ? 'plaintext' : 'tsx'}
              allowCopy={false}
              className="my-0"
            />
          </section>
        </DrawerPanel>
      </DrawerPopup>
    </Drawer>
  )
}
