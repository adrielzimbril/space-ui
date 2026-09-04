'use client'

'use no memo'

import type { ReactElement } from 'react'
import { getColumnHeaderLabel } from '@/registry/components/spaceui/data-grid/data-grid'
import type { Table } from '@tanstack/react-table'

import { Menu, MenuCheckboxItem, MenuPopup, MenuGroup, MenuGroupLabel, MenuTrigger } from '@/registry/primitives/menu'

function DataGridColumnVisibility<TData>({
  table,
  trigger,
}: {
  table: Table<TData>
  trigger: ReactElement<Record<string, unknown>>
}) {
  return (
    <Menu>
      <MenuTrigger render={trigger} />
      <MenuPopup align="end" className="min-w-[150px]">
        <MenuGroup>
          <MenuGroupLabel className="font-medium">Toggle Columns</MenuGroupLabel>
          {table
            .getAllColumns()
            .filter((column) => column.getCanHide())
            .map((column) => {
              return (
                <MenuCheckboxItem
                  key={column.id}
                  className="capitalize"
                  checked={column.getIsVisible()}
                  onSelect={(event) => event.preventDefault()}
                  onCheckedChange={(value) => column.toggleVisibility(!!value)}
                >
                  {getColumnHeaderLabel(column)}
                </MenuCheckboxItem>
              )
            })}
        </MenuGroup>
      </MenuPopup>
    </Menu>
  )
}

export { DataGridColumnVisibility }
