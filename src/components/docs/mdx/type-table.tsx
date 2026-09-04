import React, { Fragment } from 'react'
import { Badge } from '@/registry/primitives/badge'
import { ScrollArea } from '@/registry/primitives/scroll-area'
import { IconCheck, IconX } from '@tabler/icons-react'
import { cn } from '@/registry/lib/utils'

function flattenElements(node: React.ReactNode): React.ReactElement[] {
  const out: React.ReactElement[] = []
  React.Children.forEach(node, (child) => {
    if (!React.isValidElement(child)) return
    if (child.type === React.Fragment) {
      out.push(...flattenElements((child.props as { children?: React.ReactNode }).children))
      return
    }
    out.push(child)
  })
  return out
}

function nodeName(el: React.ReactElement): string {
  if (typeof el.type === 'string') return el.type.toLowerCase()
  const t = el.type as { displayName?: string; name?: string }
  return String(t.displayName || t.name || '').toLowerCase()
}

export interface TypeTableProps extends React.HTMLAttributes<HTMLDivElement> {
  type?: Record<
    string,
    {
      description?: React.ReactNode
      type: string
      default?: string
      required?: boolean
    }
  >
  data?: {
    name: string
    type: string
    default?: string
    description?: React.ReactNode
    required?: boolean
  }[]
  className?: string
  children?: React.ReactNode
}

function extractText(node: React.ReactNode): string {
  if (typeof node === 'string' || typeof node === 'number') return String(node)
  if (Array.isArray(node)) return node.map(extractText).join('')
  if (React.isValidElement(node) && node.props) {
    return extractText((node.props as { children?: React.ReactNode }).children)
  }
  return ''
}

export function renderTypeBadges(typeStr: string) {
  if (!typeStr) return null
  const tokens = typeStr
    .replace(/\\\|/g, '|')
    .split(/\s*\|\s*/)
    .map((t) => t.trim())
    .filter(Boolean)

  if (tokens.length === 0) return null

  return (
    <div className="flex flex-wrap items-center gap-1.5 min-w-0">
      {tokens.map((token, idx) => (
        <Fragment key={idx}>
          <Badge variant="secondary" className="w-fit text-[.6875rem] px-2 py-0.5 text-foreground/90 whitespace-nowrap">
            {token.replace(/^['"`]|['"`]$/g, '')}
          </Badge>
          {idx < tokens.length - 1 && <span className="text-muted-foreground opacity-50 text-xs select-none">|</span>}
        </Fragment>
      ))}
    </div>
  )
}

export function renderDefaultBadge(defStr?: string) {
  if (!defStr || defStr === 'None' || defStr === '-' || defStr === 'undefined' || defStr === "''") {
    return <span className="text-muted-foreground text-xs">-</span>
  }
  return (
    <Badge variant="secondary" className="w-fit text-[.6875rem] px-2 py-0.5 text-foreground whitespace-nowrap">
      {defStr.replace(/^['"`]|['"`]$/g, '')}
    </Badge>
  )
}

interface TableModel {
  headers: string[]
  isPropTable: boolean
  rows: {
    cells: {
      type: 'prop' | 'type' | 'required' | 'default' | 'description' | 'custom'
      content: React.ReactNode
      rawText: string
    }[]
  }[]
}

export function TypeTable({ type, data, className, children, ...props }: TypeTableProps) {
  const model: TableModel = { headers: [], isPropTable: false, rows: [] }

  // 1. Handled via `type={{ ... }}` prop
  if (type) {
    model.isPropTable = true
    model.headers = ['Prop', 'Type', 'Required', 'Default', 'Description']
    model.rows = Object.entries(type).map(([name, prop]) => ({
      cells: [
        { type: 'prop', content: name, rawText: name },
        {
          type: 'type',
          content: renderTypeBadges(prop.type),
          rawText: prop.type,
        },
        {
          type: 'required',
          content: (
            <div className="flex items-center pt-0.5">
              {prop.required ? (
                <IconCheck className="size-4 text-emerald-500" />
              ) : (
                <IconX className="size-3.5 text-muted-foreground/40" />
              )}
            </div>
          ),
          rawText: prop.required ? 'true' : 'false',
        },
        {
          type: 'default',
          content: renderDefaultBadge(prop.default),
          rawText: prop.default || '',
        },
        {
          type: 'description',
          content: prop.description || '-',
          rawText: extractText(prop.description),
        },
      ],
    }))
  }
  // 2. Handled via `data={[ ... ]}` prop
  else if (data) {
    model.isPropTable = true
    model.headers = ['Prop', 'Type', 'Required', 'Default', 'Description']
    model.rows = data.map((prop) => ({
      cells: [
        { type: 'prop', content: prop.name, rawText: prop.name },
        {
          type: 'type',
          content: renderTypeBadges(prop.type),
          rawText: prop.type,
        },
        {
          type: 'required',
          content: (
            <div className="flex items-center pt-0.5">
              {prop.required ? (
                <IconCheck className="size-4 text-emerald-500" />
              ) : (
                <IconX className="size-3.5 text-muted-foreground/40" />
              )}
            </div>
          ),
          rawText: prop.required ? 'true' : 'false',
        },
        {
          type: 'default',
          content: renderDefaultBadge(prop.default),
          rawText: prop.default || '',
        },
        {
          type: 'description',
          content: prop.description || '-',
          rawText: extractText(prop.description),
        },
      ],
    }))
  }
  // 3. Handled via MDX children (<table>...</table>)
  else if (children) {
    const rawHeaders: string[] = []
    const rawRows: React.ReactNode[][] = []

    const readRowCells = (row: React.ReactElement) => {
      const cells: React.ReactNode[] = []
      for (const td of flattenElements((row.props as { children?: React.ReactNode }).children)) {
        cells.push((td.props as { children?: React.ReactNode }).children)
      }
      return cells
    }

    for (const child of flattenElements(children)) {
      const typeName = nodeName(child)

      if (typeName === 'thead' || typeName.endsWith('thead')) {
        for (const row of flattenElements((child.props as { children?: React.ReactNode }).children)) {
          for (const th of flattenElements((row.props as { children?: React.ReactNode }).children)) {
            rawHeaders.push(extractText((th.props as { children?: React.ReactNode }).children).trim())
          }
        }
      } else if (typeName === 'tbody' || typeName.endsWith('tbody')) {
        for (const row of flattenElements((child.props as { children?: React.ReactNode }).children)) {
          const rowCells = readRowCells(row)
          if (rowCells.length > 0) rawRows.push(rowCells)
        }
      } else if (typeName === 'tr' || typeName.endsWith('tr')) {
        const rowCells = readRowCells(child)
        if (rawHeaders.length === 0) {
          rawHeaders.push(...rowCells.map((c) => extractText(c).trim()))
        } else if (rowCells.length > 0) {
          rawRows.push(rowCells)
        }
      }
    }

    if (rawHeaders.length > 0 && rawRows.length > 0) {
      const lowerHeaders = rawHeaders.map((h) => h.toLowerCase())
      const isPropTable =
        lowerHeaders.includes('prop') ||
        lowerHeaders.includes('property') ||
        (lowerHeaders.includes('type') && (lowerHeaders.includes('default') || lowerHeaders.includes('description')))

      model.headers = rawHeaders
      model.isPropTable = isPropTable

      model.rows = rawRows.map((row) => ({
        cells: row.map((cell, idx) => {
          const headerName = (rawHeaders[idx] || '').toLowerCase()
          const rawText = extractText(cell).trim()

          if (isPropTable) {
            if (headerName === 'prop' || headerName === 'property') {
              return { type: 'prop', content: cell ?? rawText, rawText }
            }
            if (headerName === 'type') {
              return {
                type: 'type',
                content: rawText ? renderTypeBadges(rawText) : cell,
                rawText,
              }
            }
            if (headerName === 'required') {
              const isReq = rawText.toLowerCase() === 'true' || rawText.toLowerCase() === 'yes'
              return {
                type: 'required',
                content: (
                  <div className="flex items-center pt-0.5">
                    {isReq ? (
                      <IconCheck className="size-4 text-emerald-500" />
                    ) : (
                      <IconX className="size-3.5 text-muted-foreground/40" />
                    )}
                  </div>
                ),
                rawText,
              }
            }
            if (headerName === 'default') {
              return {
                type: 'default',
                content: rawText ? renderDefaultBadge(rawText) : cell,
                rawText,
              }
            }
            return { type: 'description', content: cell, rawText }
          }

          // Generic markdown table (e.g. Keyboard Interactions Key | Action)
          return { type: 'custom', content: cell, rawText }
        }),
      }))
    }
  }

  if (model.headers.length === 0 || model.rows.length === 0) {
    return (
      <div className="rounded-3xl p-2 overflow-hidden bg-muted text-sm my-4 not-prose">
        <ScrollArea scrollFade scrollbarGutter clampContentMinWidth={false} className="w-full rounded-2xl">
          <div className="bg-background min-w-max">
            <table className={cn('w-full text-left text-sm border-collapse', className)} {...props}>
              {children}
            </table>
          </div>
        </ScrollArea>
      </div>
    )
  }

  // Single unified JSX render for both Prop tables and Generic tables
  return (
    <div className={cn('rounded-3xl p-2 overflow-hidden bg-muted text-sm my-4 not-prose', className)} {...props}>
      <ScrollArea scrollFade scrollbarGutter clampContentMinWidth={false} className="w-full rounded-2xl">
        <div className="bg-background min-w-max">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="bg-muted font-semibold text-muted-foreground">
                {model.headers.map((header, i) => (
                  <th
                    key={i}
                    className={cn(
                      'px-5 py-3 font-semibold text-muted-foreground bg-muted text-sm whitespace-nowrap text-left',
                      model.isPropTable ? 'min-w-35 max-w-72' : 'min-w-30',
                    )}
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-muted">
              {model.rows.map((row, rowIdx) => (
                <tr
                  key={rowIdx}
                  className="border-t border-muted first:border-t-0 bg-background hover:bg-muted/20 transition-colors"
                >
                  {row.cells.map((cell, cellIdx) => (
                    <td
                      key={cellIdx}
                      className={cn(
                        'px-5 py-4 align-top',
                        cell.type === 'prop' &&
                          'whitespace-nowrap min-w-45 max-w-80 font-bold text-foreground text-[.8125rem]',
                        cell.type === 'type' && 'min-w-45 max-w-80',
                        cell.type === 'description' && 'text-[.8125rem] leading-relaxed text-foreground/90 max-w-96',
                        cell.type === 'custom' && 'text-[.8125rem] leading-relaxed text-foreground/90 min-w-35',
                        cell.type === 'custom' && cellIdx === 0 && 'font-medium text-foreground whitespace-nowrap',
                      )}
                    >
                      {cell.content}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ScrollArea>
    </div>
  )
}

export const Table = TypeTable
export default TypeTable
