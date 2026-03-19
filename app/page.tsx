'use client'

import { useState, useEffect, useRef, useCallback } from 'react'

// ─────────────────────────────────────────────
// BRAND TOKENS
// ─────────────────────────────────────────────
const B = {
  dark: '#253530',
  accent: '#deea88',
  bg: '#f7f8f9',
  white: '#ffffff',
  text: '#1d1d1d',
  muted: '#666666',
  darkMuted: 'rgba(255,255,255,0.55)',
}

// ─────────────────────────────────────────────
// CONTENT DATA
// ─────────────────────────────────────────────
const NAV = [
  { label: 'Services & Pricing', href: '#services' },
  { label: 'How It Wrks', href: '#how-it-wrks' },
  { label: 'About Us', href: '#about' },
]

const CLIENT_LOGOS = [
  'BluRoot', 'Hive Growth', 'Pilot Solutions', 'Consilium Wealth',
  'National Wireless', 'Practice Perfect', 'Open Doors Mortgage',
  'MSP Saber', 'FP Fitness',
]

const STATS = [
  { value: '200K+', label: 'hours delivered' },
  { value: '50+',   label: 'active clients' },
  { value: '40+',   label: 'wrk Specialists' },
  { value: '95%',   label: 'client retention' },
]

const PILLARS = [
  {
    icon: '⚙️', title: 'Process',
    desc: 'We audit before we hire. Every engagement starts with understanding your workflows — not filling a seat.',
  },
  {
    icon: '🎯', title: 'Personalization',
    desc: 'No cookie-cutter placements. Every specialist is matched to the specific skills and timezone your operation needs.',
  },
  {
    icon: '👥', title: 'People',
    desc: 'Trained, retained, and continuously developed wrk Specialists — not a rotating cast of freelancers.',
  },
  {
    icon: '🔧', title: 'Platforms',
    desc: 'Zoho CRM, Notion, n8n, Clockify. We build around the tools that actually run your business.',
  },
  {
    icon: '🤝', title: 'Partners',
    desc: 'Strategic relationships that expand what wrksourcing can deliver — from mortgage platforms to legal tech.',
  },
]

const SERVICES = {
  wrkflow: {
    tab: 'wrkflow Solutions',
    headline: 'Your ops, systematized.',
    body: 'We design and implement your Zoho CRM, automate your workflows, and build the Notion OS that ties it all together. One-time builds and ongoing optimization sprints.',
    features: [
      'Zoho CRM implementation and configuration',
      'Process mapping and workflow automation (n8n)',
      'Notion workspace build — 67-file system',
      'Ongoing optimization sprints',
    ],
  },
  admin: {
    tab: 'Admin & Ops',
    headline: 'Execution without the overhead.',
    body: 'Trained wrk Specialists handle inbox management, scheduling, research, data entry, reporting, and operations support — across North American hours.',
    features: [
      'Inbox and calendar management',
      'Research, reporting, data entry',
      'CRM hygiene and maintenance',
      'Operations coordination',
    ],
  },
  marketing: {
    tab: 'Marketing',
    headline: 'Content that compounds.',
    body: 'A full content engine: blogs, newsletters, LinkedIn, email campaigns, and social media — built to run consistently without pulling you into it.',
    features: [
      'Blog and newsletter production',
      'LinkedIn and social media management',
      'Email campaign setup and execution',
      'SEO and content strategy',
    ],
  },
  sales: {
    tab: 'Sales Support',
    headline: 'Pipeline activity, delegated.',
    body: 'BDR-level outreach, lead list building, CRM hygiene, and follow-up sequences. Your team closes. We handle the volume.',
    features: [
      'BDR outreach programs ($950–$3K/mo)',
      'Lead list research and enrichment',
      'CRM data management',
      'Follow-up sequence execution',
    ],
  },
} as const

type ServiceKey = keyof typeof SERVICES

const INDUSTRIES = [
  { icon: '🏦', title: 'Mortgage & Finance' },
  { icon: '⚖️', title: 'Legal' },
  { icon: '💊', title: 'Health & Wellness' },
  { icon: '💼', title: 'Professional Services' },
  { icon: '💻', title: 'Tech & SaaS' },
  { icon: '🛒', title: 'E-commerce & DTC' },
]

const TESTIMONIALS = [
  { name: 'Mike Stroh',        company: 'Starts w/ Me',        rating: 5, text: 'wrksourcing has been a game changer for our business. The level of professionalism and quality of work exceeded our expectations from day one.' },
  { name: 'Tom Hall',          company: 'BluRoot',              rating: 5, text: "The team at wrksourcing truly understands what it means to deliver results. They've become an essential part of our operations." },
  { name: 'Mathew Glowacki',   company: 'MPG Law',              rating: 5, text: 'Exceptional support, reliable specialists, and a team that genuinely cares about our success. Highly recommend.' },
  { name: 'Andrew Thurston',   company: 'BeSpoke',              rating: 5, text: "We've tried other VA services before. wrksourcing is different — the systems, the training, the consistency. Night and day." },
  { name: 'Mike Antico',       company: 'Green Link',           rating: 5, text: "From onboarding to day-to-day delivery, wrksourcing has been a true partner. Our specialist feels like part of our team." },
  { name: 'Stephanie van Dam', company: 'Sandler',              rating: 5, text: 'Professional, responsive, and results-oriented. wrksourcing has helped us scale without the headaches of traditional hiring.' },
]

const STEPS = [
  { n: '01', title: 'Book a discovery call',      desc: 'We learn your business, your gaps, and what good looks like for you. No pitch deck, no pressure.' },
  { n: '02', title: 'We match you',               desc: "Based on your workflow audit, we identify the right specialist skills, timezone fit, and engagement structure." },
  { n: '03', title: 'Your new wrkflow begins',    desc: 'Your specialist onboards through our 90-day wIP program. Systems first, then execution.' },
]

// ─────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────
function Stars({ n }: { n: number }) {
  return (
    <span style={{ display: 'flex', gap: 2 }}>
      {Array.from({ length: n }).map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 20 20" fill={B.accent}>
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </span>
  )
}

function useVisible(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect() } },
      { threshold }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return { ref, visible }
}

// ─────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────
export default function Home() {
  const [scrolled, setScrolled]         = useState(false)
  const [menuOpen, setMenuOpen]         = useState(false)
  const [activeService, setService]     = useState<ServiceKey>('wrkflow')
  const [tIdx, setTIdx]                 = useState(0)
  const [formSent, setFormSent]         = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => {
    const id = setInterval(() => setTIdx(i => (i + 1) % TESTIMONIALS.length), 5500)
    return () => clearInterval(id)
  }, [])

  const hero       = useVisible(0.05)
  const stats      = useVisible(0.2)
  const pillars    = useVisible(0.1)
  const services   = useVisible(0.1)
  const industries = useVisible(0.1)
  const tSection   = useVisible(0.1)
  const steps      = useVisible(0.1)
  const cta        = useVisible(0.15)

  const svc = SERVICES[activeService]

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    // Wire to Formspree or Resend in Phase 2
    setFormSent(true)
  }

  return (
    <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: B.text, overflowX: 'hidden' }}>

      {/* ═══════════════════════════════ NAV ═══════════════════════════════ */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        transition: 'background-color 0.35s, box-shadow 0.35s',
        backgroundColor: scrolled ? B.dark : 'transparent',
        boxShadow: scrolled ? '0 2px 24px rgba(0,0,0,0.18)' : 'none',
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 72 }}>
          <a href="/" style={{ textDecoration: 'none' }}>
            <span style={{ fontSize: '1.45rem', fontWeight: 900, color: B.accent, letterSpacing: '-0.03em' }}>wrksourcing</span>
          </a>

          {/* Desktop */}
          <div className="nav-desktop">
            {NAV.map(l => <a key={l.href} className="nav-link" href={l.href}>{l.label}</a>)}
            <a className="btn-primary" href="#contact" style={{ fontSize: '0.82rem', padding: '0.6rem 1.35rem' }}>
              BOOK A FREE CALL
            </a>
          </div>

          {/* Mobile toggle */}
          <button className="nav-mobile-btn" onClick={() => setMenuOpen(o => !o)} aria-label="Menu">
            <svg width="24" height="24" fill="none" stroke={B.accent} strokeWidth="2" viewBox="0 0 24 24">
              {menuOpen
                ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />}
            </svg>
          </button>
        </div>

        {/* Mobile drawer */}
        {menuOpen && (
          <div style={{ backgroundColor: B.dark, padding: '1rem 2rem 1.5rem', borderTop: `1px solid rgba(222,234,136,0.15)` }}>
            {NAV.map(l => (
              <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)}
                style={{ display: 'block', color: 'rgba(255,255,255,0.8)', textDecoration: 'none', padding: '0.8rem 0', fontSize: '1rem', fontWeight: 500, borderBottom: `1px solid rgba(255,255,255,0.07)` }}>
                {l.label}
              </a>
            ))}
            <a href="#contact" onClick={() => setMenuOpen(false)}
              style={{ display: 'block', marginTop: '1.25rem', textAlign: 'center' }}
              className="btn-primary">
              BOOK A FREE CALL
            </a>
          </div>
        )}
      </nav>

      {/* ═══════════════════════════════ HERO ═══════════════════════════════ */}
      <section style={{
        minHeight: '100vh', backgroundColor: B.dark, display: 'flex', alignItems: 'center',
        padding: '120px 2rem 80px', position: 'relative', overflow: 'hidden',
      }}>
        {/* Ambient glow */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'radial-gradient(ellipse 70% 60% at 15% 55%, rgba(222,234,136,0.07) 0%, transparent 100%), radial-gradient(ellipse 50% 50% at 85% 15%, rgba(118,214,105,0.05) 0%, transparent 100%)',
        }} />
        {/* Grid overlay */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.04,
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }} />

        <div ref={hero.ref} style={{
          maxWidth: 1200, margin: '0 auto', width: '100%',
          opacity: hero.visible ? 1 : 0,
          transform: hero.visible ? 'none' : 'translateY(32px)',
          transition: 'opacity 0.75s ease, transform 0.75s ease',
        }}>
          {/* Badge */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 24,
            background: 'rgba(222,234,136,0.1)', border: '1px solid rgba(222,234,136,0.22)',
            borderRadius: 100, padding: '0.35rem 1.1rem',
          }}>
            <span style={{ width: 6, height: 6, background: B.accent, borderRadius: '50%', display: 'inline-block' }} />
            <span style={{ color: B.accent, fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.07em' }}>
              Canadian workflow solutions company
            </span>
          </div>

          <h1 style={{
            fontSize: 'clamp(2.6rem, 5.5vw, 4.5rem)', fontWeight: 900, color: B.white,
            lineHeight: 1.08, letterSpacing: '-0.035em', marginBottom: 24, maxWidth: 780,
          }}>
            Expert support for{' '}
            <span style={{ color: B.accent }}>entrepreneurs</span>{' '}
            and SMBs.
          </h1>
          <p style={{
            fontSize: 'clamp(1rem, 1.8vw, 1.18rem)', color: 'rgba(255,255,255,0.65)',
            lineHeight: 1.75, marginBottom: 40, maxWidth: 560,
          }}>
            We audit your operations, build the systems, and deploy trained specialists across
            North American hours. Systems first. People second.
          </p>

          <div className="hero-cta-row" style={{ display: 'flex', gap: 12, marginBottom: 64, flexWrap: 'wrap' }}>
            <a className="btn-primary" href="#contact" style={{ fontSize: '0.9rem' }}>
              BOOK A FREE CALL
            </a>
            <a className="btn-outline" href="#how-it-wrks">
              See how it wrks →
            </a>
          </div>

          {/* Stats row */}
          <div ref={stats.ref} className="stats-grid" style={{
            display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 32,
            borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: 40,
          }}>
            {STATS.map((s, i) => (
              <div key={s.label} style={{
                opacity: stats.visible ? 1 : 0,
                transform: stats.visible ? 'none' : 'translateY(16px)',
                transition: `opacity 0.5s ease ${i * 0.09}s, transform 0.5s ease ${i * 0.09}s`,
              }}>
                <div style={{ fontSize: 'clamp(2rem, 3.5vw, 2.6rem)', fontWeight: 900, color: B.accent, letterSpacing: '-0.035em', lineHeight: 1 }}>
                  {s.value}
                </div>
                <div style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.45)', marginTop: 6, fontWeight: 500 }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════ LOGO STRIP ═══════════════════════════════ */}
      <section style={{ backgroundColor: B.white, padding: '2.5rem 0', borderBottom: '1px solid rgba(0,0,0,0.06)', overflow: 'hidden' }}>
        <p style={{ textAlign: 'center', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.12em', color: '#aaa', textTransform: 'uppercase', marginBottom: 20 }}>
          Trusted by growing companies across Canada
        </p>
        <div style={{ overflow: 'hidden', position: 'relative' }}>
          {/* Fade edges */}
          <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 80, background: 'linear-gradient(to right, white, transparent)', zIndex: 2, pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: 80, background: 'linear-gradient(to left, white, transparent)', zIndex: 2, pointerEvents: 'none' }} />
          <div className="logo-strip">
            {[...CLIENT_LOGOS, ...CLIENT_LOGOS].map((name, i) => (
              <div key={i} style={{
                flexShrink: 0, padding: '0.5rem 1.75rem', marginRight: 16,
                border: '1px solid rgba(37,53,48,0.1)', borderRadius: 6,
                fontSize: '0.82rem', fontWeight: 700, color: B.dark, letterSpacing: '0.04em',
                background: B.bg, whiteSpace: 'nowrap',
              }}>
                {name}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════ WHY WRKSOURCING ═══════════════════════════════ */}
      <section id="about" style={{ padding: '6rem 2rem', backgroundColor: B.bg }}>
        <div ref={pillars.ref} style={{
          maxWidth: 1200, margin: '0 auto',
          opacity: pillars.visible ? 1 : 0,
          transform: pillars.visible ? 'none' : 'translateY(28px)',
          transition: 'opacity 0.65s ease, transform 0.65s ease',
        }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <p style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.14em', color: B.dark, textTransform: 'uppercase', marginBottom: 12 }}>
              Why wrksourcing
            </p>
            <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.9rem)', fontWeight: 900, color: B.dark, letterSpacing: '-0.025em', lineHeight: 1.15 }}>
              Built different. On purpose.
            </h2>
            <p style={{ maxWidth: 540, margin: '16px auto 0', color: B.muted, fontSize: '1.05rem', lineHeight: 1.7 }}>
              Most support services give you a person. We give you a system with a person in it.
            </p>
          </div>

          <div className="pillars-grid stagger" style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 16 }}>
            {PILLARS.map((p, i) => (
              <div key={p.title} className="card fade-up" style={{
                padding: '1.75rem 1.5rem',
                opacity: pillars.visible ? 1 : 0,
                transform: pillars.visible ? 'none' : 'translateY(20px)',
                transition: `opacity 0.5s ease ${i * 0.09}s, transform 0.5s ease ${i * 0.09}s`,
              }}>
                <div style={{ fontSize: '1.75rem', marginBottom: 12 }}>{p.icon}</div>
                <div style={{
                  display: 'inline-block', background: 'rgba(222,234,136,0.25)',
                  borderRadius: 4, padding: '0.2rem 0.65rem',
                  fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.09em',
                  color: B.dark, textTransform: 'uppercase', marginBottom: 10,
                }}>
                  {p.title}
                </div>
                <p style={{ fontSize: '0.875rem', color: B.muted, lineHeight: 1.65 }}>{p.desc}</p>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: 40 }}>
            <a className="btn-dark" href="#contact">WRK SMARTER TODAY</a>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════ SERVICES ═══════════════════════════════ */}
      <section id="services" style={{ padding: '6rem 2rem', backgroundColor: B.dark }}>
        <div ref={services.ref} style={{
          maxWidth: 1200, margin: '0 auto',
          opacity: services.visible ? 1 : 0,
          transform: services.visible ? 'none' : 'translateY(28px)',
          transition: 'opacity 0.65s ease, transform 0.65s ease',
        }}>
          <div style={{ marginBottom: 36 }}>
            <p style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.14em', color: B.accent, textTransform: 'uppercase', marginBottom: 12 }}>
              Services & Pricing
            </p>
            <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.9rem)', fontWeight: 900, color: B.white, letterSpacing: '-0.025em', lineHeight: 1.15, maxWidth: 500 }}>
              What wrksourcing delivers.
            </h2>
          </div>

          {/* Tabs */}
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 36 }}>
            {(Object.keys(SERVICES) as ServiceKey[]).map(k => (
              <button key={k} onClick={() => setService(k)}
                className={`service-tab${activeService === k ? ' active' : ''}`}>
                {SERVICES[k].tab}
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="services-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3.5rem', alignItems: 'start' }}>
            <div>
              <h3 style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2.1rem)', fontWeight: 800, color: B.white, letterSpacing: '-0.025em', lineHeight: 1.2, marginBottom: 16 }}>
                {svc.headline}
              </h3>
              <p style={{ color: 'rgba(255,255,255,0.65)', lineHeight: 1.75, fontSize: '1rem', marginBottom: 28 }}>
                {svc.body}
              </p>
              <a className="btn-primary" href="#contact">Get a quote →</a>
            </div>
            <div style={{
              background: 'rgba(255,255,255,0.05)', borderRadius: 12,
              padding: '2rem', border: '1px solid rgba(255,255,255,0.1)',
            }}>
              <p style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.12em', color: B.accent, textTransform: 'uppercase', marginBottom: 16 }}>
                What's included
              </p>
              {svc.features.map(f => (
                <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '0.8rem 0', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
                  <span style={{ width: 6, height: 6, background: B.accent, borderRadius: '50%', flexShrink: 0 }} />
                  <span style={{ color: 'rgba(255,255,255,0.82)', fontSize: '0.9rem' }}>{f}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════ INDUSTRIES ═══════════════════════════════ */}
      <section style={{ padding: '6rem 2rem', backgroundColor: B.bg }}>
        <div ref={industries.ref} style={{
          maxWidth: 1200, margin: '0 auto',
          opacity: industries.visible ? 1 : 0,
          transform: industries.visible ? 'none' : 'translateY(28px)',
          transition: 'opacity 0.65s ease, transform 0.65s ease',
        }}>
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <p style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.14em', color: B.dark, textTransform: 'uppercase', marginBottom: 12 }}>Industries</p>
            <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.9rem)', fontWeight: 900, color: B.dark, letterSpacing: '-0.025em', lineHeight: 1.15 }}>
              We know your space.
            </h2>
          </div>
          <div className="industries-grid stagger" style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 14 }}>
            {INDUSTRIES.map((ind, i) => (
              <div key={ind.title} className="card" style={{
                padding: '1.75rem 1rem', textAlign: 'center', cursor: 'default',
                opacity: industries.visible ? 1 : 0,
                transform: industries.visible ? 'none' : 'scale(0.93)',
                transition: `opacity 0.4s ease ${i * 0.07}s, transform 0.4s ease ${i * 0.07}s`,
              }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = B.accent }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(37,53,48,0.08)' }}
              >
                <div style={{ fontSize: '1.9rem', marginBottom: 10 }}>{ind.icon}</div>
                <p style={{ fontWeight: 700, fontSize: '0.82rem', color: B.dark, lineHeight: 1.3 }}>{ind.title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════ TESTIMONIALS ═══════════════════════════════ */}
      <section style={{ padding: '6rem 2rem', backgroundColor: B.dark }}>
        <div ref={tSection.ref} style={{
          maxWidth: 1200, margin: '0 auto',
          opacity: tSection.visible ? 1 : 0,
          transform: tSection.visible ? 'none' : 'translateY(28px)',
          transition: 'opacity 0.65s ease, transform 0.65s ease',
        }}>
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <p style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.14em', color: B.accent, textTransform: 'uppercase', marginBottom: 12 }}>Client Reviews</p>
            <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.9rem)', fontWeight: 900, color: B.white, letterSpacing: '-0.025em', lineHeight: 1.15 }}>
              What clients say.
            </h2>
          </div>

          {/* Featured */}
          <div style={{ maxWidth: 680, margin: '0 auto 36px', textAlign: 'center' }}>
            <Stars n={TESTIMONIALS[tIdx].rating} />
            <blockquote style={{
              fontSize: 'clamp(1rem, 2vw, 1.18rem)', color: 'rgba(255,255,255,0.88)',
              lineHeight: 1.72, margin: '1.25rem 0', fontStyle: 'italic',
            }}>
              "{TESTIMONIALS[tIdx].text}"
            </blockquote>
            <p style={{ fontWeight: 700, color: B.accent, fontSize: '0.9rem' }}>{TESTIMONIALS[tIdx].name}</p>
            <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.78rem', marginTop: 4 }}>{TESTIMONIALS[tIdx].company}</p>
          </div>

          {/* Dot nav */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: 6, marginBottom: 40 }}>
            {TESTIMONIALS.map((_, i) => (
              <button key={i} className="dot-btn"
                onClick={() => setTIdx(i)}
                style={{
                  width: tIdx === i ? 24 : 8,
                  backgroundColor: tIdx === i ? B.accent : 'rgba(255,255,255,0.2)',
                }}
                aria-label={`Testimonial ${i + 1}`}
              />
            ))}
          </div>

          {/* Grid */}
          <div className="testimonials-grid stagger" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
            {TESTIMONIALS.map((t, i) => (
              <div key={i} onClick={() => setTIdx(i)} style={{
                background: tIdx === i ? 'rgba(222,234,136,0.1)' : 'rgba(255,255,255,0.04)',
                borderRadius: 10, padding: '1.5rem',
                border: `1px solid ${tIdx === i ? 'rgba(222,234,136,0.25)' : 'rgba(255,255,255,0.07)'}`,
                cursor: 'pointer', transition: 'all 0.2s',
              }}>
                <Stars n={t.rating} />
                <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem', lineHeight: 1.6, margin: '10px 0', fontStyle: 'italic' }}>
                  "{t.text.length > 100 ? t.text.slice(0, 100) + '…' : t.text}"
                </p>
                <p style={{ fontWeight: 700, color: B.white, fontSize: '0.8rem' }}>{t.name}</p>
                <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.72rem', marginTop: 2 }}>{t.company}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════ HOW IT WRKS ═══════════════════════════════ */}
      <section id="how-it-wrks" style={{ padding: '6rem 2rem', backgroundColor: B.bg }}>
        <div ref={steps.ref} style={{
          maxWidth: 1200, margin: '0 auto',
          opacity: steps.visible ? 1 : 0,
          transform: steps.visible ? 'none' : 'translateY(28px)',
          transition: 'opacity 0.65s ease, transform 0.65s ease',
        }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <p style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.14em', color: B.dark, textTransform: 'uppercase', marginBottom: 12 }}>How It Wrks</p>
            <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.9rem)', fontWeight: 900, color: B.dark, letterSpacing: '-0.025em', lineHeight: 1.15 }}>
              Three steps. No fluff.
            </h2>
          </div>
          <div className="steps-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
            {STEPS.map((s, i) => (
              <div key={s.n} className="card" style={{
                padding: '2.25rem 2rem', position: 'relative',
                opacity: steps.visible ? 1 : 0,
                transform: steps.visible ? 'none' : 'translateY(20px)',
                transition: `opacity 0.5s ease ${i * 0.14}s, transform 0.5s ease ${i * 0.14}s`,
              }}>
                <div style={{ fontSize: '3.2rem', fontWeight: 900, color: B.accent, letterSpacing: '-0.05em', lineHeight: 1, marginBottom: 16 }}>
                  {s.n}
                </div>
                <h3 style={{ fontWeight: 700, fontSize: '1.05rem', color: B.dark, marginBottom: 10 }}>{s.title}</h3>
                <p style={{ color: B.muted, fontSize: '0.875rem', lineHeight: 1.7 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════ CTA + FORM ═══════════════════════════════ */}
      <section id="contact" style={{ padding: '7rem 2rem', backgroundColor: B.dark, position: 'relative', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'radial-gradient(ellipse 80% 60% at 50% 110%, rgba(222,234,136,0.09) 0%, transparent 70%)',
        }} />
        <div ref={cta.ref} style={{
          maxWidth: 680, margin: '0 auto', textAlign: 'center',
          opacity: cta.visible ? 1 : 0,
          transform: cta.visible ? 'none' : 'translateY(28px)',
          transition: 'opacity 0.65s ease, transform 0.65s ease',
        }}>
          <h2 style={{ fontSize: 'clamp(2rem, 4.5vw, 3.4rem)', fontWeight: 900, color: B.white, letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: 16 }}>
            Ready to wrk smarter?
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '1.05rem', lineHeight: 1.75, marginBottom: 40 }}>
            Book a free discovery call. No pitch deck, no pressure. We figure out if we're the right
            fit — and if we are, we'll show you exactly what it looks like.
          </p>

          {formSent ? (
            <div style={{
              background: 'rgba(222,234,136,0.12)', border: '1px solid rgba(222,234,136,0.3)',
              borderRadius: 16, padding: '3rem 2rem',
            }}>
              <div style={{ fontSize: '2.5rem', marginBottom: 16 }}>✓</div>
              <p style={{ color: B.accent, fontWeight: 700, fontSize: '1.1rem', marginBottom: 8 }}>Message received.</p>
              <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.9rem' }}>We'll be in touch within one business day.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{
              background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 16, padding: '2.5rem',
            }}>
              <div className="form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
                <div>
                  <label className="form-label">First Name</label>
                  <input type="text" placeholder="Tyler" required className="form-input" />
                </div>
                <div>
                  <label className="form-label">Company</label>
                  <input type="text" placeholder="Acme Inc." required className="form-input" />
                </div>
              </div>
              <div style={{ marginBottom: 12 }}>
                <label className="form-label">Work Email</label>
                <input type="email" placeholder="tyler@yourcompany.com" required className="form-input" />
              </div>
              <div style={{ marginBottom: 12 }}>
                <label className="form-label">Monthly Revenue (approx.)</label>
                <select required className="form-input" style={{ appearance: 'none', cursor: 'pointer' }}>
                  <option value="" disabled selected>Select a range</option>
                  <option>Under $500K/yr</option>
                  <option>$500K – $2M/yr</option>
                  <option>$2M – $5M/yr</option>
                  <option>$5M+/yr</option>
                </select>
              </div>
              <div style={{ marginBottom: 20 }}>
                <label className="form-label">What do you need help with?</label>
                <textarea rows={3} placeholder="We need help with admin support, CRM setup, and social media..." required className="form-input" style={{ resize: 'vertical' }} />
              </div>
              <button type="submit" className="btn-primary" style={{ width: '100%', padding: '1rem', fontSize: '0.95rem', letterSpacing: '0.02em', display: 'block' }}>
                BOOK OUR DISCOVERY CALL →
              </button>
              <p style={{ textAlign: 'center', marginTop: 12, fontSize: '0.78rem', color: 'rgba(255,255,255,0.3)' }}>
                No commitment. No pitch deck. Just a conversation.
              </p>
            </form>
          )}
        </div>
      </section>

      {/* ═══════════════════════════════ FOOTER ═══════════════════════════════ */}
      <footer style={{ backgroundColor: '#1b2420', padding: '3rem 2rem', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="footer-inner" style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 32, flexWrap: 'wrap' }}>
          <div>
            <div style={{ fontSize: '1.35rem', fontWeight: 900, color: B.accent, marginBottom: 6, letterSpacing: '-0.03em' }}>wrksourcing</div>
            <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.3)', maxWidth: 200 }}>wrk smart today.</p>
          </div>
          <div style={{ display: 'flex', gap: 28, flexWrap: 'wrap' }}>
            {NAV.map(l => (
              <a key={l.href} href={l.href} style={{
                color: 'rgba(255,255,255,0.45)', textDecoration: 'none',
                fontSize: '0.85rem', transition: 'color 0.2s',
              }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = B.accent }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.45)' }}
              >
                {l.label}
              </a>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            {['FB', 'IG', 'LI'].map(s => (
              <a key={s} href="#" style={{
                width: 36, height: 36, borderRadius: '50%',
                background: 'rgba(255,255,255,0.06)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'rgba(255,255,255,0.45)', textDecoration: 'none',
                fontSize: '0.65rem', fontWeight: 700, transition: 'all 0.2s',
              }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = B.accent; el.style.color = B.dark }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = 'rgba(255,255,255,0.06)'; el.style.color = 'rgba(255,255,255,0.45)' }}
              >
                {s}
              </a>
            ))}
          </div>
        </div>
        <div className="footer-bottom" style={{
          maxWidth: 1200, margin: '1.75rem auto 0', paddingTop: '1.5rem',
          borderTop: '1px solid rgba(255,255,255,0.05)',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12,
        }}>
          <p style={{ color: 'rgba(255,255,255,0.2)', fontSize: '0.75rem' }}>
            © 2026 wrksourcing Inc. All rights reserved.
          </p>
          <div style={{ display: 'flex', gap: 20 }}>
            {['Privacy Policy', 'Terms of Service'].map(l => (
              <a key={l} href="#" style={{ color: 'rgba(255,255,255,0.2)', textDecoration: 'none', fontSize: '0.75rem', transition: 'color 0.2s' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.55)' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.2)' }}
              >
                {l}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  )
}
