// Presentational row shapes modeled on the control-plane schema
// (docs/control-plane-schema.md). These are static prototype fixtures — no
// network, no persistence — used only to render realistic UI.

export type RunStatus =
  | 'pending'
  | 'planning'
  | 'ready'
  | 'running'
  | 'completed'
  | 'failed'
  | 'awaiting_approval'
  | 'paused'
  | 'cancelled'

export type StepStatus =
  | 'pending'
  | 'ready'
  | 'claimed'
  | 'running'
  | 'succeeded'
  | 'failed'
  | 'dead'
  | 'awaiting_approval'
  | 'skipped'

export interface TaskRun {
  readonly id: string
  readonly title: string
  readonly description: string
  readonly status: RunStatus
  readonly repos: ReadonlyArray<string>
  readonly scope: string
  readonly priority: 'low' | 'normal' | 'high'
  readonly createdBy: string
  readonly createdAt: string
  readonly progress: { readonly done: number; readonly total: number }
  readonly spend: number
}

export interface RunEvent {
  readonly id: string
  readonly type: string
  readonly actor: string
  readonly createdAt: string
  readonly payloadSummary: string
}

export interface StepNode {
  readonly id: string
  readonly role: string
  readonly kind: 'role' | 'gate'
  readonly status: StepStatus
  readonly label: string
}

export interface RunDetailStep extends StepNode {
  readonly meta: string
  readonly current: boolean
}

export interface Attempt {
  readonly id: string
  readonly stepLabel: string
  readonly attemptNo: number
  readonly status: StepStatus
  readonly modelProfile: string
  readonly inputTokens: number
  readonly outputTokens: number
  readonly lesson: string | null
  readonly error: string | null
  readonly costAmount: number
  readonly currency: string
}

export interface CostRow {
  readonly id: string
  readonly attemptLabel: string
  readonly modelProfile: string
  readonly inputTokens: number
  readonly outputTokens: number
  readonly costAmount: number
  readonly currency: string
}

export type InboxKind = 'approval' | 'question' | 'alert'
export type InboxStatus = 'pending' | 'resolved'

export interface InboxItem {
  readonly id: string
  readonly kind: InboxKind
  readonly title: string
  readonly runId: string
  readonly status: InboxStatus
  readonly createdAt: string
}

export interface GateOption {
  readonly id: string
  readonly label: string
}

export interface AdrSummary {
  readonly title: string
  readonly decision: string
  readonly bullets: ReadonlyArray<string>
}

export interface DiffFile {
  readonly path: string
  readonly add: number
  readonly del: number
}

export interface DiffSummary {
  readonly branch: string
  readonly additions: number
  readonly deletions: number
  readonly files: ReadonlyArray<DiffFile>
  readonly checks: ReadonlyArray<string>
}

export interface BudgetSummary {
  readonly spent: number
  readonly limit: number
  readonly estimate: number
}

export interface InboxItemDetail extends InboxItem {
  readonly gateType: 'plan_gate' | 'merge_gate' | 'answer_question'
  readonly contextSummary: string
  readonly options: ReadonlyArray<GateOption>
  readonly riskSummary: ReadonlyArray<{ readonly level: 'low' | 'medium' | 'high'; readonly note: string }>
  readonly adr?: AdrSummary
  readonly diff?: DiffSummary
  readonly budget?: BudgetSummary
}

export interface RoleRow {
  readonly id: string
  readonly name: string
  readonly modelLevel: 'cheap' | 'standard' | 'deep'
  readonly effort: string
  readonly runner: 'claude-code' | 'codex' | 'script'
  readonly surface: string
  readonly rights: string
  readonly scope: string
  readonly playbookId: string
  readonly allowedTools: ReadonlyArray<string>
  readonly systemPromptPreview: string
}

export interface PipelineRow {
  readonly id: string
  readonly pipelineId: string
  readonly triggers: ReadonlyArray<string>
  readonly requiredRoles: ReadonlyArray<string>
  readonly optionalRoles: ReadonlyArray<string>
  readonly alternativeRoles: ReadonlyArray<{ readonly role: string; readonly alternative: string }>
  readonly routeGates: ReadonlyArray<string>
}

export interface PlaybookRow {
  readonly id: string
  readonly name: string
  readonly packageName: string
  readonly source: string
  readonly version: string
  readonly schemaVersion: string
  readonly installedAt: string
}

export type ProjectTone = 'amber' | 'teal' | 'plum' | 'system'

export interface ProjectStats {
  readonly runs: number
  readonly adrs: number
  readonly kb: number
  readonly tables: number
}

export interface ProjectRow {
  readonly id: string
  readonly name: string
  readonly key: string
  readonly org: string
  readonly tone: ProjectTone
  readonly initials: string
  readonly description: string
  readonly owners: ReadonlyArray<string>
  readonly defaultBranch: string
  readonly headRev: string
  readonly branches: number
  readonly openPRs: number
  readonly repos: ReadonlyArray<string>
  readonly updatedAt: string
  readonly stats: ProjectStats
}

export interface ProjectRepository {
  readonly id: string
  readonly projectId: string
  readonly name: string
  readonly description: string
  readonly language: string
  readonly defaultBranch: string
  readonly branches: number
  readonly openPRs: number
  readonly lastActivity: string
  readonly commits: number
}

export interface ProjectAdr {
  readonly id: string
  readonly projectId: string
  readonly number: number
  readonly title: string
  readonly status: 'accepted' | 'proposed' | 'superseded'
  readonly owner: string
  readonly createdAt: string
  readonly repo: string
  readonly runId: string
  readonly summary: string
  readonly tags: ReadonlyArray<string>
}

export interface ProjectKnowledgeArticle {
  readonly id: string
  readonly projectId: string
  readonly title: string
  readonly source: 'method' | 'repo' | 'run' | 'memory'
  readonly owner: string
  readonly updatedAt: string
  readonly repo: string
  readonly summary: string
  readonly tags: ReadonlyArray<string>
}

export interface ProjectMemoryFact {
  readonly id: string
  readonly text: string
  readonly source: 'run' | 'adr' | 'manual'
  readonly sourceId: string
}

export interface ProjectMemoryTable {
  readonly id: string
  readonly projectId: string
  readonly name: string
  readonly kind: 'domain' | 'decision' | 'operational' | 'risk'
  readonly owner: string
  readonly updatedAt: string
  readonly records: number
  readonly linkedRunId: string
  readonly linkedAdrId: string
  readonly description: string
  readonly facts: ReadonlyArray<ProjectMemoryFact>
  readonly tags: ReadonlyArray<string>
}

export interface ProjectActivityEvent {
  readonly id: string
  readonly projectId: string
  readonly kind: 'run' | 'adr' | 'knowledge' | 'memory' | 'repo'
  readonly title: string
  readonly actor: string
  readonly createdAt: string
  readonly summary: string
  readonly target: string
  readonly runId?: string
}
