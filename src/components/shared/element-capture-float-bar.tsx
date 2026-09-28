'use client'

import * as React from 'react'
import { toCanvas } from 'html-to-image'
import { tapSound, toggleSound } from '@/components/providers/sound-provider'
import { Button } from '@/registry/components/button/button-squircle'
import { cn } from '@/registry/lib/utils'
import {
  IconCamera,
  IconCheck,
  IconCopy,
  IconCrop,
  IconCrosshair,
  IconPlayerRecord,
  IconPlayerStop,
  IconTrash,
  IconX,
} from '@tabler/icons-react'

type QuickBackground = 'system' | 'trans' | 'white' | 'dark'

interface FixedCropBox {
  top: number
  left: number
  width: number
  height: number
}

export function ElementCaptureFloatBar() {
  const [isOpen, setIsOpen] = React.useState(true)
  const [isInspecting, setIsInspecting] = React.useState(false)
  const [selectedEl, setSelectedEl] = React.useState<HTMLElement | null>(null)
  const [hoveredEl, setHoveredEl] = React.useState<HTMLElement | null>(null)

  // Freeform marquee state
  const [isDrawingFreeform, setIsDrawingFreeform] = React.useState(false)
  const [freeformBox, setFreeformBox] = React.useState<FixedCropBox | null>(null)

  const [background, setBackground] = React.useState<QuickBackground>('system')
  const [paddingPx, setPaddingPx] = React.useState<number>(16)
  const [isRecording, setIsRecording] = React.useState(false)
  const [busy, setBusy] = React.useState<string | null>(null)
  const [copied, setCopied] = React.useState(false)

  const mediaRecorderRef = React.useRef<MediaRecorder | null>(null)
  const recordedChunksRef = React.useRef<Blob[]>([])

  // Global hover / click inspector for DOM elements
  React.useEffect(() => {
    if (!isInspecting) {
      setHoveredEl(null)
      return
    }

    const handlePointerOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null
      if (!target || target.closest('[data-float-capture-bar]')) return
      setHoveredEl(target)
    }

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null
      if (!target || target.closest('[data-float-capture-bar]')) return

      e.preventDefault()
      e.stopPropagation()

      tapSound()
      setSelectedEl(target)
      setFreeformBox(null)
      setIsInspecting(false)
      setHoveredEl(null)
    }

    document.addEventListener('mouseover', handlePointerOver, { passive: true })
    document.addEventListener('click', handleClick, { capture: true })

    return () => {
      document.removeEventListener('mouseover', handlePointerOver)
      document.removeEventListener('click', handleClick, { capture: true })
    }
  }, [isInspecting])

  // Drag-to-draw Freeform Crop Box across the viewport
  const drawStartRef = React.useRef<{ x: number; y: number } | null>(null)

  React.useEffect(() => {
    if (!isDrawingFreeform) return

    const handleDown = (e: PointerEvent) => {
      const target = e.target as HTMLElement | null
      if (target?.closest('[data-float-capture-bar]')) return

      drawStartRef.current = { x: e.clientX, y: e.clientY }
      setFreeformBox({ top: e.clientY, left: e.clientX, width: 1, height: 1 })
      setSelectedEl(null)
    }

    const handleMove = (e: PointerEvent) => {
      if (!drawStartRef.current) return

      const top = Math.min(drawStartRef.current.y, e.clientY)
      const left = Math.min(drawStartRef.current.x, e.clientX)
      const width = Math.abs(e.clientX - drawStartRef.current.x)
      const height = Math.abs(e.clientY - drawStartRef.current.y)

      setFreeformBox({ top, left, width, height })
    }

    const handleUp = () => {
      if (!drawStartRef.current) return
      drawStartRef.current = null
      setIsDrawingFreeform(false)
      tapSound()
    }

    window.addEventListener('pointerdown', handleDown)
    window.addEventListener('pointermove', handleMove)
    window.addEventListener('pointerup', handleUp)

    return () => {
      window.removeEventListener('pointerdown', handleDown)
      window.removeEventListener('pointermove', handleMove)
      window.removeEventListener('pointerup', handleUp)
    }
  }, [isDrawingFreeform])

  const targetEl = selectedEl || (isInspecting ? hoveredEl : null)

  // Bounding rect for inspected element
  const [rect, setRect] = React.useState<DOMRect | null>(null)

  React.useEffect(() => {
    if (!targetEl || freeformBox) {
      setRect(null)
      return
    }

    const updateRect = () => {
      setRect(targetEl.getBoundingClientRect())
    }

    updateRect()
    window.addEventListener('scroll', updateRect, { passive: true })
    window.addEventListener('resize', updateRect)

    return () => {
      window.removeEventListener('scroll', updateRect)
      window.removeEventListener('resize', updateRect)
    }
  }, [targetEl, freeformBox])

  // Resolve background color
  const resolveBg = (bg: QuickBackground): string | null => {
    if (bg === 'trans') return null
    if (bg === 'white') return '#ffffff'
    if (bg === 'dark') return '#09090b'
    const computed = window.getComputedStyle(document.body).backgroundColor
    return computed && computed !== 'rgba(0, 0, 0, 0)' ? computed : '#09090b'
  }

  // Capture Image handler
  const handleCapture = async (copyOnly = false) => {
    if (busy) return

    tapSound()
    setBusy(copyOnly ? 'Copying…' : 'Capturing…')

    try {
      const filter = (node: HTMLElement) => {
        if (node.nodeType !== Node.ELEMENT_NODE) return true
        if (node.hasAttribute?.('data-float-capture-bar')) return false
        if (node.classList?.contains('float-capture-overlay')) return false
        return true
      }

      // If freeform box is active, capture the visible screen viewport
      if (freeformBox && freeformBox.width > 5 && freeformBox.height > 5) {
        const fullCanvas = await toCanvas(document.body, {
          pixelRatio: 2,
          cacheBust: true,
          filter,
        })

        const dpr = 2
        const scrollX = window.scrollX
        const scrollY = window.scrollY

        const sourceX = Math.round((freeformBox.left + scrollX) * dpr)
        const sourceY = Math.round((freeformBox.top + scrollY) * dpr)
        const sourceW = Math.round(freeformBox.width * dpr)
        const sourceH = Math.round(freeformBox.height * dpr)

        const finalCanvas = document.createElement('canvas')
        finalCanvas.width = sourceW
        finalCanvas.height = sourceH

        const ctx = finalCanvas.getContext('2d', { alpha: background === 'trans' })
        if (!ctx) throw new Error('No 2D context')

        const bgColor = resolveBg(background)
        if (bgColor) {
          ctx.fillStyle = bgColor
          ctx.fillRect(0, 0, sourceW, sourceH)
        } else {
          ctx.clearRect(0, 0, sourceW, sourceH)
        }

        ctx.drawImage(fullCanvas, sourceX, sourceY, sourceW, sourceH, 0, 0, sourceW, sourceH)

        const blob = await new Promise<Blob>((resolve, reject) => {
          finalCanvas.toBlob((b) => (b ? resolve(b) : reject(new Error('Failed Blob'))), 'image/png')
        })

        if (copyOnly) {
          await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })])
          setCopied(true)
          setTimeout(() => setCopied(false), 2000)
        } else {
          const url = URL.createObjectURL(blob)
          const a = document.createElement('a')
          a.href = url
          a.download = `freeform-spaceui-${Date.now()}.png`
          a.click()
          setTimeout(() => URL.revokeObjectURL(url), 5000)
        }
      } else {
        // Element or document capture
        const el = selectedEl || document.body
        const canvas = await toCanvas(el, {
          pixelRatio: 2,
          cacheBust: true,
          filter,
        })

        const finalCanvas = document.createElement('canvas')
        const targetW = canvas.width + paddingPx * 4
        const targetH = canvas.height + paddingPx * 4
        finalCanvas.width = targetW
        finalCanvas.height = targetH

        const ctx = finalCanvas.getContext('2d', { alpha: background === 'trans' })
        if (!ctx) throw new Error('No 2D context')

        const bgColor = resolveBg(background)
        if (bgColor) {
          ctx.fillStyle = bgColor
          ctx.fillRect(0, 0, targetW, targetH)
        } else {
          ctx.clearRect(0, 0, targetW, targetH)
        }

        ctx.drawImage(canvas, paddingPx * 2, paddingPx * 2)

        const blob = await new Promise<Blob>((resolve, reject) => {
          finalCanvas.toBlob((b) => (b ? resolve(b) : reject(new Error('Failed Blob'))), 'image/png')
        })

        if (copyOnly) {
          await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })])
          setCopied(true)
          setTimeout(() => setCopied(false), 2000)
        } else {
          const url = URL.createObjectURL(blob)
          const a = document.createElement('a')
          a.href = url
          a.download = `capture-spaceui-${Date.now()}.png`
          a.click()
          setTimeout(() => URL.revokeObjectURL(url), 5000)
        }
      }
    } catch (err) {
      console.error('[ElementCaptureFloatBar] Capture failed:', err)
    } finally {
      setBusy(null)
    }
  }

  // Quick video recording
  const handleStartRecord = async () => {
    if (isRecording) return

    toggleSound()
    setIsRecording(true)
    recordedChunksRef.current = []

    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: { displaySurface: 'browser' },
      })

      const mediaRecorder = new MediaRecorder(stream, { mimeType: 'video/webm' })
      mediaRecorderRef.current = mediaRecorder

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) recordedChunksRef.current.push(e.data)
      }

      mediaRecorder.onstop = () => {
        const blob = new Blob(recordedChunksRef.current, { type: 'video/webm' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `video-spaceui-${Date.now()}.webm`
        a.click()
        setTimeout(() => URL.revokeObjectURL(url), 5000)
        stream.getTracks().forEach((t) => t.stop())
        setIsRecording(false)
      }

      mediaRecorder.start()
    } catch {
      setIsRecording(false)
    }
  }

  const handleStopRecord = () => {
    toggleSound()
    mediaRecorderRef.current?.stop()
  }

  if (!isOpen) {
    return (
      <button
        data-float-capture-bar="true"
        type="button"
        onClick={() => {
          tapSound()
          setIsOpen(true)
        }}
        className="fixed right-4 bottom-4 z-50 flex size-9 items-center justify-center rounded-full border border-border bg-background/95 text-foreground shadow-lg backdrop-blur-md transition-transform hover:scale-105"
        title="Open Capture Toolbar"
      >
        <IconCamera className="size-4" />
      </button>
    )
  }

  return (
    <>
      {/* 1. Element Blueprint Outline */}
      {rect && !freeformBox && (
        <div
          data-float-capture-bar="true"
          className="float-capture-overlay pointer-events-none fixed z-40 border-2 border-dashed border-sky-400 bg-sky-400/10 transition-all duration-75"
          style={{
            top: `${rect.top}px`,
            left: `${rect.left}px`,
            width: `${rect.width}px`,
            height: `${rect.height}px`,
          }}
        >
          <span
            data-float-capture-bar="true"
            className="absolute -top-6 left-0 rounded bg-sky-500/90 px-1.5 py-0.5 text-[10px] font-mono font-semibold text-white shadow-sm"
          >
            {Math.round(rect.width)} × {Math.round(rect.height)}px
          </span>
        </div>
      )}

      {/* 2. Freeform Fixed Camera Window: Stays fixed on screen while content scrolls behind it */}
      {freeformBox && freeformBox.width > 5 && freeformBox.height > 5 && (
        <div
          data-float-capture-bar="true"
          className="float-capture-overlay pointer-events-none fixed z-40 border-2 border-dashed border-sky-400 shadow-[0_0_0_9999px_rgba(0,0,0,0.35)] transition-all duration-75"
          style={{
            top: `${freeformBox.top}px`,
            left: `${freeformBox.left}px`,
            width: `${freeformBox.width}px`,
            height: `${freeformBox.height}px`,
          }}
        >
          {/* Top dimension */}
          <div
            data-float-capture-bar="true"
            className="absolute -top-6 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-sky-500 px-1.5 py-0.5 text-[10px] font-mono font-semibold text-white shadow-sm"
          >
            {Math.round(freeformBox.width)} × {Math.round(freeformBox.height)}px (Scroll content freely)
          </div>

          {/* Corner handles */}
          <div
            data-float-capture-bar="true"
            className="absolute -top-1 -left-1 size-2.5 border border-sky-400 bg-white"
          />
          <div
            data-float-capture-bar="true"
            className="absolute -top-1 -right-1 size-2.5 border border-sky-400 bg-white"
          />
          <div
            data-float-capture-bar="true"
            className="absolute -bottom-1 -left-1 size-2.5 border border-sky-400 bg-white"
          />
          <div
            data-float-capture-bar="true"
            className="absolute -bottom-1 -right-1 size-2.5 border border-sky-400 bg-white"
          />
        </div>
      )}

      {/* Floating Toolbar */}
      <aside
        data-float-capture-bar="true"
        className="fixed bottom-6 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2 rounded-2xl border border-border/80 bg-background/95 p-2 shadow-2xl backdrop-blur-xl transition-all duration-200"
      >
        {/* Inspect Element Button */}
        <Button
          variant={isInspecting ? 'default' : selectedEl ? 'secondary' : 'outline'}
          size="sm"
          onClick={() => {
            toggleSound()
            setIsInspecting((v) => !v)
            setIsDrawingFreeform(false)
            setFreeformBox(null)
          }}
          className="gap-1.5 text-xs"
        >
          <IconCrosshair className={cn('size-3.5', isInspecting && 'animate-spin')} />
          <span>{isInspecting ? 'Pick Element…' : selectedEl ? `${selectedEl.tagName.toLowerCase()}` : 'Inspect'}</span>
        </Button>

        {/* Freeform Marquee Window Button */}
        <Button
          variant={isDrawingFreeform ? 'default' : freeformBox ? 'secondary' : 'outline'}
          size="sm"
          onClick={() => {
            toggleSound()
            setIsDrawingFreeform((v) => !v)
            setIsInspecting(false)
            setSelectedEl(null)
          }}
          className="gap-1.5 text-xs"
          title="Draw a freeform camera window. Scroll content under it freely!"
        >
          <IconCrop className="size-3.5" />
          <span>{isDrawingFreeform ? 'Drag to draw…' : freeformBox ? 'Freeform Box' : 'Freeform'}</span>
        </Button>

        {(selectedEl || freeformBox) && (
          <button
            type="button"
            onClick={() => {
              tapSound()
              setSelectedEl(null)
              setFreeformBox(null)
            }}
            className="rounded p-1 text-muted-foreground hover:text-foreground"
            title="Clear target"
          >
            <IconTrash className="size-3.5" />
          </button>
        )}

        <div className="h-4 w-px bg-border/60" />

        {/* Background switch (4 choices only) */}
        <div className="flex items-center gap-0.5 rounded-lg bg-muted/60 p-0.5 text-[11px]">
          {(['system', 'trans', 'white', 'dark'] as QuickBackground[]).map((bg) => (
            <button
              key={bg}
              type="button"
              onClick={() => {
                tapSound()
                setBackground(bg)
              }}
              className={cn(
                'rounded-md px-2 py-0.5 font-medium capitalize transition-colors',
                background === bg
                  ? 'bg-background text-foreground shadow-xs'
                  : 'text-muted-foreground hover:text-foreground',
              )}
            >
              {bg === 'trans' ? 'Trans' : bg}
            </button>
          ))}
        </div>

        {/* Padding presets (when capturing element) */}
        {!freeformBox && (
          <div className="flex items-center gap-0.5 rounded-lg bg-muted/60 p-0.5 text-[11px]">
            {[0, 16, 32].map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => {
                  tapSound()
                  setPaddingPx(p)
                }}
                className={cn(
                  'rounded-md px-1.5 py-0.5 font-mono transition-colors',
                  paddingPx === p
                    ? 'bg-background text-foreground shadow-xs'
                    : 'text-muted-foreground hover:text-foreground',
                )}
              >
                {p}p
              </button>
            ))}
          </div>
        )}

        <div className="h-4 w-px bg-border/60" />

        {/* Action: Snap PNG without icon */}
        <Button size="sm" onClick={() => handleCapture(false)} disabled={Boolean(busy)} className="text-xs">
          <span>Snap 4K</span>
        </Button>

        {/* Action: Copy Image */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleCapture(true)}
          disabled={Boolean(busy)}
          className="gap-1.5 text-xs"
          title="Copy to clipboard"
        >
          {copied ? <IconCheck className="size-3.5 text-green-500" /> : <IconCopy className="size-3.5" />}
        </Button>

        {/* Action: Record Video without icon */}
        {isRecording ? (
          <Button variant="destructive" size="sm" onClick={handleStopRecord} className="text-xs">
            <span>Stop</span>
          </Button>
        ) : (
          <Button
            variant="outline"
            size="sm"
            onClick={handleStartRecord}
            className="text-xs text-red-500 hover:text-red-600"
            title="Record video"
          >
            <span>Record</span>
          </Button>
        )}

        <button
          type="button"
          onClick={() => {
            tapSound()
            setIsOpen(false)
          }}
          className="rounded-lg p-1 text-muted-foreground transition-colors hover:text-foreground"
          title="Minimize toolbar"
        >
          <IconX className="size-3.5" />
        </button>
      </aside>
    </>
  )
}
