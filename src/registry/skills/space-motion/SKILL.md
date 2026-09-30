---
name: space-motion
description: Motion and transition principles for product interfaces and code-built launch films — timing tokens, easing, text reveals, page-to-page transitions, pacing, storytelling copy, sound, and frame-perfect video export. Use when animating UI, tuning or reviewing transitions, choreographing a sequence of screens, building a product launch video / promo / teaser / motion showcase in code, driving live components in a demo, or exporting a web animation to video. Triggers on "make it feel smoother", "animation feels slow / janky", "transition", "stagger", "blur reveal", "launch video", "promo video", "vidéo de lancement", "export to MP4 / 4K", "dropped frames".
---

# Motion that serves reading

Rules learned shipping a frame-perfect product launch film built entirely from live UI components, then applied back to the product's own transitions. They hold for any stack and any design system.

Motion either helps the eye find the next thing or it's noise. Arrive fast, don't linger on the way out, and never move something while the viewer is still reading.

When reviewing, scrub the motion frame by frame (or replay at 10% speed) and read every beat: what should the eye be on right now, and is anything else moving?

## Quick Reference

| Category                        | When to Use                                                                                         |
| ------------------------------- | --------------------------------------------------------------------------------------------------- |
| [Timing](timing.md)             | Any duration, easing, distance, blur, scale or stagger value; open/close and hover in/out asymmetry |
| [Films](films.md)               | Building a sequence of scenes: timeline, transitions, pre-mounting, driving real components, sound  |
| [Storytelling](storytelling.md) | Beat order, copy that sells, emoji, layout of each scene                                            |
| [Rendering](rendering.md)       | Exporting to video, 4K, stutters, animations running too fast in the export                         |
| [Resources](resources.md)       | Animated emoji, UI sounds and ready-made components to build scenes with                            |

## Core Principles

### 1. Arrivals Take 350ms

A page, panel or scene arrives in ~350ms with a smooth ease-out, `cubic-bezier(0.22, 1, 0.36, 1)`. Keep every UI transition between 150 and 400ms. Past 400ms a transition stops reading as polish and starts reading as lag.

### 2. Never Fade Out, Arrive Over

Don't animate the outgoing screen away. Hold its last frame and let the incoming one arrive on top (fade, zoom 0.96 → 1, rise 24px → 0, or an iris). An exit fade plus an entry fade doubles the perceived transition and leaves a gap of nothing on screen.

### 3. Closing Is Faster Than Opening

Close in ~0.6–0.7× the open duration, with no delay. Hover-out is quicker than hover-in (100ms vs 150ms). Intent delays belong to opening only.

### 4. The Text Reveal: Blur, Rise, Fade

Reveal text word by word: `0.5s` per word, `40ms` stagger, `12px` rise, `8px` blur to sharp, opacity 0 → 1. Blur-in reads as the text coming into focus; it's calmer than a slide and sharper than a fade.

### 5. Swap Words With a Blur Swap

To change one word inside a sentence, blur the old word out and focus the new one in (~300ms each, overlapping), and animate the container's width between the two measured widths. Letter-morphs look gimmicky; an instant width change makes the sentence jump.

### 6. Small Distances, Small Blurs

Rise or slide `4–30px` (12px for text), blur `2–8px`, scale `0.94–1.06`. Big travel and heavy blur look like a slideshow template.

### 7. Stagger 40ms, Cap the Cascade

Stagger siblings by `30–50ms` and keep the whole cascade under ~300ms. Stagger entrances only; exits leave together.

### 8. One Idea per Beat, No Dead Air

Each scene carries one idea in at most two lines. It ends ~`0.4s` after its last beat. If nothing new happens for longer, cut.

### 9. Accelerate Montages

In a sequence of cuts, make each shot ~18% shorter than the previous (×0.82) down to a ~0.16s floor. The ramp builds energy; constant-speed cuts feel like a slideshow. Use stills for fast cuts, not videos.

### 10. Focus One Thing

Show one element large and sharp; keep neighbours blurred (8px), smaller (0.8) and dimmed at the edges, and shift focus in 350ms. Shrinking everything into a grid makes every item unreadable.

### 11. Real Components, Driven

Build demos from the real product and drive it: real pointer events, a scripted cursor that glides (ease-in-out) and presses (scale 0.82, soft ripple), controlled props for states like "copied". A mockup never convinces the way a live component does. A click can be the transition: the next scene zooms in from it.

### 12. Fit Content to Its Frame

Measure each component's natural size and scale it to fill its card minus padding (cap ~1.5×), then size the card to the result. Nothing clips, nothing floats in empty padding.

### 13. Depth From Two Tones

For motion-heavy surfaces, drop borders and drop shadows: a muted outer shell with a background-coloured well inside gives depth that stays clean when things blur, scale and overlap. Use continuous corners: `corner-shape: superellipse(1.25)` where supported, or a squircle, with `border-radius` as fallback.

### 14. Deterministic Time

Everything that moves is a function of one clock. The same time must always produce the same frame, so playback, scrubbing, looping and export agree. Components with their own animation loops follow play/pause.

### 15. Warm Up Before You Play

Mount heavy scenes 2–3s before they appear, and do one hidden pass over every scene before the first play (decode images, load animation files, create WebGL contexts). Mounting at the moment of appearance is what makes live demos stutter. A loader, if you need one, is a morphing icon, never the word "Loading".

### 16. Sound on Key Actions Only

A sound marks a key action: a click or press, a copy, a success, a toggle, a page turn, the moment the main claim lands. Not every word, not every transition; leave at least 1.5–3s between cues so each one means something. Fire cues only while playing forward, never while scrubbing. Music sits on its own track and switch, ~40% under the cues, with separate controls for music, effects and master mute. [`@usespaceui/sounds`](resources.md#ui-sounds) has a cue for each of these actions.

### 17. Render, Don't Record

Export by stepping a virtual clock frame by frame, never by screen-recording. Recording keeps every hiccup and caps resolution to the screen's pixels. See [Rendering](rendering.md).

### 18. Copy Sells

Say what the viewer gets, with a concrete fact: "Get 60+ base primitives in your repo." not "A powerful component library." No filler adjectives (seamless, powerful, next-level, supercharge). Numbers come from real data.

### 19. Signature Effects, Once

Keep a signature effect (drawn hairlines, a crosshair, a logo morph) for the opener and at most the closing lock-up. Decorative chrome on every scene (frame labels like "01 · Intro", grids over everything) looks dirty.

### 20. Emoji Are Punctuation

At most one animated emoji per line, sized to the cap height, popping in after the words land (back-ease scale + −20° rotation to 0), or present from the first frame when it sets the sentence's tone. Use animated sets (Telegram, Noto, Fluent) rather than static glyphs: [`@usespaceui/emoji`](resources.md#animated-emoji) or its CDN. Skip cliché glyphs like sparkles.

## Common Mistakes

| Mistake                                              | Fix                                                                         |
| ---------------------------------------------------- | --------------------------------------------------------------------------- |
| Transition over 400ms                                | 350ms smooth ease-out; 150–250ms for small elements                         |
| Scene fades out, then the next fades in              | Hold the last frame, arrive over it                                         |
| Close slower than or equal to open, or delayed       | 0.6–0.7× the open duration, no delay                                        |
| Sentence jumps when one word changes                 | Blur swap with an animated container width                                  |
| 60px slide, 20px blur                                | 12px rise, 8px blur                                                         |
| Emoji row, or emoji replacing a word                 | One per line, as punctuation                                                |
| Caption stranded at the bottom of the frame          | Keep the scene's lines in one centred group                                 |
| Grid of shrunken items                               | Focus pull: one sharp item, neighbours blurred at the edges                 |
| Demo stutters when a scene appears                   | Pre-mount 2–3s early and warm assets up                                     |
| Component rebuilds itself every frame                | A per-frame value is in an effect's dependencies; read it from a ref        |
| Measured position is 0,0                             | Measure after a frame, in state, retrying until the size is non-zero        |
| Exported video stutters or loops animations too fast | Virtual-clock render that also controls CSS, SMIL and animated-image clocks |
| Copy full of adjectives                              | One concrete benefit per line                                               |
| A sound on every word or transition                  | Cues on key actions only, 1.5–3s apart                                      |
| Static system emoji in a film                        | Animated emoji (Telegram / Noto / Fluent) via `@usespaceui/emoji`           |

## Review Output Format

Use this format when the user asks for a motion review. When another skill orchestrates the review, hand it your findings and follow its format.

### Findings

Group confirmed findings by principle in a table with **Severity**, **Location**, **Before**, **After** and **Why** columns.

- **Severity**: `HIGH` blocks reading or feels broken (stutter, jump, motion over text being read, > 600ms transitions); `MEDIUM` is a noticeable timing or consistency problem; `LOW` is isolated polish.
- **Location**: `path/to/file:line`, or the scene and timestamp for a film.
- **Before / After**: the current values and the replacement values.
- **Why**: the principle and what the viewer experiences.

#### Example

| Severity | Location               | Before                                    | After                                      | Why                                          |
| -------- | ---------------------- | ----------------------------------------- | ------------------------------------------ | -------------------------------------------- |
| MEDIUM   | `src/Dialog.tsx:41`    | `duration: 0.6, ease: "easeInOut"`        | `duration: 0.35, ease: [0.22, 1, 0.36, 1]` | Arrivals take 350ms with a smooth ease-out   |
| HIGH     | Scene "Stats" @ 0:43.2 | Scene fades out 0.8s before next fades in | Remove exit, next scene arrives over it    | Exit fades create a gap with nothing to read |

### Verification and Verdict

List what was checked (frame-by-frame scrub, 10% replay, export inspected) and anything not verified. Verdict: `Block` if any `HIGH` remains, `Needs changes` for `MEDIUM`/`LOW` only, `Approve` when nothing actionable remains.
