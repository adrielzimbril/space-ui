'use client'

import { IconRefresh } from '@tabler/icons-react'

import { useMemo, useState } from 'react'
import { Badge } from '@/registry/primitives/badge'
import { DataGrid } from '@/registry/components/spaceui/data-grid/data-grid'
import { DataGridColumnHeader } from '@/registry/components/spaceui/data-grid/data-grid-column-header'
import { DataGridScrollArea } from '@/registry/components/spaceui/data-grid/data-grid-scroll-area'
import { DataGridTableVirtual } from '@/registry/components/spaceui/data-grid/data-grid-table-virtual'
import { ColumnDef, getCoreRowModel, getSortedRowModel, SortingState, useReactTable } from '@tanstack/react-table'

import { Avatar, AvatarFallback, AvatarImage } from '@/registry/primitives/avatar'
import { Button } from '@/registry/primitives/button'
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from '@/registry/primitives/card'
interface IData {
  id: string
  name: string
  avatar: string
  department: string
  status: 'Active' | 'Inactive' | 'Pending'
  balance: number
}

const avatars = [
  'https://avatars.spaceui.one/v1?name=jupiter&variant=singularity',
  'https://avatars.spaceui.one/v1?name=saturn&variant=triton',
  'https://avatars.spaceui.one/v1?name=venus&variant=solar-flare',
  'https://avatars.spaceui.one/v1?name=mercury&variant=titan',
  'https://avatars.spaceui.one/v1?name=pluto&variant=glass',
  'https://avatars.spaceui.one/v1?name=neptune&variant=pebble',
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

const departments = ['Engineering', 'Marketing', 'Design', 'Sales', 'Finance', 'Operations', 'Legal', 'Support']

const statuses: IData['status'][] = ['Active', 'Inactive', 'Pending']

function generateData(count: number): IData[] {
  return Array.from({ length: count }, (_, i) => ({
    id: String(i + 1),
    name: names[i % names.length],
    avatar: avatars[i % avatars.length],
    department: departments[i % departments.length],
    status: statuses[i % statuses.length],
    balance: Math.round((Math.random() * 9000 + 1000) * 100) / 100,
  }))
}

const allData = generateData(200)

export default function Demo() {
  const [sorting, setSorting] = useState<SortingState>([])

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
                  .map((n) => n[0])
                  .join('')}
              </AvatarFallback>
            </Avatar>
            <span className="text-foreground font-medium">{row.original.name}</span>
          </div>
        ),
        minSize: 150,
        meta: {
          autoSize: true,
        },
        enableSorting: true,
      },
      {
        accessorKey: 'department',
        id: 'department',
        header: ({ column }) => <DataGridColumnHeader title="Department" column={column} />,
        cell: ({ row }) => row.original.department,
        size: 150,
        enableSorting: true,
      },
      {
        accessorKey: 'status',
        id: 'status',
        header: ({ column }) => <DataGridColumnHeader title="Status" column={column} />,
        cell: ({ row }) => {
          const s = row.original.status
          if (s === 'Active') return <Badge variant="success-outline">Active</Badge>
          if (s === 'Inactive') return <Badge variant="info-outline">Inactive</Badge>
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
        enableResizing: true,
      },
    ],
    [],
  )

  const table = useReactTable({
    columns,
    data: allData,
    getRowId: (row: IData) => row.id,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  })

  return (
    <DataGrid
      table={table}
      recordCount={allData.length}
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
          <CardTitle className="text-sm font-medium">Virtualized Directory</CardTitle>
          <CardAction>
            <Button variant="outline" size="sm">
              <IconRefresh />
              Refresh
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent className="border-t p-0">
          <DataGridScrollArea className="h-[480px]">
            <DataGridTableVirtual estimateSize={49} />
          </DataGridScrollArea>
        </CardContent>
      </Card>
    </DataGrid>
  )
}
