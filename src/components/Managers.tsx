import { useReveal } from '../hooks/useScrollFx'
import { Icon } from './Icon'
import './managers.css'

const MANAGERS = [
  {
    name: 'Bitwarden',
    url: 'https://bitwarden.com',
    tagline: 'Open source, free tier, self-hostable.',
    highlights: ['Source-audited codebase', 'Generous free sync across devices', 'Self-host if you want full control'],
    tone: 'accent',
  },
  {
    name: '1Password',
    url: 'https://1password.com',
    tagline: 'Polished apps with family and team features.',
    highlights: ['Travel Mode hides vaults at borders', 'Watchtower flags weak & breached logins', 'Excellent passkey support'],
    tone: 'blue',
  },
  {
    name: 'Proton Pass',
    url: 'https://proton.me/pass',
    tagline: 'From the privacy-first makers of Proton Mail.',
    highlights: ['End-to-end encrypted, Swiss jurisdiction', 'Hide-my-email aliases built in', 'Solid free tier'],
    tone: 'violet',
  },
  {
    name: 'KeePassXC',
    url: 'https://keepassxc.org',
    tagline: 'Local, offline, and yours forever.',
    highlights: ['Vault is a file you own — no cloud required', 'Free and open source, no subscription', 'Pair with Syncthing for DIY sync'],
    tone: 'green',
  },
]

const CHECKLIST = [
  'Zero-knowledge, end-to-end encryption',
  'Independent security audits published',
  'Passkey & TOTP two-factor support',
  'Apps for every device you use',
]

export function Managers() {
  const revealRef = useReveal<HTMLElement>()

  return (
    <section ref={revealRef} className="section managers" id="managers">
      <div className="container">
        <div className="section-head" data-reveal>
          <p className="kicker">The fix</p>
          <h2>
            You can’t memorize 100 passwords.
            <br />
            <span className="grad-text">You only need one.</span>
          </h2>
          <p>
            A password manager generates a unique, random credential for every site, stores them
            in an encrypted vault, and fills them for you. You memorize a single long passphrase —
            the vault does the rest.
          </p>
        </div>

        <div className="managers-grid">
          {MANAGERS.map((m, i) => (
            <article
              key={m.name}
              className={`card manager-card tone-${m.tone}`}
              data-reveal
              style={{ '--reveal-delay': `${i * 0.07}s` } as React.CSSProperties}
            >
              <h3>{m.name}</h3>
              <p className="manager-tagline">{m.tagline}</p>
              <ul>
                {m.highlights.map((h) => (
                  <li key={h}>
                    <Icon name="check" size={14} className="manager-check" />
                    {h}
                  </li>
                ))}
              </ul>
              <a href={m.url} target="_blank" rel="noreferrer noopener" className="manager-link">
                {m.url.replace('https://', '')}
                <Icon name="external" size={14} />
              </a>
            </article>
          ))}
        </div>

        <div className="manager-checklist card" data-reveal>
          <h3>Whatever you pick, demand these:</h3>
          <ul>
            {CHECKLIST.map((item) => (
              <li key={item}>
                <Icon name="shield" size={16} className="checklist-icon" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
