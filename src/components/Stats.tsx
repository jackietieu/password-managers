import { useEffect, useRef, useState } from 'react'
import { useParallax, useReveal } from '../hooks/useScrollFx'
import './stats.css'

interface Stat {
  to: number
  decimals?: number
  prefix?: string
  suffix?: string
  label: string
  source: string
}

const STATS: Stat[] = [
  {
    to: 81,
    suffix: '%',
    label: 'of hacking-related breaches leveraged stolen or weak passwords',
    source: 'Verizon Data Breach Investigations Report',
  },
  {
    to: 65,
    suffix: '%',
    label: 'of people reuse the same password across multiple accounts',
    source: 'Google / Harris Poll password survey',
  },
  {
    to: 24,
    suffix: 'B',
    label: 'stolen username and password pairs circulating on criminal marketplaces',
    source: 'Digital Shadows dark-web census',
  },
  {
    to: 4.88,
    decimals: 2,
    prefix: '$',
    suffix: 'M',
    label: 'average total cost of a single data breach to a company',
    source: 'IBM Cost of a Data Breach Report',
  },
]

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const onChange = () => setReduced(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])
  return reduced
}

function Counter({ to, decimals = 0, prefix = '', suffix = '' }: Stat) {
  const ref = useRef<HTMLSpanElement>(null)
  const [value, setValue] = useState(0)
  const reduced = usePrefersReducedMotion()

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (reduced) {
      setValue(to)
      return
    }

    let raf = 0
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        io.disconnect()
        const t0 = performance.now()
        const duration = 1700
        const tick = (t: number) => {
          const p = Math.min(1, (t - t0) / duration)
          setValue(to * (1 - Math.pow(1 - p, 3)))
          if (p < 1) raf = requestAnimationFrame(tick)
        }
        raf = requestAnimationFrame(tick)
      },
      { threshold: 0.4 },
    )
    io.observe(el)
    return () => {
      io.disconnect()
      cancelAnimationFrame(raf)
    }
  }, [to, reduced])

  return (
    <span ref={ref} className="stat-number">
      {prefix}
      {value.toFixed(decimals)}
      <span className="stat-suffix">{suffix}</span>
    </span>
  )
}

export function Stats() {
  const revealRef = useReveal<HTMLElement>()
  const parallaxRef = useParallax<HTMLDivElement>()

  return (
    <section ref={revealRef} className="section stats" id="stats">
      <div ref={parallaxRef} className="stats-deco" aria-hidden="true">
        <div className="stats-orb" data-parallax style={{ '--depth': -110 } as React.CSSProperties} />
      </div>
      <div className="container">
        <div className="section-title" data-reveal>
          <div className="section-title-bg">
            <p className="kicker">The problem</p>
            <h2>
              Weak passwords aren’t a personal failing.
              <br />
              They’re <span className="grad-text">a global supply chain</span> for crime.
            </h2>
          </div>
        </div>
        <div className="section-head">
          <p>
            When a company is breached, its password database lands on a marketplace within
            days. From there, it gets replayed against every other site you use.
          </p>
        </div>

        <div className="stats-grid">
          {STATS.map((stat, i) => (
            <article
              key={stat.label}
              className="card stat-card"
              data-reveal
              data-parallax
              style={
                { '--depth': 14 + i * 16, '--reveal-delay': `${i * 0.08}s` } as React.CSSProperties
              }
            >
              <Counter {...stat} />
              <p className="stat-label">{stat.label}</p>
              <p className="stat-source">{stat.source}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
