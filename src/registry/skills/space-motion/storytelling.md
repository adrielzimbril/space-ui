# Storytelling, copy and layout

A launch film is an argument in ~60 seconds. Every scene earns its place by moving the viewer one step closer to "I want this".

## Beat order that works

1. **Opener** (3–4 s) — the mark, drawn in. One signature effect (e.g. hairlines that draw a crosshair around the logo). Keep that effect for the opener and, at most, the final lock-up.
2. **Problem** (3–4 s) — the pain in the viewer's own words: _"You're rebuilding the same [toggle → modal → dropdown] again."_ A swapping word shows it's endless.
3. **Answer** (same scene or next) — the product's promise with the benefit words in the accent colour.
4. **Product in action** — the real hero / real components, driven live. A scripted click on the primary action.
5. **Proof, fast** — what's inside: a montage, counters from real data, a testimonial quote from a real person.
6. **Call to action** — the imperative ("Stop rebuilding UI." → "Start shipping."), then the lock-up (mark + name + the one command or URL), a cursor clicking the link, fade to black.

Transitions between chapters can be a line of text alone on screen ("And…", "Interactions") — short, 2–3 s, big type.

## Copy rules

- **Sell, don't describe.** Lead with what the viewer gets: "Get 60+ base primitives in your repo." beats "A comprehensive component library."
- **Concrete over clever.** Numbers, names, time saved ("ready to launch in 12 hours").
- **Kill filler words**: seamless, powerful, robust, next-level, supercharge, unleash, elevate, effortless, cutting-edge. If a sentence survives without the adjective, drop it.
- **Plain words for plain things**: "Plain code in your codebase." not "Framework-agnostic source ownership".
- **Two lines max** per beat. Split on meaning: "Every component ships / with its own spring and sound."
- **Speak to one person** ("you", "your next launch"), present tense.
- Numbers come from real data, pulled at build time — a film must never lie.

## Emoji

- Animated emoji (Telegram / Noto / Fluent style) are punctuation for tone: 🫠 on the problem, 🦄 on the answer, 🚀 on the CTA.
- One per line, sized to the cap height (~1.2 em), popping after the words land (scale with back-ease + −20° rotation → 0), or present from the first frame when the sentence depends on it.
- Never a row of emoji; never an emoji doing a word's job.
- Source: [`@usespaceui/emoji`](resources.md#animated-emoji), or browse and copy URLs from the emoji tool.

## Layout

- One focal block per scene, centred. Keep related lines together in one stack; don't strand a caption at the bottom of the frame.
- Use space deliberately: a badge above, the statement in the middle, one supporting line under it — as one centred group.
- Headlines 72–90 px on a 1080 frame, supporting lines ~40 px, captions ~24–36 px.
- Dark scenes for statements, light scenes for product; alternate to create rhythm.
- Cards: two-tone surface, soft superellipse/squircle corners, no border, no shadow; the content scaled to fit its card.
- Full-bleed images only if their aspect matches the frame (16:9 on a 16:9 film); otherwise they letterbox and look broken.

## Review checklist

- Can each scene be summarised in one sentence? If not, split it.
- Does any scene sit still with nothing to read for > 0.4 s? Trim it.
- Is any word animating while the viewer is still reading the previous one? Delay it.
- Would the viewer understand the film with the sound off? They should.
- Does every claim match real data?
