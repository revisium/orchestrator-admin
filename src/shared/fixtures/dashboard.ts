import type { RunStatus } from './types'

export interface HostStatus {
  readonly host: string
  readonly daemonUp: boolean
  readonly dbosConnected: boolean
  readonly controlPlane: string
  readonly playbookVersion: string
}

export const HOST_STATUS: HostStatus = {
  host: 'orchestrator-host @ localhost',
  daemonUp: true,
  dbosConnected: true,
  controlPlane: 'admin/control-plane/master',
  playbookVersion: '@revisium/playbook-core 1.4.2',
}

// Ordered status buckets for the dashboard summary strip; counts model
// task_runs.status distribution.
export const RUN_STATUS_COUNTS: ReadonlyArray<{ readonly status: RunStatus; readonly count: number }> = [
  { status: 'pending', count: 2 },
  { status: 'planning', count: 1 },
  { status: 'ready', count: 1 },
  { status: 'running', count: 3 },
  { status: 'completed', count: 12 },
  { status: 'failed', count: 1 },
  { status: 'awaiting_approval', count: 2 },
  { status: 'paused', count: 0 },
  { status: 'cancelled', count: 1 },
]
