const MATRIX_CHARS = '01アイウエオカキクケコサシスセソタチツテトニ10110'
const FONT = '10px "JetBrains Mono", ui-monospace, monospace'

type MatrixColumn = {
  x: number
  y: number
  speed: number
  chars: string[]
}

type MatrixState = {
  canvas: HTMLCanvasElement
  columns: MatrixColumn[]
  rafId: number
  active: boolean
  touchStopTimer?: number
}

const states = new WeakMap<HTMLElement, MatrixState>()
const TOUCH_STOP_DELAY_MS = 180

function clearTouchStopTimer(state: MatrixState) {
  if (state.touchStopTimer === undefined) return
  window.clearTimeout(state.touchStopTimer)
  state.touchStopTimer = undefined
}

function scheduleTouchStop(button: HTMLElement, state: MatrixState) {
  clearTouchStopTimer(state)
  state.touchStopTimer = window.setTimeout(() => {
    state.touchStopTimer = undefined
    stopMatrix(button)
  }, TOUCH_STOP_DELAY_MS)
}

function randomChar(): string {
  return MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)] ?? '0'
}

function buildColumns(width: number, height: number): MatrixColumn[] {
  const step = 11
  const count = Math.max(4, Math.floor(width / step))

  return Array.from({ length: count }, (_, index) => ({
    x: index * step + 2,
    y: Math.random() * height,
    speed: 1.5 + Math.random() * 3.5,
    chars: Array.from({ length: 24 }, randomChar),
  }))
}

function resizeMatrix(button: HTMLElement, state: MatrixState) {
  const { canvas } = state
  const width = button.clientWidth
  const height = button.clientHeight

  canvas.width = Math.max(1, width)
  canvas.height = Math.max(1, height)
  state.columns = buildColumns(width, height)
}

function drawMatrix(button: HTMLElement, state: MatrixState) {
  if (!state.active) return

  const ctx = state.canvas.getContext('2d')
  if (!ctx) return

  const { width, height } = state.canvas
  const isPrimary = button.classList.contains('btn-primary')

  ctx.fillStyle = isPrimary ? 'rgba(5, 6, 8, 0.18)' : 'rgba(5, 6, 8, 0.22)'
  ctx.fillRect(0, 0, width, height)
  ctx.font = FONT
  ctx.textBaseline = 'top'

  for (const column of state.columns) {
    const headIndex = Math.floor(column.y / 12) % column.chars.length
    const trailLength = 5

    for (let trail = 0; trail < trailLength; trail += 1) {
      const charIndex = (headIndex - trail + column.chars.length) % column.chars.length
      const char = column.chars[charIndex]
      const y = column.y - trail * 12
      if (y < -12 || y > height + 12) continue

      const fade = 1 - trail / trailLength
      const greenMix = trail === 0 ? 0.35 : 0.12
      const r = Math.round(61 * (1 - greenMix) + 0 * greenMix)
      const g = Math.round(217 * (1 - greenMix) + 255 * greenMix)
      const b = Math.round(238 * (1 - greenMix) + 65 * greenMix)

      ctx.fillStyle = isPrimary
        ? `rgba(${r}, ${g}, ${b}, ${0.25 + fade * 0.55})`
        : `rgba(${r}, ${g}, ${b}, ${0.18 + fade * 0.5})`
      ctx.fillText(char, column.x, y)
    }

    column.y += column.speed
    if (column.y - trailLength * 12 > height) {
      column.y = -Math.random() * height * 0.4
      column.chars = Array.from({ length: 24 }, randomChar)
    }
  }

  state.rafId = requestAnimationFrame(() => drawMatrix(button, state))
}

function startMatrix(button: HTMLElement) {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

  const state = states.get(button)
  if (!state) return

  if (state.active) return

  resizeMatrix(button, state)
  state.active = true
  button.classList.add('matrix-btn--active')
  cancelAnimationFrame(state.rafId)
  drawMatrix(button, state)
}

function stopMatrix(button: HTMLElement) {
  const state = states.get(button)
  if (!state || !state.active) return

  clearTouchStopTimer(state)
  state.active = false
  button.classList.remove('matrix-btn--active')
  cancelAnimationFrame(state.rafId)

  const ctx = state.canvas.getContext('2d')
  ctx?.clearRect(0, 0, state.canvas.width, state.canvas.height)
}

function setupMatrixButton(button: HTMLElement) {
  if (button.dataset.matrixReady === 'true') return

  button.dataset.matrixReady = 'true'
  button.classList.add('matrix-btn')

  const canvas = document.createElement('canvas')
  canvas.className = 'matrix-btn__canvas'
  canvas.setAttribute('aria-hidden', 'true')
  button.prepend(canvas)

  const state: MatrixState = {
    canvas,
    columns: [],
    rafId: 0,
    active: false,
  }
  states.set(button, state)

  const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches

  const onMouseEnter = () => startMatrix(button)
  const onMouseLeave = () => stopMatrix(button)
  const onFocus = () => {
    if (button.matches(':focus-visible')) startMatrix(button)
  }
  const onBlur = () => {
    if (state.touchStopTimer !== undefined) return
    stopMatrix(button)
  }
  const onPointerDown = (event: PointerEvent) => {
    if (event.pointerType !== 'touch') return
    clearTouchStopTimer(state)
    startMatrix(button)
  }
  const onPointerUp = (event: PointerEvent) => {
    if (event.pointerType !== 'touch') return
    scheduleTouchStop(button, state)
  }
  const onPointerCancel = (event: PointerEvent) => {
    if (event.pointerType !== 'touch') return
    stopMatrix(button)
  }
  const onResize = () => {
    if (state.active) resizeMatrix(button, state)
  }

  if (canHover) {
    button.addEventListener('mouseenter', onMouseEnter)
    button.addEventListener('mouseleave', onMouseLeave)
  }

  button.addEventListener('pointerdown', onPointerDown)
  button.addEventListener('pointerup', onPointerUp)
  button.addEventListener('pointercancel', onPointerCancel)
  button.addEventListener('focus', onFocus)
  button.addEventListener('blur', onBlur)
  window.addEventListener('resize', onResize)
}

const BUTTON_SELECTOR = '.btn-primary, .btn-secondary'

export function initMatrixButtons(root: ParentNode = document) {
  root.querySelectorAll<HTMLElement>(BUTTON_SELECTOR).forEach(setupMatrixButton)
}

export function observeMatrixButtons(root: ParentNode = document.body) {
  initMatrixButtons(root)

  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      mutation.addedNodes.forEach((node) => {
        if (!(node instanceof HTMLElement)) return
        if (node.matches(BUTTON_SELECTOR)) setupMatrixButton(node)
        initMatrixButtons(node)
      })
    }
  })

  observer.observe(root, { childList: true, subtree: true })
  return () => observer.disconnect()
}
