# Timing

Pick values by **what the motion is for**, not by the nearest number already in the codebase.

## Duration

| Token   | Value      | Use for                                                   |
| ------- | ---------- | --------------------------------------------------------- |
| instant | 100–150 ms | Hover in, press feedback, colour changes                  |
| quick   | 200 ms     | Tooltips, small popovers, icon swaps, hover out           |
| base    | 250–300 ms | Dropdowns, tabs, word swaps, list items                   |
| panel   | 350–400 ms | Page / scene arrivals, dialogs, sheets, drawers           |
| slow    | 500 ms     | Word-by-word text reveal (per word), count-ups up to ~1 s |

Anything over 500 ms for a single element is a choreography, not a transition — justify it.

**Asymmetry**

- Close ≈ 0.6–0.7 × open. A 350 ms dialog closes in ~240 ms.
- Hover out is quicker than hover in (hover in 150 ms, out 100 ms) so the UI never feels sticky.
- Never add a delay to a close or a dismissal.
- Intent delays (e.g. 300–500 ms before showing a hover card) are fine on _open_ only.

## Easing

| Name                 | Curve                                              | Use for                                                                      |
| -------------------- | -------------------------------------------------- | ---------------------------------------------------------------------------- |
| smooth-out (default) | `cubic-bezier(0.22, 1, 0.36, 1)` / `1 - (1 - p)^5` | Anything arriving: pages, panels, text                                       |
| ease-out-expo        | `1 - 2^(-10p)`                                     | Opacity/blur of reveals                                                      |
| ease-out-back        | overshoot ~1.7                                     | Pops: emoji, avatars, badges (small elements only)                           |
| ease-in-out-cubic    | symmetric                                          | Things that move _between_ two resting places (cursor glide, carousel shift) |
| ease-in-cubic        | accelerating                                       | Final fade to black only                                                     |
| spring               | stiffness ~300, damping ~30                        | Direct manipulation, popovers, gooey shapes                                  |

Linear only for continuous loops (spinners, marquees, scrubbed progress).

## Distance

- Text rise: 12 px (range 8–16).
- Panel slide: 16–30 px, or 10–14 % for a full-bleed image sliding in.
- Never animate from off-screen for UI; it reads as a slideshow.

## Blur

- Reveals: 8 px → 0.
- Swaps: 6–8 px on the outgoing item.
- Scene arrival: 8 px on the incoming scene.
- Moving images mid-slide: up to 10 px while in motion, 0 at rest.
- Blur is expensive on large areas — apply to the element that moves, not to a full-screen wrapper, when you can.

## Scale

- Scene arrival: 0.96 → 1 (zoom) or 1.04 → 1 (settle).
- Press: 0.96–0.97.
- Pops: 0.5 → 1 with ease-out-back.

## Stagger

- 30–50 ms between siblings (40 ms default for words).
- Cap the whole cascade near 300 ms; beyond that, group items.
- Stagger enter, not exit: exits leave together, fast.

## Choosing, in one breath

Arriving → smooth-out, 350 ms, 8 px blur, small rise. Leaving → don't, or 60 % of the arrival with no delay. Popping → back-ease, small element. Touching → spring. Looping → linear.
