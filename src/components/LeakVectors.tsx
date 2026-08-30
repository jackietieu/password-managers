import { useParallax, useReveal } from '../hooks/useScrollFx'
import { Icon } from './Icon'
import './vectors.css'

const VECTORS = [
  {
    icon: 'database',
    title: 'Data breaches',
    body: 'A site you signed up for gets hacked. Passwords hashed with fast, outdated schemes (or in plain text) are cracked offline within days and dumped on a marketplace.',
    stat: 'Collection #1 alone held 773M addresses',
  },
  {
    icon: 'repeat',
    title: 'Credential stuffing',
    body: 'Attackers replay your leaked email–password pair against every major service, logging in wherever you reused it. One breach quietly becomes fifty.',
    stat: 'Billions of stuffing attempts per day, per major CDNs',
  },
  {
    icon: 'mail',
    title: 'Phishing',
    body: 'A convincing fake login page harvests the password the moment you type it. No cracking required — you hand it over.',
    stat: 'Most breaches start with a human, not a hash',
  },
  {
    icon: 'bug',
    title: 'Malware & keyloggers',
    body: 'Infected devices record keystrokes, scrape browser-saved passwords, or dump session cookies — bypassing strength entirely.',
    stat: 'Infostealer logs are sold per-machine, ready to replay',
  },
  {
    icon: 'zap',
    title: 'Brute force & dictionaries',
    body: 'Short or patterned passwords fall to GPU rigs that guess tens of billions of combinations per second. “P@ssw0rd!” is in the wordlist.',
    stat: '10 billion guesses per second on commodity hardware',
  },
  {
    icon: 'user',
    title: 'Personal guesswork',
    body: 'Pet names, birthdays, favorite teams. People who know you — or your social media — try those first. Your password is often more public than you think.',
    stat: 'Most reused passwords are names and years',
  },
]

export function LeakVectors() {
  const revealRef = useReveal<HTMLElement>()
  const parallaxRef = useParallax<HTMLDivElement>()

  return (
    <section ref={revealRef} className="section vectors" id="leaks">
      <div ref={parallaxRef} className="vectors-deco" aria-hidden="true">
        <div className="vectors-orb" data-parallax style={{ '--depth': -90 } as React.CSSProperties} />
      </div>
      <div className="container">
        <div className="section-head" data-reveal>
          <p className="kicker">Escape routes</p>
          <h2>
            Six ways your password <span className="grad-text">leaves without you</span>
          </h2>
          <p>
            Almost every account takeover traces back to one of these. Note how many of them
            never involve “guessing” your password at all.
          </p>
        </div>

        <ol className="vector-timeline">
          {VECTORS.map((v, i) => (
            <li key={v.title} className="vector-item" data-reveal style={{ '--reveal-delay': `${(i % 2) * 0.1}s` } as React.CSSProperties}>
              <div className="vector-marker" aria-hidden="true">
                <Icon name={v.icon} size={20} />
              </div>
              <article className="card vector-card">
                <h3>
                  <span className="vector-index">{String(i + 1).padStart(2, '0')}</span>
                  {v.title}
                </h3>
                <p>{v.body}</p>
                <p className="vector-stat">{v.stat}</p>
              </article>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
