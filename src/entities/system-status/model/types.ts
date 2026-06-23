export type SystemStatusLoadState = 'idle' | 'loading' | 'ready' | 'error'
export type SystemStatusTone = 'success' | 'failed' | 'waiting'

export type SystemHostStatKey = 'daemon' | 'doctor' | 'project' | 'branch'

export interface SystemHostStat {
  readonly key: SystemHostStatKey
  readonly label: string
  readonly mono?: boolean
  readonly tone: SystemStatusTone
  readonly value: string
}
