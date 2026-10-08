# Strict Styling & Design Invariants

Space UI interactions are crafted with a disciplined aesthetic. Every pixel must feel organic, clean, and intentional. The following rules are non-negotiable across all interaction cards and components.

---

## 1. Zero Shadows (Absolute Shadow Ban)

**Never use box shadows.** Even subtle shadows like `shadow-xs`, `shadow-sm`, `shadow-md`, `shadow-lg`, or arbitrary `shadow-[...]` are completely forbidden.

* **Forbidden**: `shadow-xs`, `shadow-sm`, `shadow-md`, `shadow-lg`, `shadow-xl`, `shadow-2xl`, `shadow`
* **Required**: `shadow-none` whenever a primitive or base component defaults to having a shadow.
* **Why**: Heavy or blurry shadows make software look muddy, generic, and dated. Space UI achieves spatial hierarchy and depth through **two-tone contrast** (a muted plate behind a crisp foreground well), continuous squircle silhouettes, and subtle border lines.

```tsx
// ❌ WRONG
<Card className="rounded-xl shadow-md border">

// ✅ CORRECT: Pure two-tone depth, zero shadow
<Card className="flex flex-col squircle rounded-[1.125rem] bg-background p-4 sm:p-5 border-none shadow-none">
```

---

## 2. Zero Gradients

**Never use background gradients.** Do not use linear gradients (`bg-gradient-to-*`) or radial gradient hacks (`bg-[radial-gradient(...)]`).

* **Forbidden**: `bg-gradient-to-r`, `bg-gradient-to-b`, `from-*`, `via-*`, `to-*`, `bg-[radial-gradient(...)]`
* **Required**: Solid semantic tokens (`bg-background`, `bg-muted`, `bg-card`, `bg-accent`, `bg-primary`).
* **Why**: Gradients inject visual noise, distract the eye from reading live data, and look like low-effort templates. Space UI prioritizes flat, crisp, hyper-calibrated solid surfaces.

---

## 3. Strict Typography: No `font-mono`

**Never use `font-mono`.** Space UI uses rounded and geometric sans-serif typefaces (`font-open-runde`, `font-body`, `font-sans`).

* **Forbidden**: `font-mono`, `[font-family:monospace]`, monospace font stacks.
* **Required**: 
  * Default typography: `font-open-runde` or inherited `font-body`.
  * For numbers, metrics, prices, timers, and timestamps: apply **`tabular-nums`** to preserve tabular alignment without introducing harsh typewriter monospace glyphs.
  * Headings: `font-semibold tracking-[-0.03em] text-balance`.
  * Small labels: `text-xs font-medium` or `text-[0.6875rem] font-medium`.

```tsx
// ❌ WRONG
<span className="font-mono text-xs">{timer}</span>

// ✅ CORRECT: Tabular alignment with Open Runde / body font
<span className="font-open-runde text-xs font-medium text-muted-foreground tabular-nums">
  {timerText}
</span>
```

---

## 4. Borders: Never `border-border`

**`border-border` is strictly prohibited.**

* **Forbidden**: `border-border`
* **Allowed**:
  * Default preference: `border-none` (rely on surface color differences).
  * Divider lines / subtle outlines: `border-muted` or `border-background`.
  * Inner separators: `divide-muted` or `<div className="h-px bg-muted" />`.

```tsx
// ❌ WRONG
<div className="border border-border">

// ✅ CORRECT
<div className="border border-muted">
// OR
<div className="border-none">
```

---

## 5. Icons: Exclusively `reicon-react`

**Always use `reicon-react` for interface icons.**

* **Forbidden**: Lucide, Heroicons, Radix Icons, or generic SVGs unless a specialized icon package (like `@keyline-icons/react` for keyline sets) is specifically required.
* **Required**: `import { ... } from 'reicon-react'`
* **Properties**: Tree-shakeable, clean outline and filled variants, perfectly sized with Tailwind `size-*` utilities (e.g. `size-3.5`, `size-4`).

```tsx
// ❌ WRONG
import { Check, Pause, Play } from 'lucide-react'

// ✅ CORRECT
import { Check, Pause, Play } from 'reicon-react'
```

---

## 6. Squircles & Continuous Superellipses

Space UI rejects standard boxy border-radii (`rounded-md`, `rounded-lg`). All corners follow continuous superellipse geometry.

* **Tokens**:
  * Outer Frame shell: `[corner-shape:superellipse(1.25)] rounded-3xl`
  * Inner Card well: `squircle rounded-[1.125rem]`
  * Badges & Buttons: `squircle rounded-7xl` or the boolean prop `squircle` (e.g. `<Button squircle>`, `<Badge squircle>`)
  * Emoji / Avatar containers: `[corner-shape:superellipse(1.25)] rounded-xl` or `rounded-full`

---

## 7. Semantic Color Tokens Only

Never hardcode arbitrary gray scales (`gray-*`, `slate-*`, `zinc-*`, `neutral-*`).

* **Always use semantic tokens**:
  * Surfaces: `bg-background`, `bg-muted`, `bg-card`, `bg-accent`
  * Text: `text-foreground`, `text-muted-foreground`, `text-primary-foreground`
  * Borders: `border-muted`, `border-background`
  * Semantic accents: `bg-primary`, `bg-emerald-500` / `text-emerald-500` (success), `bg-rose-500` / `text-rose-500` (error/danger), `bg-amber-500` / `text-amber-500` (warning/paused), `bg-blue-500` / `text-blue-500` (info/active).

---

## 8. Never Reinvent the Wheel: Always Check the Registry First

**Before writing any native HTML element, helper hook, or custom widget, verify if it already exists in the Space UI registry.**

* **Never use raw `<button>`**: Always import `Button` from `@/registry/components/button/button-squircle`.
  * Provides squircle curves, consistent focus rings, sizes (`icon-xs`, `icon-sm`, `sm`, `default`, `lg`), and variants (`secondary`, `primary`, `ghost`).
* **Never write custom badge spans**: Always import `Badge` from `@/registry/components/spaceui/badge-squircle`.
* **Never recreate hooks**: Space UI already includes an extensive library of production-tested hooks in `@/registry/hooks/`:
  * Lifecycle: `useInterval`, `useToggle`, `useIdle`, `useHold`, `useIsMounted`, `useUpdateEffect`, `useIsomorphicLayoutEffect`.
  * Browser & DOM: `useMediaQuery`, `useWindowSize`, `useScroll`, `useEventListener`.
* **Primitives**: Always check `@/registry/primitives/` (`frame`, `card`, `scroll-area`, `popover`, `dialog`, `select`, `timeline`, `avatar`, `tabs`, `collapsible`, etc.) before rolling your own.

