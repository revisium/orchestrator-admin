import type { InboxItem, InboxItemDetail } from './types'

export const INBOX_ITEMS: ReadonlyArray<InboxItem> = [
  {
    id: 'ibx_plan_01',
    kind: 'approval',
    title: 'Approve plan for "Add release-train workflow"',
    runId: 'run_8f2a',
    status: 'pending',
    createdAt: '2026-06-13T09:15:00Z',
  },
  {
    id: 'ibx_merge_01',
    kind: 'approval',
    title: 'Approve merge of PR #42 (DBOS recovery hardening)',
    runId: 'run_4c71',
    status: 'pending',
    createdAt: '2026-06-12T18:02:00Z',
  },
  {
    id: 'ibx_q_01',
    kind: 'question',
    title: 'Which Postgres database should DBOS connect to?',
    runId: 'run_4c71',
    status: 'pending',
    createdAt: '2026-06-12T17:55:00Z',
  },
  {
    id: 'ibx_alert_01',
    kind: 'alert',
    title: 'Run "Investigate flaky formula test" failed after 3 attempts',
    runId: 'run_a35e',
    status: 'resolved',
    createdAt: '2026-06-10T15:10:00Z',
  },
  {
    id: 'ibx_plan_02',
    kind: 'approval',
    title: 'Approve plan for prisma-pg-json v2 migration',
    runId: 'run_1d09',
    status: 'resolved',
    createdAt: '2026-06-11T08:20:00Z',
  },
]

const ITEM_DETAILS: Record<string, InboxItemDetail> = {
  ibx_plan_01: {
    ...INBOX_ITEMS[0],
    gateType: 'plan_gate',
    contextSummary:
      'Proposed pipeline: architect → developer → reviewer → integrator. Adds a release-train GitHub Actions workflow with semantic-release version bumps, a generated changelog step, and a dry-run job gated on the main branch.',
    options: [
      { id: 'approve', label: 'Approve plan' },
      { id: 'reject', label: 'Request changes' },
    ],
    riskSummary: [
      { level: 'medium', note: 'Touches CI release path; a bad bump could publish an unintended version.' },
      { level: 'low', note: 'Changes are additive; no runtime code paths modified.' },
    ],
    adr: {
      title: 'Release-train workflow for orchestrator-admin',
      decision: 'Adopt a semantic-release GitHub Actions train with a gated dry-run on main before tagging.',
      bullets: [
        'Version bumps and changelog generated from Conventional Commits',
        'Dry-run job validates the release on main before any tag is pushed',
        'No runtime code paths touched — CI / release surface only',
      ],
    },
    budget: { spent: 0.93, limit: 5, estimate: 1.2 },
  },
  ibx_merge_01: {
    ...INBOX_ITEMS[1],
    gateType: 'merge_gate',
    contextSummary:
      'PR #42 "Harden DBOS recovery": +312 / -47 across 6 files. CI green, reviewer approved. Diff adds workflow recovery handlers and a restart integration test.',
    options: [
      { id: 'approve', label: 'Approve merge' },
      { id: 'reject', label: 'Block merge' },
    ],
    riskSummary: [
      { level: 'high', note: 'Modifies worker restart path; regression would affect durable execution.' },
      { level: 'medium', note: 'New integration test covers the happy path only.' },
    ],
    diff: {
      branch: 'feat/dbos-recovery',
      additions: 312,
      deletions: 47,
      files: [
        { path: 'src/worker/recovery.ts', add: 118, del: 12 },
        { path: 'src/worker/loop.ts', add: 46, del: 21 },
        { path: 'test/recovery.int.test.ts', add: 96, del: 0 },
        { path: 'src/host/lifecycle.ts', add: 28, del: 9 },
        { path: 'src/host/dbos.module.ts', add: 18, del: 5 },
        { path: 'docs/adr/0002-dbos-recovery.md', add: 6, del: 0 },
      ],
      checks: ['CI · verify', 'SonarCloud quality gate', 'reviewer approved'],
    },
  },
  ibx_q_01: {
    ...INBOX_ITEMS[2],
    gateType: 'answer_question',
    contextSummary:
      'The developer needs to confirm the target database name for the DBOS client. The standalone Revisium daemon owns the embedded Postgres; DBOS connects to a separate logical database on the same server.',
    options: [
      { id: 'dbos', label: 'Use database "dbos"' },
      { id: 'shared', label: 'Reuse the Revisium database' },
    ],
    riskSummary: [{ level: 'low', note: 'Informational; no destructive action taken until answered.' }],
  },
}

export const inboxItemById = (itemId: string): InboxItemDetail => ITEM_DETAILS[itemId] ?? ITEM_DETAILS.ibx_plan_01

// Pending decisions for the dashboard side column (slice limit kept here to keep
// app code literal-free).
export const PENDING_INBOX = INBOX_ITEMS.filter((item) => item.status === 'pending')
export const PENDING_QUEUE = PENDING_INBOX.slice(0, 3)
