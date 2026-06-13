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
