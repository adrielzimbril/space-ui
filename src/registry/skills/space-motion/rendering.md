# Rendering to video

## Record Nothing, Render Every Frame

Screen or tab capture records in real time. One slow frame (garbage collection, a shader compiling, an image decoding) becomes a visible stutter, and the whole take has to be redone. Resolution is also capped by the screen: a "4K export" from a 1080p screen is an upscale.

Render instead: drive a headless browser, **step a virtual clock by exactly `1000 / fps` ms**, let the page commit and paint, screenshot, repeat, and pipe the frames to an encoder. A slow frame then only makes the render slower; the video is identical every time. For true 4K, keep a 1920 × 1080 viewport and set the device scale factor to 2.

## Every Clock Must Be Virtual

A virtual clock only works if nothing on the page keeps its own time. Replace or pin all of these before any page script runs:

| Clock                                              | How to control it                                                               |
| -------------------------------------------------- | ------------------------------------------------------------------------------- |
| `requestAnimationFrame`                            | Queue callbacks; run them with the virtual timestamp on each step               |
| `performance.now`, `Date.now`, `new Date()`        | Return virtual time (Date in **whole milliseconds**)                            |
| `setTimeout`, `setInterval`, `requestIdleCallback` | Timer queue fired in order as virtual time passes                               |
| CSS animations/transitions, WAAPI                  | `document.getAnimations()`: pause each, set `currentTime = now − firstSeen`     |
| SMIL (`<animate>`, `<animateTransform>`)           | `svg.pauseAnimations()` + `svg.setCurrentTime(seconds)` on each root `<svg>`    |
| Animated images (WebP, GIF, APNG)                  | Decode once into frames (`ImageDecoder`), swap the right frame into the `<img>` |
| `<video>`                                          | Pause and set `currentTime` from the film clock                                 |

Leave `MessageChannel` real: React's scheduler uses it to commit, and it must run between steps. After each step, wait for a commit and two real animation frames before the screenshot.

Symptom of a clock you missed: that element plays 5–20× too fast in the export and looks like it keeps restarting, because real time passes much faster than video time while frames render.

## The Page Contract

The film page, when its URL carries a render flag:

- hides player chrome, loaders and dev overlays, and disables audio;
- runs its warm-up on the stepped clock, then reports `ready`;
- exposes `duration` and a `start()` that seeks to 0, plays, and stops on the last frame instead of looping.

## Audio

Mux the music afterwards with the encoder (loop it if shorter, fade out over the last ~1.2s, ~40% level). Keep UI sound effects in the browser; they add render complexity and rarely help a video.

## Encode

H.264, CRF ~16, `yuv420p`, `+faststart`, 60fps. JPEG frames at quality ~95 are indistinguishable from PNG after encoding and much faster to capture. Expect ~10 frames/s at 1080p and ~3 frames/s at 4K.

## Pitfalls Seen in Practice

- **Don't edit the site while a render runs.** A dev server hot-reloads changed modules into the render tab mid-film. Stop, edit, re-render.
- **The encoder overwrites the output as soon as it starts.** A killed render leaves a truncated file; render to a temporary name when the previous export matters.
- **Fractional `Date.now()` breaks libraries.** UUIDv7 generators (analytics SDKs) throw on non-integer timestamps.
- **Colours read from `getComputedStyle` can be `lab()` or `oklch()`.** WebGL colour parsers (e.g. Three.js `Color`) only read hex/rgb/hsl and silently fall back to white; convert through a 1 × 1 canvas first.
- **Components that rebuild on every frame stutter even offline** when a per-frame prop or an observer on ancestor styles sits in an effect's dependencies. Keep per-frame values in refs.
- **Dev overlays** (framework error badges) end up in the frames. Hide them in render mode.
