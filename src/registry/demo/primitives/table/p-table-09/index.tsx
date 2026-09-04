import { Badge } from '@/registry/primitives/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/registry/primitives/avatar'
import { Card, CardContent } from '@/registry/primitives/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/registry/primitives/table'
import { IconChevronDown, IconArrowRight, IconArrowUp } from '@tabler/icons-react'

const issues = [
  {
    id: 'ISS-421',
    title: 'Login page returns 500 on mobile',
    priority: 'Critical',
    priorityVariant: 'destructive' as const,
    priorityIcon: <IconArrowUp className="size-3" aria-hidden="true" />,
    label: 'Bug',
    labelVariant: 'destructive' as const,
    assignee: 'Sarah Chen',
    assigneeAvatar: 'https://avatars.spaceui.one/v1?name=comet&variant=singularity',
    status: 'Open',
    statusVariant: 'info' as const,
  },
  {
    id: 'ISS-420',
    title: 'Add dark mode support',
    priority: 'High',
    priorityVariant: 'warning' as const,
    priorityIcon: <IconArrowUp className="size-3" aria-hidden="true" />,
    label: 'Feature',
    labelVariant: 'info' as const,
    assignee: 'Marcus Johnson',
    assigneeAvatar: 'https://avatars.spaceui.one/v1?name=apollo&variant=triton',
    status: 'In Progress',
    statusVariant: 'warning' as const,
  },
  {
    id: 'ISS-419',
    title: 'Update user onboarding flow',
    priority: 'Medium',
    priorityVariant: 'info' as const,
    priorityIcon: <IconArrowRight className="size-3" aria-hidden="true" />,
    label: 'Improvement',
    labelVariant: 'success' as const,
    assignee: 'Emily Park',
    assigneeAvatar: 'https://avatars.spaceui.one/v1?name=gemini&variant=solar-flare',
    status: 'In Review',
    statusVariant: 'info' as const,
  },
  {
    id: 'ISS-418',
    title: 'Refactor API rate limiter module',
    priority: 'Low',
    priorityVariant: 'secondary' as const,
    priorityIcon: <IconChevronDown className="size-3" aria-hidden="true" />,
    label: 'Tech Debt',
    labelVariant: 'outline' as const,
    assignee: 'David Kim',
    assigneeAvatar: 'https://avatars.spaceui.one/v1?name=luna&variant=titan',
    status: 'Closed',
    statusVariant: 'success' as const,
  },
]

export default function Pattern() {
  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col">
      <Card className="p-0">
        <CardContent className="overflow-x-auto p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-20">ID</TableHead>
                <TableHead>Issue</TableHead>
                <TableHead>Assignee</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {issues.map((issue) => (
                <TableRow key={issue.id}>
                  <TableCell className="text-muted-foreground font-mono text-xs">{issue.id}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span className="truncate text-sm font-medium">{issue.title}</span>
                      <Badge variant="outline" size="sm">
                        {issue.label}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar>
                        <AvatarImage src={issue.assigneeAvatar} alt={issue.assignee} />
                        <AvatarFallback>
                          {issue.assignee
                            .split(' ')
                            .map((n) => n[0])
                            .join('')}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm">{issue.assignee}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={issue.statusVariant} size="sm">
                      {issue.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
