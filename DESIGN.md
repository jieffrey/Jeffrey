# DESIGN — "The Line"

Design system for jeffreystudios. The tokens live in the `@theme` block of
`app/globals.css`; this file explains them. The visual and motion source of
truth is the prototype at `docs/design/the-line.html`.

Rule: every color, font and easing goes through a token. No hex values in
components.

## Color

| Token | Value | Tailwind | Use |
|---|---|---|---|
| paper | `#F3EFE6` | `bg-paper` | main background |
| paper-2 | `#ECE6D9` | `bg-paper-2` | alt section background |
| ink | `#161513` | `text-ink` | text, dark surfaces |
| muted | `#5C574E` | `text-muted` | secondary text |
| rope | `#8C8270` | `bg-rope` | clothesline |
| lime | `#C8F03C` | `bg-lime` | primary accent |
| pink | `#FF8FC7` | `bg-pink` | sticker accent |
| blue | `#3D5AFE` | `bg-blue` | sticker accent, grid overlay, focus ring |
| orange | `#FF7A2F` | `bg-orange` | sticker accent |
| teal | `#2FD3B5` | `bg-teal` | sticker accent |
| yellow | `#FFD43B` | `bg-yellow` | sticker accent |
| night | `#0E0E10` | `bg-night` | dashboard background |
| card | `#17171A` | `bg-card` | dashboard tiles |
| edge | `#26262B` | `border-edge` | dashboard borders |
| dim | `#9B9BA3` | `text-dim` | dashboard secondary text |
| violet | `#7C6CF6` | `text-violet` | chart color |
| violet-2 | `#B9AFFF` | `text-violet-2` | chart color, light |

Heatmap scale, low to high: `heat-0 #24242A`, `heat-1 #3A3470`,
`heat-2 #5A4FC0`, `heat-3 #7C6CF6`, `heat-4 #B9AFFF`.

### Theme

Light is the primary design. Dark is "lights off" (`.dark` on `<html>`, set by
next-themes): the surface and text tokens swap, accents stay.

| Token | Light | Dark |
|---|---|---|
| paper | `#F3EFE6` | `#121110` |
| paper-2 | `#ECE6D9` | `#1A1917` |
| ink | `#161513` | `#F3EFE6` |
| muted | `#5C574E` | `#A8A294` |
| rope | `#8C8270` | `#6E6656` |

Two extra tokens never swap: `paper-static` and `ink-static`. Use them where a
surface must stay the same in both themes (the loader, text on lime, text
inside the always-dark Now section).

The Now section is always dark in both themes and uses `night`, `card`,
`edge`, `dim`, `violet`.

## Type

Loaded with `next/font/google` in `lib/fonts.ts`.

| Role | Family | Tailwind | Use |
|---|---|---|---|
| Display | Bricolage Grotesque 400 / 600 / 800 | `font-display` | headings and body. Headings: `font-extrabold tracking-display` (-0.045em) |
| Accent | Instrument Serif italic | `font-serif italic` | one emphasized word per heading only |
| Mono | JetBrains Mono 400 / 500 | `font-mono` | eyebrows, HUD chips, captions, numbers |

Utilities: `eyebrow` (mono 11px, uppercase, 0.08em) and `hud-chip` (the pill
used by every HUD control).

## Grid systems

Each section commits to one named grid and shows it in its eyebrow, e.g.
`02 — NOW · MODULAR GRID · 12 COLS × 88PX MODULES`. Grid labels are translated
(`<section>.grid` in `messages/*.json`).

| # | Section | Grid | Spec |
|---|---|---|---|
| 01 | The Line | Spatial / 3D | CSS 3D clothesline |
| 02 | Now | Modular | 12 cols, `grid-auto-rows: 88px`, gap 16 |
| 03 | Work | Hierarchical | 12 cols: 1 primary (cols 1–7, 2 rows) + 2 secondary (cols 8–12) |
| 04 | About | Baseline + Column | 8pt baseline, 12 cols, statement cols 1–9, notes cols 10–12 |
| 05 | Stack | Radial | 3 rings (22% / 35% / 48%) + 30° spokes |
| 06 | Cabinet | Diagonal | items along a 30° axis |
| 07 | Contact | Axial | everything centered on one vertical axis |

## Motion

- GSAP (`lib/gsap.ts`, always through `useGSAP`) for scroll choreography,
  the loader, the cursor and magnetic chips.
- Motion (`motion/react`) for component-level hover, layout and presence.
- Never both on the same element.
- Lenis runs at the root (`SmoothScroll.tsx`), driven by `gsap.ticker` and
  synced to ScrollTrigger.
- Animate only `transform`, `opacity`, `clip-path`.
- Easings: `ease-expo-out`, `ease-expo-in-out` in CSS; `expo.out`,
  `expo.inOut`, `elastic.out(1, 0.35)` in GSAP.
- `prefers-reduced-motion`: no loader, no Lenis, no magnetic pull. All content
  is visible immediately.

## Layers

| z-index | Layer |
|---|---|
| 110 | skip link |
| 100 | loader |
| 90 | custom cursor |
| 50 | HUD and progress bar |
