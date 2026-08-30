import './footer.css'

export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-col footer-brand">
          <p className="footer-logo">
            weak<strong>&amp;</strong>strong
          </p>
          <p className="footer-disclaimer">
            An educational, frontend-only showcase. Password analysis runs entirely in your
            browser — nothing you type here is stored or transmitted. Statistics are industry
            estimates; verify details with the linked primary sources.
          </p>
        </div>

        <nav className="footer-col" aria-label="Sources">
          <h4>Sources</h4>
          <ul>
            <li>
              <a href="https://www.verizon.com/business/resources/reports/dbir/" target="_blank" rel="noreferrer noopener">
                Verizon DBIR
              </a>
            </li>
            <li>
              <a href="https://www.ibm.com/reports/data-breach" target="_blank" rel="noreferrer noopener">
                IBM Cost of a Data Breach
              </a>
            </li>
            <li>
              <a href="https://haveibeenpwned.com" target="_blank" rel="noreferrer noopener">
                Have I Been Pwned
              </a>
            </li>
            <li>
              <a href="https://pages.nist.gov/800-63-3/sp800-63b.html" target="_blank" rel="noreferrer noopener">
                NIST SP 800-63B guidelines
              </a>
            </li>
          </ul>
        </nav>

        <nav className="footer-col" aria-label="Managers">
          <h4>Managers</h4>
          <ul>
            <li><a href="https://bitwarden.com" target="_blank" rel="noreferrer noopener">Bitwarden</a></li>
            <li><a href="https://1password.com" target="_blank" rel="noreferrer noopener">1Password</a></li>
            <li><a href="https://proton.me/pass" target="_blank" rel="noreferrer noopener">Proton Pass</a></li>
            <li><a href="https://keepassxc.org" target="_blank" rel="noreferrer noopener">KeePassXC</a></li>
          </ul>
        </nav>
      </div>

      <div className="container footer-meta">
        <span>Built with React, Vite, and hand-written CSS — scroll-driven animations, parallax, container-friendly grids.</span>
      </div>
    </footer>
  )
}
