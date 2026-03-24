'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence, useInView, useScroll, useSpring } from 'framer-motion'
import { PixelTrail } from './components/pixel-trail'
import { GlowingCard } from './components/glowing-card'
import { Footer } from './components/footer'

// ─────────────────────────────────────────────
// CONTENT DATA (exact wrksourcing.com copy)
// ─────────────────────────────────────────────
const NAV = [
  { label: 'Services', href: '#services' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'How It Wrks', href: '#how-it-works' },
  { label: 'About Us', href: '#about' },
  { label: 'Contact Us', href: '#contact' },
]

const CLIENT_LOGOS = [
  'BluRoot', 'Hive Growth', 'Pilot Solutions', 'Consilium Wealth',
  'National Wireless', 'Practice Perfect', 'Open Doors Mortgage',
  'MSP Saber', 'FP Fitness', 'MPG Law', 'Green Link', 'Sandler',
  'BeSpoke', 'Starts w/ Me', 'Liddiard Law', 'Goldfarm',
]

const ROTATING_WORDS = [
  'creative wrkflow solutions',
  'general admin',
  'marketing',
  'sales',
  'project-based wrk',
]

const STATS = [
  { value: 200, suffix: 'K+', label: 'hours delivered' },
  { value: 85,  suffix: '+',  label: 'active clients' },
  { value: 50,  suffix: '+',  label: 'wrk Specialists' },
  { value: 95,  suffix: '%',  label: 'client retention' },
]

// Singular pillar icons (clean, minimal, white stroke)
const PillarIcon = ({ d }: { d: string }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--mantis-a)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d={d} />
  </svg>
)

const PILLARS = [
  {
    title: 'Process',
    desc: 'we audit before we hire. every engagement starts with understanding your workflows.',
    iconPath: 'M4 12h16M4 6h16M4 18h10',
  },
  {
    title: 'Personalization',
    desc: 'no cookie-cutter placements. every specialist matched to your specific needs.',
    iconPath: 'M12 3v18M3 12h18',
  },
  {
    title: 'People',
    desc: 'trained, retained, and continuously developed wrk Specialists. not freelancers.',
    iconPath: 'M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2',
  },
  {
    title: 'Platforms',
    desc: 'Zoho, Notion, n8n, Clockify. we build around the tools that run your business.',
    iconPath: 'M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z',
  },
  {
    title: 'Partners',
    desc: 'strategic relationships that expand what wrksourcing delivers for you.',
    iconPath: 'M7 17l9.2-9.2M17 17V7H7',
  },
]

const SERVICES = [
  {
    title: 'wrkflow Solutions',
    desc: 'for businesses needing to establish and optimize their processes, our wrk specialists will help you build the foundational systems you need to improve your core business operations.',
    iconPath: 'M5 12h14M12 5l7 7-7 7',
  },
  {
    title: 'Admin',
    desc: 'for start-ups and SMBs needing to offload administrative tasks, our wrk specialists will handle your admin work so you can focus on running your business.',
    iconPath: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2',
  },
  {
    title: 'Marketing',
    desc: 'for entrepreneurs and business owners looking to increase their brand awareness and reach, our wrk specialists will help you grow and nurture a community and build your brand reputation.',
    iconPath: 'M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z',
  },
  {
    title: 'Sales',
    desc: 'for start-ups to established businesses aiming to boost sales, our wrk specialists can help identify growth opportunities and maximize your sales potential.',
    iconPath: 'M3 17l6-6 4 4 8-8M17 7h4v4',
  },
]

const INDUSTRIES = [
  { title: 'Professional Services', iconPath: 'M3 21h18M5 21V7l7-4 7 4v14' },
  { title: 'Entrepreneurs', iconPath: 'M13 2L3 14h9l-1 8 10-12h-9l1-8z' },
  { title: 'Start-ups', iconPath: 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z' },
  { title: 'Creative Services', iconPath: 'M12 19l7-7 3 3-7 7-3-3zM18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z' },
  { title: 'E-commerce', iconPath: 'M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4zM3 6h18M16 10a4 4 0 01-8 0' },
  { title: 'Tech, IT, and Software', iconPath: 'M16 18l6-6-6-6M8 6l-6 6 6 6' },
]

const TESTIMONIALS = [
  { name: 'Mathew Glowacki', company: 'MPG Law', text: 'Are you an owner of a growing business and are finding yourself bogged down with all the nitty-gritty aspects of the business? Tyler and his experienced team are great to work with.' },
  { name: 'Andrew Thurston', company: 'BeSpoke Contracting', text: 'The entire team at wrksourcing are amazing to deal with. If you are looking to free up time in your day, I highly recommend using wrksourcing.' },
  { name: 'Stephanie van Dam', company: 'Sandler', text: 'wrksourcing has been an integral part of the growth of my business. I am so grateful for the ease of interaction, communication structure, and expertise of the team.' },
  { name: 'Mike Stroh', company: 'Starts w/ Me', text: 'I have thoroughly enjoyed working with wrksourcing! We found great matches for my needs and it has been great customer service.' },
  { name: 'Mike Antico', company: 'Green Link Recycling', text: 'Working with Tyler and his team is an absolute pleasure. Very professional, and resourceful for whatever your companies unique needs are.' },
  { name: 'Tom Hall', company: 'BluRoot', text: 'The talent that wrksourcing has provided our business is excellent — skilled individuals, who can contribute immediately.' },
]

const STEPS = [
  { n: '01', title: 'Take a Free Discovery Call', desc: "Let's find out what you need. We want to get to know you as a person, as well as your business needs. We dig deep and the more information you share, the better." },
  { n: '02', title: 'We Match You', desc: "After we get to know you and gain a clear picture of what your business needs, our approach is personalized based on your business' goals and current challenges. We start with the foundation and wrk our way up depending on the services you need." },
  { n: '03', title: 'Your New Wrkflow Begins', desc: "Now that we've established the groundwrk, you can spend time on what matters most — running your business. Our team will assist you with onboarding and ongoing support throughout your entire journey here at wrksourcing." },
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
// ANIMATED COUNTER
// ─────────────────────────────────────────────
function Counter({ target, suffix }: { target: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!inView) return
    let start = 0
    const duration = 1600
    const step = Math.ceil(target / (duration / 16))
    const timer = setInterval(() => {
      start += step
      if (start >= target) { setCount(target); clearInterval(timer) }
      else setCount(start)
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
    }, 3000)
    return () => clearInterval(timer)
  }, [])

  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', position: 'relative', height: '1.2em', verticalAlign: 'bottom' }}>
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: -40, filter: 'blur(10px)' }}
          transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{
            fontWeight: 600,
            background: 'linear-gradient(135deg, var(--mantis-a), var(--mantis-b))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            display: 'inline-block',
            position: 'absolute',
            left: 0,
            whiteSpace: 'nowrap',
          }}
        >
          {ROTATING_WORDS[index]}
        </motion.span>
      </AnimatePresence>
      <span style={{
        display: 'inline-block', width: 3, height: '0.85em',
        background: 'linear-gradient(180deg, var(--mantis-a), var(--mantis-b))',
        borderRadius: 2, marginLeft: 4,
        animation: 'blink 1s step-end infinite',
        position: 'relative', top: '0.05em',
      }} />
    </span>
  )
}

// ─────────────────────────────────────────────
// STARS
// ─────────────────────────────────────────────
function Stars() {
  return (
    <span style={{ display: 'inline-flex', gap: 2 }}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="16" height="16" viewBox="0 0 20 20" fill="#FBBC04">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </span>
  )
}

// ─────────────────────────────────────────────
// AVATAR (initials circle)
// ─────────────────────────────────────────────
function Avatar({ name }: { name: string }) {
  const initials = name.split(' ').map(n => n[0]).join('').slice(0, 2)
  return (
    <div style={{
      width: 40, height: 40, borderRadius: '50%',
      background: 'linear-gradient(135deg, var(--mantis-a), var(--mantis-b))',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: '0.78rem', fontWeight: 800, color: '#fff', flexShrink: 0,
    }}>
      {initials}
    </div>
  )
}


// ─────────────────────────────────────────────
// GOOGLE BADGE
// ─────────────────────────────────────────────
function GoogleBadge() {
  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: 8,
      background: '#fff', border: '1px solid var(--line)', borderRadius: 100,
      padding: '0.4rem 1rem', fontSize: '0.8rem', fontWeight: 600, color: 'var(--subtext)',
    }}>
      <svg width="16" height="16" viewBox="0 0 24 24">
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
      </svg>
      <Stars />
      <span>5.0</span>
    </div>
  )
}

// ─────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────
export default function Home() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [formSent, setFormSent] = useState(false)
  const heroRef = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 })

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  // Cursor-responsive gradient mesh
  useEffect(() => {
    const hero = heroRef.current
    if (!hero) return
    let rafId: number
    const onMove = (e: MouseEvent) => {
      cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(() => {
        const rect = hero.getBoundingClientRect()
        const x = ((e.clientX - rect.left) / rect.width) * 100
        const y = ((e.clientY - rect.top) / rect.height) * 100
        hero.style.setProperty('--mouse-x', `${x}%`)
        hero.style.setProperty('--mouse-y', `${y}%`)
      })
    }
    hero.addEventListener('mousemove', onMove, { passive: true })
    return () => { hero.removeEventListener('mousemove', onMove); cancelAnimationFrame(rafId) }
  }, [])

  return (
    <div style={{ fontFamily: "'Avenir', 'Plus Jakarta Sans', sans-serif" }}>

      {/* SKIP NAV (a11y) */}
      <a href="#main" style={{
        position: 'absolute', left: '-9999px', top: 'auto',
        width: '1px', height: '1px', overflow: 'hidden',
        zIndex: 10000, padding: '1rem', background: 'var(--forest)', color: 'var(--white)',
        fontSize: '0.9rem', fontWeight: 700, textDecoration: 'none',
      }} onFocus={e => { e.currentTarget.style.left = '1rem'; e.currentTarget.style.top = '1rem'; e.currentTarget.style.width = 'auto'; e.currentTarget.style.height = 'auto' }}
         onBlur={e => { e.currentTarget.style.left = '-9999px'; e.currentTarget.style.width = '1px'; e.currentTarget.style.height = '1px' }}>
        Skip to content
      </a>

      {/* SCROLL PROGRESS BAR */}
      <motion.div style={{
        scaleX, position: 'fixed', top: 0, left: 0, right: 0,
        height: 3, background: 'linear-gradient(90deg, var(--mantis-a), var(--mantis-b))',
        transformOrigin: 'left', zIndex: 9999,
      }} />

      {/* ═══════════════ NAV ═══════════════ */}
      <nav aria-label="Main navigation" style={{
        position: 'fixed', top: 3, left: 0, right: 0, zIndex: 100,
        transition: 'background-color 0.3s, backdrop-filter 0.3s, box-shadow 0.3s',
        backgroundColor: scrolled ? 'rgba(255,255,255,0.97)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
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
            <a className="btn-gradient" href="#contact" style={{ fontSize: '0.76rem', padding: '0.55rem 1.3rem' }}>
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

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              style={{ overflow: 'hidden', backgroundColor: 'var(--white)', borderTop: '1px solid var(--line)' }}
            >
              <div style={{ padding: '1rem 2rem 1.5rem' }}>
                {NAV.map(l => (
                  <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)}
                    style={{ display: 'block', color: 'var(--eerie)', textDecoration: 'none', padding: '0.8rem 0', fontSize: '1rem', fontWeight: 500, borderBottom: '1px solid var(--line)' }}>
                    {l.label}
                  </a>
                ))}
                <a href="#contact" onClick={() => setMenuOpen(false)}
                  className="btn-gradient" style={{ display: 'block', marginTop: '1rem', textAlign: 'center' }}>
                  BOOK A FREE CALL
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <main id="main">
      {/* ═══════════════ HERO ═══════════════ */}
      <section ref={heroRef} className="glass-hero-bg" style={{
        minHeight: '100vh',
        display: 'flex', alignItems: 'center',
        padding: '120px 2rem 80px',
        position: 'relative', overflow: 'hidden',
        '--mouse-x': '60%', '--mouse-y': '45%',
      } as React.CSSProperties}>
        {/* Interactive pixel trail background */}
        <PixelTrail pixelSize={70} fadeDuration={0} delay={1500} color="rgba(118,214,105,0.15)" />

        <div style={{
          maxWidth: 1200, margin: '0 auto', width: '100%',
          position: 'relative', zIndex: 1, pointerEvents: 'none',
        }}>
          <div style={{ maxWidth: 680, pointerEvents: 'auto' }}>
            <motion.h1
              className="hero-parallax"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              style={{
                fontSize: 'clamp(2.4rem, 4.5vw, 3.4rem)',
                fontWeight: 900, color: 'var(--eerie)',
                lineHeight: 1.12, letterSpacing: '-0.025em', marginBottom: 20,
              }}
            >
              expert support for entrepreneurs and SMBs.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              style={{ fontSize: '1.05rem', color: 'var(--subtext)', lineHeight: 1.6, marginBottom: 6 }}
            >
              200,000+ hours of proven results across
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.55 }}
              style={{ fontSize: 'clamp(2.6rem, 5vw, 3.6rem)', letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: 16, minHeight: '1.3em' }}
            >
              <RotatingText />
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.65 }}
              style={{ fontSize: '0.95rem', color: 'var(--muted)', lineHeight: 1.7, marginBottom: 36 }}
            >
              growing businesses since 2019, we combine decades of experience with innovative
              strategies that streamline processes, maximize efficiency, and scale with confidence.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="hero-cta-row" style={{ display: 'flex', gap: 14, flexWrap: 'wrap', alignItems: 'center' }}
            >
              <a className="btn-gradient" href="#contact">BOOK A FREE CALL</a>
              <a className="btn-outline" href="#services">EXPLORE OUR SERVICES</a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1 }}
              style={{ marginTop: 24 }}
            >
              <GoogleBadge />
            </motion.div>
          </div>

        </div>
      </section>

      {/* ═══════════════ STATS STRIP ═══════════════ */}
      <section style={{ backgroundColor: 'var(--seasalt)', padding: '2rem 2rem', borderBottom: '1px solid var(--line)' }}>
        <div className="stats-grid" style={{
          maxWidth: 1200, margin: '0 auto',
          display: 'flex', justifyContent: 'center', flexWrap: 'wrap',
          gap: '0.5rem 2.5rem',
        }}>
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.06}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
                <span style={{ fontSize: '1.4rem', fontWeight: 900, color: 'var(--eerie)', letterSpacing: '-0.02em' }}>
                  <Counter target={s.value} suffix={s.suffix} />
                </span>
                <span style={{ fontSize: '0.82rem', color: 'var(--muted)', fontWeight: 500 }}>{s.label}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ═══════════════ LOGO STRIP ═══════════════ */}
      <section style={{
        backgroundColor: '#fff', padding: '2.5rem 0',
        borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)',
        overflow: 'hidden',
      }}>
        <p style={{
          textAlign: 'center', fontSize: '0.72rem', fontWeight: 700,
          letterSpacing: '0.12em', color: 'var(--subtle)', textTransform: 'uppercase', marginBottom: 20,
        }}>
          trusted by the best
        </p>
        <div style={{ overflow: 'hidden', position: 'relative' }}>
          <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 100, background: 'linear-gradient(to right, #fff, transparent)', zIndex: 2, pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: 100, background: 'linear-gradient(to left, #fff, transparent)', zIndex: 2, pointerEvents: 'none' }} />
          <div className="logo-strip">
            {[...CLIENT_LOGOS, ...CLIENT_LOGOS].map((name, i) => (
              <div key={i} style={{
                flexShrink: 0, padding: '0.55rem 1.6rem', marginRight: 14,
                fontSize: '0.82rem', fontWeight: 700, color: 'var(--eerie)',
                letterSpacing: '0.03em', whiteSpace: 'nowrap',
                border: '1px solid var(--line)', borderRadius: 8,
                background: 'var(--seasalt)',
                opacity: 0.6,
              }}>
                {name}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ WHY WRKSOURCING ═══════════════ */}
      <section id="about" className="glass-mesh" style={{ padding: '6rem 2rem' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <Reveal>
            <div style={{ textAlign: 'center', marginBottom: 48 }}>
              <p className="scroll-reveal" style={{ fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.1em', color: 'var(--mantis-a)', textTransform: 'uppercase', marginBottom: 12 }}>
                why wrksourcing?
              </p>
              <h2 className="scroll-reveal" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', fontWeight: 900, color: 'var(--eerie)', letterSpacing: '-0.02em', lineHeight: 1.15, marginBottom: 16 }}>
                wrksourcing is driven by our passion for helping businesses grow and succeed.
              </h2>
              <p style={{ maxWidth: 680, margin: '0 auto', color: 'var(--subtext)', fontSize: '1.02rem', lineHeight: 1.75 }}>
                we wrk with companies of all sizes to streamline processes, access specialized expertise,
                and implement smarter ways of working — bringing your brand to new heights while giving
                you the freedom to prosper as a business owner. with wrksourcing, you don&apos;t just get a
                service — you gain a partner invested in your success.
              </p>
            </div>
          </Reveal>

          {/* Row 1: 3 cards */}
          <div className="pillars-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20, marginBottom: 20 }}>
            {PILLARS.slice(0, 3).map((p, i) => (
              <Reveal key={p.title} delay={i * 0.08}>
                <GlowingCard
                  title={p.title.toLowerCase()}
                  desc={p.desc}
                  icon={<PillarIcon d={p.iconPath} />}
                />
              </Reveal>
            ))}
          </div>
          {/* Row 2: 2 cards, centered */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 20, maxWidth: 'calc(66.666% + 7px)', margin: '0 auto' }} className="pillars-grid">
            {PILLARS.slice(3, 5).map((p, i) => (
              <Reveal key={p.title} delay={(i + 3) * 0.08}>
                <GlowingCard
                  title={p.title.toLowerCase()}
                  desc={p.desc}
                  icon={<PillarIcon d={p.iconPath} />}
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ SERVICES ═══════════════ */}
      <section id="services" style={{ padding: '6rem 2rem', backgroundColor: 'var(--forest)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <Reveal>
            <div style={{ textAlign: 'center', marginBottom: 48 }}>
              <p className="scroll-reveal" style={{ fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.1em', color: 'var(--mindaro)', textTransform: 'uppercase', marginBottom: 12 }}>services</p>
              <h2 className="scroll-reveal" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', fontWeight: 900, color: 'var(--white)', letterSpacing: '-0.02em', lineHeight: 1.15 }}>what we do best</h2>
            </div>
          </Reveal>

          {/* Asymmetric layout: featured card left, 3 stacked right */}
          <div className="services-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
            {/* Featured: wrkflow Solutions */}
            <Reveal delay={0.05}>
              <div className="glass-dark" style={{ overflow: 'hidden', height: '100%', display: 'flex', flexDirection: 'column' }}>
                <div className="service-card-bar" />
                <div style={{ padding: '2.5rem 2rem', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <div style={{
                    width: 52, height: 52, borderRadius: 12,
                    background: 'linear-gradient(135deg, var(--mantis-a), var(--mantis-b))',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20,
                  }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--white)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d={SERVICES[0].iconPath} />
                    </svg>
                  </div>
                  <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--white)', marginBottom: 14, letterSpacing: '-0.01em' }}>{SERVICES[0].title}</h3>
                  <p style={{ fontSize: '0.95rem', color: 'rgba(255,255,255,0.65)', lineHeight: 1.7 }}>{SERVICES[0].desc}</p>
                </div>
              </div>
            </Reveal>

            {/* 3 compact cards stacked */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {SERVICES.slice(1).map((s, i) => (
                <Reveal key={s.title} delay={0.1 + i * 0.08}>
                  <div className="glass-dark" style={{ overflow: 'hidden' }}>
                    <div className="service-card-bar" />
                    <div style={{ padding: '1.4rem 1.5rem', display: 'flex', alignItems: 'flex-start', gap: 16 }}>
                      <div style={{
                        width: 40, height: 40, borderRadius: 10, flexShrink: 0,
                        backgroundColor: 'rgba(255,255,255,0.1)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--mantis-a)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d={s.iconPath} />
                        </svg>
                      </div>
                      <div>
                        <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--white)', marginBottom: 6 }}>{s.title}</h3>
                        <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.55)', lineHeight: 1.6 }}>{s.desc}</p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ INDUSTRIES ═══════════════ */}
      <section style={{ padding: '5rem 2rem', backgroundColor: 'var(--seasalt)' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
          <Reveal>
            <p style={{ fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.1em', color: 'var(--mantis-a)', textTransform: 'uppercase', marginBottom: 12 }}>industries we serve</p>
            <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontWeight: 900, color: 'var(--eerie)', letterSpacing: '-0.02em', lineHeight: 1.2, marginBottom: 16 }}>
              from emerging startups to industry leaders
            </h2>
            <p style={{ maxWidth: 580, margin: '0 auto', color: 'var(--subtext)', fontSize: '1rem', lineHeight: 1.7, marginBottom: 32 }}>
              we fuel growth across diverse sectors, bridging the gap between your ambitions and
              your customers&apos; needs.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 10 }}>
              {INDUSTRIES.map((ind) => (
                <div key={ind.title} className="industry-pill scroll-reveal-card" style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  padding: '0.65rem 1.25rem', borderRadius: 100,
                  border: '1px solid var(--line)',
                  backgroundColor: 'var(--white)',
                  fontSize: '0.88rem', fontWeight: 600, color: 'var(--eerie)',
                  cursor: 'default',
                }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--mantis-a)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d={ind.iconPath} />
                  </svg>
                  {ind.title}
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════ TESTIMONIALS ═══════════════ */}
      <section style={{ padding: '6rem 2rem', backgroundColor: 'var(--seasalt)', borderTop: '1px solid var(--line)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <Reveal>
            <div style={{ textAlign: 'center', marginBottom: 40 }}>
              <p className="scroll-reveal" style={{ fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.1em', color: 'var(--mantis-a)', textTransform: 'uppercase', marginBottom: 12 }}>testimonials</p>
              <h2 className="scroll-reveal" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', fontWeight: 900, color: 'var(--eerie)', letterSpacing: '-0.02em', lineHeight: 1.15 }}>what our clients say</h2>
            </div>
          </Reveal>

          <div className="testimonials-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
            {TESTIMONIALS.slice(0, 3).map((t, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <div style={{
                  padding: '2rem', height: '100%',
                  backgroundColor: 'var(--white)',
                  border: '1px solid var(--line)',
                  borderRadius: 16,
                  display: 'flex', flexDirection: 'column',
                  transition: 'transform 0.25s cubic-bezier(0.25, 1, 0.5, 1), border-color 0.25s, box-shadow 0.25s',
                  cursor: 'default',
                }}
                onMouseEnter={e => { const el = e.currentTarget; el.style.transform = 'translateY(-3px)'; el.style.borderColor = 'rgba(118,214,105,0.3)'; el.style.boxShadow = '0 8px 24px rgba(0,0,0,0.06)' }}
                onMouseLeave={e => { const el = e.currentTarget; el.style.transform = 'translateY(0)'; el.style.borderColor = 'var(--line)'; el.style.boxShadow = 'none' }}
                >
                  <Stars />
                  <blockquote style={{
                    color: 'var(--subtext)', fontSize: '0.92rem', lineHeight: 1.7,
                    margin: '14px 0', fontStyle: 'italic', flex: 1,
                  }}>
                    &ldquo;{t.text}&rdquo;
                  </blockquote>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 'auto' }}>
                    <Avatar name={t.name} />
                    <div>
                      <p style={{ fontWeight: 700, color: 'var(--eerie)', fontSize: '0.88rem' }}>{t.name}</p>
                      <p style={{ color: 'var(--muted)', fontSize: '0.78rem' }}>{t.company}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.3}>
            <div style={{ textAlign: 'center', marginTop: 32 }}>
              <a href="https://www.google.com/search?q=wrksourcing+reviews" target="_blank" rel="noopener noreferrer"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  fontSize: '0.88rem', fontWeight: 600, color: 'var(--muted)',
                  transition: 'color 0.2s',
                }}
              >
                <GoogleBadge />
                <span style={{ marginLeft: 4 }}>read all reviews</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════ HOW IT WORKS ═══════════════ */}
      <section id="how-it-works" style={{ padding: '6rem 2rem', backgroundColor: 'var(--forest)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <Reveal>
            <div style={{ textAlign: 'center', marginBottom: 48 }}>
              <p className="scroll-reveal" style={{ fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.1em', color: 'var(--mindaro)', textTransform: 'uppercase', marginBottom: 12 }}>how it wrks</p>
              <h2 className="scroll-reveal" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', fontWeight: 900, color: 'var(--white)', letterSpacing: '-0.02em', lineHeight: 1.15 }}>three steps to get started</h2>
            </div>
          </Reveal>
          <div className="steps-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24, position: 'relative' }}>
            {/* Connector line */}
            <div className="steps-connector" style={{
              position: 'absolute', top: 24, left: 'calc(16.67% + 24px)', right: 'calc(16.67% + 24px)',
              height: 2, background: 'linear-gradient(90deg, var(--mantis-a), var(--mantis-b))', zIndex: 0,
              borderRadius: 1,
            }} />
            {STEPS.map((s, i) => (
              <Reveal key={s.n} delay={i * 0.15}>
                <div className="glass-dark" style={{ padding: '2rem 1.75rem', position: 'relative', zIndex: 1 }}>
                  <div className="step-number">{s.n}</div>
                  <h3 style={{ fontWeight: 700, fontSize: '1.05rem', color: '#fff', marginBottom: 10, lineHeight: 1.3 }}>{s.title}</h3>
                  <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.88rem', lineHeight: 1.7 }}>{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.3}>
            <div style={{ textAlign: 'center', marginTop: 40 }}>
              <a className="btn-gradient" href="#contact" style={{ boxShadow: '0 4px 20px rgba(118,214,105,0.3)' }}>wrk smarter today</a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════ CTA + FORM ═══════════════ */}
      <section id="contact" style={{ padding: '7rem 2rem', backgroundColor: 'var(--forest)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }} className="hero-grid">
          <Reveal>
            <div>
              <p style={{ fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.1em', color: 'var(--mindaro)', textTransform: 'uppercase', marginBottom: 12 }}>get started</p>
              <h2 style={{
                fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', fontWeight: 900,
                color: 'var(--white)', letterSpacing: '-0.025em', lineHeight: 1.12, marginBottom: 16,
              }}>
                ready to fix the bottleneck?
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '1rem', lineHeight: 1.72, marginBottom: 24 }}>
                book a free 30-minute assessment. we&apos;ll audit your workflows,
                identify what&apos;s slowing you down, and map out a plan to fix it.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            {formSent ? (
              <motion.div
                className="glass-dark"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
                style={{ padding: '3rem 2rem', textAlign: 'center' }}
              >
                <div style={{
                  width: 56, height: 56, borderRadius: '50%', margin: '0 auto 16px',
                  background: 'linear-gradient(135deg, var(--mantis-a), var(--mantis-b))',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  animation: 'checkmark-circle-fill 0.5s cubic-bezier(0.25, 1, 0.5, 1) forwards',
                }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--white)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6L9 17l-5-5" style={{ strokeDasharray: 24, animation: 'checkmark-draw 0.4s 0.3s cubic-bezier(0.25, 1, 0.5, 1) forwards', strokeDashoffset: 24 }} />
                  </svg>
                </div>
                <motion.p
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.3 }}
                  style={{ fontWeight: 700, color: 'var(--white)', fontSize: '1.1rem', marginBottom: 6 }}
                >message received.</motion.p>
                <motion.p
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.65, duration: 0.3 }}
                  style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem' }}
                >we&apos;ll be in touch within one business day.</motion.p>
              </motion.div>
            ) : (
              <form onSubmit={e => { e.preventDefault(); setFormSent(true) }} className="glass-dark" style={{
                padding: '2rem',
              }}>
                <div className="form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
                  <div>
                    <label htmlFor="contact-name" className="form-label" style={{ color: 'rgba(255,255,255,0.5)' }}>Your name</label>
                    <input id="contact-name" type="text" placeholder="Jane Smith" required className="form-input" />
                  </div>
                  <div>
                    <label htmlFor="contact-company" className="form-label" style={{ color: 'rgba(255,255,255,0.5)' }}>Company</label>
                    <input id="contact-company" type="text" placeholder="Acme Inc." required className="form-input" />
                  </div>
                </div>
                <div style={{ marginBottom: 12 }}>
                  <label htmlFor="contact-email" className="form-label" style={{ color: 'rgba(255,255,255,0.5)' }}>Work email</label>
                  <input id="contact-email" type="email" placeholder="jane@yourcompany.com" required className="form-input" />
                </div>
                <div style={{ marginBottom: 12 }}>
                  <label htmlFor="contact-message" className="form-label" style={{ color: 'rgba(255,255,255,0.5)' }}>What do you need help with?</label>
                  <textarea id="contact-message" rows={3} placeholder="We need help with..." required className="form-input" style={{ resize: 'vertical' }} />
                </div>
                <button type="submit" className="btn-gradient" style={{ width: '100%', padding: '0.9rem', fontSize: '0.85rem', display: 'block', textAlign: 'center' }}>
                  Book a free assessment
                </button>
              </form>
            )}
          </Reveal>
        </div>
      </section>

      </main>
      <Footer />
    </div>
  )
}
