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
import { Card } from '@/registry/primitives/card'

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
    avatar: 'https://avatars.spaceui.one/v1?name=orion&variant=lumina',
    status: 'active',
    flag: 'us',
    email: 'alex@apple.com',
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
    avatar: 'https://avatars.spaceui.one/v1?name=lyra&variant=shaula',
    status: 'inactive',
    flag: 'gb',
    email: 'sarah@openai.com',
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
    avatar: 'https://avatars.spaceui.one/v1?name=vega&variant=singularity',
    status: 'active',
    flag: 'ca',
    email: 'michael@meta.com',
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
    avatar: 'https://avatars.spaceui.one/v1?name=sirius&variant=triton',
    status: 'inactive',
    flag: 'au',
    email: 'emma@tesla.com',
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
    avatar: 'https://avatars.spaceui.one/v1?name=nova&variant=solar-flare',
    status: 'active',
    flag: 'de',
    email: 'david@sap.com',
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
    avatar: 'https://avatars.spaceui.one/v1?name=pulsar&variant=titan',
    status: 'active',
    flag: 'my',
    email: 'aron@keenthemes.com',
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
    avatar: 'https://avatars.spaceui.one/v1?name=quasar&variant=glass',
    status: 'inactive',
    flag: 'es',
    email: 'james@bbva.es',
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
    avatar: 'https://avatars.spaceui.one/v1?name=comet&variant=pebble',
    status: 'active',
    flag: 'jp',
    email: 'maria@sony.jp',
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
    avatar: 'https://avatars.spaceui.one/v1?name=apollo&variant=invader',
    status: 'inactive',
    flag: 'fr',
    email: 'nick@lvmh.fr',
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
    avatar: 'https://avatars.spaceui.one/v1?name=gemini&variant=kendo',
    status: 'inactive',
    flag: 'it',
    email: 'liam@eni.it',
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
    avatar: 'https://avatars.spaceui.one/v1?name=luna&variant=lumina',
    status: 'inactive',
    flag: 'br',
    email: 'alex@vale.br',
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
    avatar: 'https://avatars.spaceui.one/v1?name=mars&variant=shaula',
    status: 'active',
    flag: 'in',
    email: 'sarah@tata.in',
    company: 'Tata',
    role: 'Sales Manager',
    joined: 'Oct, 2024',
    location: 'India',
    balance: 4521.67,
  },
]

export default function Demo() {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 5,
  })
  const [sorting, setSorting] = useState<SortingState>([{ id: 'name', desc: true }])

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
        minSize: 200,
        meta: {
          autoSize: true,
        },
        enableSorting: true,
        enableHiding: false,
        enableResizing: true,
      },
      {
        accessorKey: 'email',
        id: 'email',
        header: ({ column }) => <DataGridColumnHeader title="Email" visibility={true} column={column} />,
        cell: (info) => (
          <a href={`mailto:${info.getValue()}`} className="hover:text-primary hover:underline">
            {info.getValue() as string}
          </a>
        ),
        size: 150,
        enableSorting: true,
        enableHiding: true,
        enableResizing: true,
      },
      {
        accessorKey: 'location',
        id: 'location',
        header: ({ column }) => <DataGridColumnHeader title="Location" visibility={true} column={column} />,
        cell: ({ row }) => {
          return (
            <div className="flex items-center gap-1.5">
              <img
                src={`https://flagcdn.com/${row.original.flag.toLowerCase()}.svg`}
                alt={row.original.flag}
                className="size-4 rounded-full object-cover"
              />
              <div className="text-foreground font-medium">{row.original.location}</div>
            </div>
          )
        },
        size: 150,
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
        size: 150,
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
      tableLayout={{
        columnsPinnable: true,
        columnsResizable: true,
        columnsMovable: true,
        columnsVisibility: true,
      }}
    >
      <div className="w-full space-y-2.5">
        <Card className="p-0">
          <DataGridContainer>
            <DataGridScrollArea className="w-full overflow-hidden">
              <DataGridTable />
            </DataGridScrollArea>
          </DataGridContainer>
        </Card>
        <DataGridPagination />
      </div>
    </DataGrid>
  )
}
