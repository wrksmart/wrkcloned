# Claude Code Quick-Start Guide — Jen

Welcome to the wrksourcing.com website project. This guide walks you through everything you need to get started with Claude Code on your Mac.

## 1. Install Claude Code

Download the Mac desktop app from: https://claude.ai/download

Sign in with the wrksourcing account credentials (ask DJ if you need them).

## 2. Open the Project

1. Open Claude Code
2. Go to **File > Open Folder**
3. Navigate to: `Desktop/wrk-cc/builds/wrk-website-nextjs`
4. Select the folder

Claude Code will automatically read the design system and brand rules from the project files. You don't need to explain wrksourcing's colors, fonts, or layout rules every time.

## 3. See the Live Site While You Work

Before making changes, start the dev server so you can preview in your browser:

1. In Claude Code, type: `run the dev server`
2. Claude will start it for you
3. Open your browser to **http://localhost:3000**
4. Every change Claude makes will show up in your browser automatically

## 4. The Figma-to-Code Workflow

This is your main workflow. No coding required.

### Step 1: Export from Figma
- Select the frame or section you want to implement
- Export as **PNG** (1x is fine, 2x if you want detail)

### Step 2: Drag into Claude Code
- Drag the PNG file directly into the Claude Code chat window
- Or click the attachment icon and select the file

### Step 3: Describe What You Want
Write in plain language. Be specific about which section of the site you're targeting. Examples:

> "Update the hero section to match this Figma design. Keep the same animation but use the new layout."

> "This is my design for the About page. Create it as a new page at /about. Use the same card style as the services section on the homepage."

> "Replace the footer with this updated version. Keep the same links."

### Step 4: Review the Changes
- Claude will show you what it wants to change as a **diff** (old vs new)
- Click **Accept** to apply or **Reject** to try again
- Check your browser at localhost:3000 to see the result
- If something looks off, just tell Claude: "the spacing is too tight" or "make the heading bigger"

## 5. Design Commands

These are shortcuts that check and improve design quality. Type them in the chat:

| Command | What It Does |
|---------|-------------|
| `/audit` | Checks accessibility, performance, responsive issues |
| `/critique` | UX design review with specific suggestions |
| `/normalize` | Aligns everything to the design system (colors, spacing, fonts) |
| `/polish` | Final cleanup pass before shipping |
| `/typeset` | Fixes font sizes, line heights, letter spacing |
| `/arrange` | Fixes layout and spacing issues |
| `/animate` | Adds or improves animations |

You can target a specific section:
> `/audit hero section`
> `/polish pricing page`

Or combine them:
> `/audit /normalize /polish homepage`

## 6. What's Already Built

| Page | URL | Status |
|------|-----|--------|
| Homepage | localhost:3000/ | Done, ~780 lines |
| Pricing | localhost:3000/pricing | Done, 3 tiers + FAQ |
| About | /about | Not started |
| Blog | /blog | Not started |

### Homepage Sections (in order)
1. Navigation bar
2. Hero with rotating words animation
3. Client logos strip
4. Stats counter (200K+ hours, 85+ clients, etc.)
5. Four pillars (Audit, Build, Deploy, Optimize)
6. Services grid
7. How It Wrks (3-step process)
8. Testimonials
9. Contact form (UI only, not connected yet)
10. Footer

## 7. Brand Rules (Already Loaded)

You don't need to remember these. Claude Code knows them. But for reference:

- **Background:** #f7f8f9 (light gray)
- **Text:** #1d1d1d (near black)
- **Accent gradient:** #76d669 to #DDEA7F (mantis green to yellow-green)
- **Dark sections:** #253530 (forest green)
- **Font:** Avenir (Heavy for headers, Book for body). Currently falling back to Plus Jakarta Sans until we load the Avenir files.
- **Layout:** Max-width 1200px, centered, 2rem padding
- **Breakpoints:** 900px (tablet), 600px (mobile)
- Always lowercase "wrksourcing"
- Always "wrk Specialists" (never just "specialists")

## 8. Example Prompts to Try

**Updating an existing section:**
> "Make the services section cards taller and add more padding between them"

**Creating a new page:**
> "Create an About page at /about with three sections: our story, the team, and our values. Use the same dark section style as the How It Wrks section."

**Fixing responsive issues:**
> "The hero section text overlaps on mobile. Fix the responsive layout for screens under 600px."

**Working from a screenshot:**
> [drag in PNG] "This is how I want the footer to look. Update it to match."

**Checking your work:**
> "/audit /critique the about page"

## 9. Tips

- **Be specific.** "Make it look better" is vague. "Increase the heading size to 48px and add 20px more space below it" gets better results.
- **Reference existing patterns.** "Use the same card style as..." helps Claude stay consistent.
- **One section at a time.** Don't try to redesign the whole page in one message. Work section by section.
- **Check mobile.** After changes, resize your browser to 375px wide to check mobile layout.
- **Ask Claude to explain.** If you don't understand a change, ask "what did you change and why?"

## 10. Getting Help

- Ask Claude Code anything: "what pages exist?", "show me the color variables", "where is the footer code?"
- If something breaks, tell Claude: "the site is broken, fix it"
- If you need DJ, message on Google Chat

## File Structure (For Reference)

You don't need to navigate these directly. Claude Code handles it. But if you're curious:

```
wrk-website-nextjs/
  app/
    page.tsx          -- Homepage
    layout.tsx        -- Shared layout (metadata, fonts)
    globals.css       -- All design tokens and base styles
    pricing/
      page.tsx        -- Pricing page
    components/
      footer.tsx      -- Footer used on all pages
      glowing-card.tsx -- Animated card component
      pixel-trail.tsx  -- Mouse trail effect
  public/
    images/           -- Logos and illustrations
  .impeccable.md      -- Full design system (Claude reads this automatically)
  CLAUDE.md           -- Project rules (Claude reads this automatically)
```
