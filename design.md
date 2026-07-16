# Design — Alex Kociubinski

A locked design system for this site. Every page redesign reads this file before
emitting code. Do not regenerate per page — extend or amend this file when the
system needs to grow.

Extracted via `hallmark study https://www.johnathanmo.com/` (DNA: Long Document
macrostructure, H1 Marquee hero, no fixed nav chrome, Ft5 statement closer,
near-black neutral paper, neutral ink-on-paper accent, neutral-grotesque + mono
labels). One deliberate drift from the source: the accent is **Mizzou gold**
instead of pure neutral, to carry the owner's brand. Everything else follows the
studied DNA.

## Genre
modern-minimal (developer-portfolio register: Geist, dark, restrained, hairline
rules, typographic-link CTAs).

## Macrostructure family
Long Document for every page — single column, prose-led, hairline-rule section
dividers, typographic-link CTAs (no big buttons). Pages vary only in component
archetypes.

- Landing page: Long Document with an H1 Marquee hero (conversational greeting +
  small inline headshot), prose About with inline links + monospace skills tags,
  an inline 2-column projects grid, and an Ft5 statement closer.
- Project detail pages: Long Document case studies with inline `<figure>` blocks
  (diagram, screenshot carousel, video). The spaceship-battle page keeps its
  interactive terminal block; only the chrome tokens change, the game logic is
  untouched.

## Theme (studied-DNA + Mizzou brand accent)
- `--color-bg`        oklch(15% 0.005 75)   /* paper — near-black, warm-neutral */
- `--color-surface`   oklch(19% 0.006 75)   /* paper-2 — elevated surface */
- `--color-border`    oklch(28% 0.006 75)   /* rule — hairline dividers/borders */
- `--color-text`       oklch(93% 0.004 75)   /* ink — primary text */
- `--color-muted`      oklch(66% 0.008 75)   /* ink-2 — secondary text */
- `--color-accent`     oklch(83% 0.14 85)    /* Mizzou gold — links/hover/active/focus */
- `--color-accent-ink` oklch(18% 0.01 75)    /* text on a gold fill, if ever used */
- `--color-focus`      oklch(83% 0.14 85)    /* focus ring */

Accent discipline: ≤ 5 % of any viewport. Links, hover, active nav, focus ring,
small ◆ bullets, one tiny nav dot. No gradients, no gold floods, no gold buttons.

## Typography
- Display: Geist 700, letter-spacing -0.02em, roman (never italic). Reused from
  `next/font` `--font-geist-sans`.
- Body: Geist 400, line-height 1.6, measure ≤ 65ch.
- Mono (labels / tech tags / years): Geist Mono 500, `font-variant-numeric:
  tabular-nums`. Reused from `--font-geist-mono`.
- Two families total (Geist + Geist Mono). Mono is the outlier register.
- Scale: major third (1.25). Display anchor `--text-display:
  clamp(2.5rem, 5vw + 0.5rem, 4rem)`. Hero headline ≤ 50 chars → display size.

## Spacing
4-pt named scale. Pages use named tokens (`var(--space-md)` etc.) or Tailwind
spacing utilities; never raw px for layout.

## Motion
- Easings: `--ease-out: cubic-bezier(0.16, 1, 0.3, 1)`.
- Reveal: ONE orchestrated entrance on first load (hero fade-up). After that,
  content is just there — no universal scroll fade.
- Hover: color / border-color shift only. Never `transform: scale` on cards.
  Image zoom inside a card is allowed (the image, not the card).
- Reduced-motion: opacity-only, ≤ 150 ms.
- Focus ring appears instantly (never animated in).

## Microinteractions stance
- Silent success (no celebratory toasts).
- Link hover: color → accent over `--dur-short`, underline thickens.
- `:focus-visible`: 2px gold ring, instant, ≥ 3:1 contrast.

## CTA voice
- Primary CTA: typographic text link with `→` (Long Document voice). No filled
  buttons. Resume, "Explore Project", social links are all inline text links.
- Hover: text → accent, underline appears.

## Nav / footer
- Nav: N9 edge-aligned minimal — slim sticky bar, name left (ink, optional tiny
  gold dot), 3 anchor links right (About / Projects / Contact). Anchor links
  smooth-scroll; active section highlighted via IntersectionObserver.
- Footer: Ft5 statement — a closing line + inline contact links, hairline rule
  above. No 4-column link grid, no social-icon row + copyright tail.

## What pages MUST share
- The wordmark "Alex Kociubinski".
- The gold accent and its placement (≤ 5 %).
- Geist + Geist Mono.
- The typographic-link CTA voice.
- Hairline-rule section dividers + stacked single-column section heads.

## What pages MAY differ on
- Hero archetype within the family (landing = H1 Marquee; project pages = case
  study lede).
- Inline media blocks per project (diagram / carousel / video / terminal).

## Per-page allowances
- Landing + project pages: typography only. No enrichment tiers (the project
  screenshots / video / terminal are real content, not decorative enrichment).

## Exports
See `app/globals.css` `@theme` for the live Tailwind v4 token block (the source
of truth the pages consume). The values above mirror it 1:1.

## Provenance
DNA extracted from `https://www.johnathanmo.com/` as a public reference for the
owner's personal site on 2026-07-15. The DNA is structural (macrostructure +
archetype tuple + type-pairing role + colour-anchor band); the dress is the
owner's (Mizzou gold accent, Geist). Rhythm is unknown from URL mode — adjusted
by eye toward the reference's airy-but-dense feel.