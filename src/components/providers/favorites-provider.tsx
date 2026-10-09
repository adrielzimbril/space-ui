'use client'

import React, { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { useLocalStorage } from '@/registry/hooks/browser/use-local-storage'
import { useAuth } from '@/components/providers/auth-provider'
import { logger } from '@/registry/utils/logger'
import { trackFavoriteItemAdded, trackFavoriteItemRemoved, trackFavoritesCleared } from '@/lib/analytics/posthog'

export type FavoriteItem = {
  slug: string
  title: string
  category?: string
}

const STORAGE_KEY = 'space-ui-favorites-v1'

const mergeItems = (state: FavoriteItem[], incoming: FavoriteItem[]): FavoriteItem[] => {
  const bySlug = new Map(state.map((i) => [i.slug, i]))
  for (const item of incoming) {
    if (!bySlug.has(item.slug)) {
      bySlug.set(item.slug, item)
    }
  }
  return [...bySlug.values()]
}

export const prettify = (slug: string) =>
  slug
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ')

const parseFavoritesParam = (search: string): FavoriteItem[] => {
  const params = new URLSearchParams(search)
  const param = params.get('favorites') || params.get('fav')
  if (!param) return []
  const seen = new Set<string>()
  return param
    .split(',')
    .map((s) => s.trim().toLowerCase())
    .filter((s) => /^[a-z0-9-]+$/.test(s) && !seen.has(s) && seen.add(s))
    .map((slug) => ({ slug, title: prettify(slug) }))
}

type FavoritesContextValue = {
  items: FavoriteItem[]
  count: number
  message: string
  has: (slug: string) => boolean
  add: (item: FavoriteItem) => void
  addMany: (items: FavoriteItem[]) => void
  remove: (slug: string) => void
  removeMany: (slugs: string[]) => void
  toggle: (item: FavoriteItem) => void
  clear: () => void
}

const FavoritesContext = createContext<FavoritesContextValue | null>(null)

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems, removeItemsStorage] = useLocalStorage<FavoriteItem[]>(STORAGE_KEY, [])
  const [message, setMessage] = useState('')
  const { user } = useAuth()
  const initialSyncDoneRef = useRef(false)

  // 1. URL params sharing support (?favorites=... or ?fav=...)
  useEffect(() => {
    const shared = parseFavoritesParam(window.location.search)
    if (shared.length > 0) {
      setItems((current) => mergeItems(current, shared))
      const url = new URL(window.location.href)
      url.searchParams.delete('favorites')
      url.searchParams.delete('fav')
      window.history.replaceState({}, '', url)
    }
  }, [setItems])

  // 2. Synchronize with Supabase database when user is authenticated
  useEffect(() => {
    if (!user || initialSyncDoneRef.current) return
    initialSyncDoneRef.current = true

    fetch('/api/favorites')
      .then((res) => res.json())
      .then((data) => {
        const serverFavs: FavoriteItem[] = Array.isArray(data?.favorites) ? data.favorites : []
        setItems((current) => {
          const merged = mergeItems(serverFavs, current)
          // If user had local favorites that aren't on server yet, push them in background
          const missingOnServer = current.filter((local) => !serverFavs.some((s) => s.slug === local.slug))
          if (missingOnServer.length > 0) {
            fetch('/api/favorites', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ items: missingOnServer }),
            }).catch((err) => logger.warn('Failed to sync local favorites to server:', err))
          }
          return merged
        })
      })
      .catch((err) => {
        logger.warn('Failed to load user favorites:', err)
      })
  }, [user, setItems])

  // 3. Multi-tab synchronization via BroadcastChannel
  useEffect(() => {
    const channel = new BroadcastChannel(STORAGE_KEY)
    const onMessage = (event: MessageEvent<FavoriteItem[]>) => {
      if (!Array.isArray(event.data)) return
      setItems((current) => (JSON.stringify(current) === JSON.stringify(event.data) ? current : event.data))
    }
    channel.addEventListener('message', onMessage)
    return () => {
      channel.removeEventListener('message', onMessage)
      channel.close()
    }
  }, [setItems])

  useEffect(() => {
    const channel = new BroadcastChannel(STORAGE_KEY)
    channel.postMessage(items)
    channel.close()
  }, [items])

  const syncAddToServer = (item: FavoriteItem) => {
    if (!user) return
    fetch('/api/favorites', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(item),
    }).catch((err) => logger.warn('Failed to save favorite:', err))
  }

  const syncRemoveFromServer = (slug: string) => {
    if (!user) return
    fetch(`/api/favorites?slug=${encodeURIComponent(slug)}`, {
      method: 'DELETE',
    }).catch((err) => logger.warn('Failed to delete favorite:', err))
  }

  const syncClearServer = () => {
    if (!user) return
    fetch('/api/favorites?all=true', {
      method: 'DELETE',
    }).catch((err) => logger.warn('Failed to clear favorites:', err))
  }

  const value = useMemo<FavoritesContextValue>(
    () => ({
      add: (item) => {
        setItems((current) => mergeItems(current, [item]))
        setMessage(`${item.title} added to favorites`)
        syncAddToServer(item)
        trackFavoriteItemAdded({ slug: item.slug, title: item.title, favorites_count: items.length + 1 })
      },
      addMany: (next) => {
        setItems((current) => mergeItems(current, next))
        setMessage(
          next.length === 1 ? `${next[0].title} added to favorites` : `${next.length} items added to favorites`,
        )
        if (user && next.length > 0) {
          fetch('/api/favorites', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ items: next }),
          }).catch((err) => logger.warn('Failed to batch save favorites:', err))
        }
        for (const item of next) {
          trackFavoriteItemAdded({ slug: item.slug, title: item.title, favorites_count: items.length + next.length })
        }
      },
      clear: () => {
        const prevCount = items.length
        removeItemsStorage()
        setMessage('Favorites cleared')
        syncClearServer()
        trackFavoritesCleared({ previous_count: prevCount })
      },
      count: items.length,
      has: (slug) => items.some((i) => i.slug === slug),
      items,
      message,
      remove: (slug) => {
        const removed = items.find((i) => i.slug === slug)
        setItems((current) => current.filter((i) => i.slug !== slug))
        setMessage(removed ? `${removed.title} removed from favorites` : 'Item removed from favorites')
        syncRemoveFromServer(slug)
        trackFavoriteItemRemoved({ slug, favorites_count: Math.max(0, items.length - 1) })
      },
      removeMany: (slugs) => {
        const drop = new Set(slugs)
        setItems((current) => current.filter((i) => !drop.has(i.slug)))
        setMessage(
          slugs.length === 1 ? '1 item removed from favorites' : `${slugs.length} items removed from favorites`,
        )
        for (const s of slugs) {
          syncRemoveFromServer(s)
          trackFavoriteItemRemoved({ slug: s, favorites_count: Math.max(0, items.length - slugs.length) })
        }
      },
      toggle: (item) => {
        const exists = items.some((i) => i.slug === item.slug)
        setItems((current) => (exists ? current.filter((i) => i.slug !== item.slug) : [...current, item]))
        setMessage(exists ? `${item.title} removed from favorites` : `${item.title} added to favorites`)
        if (exists) {
          syncRemoveFromServer(item.slug)
          trackFavoriteItemRemoved({ slug: item.slug, favorites_count: Math.max(0, items.length - 1) })
        } else {
          syncAddToServer(item)
          trackFavoriteItemAdded({ slug: item.slug, title: item.title, favorites_count: items.length + 1 })
        }
      },
    }),
    [items, message, setItems, removeItemsStorage, user],
  )

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>
}

export function useFavorites() {
  const ctx = useContext(FavoritesContext)
  if (!ctx) {
    throw new Error('useFavorites must be used within a FavoritesProvider')
  }
  return ctx
}
