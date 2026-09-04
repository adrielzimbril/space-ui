import { Alert, AlertAction, AlertTitle } from '@/registry/primitives/alert'
import { Button } from '@/registry/primitives/button'
import {
  IconAlertCircleFilled,
  IconAlertTriangleFilled,
  IconCircleCheckFilled,
  IconInfoCircleFilled,
  IconStarFilled,
  IconX,
} from '@tabler/icons-react'

const alerts = [
  {
    icon: <IconStarFilled className="text-muted-foreground" />,
    title: 'Your Alert Title Goes Here',
    variant: 'default' as const,
  },
  {
    icon: <IconAlertCircleFilled className="text-red-500" />,
    title: 'Your Alert Title Goes Here',
    variant: 'error' as const,
  },
  {
    icon: <IconInfoCircleFilled className="text-blue-500" />,
    title: 'Your Alert Title Goes Here',
    variant: 'info' as const,
  },
  {
    icon: <IconCircleCheckFilled className="text-emerald-500" />,
    title: 'Your Alert Title Goes Here',
    variant: 'success' as const,
  },
  {
    icon: <IconAlertTriangleFilled className="text-amber-500" />,
    title: 'Your Alert Title Goes Here',
    variant: 'warning' as const,
  },
]

export default function Demo() {
  return (
    <div className="flex w-full flex-col gap-3">
      {alerts.map((item, index) => (
        <Alert key={index} variant={item.variant}>
          {item.icon}
          <AlertTitle className="font-normal">{item.title}</AlertTitle>
          <AlertAction className="items-center gap-2">
            <Button variant="link" size="xs" className="underline">
              Upgrade
            </Button>
            <Button variant="ghost" size="icon-xs">
              <IconX />
              <span className="sr-only">Close</span>
            </Button>
          </AlertAction>
        </Alert>
      ))}
    </div>
  )
}
