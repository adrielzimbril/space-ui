import { IconInfoCircle } from '@tabler/icons-react'
import { Alert, AlertAction, AlertDescription, AlertTitle } from '@/registry/primitives/alert'
import { Button } from '@/registry/primitives/button'

export default function Demo() {
  return (
    <Alert>
      <IconInfoCircle />
      <AlertTitle>Your Alert Title Goes Here</AlertTitle>
      <AlertDescription>
        This is where your alert description will appear. You can customize this text with any message.
      </AlertDescription>
      <AlertAction>
        <Button size="xs" variant="ghost">
          Dismiss
        </Button>
        <Button size="xs">Ok</Button>
      </AlertAction>
    </Alert>
  )
}
