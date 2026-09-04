'use client'

import { useState } from 'react'
import { Button } from '@/registry/primitives/button'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from '@/registry/primitives/pagination'
import { Select, SelectItem, SelectPopup, SelectTrigger, SelectValue } from '@/registry/primitives/select'

type PaginationProps = {
  currentPage?: number
  totalPages?: number
  totalResults?: number
  resultsPerPage?: number
}

export default function Demo({
  currentPage: initialPage = 1,
  totalPages = 10,
  totalResults = 100,
  resultsPerPage = 10,
}: PaginationProps) {
  const [currentPage, setCurrentPage] = useState(initialPage)
  const resultRanges = Array.from({ length: totalPages }, (_, i) => {
    const start = i * resultsPerPage + 1
    const end = Math.min((i + 1) * resultsPerPage, totalResults)
    const pageNum = i + 1
    return { label: `${start}-${end}`, value: pageNum }
  })

  return (
    <div className="flex items-center justify-between gap-2">
      {/* Results range selector */}
      <div className="flex items-center gap-2 whitespace-nowrap">
        <p className="text-muted-foreground text-sm">Viewing</p>
        <Select items={resultRanges} onValueChange={(value) => setCurrentPage(value as number)} value={currentPage}>
          <SelectTrigger aria-label="Select result range" className="w-fit min-w-none" size="sm">
            <SelectValue />
          </SelectTrigger>
          <SelectPopup>
            {resultRanges.map(({ label, value }) => (
              <SelectItem key={value} value={value}>
                {label}
              </SelectItem>
            ))}
          </SelectPopup>
        </Select>
        <p className="text-muted-foreground text-sm">
          of <strong className="font-medium text-foreground">{totalResults}</strong> results
        </p>
      </div>

      {/* Pagination */}
      <div>
        <Pagination>
          <PaginationContent className="w-full justify-between gap-2">
            <PaginationItem>
              <PaginationPrevious
                className="sm:*:[svg]:hidden"
                render={
                  <Button
                    disabled={currentPage === 1 ? true : undefined}
                    onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
                    size="sm"
                    variant="outline"
                  />
                }
              />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext
                className="sm:*:[svg]:hidden"
                render={
                  <Button
                    disabled={currentPage === totalPages ? true : undefined}
                    onClick={() => currentPage < totalPages && setCurrentPage(currentPage + 1)}
                    size="sm"
                    variant="outline"
                  />
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  )
}
