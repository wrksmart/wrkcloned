# CLAUDE.md — wrksourcing.com Website

## Project Overview
Next.js 14 website for wrksourcing.com. Vibecoded by DJ, being handed over to Jennifer (designer) for Figma-based design implementation.

## Design System
Full design context is in `.impeccable.md` at project root. Read it before making any visual changes.

**Quick reference:**
- Background: #f7f8f9 | Text: #1d1d1d | Gradient: #76d669 → #DDEA7F | Dark: #253530
- Font: Avenir (Heavy headers, Book body) | Fallback: Plus Jakarta Sans
- Layout: max-width 1200px, 2rem padding, breakpoints 900px/600px
- Animation: Framer Motion, scroll reveals (once: true), no bounce easing
- Styling: CSS variables + inline styles (NO Tailwind)

## Brand Rules
- Always lowercase "wrksourcing" (never "WrkSourcing" or "Wrksourcing")
- Specialists are always "wrk Specialists" (never just "specialists")
- One accent gradient, used with discipline. No color scatter
- Professional warmth, never casual or playful
- No stock photos, no corporate blue, no purple gradients

## File Map
- `app/page.tsx` — Homepage (~780 lines, all sections)
- `app/pricing/page.tsx` — Pricing page (3 tiers + FAQ)
- `app/globals.css` — Design tokens, animations, responsive styles
- `app/components/footer.tsx` — Shared footer
- `app/components/glowing-card.tsx` — Animated star grid cards
- `app/components/pixel-trail.tsx` — Mouse-following pixel effect
- `public/images/` — Logos, illustrations

## For Jennifer (Designer)
You can use Figma screenshots with Claude Code. Export your frame as PNG, drag it into the terminal, and describe what you want. Reference existing patterns: "use the same card style as services section."

## Impeccable Design Skills
20 design commands are installed. Key ones:
- `/teach-impeccable` — Re-scan design context (run if you change the design system)
- `/audit [section]` — Quality check (accessibility, performance, responsive)
- `/critique [section]` — UX design review
- `/normalize [section]` — Align to design system
- `/polish [section]` — Final pass before shipping
- `/delight [section]` — Add moments of joy
- `/animate [section]` — Add purposeful motion
- `/typeset [section]` — Fix typography issues
- `/arrange [section]` — Fix layout and spacing

Combine them: `/audit /normalize /polish homepage`
