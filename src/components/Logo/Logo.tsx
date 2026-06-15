import logoFd from '../../assets/logo-fd.png'
import { cn } from '../../lib/cn'

type LogoProps = {
  size?: 'sm' | 'md' | 'lg'
  glow?: boolean
}

const sizeClasses = {
  sm: 'size-10',
  md: 'size-12',
  lg: 'size-[4.5rem] sm:size-20',
} as const

export function Logo({ size = 'md', glow = false }: LogoProps) {
  return (
    <span className={cn('inline-flex shrink-0 items-center justify-center', sizeClasses[size])}>
      <img
        src={logoFd}
        alt="Logo Filippo Dimita"
        className={cn(
          'size-full object-contain',
          glow && 'drop-shadow-[0_0_12px_rgb(34_211_238/0.45)] drop-shadow-[0_0_28px_rgb(59_130_246/0.25)]',
        )}
        width={size === 'lg' ? 80 : size === 'md' ? 48 : 40}
        height={size === 'lg' ? 80 : size === 'md' ? 48 : 40}
        loading={size === 'lg' ? 'eager' : 'lazy'}
        decoding="async"
      />
    </span>
  )
}
