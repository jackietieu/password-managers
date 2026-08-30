import { useEffect, useState } from 'react'
import { Icon } from './Icon'
import './nav.css'

const LINKS = [
  { href: '#stats', label: 'The Problem' },
  { href: '#anatomy', label: 'Anatomy' },
  { href: '#leaks', label: 'How It Leaks' },
  { href: '#check', label: 'Check Yourself' },
  { href: '#managers', label: 'The Fix' },
]

export function Nav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`nav${scrolled ? ' nav-scrolled' : ''}`}>
      <div className="container nav-inner">
        <a href="#top" className="nav-logo" aria-label="Back to top">
          <Icon name="key" size={18} />
          <span>Password Security</span>
        </a>
        <nav className="nav-links" aria-label="Sections">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href}>
              {l.label}
            </a>
          ))}
        </nav>
        <a href="#anatomy" className="nav-cta">
          Test a password
        </a>
      </div>
      {/* Pure-CSS scroll progress: animated on the scroll() timeline where
          supported; hidden otherwise. */}
      <div className="nav-progress" aria-hidden="true" />
    </header>
  )
}
