import { useParallax } from '../hooks/useScrollFx'
import './hero.css'

const GLYPHS = [
  { char: '*', depth: -55, top: '12%', left: '6%', size: 'clamp(28px, 4vw, 52px)', cls: 'g-accent' },
  { char: '#', depth: -95, top: '64%', left: '9%', size: 'clamp(22px, 3vw, 40px)', cls: 'g-cyan' },
  { char: '@', depth: -40, top: '22%', left: '84%', size: 'clamp(26px, 3.6vw, 48px)', cls: 'g-pink' },
  { char: '$', depth: -120, top: '70%', left: '88%', size: 'clamp(24px, 3.2vw, 42px)', cls: 'g-accent' },
  { char: '!', depth: -75, top: '38%', left: '94%', size: 'clamp(20px, 2.6vw, 34px)', cls: 'g-cyan' },
  { char: '?', depth: -35, top: '78%', left: '76%', size: 'clamp(20px, 2.6vw, 34px)', cls: 'g-pink' },
  { char: '%', depth: -150, top: '8%', left: '70%', size: 'clamp(22px, 3vw, 40px)', cls: 'g-faint' },
  { char: '&', depth: -60, top: '84%', left: '3%', size: 'clamp(24px, 3vw, 38px)', cls: 'g-faint' },
]

export function Hero() {
  const ref = useParallax<HTMLElement>()

  return (
    <section ref={ref} className="hero" id="top">
      <div className="hero-orbs" aria-hidden="true">
        <div className="orb orb-1" data-parallax style={{ '--depth': 90 } as React.CSSProperties} />
        <div className="orb orb-2" data-parallax style={{ '--depth': -140 } as React.CSSProperties} />
      </div>

      {GLYPHS.map((g) => (
        <span
          key={g.char + g.left}
          aria-hidden="true"
          data-parallax
          className={`hero-glyph ${g.cls}`}
          style={
            {
              '--depth': g.depth,
              top: g.top,
              left: g.left,
              fontSize: g.size,
            } as React.CSSProperties
          }
        >
          {g.char}
        </span>
      ))}

      <div className="container hero-inner" data-parallax style={{ '--depth': 24 } as React.CSSProperties}>
        <p className="hero-tag" data-reveal>
          An interactive field guide to password security
        </p>
        <h1 className="hero-title">
          Your password is either <span className="hero-weak">a skeleton key</span> for strangers
          or <span className="grad-text">a locked door</span>.
        </h1>
        <p className="hero-sub" data-reveal>
          Billions of leaked credentials are circulating right now.
        </p>
        <div className="hero-actions" data-reveal>
          <a href="#anatomy" className="btn btn-primary">
            Test a password
          </a>
          <a href="#stats" className="btn btn-ghost">
            See the numbers
          </a>
        </div>
      </div>

      <div className="hero-scroll-hint" aria-hidden="true">
        <span />
      </div>
    </section>
  )
}
