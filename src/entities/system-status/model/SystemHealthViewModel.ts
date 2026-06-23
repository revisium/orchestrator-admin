import type { SystemDoctorQuery } from 'src/__generated__/graphql-request'
import type { SystemHostStat, SystemStatusTone } from './types'

type SystemHealthRaw = SystemDoctorQuery['doctor']

export class SystemHealthViewModel {
  public constructor(private readonly raw: SystemHealthRaw) {}

  public get isOnline(): boolean {
    return this.raw.status.daemon.running && this.raw.status.daemon.healthy && this.raw.ok
  }

  public get statusLabel(): string {
    return this.isOnline ? 'Host online' : 'Host needs attention'
  }

  public get statusTone(): SystemStatusTone {
    return this.isOnline ? 'success' : 'failed'
  }

  public get hostLabel(): string {
    return this.raw.status.daemon.baseUrl ?? 'local GraphQL host'
  }

  public get metaLabel(): string {
    return 'data dir'
  }

  public get metaValue(): string {
    return this.raw.status.project.dataDir
  }

  public get issues(): readonly string[] {
    return this.raw.issues
  }

  public get projectLabel(): string {
    return `${this.raw.status.project.org}/${this.raw.status.project.project}`
  }

  public get branchLabel(): string {
    return this.raw.status.project.branch
  }

  public get daemonLabel(): string {
    return this.raw.status.daemon.running ? 'up' : 'down'
  }

  public get doctorLabel(): string {
    return this.raw.ok ? 'ok' : 'issues'
  }

  public get daemonTone(): SystemStatusTone {
    return this.raw.status.daemon.running && this.raw.status.daemon.healthy ? 'success' : 'failed'
  }

  public get doctorTone(): SystemStatusTone {
    return this.raw.ok ? 'success' : 'failed'
  }

  public get stats(): readonly SystemHostStat[] {
    return [
      { key: 'daemon', label: 'daemon', value: this.daemonLabel, tone: this.daemonTone },
      { key: 'doctor', label: 'doctor', value: this.doctorLabel, tone: this.doctorTone },
      { key: 'project', label: 'project', value: this.projectLabel, tone: 'success', mono: true },
      { key: 'branch', label: 'branch', value: this.branchLabel, tone: 'success', mono: true },
    ]
  }
}
