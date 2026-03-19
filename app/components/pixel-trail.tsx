'use client'

import React, { useCallback, useMemo, useRef, useState, useEffect } from 'react'
import { motion, useAnimationControls } from 'framer-motion'
import { v4 as uuidv4 } from 'uuid'

// ─── useDimensions hook ───
function useDimensions(ref: React.RefObject<HTMLElement | null>) {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>
    const update = () => {
      if (ref.current) {
        const { width, height } = ref.current.getBoundingClientRect()
        setDimensions({ width, height })
      }
    }
    const debounced = () => { clearTimeout(timeoutId); timeoutId = setTimeout(update, 250) }
    update()
    window.addEventListener('resize', debounced)
    return () => { window.removeEventListener('resize', debounced); clearTimeout(timeoutId) }
  }, [ref])

  return dimensions
}

// ─── PixelDot ───
interface PixelDotProps {
  id: string
  size: number
  fadeDuration: number
  delay: number
  color: string
}

const PixelDot: React.FC<PixelDotProps> = React.memo(({ id, size, fadeDuration, delay, color }) => {
  const controls = useAnimationControls()

  const animatePixel = useCallback(() => {
    controls.start({
      opacity: [1, 0],
      transition: { duration: fadeDuration / 1000, delay: delay / 1000 },
    })
  }, [controls, fadeDuration, delay])

  const ref = useCallback((node: HTMLDivElement | null) => {
    if (node) (node as any).__animatePixel = animatePixel
  }, [animatePixel])

  return (
    <motion.div
      id={id}
      ref={ref}
      style={{
        width: size, height: size, borderRadius: '50%',
        background: color,
      }}
      initial={{ opacity: 0 }}
      animate={controls}
      exit={{ opacity: 0 }}
    />
  )
})
PixelDot.displayName = 'PixelDot'

// ─── PixelTrail ───
interface PixelTrailProps {
  pixelSize?: number
  fadeDuration?: number
  delay?: number
  color?: string
}

export function PixelTrail({
  pixelSize = 60,
  fadeDuration = 0,
  delay = 1200,
  color = 'rgba(118,214,105,0.18)',
}: PixelTrailProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const dimensions = useDimensions(containerRef)
  const trailId = useRef(uuidv4())

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = Math.floor((e.clientX - rect.left) / pixelSize)
    const y = Math.floor((e.clientY - rect.top) / pixelSize)
    const el = document.getElementById(`${trailId.current}-pixel-${x}-${y}`)
    if (el) {
      const fn = (el as any).__animatePixel
      if (fn) fn()
    }
  }, [pixelSize])

  const columns = useMemo(() => Math.ceil(dimensions.width / pixelSize), [dimensions.width, pixelSize])
  const rows = useMemo(() => Math.ceil(dimensions.height / pixelSize), [dimensions.height, pixelSize])

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'auto', zIndex: 0 }}
    >
      {Array.from({ length: rows }).map((_, row) => (
        <div key={row} style={{ display: 'flex' }}>
          {Array.from({ length: columns }).map((_, col) => (
            <PixelDot
              key={`${col}-${row}`}
              id={`${trailId.current}-pixel-${col}-${row}`}
              size={pixelSize}
              fadeDuration={fadeDuration}
              delay={delay}
              color={color}
            />
          ))}
        </div>
      ))}
    </div>
  )
}
