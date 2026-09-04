'use client'

import { IconDownload } from '@tabler/icons-react'
import { useEffect, useRef, useState } from 'react'
import { Button } from '@/registry/primitives/button'
import { toastManager } from '@/registry/primitives/toast'

export default function Particle() {
  const [isGenerating, setIsGenerating] = useState(false)
  const [progress, setProgress] = useState(0)
  const abortControllerRef = useRef<AbortController | null>(null)

  useEffect(() => {
    if (!isGenerating) return

    const interval = setInterval(() => {
      setProgress((prev) => Math.min(99, prev + Math.round(Math.random() * 8 + 2)))
    }, 300)

    return () => clearInterval(interval)
  }, [isGenerating])

  async function handleDownload() {
    if (isGenerating) return

    setIsGenerating(true)
    setProgress(0)
    abortControllerRef.current = new AbortController()

    try {
      await toastManager.promise(
        new Promise<string>((resolve, reject) => {
          const shouldSucceed = Math.random() > 0.2
          const timeoutId = setTimeout(() => {
            if (shouldSucceed) {
              resolve('Report ready')
            } else {
              reject(new Error('Generation failed'))
            }
          }, 4000)

          abortControllerRef.current?.signal.addEventListener('abort', () => {
            clearTimeout(timeoutId)
            reject(new DOMException('Cancelled', 'AbortError'))
          })
        }),
        {
          error: (err: Error) => {
            if (err.name === 'AbortError') {
              return {
                actionProps: undefined,
                description: 'Report generation was cancelled.',
                title: 'Cancelled',
                type: 'info' as const,
              }
            }
            return {
              actionProps: undefined,
              description: 'Please try again later.',
              title: 'Failed to generate report',
            }
          },
          loading: {
            actionProps: {
              children: 'Cancel',
              onClick: () => abortControllerRef.current?.abort(),
            },
            description: 'Your download will begin once ready.',
            title: 'Generating report…',
          },
          success: () => ({
            actionProps: undefined,
            description: 'Your file is now downloading.',
            title: 'Download started',
          }),
        },
      )
    } finally {
      setIsGenerating(false)
      setProgress(0)
      abortControllerRef.current = null
    }
  }

  return (
    <Button disabled={isGenerating} onClick={handleDownload} variant="outline">
      {isGenerating ? (
        <>
          Loading… <span className="tabular-nums">{progress.toString().padStart(2, '\u2007')}%</span>
        </>
      ) : (
        <>
          <IconDownload />
          Download
        </>
      )}
    </Button>
  )
}
