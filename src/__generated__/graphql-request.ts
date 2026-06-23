/* eslint-disable */
/* prettier-ignore */
import { GraphQLClient, RequestOptions } from 'graphql-request';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
type GraphQLClientRequestHeaders = RequestOptions['requestHeaders'];
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: string; output: string; }
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: { input: unknown; output: unknown; }
};

export type AlternativeRoleGroupModel = {
  groupId: Scalars['String']['output'];
  resolution: Scalars['String']['output'];
  roles: Array<Scalars['String']['output']>;
};

export type AnswerQuestionInput = {
  answer: Scalars['JSON']['input'];
  inboxId: Scalars['ID']['input'];
  resolvedBy?: InputMaybe<Scalars['String']['input']>;
};

export type CreateRunInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  params?: InputMaybe<Scalars['JSON']['input']>;
  pipelineId?: InputMaybe<Scalars['String']['input']>;
  playbookId?: InputMaybe<Scalars['String']['input']>;
  priority?: InputMaybe<Scalars['Int']['input']>;
  repo: Scalars['String']['input'];
  scope?: InputMaybe<Scalars['String']['input']>;
  start?: Scalars['Boolean']['input'];
  title: Scalars['String']['input'];
};

export type CreateRunResultModel = {
  eventId: Scalars['ID']['output'];
  route?: Maybe<Scalars['JSON']['output']>;
  runId: Scalars['ID']['output'];
  started: Scalars['Boolean']['output'];
  status: Scalars['String']['output'];
  taskId: Scalars['ID']['output'];
  workflow?: Maybe<Scalars['JSON']['output']>;
};

export type DaemonStatusModel = {
  baseUrl?: Maybe<Scalars['String']['output']>;
  healthy: Scalars['Boolean']['output'];
  httpPort?: Maybe<Scalars['Int']['output']>;
  pgPort?: Maybe<Scalars['Int']['output']>;
  pid?: Maybe<Scalars['Int']['output']>;
  running: Scalars['Boolean']['output'];
};

export type DoctorResultModel = {
  issues: Array<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
  status: SystemStatusModel;
};

export type GateDecisionInput = {
  inboxId: Scalars['ID']['input'];
  resolvedBy?: InputMaybe<Scalars['String']['input']>;
};

export type GateRiskModel = {
  context?: Maybe<Scalars['JSON']['output']>;
  inboxId: Scalars['ID']['output'];
  kind: Scalars['String']['output'];
  options?: Maybe<Scalars['JSON']['output']>;
  risk: Scalars['String']['output'];
  title: Scalars['String']['output'];
  topic?: Maybe<Scalars['String']['output']>;
};

export type GetRunAttemptsInput = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: Scalars['Int']['input'];
  runId: Scalars['ID']['input'];
};

export type GetRunEventsInput = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: Scalars['Int']['input'];
  runId: Scalars['ID']['input'];
  type?: InputMaybe<Scalars['String']['input']>;
};

export type InboxConnection = {
  edges: Array<InboxItemModelEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type InboxItemModel = {
  answer?: Maybe<Scalars['JSON']['output']>;
  context?: Maybe<Scalars['JSON']['output']>;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  kind: Scalars['String']['output'];
  options?: Maybe<Scalars['JSON']['output']>;
  projectId?: Maybe<Scalars['String']['output']>;
  resolvedAt?: Maybe<Scalars['DateTime']['output']>;
  resolvedBy?: Maybe<Scalars['String']['output']>;
  runId?: Maybe<Scalars['String']['output']>;
  status: Scalars['String']['output'];
  stepId?: Maybe<Scalars['String']['output']>;
  taskId?: Maybe<Scalars['String']['output']>;
  title: Scalars['String']['output'];
};

export type InboxItemModelEdge = {
  cursor: Scalars['String']['output'];
  node: InboxItemModel;
};

export type InboxResolutionModel = {
  answer?: Maybe<Scalars['JSON']['output']>;
  inboxId: Scalars['ID']['output'];
  previousStatus: Scalars['String']['output'];
  runId?: Maybe<Scalars['String']['output']>;
  signaled: Scalars['Boolean']['output'];
  topic?: Maybe<Scalars['String']['output']>;
};

export type ListInboxInput = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: Scalars['Int']['input'];
  runId?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
};

export type ListMethodInput = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: Scalars['Int']['input'];
};

export type ListRunsInput = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: Scalars['Int']['input'];
  status?: InputMaybe<Scalars['String']['input']>;
};

export type Mutation = {
  answerQuestion: InboxResolutionModel;
  approveGate: InboxResolutionModel;
  createRun: CreateRunResultModel;
  rejectGate: InboxResolutionModel;
  resolveInboxItem: InboxResolutionModel;
};


export type MutationAnswerQuestionArgs = {
  data: AnswerQuestionInput;
};


export type MutationApproveGateArgs = {
  data: GateDecisionInput;
};


export type MutationCreateRunArgs = {
  data: CreateRunInput;
};


export type MutationRejectGateArgs = {
  data: GateDecisionInput;
};


export type MutationResolveInboxItemArgs = {
  data: ResolveInboxItemInput;
};

export type PageInfo = {
  endCursor?: Maybe<Scalars['String']['output']>;
  hasNextPage: Scalars['Boolean']['output'];
  hasPreviousPage: Scalars['Boolean']['output'];
  startCursor?: Maybe<Scalars['String']['output']>;
};

export type PipelineConnection = {
  edges: Array<PipelineModelEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type PipelineModel = {
  alternativeRoles: Array<AlternativeRoleGroupModel>;
  executionPolicy?: Maybe<Scalars['JSON']['output']>;
  id: Scalars['ID']['output'];
  optionalRoles: Array<Scalars['String']['output']>;
  path: Scalars['String']['output'];
  pipelineId: Scalars['String']['output'];
  playbookId: Scalars['String']['output'];
  requiredRoles: Array<Scalars['String']['output']>;
  routeGates: Array<Scalars['String']['output']>;
  triggers: Array<Scalars['String']['output']>;
};

export type PipelineModelEdge = {
  cursor: Scalars['String']['output'];
  node: PipelineModel;
};

export type PlaybookConnection = {
  edges: Array<PlaybookModelEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type PlaybookModel = {
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  packageName: Scalars['String']['output'];
  schemaVersion: Scalars['Int']['output'];
  source: Scalars['String']['output'];
  version: Scalars['String']['output'];
};

export type PlaybookModelEdge = {
  cursor: Scalars['String']['output'];
  node: PlaybookModel;
};

export type PrCheckModel = {
  name: Scalars['String']['output'];
  result: Scalars['String']['output'];
};

export type PrChecksModel = {
  fail: Array<Scalars['String']['output']>;
  list: Array<PrCheckModel>;
  pass: Array<Scalars['String']['output']>;
  pending: Array<Scalars['String']['output']>;
  terminal: Array<Scalars['String']['output']>;
};

export type PrFeedbackItemModel = {
  author?: Maybe<Scalars['String']['output']>;
  evidence?: Maybe<Scalars['String']['output']>;
  location?: Maybe<Scalars['String']['output']>;
  provider?: Maybe<Scalars['String']['output']>;
  reason?: Maybe<Scalars['String']['output']>;
  severity?: Maybe<Scalars['String']['output']>;
  source?: Maybe<Scalars['String']['output']>;
  summary?: Maybe<Scalars['String']['output']>;
};

export type PrFeedbackModel = {
  developerFixes: Array<PrFeedbackItemModel>;
  humanDecisions: Array<PrFeedbackItemModel>;
  ignoredNoise: Array<PrFeedbackItemModel>;
  providerWait: Array<PrFeedbackItemModel>;
  residualRisks: Array<Scalars['String']['output']>;
  reviewerQuestions: Array<PrFeedbackItemModel>;
};

export type PrInfoModel = {
  base: Scalars['String']['output'];
  draft: Scalars['Boolean']['output'];
  head: Scalars['String']['output'];
  headSha: Scalars['String']['output'];
  mergeState: Scalars['String']['output'];
  number?: Maybe<Scalars['Int']['output']>;
  state: Scalars['String']['output'];
  url: Scalars['String']['output'];
};

export type PrReadinessInput = {
  baseBranch?: InputMaybe<Scalars['String']['input']>;
  headBranch?: InputMaybe<Scalars['String']['input']>;
  includeComments?: InputMaybe<Scalars['Boolean']['input']>;
  includeReviewThreads?: InputMaybe<Scalars['Boolean']['input']>;
  prNumber?: InputMaybe<Scalars['Int']['input']>;
  repo: Scalars['String']['input'];
  sonarProject?: InputMaybe<Scalars['String']['input']>;
};

export type PrReadinessModel = {
  checks: PrChecksModel;
  ciSummary: Scalars['JSON']['output'];
  evidence: Array<Scalars['String']['output']>;
  feedback: PrFeedbackModel;
  nextAction: Scalars['String']['output'];
  pr: PrInfoModel;
  providerState: Scalars['JSON']['output'];
  reviewDecision: Scalars['String']['output'];
  reviewThreads: PrReviewThreadsModel;
  sonar: PrSonarModel;
  verdict: Scalars['String']['output'];
};

export type PrReviewThreadModel = {
  author?: Maybe<Scalars['String']['output']>;
  body: Scalars['String']['output'];
  id: Scalars['String']['output'];
  isOutdated: Scalars['Boolean']['output'];
  isResolved: Scalars['Boolean']['output'];
  line?: Maybe<Scalars['Int']['output']>;
  path?: Maybe<Scalars['String']['output']>;
  url?: Maybe<Scalars['String']['output']>;
};

export type PrReviewThreadsModel = {
  included: Scalars['Boolean']['output'];
  items: Array<PrReviewThreadModel>;
  unresolvedCount: Scalars['Int']['output'];
};

export type PrSonarHotspotModel = {
  component: Scalars['String']['output'];
  line?: Maybe<Scalars['Int']['output']>;
  message: Scalars['String']['output'];
  securityCategory?: Maybe<Scalars['String']['output']>;
  vulnerabilityProbability?: Maybe<Scalars['String']['output']>;
};

export type PrSonarIssueModel = {
  component: Scalars['String']['output'];
  line?: Maybe<Scalars['Int']['output']>;
  message: Scalars['String']['output'];
  rule?: Maybe<Scalars['String']['output']>;
  severity: Scalars['String']['output'];
};

export type PrSonarModel = {
  configured: Scalars['Boolean']['output'];
  hotspots: Array<PrSonarHotspotModel>;
  issues: Array<PrSonarIssueModel>;
  unavailable: Scalars['Boolean']['output'];
};

export type ProjectModel = {
  branch: Scalars['String']['output'];
  dataDir: Scalars['String']['output'];
  org: Scalars['String']['output'];
  project: Scalars['String']['output'];
};

export type Query = {
  doctor: DoctorResultModel;
  gateRisk: GateRiskModel;
  inbox: InboxConnection;
  inboxItem: InboxItemModel;
  pendingDecisions: Array<InboxItemModel>;
  pipeline: PipelineModel;
  pipelines: PipelineConnection;
  playbooks: PlaybookConnection;
  prFeedback: Scalars['JSON']['output'];
  prFeedbackTyped: PrFeedbackModel;
  prReadiness: Scalars['JSON']['output'];
  prReadinessTyped: PrReadinessModel;
  project: ProjectModel;
  repositoryContext: RepositoryContextModel;
  role: RoleModel;
  roles: RoleConnection;
  run: RunModel;
  runAttempts: RunAttemptConnection;
  runDigest: RunDigestModel;
  runEvents: RunEventConnection;
  runProgress: RunProgressModel;
  runWorkflow: RunWorkflowModel;
  runs: RunConnection;
  simulateRoute: Scalars['JSON']['output'];
  status: SystemStatusModel;
  validateRepository: RepositoryValidationModel;
};


export type QueryGateRiskArgs = {
  id: Scalars['ID']['input'];
};


export type QueryInboxArgs = {
  data?: InputMaybe<ListInboxInput>;
};


export type QueryInboxItemArgs = {
  id: Scalars['ID']['input'];
};


export type QueryPendingDecisionsArgs = {
  runId?: InputMaybe<Scalars['String']['input']>;
};


export type QueryPipelineArgs = {
  id: Scalars['ID']['input'];
};


export type QueryPipelinesArgs = {
  data?: InputMaybe<ListMethodInput>;
};


export type QueryPlaybooksArgs = {
  data?: InputMaybe<ListMethodInput>;
};


export type QueryPrFeedbackArgs = {
  data: PrReadinessInput;
};


export type QueryPrFeedbackTypedArgs = {
  data: PrReadinessInput;
};


export type QueryPrReadinessArgs = {
  data: PrReadinessInput;
};


export type QueryPrReadinessTypedArgs = {
  data: PrReadinessInput;
};


export type QueryRepositoryContextArgs = {
  repo: Scalars['String']['input'];
};


export type QueryRoleArgs = {
  id: Scalars['ID']['input'];
};


export type QueryRolesArgs = {
  data?: InputMaybe<ListMethodInput>;
};


export type QueryRunArgs = {
  id: Scalars['ID']['input'];
};


export type QueryRunAttemptsArgs = {
  data: GetRunAttemptsInput;
};


export type QueryRunDigestArgs = {
  id: Scalars['ID']['input'];
};


export type QueryRunEventsArgs = {
  data: GetRunEventsInput;
};


export type QueryRunProgressArgs = {
  id: Scalars['ID']['input'];
};


export type QueryRunWorkflowArgs = {
  id: Scalars['ID']['input'];
};


export type QueryRunsArgs = {
  data?: InputMaybe<ListRunsInput>;
};


export type QuerySimulateRouteArgs = {
  data: SimulateRouteInput;
};


export type QueryValidateRepositoryArgs = {
  repo: Scalars['String']['input'];
};

export type RepositoryContextModel = {
  branch: Scalars['String']['output'];
  clean: Scalars['Boolean']['output'];
  error: Scalars['String']['output'];
  exists: Scalars['Boolean']['output'];
  files: Array<RepositoryGuidanceFileModel>;
  gitRoot: Scalars['String']['output'];
  input: Scalars['String']['output'];
  isDirectory: Scalars['Boolean']['output'];
  packageError: Scalars['String']['output'];
  packageName: Scalars['String']['output'];
  path: Scalars['String']['output'];
  remote: Scalars['String']['output'];
  scripts: Array<RepositoryScriptModel>;
};

export type RepositoryGuidanceFileModel = {
  exists: Scalars['Boolean']['output'];
  path: Scalars['String']['output'];
};

export type RepositoryScriptModel = {
  command: Scalars['String']['output'];
  name: Scalars['String']['output'];
};

export type RepositoryValidationModel = {
  branch: Scalars['String']['output'];
  clean: Scalars['Boolean']['output'];
  error: Scalars['String']['output'];
  exists: Scalars['Boolean']['output'];
  gitRoot: Scalars['String']['output'];
  input: Scalars['String']['output'];
  isDirectory: Scalars['Boolean']['output'];
  path: Scalars['String']['output'];
  remote: Scalars['String']['output'];
};

export type ResolveInboxItemInput = {
  answer: Scalars['JSON']['input'];
  inboxId: Scalars['ID']['input'];
  resolvedBy?: InputMaybe<Scalars['String']['input']>;
  signalGate?: Scalars['Boolean']['input'];
};

export type RoleConnection = {
  edges: Array<RoleModelEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type RoleModel = {
  allowedTools?: Maybe<Array<Scalars['String']['output']>>;
  effort?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  modelLevel: Scalars['String']['output'];
  name: Scalars['String']['output'];
  permissionMode?: Maybe<Scalars['String']['output']>;
  playbookId?: Maybe<Scalars['String']['output']>;
  playbookRoleId?: Maybe<Scalars['String']['output']>;
  rights?: Maybe<Scalars['String']['output']>;
  runner: Scalars['String']['output'];
  scopeRules?: Maybe<Scalars['JSON']['output']>;
  sourceHash?: Maybe<Scalars['String']['output']>;
  sourcePath?: Maybe<Scalars['String']['output']>;
  surface?: Maybe<Scalars['String']['output']>;
  systemPrompt?: Maybe<Scalars['String']['output']>;
  timeoutMs?: Maybe<Scalars['Int']['output']>;
};

export type RoleModelEdge = {
  cursor: Scalars['String']['output'];
  node: RoleModel;
};

export type RunActivityItemModel = {
  actor: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  payload?: Maybe<Scalars['JSON']['output']>;
  summary: Scalars['String']['output'];
  type: Scalars['String']['output'];
};

export type RunAttemptConnection = {
  edges: Array<RunAttemptModelEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type RunAttemptModel = {
  artifactRef: Scalars['String']['output'];
  costAmount: Scalars['Float']['output'];
  currency: Scalars['String']['output'];
  durationMs: Scalars['Int']['output'];
  error: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  inputTokens: Scalars['Int']['output'];
  iteration: Scalars['Int']['output'];
  lesson: Scalars['String']['output'];
  modelProfile: Scalars['String']['output'];
  outputSummary: Scalars['String']['output'];
  outputTokens: Scalars['Int']['output'];
  runId: Scalars['ID']['output'];
  startedAt: Scalars['DateTime']['output'];
  status: Scalars['String']['output'];
  stepId: Scalars['String']['output'];
  stepKey: Scalars['String']['output'];
  verdict: Scalars['String']['output'];
};

export type RunAttemptModelEdge = {
  cursor: Scalars['String']['output'];
  node: RunAttemptModel;
};

export type RunConnection = {
  edges: Array<RunModelEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type RunCostModel = {
  attemptId: Scalars['String']['output'];
  costAmount: Scalars['Float']['output'];
  currency: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  inputTokens: Scalars['Int']['output'];
  modelProfile: Scalars['String']['output'];
  outputTokens: Scalars['Int']['output'];
  recordedAt: Scalars['DateTime']['output'];
  runId: Scalars['ID']['output'];
  stepId: Scalars['String']['output'];
};

export type RunDigestModel = {
  latestEvents: Array<RunEventModel>;
  pendingInbox: Array<InboxItemModel>;
  run: RunModel;
  usage: UsageModel;
};

export type RunEventConnection = {
  edges: Array<RunEventModelEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type RunEventModel = {
  actor: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  payload?: Maybe<Scalars['JSON']['output']>;
  runId: Scalars['ID']['output'];
  stepId: Scalars['String']['output'];
  taskId: Scalars['String']['output'];
  type: Scalars['String']['output'];
};

export type RunEventModelEdge = {
  cursor: Scalars['String']['output'];
  node: RunEventModel;
};

export type RunGateStateModel = {
  answer?: Maybe<Scalars['JSON']['output']>;
  inboxId?: Maybe<Scalars['ID']['output']>;
  nodeId: Scalars['ID']['output'];
  status: Scalars['String']['output'];
  topic: Scalars['String']['output'];
};

export type RunModel = {
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  digest: RunDigestModel;
  events: RunEventConnection;
  id: Scalars['ID']['output'];
  priority: Scalars['Int']['output'];
  progress: RunProgressModel;
  repos: Array<Scalars['String']['output']>;
  scope?: Maybe<Scalars['String']['output']>;
  status: Scalars['String']['output'];
  title: Scalars['String']['output'];
};


export type RunModelEventsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: Scalars['Int']['input'];
  type?: InputMaybe<Scalars['String']['input']>;
};

export type RunModelEdge = {
  cursor: Scalars['String']['output'];
  node: RunModel;
};

export type RunProgressModel = {
  graphCursor?: Maybe<Scalars['JSON']['output']>;
  updatedAt: Scalars['DateTime']['output'];
  workflowStatus: Scalars['String']['output'];
};

export type RunSubscriptionInput = {
  runId?: InputMaybe<Scalars['ID']['input']>;
};

export type RunWorkflowEdgeModel = {
  from: Scalars['ID']['output'];
  kind: Scalars['String']['output'];
  label: Scalars['String']['output'];
  to: Scalars['ID']['output'];
};

export type RunWorkflowModel = {
  activity: Array<RunActivityItemModel>;
  attempts: Array<RunAttemptModel>;
  currentNodeIds: Array<Scalars['String']['output']>;
  edges: Array<RunWorkflowEdgeModel>;
  gates: Array<RunGateStateModel>;
  nodes: Array<RunWorkflowNodeModel>;
  pendingInbox: Array<InboxItemModel>;
  pipeline: RunWorkflowPipelineModel;
  run: RunModel;
  usage: UsageModel;
};

export type RunWorkflowNodeModel = {
  attemptCount: Scalars['Int']['output'];
  costAmount: Scalars['Float']['output'];
  id: Scalars['ID']['output'];
  inboxId?: Maybe<Scalars['ID']['output']>;
  inputTokens: Scalars['Int']['output'];
  kind: Scalars['String']['output'];
  label: Scalars['String']['output'];
  metadata?: Maybe<Scalars['JSON']['output']>;
  modelLevel?: Maybe<Scalars['String']['output']>;
  outputTokens: Scalars['Int']['output'];
  roleId?: Maybe<Scalars['String']['output']>;
  runner?: Maybe<Scalars['String']['output']>;
  scriptId?: Maybe<Scalars['String']['output']>;
  status: Scalars['String']['output'];
  verdict?: Maybe<Scalars['String']['output']>;
};

export type RunWorkflowPipelineModel = {
  activeNodeIds: Array<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  pipelineId: Scalars['String']['output'];
  playbookId: Scalars['String']['output'];
  routeGates: Array<Scalars['String']['output']>;
  status: Scalars['String']['output'];
  title: Scalars['String']['output'];
};

export type SimulateRouteInput = {
  params?: InputMaybe<Scalars['JSON']['input']>;
  pipeline?: InputMaybe<Scalars['String']['input']>;
  playbookId?: InputMaybe<Scalars['String']['input']>;
  repo?: InputMaybe<Scalars['String']['input']>;
  title: Scalars['String']['input'];
};

export type Subscription = {
  inboxItemAdded: InboxItemModel;
  inboxItemResolved: InboxItemModel;
  runCostRecorded: RunCostModel;
  runEventAppended: RunEventModel;
  runProgressUpdated: RunProgressModel;
  runUpdated: RunModel;
  runWorkflowUpdated: RunWorkflowModel;
};


export type SubscriptionInboxItemAddedArgs = {
  data?: InputMaybe<RunSubscriptionInput>;
};


export type SubscriptionInboxItemResolvedArgs = {
  data?: InputMaybe<RunSubscriptionInput>;
};


export type SubscriptionRunCostRecordedArgs = {
  data?: InputMaybe<RunSubscriptionInput>;
};


export type SubscriptionRunEventAppendedArgs = {
  data?: InputMaybe<RunSubscriptionInput>;
};


export type SubscriptionRunProgressUpdatedArgs = {
  data?: InputMaybe<RunSubscriptionInput>;
};


export type SubscriptionRunUpdatedArgs = {
  data?: InputMaybe<RunSubscriptionInput>;
};


export type SubscriptionRunWorkflowUpdatedArgs = {
  data?: InputMaybe<RunSubscriptionInput>;
};

export type SystemStatusModel = {
  daemon: DaemonStatusModel;
  project: ProjectModel;
};

export type UsageModel = {
  costAmount: Scalars['Float']['output'];
  inputTokens: Scalars['Int']['output'];
  outputTokens: Scalars['Int']['output'];
};

export type SystemStatusQueryVariables = Exact<{ [key: string]: never; }>;


export type SystemStatusQuery = { status: { daemon: { baseUrl?: string | null, healthy: boolean, httpPort?: number | null, pgPort?: number | null, pid?: number | null, running: boolean }, project: { branch: string, dataDir: string, org: string, project: string } } };

export type ProjectQueryVariables = Exact<{ [key: string]: never; }>;


export type ProjectQuery = { project: { branch: string, dataDir: string, org: string, project: string } };

export type SystemDoctorQueryVariables = Exact<{ [key: string]: never; }>;


export type SystemDoctorQuery = { doctor: { issues: Array<string>, ok: boolean, status: { daemon: { baseUrl?: string | null, healthy: boolean, httpPort?: number | null, pgPort?: number | null, pid?: number | null, running: boolean }, project: { branch: string, dataDir: string, org: string, project: string } } } };


export const SystemStatusDocument = gql`
    query SystemStatus {
  status {
    daemon {
      baseUrl
      healthy
      httpPort
      pgPort
      pid
      running
    }
    project {
      branch
      dataDir
      org
      project
    }
  }
}
    `;
export const ProjectDocument = gql`
    query Project {
  project {
    branch
    dataDir
    org
    project
  }
}
    `;
export const SystemDoctorDocument = gql`
    query SystemDoctor {
  doctor {
    issues
    ok
    status {
      daemon {
        baseUrl
        healthy
        httpPort
        pgPort
        pid
        running
      }
      project {
        branch
        dataDir
        org
        project
      }
    }
  }
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string, variables?: any) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType, _variables) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    SystemStatus(variables?: SystemStatusQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<SystemStatusQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<SystemStatusQuery>(SystemStatusDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'SystemStatus', 'query', variables);
    },
    Project(variables?: ProjectQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<ProjectQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<ProjectQuery>(ProjectDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'Project', 'query', variables);
    },
    SystemDoctor(variables?: SystemDoctorQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<SystemDoctorQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<SystemDoctorQuery>(SystemDoctorDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'SystemDoctor', 'query', variables);
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;