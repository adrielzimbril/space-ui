import { segmentedControlItemVariants, segmentedControlRootClassName } from '@/registry/lib/segmented-control'

const itemClassName = segmentedControlItemVariants({ size: 'sm', state: 'current' })

export default function Particle() {
  return (
    <nav aria-label="Project sections">
      <div className={segmentedControlRootClassName}>
        <a aria-current="page" className={itemClassName} href="#overview">
          Overview
        </a>
        <a className={itemClassName} href="#activity">
          Activity
        </a>
        <a className={itemClassName} href="#settings">
          Settings
        </a>
      </div>
    </nav>
  )
}
