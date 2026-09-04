# Dancepad inventory → Space UI registry

Source demo: `C:\Users\ASUSROGREDHAT\Downloads\New folder (8)\dancepad-app`  
Sidebar categories from `src/components/site/sidebar.tsx`. Extra pages not in the nav are listed at the end.

**How to read the table**

| Column | Meaning |
| --- | --- |
| Source | Sidebar / page label in dancepad |
| Route | Next.js route in dancepad `src/app` |
| Files | Main implementation files (relative to dancepad root) |
| Space UI name | Registry item + docs slug we use here |
| Goes in | Folder under `apps/www/src/registry` + `content/ui-kit` |
| Import | How we import it after install |
| Status | `done` already in this repo · `next` confirmed to port · `hold` waiting on your pick · `skip` already exists or too messy |

Demo convention: `registry/demo/<area>/<slug>/c-<slug>-1/` so extra demos stay `c-<slug>-2`, etc.

---

## Blocks / templates

| Source | Route | Files | Space UI name | Goes in | Import | Status |
| --- | --- | --- | --- | --- | --- | --- |
| Produx | `/produx` | `src/app/produx/page.tsx`, `src/components/v1/produx-about-section.tsx`, `services-section.tsx`, `projects-section.tsx`, `produx-footer.tsx`, `studio-designer-section.tsx` | `produx` | `demo/blocks/produx/` + `content/ui-kit/blocks/produx.mdx` | block page, not a single import | hold |
| Wabi | `/wabi` | `src/app/wabi/page.tsx` | `wabi` | `demo/blocks/wabi/` + `content/ui-kit/blocks/wabi.mdx` | block | hold |
| Work / Kenichi | `/work` `/kenichi` | `src/app/work/page.tsx`, `src/app/work/work-webgl-layer.tsx`, `src/app/kenichi/page.tsx` | Work page → **Work WebGL** (`shader/work-webgl`) | `content/ui-kit/components/shader/work-webgl.mdx` | coming-soon docs only | done (coming-soon) |
| Dirt | `/dirt` | `src/app/dirt/page.tsx`, `src/components/v1/dirt-carousel.tsx` | `dirt-carousel` | `demo/blocks/dirt/` or `components/spaceui/dirt-carousel` | hold | hold |
| Intermind | `/intermind` | `src/app/intermind/page.tsx`, `omnibox-interactive.tsx` | `intermind` template + `omnibox` component | `blocks/intermind`, maybe `components/ai/omnibox` | hold | hold |
| Mastermind | `/mastermind` | `src/app/mastermind/page.tsx` (~3k lines) + orb | `mastermind` | skip as a block; reuse **Orb** | skip (too messy; orb extracted) | skip |
| Intercom | `/intercom` | `src/app/intercom/page.tsx`, `intercom.module.css` | `product-tabs` block | `demo/blocks/product-tabs/` | hold | hold |

---

## Orb (`registry/components/orb/`)

Category index: `/ui-kit/components/orb`  
Each orb is its own page + `c-orb-<name>-1` demo.

| Source | Route | Files | Space UI name | Goes in | Import | Status |
| --- | --- | --- | --- | --- | --- | --- |
| Orb Shader | `/orb` | `src/components/ui/orb-shader.tsx` | **Smooth Orb** `components-orb-smooth` | `components/orb/smooth/` · docs `orb/smooth.mdx` · demo `demo/components/orb/smooth/c-orb-smooth-1/` | `import { OrbShader } from '@/components/orb/smooth'` | done |
| Orb Second | `/orb-second` | `src/components/ui/orb-second-shader.tsx`, `src/lib/bloop-colors.ts` | **Bloop Orb** `components-orb-bloop` | `components/orb/bloop/` · docs `orb/bloop.mdx` · demo `demo/components/orb/bloop/c-orb-bloop-1/` | `import { OrbSecondShader } from '@/components/orb/bloop'` | done |
| (future orbs) | — | — | `components-orb-<slug>` | `components/orb/<slug>/` · `orb/<slug>.mdx` · `demo/components/orb/<slug>/c-orb-<slug>-1/` | `@/components/orb/<slug>` | next |

---

## Shader (`registry/components/shader/`)

Category index: `/ui-kit/components/shader`

| Source | Route | Files | Space UI name | Goes in | Import | Status |
| --- | --- | --- | --- | --- | --- | --- |
| Cloud | `/cloud` | `src/components/ui/cloud.tsx`, `components/shader/cloud/next_{three_vanta,vanta,materials}.min.js` | **Cloud** `components-shader-cloud` | `components/shader/cloud/` · `shader/cloud.mdx` · demo `c-cloud-1` | `import { Cloud } from '@/components/shader/cloud'` | done |
| C JS / Paper | `/c-js` `/c-shader` | `src/components/CShaderComponent.tsx`, `src/app/c-js/page.tsx` | **Paper Shader** `components-shader-paper-shader` | `components/shader/paper-shader/` · `shader/paper-shader.mdx` · demo `c-paper-shader-1` | `import PaperShader from '@/components/shader/paper-shader'` | done |
| Work WebGL | `/work` layer | `src/app/work/work-webgl-layer.tsx` | **Work WebGL** | docs only `shader/work-webgl.mdx` (`status: coming-soon`) | — | done (coming-soon) |
| Liquid Metal | `/shader` | `src/app/shader/` + liquid metal bits | already **liquid-metal-*** in spaceui | `components/spaceui/liquid-metal-*` | `@/components/spaceui/liquid-metal-avatar` etc. | skip (exists) |
| Metal FX | `/metal-fx` | `src/components/ui/metal-fx*.tsx` | `metal-fx` | `components/shader/metal-fx/` · `shader/metal-fx.mdx` · `c-metal-fx-1` | `@/components/shader/metal-fx` | hold |
| Glossy Logo | `/` | home glossy shader | `glossy-logo` | `components/shader/glossy-logo/` | hold | hold |

**Cloud scripts:** `src/registry/components/shader/cloud/next_{three_vanta,vanta,materials}.min.js` — colocated with Cloud and loaded dynamically at runtime in the browser.

---

## Components (`registry/components/spaceui/`)

| Source | Route | Files | Space UI name | Goes in | Import | Status |
| --- | --- | --- | --- | --- | --- | --- |
| Autoscale Input | `/autoscale-input` | `src/components/ui/autoscale-input.tsx` (strip Leva) | **Autoscale Input** `components-spaceui-autoscale-input` | `components/spaceui/autoscale-input/` · `spaceui/autoscale-input.mdx` · `c-autoscale-input-1` | `import { AutoscaleInput } from '@/components/spaceui/autoscale-input'` | done |
| Tournament Bracket | `/tournament-bracket` | `src/components/ui/tournament-bracket.tsx` | **Tournament Bracket** `components-spaceui-tournament-bracket` | `components/spaceui/tournament-bracket/` · `c-tournament-bracket-1` | `import { TournamentBracket } from '@/components/spaceui/tournament-bracket'` | done |
| Dynamic Tab Menu | `/dynamic-tab-menu` | `src/components/ui/dynamic-tab-menu.tsx` | `dynamic-tabs` | `components/spaceui/dynamic-tabs/` | `@/components/spaceui/dynamic-tabs` | hold |
| Play Toggle | `/play-toggle` | play toggle component | `play-toggle` | `components/spaceui/play-toggle/` | hold | hold |
| Apple Play Button | `/apple-play-button` | apple play button | `apple-play-button` | `components/spaceui/apple-play-button/` | hold | hold |
| Theme Toggle Btn | `/skiper26` | `src/components/v1/skiper26.tsx` | `theme-toggle` | `components/spaceui/theme-toggle/` (site already has mode-switcher — merge or new) | hold | hold |
| Vanish Form | `/skiper56` `/vanish-form` | `src/components/ui/vanish-form.tsx` | `vanish-form` | `components/spaceui/vanish-form/` | hold | hold |
| Smooth Input | `/skiper106` | skiper106 caret input | `smooth-caret-input` | `components/spaceui/smooth-caret-input/` | hold | hold |
| Nextjs Gooey Menu | `/skiper46` | `src/components/ui/skiper46.tsx` | `gooey-menu` | `components/spaceui/gooey-menu/` | hold | hold |
| Physics | `/physics` | physics + `public/assets/next_physics.min.js` `next_matterjs_library.min.js` | `physics` | `components/spaceui/physics/` + public assets | hold | hold |
| Swap Widget | `/c2` | `src/components/ui/swap-widget.tsx` (minified, huge) | — | skip | skip | skip |
| Squircle | `ui/apple-squicircle` | — | already **Squircle** | `spaceui/squircle` | skip (exists) | skip |

---

## Animations / texts / motion

Likely `registry/components/texts/` or `components/spaceui/` + docs under a future **Animations** or **Texts** category.

| Source | Route | Files | Space UI name | Goes in | Import | Status |
| --- | --- | --- | --- | --- | --- | --- |
| Words Preloader | `/words-preloader` | preloader | `words-preloader` | `components/texts/words-preloader/` | hold | hold |
| Bouncy Accordion | `/bouncy-accordion` | accordion spring | `bouncy-accordion` | `components/spaceui/bouncy-accordion/` | hold | hold |
| Anime Scrollbar | `/anime-scrollbar` | scrollbar | `anime-scrollbar` | `components/spaceui/anime-scrollbar/` | hold | hold |
| Rolling Text | `/rolling-text` | rolling text | `rolling-text` | `components/texts/rolling-text/` | hold | hold |
| Scroll Journey Text | `/scroll-journey-text` | scroll typography | `scroll-journey-text` | `components/texts/scroll-journey/` | hold | hold |
| Infinite Canvas | `/infinite-canvas` | canvas pan/zoom | `infinite-canvas` | `components/spaceui/infinite-canvas/` | hold | hold |
| Things | `/things` | WebGL things | `things` | `components/shader/things/` or spaceui | hold | hold |
| Animated Timeline | `/animated-timeline` | timeline | already **Timeline** — compare before port | `spaceui/timeline` | skip / merge | hold |
| Project Showcase | `/project-showcase` | showcase grid | `project-showcase` | `demo/blocks/project-showcase/` | hold | hold |
| Scroll Progress | `/scroll-progress` | progress | `scroll-progress` | `components/spaceui/scroll-progress/` | hold | hold |
| Devouring Sign In | `/devouring-signin` | devouring auth | compare **blocks/sign-in** | `demo/blocks/sign-in/` | hold | hold |
| Hover Expand | `/skiper52` | `expand-on-hover.tsx` | `hover-expand` | `components/spaceui/hover-expand/` | hold | hold |
| Hover Expand Vertical | `/skiper53` | `expand-on-hover-vertical.tsx` | `hover-expand-vertical` | same family, second page or `c-*-2` | hold | hold |
| Gooey Effect | `/skiper64` | gooey filter | `gooey` | `components/effects/gooey/` | hold | hold |
| Gooey Tooltip | `/goey-tooltip` | gooey tooltip | `gooey-tooltip` | `components/spaceui/gooey-tooltip/` | hold | hold |
| We Design Scroll | `/skiper44` | `skiper44.tsx` | `designer-scroll` | `components/texts/designer-scroll/` | hold | hold |
| Scroll Clipping | `/skiper95` | `skiper95.tsx` | `scroll-clip` | `components/texts/scroll-clip/` | hold | hold |
| Bottom Sheet 2 | `/bottom-sheet-2` | sheet | compare **primitives/drawer** + **sheet** | maybe block demo | hold | hold |
| Pixel Text | — | `src/components/v1/pixel-text.tsx` | `pixel-text` | `components/texts/pixel-text/` | hold | hold |
| Pixel Distortion | — | `pixel-distortion-canvas.tsx` | `pixel-distortion` | `components/shader/pixel-distortion/` | hold | hold |
| Vercel Scroll Blur | `/design-engineers-scroll` | scroll blur | `scroll-blur` | `components/effects/scroll-blur/` | hold | hold |

---

## Medias / backgrounds

| Source | Route | Files | Space UI name | Goes in | Import | Status |
| --- | --- | --- | --- | --- | --- | --- |
| Image Accordion | `/image-accordion` | image accordion | `image-accordion` | `components/spaceui/image-accordion/` | hold | hold |
| Liquid Simulation | `/liquid-simulation` | vercel-like liquid | `liquid-simulation` | `components/shader/liquid-simulation/` | hold | hold |
| After Dark Tour | `/after-dark-tour` | media tour | `after-dark-tour` | block or media component | hold | hold |
| Ascii Simulation | `/ascii-simulation` | ASCII render | `ascii` | `components/shader/ascii/` | hold | hold |
| Bubble / Gradient | — | — | already **backgrounds/bubble**, **gradient** | `components/backgrounds/` | skip (exists) | skip |

---

## AI

| Source | Route | Files | Space UI name | Goes in | Import | Status |
| --- | --- | --- | --- | --- | --- | --- |
| AI Input 001–005 | `/skiper81–85` and `/ai-input-001–005` (duplicate routes) | `src/components/ui/skiper81.tsx` … `skiper85.tsx` | `ai-input` category `components/ai/` with `ai-input-1` … `ai-input-5` | `components/ai/<n>/` · docs `ai/` index + pages · demos `c-ai-input-1` | `@/components/ai/ai-input-1` | hold |
| Intermind Omnibox | `/intermind` | `omnibox-interactive.tsx` | `omnibox` | `components/ai/omnibox/` | hold | hold |

---

## Already in Space UI (do not re-port blindly)

| Dancepad | Space UI |
| --- | --- |
| Liquid Metal Avatar | `components/spaceui/liquid-metal-avatar` |
| Squircle | `components/spaceui/squircle` |
| Timeline | `components/spaceui/timeline` |
| Sign in (close to Devouring) | `demo/blocks/sign-in` |

---

## Naming rules (for the next ports)

1. **Category folder** = sidebar group we keep (`orb`, `shader`, `ai`, `spaceui`, `texts`, `backgrounds`, `blocks`).
2. **One component = one folder** under that category. Never dump several orbs in `components/orb/index.tsx`.
3. **Docs** mirror registry: `content/ui-kit/components/<category>/<slug>.mdx` + category `index.mdx` with related cards.
4. **Demos** = `demo/components/<category>/<slug>/c-<slug>-1/`.
5. **Registry name** = `components-<category>-<slug>` (e.g. `components-orb-smooth`).
6. **Import path** = `@/registry/components/<category>/<slug>` in this repo, `@/components/<category>/<slug>` after install.
7. **Tabler** icons, `cn` from `@/registry/lib/utils`, `motion/react` not `framer-motion`, no Leva on published components.

---

## Ported in this repo (checklist)

- [x] Smooth Orb
- [x] Bloop Orb
- [x] Cloud (+ public Vanta scripts)
- [x] Paper Shader
- [x] Work WebGL (docs coming-soon)
- [x] Autoscale Input
- [x] Tournament Bracket
- [ ] Everything else in the tables above = wait for confirmation
