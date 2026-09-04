import { ScrollArea } from '@/registry/primitives/scroll-area'

export default function Demo() {
  return (
    <ScrollArea className="h-80 max-w-80 rounded-lg border">
      <div className="min-w-100 p-4 text-sm leading-relaxed">
        <h4 className="mb-3 font-semibold">Space UI v2.0 — Release Notes</h4>
        <p className="mb-3 text-muted-foreground">
          This release introduces 40+ new primitives built on Base UI, a complete migration from Radix to Base UI
          internals, and first-class support for Tailwind CSS v4. Every component has been redesigned with OKLCH color
          tokens, fluid spacing, and container queries.
        </p>
        <h5 className="mb-2 font-medium">Highlights</h5>
        <ul className="mb-3 list-inside list-disc space-y-1 text-muted-foreground">
          <li>New Drawer, Toast, and Menubar primitives</li>
          <li>Segmented Control pattern across Radio, Tabs, and Navigation</li>
          <li>Preview Link Card with live URL thumbnails</li>
          <li>Number Field with spin buttons and keyboard stepping</li>
          <li>OTP Field with automatic focus progression</li>
          <li>Autocomplete with async data fetching</li>
        </ul>
        <h5 className="mb-2 font-medium">Breaking Changes</h5>
        <ul className="mb-3 list-inside list-disc space-y-1 text-muted-foreground">
          <li>Minimum React version bumped to 19</li>
          <li>All color tokens now use OKLCH format</li>
          <li>Removed deprecated Dialog.Close in favor of Dialog.Dismiss</li>
          <li>Select now requires explicit item mapping via the items prop</li>
        </ul>
        <p className="text-muted-foreground">
          See the full migration guide at spaceui.one/docs/migration for step-by-step upgrade instructions.
        </p>
      </div>
    </ScrollArea>
  )
}
