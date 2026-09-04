import { Alert, AlertDescription, AlertTitle } from '@/registry/primitives/alert'
import { IconAlertCircle, IconAlertTriangle, IconCircleCheck, IconInfoCircle, IconStar } from '@tabler/icons-react'

const alerts = [
  {
    icon: <IconStar className="text-muted-foreground" />,
    title: 'Your Alert Title Goes Here',
    variant: 'default' as const,
  },
  {
    icon: <IconInfoCircle />,
    title: 'Your Alert Title Goes Here',
    variant: 'info' as const,
  },
  {
    icon: <IconAlertTriangle />,
    title: 'Your Alert Title Goes Here',
    variant: 'warning' as const,
  },
  {
    icon: <IconAlertCircle />,
    title: 'Your Alert Title Goes Here',
    variant: 'error' as const,
  },
  {
    icon: <IconCircleCheck />,
    title: 'Your Alert Title Goes Here',
    variant: 'success' as const,
  },
]

export default function Particle() {
  return (
    <div className="flex w-full flex-col gap-3">
      {alerts.map((item, index) => (
        <Alert key={index} variant={item.variant}>
          {item.icon}
          <AlertTitle className="font-normal">{item.title}</AlertTitle>
          <AlertDescription>
            This is where your alert description will appear. You can customize this text with any message.
          </AlertDescription>
        </Alert>
      ))}
    </div>
  )
}
