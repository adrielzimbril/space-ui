---
name: space-interactions
description: Architecture, strict styling invariants, motion patterns, and registry composition for Space UI interaction components — zero-shadows and zero-gradients philosophy, squircle superellipses, reicon icons, container hierarchy, and autonomous lifecycle props. Use when building or reviewing Space UI interaction cards, multi-step workflows, agent visualizers, and interactive dashboard components. Triggers on "interaction", "new interaction", "space interaction", "interaction card", "pipeline interaction", "agent card", "widget interaction".
---

# Space UI Interactions

The definitive engineering manual for creating, styling, and choreographing flagship **Space UI** interaction components.

Interactions in Space UI are not static widgets or generic cards: they are **living surfaces** designed to be operated interactively by users, displayed as self-playing showcase demos in documentation, and exported frame-by-frame by the offline launch film renderer.

---

## Quick Reference

| Reference | Contents |
| :--- | :--- |
| [Rules](rules.md) | Absolute styling bans: zero shadows, zero gradients, no `font-mono`, no `border-border`, `reicon-react` icons, continuous squircles. |
| [Patterns](patterns.md) | Canonical container hierarchy: Frame shell, FrameHeader with Squishmoji, inner Card with `ResizeObserver` height lock, FrameFooter, and sound cues. |
| [Components](components.md) | Full Space UI registry menu: sliders, switches, text reveals, orbs, numbers, timelines, and inputs to pick from. |

---

## The 5 Invariant Rules

Every interaction component must strictly uphold these five styling and aesthetic invariants without exception:

### 1. Zero Shadows (Absolute Ban)
* **Never use shadows.** No `shadow-xs`, `shadow-sm`, `shadow-md`, `shadow-lg`, or arbitrary `shadow-[...]`.
* Explicitly set `shadow-none` on primitives and base elements.
* Space UI achieves tactile depth through **two-tone surface contrast** (a muted outer shell with a crisp solid well inside).

### 2. Zero Gradients
* **Never use background gradients.** No `bg-gradient-to-*`, no radial hacks.
* Rely on solid semantic tokens: `bg-muted` for the chassis, `bg-background` or `bg-card` for the inner interactive well.

### 3. Strict Typography: Never `font-mono`
* **Monospace typography is forbidden**, even for counters, timers, IDs, and financial amounts.
* Use `font-open-runde` or inherited `font-body`.
* Use **`tabular-nums`** whenever numbers or metrics need vertical column alignment without visual jitter.

### 4. Borders: Never `border-border`
* **`border-border` is banned.**
* Prefer `border-none`. When outlines or dividers are required, use `border-muted`, `border-background`, or `divide-muted`.

### 5. Icons: Exclusively `reicon-react`
* Use **`reicon-react`** (`import { ... } from 'reicon-react'`) for all interface icons.
* Size consistently with Tailwind `size-*` utilities (e.g. `size-3.5`, `size-4`).

### 6. Never Reinvent the Wheel: Registry-First
* **Never use raw `<button>`**: Always import `Button` from `@/registry/components/button/button-squircle`.
* **Never write custom badge spans**: Always import `Badge` from `@/registry/components/spaceui/badge-squircle`.
* **Never recreate hooks**: Use production-tested hooks from `@/registry/hooks/` (`useInterval`, `useToggle`, `useIdle`, `useHold`, `useIsMounted`).
* Always check `@/registry/primitives/` and `@/registry/components/` before creating new UI elements.

---

## The Canonical Interaction Pattern

Every flagship Space UI interaction card is structured around four interlocking layers:

```tsx
<Frame className="relative flex w-full max-w-md flex-col [corner-shape:superellipse(1.25)] rounded-3xl bg-muted p-1.5 select-none shadow-none font-open-runde">
  
  {/* Layer 1: Frame Header */}
  <FrameHeader className="flex flex-row shrink-0 items-center justify-between gap-3 px-2 py-1.5 pb-2 border-none">
    {/* Left: Expressive Squishmoji + Title */}
    <div className="flex items-center gap-2 min-w-0">
      <div className="relative size-6 shrink-0 overflow-hidden rounded-full bg-background flex items-center justify-center shadow-none cursor-pointer">
        <Squishmoji seed="interaction-seed" size={24} animate animWobble animOnHover animOnClick shape="all" expression="all" backgroundStyle="all" className="size-full" />
      </div>
      <span className="text-xs sm:text-sm font-semibold text-foreground truncate">
        Interaction Title
      </span>
    </div>

    {/* Right: Status Badge with Ping Radar Dot */}
    <Badge size="xs" variant="secondary" squircle className="bg-background! text-foreground flex items-center gap-1.5 shadow-none shrink-0">
      <span className="relative flex justify-center items-center size-fit">
        <span className="absolute inline-flex h-full w-full rounded-full opacity-75 animate-ping animation-duration-[2.25s] bg-emerald-300" />
        <span className="relative inline-flex rounded-full size-2 animate-pulse bg-emerald-500" />
      </span>
      <BlurRevealText as="span" text="Active" replayKey="status-key" inView={false} once={false} delay={0} duration={0.22} blurAmount="0.3125rem" yOffset={2} className="inline-block text-[0.6875rem] font-medium text-foreground" />
    </Badge>
  </FrameHeader>

  {/* Layer 2: Inner Card Well (Height-Stabilized via ResizeObserver) */}
  <Card className="flex flex-col squircle rounded-[1.125rem] bg-background p-4 sm:p-5 border-none shadow-none">
    <motion.div
      animate={contentHeight ? { height: contentHeight } : {}}
      transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
      className="relative flex flex-col gap-3 w-full"
    >
      <div ref={contentRef} className="w-full flex flex-col gap-3">
        {/* Interactive Core: Best-fit components selected from registry */}
      </div>
    </motion.div>
  </Card>

  {/* Layer 3: Frame Footer (Optional) */}
  <FrameFooter className="flex shrink-0 items-center justify-between gap-3 px-3 py-1.5 pt-2 border-none">
    {/* Secondary controls / action buttons / meta */}
  </FrameFooter>

</Frame>
```

---

## Registry-First Component Selection

Do not write ad-hoc micro-components when Space UI provides proven registry building blocks. Select the best match from [Components](components.md):

* **Inputs & Progress**: `SmoothSlider`, `SloshSlider`, `TickSlider`, `AutoscaleInput`
* **Selection & Toggles**: `LiquidSwitch`, `InterestPicker`, `MemberSelector`, `TeamRosterSelector`
* **Text Reveal & Typography**: `BlurRevealText`, `MorphingText`, `FlipText`, `PixelRevealText`
* **Visualizers & Agents**: `Squishmoji`, `OrbBloop`, `LoadingOrb`, `UserPresenceAvatar`
* **Data & Counters**: `NumberFlow` with `tabular-nums`, `Timeline`, `ScrollArea`
* **Actions & Confirmation**: `SlideToConfirm`, `Button squircle`, `Badge squircle`

---

## Autonomous Lifecycle & Recording Contract

To support interactive playgrounds, documentation autoplay, and frame-by-frame film exports, always expose this standardized prop contract:

```tsx
export interface InteractionProps {
  animation?: 'active' | 'inactive' | boolean
  autoPlay?: boolean
  paused?: boolean
  pauseOnHover?: boolean
  speed?: number
  cyclePresets?: boolean
  cyclePreset?: boolean
  targetLoops?: number
  onSequenceComplete?: () => void
  className?: string
}
```

* Ship a dedicated `data.ts` companion file with typed default presets and flows so the interaction runs immediately with zero props.
* Manage state through a deterministic phase machine (`idle` → `running` → `paused` → `done` | `error`).

---

## Haptic Sound Choreography

All sounds from `@usespaceui/sounds` must be guarded with `safeSound`:

```tsx
const safeSound = (fn: () => void) => {
  if (typeof window === 'undefined') return
  try { fn() } catch {}
}
```

* **`ready`**: Sequence succeeded, pipeline approved, operation confirmed.
* **`whisper`**: Phase transition, subtle step relay, dialogue turn.
* **`tap`**: User interaction (button click, slider drag, disclosure toggle).
* **`bloom`**: Incremental milestone completed in a multi-step sequence.
* **`deny`**: Error state, rollback, or execution aborted.
* **`droplet` / `loading`**: Live voice, streaming thinking state, or ambient ping.

---

## Common Mistakes & Review Checklist

| Mistake | Correction |
| :--- | :--- |
| Adding any shadow (`shadow-xs`, `shadow-md`) | Remove shadow; apply `shadow-none` and rely on two-tone contrast |
| Using CSS gradients (`bg-gradient-to-*`) | Use solid semantic surface tokens (`bg-muted`, `bg-background`, `bg-card`) |
| Using `font-mono` on numbers or timers | Use `font-open-runde` or body font with `tabular-nums` |
| Using `border-border` | Use `border-none`, or `border-muted` / `border-background` |
| Importing icons from Lucide / Heroicons | Import exclusively from `reicon-react` |
| Jumping container height on step changes | Measure content with `ResizeObserver` and animate `motion.div height` |
| Raw unhandled sound calls | Wrap in `safeSound` to prevent SSR errors |
| Square standard corners | Use `[corner-shape:superellipse(1.25)]` and `squircle rounded-7xl` |
| Writing native `<button>` or duplicate hooks | Import `Button` from `@/registry/components/button/button-squircle` and hooks from `@/registry/hooks/` |
