'use client'

import { IconGripVertical } from '@tabler/icons-react'
import { ComponentProps, useState } from 'react'
import { Badge } from '@/registry/primitives/badge'
import {
  Kanban,
  KanbanBoard,
  KanbanColumn,
  KanbanColumnContent,
  KanbanColumnHandle,
  KanbanItem,
  KanbanItemHandle,
  KanbanOverlay,
} from '@/registry/components/spaceui/kanban'

import { Avatar, AvatarFallback, AvatarImage } from '@/registry/primitives/avatar'
import { Button } from '@/registry/primitives/button'
import { Card, CardContent, CardHeader } from '@/registry/primitives/card'
interface Task {
  id: string
  title: string
  priority: 'low' | 'medium' | 'high'
  description?: string
  assignee?: string
  assigneeAvatar?: string
  dueDate?: string
}

const COLUMN_TITLES: Record<string, string> = {
  backlog: 'Backlog',
  inProgress: 'In Progress',
  review: 'Review',
  done: 'Done',
}

interface TaskCardProps extends Omit<ComponentProps<typeof KanbanItem>, 'value' | 'children'> {
  task: Task
  asHandle?: boolean
  isOverlay?: boolean
}

function TaskCard({ task, asHandle, isOverlay, ...props }: TaskCardProps) {
  const cardContent = (
    <Card>
      <CardContent className="space-y-2.5">
        <div className="flex items-center justify-between gap-2">
          <span className="line-clamp-1 text-sm font-medium">{task.title}</span>
          <Badge
            variant={
              task.priority === 'high'
                ? 'destructive-light'
                : task.priority === 'medium'
                  ? 'primary-light'
                  : 'warning-light'
            }
            className="pointer-events-none h-5 shrink-0 rounded-sm px-1.5 text-xs capitalize"
          >
            {task.priority}
          </Badge>
        </div>
        <div className="text-muted-foreground flex items-center justify-between text-xs">
          {task.assignee && (
            <div className="flex items-center gap-1">
              <Avatar className="size-4">
                <AvatarImage src={task.assigneeAvatar} />
                <AvatarFallback>{task.assignee.charAt(0)}</AvatarFallback>
              </Avatar>
              <span className="line-clamp-1">{task.assignee}</span>
            </div>
          )}
          {task.dueDate && <time className="text-[10px] whitespace-nowrap tabular-nums">{task.dueDate}</time>}
        </div>
      </CardContent>
    </Card>
  )

  return (
    <KanbanItem value={task.id} {...props}>
      {asHandle && !isOverlay ? <KanbanItemHandle>{cardContent}</KanbanItemHandle> : cardContent}
    </KanbanItem>
  )
}

interface TaskColumnProps extends Omit<ComponentProps<typeof KanbanColumn>, 'children'> {
  tasks: Task[]
  isOverlay?: boolean
}

function TaskColumn({ value, tasks, isOverlay, ...props }: TaskColumnProps) {
  return (
    <KanbanColumn value={value} {...props}>
      <Card className="mb-2.5">
        <CardHeader className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="text-sm font-semibold">{COLUMN_TITLES[value]}</span>
            <Badge variant="outline">{tasks.length}</Badge>
          </div>
          <KanbanColumnHandle
            render={(props) => (
              <Button {...props} size="icon-xs" variant="ghost">
                <IconGripVertical />
              </Button>
            )}
          />
        </CardHeader>
        <CardContent>
          <KanbanColumnContent value={value} className="flex flex-col gap-2.5">
            {tasks.map((task) => (
              <TaskCard key={task.id} task={task} asHandle={!isOverlay} isOverlay={isOverlay} />
            ))}
          </KanbanColumnContent>
        </CardContent>
      </Card>
    </KanbanColumn>
  )
}

export default function Pattern() {
  const [columns, setColumns] = useState<Record<string, Task[]>>({
    backlog: [
      {
        id: '1',
        title: 'Add authentication',
        priority: 'high',
        assignee: 'Alex Johnson',
        assigneeAvatar: 'https://avatars.spaceui.one/v1?name=apollo&variant=invader',
        dueDate: 'Jan 10, 2025',
      },
      {
        id: '2',
        title: 'Create API endpoints',
        priority: 'medium',
        assignee: 'Sarah Chen',
        assigneeAvatar: 'https://avatars.spaceui.one/v1?name=gemini&variant=kendo',
        dueDate: 'Jan 15, 2025',
      },
      {
        id: '3',
        title: 'Write documentation',
        priority: 'low',
        assignee: 'Michael Rodriguez',
        assigneeAvatar: 'https://avatars.spaceui.one/v1?name=luna&variant=lumina',
        dueDate: 'Jan 20, 2025',
      },
    ],
    inProgress: [
      {
        id: '4',
        title: 'Design system updates',
        priority: 'high',
        assignee: 'Emma Wilson',
        assigneeAvatar: 'https://avatars.spaceui.one/v1?name=mars&variant=shaula',
        dueDate: 'Aug 25, 2025',
      },
      {
        id: '5',
        title: 'Implement dark mode',
        priority: 'medium',
        assignee: 'David Kim',
        assigneeAvatar: 'https://avatars.spaceui.one/v1?name=jupiter&variant=singularity',
        dueDate: 'Aug 25, 2025',
      },
    ],
    done: [
      {
        id: '7',
        title: 'Setup project',
        priority: 'high',
        assignee: 'Aron Thompson',
        assigneeAvatar: 'https://avatars.spaceui.one/v1?name=saturn&variant=triton',
        dueDate: 'Sep 25, 2025',
      },
      {
        id: '8',
        title: 'Initial commit',
        priority: 'low',
        assignee: 'James Brown',
        assigneeAvatar: 'https://avatars.spaceui.one/v1?name=venus&variant=solar-flare',
        dueDate: 'Sep 20, 2025',
      },
    ],
  })

  return (
    <Kanban value={columns} onValueChange={setColumns} getItemValue={(item) => item.id}>
      <KanbanBoard className="grid auto-rows-fr grid-cols-3">
        {Object.entries(columns).map(([columnValue, tasks]) => (
          <TaskColumn key={columnValue} value={columnValue} tasks={tasks} />
        ))}
      </KanbanBoard>
      <KanbanOverlay className="bg-muted/10 rounded-md border-2 border-dashed" />
    </Kanban>
  )
}
