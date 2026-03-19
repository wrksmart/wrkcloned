# wrksourcing.com — Next.js Rebuild

**Status:** Phase 1 prototype — homepage complete, deployable now
**Stack:** Next.js 14 · TypeScript · Inline styles + CSS (no Tailwind dependency)
**Deployment target:** Vercel (free tier, zero config)

---

## Deploy to Vercel in 3 steps

```bash
# 1. Push this folder to a GitHub repo (or fork from wrksourcing org)
git init
git add .
git commit -m "feat: wrksourcing.com Next.js rebuild v0.1"
git remote add origin https://github.com/wrksourcing/website-nextjs.git
git push -u origin main

# 2. Go to vercel.com → New Project → Import GitHub repo
# 3. Click Deploy — Vercel auto-detects Next.js, no config needed
```

Live URL appears in ~60 seconds. Add a custom domain (wrksourcing.com or portal.wrksourcing.com) in Vercel dashboard → Settings → Domains.

---

## Run locally

```bash
npm install
npm run dev
# → http://localhost:3000
```

---

## What's in the prototype

All sections from the current WordPress site, rebuilt as React components:

| Section | Enhancement vs WordPress |
|---------|--------------------------|
| Nav | Transparent → solid on scroll, sticky, mobile hamburger |
| Hero | Animated fade-in, stats row with staggered reveal, ambient glow pattern |
| Logo strip | Infinite auto-scroll marquee with fade edges and pause-on-hover |
| Why wrksourcing | 5 pillar cards with hover lift, staggered entrance |
| Services | Tab system (wrkflow / admin / marketing / sales) with feature list |
| Industries | 6-column grid, hover border accent |
| Testimonials | Auto-advancing carousel + interactive card grid |
| How It Wrks | 3-step cards with numbered reveal |
| Contact / CTA | Integrated form with success state (wire to Formspree/Resend for live email) |
| Footer | Social links, legal links, nav links |

**Additions that don't exist on the current site:**
- Stats bar (200K+ hours, 50+ clients, 40+ specialists, 95% retention)
- Scroll-triggered section animations (IntersectionObserver, no external library)
- Integrated contact form (not a popup redirect)
- Revenue range qualification field in the form
- Proper Open Graph / Twitter card metadata in layout.tsx

---

## Phase roadmap

| Phase | Scope | Sessions |
|-------|-------|----------|
| Phase 1 (done) | Homepage rebuild | 1 Claude Code session |
| Phase 2 | Remaining pages: /services, /how-it-wrks, /about, /contact | 1–2 sessions |
| Phase 3 | Keystatic CMS — browser-based editor for Teresa to manage content without touching code | 1 session |
| Phase 4 | MDX blog, Airtable-connected pricing, Google Analytics | 1 session |

---

## Wire up the contact form (5 min)

The form currently calls `handleSubmit` and shows a success state. To send actual emails:

```bash
# Option A: Formspree (free tier, no backend needed)
# 1. Create account at formspree.io
# 2. Replace handleSubmit in app/page.tsx:

async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault()
  const data = new FormData(e.currentTarget)
  await fetch('https://formspree.io/f/YOUR_FORM_ID', {
    method: 'POST', body: data, headers: { Accept: 'application/json' },
  })
  setFormSent(true)
}
```

```bash
# Option B: Resend (DJ already has this in the stack)
# Add a Next.js API route at app/api/contact/route.ts
# Use the Resend SDK to send from dj@wrksourcing.com
```

---

## Add Keystatic CMS (Phase 3)

Keystatic gives Tyler/Teresa a browser editor at `/keystatic` — no code required to update content.

```bash
npm install @keystatic/core @keystatic/next
```

Configure `keystatic.config.ts` to manage: hero copy, pillar text, service descriptions, testimonials, client logos. All content stored as JSON files in the repo. Save → commit → Vercel auto-deploys in ~45 seconds.

---

## File structure

```
wrk-website-nextjs/
├── app/
│   ├── layout.tsx      # Root layout, metadata, font import
│   ├── globals.css     # Brand tokens, animations, responsive breakpoints
│   └── page.tsx        # Full homepage (all sections)
├── package.json
├── next.config.ts
├── tsconfig.json
└── README.md
```

---

*Built with Claude Code · March 2026 · wrksourcing Inc.*
