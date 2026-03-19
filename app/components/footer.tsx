'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const NAV_LINKS = [
  { label: 'Services', href: '/#services' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'How It Wrks', href: '/#how-it-works' },
  { label: 'About Us', href: '/#about' },
  { label: 'Contact Us', href: '/#contact' },
]

const SOCIALS = [
  {
    label: 'Facebook',
    href: 'https://facebook.com/wrksourcing',
    icon: <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />,
  },
  {
    label: 'Instagram',
    href: 'https://instagram.com/wrksourcing',
    icon: <><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" /><path d="M17.5 6.5h.01" /></>,
  },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/company/wrksourcing',
    icon: <><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-4 0v7h-4v-7a6 6 0 016-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></>,
  },
  {
    label: 'Email',
    href: 'mailto:info@wrksourcing.com',
    icon: <><rect x="2" y="4" width="20" height="16" rx="2" /><path d="M22 7l-8.97 5.7a1.94 1.94 0 01-2.06 0L2 7" /></>,
  },
]

export function Footer() {
  return (
    <section style={{ position: 'relative', width: '100%', overflow: 'hidden' }}>
      <footer style={{
        borderTop: '1px solid var(--line)',
        backgroundColor: 'var(--seasalt)',
        position: 'relative',
      }}>
        <div style={{
          maxWidth: 1200, margin: '0 auto',
          display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
          minHeight: '38rem', position: 'relative',
          padding: '3rem 2rem',
        }}>
          {/* Top content */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
            {/* Brand */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
              <Image src="/images/logo-horizontal.png" alt="wrksourcing" width={200} height={44} style={{ objectFit: 'contain' }} />
              <p style={{
                color: 'var(--muted)', fontWeight: 500, textAlign: 'center',
                maxWidth: 380, fontSize: '0.95rem', lineHeight: 1.6,
              }}>
                workflow solutions for entrepreneurs and SMBs. systems first. people second.
              </p>
            </div>

            {/* Socials */}
            <div style={{ display: 'flex', gap: 20, marginTop: 20, marginBottom: 24 }}>
              {SOCIALS.map(s => (
                <Link key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                  aria-label={s.label}
                  style={{ color: 'var(--muted)', transition: 'color 0.2s, transform 0.2s', display: 'block' }}
                  onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.color = 'var(--mantis-a)'; el.style.transform = 'scale(1.1)' }}
                  onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.color = 'var(--muted)'; el.style.transform = 'scale(1)' }}
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    {s.icon}
                  </svg>
                </Link>
              ))}
            </div>

            {/* Nav links */}
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 24, fontSize: '0.88rem', fontWeight: 500, color: 'var(--muted)' }}>
              {NAV_LINKS.map(l => (
                <Link key={l.label} href={l.href}
                  style={{ color: 'var(--muted)', transition: 'color 0.2s' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'var(--eerie)' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'var(--muted)' }}
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Bottom bar */}
          <div style={{
            marginTop: 80, display: 'flex', flexWrap: 'wrap', gap: 12,
            alignItems: 'center', justifyContent: 'space-between',
          }}>
            <p style={{ fontSize: '0.82rem', color: 'var(--muted)' }}>
              ©{new Date().getFullYear()} wrksourcing. All rights reserved.
            </p>
            <div style={{ display: 'flex', gap: 20 }}>
              {['Privacy Policy', 'Terms & Conditions'].map(l => (
                <Link key={l} href="#" style={{ fontSize: '0.82rem', color: 'var(--muted)', transition: 'color 0.2s' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'var(--eerie)' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'var(--muted)' }}
                >
                  {l}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Large background text */}
        <div style={{
          position: 'absolute', left: '50%', transform: 'translateX(-50%)',
          bottom: 160, fontWeight: 900, letterSpacing: '-0.04em',
          fontSize: 'clamp(2rem, 8vw, 6.5rem)',
          lineHeight: 1, pointerEvents: 'none', userSelect: 'none',
          textAlign: 'center', maxWidth: '95vw',
          background: 'linear-gradient(180deg, rgba(37,53,48,0.15) 0%, rgba(37,53,48,0.06) 50%, transparent 100%)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
        }}>
          wrk smart today.
        </div>


        {/* Divider line */}
        <div style={{
          position: 'absolute', bottom: 140, left: '50%', transform: 'translateX(-50%)',
          width: '100%', height: 1,
          background: 'linear-gradient(90deg, transparent, var(--line), transparent)',
        }} />

        {/* Bottom fade */}
        <div style={{
          position: 'absolute', bottom: 110, left: 0, width: '100%', height: 80,
          background: 'linear-gradient(to top, var(--seasalt), rgba(247,248,249,0.8), transparent)',
          filter: 'blur(8px)', pointerEvents: 'none',
        }} />
      </footer>
    </section>
  )
}
