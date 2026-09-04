'use client'
'use no memo'

import { IconCloudDownload, IconRefresh, IconDownload } from '@tabler/icons-react'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Badge } from '@/registry/primitives/badge'
import { DataGrid } from '@/registry/components/spaceui/data-grid/data-grid'
import { DataGridColumnHeader } from '@/registry/components/spaceui/data-grid/data-grid-column-header'
import { DataGridScrollArea } from '@/registry/components/spaceui/data-grid/data-grid-scroll-area'
import { DataGridTableVirtual } from '@/registry/components/spaceui/data-grid/data-grid-table-virtual'
import { ColumnDef, getCoreRowModel, getSortedRowModel, SortingState, useReactTable } from '@tanstack/react-table'

import { Avatar, AvatarFallback, AvatarImage } from '@/registry/primitives/avatar'
import { Button } from '@/registry/primitives/button'
import { Card, CardAction, CardContent, CardHeader } from '@/registry/primitives/card'
interface IData {
  id: string
  name: string
  avatar: string
  email: string
  status: 'Active' | 'Inactive' | 'Pending'
  balance: number
}

const avatars = [
  'https://avatars.spaceui.one/v1?name=uranus&variant=invader',
  'https://avatars.spaceui.one/v1?name=earth&variant=kendo',
  'https://avatars.spaceui.one/v1?name=orion&variant=lumina',
  'https://avatars.spaceui.one/v1?name=lyra&variant=shaula',
  'https://avatars.spaceui.one/v1?name=vega&variant=singularity',
  'https://avatars.spaceui.one/v1?name=sirius&variant=triton',
]

const names = [
  'Alex Johnson',
  'Sarah Chen',
  'Michael Rodriguez',
  'Emma Wilson',
  'David Kim',
  'Aron Thompson',
  'James Brown',
  'Maria Garcia',
  'Nick Johnson',
  'Liam Thompson',
]

const statuses: IData['status'][] = ['Active', 'Inactive', 'Pending']

const TOTAL_SERVER_RECORDS = 200
const PAGE_SIZE = 20

function simulateRow(index: number): IData {
  const name = names[index % names.length]
  return {
    id: String(index + 1),
    name,
    avatar: avatars[index % avatars.length],
    email: `${name.toLowerCase().replace(' ', '.')}${index}@company.com`,
    status: statuses[index % statuses.length],
    balance: Math.round((Math.random() * 9000 + 1000) * 100) / 100,
  }
}

function createInitialData() {
  return Array.from({ length: PAGE_SIZE }, (_, index) => simulateRow(index))
}

export default function Demo() {
  const [sorting, setSorting] = useState<SortingState>([])
  const [initialData] = useState<IData[]>(() => createInitialData())
  const [data, setData] = useState<IData[]>(initialData)
  const [isFetching, setIsFetching] = useState(false)
  const [resetVersion, setResetVersion] = useState(0)
  const fetchTimeoutRef = useRef<number | null>(null)
  const hasMore = data.length < TOTAL_SERVER_RECORDS

  const clearPendingFetch = useCallback(() => {
    if (fetchTimeoutRef.current !== null) {
      window.clearTimeout(fetchTimeoutRef.current)
      fetchTimeoutRef.current = null
    }
  }, [])

  useEffect(() => () => clearPendingFetch(), [clearPendingFetch])

  const handleReset = useCallback(() => {
    clearPendingFetch()
    setSorting([])
    setData(initialData)
    setIsFetching(false)
    setResetVersion((version) => version + 1)
  }, [clearPendingFetch, initialData])

  const fetchMore = useCallback(() => {
    if (isFetching || !hasMore) return

    clearPendingFetch()
    setIsFetching(true)

    const timeoutId = window.setTimeout(() => {
      setData((prev) => {
        const next = Array.from({ length: PAGE_SIZE }, (_, index) => simulateRow(prev.length + index))
        return [...prev, ...next]
      })
      setIsFetching(false)
      fetchTimeoutRef.current = null
    }, 800)

    fetchTimeoutRef.current = timeoutId
  }, [clearPendingFetch, hasMore, isFetching])

  const columns = useMemo<ColumnDef<IData>[]>(
    () => [
      {
        accessorKey: 'id',
        id: 'id',
        header: ({ column }) => <DataGridColumnHeader title="#" column={column} />,
        cell: ({ row }) => <span className="text-muted-foreground tabular-nums">{row.original.id}</span>,
        size: 70,
        enableSorting: false,
      },
      {
        accessorKey: 'name',
        id: 'name',
        header: ({ column }) => <DataGridColumnHeader title="User" column={column} />,
        cell: ({ row }) => (
          <div className="flex items-center gap-3">
            <Avatar className="size-7">
              <AvatarImage src={row.original.avatar} alt={row.original.name} />
              <AvatarFallback>
                {row.original.name
                  .split(' ')
                  .map((namePart) => namePart[0])
                  .join('')}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="text-foreground font-medium">{row.original.name}</div>
              <div className="text-muted-foreground text-xs">{row.original.email}</div>
            </div>
          </div>
        ),
        minSize: 200,
        meta: {
          autoSize: true,
        },
        enableSorting: true,
      },
      {
        accessorKey: 'status',
        id: 'status',
        header: ({ column }) => <DataGridColumnHeader title="Status" column={column} />,
        cell: ({ row }) => {
          const status = row.original.status

          if (status === 'Active') {
            return <Badge variant="success-outline">Active</Badge>
          }

          if (status === 'Inactive') {
            return <Badge variant="info-outline">Inactive</Badge>
          }

          return <Badge variant="warning-outline">Pending</Badge>
        },
        size: 120,
        enableSorting: true,
      },
      {
        accessorKey: 'balance',
        id: 'balance',
        header: ({ column }) => <DataGridColumnHeader title="Balance" column={column} />,
        cell: ({ row }) => (
          <span className="tabular-nums">
            $
            {row.original.balance.toLocaleString('en-US', {
              minimumFractionDigits: 2,
            })}
          </span>
        ),
        size: 140,
        enableSorting: true,
      },
    ],
    [],
  )

  const table = useReactTable({
    columns,
    data,
    getRowId: (row: IData) => row.id,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  })

  return (
    <DataGrid
      table={table}
      recordCount={data.length}
      tableLayout={{
        columnsResizable: true,
        headerSticky: true,
      }}
      tableClassNames={{
        headerSticky: 'sticky top-0 z-10 bg-muted/90 backdrop-blur-xs',
      }}
    >
      <Card className="w-full gap-0 p-0">
        <CardHeader className="flex items-center justify-between gap-3 px-4 py-2">
          <div className="flex items-center gap-2">
            <IconCloudDownload className="text-muted-foreground size-4" />
            <span className="text-foreground text-sm font-medium">Remote Data</span>
            <Badge variant="secondary" size="sm">
              {data.length} / {TOTAL_SERVER_RECORDS}
            </Badge>
          </div>
          <CardAction className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={handleReset}>
              <IconRefresh className="size-4" />
              Start over
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="size-8"
              aria-label="Download snapshot"
              title="Download snapshot"
            >
              <IconDownload className="size-4" />
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent className="border-t p-0">
          <DataGridScrollArea key={resetVersion} className="h-[480px]">
            <DataGridTableVirtual
              estimateSize={57}
              onFetchMore={fetchMore}
              isFetchingMore={isFetching}
              hasMore={hasMore}
            />
          </DataGridScrollArea>
        </CardContent>
      </Card>
    </DataGrid>
  )
}
