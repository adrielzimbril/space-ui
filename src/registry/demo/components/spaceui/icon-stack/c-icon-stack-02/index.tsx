import { IconArchive, IconPackage, IconStack2 } from '@tabler/icons-react'
import { IconStack } from '@/registry/components/spaceui/icon-stack'

const sizes = [
  {
    label: 'Small',
    className: 'h-16 w-14',
    icon: <IconArchive className="size-3.5" />,
  },
  {
    label: 'Default',
    className: 'h-20 w-18',
    icon: <IconPackage className="size-4" />,
  },
  {
    label: 'Large',
    className: 'h-28 w-24',
    icon: <IconStack2 className="size-6" />,
  },
]

export default function Pattern() {
  return (
    <div className="flex flex-wrap items-end justify-center gap-8">
      {sizes.map((item) => (
        <div key={item.label} className="flex flex-col items-center gap-2">
          <IconStack aria-hidden="true" className={item.className}>
            {item.icon}
          </IconStack>
          <span className="text-muted-foreground text-sm">{item.label}</span>
        </div>
      ))}
    </div>
  )
}
