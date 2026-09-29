'use client'

import * as React from 'react'
import { Skeleton } from '@/registry/primitives/skeleton'
import { GitHubLinkClient } from '@/registry/components/spaceui/github-link-client'
import { logger } from '@/registry/utils/logger'
import { sleep } from '@/registry/utils/sleep'

let cachedStarsCount: number | null = null
const POLL_INTERVAL_MS = 10000 // Refetch every 10 seconds

export function StarsCount() {
  const [stars, setStars] = React.useState<number | null>(cachedStarsCount)
  const [loading, setLoading] = React.useState(cachedStarsCount === null)

  React.useEffect(() => {
    let isMounted = true

    async function fetchStars() {
      try {
        const res = await fetch('/api/github/stars')
        if (!res.ok) {
          throw new Error(`Failed to fetch stars: ${res.status}`)
        }
        const data = await res.json()
        if (typeof data.stars === 'number') {
          cachedStarsCount = data.stars
          if (isMounted) {
            setStars(data.stars)
          }
        }
      } catch (err) {
        logger.warn('Failed to fetch GitHub stars from API route:', err)
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    async function poll() {
      // Initial fetch
      await fetchStars()

      // Periodic refetch using sleep
      while (isMounted) {
        await sleep(POLL_INTERVAL_MS)
        if (!isMounted) break
        if (typeof document !== 'undefined' && document.visibilityState === 'visible') {
          await fetchStars()
        }
      }
    }

    poll()

    return () => {
      isMounted = false
    }
  }, [])

  const formattedStars = React.useMemo(() => {
    if (stars === null) return null
    return new Intl.NumberFormat('en', {
      notation: 'compact',
      maximumFractionDigits: 1,
    }).format(stars)
  }, [stars])

  if (loading) {
    return <Skeleton className="h-4 w-[25.5px]" />
  }

  if (formattedStars === null) {
    return null
  }

  return (
    <span className="text-muted-foreground text-xs tabular-nums font-medium inline-flex items-center">
      {formattedStars}
    </span>
  )
}

export function GitHubLink({ className }: { className?: string }) {
  return <GitHubLinkClient stars={<StarsCount />} className={className} />
}
