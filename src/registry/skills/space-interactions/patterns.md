# The Canonical Interaction Pattern

All flagship Space UI interactions follow an architectural blueprint proven across the 5 reference interaction cards:
* `agent-pipeline`
* `agent-usage-card`
* `currency-converter`
* `deploy-pipeline`
* `realtime-voice`

---

## 1. Container Hierarchy: Frame, Header, Card, Footer

```
┌─────────────────────────────────────────────────────────────┐
│ Frame: bg-muted, rounded-3xl [corner-shape:superellipse], p-1.5, shadow-none
│ ┌─────────────────────────────────────────────────────────┐ │
│ │ FrameHeader: border-none, px-2 py-1.5 pb-2              │ │
│ │  [Squishmoji / Avatar] Title   ...   [Badge: Dot + Blur]│ │
│ └─────────────────────────────────────────────────────────┘ │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │ Card (Inner Well): bg-background, rounded-[1.125rem]    │ │
│ │   border-none, shadow-none, p-4 sm:p-5                  │ │
│ │                                                         │ │
│ │   motion.div (height: contentHeight from ResizeObserver)│ │
│ │   ├── Interactive Core Component                        │ │
│ │   ├── Sub-components / Sliders / Switch / Timeline       │ │
│ │   └── Dynamic Live Data / NumberFlow / Text Reveal      │ │
│ └─────────────────────────────────────────────────────────┘ │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │ FrameFooter: border-none, px-3 py-1.5 pt-2 (optional)   │ │
│ │  Status message / Secondary metrics / Action Buttons    │ │
│ └─────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

---

## 2. Structural Code Implementation

### A. The Outer `<Frame>`
The frame acts as the outer tactile chassis. It sets the muted surface tone, squircle silhouette, and global font.

```tsx
<Frame
  onMouseEnter={() => setIsHovered(true)}
  onMouseLeave={() => setIsHovered(false)}
  className={cn(
    'relative flex w-full max-w-md flex-col [corner-shape:superellipse(1.25)] rounded-3xl bg-muted p-1.5 select-none shadow-none font-open-runde',
    className,
  )}
>
```

### B. The `<FrameHeader>`
Includes:
1. **Left anchor**: Expressive `<Squishmoji>` or Avatar inside a circular/superellipse container + `font-semibold text-foreground` title.
2. **Right anchor**: Real-time status badge with a pulsing radar dot (`animate-ping` + `animate-pulse`) and `<BlurRevealText>`.

```tsx
<FrameHeader className="flex flex-row shrink-0 items-center justify-between gap-3 px-2 py-1.5 pb-2 border-none">
  {/* Left: Squishmoji / Avatar + Title */}
  <div className="flex items-center gap-2 min-w-0">
    <div className="relative size-6 shrink-0 overflow-hidden rounded-full bg-background flex items-center justify-center shadow-none cursor-pointer">
      <Squishmoji
        seed="pipeline"
        size={24}
        animate
        animWobble
        animOnHover
        animOnClick
        shape="all"
        expression="all"
        backgroundStyle="all"
        blinkTrigger={blinkTrigger}
        className="size-full"
      />
    </div>
    <span className="text-xs sm:text-sm font-semibold text-foreground truncate">
      Deploy Pipeline
    </span>
  </div>

  {/* Right: Status Badge with Ping Indicator */}
  <Badge
    size="xs"
    variant="secondary"
    squircle
    className="bg-background! text-foreground flex items-center gap-1.5 shadow-none shrink-0"
  >
    <span className="relative flex justify-center items-center size-fit">
      <span
        className={cn(
          'absolute inline-flex h-full w-full rounded-full opacity-75 animate-ping animation-duration-[2.25s]',
          isError ? 'bg-rose-300' : isPaused ? 'bg-amber-300' : 'bg-emerald-300',
        )}
      />
      <span
        className={cn(
          'relative inline-flex rounded-full size-2 animate-pulse',
          isError ? 'bg-rose-500' : isPaused ? 'bg-amber-500' : 'bg-emerald-500',
        )}
      />
    </span>
    <BlurRevealText
      as="span"
      text={isError ? 'Failed' : isPaused ? 'Paused' : 'Active'}
      replayKey={`${isError}-${isPaused}`}
      inView={false}
      once={false}
      delay={0}
      duration={0.22}
      blurAmount="0.3125rem"
      yOffset={2}
      className="inline-block text-[0.6875rem] font-medium text-foreground"
    />
  </Badge>
</FrameHeader>
```

### C. The Inner `<Card>` & Jitter-Free Height Animation
When sub-views change or elements expand/collapse, the outer frame must **never jump or pop**. Always measure the inner content with a `ResizeObserver` and animate the container's height smoothly.

```tsx
const contentRef = React.useRef<HTMLDivElement>(null)
const [contentHeight, setContentHeight] = React.useState<number | undefined>(undefined)

React.useLayoutEffect(() => {
  const el = contentRef.current
  if (!el) return

  const ro = new ResizeObserver((entries) => {
    const entry = entries[0]
    if (!entry) return
    const h = entry.borderBoxSize?.[0]?.blockSize ?? entry.contentRect.height
    if (h > 0) {
      setContentHeight(Math.round(h))
    }
  })

  ro.observe(el)
  return () => ro.disconnect()
}, [])

// JSX:
<Card className="flex flex-col squircle rounded-[1.125rem] bg-background p-4 sm:p-5 border-none shadow-none">
  <motion.div
    animate={contentHeight ? { height: contentHeight } : {}}
    transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
    className="relative flex flex-col gap-3 w-full"
  >
    <div ref={contentRef} className="w-full flex flex-col gap-3">
      {/* Interactive Core */}
    </div>
  </motion.div>
</Card>
```

### D. The `<FrameFooter>`
Houses primary action buttons, play/pause triggers, or secondary metadata. Always `border-none`.

```tsx
<FrameFooter className="flex shrink-0 items-center justify-between gap-3 px-3 py-1.5 pt-2 border-none">
  <span className="truncate text-xs text-muted-foreground font-medium">
    {statusMessage}
  </span>
  <Button
    variant="secondary"
    size="icon-xs"
    squircle
    onClick={togglePlay}
    aria-label="Toggle playback"
    className="cursor-pointer"
  >
    {isPlaying ? <Pause className="size-3 text-foreground" /> : <Play className="size-3 text-foreground ml-0.5" />}
  </Button>
</FrameFooter>
```

---

## 3. Autonomous Props & Lifecycle Contract

Every Space UI interaction is dual-mode:
1. **Interactive Product Component**: Driven by user clicks, sliders, and form events.
2. **Autonomous Showcase / Video Artifact**: Plays itself in demos, loops seamlessly, and can be driven frame-by-frame by the offline video renderer (`scripts/launch-render.mjs`).

To guarantee this compatibility, every interaction must support this prop interface:

```tsx
export interface InteractionProps {
  /** Animation state or boolean. When inactive, pipeline halts. @default 'active' */
  animation?: 'active' | 'inactive' | boolean
  /** Auto-advance through scenario cycles on a timer. @default true */
  autoPlay?: boolean
  /** Explicitly pause or resume the interaction. */
  paused?: boolean
  /** Pause auto-advance while cursor is hovering. @default true */
  pauseOnHover?: boolean
  /** Speed multiplier for execution (1 = normal, 2 = 2x). @default 1 */
  speed?: number
  /** Cycle through presets/flows across consecutive runs. @default true */
  cyclePresets?: boolean
  /** Alias for cyclePresets */
  cyclePreset?: boolean
  /** Target number of sequence cycles to execute before halting (for video recorder) */
  targetLoops?: number
  /** Callback fired when targetLoops cycles have completed */
  onSequenceComplete?: () => void
  /** Additional CSS classes */
  className?: string
}
```

---

## 4. Haptic Sound Orchestration

Sounds enrich key interaction beats but must never create auditory clutter.
* Always wrap sound triggers in `safeSound` to guard against SSR and browser autoplay restrictions.
* Pair sound semantic tokens to meaningful state changes:

```tsx
import { bloom, deny, droplet, loading, nudge, ready, tap, whisper } from '@usespaceui/sounds'

const safeSound = (fn: () => void) => {
  if (typeof window === 'undefined') return
  try {
    fn()
  } catch {}
}

// Key actions:
safeSound(ready)            // Milestone or workflow succeeded
safeSound(deny)             // Error, validation failure, or cancellation
safeSound(whisper)          // Subtle phase switch, dialogue turn, or reset
safeSound(tap)              // User clicks button, toggle, or expands panel
safeSound(bloom)            // Step completed in a sequence
safeSound(() => nudge('up'))// Value increment or disclosure open
safeSound(droplet)          // Ambient voice, particle, or live ping
```
