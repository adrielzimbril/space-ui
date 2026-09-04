'use client'

import { IconDots, IconSearch, IconX, IconFilter, IconUserPlus } from '@tabler/icons-react'

import { useMemo, useState } from 'react'
import { useCopyToClipboard } from '@/registry/hooks/browser/use-clipboard'
import { Badge } from '@/registry/primitives/badge'
import { DataGrid, DataGridContainer } from '@/registry/components/spaceui/data-grid/data-grid'
import { DataGridColumnHeader } from '@/registry/components/spaceui/data-grid/data-grid-column-header'
import { DataGridPagination } from '@/registry/components/spaceui/data-grid/data-grid-pagination'
import { DataGridScrollArea } from '@/registry/components/spaceui/data-grid/data-grid-scroll-area'
import {
  DataGridTable,
  DataGridTableRowSelect,
  DataGridTableRowSelectAll,
} from '@/registry/components/spaceui/data-grid/data-grid-table'
import {
  ColumnDef,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  PaginationState,
  Row,
  SortingState,
  useReactTable,
} from '@tanstack/react-table'
import { toast } from 'sonner'

import { Avatar, AvatarFallback, AvatarImage } from '@/registry/primitives/avatar'
import { Button } from '@/registry/primitives/button'
import { Card, CardAction, CardContent, CardFooter, CardHeader } from '@/registry/primitives/card'
import { Checkbox } from '@/registry/primitives/checkbox'
import { Menu, MenuPopup, MenuItem, MenuSeparator, MenuTrigger } from '@/registry/primitives/menu'
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from '@/registry/primitives/input-group'
import { Label } from '@/registry/primitives/label'
import { Popover, PopoverContent, PopoverTrigger } from '@/registry/primitives/popover'
interface IData {
  id: string
  name: string
  availability: 'online' | 'away' | 'busy' | 'offline'
  avatar: string
  status: 'Active' | 'Inactive' | 'Pending' | 'Blocked'
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
    avatar: 'https://avatars.spaceui.one/v1?name=uranus&variant=invader',
    status: 'Active',
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
    avatar: 'https://avatars.spaceui.one/v1?name=earth&variant=kendo',
    status: 'Inactive',
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
    avatar: 'https://avatars.spaceui.one/v1?name=orion&variant=lumina',
    status: 'Blocked',
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
    avatar: 'https://avatars.spaceui.one/v1?name=lyra&variant=shaula',
    status: 'Inactive',
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
    avatar: 'https://avatars.spaceui.one/v1?name=vega&variant=singularity',
    status: 'Active',
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
    avatar: 'https://avatars.spaceui.one/v1?name=sirius&variant=triton',
    status: 'Pending',
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
    avatar: 'https://avatars.spaceui.one/v1?name=nova&variant=solar-flare',
    status: 'Inactive',
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
    avatar: 'https://avatars.spaceui.one/v1?name=pulsar&variant=titan',
    status: 'Blocked',
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
    avatar: 'https://avatars.spaceui.one/v1?name=quasar&variant=glass',
    status: 'Pending',
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
    avatar: 'https://avatars.spaceui.one/v1?name=comet&variant=pebble',
    status: 'Inactive',
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
    avatar: 'https://avatars.spaceui.one/v1?name=apollo&variant=invader',
    status: 'Blocked',
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
    avatar: 'https://avatars.spaceui.one/v1?name=gemini&variant=kendo',
    status: 'Active',
    flag: 'in',
    email: 'sarah@tata.in',
    company: 'Tata',
    role: 'Sales Manager',
    joined: 'Oct, 2024',
    location: 'India',
    balance: 4521.67,
  },
]

function ActionsCell({ row }: { row: Row<IData> }) {
  const { copyToClipboard } = useCopyToClipboard()
  const handleCopyId = () => {
    copyToClipboard(row.original.id)

    toast.success('Employee ID successfully copied', {
      description: row.original.id,
    })
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
    pageSize: 5,
  })
  const [sorting, setSorting] = useState<SortingState>([{ id: 'name', desc: true }])
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([])

  const filteredData = useMemo(() => {
    return demoData.filter((item) => {
      // Filter by status
      const matchesStatus = !selectedStatuses?.length || selectedStatuses.includes(item.status)

      // Filter by search query (case-insensitive)
      const searchLower = searchQuery.toLowerCase()
      const matchesSearch =
        !searchQuery ||
        Object.values(item)
          .join(' ') // Combine all fields into a single string
          .toLowerCase()
          .includes(searchLower)

      return matchesStatus && matchesSearch
    })
  }, [searchQuery, selectedStatuses])

  const statusCounts = useMemo(() => {
    return demoData.reduce(
      (acc, item) => {
        acc[item.status] = (acc[item.status] || 0) + 1
        return acc
      },
      {} as Record<string, number>,
    )
  }, [])

  const handleStatusChange = (checked: boolean, value: string) => {
    setSelectedStatuses(
      (
        prev = [], // Default to an empty array
      ) => (checked ? [...prev, value] : prev.filter((v) => v !== value)),
    )
  }

  const columns = useMemo<ColumnDef<IData>[]>(
    () => [
      {
        accessorKey: 'id',
        id: 'id',
        header: () => <DataGridTableRowSelectAll />,
        cell: ({ row }) => <DataGridTableRowSelect row={row} />,
        enableSorting: false,
        size: 35,
        meta: {
          headerClassName: '',
          cellClassName: '',
        },
        enableResizing: false,
      },
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
        size: 260,
        meta: {
          autoSize: true,
        },
        enableSorting: true,
        enableHiding: false,
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
        meta: {
          headerClassName: '',
          cellClassName: 'text-start',
        },
        enableSorting: true,
        enableHiding: true,
        enableResizing: true,
      },
      {
        accessorKey: 'role',
        id: 'role',
        header: ({ column }) => <DataGridColumnHeader title="Role" visibility={true} column={column} />,
        cell: ({ row }) => {
          return <div className="text-foreground font-medium">{row.original.role}</div>
        },
        size: 150,
        enableSorting: true,
        enableHiding: true,
        enableResizing: true,
      },
      {
        accessorKey: 'joined',
        id: 'joined',
        header: ({ column }) => <DataGridColumnHeader title="Joined" visibility={true} column={column} />,
        cell: ({ row }) => {
          return <div className="text-foreground font-medium">{row.original.joined}</div>
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

          if (status == 'Active') {
            return <Badge variant="success-outline">Approved</Badge>
          } else if (status == 'Blocked') {
            return <Badge variant="destructive-outline">Blocked</Badge>
          } else if (status == 'Inactive') {
            return <Badge variant="info-outline">Inactive</Badge>
          } else {
            return <Badge variant="warning-outline">Pending</Badge>
          }
        },
        size: 100,
        enableSorting: true,
        enableHiding: true,
        enableResizing: true,
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

  const [columnOrder, setColumnOrder] = useState<string[]>(columns.map((column) => column.id as string))

  const table = useReactTable({
    columns,
    data: filteredData,
    pageCount: Math.ceil((filteredData?.length || 0) / pagination.pageSize),
    getRowId: (row: IData) => row.id,
    state: {
      pagination,
      sorting,
      columnOrder,
    },
    onColumnOrderChange: setColumnOrder,
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  })

  return (
    <DataGrid
      table={table}
      recordCount={filteredData?.length || 0}
      tableLayout={{
        columnsPinnable: true,
        columnsResizable: true,
        columnsMovable: true,
        columnsVisibility: true,
      }}
    >
      <Card className="w-full gap-3 py-0">
        <CardHeader className="flex items-center justify-between px-3.5 py-2">
          <div className="flex items-center gap-2.5">
            <InputGroup className="w-48">
              <InputGroupAddon align="inline-start">
                <IconSearch />
              </InputGroupAddon>

              <InputGroupInput
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />

              {searchQuery.length > 0 && (
                <InputGroupAddon align="inline-end">
                  <InputGroupButton aria-label="Copy" title="Copy" size="icon-xs" onClick={() => setSearchQuery('')}>
                    <IconX />
                  </InputGroupButton>
                </InputGroupAddon>
              )}
            </InputGroup>
            <Popover>
              <PopoverTrigger
                render={
                  <Button variant="outline">
                    <IconFilter />
                    Status
                    {selectedStatuses.length > 0 && (
                      <Badge size="sm" variant="info-outline">
                        {selectedStatuses.length}
                      </Badge>
                    )}
                  </Button>
                }
              />
              <PopoverContent className="w-40" align="start">
                <div className="space-y-3">
                  <div className="text-muted-foreground text-xs font-medium">Filters</div>
                  <div className="space-y-3">
                    {Object.keys(statusCounts).map((status) => (
                      <div key={status} className="flex items-center gap-2.5">
                        <Checkbox
                          id={status}
                          checked={selectedStatuses.includes(status)}
                          onCheckedChange={(checked) => handleStatusChange(checked === true, status)}
                        />
                        <Label htmlFor={status} className="flex grow items-center justify-between gap-1.5 font-normal">
                          {status}
                          <span className="text-muted-foreground">{statusCounts[status]}</span>
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
          <CardAction>
            <Button>
              <IconUserPlus />
              Add new
            </Button>
          </CardAction>
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
        <CardFooter className="border-none bg-transparent! px-3.5 py-2">
          <DataGridPagination />
        </CardFooter>
      </Card>
    </DataGrid>
  )
}
