import { useCallback, useState } from 'react'
import logoFd from '../../assets/logo-fd.png'
import { markIntroAsSeen } from '../../hooks/useIntroScreen'
import { cn } from '../../lib/cn'

type IntroPhase = 'idle' | 'warmup' | 'stable' | 'reveal' | 'exit'

type IntroScreenProps = {
  onComplete: () => void
}

const HINT: Record<IntroPhase, string> = {
  idle: 'Accendi il sistema',
  warmup: 'Accensione web-segnale...',
  stable: 'Segnale in aggancio...',
  reveal: 'Sistema online',
  exit: '',
}

export function IntroScreen({ onComplete }: IntroScreenProps) {
  const [phase, setPhase] = useState<IntroPhase>('idle')

  const finish = useCallback(() => {
    markIntroAsSeen()
    onComplete()
  }, [onComplete])

  const handlePowerOn = () => {
    if (phase !== 'idle') return
    setPhase('warmup')

    window.setTimeout(() => setPhase('stable'), 3200)
    window.setTimeout(() => setPhase('reveal'), 4000)
    window.setTimeout(() => setPhase('exit'), 5800)
    window.setTimeout(() => finish(), 6500)
  }

  return (
    <div
      className={cn(
        'intro-screen fixed inset-0 z-[200] flex flex-col items-center justify-end overflow-hidden bg-black pb-[max(2.5rem,env(safe-area-inset-bottom))]',
        phase === 'warmup' && 'intro-screen--warmup',
        phase === 'stable' && 'intro-screen--stable',
        phase === 'reveal' && 'intro-screen--reveal',
        phase === 'exit' && 'intro-screen--exit',
      )}
      role="dialog"
      aria-modal="true"
      aria-label="Schermata di avvio"
    >
      <div className="intro-sky" aria-hidden="true">
        <div className="intro-cloud intro-cloud--left" />
        <div className="intro-cloud intro-cloud--right" />

        <div className="intro-signal-disk">
          <div className="intro-signal-disk-glow" aria-hidden="true" />
          <div className="intro-signal-disk-vignette" aria-hidden="true" />
          <div className="intro-signal-disk-inner">
            <div className="intro-logo-stage">
              <img
                src={logoFd}
                alt="Logo Filippo Dimita"
                className="intro-logo"
                width={112}
                height={112}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="intro-beam" aria-hidden="true">
        <div className="intro-beam-core" />
        <div className="intro-beam-glow" />
        <div className="intro-beam-flicker" />
      </div>

      <div className="intro-projector" aria-hidden="true">
        <span className="intro-projector-lens" />
      </div>

      <div className="intro-controls flex flex-col items-center gap-4 px-6 pb-6">
        <p className="intro-hint font-mono text-sm tracking-widest text-text-muted uppercase">
          {HINT[phase]}
        </p>

        <button
          type="button"
          className={cn('intro-switch', phase !== 'idle' && 'intro-switch--on')}
          onClick={handlePowerOn}
          disabled={phase !== 'idle'}
          aria-label="Accendi il portfolio"
          aria-pressed={phase !== 'idle'}
        >
          <span className="intro-switch-track" aria-hidden="true">
            <span className="intro-switch-thumb" />
          </span>
          <span className="intro-switch-label">
            <span className="intro-switch-off">OFF</span>
            <span className="intro-switch-on-text">ON</span>
          </span>
        </button>
      </div>
    </div>
  )
}
