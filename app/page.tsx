'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  AnimatePresence,
  useInView,
} from 'framer-motion'

// ─────────────────────────────────────────────
// BRAND TOKENS
// ─────────────────────────────────────────────
const B = {
  dark: '#0e1a16',
  darkCard: '#152420',
  forest: '#253530',
  accent: '#deea88',
  accentDim: 'rgba(222,234,136,0.15)',
  gradient1: '#76d669',
  gradient2: '#DDEA7F',
  bg: '#f7f8f9',
  white: '#ffffff',
  text: '#1d1d1d',
  muted: '#5a6a64',
  glass: 'rgba(255,255,255,0.04)',
  glassBorder: 'rgba(255,255,255,0.08)',
}

const FONT = "'Avenir', 'Plus Jakarta Sans', -apple-system, sans-serif"
const SERIF = "'Instrument Serif', Georgia, serif"

// ─────────────────────────────────────────────
// CONTENT (exact wrksourcing.com copy)
// ─────────────────────────────────────────────
const NAV = [
  { label: 'Services & Pricing', href: '#services' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'About Us', href: '#about' },
  { label: 'Contact Us', href: '#contact' },
]

const CLIENT_LOGOS = [
  'BluRoot', 'Hive Growth', 'Pilot Solutions', 'Consilium Wealth',
  'National Wireless', 'Practice Perfect', 'Open Doors Mortgage',
  'MSP Saber', 'FP Fitness', 'MPG Law', 'Green Link', 'Sandler',
]

const STATS = [
  { value: 200, suffix: 'K+', label: 'hours of proven results' },
  { value: 50,  suffix: '+',  label: 'active clients' },
  { value: 40,  suffix: '+',  label: 'wrk Specialists' },
  { value: 95,  suffix: '%',  label: 'client retention' },
]

const PILLARS = [
  {
    title: 'Process',
    desc: 'optimizing wrkflows for faster, more effective results',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={B.accent} strokeWidth="1.5">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    title: 'Personalization',
    desc: 'custom solutions built to fit your business',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={B.accent} strokeWidth="1.5">
        <path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    title: 'People',
    desc: 'a team of skilled talent dedicated to drive your success',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={B.accent} strokeWidth="1.5">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    title: 'Platforms',
    desc: 'equipping you with the right tools for growth',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={B.accent} strokeWidth="1.5">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
        <path d="M8 21h8M12 17v4" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    title: 'Partners',
    desc: 'continuously collaborating to create lasting value and impact',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={B.accent} strokeWidth="1.5">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
]

const SERVICES = {
  wrkflow: {
    tab: 'Wrkflow Solutions',
    headline: 'establish and optimize your processes',
    body: 'for businesses needing to establish and optimize their processes, our wrk specialists will help you build the foundational systems you need to improve your core business operations.',
    features: [
      'Process mapping and workflow design',
      'Zoho CRM implementation and configuration',
      'Notion workspace builds',
      'Ongoing optimization sprints',
    ],
  },
  admin: {
    tab: 'Admin',
    headline: 'offload administrative tasks',
    body: 'for start-ups and SMBs needing to offload administrative tasks, our wrk specialists will handle your admin work so you can focus on running your business.',
    features: [
      'Inbox and calendar management',
      'Research, reporting, data entry',
      'CRM hygiene and maintenance',
      'Operations coordination',
    ],
  },
  marketing: {
    tab: 'Marketing',
    headline: 'increase your brand awareness and reach',
    body: 'for entrepreneurs and business owners looking to increase their brand awareness and reach, our wrk specialists will help you grow and nurture a community and build your brand reputation.',
    features: [
      'Blog and newsletter production',
      'LinkedIn and social media management',
      'Email campaign setup and execution',
      'SEO and content strategy',
    ],
  },
  sales: {
    tab: 'Sales',
    headline: 'boost your sales potential',
    body: 'for start-ups to established businesses aiming to boost sales, our wrk specialists can help identify growth opportunities and maximize your sales potential.',
    features: [
      'BDR outreach programs',
      'Lead list research and enrichment',
      'CRM data management',
      'Follow-up sequence execution',
    ],
  },
} as const

type ServiceKey = keyof typeof SERVICES

const INDUSTRIES = [
  { title: 'Professional Services', icon: '⚖️' },
  { title: 'Entrepreneurs', icon: '🚀' },
  { title: 'Start-ups', icon: '💡' },
  { title: 'Creative Services', icon: '🎨' },
  { title: 'E-commerce', icon: '🛒' },
  { title: 'Tech, IT, and Software', icon: '💻' },
]

const TESTIMONIALS = [
  {
    name: 'Mathew Glowacki', company: 'MPG Law', rating: 5,
    text: 'Are you an owner of a growing business and are finding yourself bogged down with all the nitty-gritty aspects of the business? Tyler and his experienced team are great to work with.',
  },
  {
    name: 'Andrew Thurston', company: 'BeSpoke Contracting', rating: 5,
    text: 'The entire team at wrksourcing are amazing to deal with. If you are looking to free up time in your day, I highly recommend using wrksourcing.',
  },
  {
    name: 'Stephanie van Dam', company: 'Sandler', rating: 5,
    text: 'wrksourcing has been an integral part of the growth of my business. I am so grateful for the ease of interaction, communication structure, and expertise of the team.',
  },
  {
    name: 'Mike Stroh', company: 'Starts w/ Me', rating: 5,
    text: 'I have thoroughly enjoyed working with wrksourcing! We found great matches for my needs and it has been great customer service.',
  },
  {
    name: 'Mike Antico', company: 'Green Link Recycling', rating: 5,
    text: 'Working with Tyler and his team is an absolute pleasure. Very professional, and resourceful for whatever your companies unique needs are.',
  },
  {
    name: 'Tom Hall', company: 'BluRoot', rating: 5,
    text: 'The talent that wrksourcing has provided our business is excellent — skilled individuals, who can contribute immediately.',
  },
]

const STEPS = [
  { n: '01', title: 'Take a Free Discovery Call', desc: "Let's find out what you need. We want to get to know you as a person, as well as your business needs. We dig deep." },
  { n: '02', title: 'We Match You', desc: "After we get to know you and gain a clear picture of what your business needs, our approach is personalized based on your business' goals and current challenges." },
  { n: '03', title: 'New Wrkflow Begins!', desc: "Now that we've established the groundwrk, you can spend time on what matters most — running your business. Our team will assist you with onboarding and ongoing support." },
]

// ─────────────────────────────────────────────
// ROTATING TEXT WORDS
// ─────────────────────────────────────────────
const ROTATING_WORDS = [
  'creative wrkflow solutions',
  'general admin',
  'marketing',
  'sales',
  'project-based wrk',
]

// ─────────────────────────────────────────────
// ANIMATION VARIANTS
// ─────────────────────────────────────────────
const smoothEase = [0.25, 0.46, 0.45, 0.94] as const

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.7, ease: smoothEase },
  },
}

const fadeScale = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1, scale: 1,
    transition: { duration: 0.55, ease: smoothEase },
  },
}

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.15 } },
}

const staggerItem = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.55, ease: smoothEase },
  },
}

// ─────────────────────────────────────────────
// ANIMATED COUNTER
// ─────────────────────────────────────────────
function AnimatedCounter({ target, suffix }: { target: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!inView) return
    let start = 0
    const duration = 1800
    const step = Math.ceil(target / (duration / 16))
    const timer = setInterval(() => {
      start += step
      if (start >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(start)
      }
    }, 16)
    return () => clearInterval(timer)
  }, [inView, target])

  return <span ref={ref}>{inView ? count : 0}{suffix}</span>
}

// ─────────────────────────────────────────────
// ROTATING TEXT
// ─────────────────────────────────────────────
function RotatingText() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex(i => (i + 1) % ROTATING_WORDS.length)
    }, 2800)
    return () => clearInterval(timer)
  }, [])

  return (
    <span style={{ display: 'inline-block', position: 'relative', height: '1.4em', verticalAlign: 'bottom' }}>
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -24 }}
          transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{
            display: 'inline-block',
            color: B.accent,
            fontFamily: SERIF,
            fontStyle: 'italic',
            fontWeight: 400,
            position: 'absolute',
            left: 0,
            whiteSpace: 'nowrap',
          }}
        >
          {ROTATING_WORDS[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

// ─────────────────────────────────────────────
// STARS
// ─────────────────────────────────────────────
function Stars({ n }: { n: number }) {
  return (
    <span style={{ display: 'flex', gap: 3 }}>
      {Array.from({ length: n }).map((_, i) => (
        <svg key={i} width="15" height="15" viewBox="0 0 20 20" fill={B.accent}>
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </span>
  )
}

// ─────────────────────────────────────────────
// SECTION WRAPPER
// ─────────────────────────────────────────────
function Section({ children, id, dark, style }: {
  children: React.ReactNode; id?: string; dark?: boolean;
  style?: React.CSSProperties
}) {
  return (
    <section id={id} style={{
      padding: '7rem 2rem',
      backgroundColor: dark ? B.dark : B.bg,
      position: 'relative',
      overflow: 'hidden',
      ...style,
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        {children}
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────
// SECTION HEADING
// ─────────────────────────────────────────────
function SectionHeading({ label, title, subtitle, dark, align = 'center' }: {
  label: string; title: string; subtitle?: string; dark?: boolean; align?: 'center' | 'left'
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={fadeUp}
      style={{ textAlign: align, marginBottom: 52 }}
    >
      <p style={{
        fontSize: '0.73rem', fontWeight: 700, letterSpacing: '0.14em',
        color: dark ? B.accent : B.forest, textTransform: 'uppercase', marginBottom: 14,
        fontFamily: FONT,
      }}>
        {label}
      </p>
      <h2 style={{
        fontSize: 'clamp(2rem, 4vw, 3.2rem)', fontWeight: 800,
        color: dark ? B.white : B.forest, letterSpacing: '-0.03em',
        lineHeight: 1.12, fontFamily: FONT,
        maxWidth: align === 'left' ? 520 : undefined,
      }}>
        {title}
      </h2>
      {subtitle && (
        <p style={{
          maxWidth: 560, margin: align === 'center' ? '18px auto 0' : '18px 0 0',
          color: dark ? 'rgba(255,255,255,0.5)' : B.muted,
          fontSize: '1.05rem', lineHeight: 1.72, fontFamily: FONT,
        }}>
          {subtitle}
        </p>
      )}
    </motion.div>
  )
}

// ─────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────
export default function Home() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeService, setService] = useState<ServiceKey>('wrkflow')
  const [tIdx, setTIdx] = useState(0)
  const [formSent, setFormSent] = useState(false)

  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 })

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => {
    const id = setInterval(() => setTIdx(i => (i + 1) % TESTIMONIALS.length), 6000)
    return () => clearInterval(id)
  }, [])

  const svc = SERVICES[activeService]

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setFormSent(true)
  }

  return (
    <div style={{ fontFamily: FONT, color: B.text, overflowX: 'hidden' }}>

      {/* NOISE OVERLAY */}
      <div className="noise-overlay" />

      {/* SCROLL PROGRESS */}
      <motion.div
        className="scroll-progress"
        style={{ scaleX }}
      />

      {/* ═══════════════════════ NAV ═══════════════════════ */}
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
          transition: 'background-color 0.4s, backdrop-filter 0.4s, box-shadow 0.4s',
          backgroundColor: scrolled ? 'rgba(14,26,22,0.85)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px) saturate(1.4)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(20px) saturate(1.4)' : 'none',
          boxShadow: scrolled ? '0 1px 0 rgba(222,234,136,0.08)' : 'none',
        }}
      >
        <div style={{
          maxWidth: 1200, margin: '0 auto', padding: '0 2rem',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 72,
        }}>
          <a href="/" style={{ textDecoration: 'none' }}>
            <span style={{
              fontSize: '1.45rem', fontWeight: 800, color: B.accent,
              letterSpacing: '-0.04em', fontFamily: FONT,
            }}>
              wrksourcing
            </span>
          </a>

          <div className="nav-desktop">
            {NAV.map(l => (
              <a key={l.href} className="nav-link" href={l.href}>{l.label}</a>
            ))}
            <a className="btn-primary" href="#contact"
              style={{ fontSize: '0.8rem', padding: '0.6rem 1.4rem' }}>
              BOOK A FREE CALL
            </a>
          </div>

          <button className="nav-mobile-btn" onClick={() => setMenuOpen(o => !o)} aria-label="Menu">
            <svg width="26" height="26" fill="none" stroke={B.accent} strokeWidth="2" viewBox="0 0 24 24">
              {menuOpen
                ? <path strokeLinecap="round" d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" d="M4 6h16M4 12h16M4 18h16" />}
            </svg>
          </button>
        </div>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              style={{ overflow: 'hidden', backgroundColor: 'rgba(14,26,22,0.95)', borderTop: `1px solid ${B.accentDim}` }}
            >
              <div style={{ padding: '1rem 2rem 1.5rem' }}>
                {NAV.map(l => (
                  <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)}
                    style={{ display: 'block', color: 'rgba(255,255,255,0.75)', textDecoration: 'none', padding: '0.85rem 0', fontSize: '1rem', fontWeight: 500, borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                    {l.label}
                  </a>
                ))}
                <a href="#contact" onClick={() => setMenuOpen(false)}
                  style={{ display: 'block', marginTop: '1.25rem', textAlign: 'center' }}
                  className="btn-primary">
                  BOOK A FREE CALL
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* ═══════════════════════ HERO ═══════════════════════ */}
      <section style={{
        minHeight: '100vh', backgroundColor: B.dark, display: 'flex', alignItems: 'center',
        padding: '130px 2rem 100px', position: 'relative', overflow: 'hidden',
      }}>
        {/* Orbs */}
        <div className="hero-orb hero-orb-1" />
        <div className="hero-orb hero-orb-2" />
        <div className="hero-orb hero-orb-3" />
        <div className="grid-pattern" />

        <div style={{ maxWidth: 1200, margin: '0 auto', width: '100%', position: 'relative', zIndex: 1 }}>
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: 28,
              background: 'rgba(222,234,136,0.08)', border: '1px solid rgba(222,234,136,0.18)',
              borderRadius: 100, padding: '0.4rem 1.2rem',
            }}
          >
            <span className="badge-dot" />
            <span style={{ color: B.accent, fontSize: '0.76rem', fontWeight: 700, letterSpacing: '0.08em' }}>
              growing businesses since 2019
            </span>
          </motion.div>

          {/* Headline with word-by-word reveal */}
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.1, delay: 0.3 }}
            style={{
              fontSize: 'clamp(2.8rem, 5.8vw, 5rem)', fontWeight: 800,
              color: B.white, lineHeight: 1.06, letterSpacing: '-0.04em',
              marginBottom: 28, maxWidth: 800, fontFamily: FONT,
            }}
          >
            {'expert support for '.split(' ').map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 + i * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
                style={{ display: 'inline-block', marginRight: '0.3em' }}
              >
                {word}
              </motion.span>
            ))}
            <motion.span
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.72, ease: [0.25, 0.46, 0.45, 0.94] }}
              style={{ display: 'inline-block', marginRight: '0.3em' }}
            >
              <span style={{ fontFamily: SERIF, fontStyle: 'italic', color: B.accent, fontWeight: 400 }}>
                entrepreneurs
              </span>
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              style={{ display: 'inline-block', marginRight: '0.3em' }}
            >
              and
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.88 }}
              style={{ display: 'inline-block' }}
            >
              SMBs.
            </motion.span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
            style={{
              fontSize: 'clamp(1.05rem, 2vw, 1.25rem)', color: 'rgba(255,255,255,0.55)',
              lineHeight: 1.78, marginBottom: 12, maxWidth: 620,
            }}
          >
            200,000+ hours of proven results across{' '}
            <RotatingText />
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.1 }}
            style={{
              fontSize: 'clamp(0.92rem, 1.5vw, 1rem)', color: 'rgba(255,255,255,0.38)',
              lineHeight: 1.75, marginBottom: 44, maxWidth: 520,
            }}
          >
            growing businesses since 2019, we combine decades of experience with innovative
            strategies that streamline processes, maximize efficiency, and scale with confidence.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.15 }}
            className="hero-cta-row"
            style={{ display: 'flex', gap: 14, marginBottom: 72, flexWrap: 'wrap' }}
          >
            <a className="btn-primary" href="#contact" style={{ fontSize: '0.88rem' }}>
              BOOK A FREE CALL
            </a>
            <a className="btn-outline" href="#services">
              EXPLORE OUR SERVICES →
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.4 }}
            className="stats-grid"
            style={{
              display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 32,
              borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: 44,
            }}
          >
            {STATS.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.5 + i * 0.1 }}
              >
                <div style={{
                  fontSize: 'clamp(2.2rem, 3.5vw, 2.8rem)', fontWeight: 800,
                  color: B.accent, letterSpacing: '-0.04em', lineHeight: 1,
                }}>
                  <AnimatedCounter target={s.value} suffix={s.suffix} />
                </div>
                <div style={{
                  fontSize: '0.8rem', color: 'rgba(255,255,255,0.38)',
                  marginTop: 8, fontWeight: 500, letterSpacing: '0.01em',
                }}>
                  {s.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════ LOGO STRIP ═══════════════════════ */}
      <section style={{
        backgroundColor: B.dark, padding: '2.5rem 0',
        borderTop: '1px solid rgba(255,255,255,0.04)',
        borderBottom: '1px solid rgba(255,255,255,0.04)',
        overflow: 'hidden',
      }}>
        <p style={{
          textAlign: 'center', fontSize: '0.7rem', fontWeight: 700,
          letterSpacing: '0.14em', color: 'rgba(255,255,255,0.25)',
          textTransform: 'uppercase', marginBottom: 22,
        }}>
          Trusted by growing companies across Canada
        </p>
        <div style={{ overflow: 'hidden', position: 'relative' }}>
          <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 100, background: `linear-gradient(to right, ${B.dark}, transparent)`, zIndex: 2, pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: 100, background: `linear-gradient(to left, ${B.dark}, transparent)`, zIndex: 2, pointerEvents: 'none' }} />
          <div className="logo-strip">
            {[...CLIENT_LOGOS, ...CLIENT_LOGOS].map((name, i) => (
              <div key={i} style={{
                flexShrink: 0, padding: '0.5rem 1.8rem', marginRight: 14,
                border: '1px solid rgba(222,234,136,0.1)', borderRadius: 8,
                fontSize: '0.8rem', fontWeight: 700, color: 'rgba(255,255,255,0.4)',
                letterSpacing: '0.03em', background: 'rgba(222,234,136,0.03)',
                whiteSpace: 'nowrap', transition: 'all 0.3s',
              }}>
                {name}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════ WHY WRKSOURCING ═══════════════════════ */}
      <Section id="about">
        <SectionHeading
          label="Why wrksourcing?"
          title="Built different. On purpose."
          subtitle="We combine decades of experience with innovative strategies. Partner with us for streamlined processes, specialized expertise, and smarter workflows."
        />
        <motion.div
          className="pillars-grid"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 16 }}
        >
          {PILLARS.map((p) => (
            <motion.div
              key={p.title}
              variants={staggerItem}
              className="card"
              whileHover={{ y: -6, boxShadow: '0 20px 60px rgba(37,53,48,0.14)' }}
              style={{ padding: '2rem 1.5rem', cursor: 'default' }}
            >
              <div style={{ marginBottom: 14, opacity: 0.9 }}>{p.icon}</div>
              <div style={{
                display: 'inline-block', background: 'rgba(222,234,136,0.2)',
                borderRadius: 5, padding: '0.22rem 0.7rem',
                fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.1em',
                color: B.forest, textTransform: 'uppercase', marginBottom: 12,
              }}>
                {p.title}
              </div>
              <p style={{ fontSize: '0.87rem', color: B.muted, lineHeight: 1.68 }}>{p.desc}</p>
            </motion.div>
          ))}
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          style={{ textAlign: 'center', marginTop: 44 }}
        >
          <a className="btn-dark" href="#contact">WRK SMARTER TODAY</a>
        </motion.div>
      </Section>

      <div className="section-divider" />

      {/* ═══════════════════════ SERVICES ═══════════════════════ */}
      <Section id="services" dark>
        <SectionHeading
          label="Services & Pricing"
          title="what we do best."
          dark
          align="left"
        />

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 40 }}
        >
          {(Object.keys(SERVICES) as ServiceKey[]).map(k => (
            <button key={k} onClick={() => setService(k)}
              className={`service-tab${activeService === k ? ' active' : ''}`}>
              {SERVICES[k].tab}
            </button>
          ))}
        </motion.div>

        {/* Content */}
        <div className="services-layout" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3.5rem', alignItems: 'start' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeService}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.35 }}
            >
              <h3 style={{
                fontSize: 'clamp(1.6rem, 2.8vw, 2.2rem)', fontWeight: 800,
                color: B.white, letterSpacing: '-0.025em', lineHeight: 1.18, marginBottom: 18,
              }}>
                {svc.headline}
              </h3>
              <p style={{ color: 'rgba(255,255,255,0.55)', lineHeight: 1.78, fontSize: '1rem', marginBottom: 32 }}>
                {svc.body}
              </p>
              <a className="btn-primary" href="#contact">Get a quote →</a>
            </motion.div>
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeService + '-features'}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35, delay: 0.05 }}
              className="card-dark"
              style={{ padding: '2rem' }}
            >
              <p style={{
                fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.12em',
                color: B.accent, textTransform: 'uppercase', marginBottom: 18,
              }}>
                What&apos;s included
              </p>
              {svc.features.map((f, i) => (
                <motion.div
                  key={f}
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.07 }}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 14,
                    padding: '0.85rem 0',
                    borderBottom: i < svc.features.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none',
                  }}
                >
                  <div style={{
                    width: 7, height: 7, borderRadius: '50%',
                    background: `linear-gradient(135deg, ${B.gradient1}, ${B.gradient2})`,
                    flexShrink: 0,
                  }} />
                  <span style={{ color: 'rgba(255,255,255,0.78)', fontSize: '0.9rem' }}>{f}</span>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </Section>

      {/* ═══════════════════════ INDUSTRIES ═══════════════════════ */}
      <Section>
        <SectionHeading
          label="Industries"
          title="from emerging startups to industry giants."
          subtitle="we fuel growth across diverse sectors"
        />
        <motion.div
          className="industries-grid"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 14 }}
        >
          {INDUSTRIES.map((ind) => (
            <motion.div
              key={ind.title}
              variants={fadeScale}
              className="card"
              whileHover={{
                y: -6,
                borderColor: B.accent,
                boxShadow: `0 12px 40px rgba(222,234,136,0.08)`,
              }}
              style={{ padding: '2rem 1rem', textAlign: 'center', cursor: 'default' }}
            >
              <div style={{ fontSize: '2rem', marginBottom: 12 }}>{ind.icon}</div>
              <p style={{ fontWeight: 700, fontSize: '0.82rem', color: B.forest, lineHeight: 1.35 }}>
                {ind.title}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </Section>

      <div className="section-divider" />

      {/* ═══════════════════════ TESTIMONIALS ═══════════════════════ */}
      <Section dark>
        <SectionHeading
          label="Client Reviews"
          title="real results corner."
          dark
        />

        {/* Featured testimonial */}
        <div style={{ maxWidth: 700, margin: '0 auto 40px', textAlign: 'center', minHeight: 180 }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={tIdx}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.45 }}
            >
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }}>
                <Stars n={TESTIMONIALS[tIdx].rating} />
              </div>
              <blockquote style={{
                fontSize: 'clamp(1.05rem, 2vw, 1.22rem)', color: 'rgba(255,255,255,0.85)',
                lineHeight: 1.75, margin: '0 0 1.25rem', fontStyle: 'italic',
              }}>
                &ldquo;{TESTIMONIALS[tIdx].text}&rdquo;
              </blockquote>
              <p style={{ fontWeight: 700, color: B.accent, fontSize: '0.92rem' }}>
                {TESTIMONIALS[tIdx].name}
              </p>
              <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.78rem', marginTop: 4 }}>
                {TESTIMONIALS[tIdx].company}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dots */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 7, marginBottom: 44 }}>
          {TESTIMONIALS.map((_, i) => (
            <button key={i} className="dot-btn"
              onClick={() => setTIdx(i)}
              style={{
                width: tIdx === i ? 28 : 8,
                backgroundColor: tIdx === i ? B.accent : 'rgba(255,255,255,0.15)',
              }}
              aria-label={`Testimonial ${i + 1}`}
            />
          ))}
        </div>

        {/* Grid */}
        <motion.div
          className="testimonials-grid"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}
        >
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={i}
              variants={staggerItem}
              onClick={() => setTIdx(i)}
              whileHover={{ y: -4 }}
              style={{
                background: tIdx === i ? 'rgba(222,234,136,0.08)' : B.glass,
                borderRadius: 12, padding: '1.5rem',
                border: `1px solid ${tIdx === i ? 'rgba(222,234,136,0.22)' : B.glassBorder}`,
                cursor: 'pointer', transition: 'background 0.3s, border-color 0.3s',
              }}
            >
              <Stars n={t.rating} />
              <p style={{
                color: 'rgba(255,255,255,0.6)', fontSize: '0.84rem',
                lineHeight: 1.65, margin: '12px 0', fontStyle: 'italic',
              }}>
                &ldquo;{t.text.length > 110 ? t.text.slice(0, 110) + '…' : t.text}&rdquo;
              </p>
              <p style={{ fontWeight: 700, color: B.white, fontSize: '0.8rem' }}>{t.name}</p>
              <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.72rem', marginTop: 3 }}>{t.company}</p>
            </motion.div>
          ))}
        </motion.div>
      </Section>

      {/* ═══════════════════════ HOW IT WORKS ═══════════════════════ */}
      <Section id="how-it-works">
        <SectionHeading
          label="How It Works"
          title="Three steps. Zero fluff."
        />
        <motion.div
          className="steps-grid"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}
        >
          {STEPS.map((s) => (
            <motion.div
              key={s.n}
              variants={staggerItem}
              className="card"
              whileHover={{ y: -6 }}
              style={{ padding: '2.5rem 2rem', position: 'relative' }}
            >
              <div style={{
                fontSize: '3.6rem', fontWeight: 800, lineHeight: 1, marginBottom: 18,
                background: `linear-gradient(135deg, ${B.gradient1}, ${B.gradient2})`,
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                letterSpacing: '-0.06em',
              }}>
                {s.n}
              </div>
              <h3 style={{ fontWeight: 700, fontSize: '1.08rem', color: B.forest, marginBottom: 12, lineHeight: 1.3 }}>
                {s.title}
              </h3>
              <p style={{ color: B.muted, fontSize: '0.88rem', lineHeight: 1.72 }}>{s.desc}</p>
            </motion.div>
          ))}
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          style={{ textAlign: 'center', marginTop: 48 }}
        >
          <a className="btn-dark" href="#contact">WRK SMARTER TODAY</a>
        </motion.div>
      </Section>

      <div className="section-divider" />

      {/* ═══════════════════════ CTA + FORM ═══════════════════════ */}
      <Section id="contact" dark style={{ padding: '8rem 2rem' }}>
        {/* Background glow */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0,
          background: 'radial-gradient(ellipse 60% 50% at 50% 100%, rgba(222,234,136,0.06) 0%, transparent 60%), radial-gradient(ellipse 40% 40% at 20% 20%, rgba(118,214,105,0.04) 0%, transparent 60%)',
        }} />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          style={{ maxWidth: 680, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}
        >
          <h2 style={{
            fontSize: 'clamp(2.2rem, 5vw, 3.6rem)', fontWeight: 800,
            color: B.white, letterSpacing: '-0.035em', lineHeight: 1.1, marginBottom: 18,
          }}>
            let&apos;s make your brand{' '}
            <span style={{ fontFamily: SERIF, fontStyle: 'italic', color: B.accent, fontWeight: 400 }}>
              unforgettable
            </span>
            , shall we?
          </h2>
          <p style={{
            color: 'rgba(255,255,255,0.5)', fontSize: '1.05rem',
            lineHeight: 1.75, marginBottom: 44,
          }}>
            find out what partnering with wrksourcing can do for you.
            schedule a chat now for a free assessment to identify your business support needs.
          </p>

          <AnimatePresence mode="wait">
            {formSent ? (
              <motion.div
                key="sent"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{
                  background: 'rgba(222,234,136,0.08)', border: '1px solid rgba(222,234,136,0.25)',
                  borderRadius: 18, padding: '3.5rem 2rem',
                }}
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
                  style={{ fontSize: '3rem', marginBottom: 16 }}
                >
                  ✓
                </motion.div>
                <p style={{ color: B.accent, fontWeight: 700, fontSize: '1.15rem', marginBottom: 8 }}>
                  Message received.
                </p>
                <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem' }}>
                  We&apos;ll be in touch within one business day.
                </p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: 18, padding: '2.5rem',
                  backdropFilter: 'blur(12px)',
                }}
              >
                <div className="form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 14 }}>
                  <div style={{ textAlign: 'left' }}>
                    <label className="form-label">First Name</label>
                    <input type="text" placeholder="Tyler" required className="form-input" />
                  </div>
                  <div style={{ textAlign: 'left' }}>
                    <label className="form-label">Company</label>
                    <input type="text" placeholder="Acme Inc." required className="form-input" />
                  </div>
                </div>
                <div style={{ marginBottom: 14, textAlign: 'left' }}>
                  <label className="form-label">Work Email</label>
                  <input type="email" placeholder="tyler@yourcompany.com" required className="form-input" />
                </div>
                <div style={{ marginBottom: 14, textAlign: 'left' }}>
                  <label className="form-label">Monthly Revenue (approx.)</label>
                  <select required className="form-input" defaultValue="" style={{ cursor: 'pointer' }}>
                    <option value="" disabled>Select a range</option>
                    <option>Under $500K/yr</option>
                    <option>$500K – $2M/yr</option>
                    <option>$2M – $5M/yr</option>
                    <option>$5M+/yr</option>
                  </select>
                </div>
                <div style={{ marginBottom: 22, textAlign: 'left' }}>
                  <label className="form-label">What do you need help with?</label>
                  <textarea rows={3} placeholder="We need help with admin support, CRM setup, and social media..." required className="form-input" style={{ resize: 'vertical' }} />
                </div>
                <button type="submit" className="btn-primary" style={{ width: '100%', padding: '1.05rem', fontSize: '0.92rem', letterSpacing: '0.03em' }}>
                  BOOK OUR DISCOVERY CALL →
                </button>
                <p style={{ textAlign: 'center', marginTop: 14, fontSize: '0.76rem', color: 'rgba(255,255,255,0.25)' }}>
                  No commitment. No pitch deck. Just a conversation.
                </p>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </Section>

      {/* ═══════════════════════ FOOTER ═══════════════════════ */}
      <footer style={{
        backgroundColor: '#0a1410', padding: '3.5rem 2rem',
        borderTop: '1px solid rgba(255,255,255,0.04)',
      }}>
        <div className="footer-inner" style={{
          maxWidth: 1200, margin: '0 auto',
          display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
          gap: 32, flexWrap: 'wrap',
        }}>
          <div>
            <div style={{ fontSize: '1.35rem', fontWeight: 800, color: B.accent, marginBottom: 8, letterSpacing: '-0.04em' }}>
              wrksourcing
            </div>
            <p style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.25)', maxWidth: 260, lineHeight: 1.6 }}>
              wrksourcing connects businesses with highly skilled remote wrk specialists to optimize
              strategy, workflow, and execution.
            </p>
          </div>

          <div className="footer-links" style={{ display: 'flex', gap: 28, flexWrap: 'wrap' }}>
            {NAV.map(l => (
              <a key={l.href} href={l.href} style={{
                color: 'rgba(255,255,255,0.35)', textDecoration: 'none',
                fontSize: '0.85rem', transition: 'color 0.25s',
              }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = B.accent }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.35)' }}
              >
                {l.label}
              </a>
            ))}
          </div>

          <div style={{ display: 'flex', gap: 10 }}>
            {[
              { label: 'FB', href: '#' },
              { label: 'IG', href: '#' },
              { label: 'LI', href: '#' },
            ].map(s => (
              <a key={s.label} href={s.href} style={{
                width: 38, height: 38, borderRadius: '50%',
                background: 'rgba(255,255,255,0.05)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'rgba(255,255,255,0.4)', textDecoration: 'none',
                fontSize: '0.65rem', fontWeight: 700, transition: 'all 0.3s',
                border: '1px solid rgba(255,255,255,0.06)',
              }}
                onMouseEnter={e => { const el = e.currentTarget; el.style.background = B.accent; el.style.color = B.forest; el.style.borderColor = B.accent }}
                onMouseLeave={e => { const el = e.currentTarget; el.style.background = 'rgba(255,255,255,0.05)'; el.style.color = 'rgba(255,255,255,0.4)'; el.style.borderColor = 'rgba(255,255,255,0.06)' }}
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>

        <div className="footer-bottom" style={{
          maxWidth: 1200, margin: '2rem auto 0', paddingTop: '1.5rem',
          borderTop: '1px solid rgba(255,255,255,0.04)',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          flexWrap: 'wrap', gap: 12,
        }}>
          <p style={{ color: 'rgba(255,255,255,0.18)', fontSize: '0.75rem' }}>
            © 2025 wrksourcing. All rights reserved.
          </p>
          <div style={{ display: 'flex', gap: 20 }}>
            {['Privacy Policy', 'Terms & Conditions'].map(l => (
              <a key={l} href="#" style={{
                color: 'rgba(255,255,255,0.18)', textDecoration: 'none', fontSize: '0.75rem',
                transition: 'color 0.25s',
              }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.5)' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.18)' }}
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
