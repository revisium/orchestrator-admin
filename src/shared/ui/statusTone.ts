// Presentational mapping from a control-plane status string to a theme status
// tone. Pure data: no business rules, no network — just which token group a chip
// or DAG node should read. Covers task_runs.status, steps.status, inbox.status.
export type StatusTone = 'running' | 'success' | 'failed' | 'waiting' | 'neutral' | 'muted'

const TONE_BY_STATUS: Record<string, StatusTone> = {
  // task_runs.status
  pending: 'neutral',
  planning: 'running',
  ready: 'neutral',
  running: 'running',
  completed: 'success',
  failed: 'failed',
  awaiting_approval: 'waiting',
  paused: 'waiting',
  cancelled: 'muted',
  // steps.status
  claimed: 'running',
  succeeded: 'success',
  dead: 'failed',
  skipped: 'muted',
  // inbox.status
  resolved: 'success',
}

export const toneForStatus = (status: string): StatusTone => TONE_BY_STATUS[status] ?? 'neutral'

// Human label for a snake_case status token.
export const labelForStatus = (status: string): string => status.replace(/_/g, ' ')
