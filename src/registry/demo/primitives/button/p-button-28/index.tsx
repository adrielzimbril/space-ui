'use client'

import { IconDownload, IconX } from '@tabler/icons-react'
import { useEffect, useRef, useState } from 'react'
import { Button } from '@/registry/primitives/button'
import { Group, GroupSeparator, GroupText } from '@/registry/primitives/group'
import { Spinner } from '@/registry/primitives/spinner'
import { toastManager } from '@/registry/primitives/toast'
import { Tooltip, TooltipPopup, TooltipProvider, TooltipTrigger } from '@/registry/primitives/tooltip'

export default function Particle() {
  const [isDownloading, setIsDownloading] = useState(false)
  const [progress, setProgress] = useState(0)
  const abortControllerRef = useRef<AbortController | null>(null)
  const infoToastIdRef = useRef<string | null>(null)

  useEffect(() => {
    if (!isDownloading) return

    const interval = setInterval(() => {
      setProgress((prev) => Math.min(99, prev + Math.round(Math.random() * 8 + 2)))
    }, 300)

    return () => clearInterval(interval)
  }, [isDownloading])

  async function handleDownload() {
    if (isDownloading) return

    setIsDownloading(true)
    setProgress(0)
    abortControllerRef.current = new AbortController()

    infoToastIdRef.current = toastManager.add({
      description: 'Your download will begin once ready.',
      title: 'Generating report…',
      type: 'info',
    })

    try {
      await new Promise<string>((resolve, reject) => {
        const shouldSucceed = Math.random() > 0.2
        const timeoutId = setTimeout(() => {
          if (shouldSucceed) {
            resolve('Download complete')
          } else {
            reject(new Error('Download failed'))
          }
        }, 4000)

        abortControllerRef.current?.signal.addEventListener('abort', () => {
          clearTimeout(timeoutId)
          reject(new DOMException('Cancelled', 'AbortError'))
        })
      })
    } catch (err) {
      // Close info toast before showing error
      if (infoToastIdRef.current) {
        toastManager.close(infoToastIdRef.current)
        infoToastIdRef.current = null
      }

      if (err instanceof DOMException && err.name === 'AbortError') {
        // Cancelled
        toastManager.add({
          description: 'Report generation was cancelled.',
          title: 'Cancelled',
          type: 'error',
        })
      } else {
        // Other errors
        toastManager.add({
          description: 'Please try again later.',
          title: 'Failed to generate report',
          type: 'error',
        })
      }
    } finally {
      setIsDownloading(false)
      setProgress(0)
      abortControllerRef.current = null
      infoToastIdRef.current = null
    }
  }

  function handleCancel() {
    abortControllerRef.current?.abort()
  }

  return (
    <TooltipProvider delay={0}>
      {isDownloading ? (
        <Group>
          <GroupText aria-live="polite" className="cursor-default gap-2" role="status">
            <Spinner />
            <span aria-hidden="true" className="font-medium text-foreground tabular-nums">
              {progress.toString().padStart(2, '\u2007')}%
            </span>
            <span className="sr-only">Generating report, {progress}% complete</span>
          </GroupText>
          <GroupSeparator />
          <Tooltip>
            <TooltipTrigger
              render={<Button aria-label="Cancel download" onClick={handleCancel} size="icon" variant="outline" />}
            >
              <IconX aria-hidden="true" />
            </TooltipTrigger>
            <TooltipPopup>Cancel</TooltipPopup>
          </Tooltip>
        </Group>
      ) : (
        <Button onClick={handleDownload} variant="outline">
          <IconDownload aria-hidden="true" />
          Download
        </Button>
      )}
    </TooltipProvider>
  )
}
