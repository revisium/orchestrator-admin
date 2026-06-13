import type { PipelineRow, PlaybookRow, RoleRow } from './types'

export const ROLES: ReadonlyArray<RoleRow> = [
  {
    id: 'architect',
    name: 'architect',
    modelLevel: 'deep',
    effort: 'high',
    runner: 'claude-code',
    surface: 'planning',
    rights: 'read-only',
    scope: 'repo + cross-repo planning',
    playbookId: 'revisium-core',
    allowedTools: ['Read', 'Grep', 'WebSearch', 'Agent'],
    systemPromptPreview:
      'You are ARCHITECT. Produce architecture plans, boundaries, contracts, and technical tradeoffs. Do not write product code; hand off scoped work to developer roles.',
  },
  {
    id: 'developer',
    name: 'developer',
    modelLevel: 'standard',
    effort: 'medium',
    runner: 'claude-code',
    surface: 'implementation',
    rights: 'write-working-tree',
    scope: 'single repo working tree',
    playbookId: 'revisium-core',
    allowedTools: ['Read', 'Edit', 'Write', 'Bash', 'Grep'],
    systemPromptPreview:
      'You are DEVELOPER. Implement scoped, approved changes; fix actionable findings; run local verification before handoff.',
  },
  {
    id: 'reviewer',
    name: 'reviewer',
    modelLevel: 'deep',
    effort: 'high',
    runner: 'claude-code',
    surface: 'review',
    rights: 'read-only',
    scope: 'diff under review',
    playbookId: 'revisium-core',
    allowedTools: ['Read', 'Grep', 'Bash'],
    systemPromptPreview:
      'You are REVIEWER. Perform adversarial review focused on bugs, regressions, risks, and missing tests. Classify findings by severity.',
  },
  {
    id: 'integrator',
    name: 'integrator',
    modelLevel: 'standard',
    effort: 'low',
    runner: 'script',
    surface: 'integration',
    rights: 'push + open-pr',
    scope: 'remote branch + PR',
    playbookId: 'revisium-core',
    allowedTools: ['Bash', 'Read'],
    systemPromptPreview:
      'You are INTEGRATOR. Commit, push, and open or update PRs for approved changes. Never merge without an explicit gate.',
  },
  {
    id: 'ci-poller',
    name: 'ci-poller',
    modelLevel: 'cheap',
    effort: 'low',
    runner: 'script',
    surface: 'signals',
    rights: 'read-only',
    scope: 'CI + provider status',
    playbookId: 'revisium-core',
    allowedTools: ['Bash'],
    systemPromptPreview:
      'You are CI-POLLER. Classify CI, static-analysis, and provider status into a readiness verdict.',
  },
]

export const roleById = (roleId: string): RoleRow => ROLES.find((role) => role.id === roleId) ?? ROLES[0]

export const PIPELINES: ReadonlyArray<PipelineRow> = [
  {
    id: 'pl_feature_default',
    pipelineId: 'feature-default',
    triggers: ['run.created:feature', 'scope:backend', 'scope:frontend'],
    requiredRoles: ['architect', 'developer', 'reviewer', 'integrator'],
    optionalRoles: ['ci-poller'],
    alternativeRoles: [{ role: 'developer', alternative: 'developer-frontend | developer-backend' }],
    routeGates: ['plan_gate', 'merge_gate'],
  },
  {
    id: 'pl_hotfix',
    pipelineId: 'hotfix-fast',
    triggers: ['run.created:hotfix', 'priority:high'],
    requiredRoles: ['developer', 'reviewer', 'integrator'],
    optionalRoles: [],
    alternativeRoles: [],
    routeGates: ['merge_gate'],
  },
  {
    id: 'pl_docs',
    pipelineId: 'docs-only',
    triggers: ['scope:docs'],
    requiredRoles: ['developer', 'reviewer'],
    optionalRoles: ['architect'],
    alternativeRoles: [{ role: 'reviewer', alternative: 'reviewer-docs' }],
    routeGates: ['merge_gate'],
  },
]

export const pipelineById = (id: string): PipelineRow => PIPELINES.find((p) => p.id === id) ?? PIPELINES[0]

export const PLAYBOOKS: ReadonlyArray<PlaybookRow> = [
  {
    id: 'pb_revisium_core',
    name: 'Revisium Core',
    packageName: '@revisium/playbook-core',
    source: 'npm',
    version: '1.4.2',
    schemaVersion: '2',
    installedAt: '2026-06-01T10:00:00Z',
  },
  {
    id: 'pb_js_ts',
    name: 'JS/TS Stack',
    packageName: '@revisium/playbook-js-ts',
    source: 'npm',
    version: '0.9.0',
    schemaVersion: '2',
    installedAt: '2026-06-01T10:00:00Z',
  },
  {
    id: 'pb_local_overlay',
    name: 'Workspace Overlay',
    packageName: 'workspace:./agents',
    source: 'git',
    version: '0.0.0-dev',
    schemaVersion: '2',
    installedAt: '2026-06-05T14:30:00Z',
  },
]

export const playbookRouteRoles: ReadonlyArray<{
  readonly id: string
  readonly label: string
  readonly kind: 'role' | 'gate'
}> = [
  { id: 'architect', label: 'architect', kind: 'role' },
  { id: 'plan_gate', label: 'plan_gate', kind: 'gate' },
  { id: 'developer', label: 'developer', kind: 'role' },
  { id: 'reviewer', label: 'reviewer', kind: 'role' },
  { id: 'merge_gate', label: 'merge_gate', kind: 'gate' },
  { id: 'integrator', label: 'integrator', kind: 'role' },
]
