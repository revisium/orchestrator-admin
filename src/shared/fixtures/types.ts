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

export interface InboxItemDetail extends InboxItem {
  readonly gateType: 'plan_gate' | 'merge_gate' | 'answer_question'
  readonly contextSummary: string
  readonly options: ReadonlyArray<GateOption>
  readonly riskSummary: ReadonlyArray<{ readonly level: 'low' | 'medium' | 'high'; readonly note: string }>
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
