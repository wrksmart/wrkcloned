'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence, useInView } from 'framer-motion'

// ─────────────────────────────────────────────
// NAV
// ─────────────────────────────────────────────
const NAV = [
  { label: 'Services', href: '/#services' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'How It Wrks', href: '/#how-it-works' },
  { label: 'About Us', href: '/#about' },
  { label: 'Contact Us', href: '/#contact' },
]

// ─────────────────────────────────────────────
// SCROLL REVEAL
// ─────────────────────────────────────────────
function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {children}
    </motion.div>
  )
}

// ─────────────────────────────────────────────
// PRICING DATA
// ─────────────────────────────────────────────
const TIERS = [
  {
    name: 'Focus',
    session: '45-min assessment',
    price: '$1,800',
    description: 'Pick one system or process. We go deep on it.',
    ideal: 'businesses that want a simple system to improve capacity — CRM, automating, PM.',
    deliverables: [
      'Deep-dive assessment of one system or process',
      'Written strategy report with prioritized recommendations',
      'Notable issues identified and flagged',
      'Two custom deliverables to guide next steps',
    ],
    outcome: 'Walk away with a clear picture of what to fix first and a plan to get it done.',
  },
  {
    name: 'Momentum',
    session: '60-min assessment',
    price: '$3,500',
    description: 'Full client journey audit. Lead to close, mapped and optimized.',
    ideal: 'companies ready to know what is working efficiently without a full rebuild.',
    deliverables: [
      'Full client journey audit (lead → nurture → close)',
      '50 ICP-matched leads delivered',
      'Up to 3 email templates built for the journey',
      'Implementation plan with phased next steps',
    ],
    outcome: 'Optimize the full client journey and get ready to scale.',
    popular: true,
  },
  {
    name: 'Transform',
    session: '90-min assessment',
    price: '$5,000',
    description: 'Company-wide workflow audit. Every department. Every gap.',
    ideal: 'businesses wanting clarity and a structured operating model to scale.',
    deliverables: [
      'Company-wide workflow audit across Sales, Marketing, Admin, Ops, Delivery',
      'Role scoping and capacity analysis',
      'Phased roadmap (Foundation → Structure → Scale)',
      'Automation recommendations',
    ],
    outcome: 'Map the entire operation and get a blueprint to scale without chaos.',
  },
]

const EXECUTION = {
  description: 'After the assessment, you can execute in-house or hire wrksourcing to run it. Sprints, retainers, or a hybrid — scoped to the plan that came out of your assessment.',
  features: [
    'Sprints and/or implementation retainer',
    'Based on the phased plan from your assessment',
    'Foundation → Structure → Scale',
    'Custom-scoped, custom-priced',
  ],
}

const PHASES = [
  { n: '01', title: 'Foundation', desc: 'Audit your current systems, identify gaps, and build the baseline. This is where the strategy report lives.' },
  { n: '02', title: 'Structure', desc: 'Implement the systems, templates, and workflows recommended in the report. CRM setup, process mapping, automation wiring.' },
  { n: '03', title: 'Scale', desc: 'Optimize, measure, and expand. Ongoing retainer or sprint-based support to keep your systems running clean.' },
]

const FAQ = [
  { q: 'Is this a monthly subscription?', a: 'No. Focus, Momentum, and Transform are one-time project engagements. You pay once, get your assessment and deliverables, and decide what to do next.' },
  { q: 'What happens after the assessment?', a: 'You get a full strategy report with a phased plan. From there, you can execute in-house or hire wrksourcing to run the Execution phase — sprints, retainer, or a mix.' },
  { q: 'How long does the process take?', a: 'The assessment session itself is 45–90 minutes depending on tier. The full strategy report is delivered within 2 weeks. Execution timelines vary by scope.' },
  { q: 'Which tier should I pick?', a: "Focus if you need one thing fixed fast. Momentum if you want your full client journey mapped. Transform if you want the whole operation audited. Not sure? Book a discovery call and we'll tell you." },
  { q: 'Can I upgrade from Focus to Transform later?', a: 'Yes. If you start with Focus and realize you need more, we credit the Focus fee toward a Momentum or Transform engagement.' },
  { q: 'What tools do you wrk with?', a: 'Zoho CRM, Notion, Google Workspace, Clockify, n8n, HubSpot, and more. If your team uses it, we can audit and optimize it.' },
]

// ─────────────────────────────────────────────
// FAQ ITEM
// ─────────────────────────────────────────────
function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div style={{ borderBottom: '1px solid var(--line)', padding: '1.25rem 0' }}>
      <button onClick={() => setOpen(o => !o)} style={{
        width: '100%', textAlign: 'left', background: 'none', border: 'none',
        cursor: 'pointer', fontFamily: 'inherit',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16,
      }}>
        <span style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--eerie)' }}>{q}</span>
        <motion.span animate={{ rotate: open ? 45 : 0 }} transition={{ duration: 0.2 }}
          style={{ fontSize: '1.5rem', color: 'var(--mantis-a)', fontWeight: 300, flexShrink: 0, lineHeight: 1 }}>+</motion.span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} style={{ overflow: 'hidden' }}>
            <p style={{ padding: '0.75rem 0 0.25rem', color: 'var(--subtext)', fontSize: '0.92rem', lineHeight: 1.7, maxWidth: 640 }}>{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function Check() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0, marginTop: 2 }}>
      <circle cx="12" cy="12" r="10" fill="var(--mantis-a)" opacity="0.12" />
      <path d="M9 12l2 2 4-4" stroke="var(--mantis-a)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

// ─────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────
export default function PricingPage() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div style={{ fontFamily: "'Avenir', 'Plus Jakarta Sans', sans-serif" }}>

      {/* NAV */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        backgroundColor: 'rgba(255,255,255,0.97)', backdropFilter: 'blur(12px)',
        boxShadow: '0 1px 0 rgba(0,0,0,0.06)',
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 72 }}>
          <a href="/" style={{ display: 'flex', alignItems: 'center' }}>
            <Image src="/images/logo-horizontal.png" alt="wrksourcing" width={180} height={40} style={{ objectFit: 'contain' }} />
          </a>
          <div className="nav-desktop">
            {NAV.map(l => <a key={l.href} className="nav-link" href={l.href}>{l.label}</a>)}
            <a className="btn-gradient" href="/#contact" style={{ fontSize: '0.76rem', padding: '0.55rem 1.3rem' }}>BOOK A FREE CALL</a>
          </div>
          <button className="nav-mobile-btn" onClick={() => setMenuOpen(o => !o)} aria-label="Menu">
            <svg width="26" height="26" fill="none" stroke="var(--eerie)" strokeWidth="2" viewBox="0 0 24 24">
              {menuOpen ? <path strokeLinecap="round" d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" d="M4 6h16M4 12h16M4 18h16" />}
            </svg>
          </button>
        </div>
        {menuOpen && (
          <div style={{ backgroundColor: '#fff', padding: '1rem 2rem 1.5rem', borderTop: '1px solid #eee' }}>
            {NAV.map(l => (
              <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)}
                style={{ display: 'block', color: 'var(--eerie)', padding: '0.8rem 0', fontSize: '1rem', fontWeight: 500, borderBottom: '1px solid #f0f0f0' }}>{l.label}</a>
            ))}
          </div>
        )}
      </nav>

      {/* HERO */}
      <section style={{ padding: '140px 2rem 5rem', backgroundColor: '#fff' }}>
        <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
            style={{ fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.1em', color: 'var(--mantis-a)', textTransform: 'uppercase', marginBottom: 14 }}>
            wrkflow Solutions
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
            style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.2rem)', fontWeight: 900, color: 'var(--eerie)', letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: 18 }}>
            your operations, audited and rebuilt.
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.35 }}
            style={{ fontSize: '1.05rem', color: 'var(--subtext)', lineHeight: 1.7, maxWidth: 580, margin: '0 auto 28px' }}>
            every engagement starts with an Assessment and Strategy — choose a tier,
            get the report, then decide how to execute. one-time investment. no subscriptions.
          </motion.p>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
            style={{ fontSize: '0.82rem', color: 'var(--muted)' }}>
            all pricing in CAD. no hidden fees.
          </motion.p>
        </div>
      </section>

      {/* PRICING TIERS */}
      <section style={{ padding: '4rem 2rem 6rem', backgroundColor: 'var(--seasalt)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div className="services-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24, alignItems: 'stretch' }}>
            {TIERS.map((t, i) => (
              <Reveal key={t.name} delay={i * 0.1}>
                <div style={{
                  background: '#fff', borderRadius: 16,
                  border: t.popular ? 'none' : '1px solid var(--line)',
                  boxShadow: t.popular ? '0 0 0 2px #76d669, 0 16px 48px rgba(118,214,105,0.12)' : undefined,
                  padding: '2.25rem 2rem', display: 'flex', flexDirection: 'column' as const,
                  height: '100%', position: 'relative' as const, overflow: 'hidden' as const,
                }}>
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: 'linear-gradient(90deg, var(--mantis-a), var(--mantis-b))' }} />

                  {t.popular && (
                    <div style={{
                      position: 'absolute', top: 16, right: -32,
                      background: 'linear-gradient(135deg, var(--mantis-a), var(--mantis-b))',
                      color: '#fff', fontSize: '0.65rem', fontWeight: 800,
                      padding: '4px 40px', transform: 'rotate(45deg)',
                      letterSpacing: '0.08em', textTransform: 'uppercase',
                    }}>Popular</div>
                  )}

                  <div style={{ marginBottom: 20 }}>
                    <p style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.1em', color: 'var(--mantis-a)', textTransform: 'uppercase', marginBottom: 6 }}>{t.session}</p>
                    <h3 style={{ fontSize: '1.6rem', fontWeight: 900, color: 'var(--eerie)', letterSpacing: '-0.02em', marginBottom: 8 }}>{t.name}</h3>
                    <p style={{ fontSize: '0.9rem', color: 'var(--subtext)', lineHeight: 1.6 }}>{t.description}</p>
                  </div>

                  <div style={{ marginBottom: 20, paddingBottom: 20, borderBottom: '1px solid var(--line)' }}>
                    <span style={{ fontSize: '2.6rem', fontWeight: 900, color: 'var(--eerie)', letterSpacing: '-0.03em' }}>{t.price}</span>
                    <span style={{ fontSize: '0.85rem', color: 'var(--muted)', marginLeft: 6 }}>CAD</span>
                    <p style={{ fontSize: '0.78rem', color: 'var(--subtle)', marginTop: 4 }}>one-time</p>
                  </div>

                  <p style={{ fontSize: '0.8rem', color: 'var(--muted)', marginBottom: 16, fontStyle: 'italic' }}>ideal for {t.ideal}</p>

                  <div style={{ flex: 1, marginBottom: 24 }}>
                    <p style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.08em', color: 'var(--eerie)', textTransform: 'uppercase', marginBottom: 12 }}>what you get</p>
                    {t.deliverables.map(d => (
                      <div key={d} style={{ display: 'flex', gap: 10, marginBottom: 10, alignItems: 'flex-start' }}>
                        <Check />
                        <span style={{ fontSize: '0.88rem', color: 'var(--subtext)', lineHeight: 1.5 }}>{d}</span>
                      </div>
                    ))}
                  </div>

                  <div style={{
                    background: 'linear-gradient(135deg, rgba(118,214,105,0.06), rgba(221,234,127,0.06))',
                    borderRadius: 10, padding: '0.9rem 1rem', marginBottom: 20,
                  }}>
                    <p style={{ fontSize: '0.82rem', color: 'var(--forest)', lineHeight: 1.6, fontWeight: 500 }}>{t.outcome}</p>
                  </div>

                  <a href="/#contact" className={t.popular ? 'btn-gradient' : 'btn-outline'}
                    style={{ textAlign: 'center', width: '100%', display: 'block' }}>
                    Book a discovery call
                  </a>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* EXECUTION */}
      <section style={{ padding: '5rem 2rem', backgroundColor: '#fff' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <Reveal>
            <div style={{ background: 'var(--forest)', borderRadius: 18, padding: '2.5rem', color: '#fff' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                <div style={{
                  background: 'linear-gradient(135deg, var(--mantis-a), var(--mantis-b))',
                  borderRadius: 8, padding: '6px 14px', fontSize: '0.72rem', fontWeight: 800,
                  letterSpacing: '0.08em', textTransform: 'uppercase', color: '#fff',
                }}>Phase 2+</div>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 900 }}>Execution</h3>
              </div>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1rem', lineHeight: 1.7, marginBottom: 20 }}>{EXECUTION.description}</p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
                {EXECUTION.features.map(f => (
                  <div key={f} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0, marginTop: 3 }}>
                      <path d="M9 12l2 2 4-4" stroke="var(--mindaro)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span style={{ fontSize: '0.88rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.5 }}>{f}</span>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 24 }}>
                <a href="/#contact" style={{
                  display: 'inline-block', padding: '0.75rem 1.8rem', borderRadius: 6,
                  border: '1px solid rgba(255,255,255,0.25)', color: '#fff',
                  fontSize: '0.82rem', fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase', transition: 'all 0.2s',
                }}
                  onMouseEnter={e => { const el = e.currentTarget; el.style.borderColor = 'var(--mindaro)'; el.style.color = 'var(--mindaro)' }}
                  onMouseLeave={e => { const el = e.currentTarget; el.style.borderColor = 'rgba(255,255,255,0.25)'; el.style.color = '#fff' }}
                >Discuss your project</a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* THREE PHASES */}
      <section style={{ padding: '5rem 2rem', backgroundColor: 'var(--seasalt)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <Reveal>
            <div style={{ textAlign: 'center', marginBottom: 48 }}>
              <p style={{ fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.1em', color: 'var(--mantis-a)', textTransform: 'uppercase', marginBottom: 12 }}>our approach</p>
              <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.4rem)', fontWeight: 900, color: 'var(--eerie)', letterSpacing: '-0.02em', lineHeight: 1.15 }}>Foundation → Structure → Scale</h2>
            </div>
          </Reveal>
          <div className="steps-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24, position: 'relative' }}>
            <div className="steps-connector" style={{
              position: 'absolute', top: 24, left: 'calc(16.67% + 24px)', right: 'calc(16.67% + 24px)',
              height: 2, background: 'linear-gradient(90deg, var(--mantis-a), var(--mantis-b))', zIndex: 0, borderRadius: 1,
            }} />
            {PHASES.map((p, i) => (
              <Reveal key={p.n} delay={i * 0.12}>
                <div className="card" style={{ padding: '2rem 1.75rem', position: 'relative', zIndex: 1, height: '100%' }}>
                  <div className="step-number">{p.n}</div>
                  <h3 style={{ fontWeight: 700, fontSize: '1.05rem', color: 'var(--eerie)', marginBottom: 10, lineHeight: 1.3 }}>{p.title}</h3>
                  <p style={{ color: 'var(--muted)', fontSize: '0.88rem', lineHeight: 1.7 }}>{p.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: '5rem 2rem', backgroundColor: '#fff' }}>
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          <Reveal>
            <div style={{ textAlign: 'center', marginBottom: 40 }}>
              <p style={{ fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.1em', color: 'var(--mantis-a)', textTransform: 'uppercase', marginBottom: 12 }}>questions</p>
              <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.4rem)', fontWeight: 900, color: 'var(--eerie)', letterSpacing: '-0.02em', lineHeight: 1.15 }}>common questions</h2>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div style={{ borderTop: '1px solid var(--line)' }}>
              {FAQ.map(f => <FaqItem key={f.q} q={f.q} a={f.a} />)}
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="gradient-bg" style={{ padding: '6rem 2rem' }}>
        <Reveal>
          <div style={{ maxWidth: 600, margin: '0 auto', textAlign: 'center' }}>
            <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', fontWeight: 900, color: '#fff', letterSpacing: '-0.025em', lineHeight: 1.12, marginBottom: 16 }}>
              not sure which tier fits?
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '1rem', lineHeight: 1.7, marginBottom: 32 }}>
              book a free discovery call and we&apos;ll recommend the right assessment for your business.
            </p>
            <a className="btn-dark" href="/#contact" style={{ fontSize: '0.85rem', padding: '0.95rem 2.2rem' }}>Book a discovery call</a>
          </div>
        </Reveal>
      </section>

      {/* FOOTER */}
      <footer style={{ backgroundColor: 'var(--forest)', padding: '3.5rem 2rem', color: '#fff' }}>
        <div className="footer-inner" style={{
          maxWidth: 1200, margin: '0 auto', display: 'flex', justifyContent: 'space-between',
          alignItems: 'flex-start', gap: 32, flexWrap: 'wrap',
        }}>
          <div>
            <div style={{ marginBottom: 12 }}>
              <Image src="/images/logo-horizontal-white.png" alt="wrksourcing" width={160} height={36} style={{ objectFit: 'contain' }} />
            </div>
            <p style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.55)', maxWidth: 280, lineHeight: 1.6 }}>
              wrksourcing connects businesses with highly skilled remote wrk specialists to optimize strategy, workflow, and execution.
            </p>
          </div>
          <div style={{ display: 'flex', gap: 28, flexWrap: 'wrap' }}>
            {NAV.map(l => (
              <a key={l.href} href={l.href} style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem', transition: 'color 0.2s' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#fff' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.6)' }}>{l.label}</a>
            ))}
          </div>
        </div>
        <div className="footer-bottom" style={{
          maxWidth: 1200, margin: '2rem auto 0', paddingTop: '1.5rem',
          borderTop: '1px solid rgba(255,255,255,0.1)',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12,
        }}>
          <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.75rem' }}>© 2025 wrksourcing. All rights reserved.</p>
          <div style={{ display: 'flex', gap: 20 }}>
            {['Privacy Policy', 'Terms & Conditions'].map(l => (
              <a key={l} href="#" style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.75rem', transition: 'color 0.2s' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.7)' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.35)' }}>{l}</a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  )
}
