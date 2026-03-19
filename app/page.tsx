'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

// ─────────────────────────────────────────────
// CONTENT DATA (exact wrksourcing.com copy)
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

const ROTATING_WORDS = [
  'creative wrkflow solutions',
  'general admin',
  'marketing',
  'sales',
  'project-based wrk',
]

const PILLARS = [
  {
    title: 'Process',
    desc: 'optimizing wrkflows for faster, more effective results',
    icon: <><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></>,
  },
  {
    title: 'Personalization',
    desc: 'custom solutions built to fit your business',
    icon: <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></>,
  },
  {
    title: 'People',
    desc: 'a team of skilled talent dedicated to drive your success',
    icon: <><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></>,
  },
  {
    title: 'Platforms',
    desc: 'equipping you with the right tools for growth',
    icon: <><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><path d="M8 21h8"/><path d="M12 17v4"/></>,
  },
  {
    title: 'Partners',
    desc: 'continuously collaborating to create lasting value and impact',
    icon: <><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></>,
  },
]

const SERVICES = [
  {
    title: 'Wrkflow Solutions',
    desc: 'for businesses needing to establish and optimize their processes, our wrk specialists will help you build the foundational systems you need to improve your core business operations.',
    icon: <><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 112.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></>,
  },
  {
    title: 'Admin',
    desc: 'for start-ups and SMBs needing to offload administrative tasks, our wrk specialists will handle your admin work so you can focus on running your business.',
    icon: <><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><path d="M14 2v6h6"/><path d="M16 13H8"/><path d="M16 17H8"/><path d="M10 9H8"/></>,
  },
  {
    title: 'Marketing',
    desc: 'for entrepreneurs and business owners looking to increase their brand awareness and reach, our wrk specialists will help you grow and nurture a community and build your brand reputation.',
    icon: <><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></>,
  },
  {
    title: 'Sales',
    desc: 'for start-ups to established businesses aiming to boost sales, our wrk specialists can help identify growth opportunities and maximize your sales potential.',
    icon: <><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></>,
  },
]

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
    name: 'Mathew Glowacki', company: 'MPG Law',
    text: 'Are you an owner of a growing business and are finding yourself bogged down with all the nitty-gritty aspects of the business? Tyler and his experienced team are great to work with.',
  },
  {
    name: 'Andrew Thurston', company: 'BeSpoke Contracting',
    text: 'The entire team at wrksourcing are amazing to deal with. If you are looking to free up time in your day, I highly recommend using wrksourcing.',
  },
  {
    name: 'Stephanie van Dam', company: 'Sandler',
    text: 'wrksourcing has been an integral part of the growth of my business. I am so grateful for the ease of interaction, communication structure, and expertise of the team.',
  },
  {
    name: 'Mike Stroh', company: 'Starts w/ Me',
    text: 'I have thoroughly enjoyed working with wrksourcing! We found great matches for my needs and it has been great customer service.',
  },
  {
    name: 'Mike Antico', company: 'Green Link Recycling',
    text: 'Working with Tyler and his team is an absolute pleasure. Very professional, and resourceful for whatever your companies unique needs are.',
  },
  {
    name: 'Tom Hall', company: 'BluRoot',
    text: 'The talent that wrksourcing has provided our business is excellent — skilled individuals, who can contribute immediately.',
  },
]

const STEPS = [
  { n: '1', title: 'Take a Free Discovery Call', desc: "Let's find out what you need. We want to get to know you as a person, as well as your business needs. We dig deep." },
  { n: '2', title: 'We Match You', desc: "After we get to know you and gain a clear picture of what your business needs, our approach is personalized based on your business' goals and current challenges." },
  { n: '3', title: 'New Wrkflow Begins!', desc: "Now that we've established the groundwrk, you can spend time on what matters most — running your business. Our team will assist you with onboarding and ongoing support." },
]

// ─────────────────────────────────────────────
// ROTATING TEXT
// ─────────────────────────────────────────────
function RotatingText() {
  const [index, setIndex] = useState(0)
  const [fade, setFade] = useState(true)

  useEffect(() => {
    const timer = setInterval(() => {
      setFade(false)
      setTimeout(() => {
        setIndex(i => (i + 1) % ROTATING_WORDS.length)
        setFade(true)
      }, 300)
    }, 2800)
    return () => clearInterval(timer)
  }, [])

  return (
    <span style={{
      fontWeight: 700,
      color: 'var(--green)',
      opacity: fade ? 1 : 0,
      transform: fade ? 'translateY(0)' : 'translateY(6px)',
      transition: 'opacity 0.3s ease, transform 0.3s ease',
      display: 'inline-block',
    }}>
      {ROTATING_WORDS[index]}
    </span>
  )
}

// ─────────────────────────────────────────────
// STARS (Google yellow)
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
// PAGE
// ─────────────────────────────────────────────
export default function Home() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [tIdx, setTIdx] = useState(0)

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
    <div style={{ fontFamily: "var(--font, 'Avenir', 'Plus Jakarta Sans', sans-serif)" }}>

      {/* ═══════════════ NAV ═══════════════ */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        transition: 'all 0.3s',
        backgroundColor: scrolled ? 'rgba(255,255,255,0.97)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        boxShadow: scrolled ? '0 1px 0 rgba(0,0,0,0.06)' : 'none',
      }}>
        <div style={{
          maxWidth: 1200, margin: '0 auto', padding: '0 2rem',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 72,
        }}>
          <a href="/" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <Image src="/images/logo-icon.png" alt="wrksourcing" width={36} height={36} style={{ borderRadius: 8 }} />
            <span style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text)', letterSpacing: '-0.03em' }}>
              wrksourcing
            </span>
          </a>

          <div className="nav-desktop">
            {NAV.map(l => (
              <a key={l.href} className="nav-link" href={l.href}>{l.label}</a>
            ))}
            <a className="btn-green" href="#contact" style={{ fontSize: '0.76rem', padding: '0.55rem 1.3rem' }}>
              BOOK A FREE CALL
            </a>
          </div>

          <button className="nav-mobile-btn" onClick={() => setMenuOpen(o => !o)} aria-label="Menu">
            <svg width="26" height="26" fill="none" stroke="var(--text)" strokeWidth="2" viewBox="0 0 24 24">
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
                style={{ display: 'block', color: 'var(--text)', textDecoration: 'none', padding: '0.8rem 0', fontSize: '1rem', fontWeight: 500, borderBottom: '1px solid #f0f0f0' }}>
                {l.label}
              </a>
            ))}
            <a href="#contact" onClick={() => setMenuOpen(false)}
              className="btn-green" style={{ display: 'block', marginTop: '1rem', textAlign: 'center' }}>
              BOOK A FREE CALL
            </a>
          </div>
        )}
      </nav>

      {/* ═══════════════ HERO ═══════════════ */}
      <section style={{
        minHeight: '100vh', backgroundColor: '#fff',
        display: 'flex', alignItems: 'center',
        padding: '120px 2rem 80px',
      }}>
        <div className="hero-grid" style={{
          maxWidth: 1200, margin: '0 auto', width: '100%',
          display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '3rem', alignItems: 'center',
        }}>
          <div>
            <h1 style={{
              fontSize: 'clamp(2.4rem, 4.5vw, 3.4rem)',
              fontWeight: 800,
              color: 'var(--text)',
              lineHeight: 1.12,
              letterSpacing: '-0.025em',
              marginBottom: 20,
            }}>
              expert support for{' '}
              <span style={{ color: 'var(--green)' }}>entrepreneurs</span>{' '}
              and SMBs.
            </h1>

            <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 8 }}>
              200,000+ hours of proven results across{' '}
              <RotatingText />
            </p>

            <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: 36 }}>
              growing businesses since 2019, we combine decades of experience with innovative
              strategies that streamline processes, maximize efficiency, and scale with confidence.
            </p>

            <div className="hero-cta-row" style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
              <a className="btn-green" href="#contact">BOOK A FREE CALL</a>
              <a className="btn-outline-green" href="#services">EXPLORE OUR SERVICES</a>
            </div>
          </div>

          {/* Hero illustration */}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Image
              src="/images/hero-illustration.png"
              alt="Remote team collaboration"
              width={391}
              height={439}
              priority
              style={{ maxWidth: '100%', height: 'auto' }}
            />
          </div>
        </div>
      </section>

      {/* ═══════════════ LOGO STRIP ═══════════════ */}
      <section style={{
        backgroundColor: 'var(--bg-alt)', padding: '1.75rem 0',
        borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)',
        overflow: 'hidden',
      }}>
        <p style={{
          textAlign: 'center', fontSize: '0.72rem', fontWeight: 700,
          letterSpacing: '0.12em', color: '#aaa', textTransform: 'uppercase',
          marginBottom: 16,
        }}>
          trusted by the best
        </p>
        <div style={{ overflow: 'hidden', position: 'relative' }}>
          <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 80, background: 'linear-gradient(to right, var(--bg-alt), transparent)', zIndex: 2, pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: 80, background: 'linear-gradient(to left, var(--bg-alt), transparent)', zIndex: 2, pointerEvents: 'none' }} />
          <div className="logo-strip">
            {[...CLIENT_LOGOS, ...CLIENT_LOGOS].map((name, i) => (
              <div key={i} style={{
                flexShrink: 0, padding: '0.4rem 1.5rem', marginRight: 20,
                fontSize: '0.85rem', fontWeight: 600, color: '#aaa',
                letterSpacing: '0.02em', whiteSpace: 'nowrap',
              }}>
                {name}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ WHY WRKSOURCING ═══════════════ */}
      <section id="about" style={{ padding: '6rem 2rem', backgroundColor: '#fff' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <p style={{ fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.1em', color: 'var(--green)', textTransform: 'uppercase', marginBottom: 12 }}>
              why wrksourcing?
            </p>
            <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', fontWeight: 800, color: 'var(--text)', letterSpacing: '-0.02em', lineHeight: 1.15 }}>
              why wrksourcing?
            </h2>
            <p style={{ maxWidth: 600, margin: '14px auto 0', color: 'var(--text-muted)', fontSize: '1.02rem', lineHeight: 1.7 }}>
              partner with us for streamlined processes, access to specialized expertise, and the
              implementation of smarter workflows that drive results.
            </p>
          </div>

          <div className="pillars-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 16 }}>
            {PILLARS.map(p => (
              <div key={p.title} className="card" style={{ padding: '1.75rem 1.25rem' }}>
                <div className="pillar-icon">
                  <svg viewBox="0 0 24 24">{p.icon}</svg>
                </div>
                <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text)', marginBottom: 8, textTransform: 'lowercase' }}>
                  {p.title.toLowerCase()}
                </h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ SERVICES ═══════════════ */}
      <section id="services" style={{ padding: '6rem 2rem', backgroundColor: 'var(--bg-alt)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <p style={{ fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.1em', color: 'var(--green)', textTransform: 'uppercase', marginBottom: 12 }}>
              services
            </p>
            <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', fontWeight: 800, color: 'var(--text)', letterSpacing: '-0.02em', lineHeight: 1.15 }}>
              what we do best
            </h2>
          </div>

          <div className="services-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }}>
            {SERVICES.map(s => (
              <div key={s.title} className="card" style={{ overflow: 'hidden' }}>
                <div className="service-card-bar" />
                <div style={{ padding: '1.75rem 1.5rem' }}>
                  <div style={{
                    width: 44, height: 44, borderRadius: 10,
                    backgroundColor: 'var(--green-pale)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    marginBottom: 16,
                  }}>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
                      stroke="var(--green)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      {s.icon}
                    </svg>
                  </div>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text)', marginBottom: 12 }}>
                    {s.title}
                  </h3>
                  <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.65 }}>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ INDUSTRIES ═══════════════ */}
      <section style={{ padding: '6rem 2rem', backgroundColor: '#fff' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <p style={{ fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.1em', color: 'var(--green)', textTransform: 'uppercase', marginBottom: 12 }}>
              industries
            </p>
            <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', fontWeight: 800, color: 'var(--text)', letterSpacing: '-0.02em', lineHeight: 1.15, marginBottom: 8 }}>
              from emerging startups to industry giants
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.02rem' }}>
              we fuel growth across diverse sectors
            </p>
          </div>
          <div className="industries-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 14 }}>
            {INDUSTRIES.map(ind => (
              <div key={ind.title} className="industry-card">
                <div style={{ fontSize: '2rem', marginBottom: 10 }}>{ind.icon}</div>
                <p style={{ fontWeight: 700, fontSize: '0.85rem', color: 'var(--text)', lineHeight: 1.35 }}>
                  {ind.title}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ TESTIMONIALS ═══════════════ */}
      <section style={{ padding: '6rem 2rem', backgroundColor: 'var(--bg-alt)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <p style={{ fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.1em', color: 'var(--green)', textTransform: 'uppercase', marginBottom: 12 }}>
              testimonials
            </p>
            <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', fontWeight: 800, color: 'var(--text)', letterSpacing: '-0.02em', lineHeight: 1.15 }}>
              real results corner
            </h2>
          </div>

          {/* Featured testimonial */}
          <div style={{ maxWidth: 680, margin: '0 auto 32px', textAlign: 'center', minHeight: 160 }}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 14 }}>
              <Stars />
            </div>
            <blockquote style={{
              fontSize: 'clamp(1rem, 2vw, 1.12rem)', color: 'var(--text-secondary)',
              lineHeight: 1.72, margin: '0 0 1rem', fontStyle: 'italic',
            }}>
              &ldquo;{TESTIMONIALS[tIdx].text}&rdquo;
            </blockquote>
            <p style={{ fontWeight: 700, color: 'var(--text)', fontSize: '0.9rem' }}>
              {TESTIMONIALS[tIdx].name}
            </p>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: 3 }}>
              {TESTIMONIALS[tIdx].company}
            </p>
          </div>

          {/* Dots */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: 6, marginBottom: 40 }}>
            {TESTIMONIALS.map((_, i) => (
              <button key={i} className="dot-btn"
                onClick={() => setTIdx(i)}
                style={{
                  width: tIdx === i ? 24 : 8,
                  backgroundColor: tIdx === i ? 'var(--green)' : '#ddd',
                }}
                aria-label={`Testimonial ${i + 1}`}
              />
            ))}
          </div>

          {/* Grid */}
          <div className="testimonials-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
            {TESTIMONIALS.map((t, i) => (
              <div key={i} onClick={() => setTIdx(i)}
                className="card"
                style={{
                  padding: '1.5rem', cursor: 'pointer',
                  borderColor: tIdx === i ? 'var(--green)' : 'var(--border)',
                  background: tIdx === i ? 'var(--green-pale)' : '#fff',
                }}
              >
                <Stars />
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: 1.6, margin: '10px 0', fontStyle: 'italic' }}>
                  &ldquo;{t.text.length > 100 ? t.text.slice(0, 100) + '…' : t.text}&rdquo;
                </p>
                <p style={{ fontWeight: 700, color: 'var(--text)', fontSize: '0.82rem' }}>{t.name}</p>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem', marginTop: 2 }}>{t.company}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ HOW IT WORKS ═══════════════ */}
      <section id="how-it-works" style={{ padding: '6rem 2rem', backgroundColor: '#fff' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <p style={{ fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.1em', color: 'var(--green)', textTransform: 'uppercase', marginBottom: 12 }}>
              how it works
            </p>
            <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', fontWeight: 800, color: 'var(--text)', letterSpacing: '-0.02em', lineHeight: 1.15 }}>
              three steps to get started
            </h2>
          </div>
          <div className="steps-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            {STEPS.map(s => (
              <div key={s.n} className="card" style={{ padding: '2rem 1.75rem' }}>
                <div className="step-number">{s.n}</div>
                <h3 style={{ fontWeight: 700, fontSize: '1.05rem', color: 'var(--text)', marginBottom: 10, lineHeight: 1.3 }}>
                  {s.title}
                </h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', lineHeight: 1.7 }}>{s.desc}</p>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 40 }}>
            <a className="btn-green" href="#contact">WRK SMARTER TODAY</a>
          </div>
        </div>
      </section>

      {/* ═══════════════ CTA ═══════════════ */}
      <section id="contact" style={{
        padding: '7rem 2rem',
        background: 'linear-gradient(135deg, var(--green-pale) 0%, #fff 100%)',
      }}>
        <div style={{ maxWidth: 680, margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{
            fontSize: 'clamp(2rem, 4.5vw, 2.8rem)', fontWeight: 800,
            color: 'var(--text)', letterSpacing: '-0.025em', lineHeight: 1.12, marginBottom: 16,
          }}>
            let&apos;s make your brand unforgettable, shall we?
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.02rem', lineHeight: 1.72, marginBottom: 40 }}>
            find out what partnering with wrksourcing can do for you. schedule a chat
            now for a free assessment to identify your business support needs.
          </p>
          <a className="btn-green" href="https://wrksourcing.com/contact" style={{ fontSize: '0.88rem', padding: '1rem 2.5rem' }}>
            BOOK OUR DISCOVERY CALL
          </a>
        </div>
      </section>

      {/* ═══════════════ FOOTER ═══════════════ */}
      <footer style={{ backgroundColor: 'var(--forest)', padding: '3.5rem 2rem', color: '#fff' }}>
        <div className="footer-inner" style={{
          maxWidth: 1200, margin: '0 auto',
          display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
          gap: 32, flexWrap: 'wrap',
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
              <Image src="/images/logo-icon.png" alt="" width={32} height={32} style={{ borderRadius: 6 }} />
              <span style={{ fontSize: '1.25rem', fontWeight: 800, letterSpacing: '-0.03em' }}>
                wrksourcing
              </span>
            </div>
            <p style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.55)', maxWidth: 280, lineHeight: 1.6 }}>
              wrksourcing connects businesses with highly skilled remote wrk specialists to
              optimize strategy, workflow, and execution. our experts streamline operations,
              enhance efficiency, and drive sustainable growth.
            </p>
          </div>

          <div style={{ display: 'flex', gap: 28, flexWrap: 'wrap' }}>
            {NAV.map(l => (
              <a key={l.href} href={l.href} style={{
                color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem',
                transition: 'color 0.2s',
              }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#fff' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.6)' }}
              >
                {l.label}
              </a>
            ))}
          </div>

          <div style={{ display: 'flex', gap: 10 }}>
            {[
              { label: 'FB', href: 'https://facebook.com/wrksourcing' },
              { label: 'IG', href: 'https://instagram.com/wrksourcing' },
              { label: 'LI', href: 'https://linkedin.com/company/wrksourcing' },
            ].map(s => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" style={{
                width: 36, height: 36, borderRadius: '50%',
                background: 'rgba(255,255,255,0.1)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'rgba(255,255,255,0.6)',
                fontSize: '0.65rem', fontWeight: 700, transition: 'all 0.2s',
              }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'var(--green)'; (e.currentTarget as HTMLElement).style.color = '#fff' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.1)'; (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.6)' }}
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>

        <div className="footer-bottom" style={{
          maxWidth: 1200, margin: '2rem auto 0', paddingTop: '1.5rem',
          borderTop: '1px solid rgba(255,255,255,0.1)',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          flexWrap: 'wrap', gap: 12,
        }}>
          <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.75rem' }}>
            © 2025 wrksourcing. All rights reserved.
          </p>
          <div style={{ display: 'flex', gap: 20 }}>
            {['Privacy Policy', 'Terms & Conditions'].map(l => (
              <a key={l} href="#" style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.75rem', transition: 'color 0.2s' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.7)' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.35)' }}
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
