# The Space UI Component Registry Palette

Do not restrict new interactions to a fixed subset of components. Space UI provides a rich registry of expressive, physics-driven, and micro-interactive primitives. Choose and combine the best tools according to your interaction goals.

---

## 1. Sliders & Continuous Controls

| Component | Path | Best Used For |
| :--- | :--- | :--- |
| `SmoothSlider` | `@/registry/components/spaceui/smooth-slider` | Smooth scrubbing, pipeline progress, audio scrubbers, and percentage adjustments. |
| `SloshSlider` | `@/registry/components/spaceui/slosh-slider` | Liquid/fluid inertia sliders for playful parameters and tactile feel. |
| `TickSlider` | `@/registry/components/spaceui/tick-slider` | Discrete steps, timeline checkpoints, and stepped threshold selectors. |

---

## 2. Selectors, Switches & Chips

| Component | Path | Best Used For |
| :--- | :--- | :--- |
| `LiquidSwitch` | `@/registry/components/spaceui/liquid-switch` | Organic state toggles, feature enablement, and mode switches. |
| `InterestPicker` | `@/registry/components/spaceui/interest-picker` | Tag and category selection with springy toggle chips. |
| `MemberSelector` | `@/registry/components/spaceui/member-selector` | Agent routing, team assignee dropdowns, and recipient selection. |
| `TeamRosterSelector` | `@/registry/components/spaceui/team-roster-selector` | Multi-agent clusters, cluster deployment, and role assignment. |

---

## 3. Text Reveal & Dynamic Typography

| Component | Path | Best Used For |
| :--- | :--- | :--- |
| `BlurRevealText` | `@/registry/components/spaceui/blur-reveal-text` | Word-by-word or character reveals (rise + blur to sharp). Ideal for dialogue, status strings, and AI agent output. |
| `MorphingText` | `@/registry/components/spaceui/morphing-text` | Fluid blur-swaps between words or phases without shifting line layouts. |
| `FlipText` | `@/registry/components/spaceui/flip-text` | Flapping board/mechanical digit or word flips. |
| `GooeyTextReveal` | `@/registry/components/spaceui/gooey-text-reveal` | Viscous, organic headline reveals. |
| `PixelRevealText` | `@/registry/components/spaceui/pixel-reveal-text` | Retro-tech/matrix un-scramble transitions for code and security events. |

---

## 4. Orbs & Ambient Shaders

| Component | Path | Best Used For |
| :--- | :--- | :--- |
| `OrbBloop` | `@/registry/components/orb/bloop` | Organic, voice-reactive speech orb with watercolor diffusion and ambient breathing. |
| `LoadingOrb` | `@/registry/components/orb/loading` | Micro-orb for loading states, inline badges, and compact agent indicators. |

---

## 5. Agents, Avatars & Expressive Icons

| Component | Path | Best Used For |
| :--- | :--- | :--- |
| `Squishmoji` | `@usespaceui/squishmoji/react` | Procedural expressive agent faces (`expression`, `blinkTrigger`, `animOnHover`, `animOnClick`, `seed`). |
| `UserPresenceAvatar` | `@/registry/components/spaceui/user-presence-avatar` | Live user presence, typing indicators, and collaboration avatars. |
| `IconStack` | `@/registry/components/spaceui/icon-stack` | Stacked tool/integration badges (e.g. GitHub + OpenAI + Vercel). |
| `MorphIcon` | `@/registry/components/spaceui/morph-icon` | Seamless icon morphing (`rotate-scale`, `blur-scale`) between play/pause, check/cross, chevron directions. |

---

## 6. Numbers, Financials & Inputs

| Component | Path | Best Used For |
| :--- | :--- | :--- |
| `NumberFlow` | `@number-flow/react` | Animated tabular-number transitions for balances, percentages, rates, and counters. |
| `AutoscaleInput` | `@/registry/components/spaceui/autoscale-input` | Auto-scaling numeric inputs that resize font size to fit their container. |
| `DataGrid` | `@/registry/components/spaceui/data-grid` | Compact metrics grids, parameter tables, and cost breakdowns. |

---

## 7. Structure, Timeline & Disclosure

| Component | Path | Best Used For |
| :--- | :--- | :--- |
| `Timeline` | `@/registry/components/spaceui/timeline` | Multi-step build pipelines, order tracking, and sequential state verification. |
| `DetachableAccordion`| `@/registry/components/spaceui/detachable-accordion` | Multi-panel drawers, collapsibles, and drilldown inspection panels. |
| `ScrollArea` | `@/registry/primitives/scroll-area` | Constrained logs, streaming terminal output, and activity lists (`scrollFade`). |
| `SlideToConfirm` | `@/registry/components/spaceui/slide-to-confirm` | High-impact actions: deploy to prod, purge database, transfer funds. |

---

## 8. Icons (`reicon-react`)

Always import icons from `reicon-react`:
```tsx
import {
  Check,
  ChevronDown,
  ChevronRight,
  Copy,
  Flash,
  Grid,
  Pause,
  Play,
  Refresh,
  Shield,
  X,
} from 'reicon-react'
```
Size with Tailwind utility classes (`size-3.5`, `size-4`, `size-5`). Never allow icon strokes to clash with body typography.
