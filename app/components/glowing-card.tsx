'use client'

import React, { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

// ─── Star grid illustration ───
function StarGrid({ mouseEnter }: { mouseEnter: boolean }) {
  const stars = 108
  const columns = 18
  const [glowing, setGlowing] = useState<number[]>([])
  const highlighted = useRef<number[]>([])

  useEffect(() => {
    const interval = setInterval(() => {
      highlighted.current = Array.from({ length: 5 }, () => Math.floor(Math.random() * stars))
      setGlowing([...highlighted.current])
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div style={{
      height: 120, width: '100%', padding: 4,
      display: 'grid', gridTemplateColumns: `repeat(${columns}, 1fr)`, gap: 1,
    }}>
      {[...Array(stars)].map((_, i) => {
        const isGlowing = glowing.includes(i)
        const delay = mouseEnter ? i * 0.01 : (i % 10) * 0.1
        return (
          <div key={i} style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <motion.div
              initial={{ scale: 1 }}
              animate={{
                scale: (mouseEnter || isGlowing) ? [1, 1.2, 2.5, 2.2, 1.5] : 1,
                background: (mouseEnter || isGlowing) ? '#fff' : 'rgba(255,255,255,0.25)',
              }}
              transition={{ duration: 2, ease: 'easeInOut', delay }}
              style={{ width: 1, height: 1, borderRadius: '50%', background: 'rgba(255,255,255,0.25)', position: 'relative', zIndex: 2 }}
            />
            {mouseEnter && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 2, ease: 'easeInOut', delay: i * 0.01 }}
                style={{
                  position: 'absolute', left: '50%', transform: 'translateX(-50%)',
                  width: 4, height: 4, borderRadius: '50%', zIndex: 1,
                  background: '#76d669', filter: 'blur(1px)',
                  boxShadow: '0 0 6px 2px rgba(118,214,105,0.5)',
                }}
              />
            )}
            <AnimatePresence mode="wait">
              {isGlowing && !mouseEnter && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 2, ease: 'easeInOut', delay }}
                  style={{
                    position: 'absolute', left: '50%', transform: 'translateX(-50%)',
                    width: 4, height: 4, borderRadius: '50%', zIndex: 1,
                    background: '#76d669', filter: 'blur(1px)',
                    boxShadow: '0 0 6px 2px rgba(118,214,105,0.4)',
                  }}
                />
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}

// ─── Glowing Card ───
export function GlowingCard({ title, desc, icon }: {
  title: string
  desc: string
  icon: React.ReactNode
}) {
  const [mouseEnter, setMouseEnter] = useState(false)

  return (
    <div
      onMouseEnter={() => setMouseEnter(true)}
      onMouseLeave={() => setMouseEnter(false)}
      style={{
        background: 'linear-gradient(110deg, #2a3f38 0.6%, #1e302a)',
        borderRadius: 16, border: '1px solid rgba(118,214,105,0.12)',
        overflow: 'hidden', height: '100%',
        transition: 'border-color 0.3s, box-shadow 0.3s',
        borderColor: mouseEnter ? 'rgba(118,214,105,0.3)' : 'rgba(118,214,105,0.12)',
        boxShadow: mouseEnter ? '0 8px 32px rgba(118,214,105,0.1)' : 'none',
      }}
    >
      <StarGrid mouseEnter={mouseEnter} />
      <div style={{ padding: '0 1.5rem 1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 12 }}>
          <div>
            <h3 style={{ fontWeight: 800, fontSize: '1.1rem', color: '#fff', marginBottom: 8 }}>{title}</h3>
            <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.55)', lineHeight: 1.6, maxWidth: 280 }}>{desc}</p>
          </div>
          <div style={{
            width: 40, height: 40, borderRadius: '50%', flexShrink: 0,
            background: 'rgba(255,255,255,0.08)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            {icon}
          </div>
        </div>
      </div>
    </div>
  )
}
