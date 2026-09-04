'use client'

import { useLocalStorage } from '@/registry/hooks/browser/use-local-storage'

/**
 * React hook that detects if the current user is visiting the site or page for the first time.
 *
 * @param {string} [storageKey='has_visited_app'] - Storage key used to track visits.
 * @returns {[boolean, () => void]} Tuple of [isFirstVisit, markAsVisited].
 *
 * @example
 * const [isFirstVisit, markAsVisited] = useFirstVisit('onboarding_seen');
 * if (isFirstVisit) showOnboardingModal();
 */
export function useFirstVisit(storageKey = 'has_visited_app'): [boolean, () => void] {
  const [visited, setVisited] = useLocalStorage<boolean>(storageKey, false)

  const markVisited = () => setVisited(true)

  return [!visited, markVisited]
}
