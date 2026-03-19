'use client'

import { useState, useEffect } from 'react'

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
  { title: 'Process', desc: 'optimizing wrkflows for faster, more effective results' },
  { title: 'Personalization', desc: 'custom solutions built to fit your business' },
  { title: 'People', desc: 'a team of skilled talent dedicated to drive your success' },
  { title: 'Platforms', desc: 'equipping you with the right tools for growth' },
  { title: 'Partners', desc: 'continuously collaborating to create lasting value and impact' },
]

const SERVICES = [
  {
    title: 'Wrkflow Solutions',
    desc: 'for businesses needing to establish and optimize their processes, our wrk specialists will help you build the foundational systems you need to improve your core business operations.',
  },
  {
    title: 'Admin',
    desc: 'for start-ups and SMBs needing to offload administrative tasks, our wrk specialists will handle your admin work so you can focus on running your business.',
  },
  {
    title: 'Marketing',
    desc: 'for entrepreneurs and business owners looking to increase their brand awareness and reach, our wrk specialists will help you grow and nurture a community and build your brand reputation.',
  },
  {
    title: 'Sales',
    desc: 'for start-ups to established businesses aiming to boost sales, our wrk specialists can help identify growth opportunities and maximize your sales potential.',
  },
]

const INDUSTRIES = [
  'Professional Services',
  'Entrepreneurs',
  'Start-ups',
  'Creative Services',
  'E-commerce',
  'Tech, IT, and Software',
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
  { n: '01', title: 'Take a Free Discovery Call', desc: "Let's find out what you need. We want to get to know you as a person, as well as your business needs. We dig deep." },
  { n: '02', title: 'We Match You', desc: "After we get to know you and gain a clear picture of what your business needs, our approach is personalized based on your business' goals and current challenges." },
  { n: '03', title: 'New Wrkflow Begins!', desc: "Now that we've established the groundwrk, you can spend time on what matters most — running your business. Our team will assist you with onboarding and ongoing support." },
]

// ─────────────────────────────────────────────
// ROTATING TEXT COMPONENT
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
      display: 'inline-block',
      fontWeight: 700,
      color: '#1d1d1d',
      opacity: fade ? 1 : 0,
      transform: fade ? 'translateY(0)' : 'translateY(8px)',
      transition: 'opacity 0.3s ease, transform 0.3s ease',
    }}>
      {ROTATING_WORDS[index]}
    </span>
  )
}

// ─────────────────────────────────────────────
// STARS
// ─────────────────────────────────────────────
function Stars() {
  return (
    <span style={{ display: 'flex', gap: 2 }}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="16" height="16" viewBox="0 0 20 20" fill="#f5c518">
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
    <div style={{ fontFamily: "'Avenir', 'Plus Jakarta Sans', sans-serif" }}>

      {/* ═══════════════ NAV ═══════════════ */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        transition: 'background-color 0.3s, box-shadow 0.3s',
        backgroundColor: scrolled ? 'rgba(255,255,255,0.95)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        boxShadow: scrolled ? '0 1px 0 rgba(0,0,0,0.06)' : 'none',
      }}>
        <div style={{
          maxWidth: 1200, margin: '0 auto', padding: '0 2rem',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 72,
        }}>
          <a href="/" style={{ textDecoration: 'none' }}>
            <span style={{ fontSize: '1.4rem', fontWeight: 800, color: '#1d1d1d', letterSpacing: '-0.03em' }}>
              wrksourcing
            </span>
          </a>

          <div className="nav-desktop">
            {NAV.map(l => (
              <a key={l.href} className="nav-link" href={l.href}>{l.label}</a>
            ))}
            <a className="btn-primary" href="#contact" style={{ fontSize: '0.78rem', padding: '0.6rem 1.3rem' }}>
              BOOK A FREE CALL
            </a>
          </div>

          <button className="nav-mobile-btn" onClick={() => setMenuOpen(o => !o)} aria-label="Menu">
            <svg width="26" height="26" fill="none" stroke="#1d1d1d" strokeWidth="2" viewBox="0 0 24 24">
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
                style={{ display: 'block', color: '#1d1d1d', textDecoration: 'none', padding: '0.8rem 0', fontSize: '1rem', fontWeight: 500, borderBottom: '1px solid #f0f0f0' }}>
                {l.label}
              </a>
            ))}
            <a href="#contact" onClick={() => setMenuOpen(false)}
              style={{ display: 'block', marginTop: '1rem', textAlign: 'center' }}
              className="btn-primary">
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
          display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center',
        }}>
          <div>
            <h1 style={{
              fontSize: 'clamp(2.4rem, 4.5vw, 3.6rem)',
              fontWeight: 800,
              color: '#1d1d1d',
              lineHeight: 1.12,
              letterSpacing: '-0.03em',
              marginBottom: 20,
            }}>
              expert support for entrepreneurs and SMBs.
            </h1>

            <p style={{
              fontSize: '1.1rem', color: '#666', lineHeight: 1.7, marginBottom: 12,
            }}>
              200,000+ hours of proven results across{' '}
              <RotatingText />
            </p>

            <p style={{
              fontSize: '1rem', color: '#888', lineHeight: 1.7, marginBottom: 36,
            }}>
              growing businesses since 2019, we combine decades of experience with innovative
              strategies that streamline processes, maximize efficiency, and scale with confidence.
            </p>

            <div className="hero-cta-row" style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
              <a className="btn-primary" href="#contact">BOOK A FREE CALL</a>
              <a className="btn-outline" href="#services">EXPLORE OUR SERVICES</a>
            </div>
          </div>

          {/* Hero graphic placeholder */}
          <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center',
          }}>
            <div style={{
              width: '100%', maxWidth: 420, aspectRatio: '1/1.1',
              background: 'linear-gradient(135deg, #f0f0f0 0%, #e8e8e8 100%)',
              borderRadius: 20,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#bbb', fontSize: '0.9rem', fontWeight: 600,
            }}>
              {/* Replace with actual hero image */}
              <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="1">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <path d="M21 15l-5-5L5 21" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ LOGO STRIP ═══════════════ */}
      <section style={{
        backgroundColor: '#fafafa', padding: '2rem 0',
        borderTop: '1px solid #f0f0f0', borderBottom: '1px solid #f0f0f0',
        overflow: 'hidden',
      }}>
        <div style={{ overflow: 'hidden', position: 'relative' }}>
          <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 80, background: 'linear-gradient(to right, #fafafa, transparent)', zIndex: 2, pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: 80, background: 'linear-gradient(to left, #fafafa, transparent)', zIndex: 2, pointerEvents: 'none' }} />
          <div className="logo-strip">
            {[...CLIENT_LOGOS, ...CLIENT_LOGOS].map((name, i) => (
              <div key={i} style={{
                flexShrink: 0, padding: '0.45rem 1.5rem', marginRight: 14,
                fontSize: '0.82rem', fontWeight: 600, color: '#999',
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
            <p style={{ fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.1em', color: '#999', textTransform: 'uppercase', marginBottom: 12 }}>
              why wrksourcing?
            </p>
            <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', fontWeight: 800, color: '#1d1d1d', letterSpacing: '-0.025em', lineHeight: 1.15 }}>
              why wrksourcing?
            </h2>
            <p style={{ maxWidth: 600, margin: '14px auto 0', color: '#777', fontSize: '1.05rem', lineHeight: 1.7 }}>
              partner with us for streamlined processes, access to specialized expertise, and the
              implementation of smarter workflows that drive results.
            </p>
          </div>

          <div className="pillars-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 16 }}>
            {PILLARS.map(p => (
              <div key={p.title} className="card" style={{ padding: '1.75rem 1.25rem', textAlign: 'center' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#1d1d1d', marginBottom: 10, textTransform: 'lowercase' }}>
                  {p.title.toLowerCase()}
                </h3>
                <p style={{ fontSize: '0.85rem', color: '#777', lineHeight: 1.6 }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ SERVICES ═══════════════ */}
      <section id="services" style={{ padding: '6rem 2rem', backgroundColor: '#fafafa' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <p style={{ fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.1em', color: '#999', textTransform: 'uppercase', marginBottom: 12 }}>
              services
            </p>
            <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', fontWeight: 800, color: '#1d1d1d', letterSpacing: '-0.025em', lineHeight: 1.15 }}>
              what we do best
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }} className="services-layout">
            {SERVICES.map(s => (
              <div key={s.title} className="card" style={{ padding: '2rem 1.5rem' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#1d1d1d', marginBottom: 14 }}>
                  {s.title}
                </h3>
                <p style={{ fontSize: '0.9rem', color: '#777', lineHeight: 1.65 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ INDUSTRIES ═══════════════ */}
      <section style={{ padding: '6rem 2rem', backgroundColor: '#fff' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 14 }}>
            <p style={{ fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.1em', color: '#999', textTransform: 'uppercase', marginBottom: 12 }}>
              industries
            </p>
            <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', fontWeight: 800, color: '#1d1d1d', letterSpacing: '-0.025em', lineHeight: 1.15, marginBottom: 8 }}>
              from emerging startups to industry giants
            </h2>
            <p style={{ color: '#777', fontSize: '1.05rem', marginBottom: 40 }}>
              we fuel growth across diverse sectors
            </p>
          </div>
          <div className="industries-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 14 }}>
            {INDUSTRIES.map(ind => (
              <div key={ind} className="card" style={{
                padding: '1.75rem 1rem', textAlign: 'center', cursor: 'default',
              }}>
                <p style={{ fontWeight: 700, fontSize: '0.88rem', color: '#1d1d1d', lineHeight: 1.35 }}>
                  {ind}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ TESTIMONIALS ═══════════════ */}
      <section style={{ padding: '6rem 2rem', backgroundColor: '#fafafa' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <p style={{ fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.1em', color: '#999', textTransform: 'uppercase', marginBottom: 12 }}>
              testimonials
            </p>
            <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', fontWeight: 800, color: '#1d1d1d', letterSpacing: '-0.025em', lineHeight: 1.15 }}>
              real results corner
            </h2>
          </div>

          {/* Featured testimonial */}
          <div style={{ maxWidth: 680, margin: '0 auto 36px', textAlign: 'center', minHeight: 160 }}>
            <Stars />
            <blockquote style={{
              fontSize: 'clamp(1rem, 2vw, 1.15rem)', color: '#444',
              lineHeight: 1.72, margin: '1rem 0', fontStyle: 'italic',
            }}>
              &ldquo;{TESTIMONIALS[tIdx].text}&rdquo;
            </blockquote>
            <p style={{ fontWeight: 700, color: '#1d1d1d', fontSize: '0.9rem' }}>
              {TESTIMONIALS[tIdx].name}
            </p>
            <p style={{ color: '#999', fontSize: '0.8rem', marginTop: 4 }}>
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
                  backgroundColor: tIdx === i ? '#1d1d1d' : '#ddd',
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
                  borderColor: tIdx === i ? '#1d1d1d' : '#eee',
                }}
              >
                <Stars />
                <p style={{ color: '#666', fontSize: '0.85rem', lineHeight: 1.6, margin: '10px 0', fontStyle: 'italic' }}>
                  &ldquo;{t.text.length > 100 ? t.text.slice(0, 100) + '…' : t.text}&rdquo;
                </p>
                <p style={{ fontWeight: 700, color: '#1d1d1d', fontSize: '0.82rem' }}>{t.name}</p>
                <p style={{ color: '#aaa', fontSize: '0.75rem', marginTop: 2 }}>{t.company}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ HOW IT WORKS ═══════════════ */}
      <section id="how-it-works" style={{ padding: '6rem 2rem', backgroundColor: '#fff' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <p style={{ fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.1em', color: '#999', textTransform: 'uppercase', marginBottom: 12 }}>
              how it works
            </p>
            <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', fontWeight: 800, color: '#1d1d1d', letterSpacing: '-0.025em', lineHeight: 1.15 }}>
              three steps to get started
            </h2>
          </div>
          <div className="steps-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
            {STEPS.map(s => (
              <div key={s.n} className="card" style={{ padding: '2.25rem 2rem' }}>
                <div style={{ fontSize: '2.8rem', fontWeight: 800, color: '#e8e8e8', letterSpacing: '-0.05em', lineHeight: 1, marginBottom: 16 }}>
                  {s.n}
                </div>
                <h3 style={{ fontWeight: 700, fontSize: '1.05rem', color: '#1d1d1d', marginBottom: 10 }}>
                  {s.title}
                </h3>
                <p style={{ color: '#777', fontSize: '0.88rem', lineHeight: 1.7 }}>{s.desc}</p>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 40 }}>
            <a className="btn-primary" href="#contact">WRK SMARTER TODAY</a>
          </div>
        </div>
      </section>

      {/* ═══════════════ CTA ═══════════════ */}
      <section id="contact" style={{ padding: '7rem 2rem', backgroundColor: '#fafafa' }}>
        <div style={{ maxWidth: 680, margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{
            fontSize: 'clamp(2rem, 4.5vw, 3rem)', fontWeight: 800,
            color: '#1d1d1d', letterSpacing: '-0.03em', lineHeight: 1.12, marginBottom: 16,
          }}>
            let&apos;s make your brand unforgettable, shall we?
          </h2>
          <p style={{ color: '#777', fontSize: '1.05rem', lineHeight: 1.72, marginBottom: 40 }}>
            find out what partnering with wrksourcing can do for you. schedule a chat
            now for a free assessment to identify your business support needs.
          </p>
          <a className="btn-primary" href="https://wrksourcing.com/contact" style={{ fontSize: '0.9rem', padding: '1rem 2.5rem' }}>
            BOOK OUR DISCOVERY CALL
          </a>
        </div>
      </section>

      {/* ═══════════════ FOOTER ═══════════════ */}
      <footer style={{ backgroundColor: '#1d1d1d', padding: '3.5rem 2rem', color: '#fff' }}>
        <div className="footer-inner" style={{
          maxWidth: 1200, margin: '0 auto',
          display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
          gap: 32, flexWrap: 'wrap',
        }}>
          <div>
            <div style={{ fontSize: '1.35rem', fontWeight: 800, marginBottom: 8, letterSpacing: '-0.03em' }}>
              wrksourcing
            </div>
            <p style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.5)', maxWidth: 280, lineHeight: 1.6 }}>
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
            {['FB', 'IG', 'LI'].map(s => (
              <a key={s} href="#" style={{
                width: 36, height: 36, borderRadius: '50%',
                background: 'rgba(255,255,255,0.1)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'rgba(255,255,255,0.6)',
                fontSize: '0.65rem', fontWeight: 700, transition: 'all 0.2s',
              }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#fff'; (e.currentTarget as HTMLElement).style.color = '#1d1d1d' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.1)'; (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.6)' }}
              >
                {s}
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
          <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.75rem' }}>
            © 2025 wrksourcing. All rights reserved.
          </p>
          <div style={{ display: 'flex', gap: 20 }}>
            {['Privacy Policy', 'Terms & Conditions'].map(l => (
              <a key={l} href="#" style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.75rem', transition: 'color 0.2s' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.7)' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.3)' }}
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
