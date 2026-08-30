# Password Security — An Interactive Guide

**Live site: <https://jackietieu.github.io/password-managers/>**

An interactive, frontend-only guide to password security: what weak passwords cost the world,
how credentials leak and get abused, tools for checking your own exposure, and password
managers as the fix.

## Highlights

- **Live strength analyzer** — entropy model with heuristic detection of dictionary words,
  keyboard walks, years, and repetition; offline crack-time estimates. Runs entirely in the
  browser; nothing is sent anywhere.
- **Breach statistics** with source attributions and count-up animation.
- **Leak-vector timeline** — breaches, credential stuffing, phishing, malware, brute force,
  personal guesswork.
- **Exposure checkers** — Have I Been Pwned (with a k-anonymity explainer), Firefox Monitor,
  Google Password Checkup, DeHashed.
- **Password managers** — Bitwarden, 1Password, Proton Pass, KeePassXC, plus a
  what-to-look-for checklist.

## Frontend techniques on display

- Full-page stacked sections: each section pins and the next slides over it
  (`position: sticky` + per-section pin offsets from `useStickyStack`)
- Sticky section titles that only gain their floating-chip treatment when actually stuck
  (CSS `scroll-state()` container queries, with a fallback for unsupported browsers)
- CSS scroll-driven animations for reveals, parallax, and the nav scroll-progress bar
  (`view()` / `scroll()` timelines), each with a JS fallback (`IntersectionObserver`, rAF)
- Parallax layers at multiple depths, animated counters, fluid `clamp()` typography,
  `prefers-reduced-motion` respected throughout
- Hand-written CSS only — no UI framework

## Stack

React 19 · TypeScript · Vite · self-hosted variable fonts (Fontsource) · no CSS framework

## Development

```sh
npm install
npm run dev
```

## Deployment

Pushes to `main` build and deploy automatically via
[`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) to GitHub Pages. The Pages
build sets `GITHUB_PAGES=true` so Vite emits the `/password-managers/` base path
(see `vite.config.ts`).

## Analytics

Self-hosted [Umami](https://umami.is) (privacy-friendly, cookie-free). The tracking script
lives in `index.html`; the per-site website ID comes from `VITE_UMAMI_WEBSITE_ID` in `.env`.
With no ID set, the script loads but tracks nothing.
