'use client'

import { IconBold, IconItalic, IconUnderline, IconSparkles } from '@tabler/icons-react'
import { Button } from '@/registry/primitives/button'
import { Select, SelectItem, SelectPopup, SelectTrigger, SelectValue } from '@/registry/primitives/select'
import { ToggleGroup, ToggleGroupItem } from '@/registry/primitives/toggle-group'
import { Toolbar, ToolbarButton, ToolbarGroup, ToolbarSeparator } from '@/registry/primitives/toolbar'
import { Tooltip, TooltipPopup, TooltipProvider, TooltipTrigger } from '@/registry/primitives/tooltip'

const items = [
  { label: 'Helvetica', value: 'helvetica' },
  { label: 'Arial', value: 'arial' },
  { label: 'Times New Roman', value: 'times-new-roman' },
]

export default function Demo() {
  return (
    <TooltipProvider>
      <Toolbar>
        <ToggleGroup className="border-none p-0" defaultValue={['left']}>
          <Tooltip>
            <TooltipTrigger
              render={
                <ToolbarButton aria-label="Align left" render={<ToggleGroupItem value="left" />}>
                  <IconBold />
                </ToolbarButton>
              }
            />
            <TooltipPopup sideOffset={8}>Align left</TooltipPopup>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger
              render={
                <ToolbarButton
                  aria-label="Align center"
                  render={<ToggleGroupItem aria-label="Toggle center" value="center" />}
                >
                  <IconItalic />
                </ToolbarButton>
              }
            />
            <TooltipPopup sideOffset={8}>Align center</TooltipPopup>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger
              render={
                <ToolbarButton
                  aria-label="Align right"
                  render={<ToggleGroupItem aria-label="Toggle right" value="right" />}
                >
                  <IconUnderline />
                </ToolbarButton>
              }
            />
            <TooltipPopup sideOffset={8}>Align right</TooltipPopup>
          </Tooltip>
        </ToggleGroup>
        <ToolbarSeparator />
        <ToolbarGroup>
          <Tooltip>
            <TooltipTrigger
              render={
                <ToolbarButton aria-label="Format as currency" render={<Button size="icon" variant="ghost" />}>
                  <IconSparkles />
                </ToolbarButton>
              }
            />
            <TooltipPopup sideOffset={8}>Format as currency</TooltipPopup>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger
              render={
                <ToolbarButton aria-label="Format as percent" render={<Button size="icon" variant="ghost" />}>
                  <IconSparkles />
                </ToolbarButton>
              }
            />
            <TooltipPopup sideOffset={8}>Format as percent</TooltipPopup>
          </Tooltip>
        </ToolbarGroup>
        <ToolbarSeparator />
        <ToolbarGroup>
          <Select defaultValue="helvetica" items={items}>
            <Tooltip>
              <TooltipTrigger
                render={
                  <ToolbarButton
                    render={
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                    }
                  />
                }
              />
              <TooltipPopup sideOffset={8}>Select a different font</TooltipPopup>
            </Tooltip>
            <SelectPopup>
              {items.map(({ label, value }) => (
                <SelectItem key={value} value={value}>
                  {label}
                </SelectItem>
              ))}
            </SelectPopup>
          </Select>
        </ToolbarGroup>
        <ToolbarSeparator />
        <ToolbarGroup>
          <ToolbarButton render={<Button />}>Save</ToolbarButton>
        </ToolbarGroup>
      </Toolbar>
    </TooltipProvider>
  )
}
