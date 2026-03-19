'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence, useInView, useScroll, useSpring } from 'framer-motion'

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

// Custom gradient-filled icons (not generic stroke icons)
const GradDef = () => (
  <defs>
    <linearGradient id="wrk-grad" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stopColor="#76d669" />
      <stop offset="100%" stopColor="#DDEA7F" />
    </linearGradient>
  </defs>
)

const PILLARS = [
  {
    title: 'Process',
    desc: 'optimizing wrkflows for faster, more effective results. we audit before we hire, building the right foundation for your operations.',
    illustration: '/images/illustrations/process.svg',
    span: 'bento-wide',
  },
  {
    title: 'Personalization',
    desc: 'custom solutions built to fit your business. no cookie-cutter placements.',
    illustration: '/images/illustrations/tools.svg',
    span: '',
  },
  {
    title: 'People',
    desc: 'a team of skilled talent dedicated to drive your success. trained, retained, and continuously developed wrk Specialists.',
    illustration: '/images/illustrations/team.svg',
    span: 'bento-tall',
  },
  {
    title: 'Platforms',
    desc: 'equipping you with the right tools for growth. Zoho, Notion, n8n, Clockify.',
    illustration: '/images/illustrations/growth.svg',
    span: '',
  },
  {
    title: 'Partners',
    desc: 'continuously collaborating to create lasting value and impact across your entire operation.',
    illustration: '/images/illustrations/partnership.svg',
    span: 'bento-wide',
  },
]

const SERVICES = [
  {
    title: 'wrkflow Solutions',
    desc: 'for businesses needing to establish and optimize their processes, our wrk specialists will help you build the foundational systems you need to improve your core business operations.',
    // Interlocking arrows — flow/process
    icon: <><GradDef/><path d="M4 12h10" stroke="url(#wrk-grad)" strokeWidth="2.5" strokeLinecap="round"/><path d="M11 8l4 4-4 4" stroke="url(#wrk-grad)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/><path d="M20 12h-4" stroke="url(#wrk-grad)" strokeWidth="2.5" strokeLinecap="round" opacity="0.4"/></>,
  },
  {
    title: 'Admin',
    desc: 'for start-ups and SMBs needing to offload administrative tasks, our wrk specialists will handle your admin work so you can focus on running your business.',
    // Stacked cards — organized tasks
    icon: <><GradDef/><rect x="5" y="3" width="14" height="10" rx="2" fill="url(#wrk-grad)" opacity="0.35"/><rect x="3" y="7" width="14" height="10" rx="2" fill="url(#wrk-grad)" opacity="0.55"/><rect x="7" y="11" width="14" height="10" rx="2" fill="url(#wrk-grad)"/></>,
  },
  {
    title: 'Marketing',
    desc: 'for entrepreneurs and business owners looking to increase their brand awareness and reach, our wrk specialists will help you grow and nurture a community and build your brand reputation.',
    // Expanding ripples — reach/broadcast
    icon: <><GradDef/><circle cx="12" cy="12" r="3" fill="url(#wrk-grad)"/><circle cx="12" cy="12" r="7" fill="none" stroke="url(#wrk-grad)" strokeWidth="1.5" opacity="0.5"/><circle cx="12" cy="12" r="11" fill="none" stroke="url(#wrk-grad)" strokeWidth="1.5" opacity="0.25"/></>,
  },
  {
    title: 'Sales',
    desc: 'for start-ups to established businesses aiming to boost sales, our wrk specialists can help identify growth opportunities and maximize your sales potential.',
    // Rising bars — growth
    icon: <><GradDef/><rect x="3" y="14" width="4" height="7" rx="1" fill="url(#wrk-grad)" opacity="0.35"/><rect x="10" y="9" width="4" height="12" rx="1" fill="url(#wrk-grad)" opacity="0.6"/><rect x="17" y="4" width="4" height="17" rx="1" fill="url(#wrk-grad)"/></>,
  },
]

const INDUSTRIES = [
  { title: 'Professional Services', icon: <><GradDef/><rect x="4" y="6" width="16" height="14" rx="2" fill="url(#wrk-grad)" opacity="0.25"/><rect x="7" y="3" width="10" height="4" rx="1" fill="url(#wrk-grad)"/><rect x="8" y="12" width="8" height="1.5" rx="0.75" fill="url(#wrk-grad)" opacity="0.5"/><rect x="8" y="15.5" width="5" height="1.5" rx="0.75" fill="url(#wrk-grad)" opacity="0.35"/></> },
  { title: 'Entrepreneurs', icon: <><GradDef/><circle cx="12" cy="10" r="4" fill="url(#wrk-grad)" opacity="0.5"/><path d="M12 2v4" stroke="url(#wrk-grad)" strokeWidth="2.5" strokeLinecap="round"/><path d="M12 14v8" stroke="url(#wrk-grad)" strokeWidth="2.5" strokeLinecap="round"/><path d="M8 18h8" stroke="url(#wrk-grad)" strokeWidth="2.5" strokeLinecap="round" opacity="0.4"/></> },
  { title: 'Start-ups', icon: <><GradDef/><path d="M12 3l2.5 6h6l-5 4 2 6.5L12 16l-5.5 3.5 2-6.5-5-4h6z" fill="url(#wrk-grad)" opacity="0.6"/></> },
  { title: 'Creative Services', icon: <><GradDef/><circle cx="8" cy="16" r="5" fill="url(#wrk-grad)" opacity="0.3"/><circle cx="16" cy="16" r="5" fill="url(#wrk-grad)" opacity="0.3"/><circle cx="12" cy="9" r="5" fill="url(#wrk-grad)" opacity="0.3"/></> },
  { title: 'E-commerce', icon: <><GradDef/><rect x="3" y="8" width="18" height="13" rx="2" fill="url(#wrk-grad)" opacity="0.25"/><rect x="6" y="4" width="12" height="7" rx="1.5" fill="url(#wrk-grad)"/><circle cx="9" cy="17" r="1.5" fill="url(#wrk-grad)" opacity="0.5"/><circle cx="15" cy="17" r="1.5" fill="url(#wrk-grad)" opacity="0.5"/></> },
  { title: 'Tech, IT, and Software', icon: <><GradDef/><rect x="4" y="4" width="7" height="7" rx="1.5" fill="url(#wrk-grad)"/><rect x="13" y="4" width="7" height="7" rx="1.5" fill="url(#wrk-grad)" opacity="0.5"/><rect x="4" y="13" width="7" height="7" rx="1.5" fill="url(#wrk-grad)" opacity="0.5"/><rect x="13" y="13" width="7" height="7" rx="1.5" fill="url(#wrk-grad)" opacity="0.25"/></> },
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
  { n: '03', title: 'new wrkflow begins!', desc: "Now that we've established the groundwrk, you can spend time on what matters most — running your business. Our team will assist you with onboarding and ongoing support throughout your entire journey here at wrksourcing." },
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
            background: 'linear-gradient(135deg, #76d669, #DDEA7F)',
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
        background: 'linear-gradient(180deg, #76d669, #DDEA7F)',
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
// SOCIAL ICONS (SVG)
// ─────────────────────────────────────────────
const SOCIALS = [
  { label: 'Facebook', href: 'https://facebook.com/wrksourcing', icon: <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" /> },
  { label: 'Instagram', href: 'https://instagram.com/wrksourcing', icon: <><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><path d="M17.5 6.5h.01"/></> },
  { label: 'LinkedIn', href: 'https://linkedin.com/company/wrksourcing', icon: <><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-4 0v7h-4v-7a6 6 0 016-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></> },
]

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
  const [tIdx, setTIdx] = useState(0)
  const [formSent, setFormSent] = useState(false)

  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 })

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => {
    const id = setInterval(() => setTIdx(i => (i + 1) % TESTIMONIALS.length), 5500)
    return () => clearInterval(id)
  }, [])

  return (
    <div style={{ fontFamily: "'Avenir', 'Plus Jakarta Sans', sans-serif" }}>

      {/* SCROLL PROGRESS BAR */}
      <motion.div style={{
        scaleX, position: 'fixed', top: 0, left: 0, right: 0,
        height: 3, background: 'linear-gradient(90deg, #76d669, #DDEA7F)',
        transformOrigin: 'left', zIndex: 9999,
      }} />

      {/* ═══════════════ NAV ═══════════════ */}
      <nav style={{
        position: 'fixed', top: 3, left: 0, right: 0, zIndex: 100,
        transition: 'all 0.3s',
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
              style={{ overflow: 'hidden', backgroundColor: '#fff', borderTop: '1px solid #eee' }}
            >
              <div style={{ padding: '1rem 2rem 1.5rem' }}>
                {NAV.map(l => (
                  <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)}
                    style={{ display: 'block', color: 'var(--eerie)', textDecoration: 'none', padding: '0.8rem 0', fontSize: '1rem', fontWeight: 500, borderBottom: '1px solid #f0f0f0' }}>
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

      {/* ═══════════════ HERO ═══════════════ */}
      <section className="glass-hero-bg" style={{
        minHeight: '100vh',
        display: 'flex', alignItems: 'center',
        padding: '120px 2rem 80px',
      }}>
        <div style={{
          maxWidth: 1200, margin: '0 auto', width: '100%',
        }}>
          <div style={{ maxWidth: 680 }}>
            <motion.h1
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

      {/* ═══════════════ STATS BAR ═══════════════ */}
      <section style={{ backgroundColor: 'var(--forest)', padding: '3rem 2rem' }}>
        <div className="stats-grid" style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 32, textAlign: 'center' }}>
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08}>
              <div style={{ fontSize: 'clamp(2rem, 3.5vw, 2.6rem)', fontWeight: 900, color: 'var(--mindaro)', letterSpacing: '-0.03em', lineHeight: 1 }}>
                <Counter target={s.value} suffix={s.suffix} />
              </div>
              <div style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.5)', marginTop: 6, fontWeight: 500 }}>{s.label}</div>
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
              <p style={{ fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.1em', color: 'var(--mantis-a)', textTransform: 'uppercase', marginBottom: 12 }}>
                why wrksourcing?
              </p>
              <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', fontWeight: 900, color: 'var(--eerie)', letterSpacing: '-0.02em', lineHeight: 1.15, marginBottom: 16 }}>
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

          <div className="bento-grid">
            {PILLARS.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.07}>
                <div className={`bento-card ${p.span}`}>
                  {/* Background illustration */}
                  <div style={{
                    position: 'absolute', top: p.span === 'bento-tall' ? -10 : -20,
                    right: p.span === 'bento-wide' ? 10 : -10,
                    width: p.span === 'bento-tall' ? 140 : 120,
                    height: p.span === 'bento-tall' ? 140 : 120,
                    opacity: 0.18, pointerEvents: 'none',
                  }}>
                    <Image src={p.illustration} alt="" width={140} height={140} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                  </div>
                  <div className="bento-content">
                    <p style={{
                      fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.12em',
                      color: 'var(--mantis-a)', textTransform: 'uppercase', marginBottom: 8,
                    }}>
                      {p.title}
                    </p>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--eerie)', marginBottom: 8, lineHeight: 1.25 }}>
                      {p.title.toLowerCase()}
                    </h3>
                    <p style={{ fontSize: '0.88rem', color: 'var(--muted)', lineHeight: 1.6 }}>{p.desc}</p>
                  </div>
                  <div className="bento-cta">
                    <a href="#services" style={{
                      display: 'inline-flex', alignItems: 'center', gap: 6,
                      fontSize: '0.8rem', fontWeight: 600, color: 'var(--mantis-a)',
                    }}>
                      Learn more
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14"/><path d="M12 5l7 7-7 7"/>
                      </svg>
                    </a>
                  </div>
                </div>
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
              <p style={{ fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.1em', color: 'var(--mindaro)', textTransform: 'uppercase', marginBottom: 12 }}>services</p>
              <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', fontWeight: 900, color: 'var(--white)', letterSpacing: '-0.02em', lineHeight: 1.15 }}>what we do best</h2>
            </div>
          </Reveal>

          <div className="services-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }}>
            {SERVICES.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.1}>
                <div className="glass-dark" style={{ overflow: 'hidden', height: '100%' }}>
                  <div className="service-card-bar" />
                  <div style={{ padding: '1.75rem 1.5rem' }}>
                    <div style={{
                      width: 44, height: 44, borderRadius: 10,
                      backgroundColor: 'var(--light-accent)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16,
                    }}>
                      <svg width="22" height="22" viewBox="0 0 24 24">
                        {s.icon}
                      </svg>
                    </div>
                    <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#fff', marginBottom: 12 }}>{s.title}</h3>
                    <p style={{ fontSize: '0.88rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.65 }}>{s.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ INDUSTRIES ═══════════════ */}
      <section style={{ padding: '6rem 2rem', backgroundColor: 'var(--forest)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <Reveal>
            <div style={{ textAlign: 'center', marginBottom: 40 }}>
              <p style={{ fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.1em', color: 'var(--mindaro)', textTransform: 'uppercase', marginBottom: 12 }}>industries we improve</p>
              <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', fontWeight: 900, color: '#fff', letterSpacing: '-0.02em', lineHeight: 1.15, marginBottom: 12 }}>from emerging startups to industry giants</h2>
              <p style={{ maxWidth: 640, margin: '0 auto', color: 'rgba(255,255,255,0.6)', fontSize: '1rem', lineHeight: 1.7 }}>
                we fuel growth across diverse sectors. our experts bridge the gap between your ambitions and
                your customers&apos; needs, positioning you to lead, not follow.
              </p>
            </div>
          </Reveal>
          <div className="industries-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 14 }}>
            {INDUSTRIES.map((ind, i) => (
              <Reveal key={ind.title} delay={i * 0.06}>
                <div className="industry-card">
                  <div style={{
                    width: 56, height: 56, borderRadius: 14,
                    background: 'linear-gradient(135deg, rgba(118,214,105,0.1), rgba(221,234,127,0.1))',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px',
                  }}>
                    <svg width="26" height="26" viewBox="0 0 24 24">
                      {ind.icon}
                    </svg>
                  </div>
                  <p style={{ fontWeight: 700, fontSize: '0.85rem', color: '#fff', lineHeight: 1.35 }}>{ind.title}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ TESTIMONIALS ═══════════════ */}
      <section style={{ padding: '6rem 2rem', backgroundColor: 'var(--seasalt)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <Reveal>
            <div style={{ textAlign: 'center', marginBottom: 40 }}>
              <p style={{ fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.1em', color: 'var(--mantis-a)', textTransform: 'uppercase', marginBottom: 12 }}>testimonials</p>
              <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', fontWeight: 900, color: 'var(--eerie)', letterSpacing: '-0.02em', lineHeight: 1.15 }}>real results corner</h2>
            </div>
          </Reveal>

          {/* Featured testimonial with AnimatePresence */}
          <div style={{ maxWidth: 680, margin: '0 auto 32px', textAlign: 'center', minHeight: 180 }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={tIdx}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.4 }}
              >
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 14 }}><Stars /></div>
                <blockquote style={{
                  fontSize: 'clamp(1rem, 2vw, 1.12rem)', color: 'var(--subtext)',
                  lineHeight: 1.72, margin: '0 0 1.25rem', fontStyle: 'italic',
                }}>
                  &ldquo;{TESTIMONIALS[tIdx].text}&rdquo;
                </blockquote>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12 }}>
                  <Avatar name={TESTIMONIALS[tIdx].name} />
                  <div>
                    <p style={{ fontWeight: 700, color: 'var(--eerie)', fontSize: '0.9rem', textAlign: 'left' }}>{TESTIMONIALS[tIdx].name}</p>
                    <p style={{ color: 'var(--muted)', fontSize: '0.8rem', textAlign: 'left' }}>{TESTIMONIALS[tIdx].company}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: 6, marginBottom: 40 }}>
            {TESTIMONIALS.map((_, i) => (
              <button key={i} className="dot-btn" onClick={() => setTIdx(i)}
                style={{ width: tIdx === i ? 24 : 8, backgroundColor: tIdx === i ? 'var(--mantis-a)' : '#ddd' }}
                aria-label={`Testimonial ${i + 1}`} />
            ))}
          </div>

          <div className="testimonials-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
            {TESTIMONIALS.map((t, i) => (
              <Reveal key={i} delay={i * 0.06}>
                <div onClick={() => setTIdx(i)} className="glass"
                  style={{
                    padding: '1.5rem', cursor: 'pointer', height: '100%',
                    borderColor: tIdx === i ? 'rgba(118,214,105,0.4)' : 'rgba(255,255,255,0.5)',
                    background: tIdx === i ? 'rgba(242,246,216,0.6)' : 'rgba(255,255,255,0.55)',
                  }}>
                  <Stars />
                  <p style={{ color: 'var(--subtext)', fontSize: '0.85rem', lineHeight: 1.6, margin: '10px 0 14px', fontStyle: 'italic' }}>
                    &ldquo;{t.text.length > 140 ? t.text.slice(0, 140) + '…' : t.text}&rdquo;
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <Avatar name={t.name} />
                    <div>
                      <p style={{ fontWeight: 700, color: 'var(--eerie)', fontSize: '0.82rem' }}>{t.name}</p>
                      <p style={{ color: 'var(--muted)', fontSize: '0.72rem' }}>{t.company}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ HOW IT WORKS ═══════════════ */}
      <section id="how-it-works" style={{ padding: '6rem 2rem', backgroundColor: 'var(--forest)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <Reveal>
            <div style={{ textAlign: 'center', marginBottom: 48 }}>
              <p style={{ fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.1em', color: 'var(--mindaro)', textTransform: 'uppercase', marginBottom: 12 }}>how it wrks</p>
              <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', fontWeight: 900, color: 'var(--white)', letterSpacing: '-0.02em', lineHeight: 1.15 }}>three steps to get started</h2>
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
              <p style={{ fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.1em', color: 'var(--mindaro)', textTransform: 'uppercase', marginBottom: 12 }}>contact us</p>
              <h2 style={{
                fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', fontWeight: 900,
                color: '#fff', letterSpacing: '-0.025em', lineHeight: 1.12, marginBottom: 16,
              }}>
                let&apos;s make your brand unforgettable, shall we?
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '1rem', lineHeight: 1.72, marginBottom: 24 }}>
                find out what partnering with wrksourcing can do for you. schedule a chat
                now for a free assessment to identify your business support needs.
              </p>
              <GoogleBadge />
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            {formSent ? (
              <div className="glass-dark" style={{
                padding: '3rem 2rem', textAlign: 'center',
              }}>
                <div style={{
                  width: 56, height: 56, borderRadius: '50%', margin: '0 auto 16px',
                  background: 'linear-gradient(135deg, var(--mantis-a), var(--mantis-b))',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6L9 17l-5-5"/>
                  </svg>
                </div>
                <p style={{ fontWeight: 700, color: '#fff', fontSize: '1.1rem', marginBottom: 6 }}>message received.</p>
                <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem' }}>we&apos;ll be in touch within one business day.</p>
              </div>
            ) : (
              <form onSubmit={e => { e.preventDefault(); setFormSent(true) }} className="glass-dark" style={{
                padding: '2rem',
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
                  <label className="form-label">What do you need help with?</label>
                  <textarea rows={3} placeholder="We need help with..." required className="form-input" style={{ resize: 'vertical' }} />
                </div>
                <button type="submit" className="btn-gradient" style={{ width: '100%', padding: '0.9rem', fontSize: '0.85rem', display: 'block', textAlign: 'center' }}>
                  Book a discovery call
                </button>
              </form>
            )}
          </Reveal>
        </div>
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
              wrksourcing connects businesses with highly skilled remote wrk specialists to
              optimize strategy, workflow, and execution. our experts streamline operations,
              enhance efficiency, and drive sustainable growth.
            </p>
          </div>
          <div style={{ display: 'flex', gap: 28, flexWrap: 'wrap' }}>
            {NAV.map(l => (
              <a key={l.href} href={l.href} style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem', transition: 'color 0.2s' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#fff' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.6)' }}>{l.label}</a>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            {SOCIALS.map(s => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label} style={{
                width: 36, height: 36, borderRadius: '50%', background: 'rgba(255,255,255,0.1)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s',
              }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'linear-gradient(135deg, #76d669, #DDEA7F)' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.1)' }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                  stroke="rgba(255,255,255,0.6)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  {s.icon}
                </svg>
              </a>
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
