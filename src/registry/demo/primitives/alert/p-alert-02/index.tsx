import { Alert, AlertDescription, AlertIcon, AlertTitle } from '@/registry/primitives/alert'
import {
  IconAlertCircleFilled,
  IconAlertTriangleFilled,
  IconCircleCheckFilled,
  IconInfoCircleFilled,
  IconStarFilled,
} from '@tabler/icons-react'

const alerts = [
  {
    icon: <IconStarFilled className="text-muted-foreground" />,
    title: 'Your Alert Title Goes Here',
    variant: 'default' as const,
  },
  {
    icon: <IconInfoCircleFilled className="text-blue-500" />,
    title: 'Your Alert Title Goes Here',
    variant: 'info' as const,
  },
  {
    icon: <IconAlertTriangleFilled className="text-amber-500" />,
    title: 'Your Alert Title Goes Here',
    variant: 'warning' as const,
  },
  {
    icon: <IconAlertCircleFilled className="text-red-500" />,
    title: 'Your Alert Title Goes Here',
    variant: 'error' as const,
  },
  {
    icon: <IconCircleCheckFilled className="text-emerald-500" />,
    title: 'Your Alert Title Goes Here',
    variant: 'success' as const,
  },
]

export default function Particle() {
  return (
    <div className="flex w-full flex-col gap-3">
      {alerts.map((item, index) => (
        <Alert key={index} variant={item.variant}>
          <AlertIcon badge>{item.icon}</AlertIcon>
          <AlertTitle className="font-normal">{item.title}</AlertTitle>
          <AlertDescription>
            This is where your alert description will appear. You can customize this text with any message.
          </AlertDescription>
        </Alert>
      ))}
    </div>
  )
}
