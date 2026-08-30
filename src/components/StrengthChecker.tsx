import { useMemo, useState } from 'react'
import { analyze, VERDICT_META, type Analysis, type Verdict } from '../lib/entropy'
import { useReveal } from '../hooks/useScrollFx'
import { Icon } from './Icon'
import './checker.css'

const VERDICT_ORDER: Verdict[] = ['very-weak', 'weak', 'fair', 'strong', 'excellent']

const VERDICT_COLORS: Record<Verdict, string> = {
  'very-weak': 'var(--bad)',
  weak: 'var(--bad)',
  fair: 'var(--warn)',
  strong: 'var(--good)',
  excellent: 'var(--good)',
}

const PRESETS = [
  { label: 'password123', value: 'password123' },
  { label: 'Summer2024!', value: 'Summer2024!' },
  { label: 'Tr0ub4dor&3', value: 'Tr0ub4dor&3' },
  { label: 'blue-mango-trombone-71', value: 'blue-mango-trombone-71' },
  { label: 'vX9#kQ2$mLp!7Zr', value: 'vX9#kQ2$mLp!7Zr' },
]
function Meter({ verdict }: { verdict: Verdict }) {
  const level = VERDICT_ORDER.indexOf(verdict)
  return (
    <div className="meter" role="img" aria-label={`Strength: ${level + 1} of 5`}>
      {VERDICT_ORDER.map((v, i) => (
        <span
          key={v}
          className={`meter-seg${i <= level ? ' meter-on' : ''}`}
          style={i <= level ? { background: VERDICT_COLORS[VERDICT_ORDER[level]] } : undefined}
        />
      ))}
    </div>
  )
}


export function StrengthChecker() {
  const [password, setPassword] = useState('')
  const [show, setShow] = useState(true)
  const revealRef = useReveal<HTMLElement>()

  const result: Analysis = useMemo(() => analyze(password), [password])
  const meta = VERDICT_META[result.verdict]
  const empty = password.length === 0

  return (
    <section ref={revealRef} className="section checker" id="anatomy">
      <div className="container">
        <div className="section-head" data-reveal>
          <p className="kicker">Anatomy</p>
          <h2>
            What separates a <s style={{ color: 'var(--bad)' }}>weak</s> password from a{' '}
            <span className="grad-text">strong</span> one?
          </h2>
          <p>
            Strength is measured in <strong>entropy</strong> — the number of bits of guesswork an
            attacker must burn. Type below, or pick a famous example. Everything runs locally in
            your browser; nothing is sent anywhere.
          </p>
        </div>

        <div className="checker-grid">
          <div className="card checker-panel" data-reveal>
            <div className="checker-input-row">
              <input
                className="checker-input"
                type={show ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Type a password to dissect…"
                autoComplete="off"
                autoCapitalize="off"
                spellCheck={false}
                aria-label="Password to analyze"
              />
              <button
                type="button"
                className="checker-eye"
                onClick={() => setShow((s) => !s)}
                aria-label={show ? 'Hide password' : 'Show password'}
              >
                <Icon name={show ? 'eyeOff' : 'eye'} size={19} />
              </button>
            </div>

            <Meter verdict={result.verdict} />

            <div className="checker-readout">
              <div>
                <span
                  className="checker-verdict"
                  style={{ color: empty ? 'var(--muted)' : VERDICT_COLORS[result.verdict] }}
                >
                  {empty ? 'Awaiting input' : meta.label}
                </span>
                <p className="checker-blurb">{empty ? 'Try one of the presets below.' : meta.blurb}</p>
              </div>
              <dl className="checker-stats">
                <div>
                  <dt>Entropy</dt>
                  <dd>{result.entropy.toFixed(1)} bits</dd>
                </div>
                <div>
                  <dt>Charset</dt>
                  <dd>{result.pool} chars</dd>
                </div>
                <div>
                  <dt>Length</dt>
                  <dd>{result.length}</dd>
                </div>
              </dl>
            </div>

            <div className={`checker-crack${empty ? ' is-empty' : ''}`}>
              <Icon name="gauge" size={18} />
              <span>
                Offline attack, 10 billion guesses/sec:{' '}
                <strong>{empty ? '—' : result.crackTime}</strong>
              </span>
            </div>

            {result.issues.length > 0 && (
              <ul className="checker-issues">
                {result.issues.map((issue) => (
                  <li key={issue}>
                    <Icon name="alert" size={15} className="issue-icon" />
                    {issue}
                  </li>
                ))}
              </ul>
            )}

            <div className="checker-presets">
              <span>Famous examples:</span>
              {PRESETS.map((p) => (
                <button key={p.value} type="button" onClick={() => setPassword(p.value)}>
                  <code>{p.label}</code>
                </button>
              ))}
            </div>
          </div>

          <aside className="checker-recipe" data-reveal style={{ '--reveal-delay': '0.12s' } as React.CSSProperties}>
            <h3>
              <Icon name="check" size={18} className="recipe-icon" />
              The recipe that actually works
            </h3>
            <ol>
              <li>
                <strong>Length beats complexity.</strong> Four random words outrank{' '}
                <code>P@ss1!</code> — every extra character multiplies the search space.
              </li>
              <li>
                <strong>Use a passphrase.</strong> <code>blue-mango-trombone-71</code> is 87 bits of
                entropy and you can memorize it.
              </li>
              <li>
                <strong>Never reuse.</strong> A unique password per site turns one breach into one
                problem instead of fifty.
              </li>
              <li>
                <strong>Add a second factor.</strong> A stolen password with 2FA enabled is a
                locked door with a deadbolt behind it.
              </li>
              <li>
                <strong>Let a manager remember.</strong> You only need to memorize one long
                passphrase — the generator handles the rest.
              </li>
            </ol>
          </aside>
        </div>
      </div>
    </section>
  )
}
