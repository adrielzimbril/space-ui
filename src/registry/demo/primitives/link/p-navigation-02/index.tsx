import { segmentedControlItemVariants, segmentedControlRootClassName } from '@/registry/lib/segmented-control'

const smClassName = segmentedControlItemVariants({ size: 'sm', state: 'current' })
const defaultClassName = segmentedControlItemVariants({ state: 'current' })
const lgClassName = segmentedControlItemVariants({ size: 'lg', state: 'current' })

export default function Particle() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-4">
      <nav aria-label="Documentation sections">
        <div className={segmentedControlRootClassName}>
          <a aria-current="page" className={smClassName} href="#components">
            Components
          </a>
          <a className={smClassName} href="#hooks">
            Hooks
          </a>
          <a className={smClassName} href="#utilities">
            Utilities
          </a>
        </div>
      </nav>

      <nav aria-label="Documentation sections">
        <div className={segmentedControlRootClassName}>
          <a aria-current="page" className={defaultClassName} href="#components">
            Components
          </a>
          <a className={defaultClassName} href="#hooks">
            Hooks
          </a>
          <a className={defaultClassName} href="#utilities">
            Utilities
          </a>
        </div>
      </nav>

      <nav aria-label="Documentation sections">
        <div className={segmentedControlRootClassName}>
          <a aria-current="page" className={lgClassName} href="#components">
            Components
          </a>
          <a className={lgClassName} href="#hooks">
            Hooks
          </a>
          <a className={lgClassName} href="#utilities">
            Utilities
          </a>
        </div>
      </nav>
    </div>
  )
}
