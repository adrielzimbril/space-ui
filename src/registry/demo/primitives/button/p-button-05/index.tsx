import { IconDownload } from '@tabler/icons-react'
import { Button } from '@/registry/primitives/button'

export default function Demo() {
  return (
    <Button>
      <IconDownload aria-hidden="true" />
      Download
    </Button>
  )
}
