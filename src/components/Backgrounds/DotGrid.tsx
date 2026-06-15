import { useCallback, useEffect, useMemo, useRef } from 'react'
import { cn } from '../../lib/cn'

type Dot = {
  cx: number
  cy: number
}

export type DotGridProps = {
  dotSize?: number
  gap?: number
  baseColor?: string
  activeColor?: string
  proximity?: number
  className?: string
  style?: React.CSSProperties
}

function hexToRgb(hex: string) {
  const match = hex.match(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i)
  if (!match) return { r: 0, g: 0, b: 0 }

  return {
    r: Number.parseInt(match[1], 16),
    g: Number.parseInt(match[2], 16),
    b: Number.parseInt(match[3], 16),
  }
}

function throttle<T extends (...args: never[]) => void>(func: T, limit: number) {
  let lastCall = 0

  return (...args: Parameters<T>) => {
    const now = performance.now()
    if (now - lastCall >= limit) {
      lastCall = now
      func(...args)
    }
  }
}

export function DotGrid({
  dotSize = 10,
  gap = 28,
  baseColor = '#1a2836',
  activeColor = '#22d3ee',
  proximity = 140,
  className,
  style,
}: DotGridProps) {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const dotsRef = useRef<Dot[]>([])
  const pointerRef = useRef({ x: -1000, y: -1000 })
  const reducedMotionRef = useRef(false)

  const baseRgb = useMemo(() => hexToRgb(baseColor), [baseColor])
  const activeRgb = useMemo(() => hexToRgb(activeColor), [activeColor])

  const circlePath = useMemo(() => {
    if (typeof window === 'undefined' || !window.Path2D) return null

    const path = new Path2D()
    path.arc(0, 0, dotSize / 2, 0, Math.PI * 2)
    return path
  }, [dotSize])

  const buildGrid = useCallback(() => {
    const wrap = wrapperRef.current
    const canvas = canvasRef.current
    if (!wrap || !canvas) return

    const { width, height } = wrap.getBoundingClientRect()
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    canvas.width = width * dpr
    canvas.height = height * dpr
    canvas.style.width = `${width}px`
    canvas.style.height = `${height}px`

    const ctx = canvas.getContext('2d')
    if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

    const cols = Math.floor((width + gap) / (dotSize + gap))
    const rows = Math.floor((height + gap) / (dotSize + gap))
    const cell = dotSize + gap
    const gridW = cell * cols - gap
    const gridH = cell * rows - gap
    const startX = (width - gridW) / 2 + dotSize / 2
    const startY = (height - gridH) / 2 + dotSize / 2
    const dots: Dot[] = []

    for (let y = 0; y < rows; y += 1) {
      for (let x = 0; x < cols; x += 1) {
        dots.push({
          cx: startX + x * cell,
          cy: startY + y * cell,
        })
      }
    }

    dotsRef.current = dots
  }, [dotSize, gap])

  useEffect(() => {
    reducedMotionRef.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  }, [])

  useEffect(() => {
    if (!circlePath) return

    let rafId = 0
    const proxSq = proximity * proximity

    const draw = () => {
      const canvas = canvasRef.current
      if (!canvas) return

      const ctx = canvas.getContext('2d')
      if (!ctx) return

      const { width, height } = canvas.getBoundingClientRect()
      ctx.clearRect(0, 0, width, height)

      const { x: px, y: py } = pointerRef.current
      const usePointer = !reducedMotionRef.current

      for (const dot of dotsRef.current) {
        const dx = dot.cx - px
        const dy = dot.cy - py
        const dsq = dx * dx + dy * dy

        let fill = baseColor
        if (usePointer && dsq <= proxSq) {
          const dist = Math.sqrt(dsq)
          const t = 1 - dist / proximity
          const r = Math.round(baseRgb.r + (activeRgb.r - baseRgb.r) * t)
          const g = Math.round(baseRgb.g + (activeRgb.g - baseRgb.g) * t)
          const b = Math.round(baseRgb.b + (activeRgb.b - baseRgb.b) * t)
          fill = `rgb(${r},${g},${b})`
        }

        ctx.save()
        ctx.translate(dot.cx, dot.cy)
        ctx.fillStyle = fill
        ctx.fill(circlePath)
        ctx.restore()
      }

      rafId = requestAnimationFrame(draw)
    }

    draw()
    return () => cancelAnimationFrame(rafId)
  }, [activeRgb, baseColor, baseRgb, circlePath, proximity])

  useEffect(() => {
    buildGrid()

    const resizeObserver =
      'ResizeObserver' in window
        ? new ResizeObserver(buildGrid)
        : null

    if (resizeObserver && wrapperRef.current) {
      resizeObserver.observe(wrapperRef.current)
    } else {
      window.addEventListener('resize', buildGrid)
    }

    return () => {
      resizeObserver?.disconnect()
      window.removeEventListener('resize', buildGrid)
    }
  }, [buildGrid])

  useEffect(() => {
    const updatePointer = (clientX: number, clientY: number) => {
      const canvas = canvasRef.current
      if (!canvas) return

      const rect = canvas.getBoundingClientRect()
      pointerRef.current = {
        x: clientX - rect.left,
        y: clientY - rect.top,
      }
    }

    const onMove = throttle((event: MouseEvent) => {
      updatePointer(event.clientX, event.clientY)
    }, 32)

    const onTouch = throttle((event: TouchEvent) => {
      const touch = event.touches[0]
      if (touch) updatePointer(touch.clientX, touch.clientY)
    }, 32)

    const onLeave = () => {
      pointerRef.current = { x: -1000, y: -1000 }
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('touchstart', onTouch, { passive: true })
    window.addEventListener('touchmove', onTouch, { passive: true })
    window.addEventListener('mouseleave', onLeave)

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('touchstart', onTouch)
      window.removeEventListener('touchmove', onTouch)
      window.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return (
    <div
      ref={wrapperRef}
      aria-hidden="true"
      className={cn('relative h-full w-full', className)}
      style={style}
    >
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
    </div>
  )
}
