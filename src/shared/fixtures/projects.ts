import { TASK_RUNS } from './runs'
import type { ProjectRepository, ProjectRow, TaskRun } from './types'

export const PROJECTS: ReadonlyArray<ProjectRow> = [
  {
    id: 'prj_orch',
    name: 'Orchestrator',
    key: 'agent-orchestration/orchestrator',
    org: 'agent-orchestration',
    tone: 'amber',
    initials: 'or',
    description:
      'The local agent orchestrator — NestJS host, DBOS engine, control-plane, and the admin UI. Versioned method, ADRs, and domain memory for the product itself.',
    owners: ['kap'],
    defaultBranch: 'main',
    headRev: 'r412',
    branches: 4,
    openPRs: 3,
    repos: ['revisium/agent-orchestrator', 'revisium/agent-orchestrator-admin'],
    updatedAt: '2026-06-13T11:20:00Z',
    stats: { runs: 3, adrs: 4, kb: 6, tables: 4 },
  },
  {
    id: 'prj_schema',
    name: 'Schema Platform',
    key: 'agent-orchestration/schema-platform',
    org: 'agent-orchestration',
    tone: 'teal',
    initials: 'sc',
    description:
      'The typed-data core: schema-toolkit, the prisma-pg-json column contract, and the formula evaluator. Cross-repo migrations are coordinated here.',
    owners: ['kap', 'orchestrator'],
    defaultBranch: 'main',
    headRev: 'r208',
    branches: 2,
    openPRs: 1,
    repos: ['revisium/schema-toolkit', 'revisium/prisma-pg-json', 'revisium/formula'],
    updatedAt: '2026-06-11T08:30:00Z',
    stats: { runs: 2, adrs: 2, kb: 4, tables: 3 },
  },
  {
    id: 'prj_strategy',
    name: 'Strategy & Docs',
    key: 'agent-orchestration/strategy',
    org: 'agent-orchestration',
    tone: 'plum',
    initials: 'st',
    description:
      'Cross-cutting strategy: the headless versioned-UI platform thesis, naming decisions, and the open-questions register the architect role reads before planning.',
    owners: ['kap'],
    defaultBranch: 'main',
    headRev: 'r97',
    branches: 3,
    openPRs: 0,
    repos: ['revisium/revisium-strategy'],
    updatedAt: '2026-06-13T11:50:00Z',
    stats: { runs: 1, adrs: 1, kb: 3, tables: 2 },
  },
]

export const PROJECT_REPOSITORIES: ReadonlyArray<ProjectRepository> = [
  {
    id: 'repo_orchestrator',
    projectId: 'prj_orch',
    name: 'revisium/agent-orchestrator',
    description: 'NestJS host + DBOS workflows + control-plane data access.',
    language: 'TypeScript',
    defaultBranch: 'main',
    branches: 9,
    openPRs: 2,
    lastActivity: '2026-06-13T10:40:00Z',
    commits: 412,
  },
  {
    id: 'repo_admin',
    projectId: 'prj_orch',
    name: 'revisium/agent-orchestrator-admin',
    description: 'React Router admin UI — dashboard, runs, inbox, method.',
    language: 'TypeScript',
    defaultBranch: 'main',
    branches: 5,
    openPRs: 1,
    lastActivity: '2026-06-13T11:18:00Z',
    commits: 188,
  },
  {
    id: 'repo_schema_toolkit',
    projectId: 'prj_schema',
    name: 'revisium/schema-toolkit',
    description: 'JSON-schema authoring, validation, and migration toolkit.',
    language: 'TypeScript',
    defaultBranch: 'main',
    branches: 6,
    openPRs: 1,
    lastActivity: '2026-06-11T08:05:00Z',
    commits: 533,
  },
  {
    id: 'repo_prisma_pg_json',
    projectId: 'prj_schema',
    name: 'revisium/prisma-pg-json',
    description: 'Postgres JSON column contract + Prisma generator (v2).',
    language: 'TypeScript',
    defaultBranch: 'main',
    branches: 3,
    openPRs: 0,
    lastActivity: '2026-06-10T19:22:00Z',
    commits: 271,
  },
  {
    id: 'repo_formula',
    projectId: 'prj_schema',
    name: 'revisium/formula',
    description: 'Deterministic formula evaluation engine for computed columns.',
    language: 'TypeScript',
    defaultBranch: 'main',
    branches: 4,
    openPRs: 0,
    lastActivity: '2026-06-10T14:22:00Z',
    commits: 196,
  },
  {
    id: 'repo_strategy',
    projectId: 'prj_strategy',
    name: 'revisium/revisium-strategy',
    description: 'Strategy docs, ADRs, and the open-questions register.',
    language: 'Markdown',
    defaultBranch: 'main',
    branches: 3,
    openPRs: 0,
    lastActivity: '2026-06-13T11:48:00Z',
    commits: 84,
  },
]

export const reposForProject = (projectId: string): ReadonlyArray<ProjectRepository> =>
  PROJECT_REPOSITORIES.filter((repo) => repo.projectId === projectId)

export const projectById = (projectId: string): ProjectRow =>
  PROJECTS.find((project) => project.id === projectId) ?? PROJECTS[0]

export const RUN_PROJECT: Record<string, string> = {
  run_8f2a: 'prj_orch',
  run_4c71: 'prj_orch',
  run_0f12: 'prj_orch',
  run_1d09: 'prj_schema',
  run_a35e: 'prj_schema',
  run_6b88: 'prj_strategy',
}

export const runsForProject = (projectId: string): ReadonlyArray<TaskRun> =>
  TASK_RUNS.filter((run) => RUN_PROJECT[run.id] === projectId)
