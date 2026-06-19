import { Box, Button, Center, Grid, HStack, Link as ChakraLink, Span, Stack, Text } from '@chakra-ui/react'
import {
  ArrowRight,
  BookOpen,
  ChevronDown,
  CircleDot,
  Cpu,
  Database,
  FileText,
  GitBranch,
  History,
  Layers3,
  Plus,
} from 'lucide-react'
import type { ReactNode } from 'react'
import { Link } from 'react-router'
import {
  absTime,
  activityForProject,
  adrsForProject,
  knowledgeForProject,
  memoryForProject,
  projectById,
  reposForProject,
  runsForProject,
  type ProjectActivityEvent,
  type ProjectAdr,
  type ProjectKnowledgeArticle,
  type ProjectMemoryTable,
  type ProjectRepository,
  type ProjectRow,
  type ProjectTone,
} from 'src/shared/fixtures'
import { AvatarInitials, Card, EmptyState, FieldRow, StatusBadge, toneForStatus } from 'src/shared/ui'

interface ProjectDetailPageProps {
  readonly projectId: string
  readonly tab?: string
}

interface DetailTab {
  readonly id: string
  readonly label: string
  readonly count?: number
}

const RECENT_ADR_LIMIT = 3
const MEMORY_PREVIEW_LIMIT = 2

const projectToneStyles = (
  tone: ProjectTone,
): { readonly bg: string; readonly fg: string; readonly border: string } => {
  if (tone === 'teal') return { bg: 'accent.role.bg', fg: 'accent.role.fg', border: 'accent.role.border' }
  if (tone === 'plum') return { bg: 'status.waiting.bg', fg: 'status.waiting.fg', border: 'status.waiting.border' }
  if (tone === 'system') return { bg: 'bg.inset', fg: 'fg.2', border: 'border.strong' }
  return { bg: 'brand.soft', fg: 'brand.ink', border: 'brand.softBorder' }
}

const ProjectAvatar = ({ project, size = '46px' }: { readonly project: ProjectRow; readonly size?: string }) => {
  const colors = projectToneStyles(project.tone)

  return (
    <Center
      boxSize={size}
      borderRadius="10px"
      bg={colors.bg}
      color={colors.fg}
      borderWidth="1px"
      borderColor={colors.border}
      fontWeight="650"
      textTransform="lowercase"
      flexShrink="0"
    >
      {project.initials}
    </Center>
  )
}

const tabsForProject = (
  project: ProjectRow,
  repositories: ReadonlyArray<ProjectRepository>,
  activity: ReadonlyArray<ProjectActivityEvent>,
): ReadonlyArray<DetailTab> => [
  { id: 'overview', label: 'Overview' },
  { id: 'repositories', label: 'Repositories', count: repositories.length },
  { id: 'knowledge', label: 'Knowledge base', count: project.stats.kb },
  { id: 'adrs', label: 'ADRs', count: project.stats.adrs },
  { id: 'memory', label: 'Memory', count: project.stats.tables },
  { id: 'activity', label: 'Activity', count: activity.length },
]

const validTab = (tab: string | undefined): string => {
  if (tab === 'repositories') return tab
  if (tab === 'knowledge') return tab
  if (tab === 'adrs') return tab
  if (tab === 'memory') return tab
  if (tab === 'activity') return tab
  return 'overview'
}

const DetailHeader = ({ project }: { readonly project: ProjectRow }) => (
  <Stack gap="4">
    <ChakraLink
      asChild
      alignSelf="flex-start"
      color="fg.2"
      textStyle="medium-xs"
      _hover={{ color: 'fg.0', textDecoration: 'none' }}
    >
      <Link to="/projects">Back to projects</Link>
    </ChakraLink>
    <FlexHeader project={project} />
  </Stack>
)

const FlexHeader = ({ project }: { readonly project: ProjectRow }) => (
  <Grid templateColumns={{ base: '1fr', xl: 'minmax(0, 1fr) auto' }} gap="5" alignItems="start">
    <HStack gap="4" align="flex-start" minW="0">
      <ProjectAvatar project={project} />
      <Stack gap="2" minW="0">
        <Text className="mono" textStyle="regular-xs" color="fg.3">
          {project.org} /
        </Text>
        <Text textStyle="bold-xxl" color="fg.0" lineHeight="1.12" letterSpacing="0">
          {project.name}
        </Text>
        <Text textStyle="regular-body" color="fg.2" maxW="760px">
          {project.description}
        </Text>
      </Stack>
    </HStack>
    <HStack gap="2" wrap="wrap" justify={{ base: 'flex-start', xl: 'flex-end' }}>
      <Button
        size="sm"
        h="34px"
        px="3"
        gap="2"
        bg="bg.1"
        color="fg.1"
        borderWidth="1px"
        borderColor="border.strong"
        borderRadius="btn"
        _hover={{ bg: 'blackAlpha.50', color: 'fg.0' }}
      >
        <GitBranch size={14} />
        <Span className="mono">{project.defaultBranch}</Span>
        <ChevronDown size={13} />
      </Button>
      <HStack
        h="34px"
        px="3"
        gap="2"
        bg="bg.inset"
        borderWidth="1px"
        borderColor="border"
        borderRadius="btn"
        color="fg.2"
        textStyle="regular-xs"
      >
        <History size={13} />
        <Span className="mono">{project.headRev}</Span>
      </HStack>
      <Button size="sm" h="34px" px="3" gap="2" bg="brand.500" color="brand.on" _hover={{ bg: 'brand.hover' }}>
        <Plus size={14} />
        New ADR
      </Button>
    </HStack>
  </Grid>
)

const DetailTabs = ({
  project,
  tabs,
  activeTab,
}: {
  readonly project: ProjectRow
  readonly tabs: ReadonlyArray<DetailTab>
  readonly activeTab: string
}) => (
  <HStack
    as="nav"
    gap="0"
    overflowX="auto"
    borderBottomWidth="1px"
    borderColor="border"
    css={{ scrollbarWidth: 'none' }}
  >
    {tabs.map((tab) => {
      const active = tab.id === activeTab
      const to = tab.id === 'overview' ? `/projects/${project.id}` : `/projects/${project.id}/${tab.id}`

      return (
        <ChakraLink
          key={tab.id}
          asChild
          h="40px"
          px="4"
          display="inline-flex"
          alignItems="center"
          gap="2"
          flexShrink="0"
          borderBottomWidth="1px"
          borderColor={active ? 'fg.1' : 'transparent'}
          color={active ? 'fg.0' : 'fg.2'}
          textStyle={active ? 'semibold-sm' : 'medium-sm'}
          _hover={{ color: 'fg.0', textDecoration: 'none' }}
        >
          <Link to={to}>
            {tab.label}
            {tab.count ? (
              <Span className="mono tnum" color="fg.3">
                {tab.count}
              </Span>
            ) : null}
          </Link>
        </ChakraLink>
      )
    })}
  </HStack>
)

const StatCard = ({
  icon: Icon,
  label,
  value,
}: {
  readonly icon: typeof GitBranch
  readonly label: string
  readonly value: number
}) => (
  <Card p="4">
    <Stack gap="2.5">
      <Center
        boxSize="28px"
        borderRadius="8px"
        bg="brand.tint"
        color="brand.500"
        borderWidth="1px"
        borderColor="brand.softBorder"
      >
        <Icon size={15} />
      </Center>
      <Text className="tnum" color="fg.0" fontSize="24px" fontWeight="680" lineHeight="1">
        {value}
      </Text>
      <Text color="fg.2" textStyle="regular-xs">
        {label}
      </Text>
    </Stack>
  </Card>
)

const SectionHead = ({
  title,
  to,
  action,
}: {
  readonly title: string
  readonly to?: string
  readonly action?: string
}) => (
  <HStack justify="space-between" mb="3">
    <Text textStyle="semibold-md" color="fg.0">
      {title}
    </Text>
    {to ? (
      <ChakraLink asChild color="fg.2" textStyle="medium-xs" _hover={{ color: 'brand.500', textDecoration: 'none' }}>
        <Link to={to}>
          {action ?? 'All'}
          <ArrowRight size={13} />
        </Link>
      </ChakraLink>
    ) : null}
  </HStack>
)

const TagPill = ({ children }: { readonly children: ReactNode }) => (
  <Span
    px="2"
    py="0.5"
    borderRadius="pill"
    bg="bg.inset"
    borderWidth="1px"
    borderColor="border"
    color="fg.2"
    textStyle="regular-micro"
    whiteSpace="nowrap"
  >
    {children}
  </Span>
)

const AdrStatusBadge = ({ status }: { readonly status: ProjectAdr['status'] }) => {
  const palette = {
    accepted: { fg: 'status.success.fg', bg: 'status.success.bg', border: 'status.success.border' },
    proposed: { fg: 'status.running.fg', bg: 'status.running.bg', border: 'status.running.border' },
    superseded: { fg: 'fg.2', bg: 'bg.inset', border: 'border.strong' },
  }[status]

  return (
    <Span
      px="2"
      h="5"
      display="inline-flex"
      alignItems="center"
      borderRadius="chip"
      borderWidth="1px"
      color={palette.fg}
      bg={palette.bg}
      borderColor={palette.border}
      textStyle="medium-xs"
      textTransform="capitalize"
      whiteSpace="nowrap"
    >
      {status}
    </Span>
  )
}

const KnowledgeSourceBadge = ({ source }: { readonly source: ProjectKnowledgeArticle['source'] }) => (
  <Span
    px="2"
    h="5"
    display="inline-flex"
    alignItems="center"
    borderRadius="chip"
    borderWidth="1px"
    color={source === 'method' ? 'brand.ink' : 'fg.2'}
    bg={source === 'method' ? 'brand.soft' : 'bg.inset'}
    borderColor={source === 'method' ? 'brand.softBorder' : 'border'}
    textStyle="medium-xs"
    textTransform="capitalize"
    whiteSpace="nowrap"
  >
    {source}
  </Span>
)

const MemoryKindBadge = ({ kind }: { readonly kind: ProjectMemoryTable['kind'] }) => {
  const palette = {
    decision: { fg: 'brand.ink', bg: 'brand.soft', border: 'brand.softBorder' },
    domain: { fg: 'accent.role.fg', bg: 'accent.role.bg', border: 'accent.role.border' },
    operational: { fg: 'status.running.fg', bg: 'status.running.bg', border: 'status.running.border' },
    risk: { fg: 'status.failed.fg', bg: 'status.failed.bg', border: 'status.failed.border' },
  }[kind]

  return (
    <Span
      px="2"
      h="5"
      display="inline-flex"
      alignItems="center"
      borderRadius="chip"
      borderWidth="1px"
      color={palette.fg}
      bg={palette.bg}
      borderColor={palette.border}
      textStyle="medium-xs"
      textTransform="capitalize"
      whiteSpace="nowrap"
    >
      {kind}
    </Span>
  )
}

const ActivityKindBadge = ({ kind }: { readonly kind: ProjectActivityEvent['kind'] }) => {
  const palette = {
    adr: { fg: 'brand.ink', bg: 'brand.soft', border: 'brand.softBorder' },
    knowledge: { fg: 'accent.role.fg', bg: 'accent.role.bg', border: 'accent.role.border' },
    memory: { fg: 'status.running.fg', bg: 'status.running.bg', border: 'status.running.border' },
    repo: { fg: 'fg.2', bg: 'bg.inset', border: 'border' },
    run: { fg: 'status.success.fg', bg: 'status.success.bg', border: 'status.success.border' },
  }[kind]

  return (
    <Span
      px="2"
      h="5"
      display="inline-flex"
      alignItems="center"
      borderRadius="chip"
      borderWidth="1px"
      color={palette.fg}
      bg={palette.bg}
      borderColor={palette.border}
      textStyle="medium-xs"
      textTransform="capitalize"
      whiteSpace="nowrap"
    >
      {kind}
    </Span>
  )
}

const RepoList = ({ repositories }: { readonly repositories: ReadonlyArray<ProjectRepository> }) => (
  <Card p="0" overflow="hidden">
    {repositories.map((repo) => (
      <HStack key={repo.id} gap="3" px="4" py="3" borderBottomWidth="1px" borderColor="border.subtle">
        <Center boxSize="28px" borderRadius="8px" bg="bg.inset" borderWidth="1px" borderColor="border" color="fg.2">
          <GitBranch size={14} />
        </Center>
        <Stack gap="0.5" minW="0" flex="1">
          <Text className="mono" textStyle="medium-sm" color="fg.0" truncate>
            {repo.name}
          </Text>
          <Text textStyle="regular-xs" color="fg.2" truncate>
            {repo.description}
          </Text>
        </Stack>
        <Text className="mono" textStyle="regular-xs" color="fg.3" flexShrink="0">
          {repo.openPRs} PR · {repo.branches} br
        </Text>
      </HStack>
    ))}
  </Card>
)

const AdrList = ({
  adrs,
  compact = false,
}: {
  readonly adrs: ReadonlyArray<ProjectAdr>
  readonly compact?: boolean
}) => (
  <Card p="0" overflow="hidden">
    {adrs.length === 0 ? (
      <Box px="4" py="5">
        <EmptyState title="No ADRs yet" description="Decision records will appear here once they are captured." />
      </Box>
    ) : (
      adrs.map((adr) => (
        <Grid
          key={adr.id}
          templateColumns={{ base: '1fr', lg: compact ? 'minmax(0, 1fr) auto' : 'minmax(0, 1fr) 170px 150px' }}
          gap={{ base: '2.5', lg: '4' }}
          px="4.5"
          py="4"
          alignItems="start"
          borderBottomWidth="1px"
          borderColor="border.subtle"
          _last={{ borderBottomWidth: '0' }}
        >
          <HStack gap="3" align="start" minW="0">
            <Center
              boxSize="32px"
              borderRadius="8px"
              bg="brand.tint"
              borderWidth="1px"
              borderColor="brand.softBorder"
              color="brand.500"
              flexShrink="0"
            >
              <FileText size={15} />
            </Center>
            <Stack gap="1.5" minW="0">
              <HStack gap="2" minW="0" wrap="wrap">
                <Text className="mono" textStyle="regular-xs" color="fg.3">
                  ADR-{adr.number}
                </Text>
                <Text textStyle="semibold-sm" color="fg.0">
                  {adr.title}
                </Text>
              </HStack>
              <Text textStyle="regular-sm" color="fg.2" lineHeight="1.5">
                {adr.summary}
              </Text>
              <HStack gap="1.5" wrap="wrap">
                {adr.tags.map((tag) => (
                  <TagPill key={tag}>{tag}</TagPill>
                ))}
              </HStack>
            </Stack>
          </HStack>
          <Stack gap="2" align={{ base: 'flex-start', lg: compact ? 'flex-end' : 'flex-start' }}>
            <AdrStatusBadge status={adr.status} />
            <Text className="mono" textStyle="regular-xs" color="fg.3">
              {absTime(adr.createdAt)}
            </Text>
          </Stack>
          {compact ? null : (
            <Stack gap="1.5" align="flex-start" minW="0">
              <Text className="mono" textStyle="regular-xs" color="fg.1" truncate>
                {adr.repo}
              </Text>
              <ChakraLink
                asChild
                color="fg.2"
                textStyle="medium-xs"
                _hover={{ color: 'brand.500', textDecoration: 'none' }}
              >
                <Link to={`/runs/${adr.runId}`}>{adr.runId}</Link>
              </ChakraLink>
            </Stack>
          )}
        </Grid>
      ))
    )}
  </Card>
)

const KnowledgeList = ({ articles }: { readonly articles: ReadonlyArray<ProjectKnowledgeArticle> }) => (
  <Grid templateColumns={{ base: '1fr', xl: 'repeat(2, minmax(0, 1fr))' }} gap="4">
    {articles.length === 0 ? (
      <Box gridColumn="1 / -1">
        <EmptyState title="No knowledge articles yet" description="Project knowledge will appear after ingestion." />
      </Box>
    ) : (
      articles.map((article) => (
        <Card key={article.id} p="4.5" minH="210px" display="flex" flexDirection="column">
          <Stack gap="3" h="100%">
            <HStack gap="3" align="start">
              <Center
                boxSize="32px"
                borderRadius="8px"
                bg="bg.inset"
                borderWidth="1px"
                borderColor="border"
                color="fg.2"
                flexShrink="0"
              >
                {article.source === 'memory' ? <Database size={15} /> : <BookOpen size={15} />}
              </Center>
              <Stack gap="1" minW="0" flex="1">
                <HStack gap="2" wrap="wrap">
                  <KnowledgeSourceBadge source={article.source} />
                  <Text className="mono" textStyle="regular-xs" color="fg.3">
                    {absTime(article.updatedAt)}
                  </Text>
                </HStack>
                <Text textStyle="semibold-sm" color="fg.0">
                  {article.title}
                </Text>
              </Stack>
            </HStack>
            <Text textStyle="regular-sm" color="fg.2" lineHeight="1.55">
              {article.summary}
            </Text>
            <HStack gap="1.5" wrap="wrap">
              {article.tags.map((tag) => (
                <TagPill key={tag}>{tag}</TagPill>
              ))}
            </HStack>
            <HStack mt="auto" pt="3" borderTopWidth="1px" borderColor="border.subtle" gap="3" minW="0">
              <AvatarInitials label={article.owner} system={article.owner === 'orchestrator'} />
              <Text className="mono" textStyle="regular-xs" color="fg.2">
                {article.owner}
              </Text>
              <Text className="mono" textStyle="regular-xs" color="fg.3" ml="auto" truncate>
                {article.repo}
              </Text>
            </HStack>
          </Stack>
        </Card>
      ))
    )}
  </Grid>
)

const MemoryFactList = ({ table }: { readonly table: ProjectMemoryTable }) => (
  <Stack gap="2">
    {table.facts.map((fact) => (
      <HStack key={fact.id} align="start" gap="2.5">
        <Box w="1.5" h="1.5" mt="2" borderRadius="full" bg="dot.running" flexShrink="0" />
        <Stack gap="0.5" minW="0">
          <Text textStyle="regular-sm" color="fg.1" lineHeight="1.45">
            {fact.text}
          </Text>
          <Text className="mono" textStyle="regular-micro" color="fg.3">
            {fact.source} · {fact.sourceId}
          </Text>
        </Stack>
      </HStack>
    ))}
  </Stack>
)

const MemoryList = ({
  tables,
  compact = false,
}: {
  readonly tables: ReadonlyArray<ProjectMemoryTable>
  readonly compact?: boolean
}) => (
  <Grid templateColumns={{ base: '1fr', xl: compact ? '1fr' : 'repeat(2, minmax(0, 1fr))' }} gap="4">
    {tables.length === 0 ? (
      <Box gridColumn="1 / -1">
        <EmptyState title="No memory tables yet" description="Project memory will appear once agents learn facts." />
      </Box>
    ) : (
      tables.map((table) => (
        <Card key={table.id} p="0" overflow="hidden">
          <Stack gap="0">
            <Box px="4.5" py="4" borderBottomWidth="1px" borderColor="border.subtle">
              <HStack gap="3" align="start">
                <Center
                  boxSize="34px"
                  borderRadius="8px"
                  bg="bg.inset"
                  borderWidth="1px"
                  borderColor="border"
                  color="fg.2"
                  flexShrink="0"
                >
                  <Database size={16} />
                </Center>
                <Stack gap="1.5" minW="0" flex="1">
                  <HStack gap="2" wrap="wrap">
                    <MemoryKindBadge kind={table.kind} />
                    <Text className="mono" textStyle="regular-xs" color="fg.3">
                      {absTime(table.updatedAt)}
                    </Text>
                  </HStack>
                  <Text className="mono" textStyle="semibold-sm" color="fg.0" truncate>
                    {table.name}
                  </Text>
                  <Text textStyle="regular-sm" color="fg.2" lineHeight="1.5">
                    {table.description}
                  </Text>
                </Stack>
              </HStack>
            </Box>
            <Grid
              templateColumns={{ base: 'repeat(2, minmax(0, 1fr))', md: 'repeat(4, minmax(0, 1fr))' }}
              borderBottomWidth="1px"
              borderColor="border.subtle"
            >
              <MemoryMetric label="Records" value={table.records} />
              <MemoryMetric label="Owner" value={table.owner} />
              <MemoryMetric label="Run" value={table.linkedRunId} to={`/runs/${table.linkedRunId}`} />
              <MemoryMetric label="ADR" value={table.linkedAdrId.replace('adr_', '')} />
            </Grid>
            <Box px="4.5" py="4">
              <MemoryFactList table={table} />
              {compact ? null : (
                <HStack gap="1.5" wrap="wrap" mt="3.5">
                  {table.tags.map((tag) => (
                    <TagPill key={tag}>{tag}</TagPill>
                  ))}
                </HStack>
              )}
            </Box>
          </Stack>
        </Card>
      ))
    )}
  </Grid>
)

const MemoryMetric = ({
  label,
  value,
  to,
}: {
  readonly label: string
  readonly value: number | string
  readonly to?: string
}) => (
  <Stack
    gap="1"
    px="3.5"
    py="3"
    borderRightWidth="1px"
    borderBottomWidth={{ base: '1px', md: '0' }}
    borderColor="border.subtle"
  >
    <Text color="fg.3" textStyle="regular-micro">
      {label}
    </Text>
    {to ? (
      <ChakraLink
        asChild
        className="mono"
        color="fg.1"
        textStyle="medium-xs"
        _hover={{ color: 'brand.500', textDecoration: 'none' }}
      >
        <Link to={to}>{value}</Link>
      </ChakraLink>
    ) : (
      <Text className={typeof value === 'number' ? 'mono tnum' : 'mono'} color="fg.1" textStyle="medium-xs" truncate>
        {value}
      </Text>
    )}
  </Stack>
)

const ActivityList = ({ events }: { readonly events: ReadonlyArray<ProjectActivityEvent> }) => (
  <Card p="0" overflow="hidden">
    {events.length === 0 ? (
      <Box px="4" py="5">
        <EmptyState title="No activity yet" description="Project events will appear once agents touch this project." />
      </Box>
    ) : (
      events.map((event) => (
        <Grid
          key={event.id}
          templateColumns={{ base: '1fr', lg: 'minmax(0, 1fr) 180px' }}
          gap={{ base: '2.5', lg: '4' }}
          px="4.5"
          py="4"
          borderBottomWidth="1px"
          borderColor="border.subtle"
          _last={{ borderBottomWidth: '0' }}
        >
          <HStack gap="3" align="start" minW="0">
            <Center
              boxSize="32px"
              borderRadius="full"
              bg="bg.inset"
              borderWidth="1px"
              borderColor="border"
              color="fg.2"
              flexShrink="0"
            >
              <CircleDot size={15} />
            </Center>
            <Stack gap="1.5" minW="0">
              <HStack gap="2" wrap="wrap">
                <ActivityKindBadge kind={event.kind} />
                <Text textStyle="semibold-sm" color="fg.0">
                  {event.title}
                </Text>
              </HStack>
              <Text textStyle="regular-sm" color="fg.2" lineHeight="1.5">
                {event.summary}
              </Text>
              <HStack gap="2" wrap="wrap">
                <TagPill>{event.target}</TagPill>
                {event.runId ? (
                  <ChakraLink
                    asChild
                    color="fg.2"
                    textStyle="medium-xs"
                    _hover={{ color: 'brand.500', textDecoration: 'none' }}
                  >
                    <Link to={`/runs/${event.runId}`}>{event.runId}</Link>
                  </ChakraLink>
                ) : null}
              </HStack>
            </Stack>
          </HStack>
          <Stack gap="1" align={{ base: 'flex-start', lg: 'flex-end' }}>
            <HStack gap="1.5">
              <AvatarInitials label={event.actor} system={event.actor === 'orchestrator'} />
              <Text className="mono" textStyle="regular-xs" color="fg.1">
                {event.actor}
              </Text>
            </HStack>
            <Text className="mono" textStyle="regular-xs" color="fg.3">
              {absTime(event.createdAt)}
            </Text>
          </Stack>
        </Grid>
      ))
    )}
  </Card>
)

const ProjectMeta = ({ project }: { readonly project: ProjectRow }) => (
  <Card>
    <Stack gap="3">
      <Text textStyle="semibold-sm" color="fg.0">
        Project
      </Text>
      <FieldRow label="Key">{project.key}</FieldRow>
      <FieldRow label="Owners">
        <HStack gap="2" wrap="wrap">
          {project.owners.map((owner) => (
            <HStack key={owner} gap="1.5">
              <AvatarInitials label={owner} system={owner === 'orchestrator'} />
              <Text className="mono">{owner}</Text>
            </HStack>
          ))}
        </HStack>
      </FieldRow>
      <FieldRow label="Default branch">{project.defaultBranch}</FieldRow>
      <FieldRow label="Head revision">{project.headRev}</FieldRow>
      <FieldRow label="Open PRs">{project.openPRs}</FieldRow>
      <FieldRow label="Updated">{absTime(project.updatedAt)}</FieldRow>
    </Stack>
  </Card>
)

const ActiveRuns = ({ project }: { readonly project: ProjectRow }) => {
  const runs = runsForProject(project.id)

  return (
    <Card p="0" overflow="hidden">
      {runs.length === 0 ? (
        <Box px="4" py="5">
          <EmptyState title="No runs in this project" description="Runs will appear here once they are scoped." />
        </Box>
      ) : (
        runs.map((run) => (
          <ChakraLink
            key={run.id}
            asChild
            display="grid"
            gridTemplateColumns="3px minmax(0, 1fr) auto"
            alignItems="center"
            gap="3"
            pr="4"
            borderBottomWidth="1px"
            borderColor="border.subtle"
            _hover={{ bg: 'brand.tint', textDecoration: 'none' }}
          >
            <Link to={`/runs/${run.id}`}>
              <Box alignSelf="stretch" bg={`dot.${toneForStatus(run.status)}`} />
              <Stack gap="0.5" minW="0" py="3">
                <Text textStyle="medium-xs" color="fg.0" truncate>
                  {run.title}
                </Text>
                <Text className="mono" textStyle="regular-micro" color="fg.3">
                  {run.id}
                </Text>
              </Stack>
              <StatusBadge status={run.status} size="sm" dot={false} />
            </Link>
          </ChakraLink>
        ))
      )}
    </Card>
  )
}

const OverviewTab = ({
  project,
  repositories,
  adrs,
  memoryTables,
}: {
  readonly project: ProjectRow
  readonly repositories: ReadonlyArray<ProjectRepository>
  readonly adrs: ReadonlyArray<ProjectAdr>
  readonly memoryTables: ReadonlyArray<ProjectMemoryTable>
}) => (
  <Grid templateColumns={{ base: '1fr', xl: 'minmax(0, 1.7fr) minmax(280px, 1fr)' }} gap="7" alignItems="start">
    <Stack gap="6">
      <Grid templateColumns={{ base: 'repeat(2, minmax(0, 1fr))', lg: 'repeat(4, minmax(0, 1fr))' }} gap="3">
        <StatCard icon={GitBranch} label="Repositories" value={repositories.length} />
        <StatCard icon={BookOpen} label="ADRs" value={project.stats.adrs} />
        <StatCard icon={Layers3} label="KB articles" value={project.stats.kb} />
        <StatCard icon={Cpu} label="Memory tables" value={project.stats.tables} />
      </Grid>
      <Box>
        <SectionHead title="Repositories" to={`/projects/${project.id}/repositories`} />
        <RepoList repositories={repositories} />
      </Box>
      <Box>
        <SectionHead title="Recent decisions" to={`/projects/${project.id}/adrs`} action="All ADRs" />
        <AdrList adrs={adrs.slice(0, RECENT_ADR_LIMIT)} compact />
      </Box>
      <Box>
        <SectionHead title="Memory" to={`/projects/${project.id}/memory`} action="All tables" />
        <MemoryList tables={memoryTables.slice(0, MEMORY_PREVIEW_LIMIT)} compact />
      </Box>
    </Stack>
    <Stack gap="5">
      <ProjectMeta project={project} />
      <Box>
        <SectionHead title="Active runs" />
        <ActiveRuns project={project} />
      </Box>
    </Stack>
  </Grid>
)

const AdrsTab = ({ adrs }: { readonly adrs: ReadonlyArray<ProjectAdr> }) => (
  <Stack gap="4">
    <SectionHead title="Architecture decision records" />
    <AdrList adrs={adrs} />
  </Stack>
)

const KnowledgeTab = ({ articles }: { readonly articles: ReadonlyArray<ProjectKnowledgeArticle> }) => (
  <Stack gap="4">
    <SectionHead title="Knowledge base" />
    <KnowledgeList articles={articles} />
  </Stack>
)

const MemoryTab = ({ tables }: { readonly tables: ReadonlyArray<ProjectMemoryTable> }) => (
  <Stack gap="4">
    <SectionHead title="Project memory" />
    <MemoryList tables={tables} />
  </Stack>
)

const ActivityTab = ({ events }: { readonly events: ReadonlyArray<ProjectActivityEvent> }) => (
  <Stack gap="4">
    <SectionHead title="Project activity" />
    <ActivityList events={events} />
  </Stack>
)

const RepositoriesTab = ({ repositories }: { readonly repositories: ReadonlyArray<ProjectRepository> }) => (
  <Box containerType="inline-size">
    <Card p="0" overflow="hidden">
      <Grid
        templateColumns="minmax(0, 2.4fr) 120px 88px 88px 88px 120px"
        gap="3"
        alignItems="center"
        h="40px"
        px="4.5"
        bg="bg.inset"
        borderBottomWidth="1px"
        borderColor="border"
        css={{ '@container (max-width: 860px)': { gridTemplateColumns: 'minmax(0, 1fr) 88px 88px' } }}
      >
        <RepoHeaderCell>Repository</RepoHeaderCell>
        <RepoHeaderCell css={{ '@container (max-width: 860px)': { display: 'none' } }}>Language</RepoHeaderCell>
        <RepoHeaderCell>Branches</RepoHeaderCell>
        <RepoHeaderCell>Open PRs</RepoHeaderCell>
        <RepoHeaderCell css={{ '@container (max-width: 860px)': { display: 'none' } }}>Commits</RepoHeaderCell>
        <RepoHeaderCell css={{ '@container (max-width: 860px)': { display: 'none' } }}>Last activity</RepoHeaderCell>
      </Grid>
      {repositories.map((repo) => (
        <Grid
          key={repo.id}
          templateColumns="minmax(0, 2.4fr) 120px 88px 88px 88px 120px"
          gap="3"
          alignItems="center"
          px="4.5"
          py="3.5"
          borderBottomWidth="1px"
          borderColor="border.subtle"
          css={{ '@container (max-width: 860px)': { gridTemplateColumns: 'minmax(0, 1fr) 88px 88px' } }}
        >
          <HStack gap="3" minW="0">
            <Center boxSize="30px" borderRadius="8px" bg="bg.inset" borderWidth="1px" borderColor="border" color="fg.2">
              <GitBranch size={15} />
            </Center>
            <Stack gap="0.5" minW="0">
              <Text className="mono" textStyle="medium-sm" color="fg.0" truncate>
                {repo.name}
              </Text>
              <Text textStyle="regular-xs" color="fg.2" truncate>
                {repo.description}
              </Text>
            </Stack>
          </HStack>
          <Text textStyle="regular-xs" color="fg.1" css={{ '@container (max-width: 860px)': { display: 'none' } }}>
            {repo.language}
          </Text>
          <Text className="mono tnum" textStyle="regular-xs" color="fg.1">
            {repo.branches}
          </Text>
          <Text className="mono tnum" textStyle="regular-xs" color={repo.openPRs > 0 ? 'status.success.fg' : 'fg.3'}>
            {repo.openPRs}
          </Text>
          <Text
            className="mono tnum"
            textStyle="regular-xs"
            color="fg.1"
            css={{ '@container (max-width: 860px)': { display: 'none' } }}
          >
            {repo.commits}
          </Text>
          <Text textStyle="regular-xs" color="fg.3" css={{ '@container (max-width: 860px)': { display: 'none' } }}>
            {absTime(repo.lastActivity)}
          </Text>
        </Grid>
      ))}
    </Card>
  </Box>
)

const RepoHeaderCell = ({
  children,
  css,
}: {
  readonly children: ReactNode
  readonly css?: Record<string, unknown>
}) => (
  <Text color="fg.3" fontSize="11.5px" fontWeight="600" textTransform="uppercase" letterSpacing="0" css={css}>
    {children}
  </Text>
)

export const ProjectDetailPage = ({ projectId, tab }: ProjectDetailPageProps) => {
  const project = projectById(projectId)
  const repositories = reposForProject(project.id)
  const adrs = adrsForProject(project.id)
  const articles = knowledgeForProject(project.id)
  const memoryTables = memoryForProject(project.id)
  const activity = activityForProject(project.id)
  const activeTab = validTab(tab)
  const tabs = tabsForProject(project, repositories, activity)

  return (
    <Stack gap="6">
      <DetailHeader project={project} />
      <DetailTabs project={project} tabs={tabs} activeTab={activeTab} />
      {activeTab === 'overview' ? (
        <OverviewTab project={project} repositories={repositories} adrs={adrs} memoryTables={memoryTables} />
      ) : null}
      {activeTab === 'repositories' ? <RepositoriesTab repositories={repositories} /> : null}
      {activeTab === 'knowledge' ? <KnowledgeTab articles={articles} /> : null}
      {activeTab === 'adrs' ? <AdrsTab adrs={adrs} /> : null}
      {activeTab === 'memory' ? <MemoryTab tables={memoryTables} /> : null}
      {activeTab === 'activity' ? <ActivityTab events={activity} /> : null}
    </Stack>
  )
}
