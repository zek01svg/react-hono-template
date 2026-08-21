---
version: alpha
name: Plain Text
description: >-
  Monochrome, terminal-inspired minimalism for a developer starter template.
  Typography carries the identity; chrome disappears.
colors:
  primary: "#0f1112"
  on-primary: "#f9fafb"
  secondary: "#686b6e"
  neutral: "#fafbfc"
  surface: "#ffffff"
  overlay: "#eeeff1"
  border: "#dee0e2"
  neutral-dark: "#0c0d0e"
  primary-dark: "#e3e5e6"
  on-primary-dark: "#111314"
  secondary-dark: "#96989b"
  border-dark: rgba(255, 255, 255, 0.12)
typography:
  display:
    fontFamily: ui-monospace, SF Mono, Menlo, Consolas, monospace
    fontSize: 48px
    fontWeight: 600
    lineHeight: 1.05
    letterSpacing: -0.02em
  label-caps:
    fontFamily: ui-monospace, SF Mono, Menlo, Consolas, monospace
    fontSize: 12px
    fontWeight: 400
    lineHeight: 1
    letterSpacing: 0.2em
  label-md:
    fontFamily: Inter Variable, ui-sans-serif, system-ui, sans-serif
    fontSize: 14px
    fontWeight: 500
    lineHeight: 1.4
  body-lg:
    fontFamily: Inter Variable, ui-sans-serif, system-ui, sans-serif
    fontSize: 18px
    fontWeight: 400
    lineHeight: 1.625
  body-md:
    fontFamily: Inter Variable, ui-sans-serif, system-ui, sans-serif
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.5
rounded:
  sm: 2px
  md: 4px
  lg: 6px
  xl: 8px
  full: 9999px
spacing:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 32px
  xl: 64px
  margin: 24px
  margin-wide: 40px
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.label-md}"
    rounded: "{rounded.md}"
    padding: 16px
    height: 36px
  button-primary-hover:
    backgroundColor: color-mix(in srgb, {colors.primary} 90%, transparent)
  button-primary-dark:
    backgroundColor: "{colors.primary-dark}"
    textColor: "{colors.on-primary-dark}"
    typography: "{typography.label-md}"
    rounded: "{rounded.md}"
    padding: 16px
    height: 36px
  button-ghost:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.primary}"
    rounded: "{rounded.md}"
    size: 32px
  button-ghost-hover:
    backgroundColor: "{colors.overlay}"
  button-ghost-dark:
    backgroundColor: "{colors.neutral-dark}"
    textColor: "{colors.primary-dark}"
    rounded: "{rounded.md}"
    size: 32px
  input-field:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.primary}"
    typography: "{typography.body-md}"
    rounded: "{rounded.md}"
    height: 36px
  input-field-dark:
    backgroundColor: "{colors.neutral-dark}"
    textColor: "{colors.primary-dark}"
    typography: "{typography.body-md}"
    rounded: "{rounded.md}"
    height: 36px
  text-muted:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.secondary}"
    typography: "{typography.body-lg}"
  text-muted-dark:
    backgroundColor: "{colors.neutral-dark}"
    textColor: "{colors.secondary-dark}"
    typography: "{typography.body-lg}"
  divider:
    backgroundColor: "{colors.border}"
    height: 1px
  divider-dark:
    backgroundColor: "{colors.border-dark}"
    height: 1px
  card:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.lg}"
  page:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.primary}"
  page-dark:
    backgroundColor: "{colors.neutral-dark}"
    textColor: "{colors.primary-dark}"
---

# Plain Text

## Overview

Plain Text is the visual identity of this starter template: the aesthetic of a
well-formatted README or man page. It is deliberately monochrome — ink on paper,
no accent hue anywhere. Monospace type signals "developer tool" and does the
expressive work; everything else is quiet, sharp-edged, and spacious. The
emotional register is calm confidence: boring in the good sense, meaning reliable
infrastructure that stays out of the way.

The audience is developers evaluating or cloning the template. Pages should feel
like precision instruments: fast, legible, free of decoration.

## Colors

A single achromatic ramp with a faint cool cast (OKLCH hue ~250, chroma ≤ 0.008).
No accent color exists by design; hierarchy comes from luminance alone.

Light theme:

- **Primary (`#0f1112`):** Ink. Headlines, body text, solid buttons, icons.
- **On-primary (`#f9fafb`):** Paper-on-ink for text inside solid buttons.
- **Secondary (`#686b6e`):** Slate gray for muted copy, eyebrows, metadata.
- **Neutral (`#fafbfc`):** Page background, barely off-white.
- **Surface (`#ffffff`):** Raised containers such as cards and popovers.
- **Overlay (`#eeeff1`):** Hover washes on ghost controls.
- **Border (`#dee0e2`):** Hairline rules and input outlines.

Dark theme mirrors the same roles inverted:

- **Neutral-dark (`#0c0d0e`) / Primary-dark (`#e3e5e6`):** Page and ink swap.
- **Secondary-dark (`#96989b`)** for muted content,
  **Border-dark (`rgba(255,255,255,0.12)`)** for hairlines.

## Typography

Two voices, both already shipped by the runtime — zero webfonts beyond
Inter Variable:

- **Display:** System monospace stack, SemiBold, tightly tracked (-0.02em).
  Used for headlines and the wordmark. Headlines may scale fluidly between
  ~44px and 80px by viewport; 48px is the canonical desktop size.
- **Labels:** Same mono at 12px with wide tracking (0.2em), strictly uppercase.
  Eyebrows and footer lines only — never buttons.
- **Body & UI:** Inter Variable Regular at 16–18px for reading; Medium 14px for
  button labels. Sentence case everywhere except label-caps.

Never mix a third family into the system.

## Layout

Single-column composition. Each page is a full-height flex column
(`min-h-dvh`): slim header band, flexible center block, slim footer band.
Content lives in a centered measure capped at 768px; header and footer span
full width with 24px horizontal padding (40px from the `sm` breakpoint up).
Vertical rhythm follows the 4px scale; pages breathe through empty space rather
than rules — one hairline above the footer is the only structural line on the
landing page.

## Elevation & Depth

Flat. Depth is conveyed by tonal contrast (ink on paper, raised white surfaces),
never by shadow stacking. Inputs and solid buttons may carry Tailwind's
subtlest `shadow-xs`; anything heavier is off-brand.

## Shapes

Architectural sharpness. The base corner radius is **4px**, with a 2px step down
for small controls and 6–8px for large containers. Corners exist so edges read
as finished, not soft — if a radius starts feeling "friendly", it is too big.
Pills (`9999px`) are reserved for status badges.

## Components

- **Buttons:** One solid style (ink fill, paper text), one ghost style
  (transparent, ink text, hover wash `#eeeff1`). Height 36px, radius md,
  16px horizontal padding. Dark theme swaps the ramp, not the geometry.
- **Inputs:** Transparent fill, hairline border, 36px height, radius md;
  focus is expressed by ring, never color change.
- **Cards:** Pure-white surface, radius lg, hairline border where separation
  from the page is needed.
- **Page:** Neutral background, ink foreground; identical structure in dark
  mode with the inverted ramp.
- **Muted text:** Secondary slate for supporting copy; same roles in dark mode.
- **Dividers:** 1px hairlines in `#dee0e2` (light) / `rgba(255,255,255,0.12)`
  (dark); used sparingly — one above the footer at most.

## Do's and Don'ts

- Do keep every screen monochrome; states are expressed with opacity and tone.
- Do set all display type and eyebrow labels in the monospace voice.
- Don't introduce an accent hue — extend this file first if one is ever needed.
- Do honor `prefers-reduced-motion`; the terminal-cursor blink is the only
  animation in the product and must freeze to a static block.
- Don't exceed two font weights on a single screen.
- Do maintain WCAG AA contrast (4.5:1) for all text pairs, both themes.
