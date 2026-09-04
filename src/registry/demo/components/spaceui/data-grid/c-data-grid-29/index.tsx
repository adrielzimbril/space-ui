'use client'
'use no memo'

import { IconDots, IconRefresh } from '@tabler/icons-react'

import { useMemo, useState } from 'react'
import { useCopyToClipboard } from '@/registry/hooks/browser/use-clipboard'
import { Badge } from '@/registry/primitives/badge'
import { DataGrid, DataGridContainer } from '@/registry/components/spaceui/data-grid/data-grid'
import { DataGridColumnHeader } from '@/registry/components/spaceui/data-grid/data-grid-column-header'
import { DataGridPagination } from '@/registry/components/spaceui/data-grid/data-grid-pagination'
import { DataGridScrollArea } from '@/registry/components/spaceui/data-grid/data-grid-scroll-area'
import { DataGridTable, DataGridTableRowPin } from '@/registry/components/spaceui/data-grid/data-grid-table'
import {
  ColumnDef,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  PaginationState,
  Row,
  RowPinningState,
  SortingState,
  useReactTable,
} from '@tanstack/react-table'
import { toast } from 'sonner'

import { Avatar, AvatarFallback, AvatarImage } from '@/registry/primitives/avatar'
import { Button } from '@/registry/primitives/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/registry/primitives/card'
import { Menu, MenuPopup, MenuItem, MenuSeparator, MenuTrigger } from '@/registry/primitives/menu'
interface IData {
  id: string
  name: string
  avatar: string
  role: string
  status: 'Active' | 'Inactive' | 'Pending' | 'Blocked'
  balance: number
}

const demoData: IData[] = [
  {
    id: '1',
    name: 'Alex Johnson',
    avatar: 'https://avatars.spaceui.one/v1?name=nova&variant=solar-flare',
    role: 'CEO',
    status: 'Active',
    balance: 5143.03,
  },
  {
    id: '2',
    name: 'Sarah Chen',
    avatar: 'https://avatars.spaceui.one/v1?name=pulsar&variant=titan',
    role: 'CTO',
    status: 'Active',
    balance: 4321.87,
  },
  {
    id: '3',
    name: 'Michael Rodriguez',
    avatar: 'https://avatars.spaceui.one/v1?name=quasar&variant=glass',
    role: 'Designer',
    status: 'Blocked',
    balance: 7654.98,
  },
  {
    id: '4',
    name: 'Emma Wilson',
    avatar: 'https://avatars.spaceui.one/v1?name=comet&variant=pebble',
    role: 'Developer',
    status: 'Inactive',
    balance: 3456.45,
  },
  {
    id: '5',
    name: 'David Kim',
    avatar: 'https://avatars.spaceui.one/v1?name=apollo&variant=invader',
    role: 'Lawyer',
    status: 'Active',
    balance: 9876.54,
  },
  {
    id: '6',
    name: 'Aron Thompson',
    avatar: 'https://avatars.spaceui.one/v1?name=gemini&variant=kendo',
    role: 'Director',
    status: 'Pending',
    balance: 6214.22,
  },
  {
    id: '7',
    name: 'James Brown',
    avatar: 'https://avatars.spaceui.one/v1?name=luna&variant=lumina',
    role: 'Product Manager',
    status: 'Inactive',
    balance: 5321.77,
  },
  {
    id: '8',
    name: 'Maria Garcia',
    avatar: 'https://avatars.spaceui.one/v1?name=mars&variant=shaula',
    role: 'Marketing Lead',
    status: 'Active',
    balance: 8452.39,
  },
  {
    id: '9',
    name: 'Nick Johnson',
    avatar: 'https://avatars.spaceui.one/v1?name=jupiter&variant=singularity',
    role: 'Data Scientist',
    status: 'Pending',
    balance: 7345.1,
  },
  {
    id: '10',
    name: 'Liam Thompson',
    avatar: 'https://avatars.spaceui.one/v1?name=saturn&variant=triton',
    role: 'Engineer',
    status: 'Inactive',
    balance: 5214.88,
  },
  {
    id: '11',
    name: 'Olivia Martinez',
    avatar: 'https://avatars.spaceui.one/v1?name=venus&variant=solar-flare',
    role: 'VP of Sales',
    status: 'Active',
    balance: 11234.56,
  },
  {
    id: '12',
    name: 'Ethan Park',
    avatar: 'https://avatars.spaceui.one/v1?name=mercury&variant=titan',
    role: 'DevOps Lead',
    status: 'Active',
    balance: 8910.33,
  },
  {
    id: '13',
    name: 'Sophie Taylor',
    avatar: 'https://avatars.spaceui.one/v1?name=pluto&variant=glass',
    role: 'UX Researcher',
    status: 'Pending',
    balance: 6543.21,
  },
  {
    id: '14',
    name: 'Ryan Mitchell',
    avatar: 'https://avatars.spaceui.one/v1?name=neptune&variant=pebble',
    role: 'Architect',
    status: 'Inactive',
    balance: 7821.44,
  },
  {
    id: '15',
    name: 'Isabella Wong',
    avatar: 'https://avatars.spaceui.one/v1?name=uranus&variant=invader',
    role: 'QA Manager',
    status: 'Active',
    balance: 5678.9,
  },
]

function ActionsCell({ row }: { row: Row<IData> }) {
  const { copyToClipboard } = useCopyToClipboard()
  const isPinned = row.getIsPinned()

  const handleCopyId = () => {
    copyToClipboard(row.original.id)
    toast.success('Employee ID copied', { description: row.original.id })
  }

  return (
    <Menu>
      <MenuTrigger
        render={
          <Button className="size-7" size="icon" variant="ghost">
            <IconDots />
          </Button>
        }
      />
      <MenuPopup side="bottom" align="start">
        <MenuItem onClick={() => row.pin(isPinned ? false : 'top')}>{isPinned ? 'Unpin row' : 'Pin to top'}</MenuItem>
        <MenuItem onClick={() => {}}>Edit</MenuItem>
        <MenuItem onClick={handleCopyId}>Copy ID</MenuItem>
        <MenuSeparator />
        <MenuItem variant="destructive" onClick={() => {}}>
          Delete
        </MenuItem>
      </MenuPopup>
    </Menu>
  )
}

export default function Pattern() {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  })
  const [sorting, setSorting] = useState<SortingState>([{ id: 'name', desc: false }])
  const [rowPinning, setRowPinning] = useState<RowPinningState>({
    top: [],
    bottom: [],
  })

  const columns = useMemo<ColumnDef<IData>[]>(
    () => [
      {
        id: 'pin',
        header: '',
        cell: ({ row }) => <DataGridTableRowPin row={row} />,
        size: 40,
        enableSorting: false,
        enableHiding: false,
        enableResizing: false,
      },
      {
        accessorKey: 'name',
        id: 'name',
        header: ({ column }) => <DataGridColumnHeader title="User" column={column} />,
        cell: ({ row }) => (
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
            <div className="text-foreground min-w-0 truncate font-medium">{row.original.name}</div>
          </div>
        ),
        minSize: 150,
        meta: {
          autoSize: true,
        },
        enableSorting: true,
        enableHiding: false,
      },
      {
        accessorKey: 'role',
        id: 'role',
        header: ({ column }) => <DataGridColumnHeader title="Role" column={column} />,
        cell: ({ row }) => <span className="text-foreground">{row.original.role}</span>,
        size: 160,
        enableSorting: true,
      },
      {
        accessorKey: 'status',
        id: 'status',
        header: ({ column }) => <DataGridColumnHeader title="Status" column={column} />,
        cell: ({ row }) => {
          const s = row.original.status
          if (s === 'Active') return <Badge variant="success-outline">Active</Badge>
          if (s === 'Blocked') return <Badge variant="destructive-outline">Blocked</Badge>
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
          <span className="text-foreground tabular-nums">
            $
            {row.original.balance.toLocaleString('en-US', {
              minimumFractionDigits: 2,
            })}
          </span>
        ),
        size: 140,
        enableSorting: true,
      },
      {
        id: 'actions',
        header: '',
        cell: ({ row }) => <ActionsCell row={row} />,
        size: 60,
        enableSorting: false,
        enableHiding: false,
        enableResizing: false,
      },
    ],
    [],
  )

  const table = useReactTable({
    columns,
    data: demoData,
    pageCount: Math.ceil(demoData.length / pagination.pageSize),
    getRowId: (row: IData) => row.id,
    enableRowPinning: true,
    keepPinnedRows: true,
    state: { pagination, sorting, rowPinning },
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    onRowPinningChange: setRowPinning,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  })

  return (
    <DataGrid
      table={table}
      recordCount={demoData.length}
      tableLayout={{
        rowsPinnable: true,
        columnsResizable: true,
      }}
    >
      <Card className="w-full gap-0 p-0">
        <CardHeader className="flex items-center justify-between px-3 py-2">
          <div className="flex items-center gap-2">
            <span className="text-foreground text-sm font-medium">Team Members</span>
            {(rowPinning.top?.length ?? 0) > 0 && (
              <Badge variant="primary-outline" size="sm">
                {rowPinning.top?.length} pinned
              </Badge>
            )}
          </div>
          <div className="flex items-center gap-1">
            {(rowPinning.top?.length ?? 0) > 0 && (
              <Button variant="ghost" size="sm" onClick={() => setRowPinning({ top: [], bottom: [] })}>
                Unpin all
              </Button>
            )}
            <Button variant="ghost" size="icon" className="size-8">
              <IconRefresh className="size-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Card className="p-0">
            <DataGridContainer>
              <DataGridScrollArea>
                <DataGridTable />
              </DataGridScrollArea>
            </DataGridContainer>
          </Card>
        </CardContent>
        <CardFooter className="border-none bg-transparent! px-3 py-2">
          <DataGridPagination />
        </CardFooter>
      </Card>
    </DataGrid>
  )
}
