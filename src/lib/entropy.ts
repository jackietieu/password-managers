/**
 * Local, offline password-strength analysis.
 * Entropy model: charset-pool estimate with heuristic penalties for
 * dictionary words, sequences, and repetition — plus an offline
 * crack-time estimate at 10^10 guesses/sec.
 */

export type Verdict = 'very-weak' | 'weak' | 'fair' | 'strong' | 'excellent'

export interface Analysis {
  length: number
  pool: number
  entropy: number
  verdict: Verdict
  crackTime: string
  issues: string[]
}

/** Offline GPU-cracking rig order of magnitude: 10 billion guesses/sec. */
const GUESSES_PER_SECOND = 1e10

const COMMON: Record<string, true> = {
  password: true, 'password1': true, 'password123': true, '123456': true,
  '1234567': true, '12345678': true, '123456789': true, '1234567890': true,
  qwerty: true, qwerty123: true, letmein: true, welcome: true,
  iloveyou: true, admin: true, login: true, monkey: true, dragon: true,
  sunshine: true, princess: true, football: true, baseball: true,
  superman: true, batman: true, starwars: true, shadow: true, master: true,
  abc123: true, '111111': true, '000000': true, trustno1: true, passw0rd: true,
}

const KEYBOARD_ROWS = ['qwertyuiop', 'asdfghjkl', 'zxcvbnm', '0123456789']

export const VERDICT_META: Record<Verdict, { label: string; blurb: string }> = {
  'very-weak': { label: 'Very weak', blurb: 'Cracked before you finish reading this sentence.' },
  weak: { label: 'Weak', blurb: 'Falls to a consumer cracking rig in hours.' },
  fair: { label: 'Fair', blurb: 'Survives casual attacks, not a dedicated one.' },
  strong: { label: 'Strong', blurb: 'Out of reach for most real-world attacks.' },
  excellent: { label: 'Excellent', blurb: 'Effectively uncrackable offline.' },
}

function charsetPool(pw: string): number {
  let pool = 0
  if (/[a-z]/.test(pw)) pool += 26
  if (/[A-Z]/.test(pw)) pool += 26
  if (/\d/.test(pw)) pool += 10
  if (/[^a-zA-Z0-9\s]/.test(pw)) pool += 33
  if (/\s/.test(pw)) pool += 1
  if (/[^\x20-\x7e]/.test(pw)) pool += 100 // non-ASCII / unicode
  return pool
}

/** True if `s` contains `min`+ consecutive characters of `chars` (either direction). */
function hasRun(s: string, chars: string, min: number): boolean {
  const rev = [...chars].reverse().join('')
  for (let i = 0; i + min <= s.length; i++) {
    const slice = s.slice(i, i + min)
    if (chars.includes(slice) || rev.includes(slice)) return true
  }
  return false
}

function findIssues(pw: string, common: boolean): string[] {
  const issues: string[] = []
  const lower = pw.toLowerCase()

  if (common) {
    issues.push('Top of every attacker’s dictionary — cracked first, not last.')
  }
  if (/^(.)\1+$/.test(pw)) {
    issues.push('Same character repeated — the keyspace collapses to one guess.')
  }
  if (/^\d+$/.test(pw)) {
    issues.push('Digits only — tiny keyspace, trivially brute-forced.')
  }
  if (/(?:19|20)\d{2}/.test(pw)) {
    issues.push('Contains a year — birthdays are guessed within seconds.')
  }
  if (/(.)\1{2,}/.test(pw)) {
    issues.push('Runs of repeated characters add almost no entropy.')
  }
  if (KEYBOARD_ROWS.some((row) => hasRun(lower, row, 4))) {
    issues.push('Keyboard walk — “qwerty”-style patterns are pre-computed.')
  } else if (hasRun(lower, 'abcdefghijklmnopqrstuvwxyz', 4)) {
    issues.push('Alphabet sequence — adds a pattern, not randomness.')
  }
  return issues
}
export function formatCrackTime(seconds: number): string {
  if (!Number.isFinite(seconds)) return 'beyond eternity'
  if (seconds < 1) return 'instantly'

  const steps: Array<[number, string]> = [
    [60, 'minute'],
    [60, 'hour'],
    [24, 'day'],
    [365.25, 'year'],
  ]
  let value = seconds
  let unit = 'second'
  for (const [factor, next] of steps) {
    if (value < factor) break
    value /= factor
    unit = next
  }

  if (value >= 1e12) {
    // 1 trillion years already dwarfs the ~13.8-billion-year age of the universe.
    return 'longer than the age of the universe'
  }
  if (value >= 1e9) return `${Math.round(value / 1e9).toLocaleString()} billion years`
  if (value >= 1e6) return `${Math.round(value / 1e6).toLocaleString()} million years`
  const rounded = value >= 10 ? Math.round(value) : Math.max(1, Math.round(value * 10) / 10)
  return `${rounded.toLocaleString()} ${unit}${rounded === 1 ? '' : 's'}`
}

export function analyze(pw: string): Analysis {
  const lower = pw.toLowerCase()
  const common = !!COMMON[lower] || !!COMMON[lower.replace(/\d+$/, '')]

  const length = pw.length
  const pool = charsetPool(pw)
  let entropy = length > 0 && pool > 0 ? length * Math.log2(pool) : 0

  const issues = findIssues(pw, common)
  if (common) entropy = Math.min(entropy, 4)
  entropy = Math.max(4, entropy - issues.length * 6)

  const seconds = Math.pow(2, entropy) / 2 / GUESSES_PER_SECOND
  const verdict: Verdict =
    entropy < 28 ? 'very-weak'
    : entropy < 36 ? 'weak'
    : entropy < 60 ? 'fair'
    : entropy < 80 ? 'strong'
    : 'excellent'

  return { length, pool, entropy, verdict, crackTime: formatCrackTime(seconds), issues }
}
