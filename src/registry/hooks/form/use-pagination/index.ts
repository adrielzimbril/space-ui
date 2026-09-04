'use client'

import { useState, useMemo, useCallback } from 'react'

export type PaginationItem = number | '...'

export interface UsePaginationOptions {
  /** Total number of data items (alias: totalItems / count). */
  total?: number
  totalItems?: number
  count?: number
  /** Number of items to display per page (default: 10). */
  pageSize?: number
  perPage?: number
  /** Initial active page number (1-indexed, default: 1). */
  initialPage?: number
  page?: number
  /** Number of sibling pages on each side of the active page (default: 1). */
  siblings?: number
  siblingCount?: number
  /** Number of boundary pages at the start and end (default: 1). */
  boundaries?: number
  boundaryCount?: number
  /** Callback fired when page changes. */
  onChange?: (page: number) => void
}

export interface UsePaginationReturn {
  page: number
  currentPage: number
  totalPages: number
  pageCount: number
  pageSize: number
  totalItems: number
  total: number
  startIndex: number
  endIndex: number
  range: PaginationItem[]
  nextPage: () => void
  prevPage: () => void
  firstPage: () => void
  lastPage: () => void
  next: () => void
  prev: () => void
  first: () => void
  last: () => void
  setPage: (page: number) => void
  setPageSize: (size: number) => void
  hasNext: boolean
  hasPrev: boolean
  isFirst: boolean
  isLast: boolean
}

/**
 * Generates an array of page numbers with smart ellipsis for pagination UI.
 */
function generatePaginationRange({
  total,
  page,
  siblings = 1,
  boundaries = 1,
}: {
  total: number
  page: number
  siblings: number
  boundaries: number
}): PaginationItem[] {
  const totalNumbers = siblings * 2 + 3 + boundaries * 2
  const totalBlocks = totalNumbers + 2

  if (total <= totalBlocks) {
    return Array.from({ length: total }, (_, i) => i + 1)
  }

  const leftSiblingIndex = Math.max(page - siblings, boundaries)
  const rightSiblingIndex = Math.min(page + siblings, total - boundaries)

  const shouldShowLeftDots = leftSiblingIndex > boundaries + 2
  const shouldShowRightDots = rightSiblingIndex < total - (boundaries + 1)

  if (!shouldShowLeftDots && shouldShowRightDots) {
    const leftItemCount = 3 + 2 * siblings
    const leftRange = Array.from({ length: leftItemCount }, (_, i) => i + 1)
    return [...leftRange, '...', total]
  }

  if (shouldShowLeftDots && !shouldShowRightDots) {
    const rightItemCount = 3 + 2 * siblings
    const rightRange = Array.from({ length: rightItemCount }, (_, i) => total - rightItemCount + i + 1)
    return [1, '...', ...rightRange]
  }

  if (shouldShowLeftDots && shouldShowRightDots) {
    const middleRange = Array.from({ length: rightSiblingIndex - leftSiblingIndex + 1 }, (_, i) => leftSiblingIndex + i)
    return [1, '...', ...middleRange, '...', total]
  }

  return Array.from({ length: total }, (_, i) => i + 1)
}

/**
 * React hook to compute and manage pagination state, smart range array, offsets, and navigation controls.
 *
 * @param {UsePaginationOptions} options - Pagination options.
 * @returns {UsePaginationReturn} Complete pagination state, range array with ellipses, and helper controls.
 *
 * @example
 * const { page, setPage, totalPages, range, nextPage, prevPage } = usePagination({
 *   total: 100,
 *   pageSize: 10,
 *   initialPage: 1,
 * });
 */
export function usePagination(options: UsePaginationOptions = {}): UsePaginationReturn {
  const totalItems = options.total ?? options.totalItems ?? options.count ?? 0
  const initialPageSize = options.pageSize ?? options.perPage ?? 10
  const initialPage = options.initialPage ?? options.page ?? 1
  const siblings = options.siblings ?? options.siblingCount ?? 1
  const boundaries = options.boundaries ?? options.boundaryCount ?? 1

  const [pageSize, setPageSize] = useState<number>(initialPageSize)
  const [currentPage, setCurrentPage] = useState<number>(initialPage)

  const totalPages = useMemo(() => Math.max(1, Math.ceil(totalItems / pageSize)), [totalItems, pageSize])

  const setPage = useCallback(
    (pageNumber: number) => {
      const target = Math.max(1, Math.min(pageNumber, totalPages))
      setCurrentPage(target)
      options.onChange?.(target)
    },
    [totalPages, options],
  )

  const startIndex = (currentPage - 1) * pageSize
  const endIndex = Math.min(startIndex + pageSize, totalItems)

  const range = useMemo(() => {
    return generatePaginationRange({
      total: totalPages,
      page: currentPage,
      siblings,
      boundaries,
    })
  }, [totalPages, currentPage, siblings, boundaries])

  const nextPage = useCallback(() => setPage(currentPage + 1), [currentPage, setPage])
  const prevPage = useCallback(() => setPage(currentPage - 1), [currentPage, setPage])
  const firstPage = useCallback(() => setPage(1), [setPage])
  const lastPage = useCallback(() => setPage(totalPages), [totalPages, setPage])

  return {
    page: currentPage,
    currentPage,
    totalPages,
    pageCount: totalPages,
    pageSize,
    totalItems,
    total: totalItems,
    startIndex,
    endIndex,
    range,
    nextPage,
    prevPage,
    firstPage,
    lastPage,
    next: nextPage,
    prev: prevPage,
    first: firstPage,
    last: lastPage,
    setPage,
    setPageSize,
    hasNext: currentPage < totalPages,
    hasPrev: currentPage > 1,
    isFirst: currentPage === 1,
    isLast: currentPage === totalPages,
  }
}
