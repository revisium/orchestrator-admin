import type { Attempt, BudgetSummary, CostRow, RunDetailStep, RunEvent, RunStatus, StepNode, TaskRun } from './types'

export const TASK_RUNS: ReadonlyArray<TaskRun> = [
  {
    id: 'run_8f2a',
    title: 'Add release-train workflow to orchestrator-admin',
    description: 'Wire a GitHub Actions release train with semantic version bumps and changelog generation.',
    status: 'running',
    repos: ['revisium/agent-orchestrator-admin'],
    scope: 'ci',
    priority: 'high',
    createdBy: 'kap',
    createdAt: '2026-06-13T09:12:00Z',
    progress: { done: 2, total: 6 },
    spend: 0.93,
  },
  {
    id: 'run_4c71',
    title: 'Harden DBOS recovery on worker restart',
    description: 'Ensure in-flight steps resume cleanly after a host crash via DBOS workflow recovery.',
    status: 'awaiting_approval',
    repos: ['revisium/agent-orchestrator'],
    scope: 'backend',
    priority: 'high',
    createdBy: 'kap',
    createdAt: '2026-06-12T17:40:00Z',
    progress: { done: 4, total: 5 },
    spend: 1.74,
  },
  {
    id: 'run_1d09',
    title: 'Migrate schema-toolkit to prisma-pg-json v2',
    description: 'Adopt the v2 JSON column contract across the schema toolkit and regenerate types.',
    status: 'completed',
    repos: ['revisium/schema-toolkit', 'revisium/prisma-pg-json'],
    scope: 'cross-repo',
    priority: 'normal',
    createdBy: 'orchestrator',
    createdAt: '2026-06-11T08:05:00Z',
    progress: { done: 4, total: 4 },
    spend: 2.18,
  },
  {
    id: 'run_a35e',
    title: 'Investigate flaky formula evaluation test',
    description: 'Reproduce and fix the intermittent failure in the formula evaluation suite.',
    status: 'failed',
    repos: ['revisium/formula'],
    scope: 'backend',
    priority: 'normal',
    createdBy: 'orchestrator',
    createdAt: '2026-06-10T14:22:00Z',
    progress: { done: 3, total: 5 },
    spend: 0.61,
  },
  {
    id: 'run_6b88',
    title: 'Draft ADR for headless versioned UI platform',
    description: 'Capture the dashboard-as-projection decision and the open backend-name question.',
    status: 'planning',
    repos: ['revisium/revisium-strategy'],
    scope: 'docs',
    priority: 'low',
    createdBy: 'kap',
    createdAt: '2026-06-13T11:48:00Z',
    progress: { done: 1, total: 4 },
    spend: 0.08,
  },
  {
    id: 'run_0f12',
    title: 'Cancelled: spike GraphQL gateway',
    description: 'Superseded by the control-plane MCP approach; cancelled before planning completed.',
    status: 'cancelled',
    repos: ['revisium/agent-orchestrator'],
    scope: 'backend',
    priority: 'low',
    createdBy: 'kap',
    createdAt: '2026-06-09T10:00:00Z',
    progress: { done: 1, total: 3 },
    spend: 0.2,
  },
]

export const runById = (runId: string): TaskRun => TASK_RUNS.find((run) => run.id === runId) ?? TASK_RUNS[0]

export interface RunFilter {
  readonly id: 'all' | RunStatus
  readonly label: string
}

// Segmented status filters for the Runs board (counts are derived from runs).
export const RUN_FILTERS: ReadonlyArray<RunFilter> = [
  { id: 'all', label: 'All' },
  { id: 'running', label: 'Running' },
  { id: 'awaiting_approval', label: 'Awaiting' },
  { id: 'completed', label: 'Completed' },
  { id: 'failed', label: 'Failed' },
]

export const RUN_EVENTS: ReadonlyArray<RunEvent> = [
  {
    id: 'evt_001',
    type: 'run.created',
    actor: 'kap',
    createdAt: '2026-06-13T09:12:00Z',
    payloadSummary: 'title="Add release-train workflow", repos=[agent-orchestrator-admin]',
  },
  {
    id: 'evt_002',
    type: 'run.planned',
    actor: 'architect',
    createdAt: '2026-06-13T09:14:30Z',
    payloadSummary: 'pipeline=feature-default, roles=[architect, developer, reviewer, integrator]',
  },
  {
    id: 'evt_003',
    type: 'gate.opened',
    actor: 'orchestrator',
    createdAt: '2026-06-13T09:15:00Z',
    payloadSummary: 'kind=plan_gate, requires_human=true',
  },
  {
    id: 'evt_004',
    type: 'gate.approved',
    actor: 'kap',
    createdAt: '2026-06-13T09:21:11Z',
    payloadSummary: 'decision=approve, note="scope looks right"',
  },
  {
    id: 'evt_005',
    type: 'step.started',
    actor: 'developer',
    createdAt: '2026-06-13T09:22:00Z',
    payloadSummary: 'role=developer, model_profile=standard',
  },
  {
    id: 'evt_006',
    type: 'attempt.failed',
    actor: 'reviewer',
    createdAt: '2026-06-13T09:48:02Z',
    payloadSummary: 'lesson="missing changelog step; re-route to developer"',
  },
]

export const RUN_EVENTS_DESC: ReadonlyArray<RunEvent> = [...RUN_EVENTS].reverse()

export const RUN_STEPS: ReadonlyArray<StepNode> = [
  { id: 'architect', role: 'architect', kind: 'role', status: 'succeeded', label: 'Architect' },
  { id: 'plan_gate', role: 'plan-gate', kind: 'gate', status: 'succeeded', label: 'Plan gate' },
  { id: 'developer', role: 'developer', kind: 'role', status: 'running', label: 'Developer' },
  { id: 'reviewer', role: 'reviewer', kind: 'role', status: 'awaiting_approval', label: 'Reviewer' },
  { id: 'merge_gate', role: 'merge-gate', kind: 'gate', status: 'pending', label: 'Merge gate' },
  { id: 'integrator', role: 'integrator', kind: 'role', status: 'pending', label: 'Integrator' },
]

export const RUN_ATTEMPTS: ReadonlyArray<Attempt> = [
  {
    id: 'att_01',
    stepLabel: 'Architect',
    attemptNo: 1,
    status: 'succeeded',
    modelProfile: 'deep',
    inputTokens: 18240,
    outputTokens: 4120,
    lesson: null,
    error: null,
    costAmount: 0.412,
    currency: 'USD',
  },
  {
    id: 'att_02',
    stepLabel: 'Developer',
    attemptNo: 1,
    status: 'failed',
    modelProfile: 'standard',
    inputTokens: 32110,
    outputTokens: 8830,
    lesson: 'Tried inlining the changelog; reviewer flagged a missing release-notes step.',
    error: 'reviewer requested changes: changelog generation not wired',
    costAmount: 0.287,
    currency: 'USD',
  },
  {
    id: 'att_03',
    stepLabel: 'Developer',
    attemptNo: 2,
    status: 'running',
    modelProfile: 'standard',
    inputTokens: 41520,
    outputTokens: 6210,
    lesson: null,
    error: null,
    costAmount: 0.231,
    currency: 'USD',
  },
]

export const RUN_COSTS: ReadonlyArray<CostRow> = RUN_ATTEMPTS.map((attempt) => ({
  id: `cost_${attempt.id}`,
  attemptLabel: `${attempt.stepLabel} #${attempt.attemptNo}`,
  modelProfile: attempt.modelProfile,
  inputTokens: attempt.inputTokens,
  outputTokens: attempt.outputTokens,
  costAmount: attempt.costAmount,
  currency: attempt.currency,
}))

export const RUN_BUDGET: BudgetSummary = { spent: 0.93, limit: 4, estimate: 0.7 }

export const RUN_COST_TOTALS = {
  attempts: RUN_COSTS.length,
  inputTokens: RUN_COSTS.reduce((sum, row) => sum + row.inputTokens, 0),
  outputTokens: RUN_COSTS.reduce((sum, row) => sum + row.outputTokens, 0),
  amount: RUN_COSTS.reduce((sum, row) => sum + row.costAmount, 0),
  maxAmount: Math.max(...RUN_COSTS.map((row) => row.costAmount)),
}

export const RUN_DETAIL_TABS = [
  { id: 'pipeline', label: 'Pipeline' },
  { id: 'attempts', label: 'Attempts', count: RUN_ATTEMPTS.length },
  { id: 'cost', label: 'Cost' },
] as const

const PIPELINE_STEPS: ReadonlyArray<Omit<RunDetailStep, 'status' | 'current'>> = [
  { id: 'architect', role: 'architect', kind: 'role', label: 'Architect', meta: 'deep' },
  { id: 'plan_gate', role: 'plan-gate', kind: 'gate', label: 'Plan gate', meta: 'human' },
  { id: 'developer', role: 'developer', kind: 'role', label: 'Developer', meta: 'standard' },
  { id: 'reviewer', role: 'reviewer', kind: 'role', label: 'Reviewer', meta: 'deep' },
  { id: 'merge_gate', role: 'merge-gate', kind: 'gate', label: 'Merge gate', meta: 'human' },
  { id: 'integrator', role: 'integrator', kind: 'role', label: 'Integrator', meta: 'standard' },
]

const statusForIndex = (run: TaskRun, index: number, done: number): StepNode['status'] => {
  if (run.status === 'completed') return 'succeeded'
  if (run.status === 'cancelled') return index <= done ? 'succeeded' : 'skipped'
  if (index < done) return 'succeeded'
  if (index > done) return 'pending'
  if (run.status === 'failed') return 'failed'
  if (run.status === 'awaiting_approval' || run.status === 'paused') return 'awaiting_approval'
  if (run.status === 'running' || run.status === 'planning') return 'running'
  return 'pending'
}

export const runDetailSteps = (run: TaskRun): ReadonlyArray<RunDetailStep> => {
  if (run.id === 'run_8f2a') {
    const statuses = Object.fromEntries(RUN_STEPS.map((step) => [step.id, step.status]))
    return PIPELINE_STEPS.map((step) => ({
      ...step,
      status: statuses[step.id] ?? 'pending',
      current: step.id === 'developer',
    }))
  }

  const done = Math.round((run.progress.done / run.progress.total) * PIPELINE_STEPS.length)
  return PIPELINE_STEPS.map((step, index) => {
    const status = statusForIndex(run, index, done)
    return {
      ...step,
      status,
      current: index === done && (run.status === 'running' || run.status === 'planning'),
    }
  })
}

export const currentRunStep = (steps: ReadonlyArray<RunDetailStep>): RunDetailStep | undefined =>
  steps.find((step) => step.current) ??
  steps.find((step) => step.status === 'awaiting_approval') ??
  steps.find((step) => step.status === 'running')

export const latestAttempt = (): Attempt => RUN_ATTEMPTS.at(-1) ?? RUN_ATTEMPTS[0]
