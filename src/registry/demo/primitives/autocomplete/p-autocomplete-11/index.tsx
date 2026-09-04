'use client'

import type { ReactNode } from 'react'
import { useEffect, useState } from 'react'
import {
  Autocomplete,
  AutocompleteInput,
  AutocompleteItem,
  AutocompleteList,
  AutocompletePopup,
  AutocompleteStatus,
  useAutocompleteFilter,
} from '@/registry/primitives/autocomplete'
import { Spinner } from '@/registry/primitives/spinner'

type Movie = { id: string; title: string; year: number }
const top100Movies: Movie[] = [
  { id: '1', title: 'The Shawshank Redemption', year: 1994 },
  { id: '2', title: 'The Godfather', year: 1972 },
  { id: '3', title: 'The Dark Knight', year: 2008 },
  { id: '4', title: 'The Godfather Part II', year: 1974 },
  { id: '5', title: '12 Angry Men', year: 1957 },
  { id: '8', title: 'Pulp Fiction', year: 1994 },
  { id: '11', title: 'Forrest Gump', year: 1994 },
  { id: '14', title: 'Inception', year: 2010 },
]

async function searchMovies(query: string, filter: (item: string, query: string) => boolean): Promise<Movie[]> {
  await new Promise((resolve) => setTimeout(resolve, Math.random() * 500 + 100))
  if (Math.random() < 0.01 || query === 'will_error') {
    throw new Error('Network error')
  }
  return top100Movies.filter((movie) => filter(movie.title, query) || filter(movie.year.toString(), query))
}

export default function Particle() {
  const [searchValue, setSearchValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [searchResults, setSearchResults] = useState<Movie[]>([])
  const [error, setError] = useState<string | null>(null)

  const { contains } = useAutocompleteFilter({ sensitivity: 'base' })

  useEffect(() => {
    if (!searchValue) {
      setSearchResults([])
      setIsLoading(false)
      return
    }

    setIsLoading(true)
    setError(null)
    let ignore = false

    const timeoutId = setTimeout(async () => {
      try {
        const results = await searchMovies(searchValue, contains)
        if (!ignore) setSearchResults(results)
      } catch {
        if (!ignore) {
          setError('Failed to fetch movies. Please try again.')
          setSearchResults([])
        }
      } finally {
        if (!ignore) setIsLoading(false)
      }
    }, 300)

    return () => {
      clearTimeout(timeoutId)
      ignore = true
    }
  }, [searchValue, contains])

  let status: ReactNode = `${searchResults.length} result${searchResults.length === 1 ? '' : 's'} found`
  if (isLoading) {
    status = (
      <span className="flex items-center justify-between gap-2 text-muted-foreground">
        Searching...
        <Spinner className="size-4.5 sm:size-4" />
      </span>
    )
  } else if (error) {
    status = <span className="font-normal text-destructive text-sm">{error}</span>
  } else if (searchResults.length === 0 && searchValue) {
    status = (
      <span className="font-normal text-muted-foreground text-sm">
        Movie or year "{searchValue}" does not exist in the Top 100 IMDb movies
      </span>
    )
  }

  const shouldRenderPopup = searchValue !== ''

  return (
    <Autocomplete
      filter={null}
      items={searchResults}
      itemToStringValue={(item: unknown) => (item as Movie).title}
      onValueChange={setSearchValue}
      value={searchValue}
    >
      <AutocompleteInput placeholder="e.g. Pulp Fiction or 1994" />
      {shouldRenderPopup && (
        <AutocompletePopup aria-busy={isLoading || undefined}>
          <AutocompleteStatus className="text-muted-foreground">{status}</AutocompleteStatus>
          <AutocompleteList>
            {(movie: Movie) => (
              <AutocompleteItem key={movie.id} value={movie}>
                <div className="flex w-full flex-col gap-1">
                  <div className="font-medium">{movie.title}</div>
                  <div className="text-muted-foreground text-xs">{movie.year}</div>
                </div>
              </AutocompleteItem>
            )}
          </AutocompleteList>
        </AutocompletePopup>
      )}
    </Autocomplete>
  )
}
