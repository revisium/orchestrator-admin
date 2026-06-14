// Presentational formatters for the static prototype. They live in the fixtures
// layer because they encode mock-data conventions: a FIXED "now" (so SSR and the
// client agree — no hydration drift, no real clock) and the mock currency
// rendering. Kept here also lets the time/money unit literals stay out of the
// magic-number-strict app code.
const NOW = new Date('2026-06-13T12:30:00Z').getTime()

const SECOND = 1000
const MINUTE = 60 * SECOND
const HOUR = 60 * MINUTE
const DAY = 24 * HOUR

export const relTime = (iso: string): string => {
  const diff = NOW - new Date(iso).getTime()
  if (diff < MINUTE) return 'just now'
  if (diff < HOUR) return `${Math.floor(diff / MINUTE)}m ago`
  if (diff < DAY) return `${Math.floor(diff / HOUR)}h ago`
  const days = Math.floor(diff / DAY)
  return days === 1 ? 'yesterday' : `${days}d ago`
}

export const formatUsd = (amount: number): string => `$${amount.toFixed(2)}`

export const initials = (name: string): string => (name === 'orchestrator' ? 'sys' : name.slice(0, 2))
