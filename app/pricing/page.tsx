'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence, useInView } from 'framer-motion'

// ─────────────────────────────────────────────
// NAV DATA
// ─────────────────────────────────────────────
const NAV = [
  { label: 'Services & Pricing', href: '/pricing' },
  { label: 'How It Works', href: '/#how-it-works' },
  { label: 'About Us', href: '/#about' },
  { label: 'Contact Us', href: '/#contact' },
]

// ─────────────────────────────────────────────
// PRICING DATA
// ─────────────────────────────────────────────
const TIERS = [
  {
    name: 'Starter',
    price: 1800,
    perHour: 45,
    hours: 40,
    tagline: 'for growing teams ready to delegate',
    popular: false,
    features: [
      'Dedicated wrk Specialist',
      'Admin and ops support',
      'CRM hygiene and maintenance',
      'Email and calendar management',
      'Weekly check-ins',
      'Slack/Chat channel access',
    ],
  },
  {
    name: 'Growth',
    price: 3500,
    perHour: 43.75,
    hours: 80,
    tagline: 'for scaling businesses that need more firepower',
    popular: true,
    features: [
      'Everything in Starter, plus:',
      'Marketing and content support',
      'Social media management',
      'Process optimization',
      'Bi-weekly strategy calls',
      'Priority support',
      'Dedicated account manager',
    ],
  },
  {
    name: 'Scale',
    price: 5000,
    perHour: 31.25,
    hours: 160,
    tagline: 'for established companies building an ops engine',
    popular: false,
    features: [
      'Everything in Growth, plus:',
      'Multiple wrk Specialists',
      'Full wrkflow implementation',
      'Zoho CRM setup and config',
      'Notion OS workspace build',
      'Custom automation (n8n)',
      'Weekly strategy calls',
      'Executive-level oversight',
    ],
  },
]

const STEPS = [
  {
    n: '01',
    title: 'book a discovery call',
    desc: 'we learn your business, understand your pain points, and recommend the right plan for where you are today.',
  },
  {
    n: '02',
    title: 'we build your systems',
    desc: 'process audit, tool setup, and specialist matching. we get everything running before your team starts.',
  },
  {
    n: '03',
    title: 'your team scales',
    desc: 'ongoing support, monthly reviews, and the flexibility to adjust as you grow. no surprises.',
  },
]

const FAQS = [
  {
    q: "What's included in my hours?",
    a: 'Your wrk Specialist works dedicated hours on your tasks. Hours are tracked in Clockify with full transparency. Hours don\u2019t roll over month to month.',
  },
  {
    q: 'Can I change plans?',
    a: 'Yes. Upgrade or downgrade anytime with 30 days notice. We make transitions seamless so your business never skips a beat.',
  },
  {
    q: 'Is there a contract?',
    a: 'No long-term contracts. Month-to-month billing. Cancel anytime with 30 days notice.',
  },
  {
    q: 'What if I need more hours?',
    a: 'Additional hours are available at $25 CAD/hr. Or upgrade to a bigger plan for better per-hour value.',
  },
  {
    q: 'Where are your specialists based?',
    a: 'All wrk Specialists are based in the Philippines, working North American hours (EST). Same timezone, same work hours, zero friction.',
  },
  {
    q: 'What tools do you support?',
    a: 'Zoho CRM, Notion, Clockify, Google Workspace, HubSpot, and more. If you use it, we can learn it.',
  },
]

// ─────────────────────────────────────────────
// SCROLL REVEAL WRAPPER
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
// CHECKMARK ICON
// ─────────────────────────────────────────────
function Check() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0, marginTop: 2 }}>
      <circle cx="12" cy="12" r="10" fill="var(--light-accent)" />
      <path d="M8 12.5l2.5 2.5 5.5-5.5" stroke="var(--mantis-a)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

// ─────────────────────────────────────────────
// FAQ ITEM
// ─────────────────────────────────────────────
function FaqItem({ q, a, isOpen, onToggle }: { q: string; a: string; isOpen: boolean; onToggle: () => void }) {
  return (
    <div style={{
      borderBottom: '1px solid var(--line)',
      overflow: 'hidden',
    }}>
      <button
        onClick={onToggle}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '1.25rem 0',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          fontFamily: 'inherit',
          textAlign: 'left',
          gap: 16,
        }}
      >
        <span style={{
          fontSize: '1.02rem',
          fontWeight: 600,
          color: 'var(--eerie)',
          lineHeight: 1.4,
        }}>
          {q}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.2 }}
          style={{
            fontSize: '1.5rem',
            fontWeight: 300,
            color: 'var(--mantis-a)',
            lineHeight: 1,
            flexShrink: 0,
          }}
        >
          +
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <p style={{
              fontSize: '0.92rem',
              color: 'var(--subtext)',
              lineHeight: 1.7,
              paddingBottom: '1.25rem',
              maxWidth: 640,
            }}>
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ─────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────
export default function PricingPage() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  // Scroll detection for nav
  if (typeof window !== 'undefined') {
    if (!scrolled) {
      const handleScroll = () => setScrolled(window.scrollY > 50)
      window.addEventListener('scroll', handleScroll, { passive: true })
    }
  }

  return (
    <div style={{ fontFamily: "'Avenir', 'Plus Jakarta Sans', sans-serif" }}>

      {/* ═══════════════ NAV ═══════════════ */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        transition: 'all 0.3s',
        backgroundColor: scrolled ? 'rgba(255,255,255,0.97)' : 'rgba(255,255,255,0.97)',
        backdropFilter: 'blur(12px)',
        boxShadow: scrolled ? '0 1px 0 rgba(0,0,0,0.06)' : 'none',
      }}>
        <div style={{
          maxWidth: 1200, margin: '0 auto', padding: '0 2rem',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 72,
        }}>
          <a href="/" style={{ display: 'flex', alignItems: 'center' }}>
            <Image src="/images/logo-horizontal.png" alt="wrksourcing" width={180} height={40} style={{ objectFit: 'contain' }} />
          </a>

          <div className="nav-desktop">
            {NAV.map(l => (
              <a key={l.href} className="nav-link" href={l.href}>{l.label}</a>
            ))}
            <a className="btn-gradient" href="https://wrksourcing.com/contact" style={{ fontSize: '0.76rem', padding: '0.55rem 1.3rem' }}>
              BOOK A FREE CALL
            </a>
          </div>

          <button className="nav-mobile-btn" onClick={() => setMenuOpen(o => !o)} aria-label="Menu">
            <svg width="26" height="26" fill="none" stroke="var(--eerie)" strokeWidth="2" viewBox="0 0 24 24">
              {menuOpen
                ? <path strokeLinecap="round" d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" d="M4 6h16M4 12h16M4 18h16" />}
            </svg>
          </button>
        </div>

        {menuOpen && (
          <div style={{ backgroundColor: '#fff', padding: '1rem 2rem 1.5rem', borderTop: '1px solid #eee' }}>
            {NAV.map(l => (
              <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)}
                style={{ display: 'block', color: 'var(--eerie)', textDecoration: 'none', padding: '0.8rem 0', fontSize: '1rem', fontWeight: 500, borderBottom: '1px solid #f0f0f0' }}>
                {l.label}
              </a>
            ))}
            <a href="https://wrksourcing.com/contact" onClick={() => setMenuOpen(false)}
              className="btn-gradient" style={{ display: 'block', marginTop: '1rem', textAlign: 'center' }}>
              BOOK A FREE CALL
            </a>
          </div>
        )}
      </nav>

      {/* ═══════════════ HERO ═══════════════ */}
      <section style={{
        backgroundColor: '#fff',
        padding: '140px 2rem 80px',
        textAlign: 'center',
      }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            style={{
              fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.1em',
              color: 'var(--mantis-a)', textTransform: 'uppercase', marginBottom: 16,
            }}
          >
            pricing
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            style={{
              fontSize: 'clamp(2.2rem, 4.5vw, 3.2rem)',
              fontWeight: 900, color: 'var(--eerie)',
              lineHeight: 1.12, letterSpacing: '-0.025em', marginBottom: 20,
            }}
          >
            transparent pricing, real results.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            style={{
              fontSize: '1.08rem', color: 'var(--subtext)',
              lineHeight: 1.7, marginBottom: 28, maxWidth: 580, margin: '0 auto 28px',
            }}
          >
            no hidden fees. no long-term contracts. just scalable support that grows with your business.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              backgroundColor: 'var(--light-accent)',
              padding: '0.5rem 1.25rem', borderRadius: 100,
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--mantis-a)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 00-3-3.87" />
              <path d="M16 3.13a4 4 0 010 7.75" />
            </svg>
            <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--forest)' }}>
              trusted by 50+ businesses across Canada
            </span>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════ GUARANTEE BAR ═══════════════ */}
      <section style={{
        backgroundColor: 'var(--forest)',
        padding: '1rem 2rem',
        textAlign: 'center',
      }}>
        <p style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--mindaro)', letterSpacing: '0.02em' }}>
          100% satisfaction guarantee. if we&apos;re not the right fit in the first 30 days, you don&apos;t pay.
        </p>
      </section>

      {/* ═══════════════ PRICING TIERS ═══════════════ */}
      <section style={{ padding: '5rem 2rem', backgroundColor: 'var(--seasalt)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div className="pricing-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 24,
            alignItems: 'stretch',
          }}>
            {TIERS.map((tier, i) => (
              <Reveal key={tier.name} delay={i * 0.12}>
                <div style={{
                  position: 'relative',
                  height: '100%',
                  borderRadius: 14,
                  padding: tier.popular ? 2 : 0,
                  background: tier.popular
                    ? 'linear-gradient(135deg, var(--mantis-a), var(--mantis-b))'
                    : 'transparent',
                }}>
                  {/* Most Popular badge */}
                  {tier.popular && (
                    <div style={{
                      position: 'absolute',
                      top: -14,
                      left: '50%',
                      transform: 'translateX(-50%)',
                      background: 'linear-gradient(135deg, var(--mantis-a), var(--mantis-b))',
                      color: '#fff',
                      padding: '0.35rem 1.25rem',
                      borderRadius: 100,
                      fontSize: '0.72rem',
                      fontWeight: 800,
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      whiteSpace: 'nowrap',
                      zIndex: 2,
                    }}>
                      Most Popular
                    </div>
                  )}

                  <div style={{
                    backgroundColor: '#fff',
                    borderRadius: tier.popular ? 12 : 14,
                    border: tier.popular ? 'none' : '1px solid var(--line)',
                    padding: '2.25rem 2rem',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'box-shadow 0.25s, transform 0.25s',
                  }}
                    onMouseEnter={e => {
                      const el = e.currentTarget
                      el.style.boxShadow = '0 12px 40px rgba(0,0,0,0.08)'
                      el.style.transform = 'translateY(-4px)'
                    }}
                    onMouseLeave={e => {
                      const el = e.currentTarget
                      el.style.boxShadow = 'none'
                      el.style.transform = 'translateY(0)'
                    }}
                  >
                    {/* Tier name */}
                    <p style={{
                      fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.1em',
                      color: 'var(--mantis-a)', textTransform: 'uppercase', marginBottom: 8,
                    }}>
                      {tier.name}
                    </p>

                    {/* Price */}
                    <div style={{ marginBottom: 4 }}>
                      <span style={{
                        fontSize: 'clamp(2.2rem, 4vw, 2.8rem)',
                        fontWeight: 900,
                        color: 'var(--eerie)',
                        letterSpacing: '-0.03em',
                        lineHeight: 1,
                      }}>
                        ${tier.price.toLocaleString()}
                      </span>
                      <span style={{ fontSize: '0.9rem', color: 'var(--muted)', fontWeight: 500, marginLeft: 4 }}>
                        CAD/mo
                      </span>
                    </div>

                    {/* Per hour value */}
                    <p style={{
                      fontSize: '0.78rem', color: 'var(--mantis-a)', fontWeight: 700, marginBottom: 12,
                    }}>
                      ${tier.perHour}/hr value
                      {tier.name === 'Scale' && (
                        <span style={{
                          marginLeft: 8,
                          backgroundColor: 'var(--light-accent)',
                          padding: '2px 8px',
                          borderRadius: 4,
                          fontSize: '0.7rem',
                          fontWeight: 800,
                          color: 'var(--forest)',
                        }}>
                          BEST VALUE
                        </span>
                      )}
                    </p>

                    {/* Tagline */}
                    <p style={{
                      fontSize: '0.9rem', color: 'var(--subtext)',
                      lineHeight: 1.5, marginBottom: 8,
                    }}>
                      {tier.tagline}
                    </p>

                    {/* Hours */}
                    <p style={{
                      fontSize: '0.82rem', color: 'var(--muted)', fontWeight: 600, marginBottom: 20,
                      paddingBottom: 20, borderBottom: '1px solid var(--line)',
                    }}>
                      {tier.hours} hours/month
                    </p>

                    {/* Features */}
                    <div style={{ flex: 1, marginBottom: 24 }}>
                      {tier.features.map((f, fi) => (
                        <div key={fi} style={{
                          display: 'flex', alignItems: 'flex-start', gap: 10,
                          marginBottom: 12,
                        }}>
                          <Check />
                          <span style={{
                            fontSize: '0.88rem',
                            color: fi === 0 && (tier.name === 'Growth' || tier.name === 'Scale')
                              ? 'var(--mantis-a)'
                              : 'var(--subtext)',
                            fontWeight: fi === 0 && (tier.name === 'Growth' || tier.name === 'Scale') ? 700 : 400,
                            lineHeight: 1.5,
                          }}>
                            {f}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* CTA */}
                    <a
                      href="https://wrksourcing.com/contact"
                      className={tier.popular ? 'btn-gradient' : 'btn-outline'}
                      style={{
                        display: 'block',
                        textAlign: 'center',
                        width: '100%',
                        padding: '0.9rem 2rem',
                        fontSize: '0.82rem',
                      }}
                    >
                      GET STARTED
                    </a>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Satisfaction note */}
          <Reveal delay={0.3}>
            <p style={{
              textAlign: 'center', marginTop: 32,
              fontSize: '0.85rem', color: 'var(--muted)', lineHeight: 1.6,
            }}>
              all plans are month-to-month. no setup fees. cancel anytime with 30 days notice.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════ HOW PRICING WORKS ═══════════════ */}
      <section style={{ padding: '6rem 2rem', backgroundColor: '#fff' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <Reveal>
            <div style={{ textAlign: 'center', marginBottom: 48 }}>
              <p style={{
                fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.1em',
                color: 'var(--mantis-a)', textTransform: 'uppercase', marginBottom: 12,
              }}>
                how it works
              </p>
              <h2 style={{
                fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)',
                fontWeight: 900, color: 'var(--eerie)',
                letterSpacing: '-0.02em', lineHeight: 1.15,
              }}>
                three steps to get started
              </h2>
            </div>
          </Reveal>

          <div className="steps-grid" style={{
            display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 24, position: 'relative',
          }}>
            {/* Connector line */}
            <div className="steps-connector" style={{
              position: 'absolute', top: 24, left: 'calc(16.67% + 24px)', right: 'calc(16.67% + 24px)',
              height: 2, background: 'linear-gradient(90deg, var(--mantis-a), var(--mantis-b))',
              zIndex: 0, borderRadius: 1,
            }} />
            {STEPS.map((s, i) => (
              <Reveal key={s.n} delay={i * 0.15}>
                <div className="card" style={{ padding: '2rem 1.75rem', position: 'relative', zIndex: 1 }}>
                  <div className="step-number">{s.n}</div>
                  <h3 style={{
                    fontWeight: 700, fontSize: '1.05rem', color: 'var(--eerie)',
                    marginBottom: 10, lineHeight: 1.3,
                  }}>
                    {s.title}
                  </h3>
                  <p style={{ color: 'var(--muted)', fontSize: '0.88rem', lineHeight: 1.7 }}>
                    {s.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ FAQ ═══════════════ */}
      <section style={{ padding: '6rem 2rem', backgroundColor: 'var(--seasalt)' }}>
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          <Reveal>
            <div style={{ textAlign: 'center', marginBottom: 48 }}>
              <p style={{
                fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.1em',
                color: 'var(--mantis-a)', textTransform: 'uppercase', marginBottom: 12,
              }}>
                frequently asked questions
              </p>
              <h2 style={{
                fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)',
                fontWeight: 900, color: 'var(--eerie)',
                letterSpacing: '-0.02em', lineHeight: 1.15,
              }}>
                got questions? we&apos;ve got answers.
              </h2>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div style={{
              backgroundColor: '#fff',
              borderRadius: 14,
              border: '1px solid var(--line)',
              padding: '0.5rem 2rem',
            }}>
              {FAQS.map((faq, i) => (
                <FaqItem
                  key={i}
                  q={faq.q}
                  a={faq.a}
                  isOpen={openFaq === i}
                  onToggle={() => setOpenFaq(openFaq === i ? null : i)}
                />
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════ CTA ═══════════════ */}
      <section className="gradient-bg" style={{ padding: '7rem 2rem' }}>
        <Reveal>
          <div style={{ maxWidth: 680, margin: '0 auto', textAlign: 'center' }}>
            <h2 style={{
              fontSize: 'clamp(2rem, 4.5vw, 2.8rem)', fontWeight: 900,
              color: 'var(--white)', letterSpacing: '-0.025em', lineHeight: 1.12, marginBottom: 16,
            }}>
              not sure which plan fits?
            </h2>
            <p style={{
              color: 'rgba(255,255,255,0.85)', fontSize: '1.02rem',
              lineHeight: 1.72, marginBottom: 40,
            }}>
              book a free discovery call and we&apos;ll recommend the right plan for your business.
              no pressure, no commitment.
            </p>
            <a className="btn-dark" href="https://wrksourcing.com/contact" style={{
              fontSize: '0.88rem', padding: '1rem 2.5rem',
            }}>
              BOOK A FREE CALL
            </a>
          </div>
        </Reveal>
      </section>

      {/* ═══════════════ FOOTER ═══════════════ */}
      <footer style={{ backgroundColor: 'var(--forest)', padding: '3.5rem 2rem', color: '#fff' }}>
        <div className="footer-inner" style={{
          maxWidth: 1200, margin: '0 auto',
          display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 32, flexWrap: 'wrap',
        }}>
          <div>
            <div style={{ marginBottom: 12 }}>
              <Image src="/images/logo-horizontal-white.png" alt="wrksourcing" width={160} height={36} style={{ objectFit: 'contain' }} />
            </div>
            <p style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.55)', maxWidth: 280, lineHeight: 1.6 }}>
              wrksourcing connects businesses with highly skilled remote wrk Specialists to
              optimize strategy, workflow, and execution. our experts drive sustainable growth.
            </p>
          </div>
          <div style={{ display: 'flex', gap: 28, flexWrap: 'wrap' }}>
            {[
              { label: 'Home', href: '/' },
              { label: 'Pricing', href: '/pricing' },
              { label: 'How It Works', href: '/#how-it-works' },
              { label: 'Contact Us', href: '/#contact' },
            ].map(l => (
              <a key={l.href} href={l.href} style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem', transition: 'color 0.2s' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#fff' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.6)' }}>{l.label}</a>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            {[
              { label: 'FB', href: 'https://facebook.com/wrksourcing' },
              { label: 'IG', href: 'https://instagram.com/wrksourcing' },
              { label: 'LI', href: 'https://linkedin.com/company/wrksourcing' },
            ].map(s => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" style={{
                width: 36, height: 36, borderRadius: '50%', background: 'rgba(255,255,255,0.1)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'rgba(255,255,255,0.6)', fontSize: '0.65rem', fontWeight: 700, transition: 'all 0.2s',
              }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = 'linear-gradient(135deg, #76d669, #DDEA7F)'; el.style.color = '#fff' }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = 'rgba(255,255,255,0.1)'; el.style.color = 'rgba(255,255,255,0.6)' }}
              >{s.label}</a>
            ))}
          </div>
        </div>
        <div className="footer-bottom" style={{
          maxWidth: 1200, margin: '2rem auto 0', paddingTop: '1.5rem',
          borderTop: '1px solid rgba(255,255,255,0.1)',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12,
        }}>
          <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.75rem' }}>&copy; 2025 wrksourcing. All rights reserved.</p>
          <div style={{ display: 'flex', gap: 20 }}>
            {['Privacy Policy', 'Terms & Conditions'].map(l => (
              <a key={l} href="#" style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.75rem', transition: 'color 0.2s' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.7)' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.35)' }}>{l}</a>
            ))}
          </div>
        </div>
      </footer>

      {/* ═══════════════ RESPONSIVE STYLES ═══════════════ */}
      <style jsx>{`
        @media (max-width: 900px) {
          .pricing-grid {
            grid-template-columns: 1fr !important;
            max-width: 440px !important;
            margin: 0 auto !important;
          }
        }
      `}</style>
    </div>
  )
}
