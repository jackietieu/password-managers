import type { JSX } from 'react'

const PATHS: Record<string, JSX.Element> = {
  database: (
    <>
      <ellipse cx="12" cy="5" rx="8" ry="3" />
      <path d="M4 5v14c0 1.66 3.58 3 8 3s8-1.34 8-3V5" />
      <path d="M4 12c0 1.66 3.58 3 8 3s8-1.34 8-3" />
    </>
  ),
  repeat: (
    <>
      <path d="m17 2 4 4-4 4" />
      <path d="M3 11v-1a4 4 0 0 1 4-4h14" />
      <path d="m7 22-4-4 4-4" />
      <path d="M21 13v1a4 4 0 0 1-4 4H3" />
    </>
  ),
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </>
  ),
  bug: (
    <>
      <path d="M9 7V6a3 3 0 1 1 6 0v1" />
      <path d="M8 6h8l1 4a5 5 0 0 1-10 0l1-4Z" />
      <path d="M12 10v11" />
      <path d="M6.5 8 4 6.5" />
      <path d="M17.5 8 20 6.5" />
      <path d="M7 13H4" />
      <path d="M17 13h3" />
      <path d="M7.5 17.5 5 19" />
      <path d="M16.5 17.5 19 19" />
    </>
  ),
  zap: <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8Z" />,
  user: (
    <>
      <circle cx="12" cy="8" r="4" />
      <path d="M5 21c0-3.87 3.13-7 7-7s7 3.13 7 7" />
    </>
  ),
  key: (
    <>
      <circle cx="8" cy="16" r="4" />
      <path d="M10.83 13.17 20 4" />
      <path d="m16.5 7.5 3 3" />
    </>
  ),
  shield: (
    <>
      <path d="M12 2 4 6v6c0 5 3.42 8.42 8 10 4.58-1.58 8-5 8-10V6l-8-4Z" />
    </>
  ),
  check: <path d="m5 12 5 5 9-10" />,
  x: <path d="M6 6l12 12M18 6 6 18" />,
  alert: (
    <>
      <path d="M12 3 2 20h20L12 3Z" />
      <path d="M12 10v4" />
      <path d="M12 17.5h.01" />
    </>
  ),
  eye: (
    <>
      <path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6-10-6-10-6Z" />
      <circle cx="12" cy="12" r="3" />
    </>
  ),
  eyeOff: (
    <>
      <path d="M2 12s3.5-6 10-6c2.1 0 3.9.65 5.4 1.5M22 12s-3.5 6-10 6c-2.1 0-3.9-.65-5.4-1.5" />
      <path d="m4 4 16 16" />
    </>
  ),
  external: (
    <>
      <path d="M14 4h6v6" />
      <path d="M20 4 10 14" />
      <path d="M18 13v6a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h6" />
    </>
  ),
  lock: (
    <>
      <rect x="4" y="11" width="16" height="10" rx="2" />
      <path d="M8 11V7a4 4 0 0 1 8 0v4" />
    </>
  ),
  gauge: (
    <>
      <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
      <path d="m14 10 4-4" />
      <path d="M3.5 18a10 10 0 1 1 17 0" />
    </>
  ),
}

interface IconProps {
  name: keyof typeof PATHS | string
  size?: number
  className?: string
}

export function Icon({ name, size = 20, className }: IconProps) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {PATHS[name] ?? PATHS.key}
    </svg>
  )
}
