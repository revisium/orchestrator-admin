import { Box, Button, Center, Grid, HStack, Link as ChakraLink, Span, Stack, Text } from '@chakra-ui/react'
import { ArrowRight, BookOpen, ChevronDown, Cpu, GitBranch, History, Layers3, Plus } from 'lucide-react'
import type { ReactNode } from 'react'
import { Link } from 'react-router'
import {
  absTime,
  projectById,
  reposForProject,
  runsForProject,
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
): ReadonlyArray<DetailTab> => [
  { id: 'overview', label: 'Overview' },
  { id: 'repositories', label: 'Repositories', count: repositories.length },
  { id: 'knowledge', label: 'Knowledge base', count: project.stats.kb },
  { id: 'adrs', label: 'ADRs', count: project.stats.adrs },
  { id: 'memory', label: 'Memory', count: project.stats.tables },
  { id: 'activity', label: 'Activity' },
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
}: {
  readonly project: ProjectRow
  readonly repositories: ReadonlyArray<ProjectRepository>
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
        <Card p="0" overflow="hidden">
          <EmptyState
            title="Decisions are coming next"
            description="ADR rows will be wired in the next project pass."
          />
        </Card>
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

const PlaceholderTab = ({ title }: { readonly title: string }) => (
  <Card>
    <EmptyState title={`${title} is coming next`} description="The shell is in place; content rows will follow." />
  </Card>
)

export const ProjectDetailPage = ({ projectId, tab }: ProjectDetailPageProps) => {
  const project = projectById(projectId)
  const repositories = reposForProject(project.id)
  const activeTab = validTab(tab)
  const tabs = tabsForProject(project, repositories)

  return (
    <Stack gap="6">
      <DetailHeader project={project} />
      <DetailTabs project={project} tabs={tabs} activeTab={activeTab} />
      {activeTab === 'overview' ? <OverviewTab project={project} repositories={repositories} /> : null}
      {activeTab === 'repositories' ? <RepositoriesTab repositories={repositories} /> : null}
      {activeTab === 'knowledge' ? <PlaceholderTab title="Knowledge base" /> : null}
      {activeTab === 'adrs' ? <PlaceholderTab title="ADRs" /> : null}
      {activeTab === 'memory' ? <PlaceholderTab title="Memory" /> : null}
      {activeTab === 'activity' ? <PlaceholderTab title="Activity" /> : null}
    </Stack>
  )
}
