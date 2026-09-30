# Film architecture

How to build a launch film as a web page that plays, scrubs, loops and renders identically.

## Contents

1. One clock, pure scenes
2. The storyboard
3. Transitions between scenes
4. Mounting: pre-roll, lingering, warm-up
5. Primitives worth having
6. Driving real components
7. Sound
8. The player
9. Measurement pitfalls

## 1. One clock, pure scenes

- A single `requestAnimationFrame` loop owns `time`. Nothing else keeps time.
- A scene is a component `({ t, d }) => JSX` where `t` is seconds since the scene started and `d` its duration. Given the same `t`, it renders the same frame — that is what makes scrubbing and offline rendering exact.
- Derive every animated value from `t` with small helpers:

```ts
const clamp01 = (v: number) => Math.min(1, Math.max(0, v))
/** 0 → 1 progress of `t` between `from` and `to`. */
const seg = (t: number, from: number, to: number) => clamp01((t - from) / (to - from))
const easeSmoothOut = (p: number) => 1 - (1 - p) ** 5
// usage: const p = easeSmoothOut(seg(t, 0.4, 0.75)); style={{ opacity: p, translate: `0 ${(1 - p) * 12}px` }}
```

- Components that animate themselves (charts, orbs, shaders) are fine; they just need to follow play/pause (pass `paused={!playing}`) and to be keyed so a scrub back remounts them when needed.

## 2. The storyboard

Keep order, durations and transitions in one list; derive start times so scenes never overlap or leave gaps.

```ts
type Beat = {
  id: string
  duration: number
  transition?: 'fade' | 'zoom' | 'iris' | 'rise'
  Component: Scene
  cues?: Cue[]
  preRoll?: number
}
const SCENES = BEATS.reduce(
  (acc, b) => [...acc, { ...b, start: acc.length ? acc.at(-1)!.start + acc.at(-1)!.duration : 0 }],
  [],
)
```

- Export beat times from the scene file (`export const CLICK_AT = 2.8`) and reference them for sound cues and durations, so a re-timed scene can't drift out of sync.
- Size a scene from its last beat: `duration = lastBeat + ~0.4 s`.

## 3. Transitions between scenes

- The incoming scene animates in over the outgoing one; the outgoing one **holds its last frame** underneath until the arrival completes, then unmounts.
- Arrival: 350 ms, smooth-out, 8 px blur → 0, plus one of:
  - **fade**: opacity only.
  - **zoom**: scale 0.96 → 1.
  - **rise**: translateY 24 px → 0.
  - **iris**: circular `clip-path` growing from the centre (or from a click point).
- Match the transition to the story: a click → zoom from the click; a new chapter → iris; same topic continuing → fade.

## 4. Mounting: pre-roll, lingering, warm-up

- **Pre-roll**: mount each scene hidden (`visibility: hidden`) ~1.2 s before its start; 2.5 s for heavy ones (WebGL, many images, many live components).
- **Lingering**: keep the previous scene mounted for the length of the next scene's transition.
- **Warm-up pass** before the first play: render every scene once, hidden, a few at a time (e.g. 3), at ~75 % of its duration so most content is on screen. Wait for `img.decode()` and `document.fonts.ready` (cap each batch at ~3 s), plus a short beat for animation files and WebGL setup. Show a morphing icon meanwhile; accept a Play press during warm-up and start when ready.
- Do **not** keep every scene mounted all the time: hidden components still run their animation loops, and browsers cap live WebGL contexts (~16) — the oldest get killed.

## 5. Primitives worth having

- **Kinetic text** — split words, each with `seg(t, at + i * 0.04, … + 0.5)`: opacity, 12 px rise, 8 px blur. Optional `out` time for a 0.25 s exit.
- **Blur swap** — cycle items at given times; the outgoing item blurs/fades, the incoming one focuses in, and the wrapper's width animates between their measured widths. Stack items in one grid cell with `grid-template-columns: minmax(0, 1fr)` so the widest item doesn't set the track.
- **Count-up** — `Math.round(value * easeOutCubic(seg(t, at, at + 1)))`, then a `+` that fades in after it lands. Short (≤ 1 s) so the number is readable.
- **Focus pull** — items on a row; the focused one centred, sharp, scale 1; neighbours at `±spread`, scale 0.8, blur 8 px, opacity 0.5; the focus index eases between items in 350 ms.
- **Fit box** — measure content's natural size, scale it to the largest size that fits the frame minus padding (cap ~1.5×), size the card to the result. Re-measure with a ResizeObserver.
- **Still** — memoise heavy subtrees (emoji players, avatars, shaders) keyed on what should restart them, so per-frame re-renders don't touch them.

## 6. Driving real components

- **Pointer drive**: dispatch real `pointerover/enter/move/down/up` events at computed coordinates inside the component; re-aim with a MutationObserver when the target re-renders; show a scripted cursor SVG gliding with ease-in-out and a press dip (scale 0.82 for ~250 ms) plus a soft ripple.
- **Click as control**: when a component accepts a controlled prop (e.g. `copied`), pass it from the timeline instead of relying on its internal timers.
- **Scroll drive**: set the component's own scroll container `scrollTop` from `t`.
- **Wheel drive** for wheel-driven carousels: feed synthetic wheel deltas proportional to elapsed time.
- **Synced video**: set `video.currentTime` from `t` when scrubbing, play/pause with the film.

## 7. Sound

- Cues are `{ at, play(options) }` on a scene; fire when the playhead crosses `at` **while playing forward** (never on scrub), and across the loop point.
- Cue key actions only (press, copy, success, toggle, page turn, the main claim landing), 1.5–3 s apart. See [`@usespaceui/sounds`](resources.md#ui-sounds).
- Pass volume per call; don't change a global sound setting that the rest of the site persists.
- Music: one `<audio>` element synced to film time (`currentTime = time % duration`, re-sync only on jumps > 0.3 s), default ~40 % so cues stay audible.
- Controls: music on/off, effects on/off, master mute, and level sliders.

## 8. The player

- Fixed stage (1920 × 1080 in rem units) scaled to fit the window; everything inside in rem so it scales cleanly.
- Controls: play/pause (Space), ±1 s (arrows), restart (R), fullscreen (F), immersive/no chrome (I), music (M), effects (S), a scrub bar with scene ticks, and the current scene name.
- Loop by default; `?t=12.5` jumps to a beat; a render flag in the URL switches to the export mode described in [Rendering](rendering.md).
- Blur the focused button after a click so keyboard shortcuts keep driving the film.

## 9. Measurement pitfalls

- A child's layout effect runs **before** the parent's ref is attached — measure from `element.parentElement` or in state after a rAF.
- On first paint the stage scale may be 0: retry measurement until width/height are non-zero (cap retries, e.g. 120 frames).
- `offsetWidth/offsetHeight` ignore ancestor transforms — use them for natural sizes; use `getBoundingClientRect` only when you want the scaled on-screen box.
- Don't combine a utility translate class with an inline `transform`; they compose unexpectedly.
- `zoom` on a positioned element also scales its `top/left`; apply it (or `scale`) to a child.
