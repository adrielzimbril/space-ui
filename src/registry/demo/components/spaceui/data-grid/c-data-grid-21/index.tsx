'use client'

'use no memo'

import { useMemo, useState } from 'react'
import { Badge } from '@/registry/primitives/badge'
import { DataGrid, DataGridContainer } from '@/registry/components/spaceui/data-grid/data-grid'
import { DataGridColumnHeader } from '@/registry/components/spaceui/data-grid/data-grid-column-header'
import { DataGridPagination } from '@/registry/components/spaceui/data-grid/data-grid-pagination'
import { DataGridScrollArea } from '@/registry/components/spaceui/data-grid/data-grid-scroll-area'
import { DataGridTable } from '@/registry/components/spaceui/data-grid/data-grid-table'
import {
  ColumnDef,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  PaginationState,
  SortingState,
  useReactTable,
} from '@tanstack/react-table'

import { Avatar, AvatarFallback, AvatarImage } from '@/registry/primitives/avatar'
import { Button } from '@/registry/primitives/button'
import { Card, CardAction, CardFooter, CardHeader, CardTitle } from '@/registry/primitives/card'
import { Skeleton } from '@/registry/primitives/skeleton'

interface IData {
  id: string
  name: string
  availability: 'online' | 'away' | 'busy' | 'offline'
  avatar: string
  status: 'active' | 'inactive'
  flag: string // Emoji flags
  email: string
  company: string
  role: string
  joined: string
  location: string
  balance: number
}

const demoData: IData[] = [
  {
    id: '1',
    name: 'Alex Johnson',
    availability: 'online',
    avatar: 'https://avatars.spaceui.one/v1?name=quasar&variant=glass',
    status: 'active',
    flag: 'us',
    email: 'alex@example.com',
    company: 'Apple',
    role: 'CEO',
    joined: 'Jan, 2024',
    location: 'United States',
    balance: 5143.03,
  },
  {
    id: '2',
    name: 'Sarah Chen',
    availability: 'away',
    avatar: 'https://avatars.spaceui.one/v1?name=comet&variant=pebble',
    status: 'inactive',
    flag: 'gb',
    email: 'sarah@example.com',
    company: 'OpenAI',
    role: 'CTO',
    joined: 'Mar, 2023',
    location: 'United Kingdom',
    balance: 4321.87,
  },
  {
    id: '3',
    name: 'Michael Rodriguez',
    availability: 'busy',
    avatar: 'https://avatars.spaceui.one/v1?name=apollo&variant=invader',
    status: 'active',
    flag: 'ca',
    email: 'michael@example.com',
    company: 'Meta',
    role: 'Designer',
    joined: 'Jun, 2022',
    location: 'Canada',
    balance: 7654.98,
  },
  {
    id: '4',
    name: 'Emma Wilson',
    availability: 'offline',
    avatar: 'https://avatars.spaceui.one/v1?name=gemini&variant=kendo',
    status: 'inactive',
    flag: 'au',
    email: 'emma@example.com',
    company: 'Tesla',
    role: 'Developer',
    joined: 'Sep, 2024',
    location: 'Australia',
    balance: 3456.45,
  },
  {
    id: '5',
    name: 'David Kim',
    availability: 'online',
    avatar: 'https://avatars.spaceui.one/v1?name=luna&variant=lumina',
    status: 'active',
    flag: 'de',
    email: 'david@example.com',
    company: 'SAP',
    role: 'Lawyer',
    joined: 'Nov, 2023',
    location: 'Germany',
    balance: 9876.54,
  },
  {
    id: '6',
    name: 'Aron Thompson',
    availability: 'away',
    avatar: 'https://avatars.spaceui.one/v1?name=mars&variant=shaula',
    status: 'active',
    flag: 'my',
    email: 'lisa@example.com',
    company: 'Keenthemes',
    role: 'Director',
    joined: 'Feb, 2022',
    location: 'Malaysia',
    balance: 6214.22,
  },
  {
    id: '7',
    name: 'James Brown',
    availability: 'busy',
    avatar: 'https://avatars.spaceui.one/v1?name=jupiter&variant=singularity',
    status: 'inactive',
    flag: 'es',
    email: 'james@example.com',
    company: 'BBVA',
    role: 'Product Manager',
    joined: 'Aug, 2024',
    location: 'Spain',
    balance: 5321.77,
  },
  {
    id: '8',
    name: 'Maria Garcia',
    availability: 'offline',
    avatar: 'https://avatars.spaceui.one/v1?name=saturn&variant=triton',
    status: 'active',
    flag: 'jp',
    email: 'maria@example.com',
    company: 'Sony',
    role: 'Marketing Lead',
    joined: 'Dec, 2023',
    location: 'Japan',
    balance: 8452.39,
  },
  {
    id: '9',
    name: 'Nick Johnson',
    availability: 'online',
    avatar: 'https://avatars.spaceui.one/v1?name=venus&variant=solar-flare',
    status: 'inactive',
    flag: 'fr',
    email: 'nick@example.com',
    company: 'LVMH',
    role: 'Data Scientist',
    joined: 'Apr, 2022',
    location: 'France',
    balance: 7345.1,
  },
  {
    id: '10',
    name: 'Liam Thompson',
    availability: 'away',
    avatar: 'https://avatars.spaceui.one/v1?name=mercury&variant=titan',
    status: 'inactive',
    flag: 'it',
    email: 'liam@example.com',
    company: 'ENI',
    role: 'Engineer',
    joined: 'Jul, 2024',
    location: 'Italy',
    balance: 5214.88,
  },
  {
    id: '11',
    name: 'Alex Johnson',
    availability: 'busy',
    avatar: 'https://avatars.spaceui.one/v1?name=pluto&variant=glass',
    status: 'inactive',
    flag: 'br',
    email: 'alex@example.com',
    company: 'Vale',
    role: 'Software Engineer',
    joined: 'May, 2023',
    location: 'Brazil',
    balance: 9421.5,
  },
  {
    id: '12',
    name: 'Sarah Chen',
    availability: 'offline',
    avatar: 'https://avatars.spaceui.one/v1?name=neptune&variant=pebble',
    status: 'active',
    flag: 'in',
    email: 'sarah@example.com',
    company: 'Tata',
    role: 'Sales Manager',
    joined: 'Oct, 2024',
    location: 'India',
    balance: 4521.67,
  },
]

export default function Pattern() {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 5,
  })
  const [sorting, setSorting] = useState<SortingState>([{ id: 'name', desc: true }])
  const [isLoading, setIsLoading] = useState(true)

  const handleToggleLoading = () => {
    setIsLoading((prev) => !prev)
  }

  const columns = useMemo<ColumnDef<IData>[]>(
    () => [
      {
        accessorKey: 'name',
        id: 'name',
        header: ({ column }) => <DataGridColumnHeader title="User" visibility={true} column={column} />,
        cell: ({ row }) => {
          return (
            <div className="flex items-center gap-3">
              <Avatar className="size-8">
                <AvatarImage src={row.original.avatar} alt={row.original.name} />
                <AvatarFallback>
                  {row.original.name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')}
                </AvatarFallback>
              </Avatar>
              <div className="space-y-px">
                <div className="text-foreground font-medium">{row.original.name}</div>
                <div className="text-muted-foreground">{row.original.email}</div>
              </div>
            </div>
          )
        },
        meta: {
          skeleton: (
            <div className="flex h-[41px] items-center gap-3">
              <Skeleton className="size-8 rounded-full" />
              <div className="space-y-1">
                <Skeleton className="h-5 w-24" />
                <Skeleton className="h-4 w-16" />
              </div>
            </div>
          ),
        },
        size: 200,
        enableSorting: true,
        enableHiding: false,
        enableResizing: true,
      },
      {
        accessorKey: 'email',
        id: 'email',
        header: ({ column }) => <DataGridColumnHeader title="Email" visibility={true} column={column} />,
        cell: (info) => (
          <div className="truncate">
            <a href={`mailto:${info.getValue()}`} className="hover:text-primary hover:underline">
              {info.getValue() as string}
            </a>
          </div>
        ),
        size: 150,
        meta: {
          headerClassName: '',
          cellClassName: 'text-left',
          skeleton: <Skeleton className="h-7 w-28" />,
        },
        enableSorting: true,
        enableHiding: true,
        enableResizing: true,
      },
      {
        accessorKey: 'status',
        id: 'status',
        header: ({ column }) => <DataGridColumnHeader title="Status" visibility={true} column={column} />,
        cell: ({ row }) => {
          const status = row.original.status

          if (status == 'active') {
            return <Badge variant="success-outline">Approved</Badge>
          } else {
            return <Badge variant="warning-outline">Pending</Badge>
          }
        },
        meta: {
          skeleton: <Skeleton className="h-7 w-16" />,
        },
        size: 100,
        enableSorting: true,
        enableHiding: true,
        enableResizing: false,
      },
    ],
    [],
  )

  const [columnOrder, setColumnOrder] = useState<string[]>(columns.map((column) => column.id as string))

  const table = useReactTable({
    columns,
    data: demoData,
    pageCount: Math.ceil((demoData?.length || 0) / pagination.pageSize),
    getRowId: (row: IData) => row.id,
    state: {
      pagination,
      sorting,
      columnOrder,
    },
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    onColumnOrderChange: setColumnOrder,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  })

  return (
    <DataGrid
      table={table}
      recordCount={demoData?.length || 0}
      isLoading={isLoading}
      tableClassNames={{
        edgeCell: 'px-5',
      }}
      tableLayout={{
        columnsPinnable: true,
        columnsMovable: true,
        columnsVisibility: true,
      }}
    >
      <Card className="w-full gap-3 py-3.5">
        <CardHeader className="flex items-center justify-between px-3.5">
          <CardTitle>Employees</CardTitle>
          <CardAction>
            <Button variant="outline" size="sm" onClick={handleToggleLoading}>
              {isLoading ? 'Disable Loading' : 'Enable Loading'}
            </Button>
          </CardAction>
        </CardHeader>
        <div className="w-full px-3.5">
          <Card className="p-0">
            <DataGridContainer>
              <DataGridScrollArea>
                <DataGridTable />
              </DataGridScrollArea>
            </DataGridContainer>
          </Card>
        </div>
        <CardFooter className="border-none bg-transparent! px-3.5 py-0">
          <DataGridPagination />
        </CardFooter>
      </Card>
    </DataGrid>
  )
}
