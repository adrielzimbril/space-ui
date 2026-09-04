'use client'

import * as React from 'react'
import { useLocalStorage } from '@/registry/hooks/browser/use-local-storage'
import { Card, CardPanel } from '@/registry/primitives/card'
import { Badge } from '@/registry/primitives/badge'
import { Input } from '@/registry/primitives/input'
import { Button } from '@/registry/primitives/button'
import { Checkbox } from '@/registry/primitives/checkbox'
import { IconPlus, IconTrash, IconListCheck } from '@tabler/icons-react'

interface Todo {
  id: number
  text: string
  done: boolean
}

export default function Demo() {
  const [todos, setTodos] = useLocalStorage<Todo[]>('space_demo_todos', [
    { id: 1, text: 'Try the Space UI hooks registry', done: true },
    { id: 2, text: 'Build interactive UI demos', done: false },
  ])
  const [input, setInput] = React.useState('')

  const add = () => {
    if (!input.trim()) return
    setTodos([...todos, { id: Date.now(), text: input.trim(), done: false }])
    setInput('')
  }

  const toggle = (id: number) => {
    setTodos(todos.map((t) => (t.id === id ? { ...t, done: !t.done } : t)))
  }

  const remove = (id: number) => {
    setTodos(todos.filter((t) => t.id !== id))
  }

  const completedCount = todos.filter((t) => t.done).length

  return (
    <Card className="w-full max-w-md bg-muted rounded-2xl overflow-hidden">
      <div className="flex items-center justify-between gap-3 px-3 pt-1 pb-1">
        <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
          <Badge variant="secondary" className="rounded-sm aspect-square h-full! bg-transparent">
            <IconListCheck className="size-4 text-muted-foreground" />
          </Badge>
          <span>Todos</span>
        </div>
        <Badge variant="outline" size="sm" className="font-mono tabular-nums">
          {completedCount}/{todos.length}
        </Badge>
      </div>
      <CardPanel className="flex flex-col gap-3 rounded-[0.875rem] bg-background p-3">
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && add()}
            placeholder="Ship the docs"
            aria-label="New task"
            className="text-base sm:text-sm"
          />
          <Button size="sm" onClick={add} className="shrink-0">
            <IconPlus className="size-3.5" />
            Add
          </Button>
        </div>
        <div className="flex max-h-48 flex-col gap-2 overflow-y-auto">
          {todos.map((t) => (
            <div key={t.id} className="flex items-center justify-between gap-2 rounded-lg bg-muted p-2.5">
              <div className="flex min-w-0 flex-1 items-center gap-2.5">
                <Checkbox checked={t.done} onCheckedChange={() => toggle(t.id)} aria-label={t.text} />
                <span
                  className={`truncate text-sm ${t.done ? 'text-muted-foreground line-through' : 'font-medium text-foreground'}`}
                >
                  {t.text}
                </span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => remove(t.id)}
                aria-label="Remove"
                className="shrink-0 text-muted-foreground hover:text-destructive"
              >
                <IconTrash className="size-3.5" />
              </Button>
            </div>
          ))}
        </div>
      </CardPanel>
    </Card>
  )
}
