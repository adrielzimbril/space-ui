# Resources

Ready-made pieces for building scenes. Nothing here is required by the principles; use them when they save time.

## Animated Emoji

**Browse:** [spaceui.one/tools/emoji](https://www.spaceui.one/tools/emoji) — search, preview every set, copy the URL or the code.

**In React:** [`@usespaceui/emoji`](https://www.npmjs.com/package/@usespaceui/emoji)

```tsx
import { Emoji } from '@usespaceui/emoji/react'

const rocket = <Emoji emoji="🚀" source="telegram" type="anim" size={96} fallback />
```

- `source` + `type`: `telegram` → `anim`; `noto` → `anim`, `flat`; `fluent` → `anim`, `3d`, `flat`, `modern`, `mono`; `twemoji`, `blobmoji`, `apple` → `flat`.
- `fallback` swaps to another set (or the native glyph) when an emoji is missing from the one you asked for.
- For films, `telegram/anim` reads best: expressive, loops cleanly, transparent background.
- `resolveEmojiUrl('🚀', { source: 'telegram', type: 'anim' })` from the package root returns the file URL without rendering anything.

**Straight from the CDN** (any stack, no package):

```text
https://cdn.spaceui.one/common/emoji/{source}/{type}/{codepoints}.webp
https://cdn.spaceui.one/common/emoji/telegram/anim/1f680.webp   → 🚀
```

`{codepoints}` is the emoji's code points in lowercase hex joined with `-` (🚀 → `1f680`). Noto is served from Google's own CDN; take its URLs from the tool or `resolveEmojiUrl`.

In an exported video, animated WebP emoji run on the image decoder's clock: control them as described in [Rendering](rendering.md).

## UI Sounds

**Listen and pick:** [sounds.spaceui.one](https://sounds.spaceui.one)

**Package:** [`@usespaceui/sounds`](https://www.npmjs.com/package/@usespaceui/sounds) — synthesized, no audio files to load.

```ts
import * as sounds from '@usespaceui/sounds'

sounds.press({ volume: 0.8 })
sounds.copy()
sounds.toggle('on')
sounds.turn('forward')
```

Cues that map to key actions:

| Moment                              | Cue                              |
| ----------------------------------- | -------------------------------- |
| A scripted click or press           | `press`, `tap`                   |
| Copying a command                   | `copy`                           |
| A success, a check, a value landing | `confirm`, `ready`, `tick`       |
| A toggle flipping                   | `toggle('on' \| 'off')`          |
| Changing slide / scene              | `turn('forward')`, `slide('in')` |
| The main claim or the logo landing  | `sparkle`, `chime`, `bloom`      |
| The opener                          | `whisper`                        |

Use them on key actions only, 1.5–3s apart (principle 16). Pass `volume` per call rather than changing the package's global setting, which is persisted for the whole site.

## Components for Scenes

**Browse:** [spaceui.one](https://www.spaceui.one) and the docs at [spaceui.one/docs](https://www.spaceui.one/docs) — live components, interactions, blocks, text effects, carousels and templates that animate on their own and look good on camera.

Each docs page shows the install command; they install as source code through the shadcn CLI:

```bash
npx shadcn@latest add @spaceui/essentials
```

Pick components that show motion without explanation (text reveals, animated counters, interactive cards, agent/deploy flows), and drive them from the film's clock rather than filming their idle state (see [Films](films.md), "Driving real components").
