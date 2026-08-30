import { useReveal } from '../hooks/useScrollFx'
import { Icon } from './Icon'
import './checkers.css'

const TOOLS = [
  {
    name: 'Have I Been Pwned',
    url: 'https://haveibeenpwned.com',
    highlight: true,
    tagline: 'The canonical breach lookup by Troy Hunt.',
    points: [
      'Search your email across 800+ recorded breaches',
      'Pwned Passwords checks if a password has appeared in any leak',
      'Uses k-anonymity: only a tiny hash fragment of your password ever leaves your device',
      'Free API + domain monitoring for your whole organization',
    ],
  },
  {
    name: 'Firefox Monitor',
    url: 'https://monitor.mozilla.org',
    tagline: 'Mozilla’s breach dashboard, powered by HIBP data.',
    points: [
      'Email breach reports with plain-language explanations',
      'Bundled with Firefox Relay masking for extra hygiene',
      'No account required for a basic scan',
    ],
  },
  {
    name: 'Google Password Checkup',
    url: 'https://passwords.google.com/checkup',
    tagline: 'Built into your Google Account’s password manager.',
    points: [
      'Flags saved passwords that are weak, reused, or appear in leaks',
      'All comparison happens with encrypted hashes, not plain text',
      'One-click tour of every credential Chrome has stored',
    ],
  },
  {
    name: 'DeHashed',
    url: 'https://dehashed.com',
    tagline: 'Deep-search engine over public breach corpora.',
    points: [
      'Search by email, username, name, phone, or address',
      'Surfaces leaks beyond the headline breaches',
      'Paid tool — treat as an OSINT/power-user option',
    ],
  },
]

export function LeakCheckers() {
  const revealRef = useReveal<HTMLElement>()

  return (
    <section ref={revealRef} className="section checkers" id="check">
      <div className="container">
        <div className="section-title" data-reveal>
          <div className="section-title-bg">
            <p className="kicker">Check yourself</p>
            <h2>
              Find out if you’re <span className="grad-text">already in a leak</span>
            </h2>
          </div>
        </div>
        <div className="section-head">
          <p>
            These services index public breach data. Rule of thumb: a lookup tool should never
            need your actual password — tools like Have I Been Pwned use k-anonymity, sending
            only a fragment of a hash so the server learns nothing.
          </p>
        </div>

        <div className="checkers-grid">
          {TOOLS.map((tool, i) => (
            <article
              key={tool.name}
              className={`card tool-card${tool.highlight ? ' tool-highlight' : ''}`}
              data-reveal
              style={{ '--reveal-delay': `${i * 0.07}s` } as React.CSSProperties}
            >
              {tool.highlight && <span className="tool-badge">Start here</span>}
              <h3>{tool.name}</h3>
              <p className="tool-tagline">{tool.tagline}</p>
              <ul>
                {tool.points.map((point) => (
                  <li key={point}>
                    <Icon name="check" size={14} className="tool-check" />
                    {point}
                  </li>
                ))}
              </ul>
              <a href={tool.url} target="_blank" rel="noreferrer noopener" className="tool-link">
                Visit {tool.name}
                <Icon name="external" size={15} />
              </a>
            </article>
          ))}
        </div>

        <p className="checkers-note" data-reveal>
          <Icon name="lock" size={16} />
          Never type your real password into a site you don’t trust. If a “checker” asks for the
          password itself instead of testing it locally, close the tab.
        </p>
      </div>
    </section>
  )
}
