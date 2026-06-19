import { Box, Button, Center, Grid, HStack, Link as ChakraLink, Span, Stack, Text } from '@chakra-ui/react'
import {
  ArrowRight,
  BookOpen,
  ChevronDown,
  CircleDot,
  Cpu,
  Database,
  GitBranch,
  GitPullRequest,
  History,
  Layers3,
  Plus,
  Rocket,
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
  relTime,
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
import { AvatarInitials, Card, EmptyState, StatusBadge, toneForStatus } from 'src/shared/ui'

interface ProjectDetailPageProps {
  readonly projectId: string
  readonly tab?: string
}

interface ProjectAdrDetailPageProps {
  readonly projectId: string
  readonly adrId: string
}

interface DetailTab {
  readonly id: string
  readonly label: string
  readonly count?: number
}

const RECENT_ADR_LIMIT = 4
const RECENT_ACTIVITY_LIMIT = 4
const ADR_NUMBER_WIDTH = 4
const OWNER_INITIALS_LENGTH = 2
const ADR_LINKED_COUNTS: Readonly<Record<number, number>> = {
  1: 3,
  2: 1,
  9: 1,
}
const ADR_ROW_HOVER_BG = '#fff1ec'

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

const DetailHeader = ({ project }: { readonly project: ProjectRow }) => <FlexHeader project={project} />

const FlexHeader = ({ project }: { readonly project: ProjectRow }) => (
  <Grid templateColumns={{ base: '1fr', xl: 'minmax(0, 1fr) auto' }} gap="5" alignItems="start">
    <HStack gap="4" align="flex-start" minW="0">
      <ProjectAvatar project={project} size="50px" />
      <Stack gap="1.5" minW="0">
        <HStack gap="3" align="baseline" wrap="wrap">
          <Text className="mono" textStyle="regular-sm" color="fg.3">
            {project.org} /
          </Text>
          <Text
            color="fg.0"
            fontSize={{ base: '28px', lg: '26px' }}
            fontWeight="720"
            lineHeight="1.08"
            letterSpacing="0"
          >
            {project.name}
          </Text>
        </HStack>
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
      <Button
        size="sm"
        h="34px"
        px="3.5"
        gap="2"
        bg="bg.1"
        color="fg.0"
        borderWidth="1px"
        borderColor="border.strong"
        borderRadius="btn"
        boxShadow="0 1px 2px rgba(33, 28, 20, 0.08)"
        _hover={{ bg: 'blackAlpha.50' }}
      >
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
          h="48px"
          px="4.5"
          display="inline-flex"
          alignItems="center"
          gap="2"
          flexShrink="0"
          borderBottomWidth="2px"
          borderColor={active ? 'brand.500' : 'transparent'}
          bg="transparent"
          color={active ? 'fg.0' : 'fg.2'}
          textStyle={active ? 'semibold-sm' : 'medium-sm'}
          _hover={{ color: 'fg.0', textDecoration: 'none' }}
          _focusVisible={{ outlineWidth: '2px', outlineColor: 'blue.500', outlineOffset: '-2px' }}
        >
          <Link to={to}>
            {tab.label}
            {tab.count ? (
              <Span
                className="mono tnum"
                minW="5"
                h="5"
                px="1.5"
                display="inline-flex"
                alignItems="center"
                justifyContent="center"
                borderRadius="pill"
                bg="bg.inset"
                color="fg.3"
                textStyle="medium-xs"
              >
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
  <Card p="5" minH="136px">
    <Stack gap="3">
      <Center
        boxSize="32px"
        borderRadius="8px"
        bg="brand.tint"
        color="brand.500"
        borderWidth="1px"
        borderColor="brand.softBorder"
      >
        <Icon size={15} />
      </Center>
      <Text className="tnum" color="fg.0" fontSize="30px" fontWeight="700" lineHeight="1">
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

const AdrStatusBadge = ({
  status,
  children,
}: {
  readonly status: ProjectAdr['status']
  readonly children?: ReactNode
}) => {
  const palette = {
    accepted: { fg: 'status.success.fg', bg: 'status.success.bg', border: 'status.success.border' },
    proposed: { fg: 'status.waiting.fg', bg: 'status.waiting.bg', border: 'status.waiting.border' },
    superseded: { fg: 'fg.2', bg: 'bg.inset', border: 'border.strong' },
  }[status]

  return (
    <Span
      px="2"
      h="5"
      display="inline-flex"
      alignItems="center"
      width="fit-content"
      borderRadius="chip"
      borderWidth="1px"
      color={palette.fg}
      bg={palette.bg}
      borderColor={palette.border}
      textStyle="medium-xs"
      textTransform="capitalize"
      whiteSpace="nowrap"
    >
      {children ?? status}
    </Span>
  )
}

const formatAdrNumber = (number: number): string => `ADR-${String(number).padStart(ADR_NUMBER_WIDTH, '0')}`

const adrRouteId = (adr: ProjectAdr): string => formatAdrNumber(adr.number).toLowerCase()

const adrHref = (projectId: string, adr: ProjectAdr): string => `/projects/${projectId}/adrs/${adrRouteId(adr)}`

const compactDecisionStatus = (
  status: ProjectAdr['status'],
): {
  readonly label: string
  readonly fg: string
  readonly bg: string
  readonly border: string
  readonly dot: string
} => {
  if (status === 'proposed') {
    return {
      label: 'Awaiting Gate',
      fg: 'status.waiting.fg',
      bg: 'status.waiting.bg',
      border: 'status.waiting.border',
      dot: 'dot.waiting',
    }
  }

  if (status === 'superseded') {
    return { label: 'Superseded', fg: 'fg.2', bg: 'bg.inset', border: 'border.strong', dot: 'dot.muted' }
  }

  return {
    label: 'Committed',
    fg: 'status.success.fg',
    bg: 'status.success.bg',
    border: 'status.success.border',
    dot: 'dot.success',
  }
}

const CompactDecisionStatus = ({ status }: { readonly status: ProjectAdr['status'] }) => {
  const palette = compactDecisionStatus(status)

  return (
    <HStack
      as="span"
      h="6"
      px="2.5"
      gap="1.5"
      width="fit-content"
      borderRadius="chip"
      borderWidth="1px"
      color={palette.fg}
      bg={palette.bg}
      borderColor={palette.border}
      textStyle="medium-sm"
      whiteSpace="nowrap"
    >
      <Box boxSize="1.5" borderRadius="full" bg={palette.dot} />
      {palette.label}
    </HStack>
  )
}

const knowledgeStatusMeta = (
  status: NonNullable<ProjectKnowledgeArticle['status']>,
): {
  readonly label: string
  readonly fg: string
  readonly bg: string
  readonly border: string
  readonly dot: string
} => {
  if (status === 'in-review') {
    return {
      label: 'In Review',
      fg: 'status.waiting.fg',
      bg: 'status.waiting.bg',
      border: 'status.waiting.border',
      dot: 'dot.waiting',
    }
  }

  if (status === 'draft') {
    return {
      label: 'Draft',
      fg: 'fg.2',
      bg: 'bg.inset',
      border: 'border.strong',
      dot: 'dot.muted',
    }
  }

  return {
    label: 'Committed',
    fg: 'status.success.fg',
    bg: 'status.success.bg',
    border: 'status.success.border',
    dot: 'dot.success',
  }
}

const KnowledgeStatusBadge = ({ status }: { readonly status: NonNullable<ProjectKnowledgeArticle['status']> }) => {
  const palette = knowledgeStatusMeta(status)

  return (
    <HStack
      as="span"
      h="6"
      px="2.5"
      gap="1.5"
      borderRadius="chip"
      borderWidth="1px"
      color={palette.fg}
      bg={palette.bg}
      borderColor={palette.border}
      textStyle="medium-sm"
      whiteSpace="nowrap"
    >
      <Box boxSize="1.5" borderRadius="full" bg={palette.dot} />
      {palette.label}
    </HStack>
  )
}

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

const adrStatusLabel = (status: ProjectAdr['status']): string => {
  if (status === 'accepted') return 'Accepted'
  if (status === 'proposed') return 'Proposed'
  return 'Superseded'
}

const revisionStatus = (status: ProjectAdr['status']): ProjectAdr['status'] =>
  status === 'proposed' ? 'proposed' : 'accepted'

const linkedCountForAdr = (adr: ProjectAdr): number => ADR_LINKED_COUNTS[adr.number] ?? 0

const AdrTableHeaderCell = ({ children }: { readonly children: ReactNode }) => (
  <Text color="fg.3" fontSize="11.5px" fontWeight="600" textTransform="uppercase" letterSpacing="0">
    {children}
  </Text>
)

const AdrList = ({ adrs }: { readonly adrs: ReadonlyArray<ProjectAdr> }) => (
  <Box containerType="inline-size">
    <Card p="0" overflow="hidden">
      {adrs.length === 0 ? (
        <Box px="4" py="5">
          <EmptyState title="No ADRs yet" description="Decision records will appear here once they are captured." />
        </Box>
      ) : (
        <>
          <Grid
            templateColumns="112px minmax(0, 1fr) 104px 124px 126px 86px"
            gap="2.5"
            alignItems="center"
            h="40px"
            px="4.5"
            bg="bg.inset"
            borderBottomWidth="1px"
            borderColor="border"
            css={{
              '@container (max-width: 760px)': {
                gridTemplateColumns: '96px minmax(0, 1fr) 116px 110px',
              },
            }}
          >
            <AdrTableHeaderCell>ADR</AdrTableHeaderCell>
            <AdrTableHeaderCell>Decision</AdrTableHeaderCell>
            <AdrTableHeaderCell>Status</AdrTableHeaderCell>
            <AdrTableHeaderCell>Revision</AdrTableHeaderCell>
            <Box css={{ '@container (max-width: 760px)': { display: 'none' } }}>
              <AdrTableHeaderCell>Author</AdrTableHeaderCell>
            </Box>
            <AdrTableHeaderCell>Updated</AdrTableHeaderCell>
          </Grid>
          {adrs.map((adr) => {
            const linkedCount = linkedCountForAdr(adr)

            return (
              <ChakraLink
                key={adr.id}
                asChild
                display="grid"
                gridTemplateColumns="112px minmax(0, 1fr) 104px 124px 126px 86px"
                gap="2.5"
                alignItems="center"
                px="4.5"
                py="2.5"
                minH="72px"
                borderBottomWidth="1px"
                borderColor="border"
                color="inherit"
                textDecoration="none"
                _hover={{ bg: ADR_ROW_HOVER_BG }}
                _focusVisible={{ outlineWidth: '2px', outlineColor: 'blue.500', outlineOffset: '-2px' }}
                _last={{ borderBottomWidth: '0' }}
                css={{
                  '@container (max-width: 760px)': {
                    gridTemplateColumns: '96px minmax(0, 1fr) 116px 110px',
                  },
                }}
              >
                <Link to={adrHref(adr.projectId, adr)}>
                  <Text className="mono" color="brand.500" textStyle="semibold-sm">
                    {formatAdrNumber(adr.number)}
                  </Text>
                  <Stack gap="1" minW="0">
                    <Text color="fg.0" textStyle="semibold-sm" lineHeight="1.25">
                      {adr.title}
                    </Text>
                    <HStack gap="1.5" wrap="wrap">
                      {adr.tags.map((tag) => (
                        <TagPill key={tag}>{tag}</TagPill>
                      ))}
                      {linkedCount > 0 ? (
                        <Text className="mono" textStyle="regular-xs" color="fg.3">
                          ⌘ {linkedCount}
                        </Text>
                      ) : null}
                    </HStack>
                  </Stack>
                  <AdrStatusBadge status={adr.status}>{adrStatusLabel(adr.status)}</AdrStatusBadge>
                  <CompactDecisionStatus status={revisionStatus(adr.status)} />
                  <HStack gap="2" minW="0" css={{ '@container (max-width: 760px)': { display: 'none' } }}>
                    <AvatarInitials label={ownerInitials(adr.owner)} system={adr.owner === 'orchestrator'} />
                    <Text color="fg.1" textStyle="regular-sm" truncate>
                      {adr.owner}
                    </Text>
                  </HStack>
                  <Text color="fg.3" textStyle="regular-sm" whiteSpace="nowrap">
                    {relTime(adr.createdAt)}
                  </Text>
                </Link>
              </ChakraLink>
            )
          })}
        </>
      )}
    </Card>
  </Box>
)

const RecentDecisionList = ({ adrs }: { readonly adrs: ReadonlyArray<ProjectAdr> }) => (
  <Card p="0" overflow="hidden">
    {adrs.map((adr) => (
      <Grid
        key={adr.id}
        templateColumns={{ base: '88px minmax(0, 1fr)', md: '112px minmax(0, 1fr) auto' }}
        gap="3"
        alignItems="center"
        px="4"
        py="3.5"
        borderBottomWidth="1px"
        borderColor="border"
        _last={{ borderBottomWidth: '0' }}
      >
        <Text className="mono" color="brand.500" textStyle="semibold-sm">
          {formatAdrNumber(adr.number)}
        </Text>
        <Text color="fg.0" textStyle="regular-body" fontWeight="500" truncate>
          {adr.title}
        </Text>
        <Box display={{ base: 'none', md: 'block' }}>
          <CompactDecisionStatus status={adr.status} />
        </Box>
      </Grid>
    ))}
  </Card>
)

const KNOWLEDGE_CATEGORIES: ReadonlyArray<{
  readonly id: NonNullable<ProjectKnowledgeArticle['category']>
  readonly label: string
  readonly icon: typeof Layers3
}> = [
  { id: 'architecture', label: 'Architecture', icon: Layers3 },
  { id: 'product', label: 'Product', icon: Rocket },
  { id: 'runners', label: 'Runners', icon: Cpu },
]

const fallbackKnowledgeCategory = (
  article: ProjectKnowledgeArticle,
): NonNullable<ProjectKnowledgeArticle['category']> => {
  if (article.source === 'method') return 'architecture'
  if (article.source === 'run') return 'runners'
  return 'product'
}

const ownerInitials = (owner: string): string => owner.slice(0, OWNER_INITIALS_LENGTH)

const KnowledgeArticleCard = ({ article }: { readonly article: ProjectKnowledgeArticle }) => {
  const status = article.status ?? 'committed'
  const version = article.version ?? 1

  return (
    <Card p="4" minH="126px" display="flex" flexDirection="column">
      <Stack gap="3" h="100%">
        <HStack gap="3" align="start">
          <Stack gap="2" minW="0" flex="1">
            <Text textStyle="semibold-md" color="fg.0" lineHeight="1.25">
              {article.title}
            </Text>
            <Text textStyle="regular-sm" color="fg.2" lineHeight="1.45">
              {article.summary}
            </Text>
          </Stack>
          <KnowledgeStatusBadge status={status} />
        </HStack>
        <HStack mt="auto" gap="2" minW="0" color="fg.3" textStyle="regular-xs">
          <Text className="mono" whiteSpace="nowrap">
            v{version}
          </Text>
          <Span>·</Span>
          <AvatarInitials label={ownerInitials(article.owner)} system={article.owner === 'orchestrator'} />
          <Text color="fg.2" truncate minW="0">
            {article.owner}
          </Text>
          <Text ml="auto" whiteSpace="nowrap">
            {relTime(article.updatedAt)}
          </Text>
        </HStack>
      </Stack>
    </Card>
  )
}

const KnowledgeCategorySection = ({
  category,
  articles,
}: {
  readonly category: (typeof KNOWLEDGE_CATEGORIES)[number]
  readonly articles: ReadonlyArray<ProjectKnowledgeArticle>
}) => {
  const Icon = category.icon

  if (articles.length === 0) return null

  return (
    <Stack gap="3">
      <HStack gap="2" color="fg.2">
        <Icon size={15} />
        <Text textStyle="semibold-sm" textTransform="uppercase" letterSpacing="0" color="fg.2">
          {category.label}
        </Text>
      </HStack>
      <Grid templateColumns={{ base: '1fr', xl: 'repeat(2, minmax(0, 1fr))' }} gap="4">
        {articles.map((article) => (
          <KnowledgeArticleCard key={article.id} article={article} />
        ))}
      </Grid>
    </Stack>
  )
}

const KnowledgeList = ({ articles }: { readonly articles: ReadonlyArray<ProjectKnowledgeArticle> }) => {
  if (articles.length === 0) {
    return <EmptyState title="No knowledge articles yet" description="Project knowledge will appear after ingestion." />
  }

  return (
    <Stack gap="7">
      {KNOWLEDGE_CATEGORIES.map((category) => (
        <KnowledgeCategorySection
          key={category.id}
          category={category}
          articles={articles.filter(
            (article) => (article.category ?? fallbackKnowledgeCategory(article)) === category.id,
          )}
        />
      ))}
    </Stack>
  )
}

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

const activityPreviewStyle = (
  kind: ProjectActivityEvent['kind'],
): { readonly color: string; readonly bg: string; readonly icon: ReactNode } => {
  if (kind === 'run') return { color: 'accent.role.fg', bg: 'accent.role.bg', icon: <CircleDot size={14} /> }
  if (kind === 'repo') return { color: 'status.running.fg', bg: 'status.running.bg', icon: <GitBranch size={14} /> }
  return { color: 'fg.2', bg: 'bg.inset', icon: <History size={14} /> }
}

const ActivityPreviewIcon = ({ kind }: { readonly kind: ProjectActivityEvent['kind'] }) => {
  const style = activityPreviewStyle(kind)

  return (
    <Center
      boxSize="30px"
      borderRadius="8px"
      bg={style.bg}
      borderWidth="1px"
      borderColor="border"
      color={style.color}
      flexShrink="0"
    >
      {style.icon}
    </Center>
  )
}

const RecentActivityPreview = ({ events }: { readonly events: ReadonlyArray<ProjectActivityEvent> }) => (
  <Card p="0" overflow="hidden">
    {events.slice(0, RECENT_ACTIVITY_LIMIT).map((event) => (
      <HStack
        key={event.id}
        gap="3"
        align="start"
        px="4"
        py="3.5"
        borderBottomWidth="1px"
        borderColor="border"
        _last={{ borderBottomWidth: '0' }}
      >
        <ActivityPreviewIcon kind={event.kind} />
        <Stack gap="1" minW="0">
          <Text color="fg.0" textStyle="medium-sm" lineHeight="1.3">
            {event.title}
          </Text>
          <HStack gap="2" wrap="wrap" color="fg.3" textStyle="regular-xs">
            <Span
              className="mono"
              px="2"
              py="0.5"
              borderRadius="4px"
              bg="bg.inset"
              borderWidth="1px"
              borderColor="border"
            >
              {event.target}
            </Span>
            <Span>·</Span>
            <Span>{event.actor}</Span>
            <Span>·</Span>
            <Span>{relTime(event.createdAt)}</Span>
          </HStack>
        </Stack>
      </HStack>
    ))}
  </Card>
)

const ProjectMetaRow = ({ label, children }: { readonly label: string; readonly children: ReactNode }) => (
  <Grid
    templateColumns="126px minmax(0, 1fr)"
    gap="3"
    alignItems="start"
    py="3"
    borderBottomWidth="1px"
    borderColor="border"
    _last={{ borderBottomWidth: '0' }}
  >
    <Text textStyle="regular-body" color="fg.2" whiteSpace="nowrap">
      {label}
    </Text>
    <Box minW="0">
      {typeof children === 'string' ? (
        <Text textStyle="regular-body" color="fg.0" overflowWrap="anywhere">
          {children}
        </Text>
      ) : (
        children
      )}
    </Box>
  </Grid>
)

const ProjectMeta = ({ project }: { readonly project: ProjectRow }) => (
  <Card>
    <Stack gap="3">
      <Text textStyle="semibold-sm" color="fg.0">
        Project
      </Text>
      <ProjectMetaRow label="Key">
        <Text className="mono" textStyle="regular-xs" color="fg.0" lineHeight="1.45" overflowWrap="anywhere">
          {project.key}
        </Text>
      </ProjectMetaRow>
      <ProjectMetaRow label="Owners">
        <HStack gap="2" wrap="wrap">
          {project.owners.map((owner) => (
            <HStack key={owner} gap="1.5">
              <AvatarInitials label={owner} system={owner === 'orchestrator'} />
              <Text className="mono">{owner}</Text>
            </HStack>
          ))}
        </HStack>
      </ProjectMetaRow>
      <ProjectMetaRow label="Default branch">{project.defaultBranch}</ProjectMetaRow>
      <ProjectMetaRow label="Head revision">{project.headRev}</ProjectMetaRow>
      <ProjectMetaRow label="Open PRs">{project.openPRs}</ProjectMetaRow>
      <ProjectMetaRow label="Updated">{relTime(project.updatedAt)}</ProjectMetaRow>
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
                <Text textStyle="medium-xs" color="fg.0" lineHeight="1.25">
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
  activity,
}: {
  readonly project: ProjectRow
  readonly repositories: ReadonlyArray<ProjectRepository>
  readonly adrs: ReadonlyArray<ProjectAdr>
  readonly activity: ReadonlyArray<ProjectActivityEvent>
}) => (
  <Grid templateColumns={{ base: '1fr', xl: 'minmax(0, 1.55fr) minmax(390px, 1fr)' }} gap="7" alignItems="start">
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
        <RecentDecisionList adrs={adrs.slice(0, RECENT_ADR_LIMIT)} />
      </Box>
    </Stack>
    <Stack gap="5">
      <ProjectMeta project={project} />
      <Box>
        <SectionHead title="Active runs" />
        <ActiveRuns project={project} />
      </Box>
      <Box>
        <SectionHead title="Recent activity" to={`/projects/${project.id}/activity`} />
        <RecentActivityPreview events={activity} />
      </Box>
    </Stack>
  </Grid>
)

const AdrsTab = ({ adrs }: { readonly adrs: ReadonlyArray<ProjectAdr> }) => (
  <Stack gap="0">
    <AdrList adrs={adrs} />
  </Stack>
)

const KnowledgeTab = ({
  project,
  articles,
}: {
  readonly project: ProjectRow
  readonly articles: ReadonlyArray<ProjectKnowledgeArticle>
}) => (
  <Stack gap="5">
    <HStack justify="space-between" align="center" gap="4" wrap="wrap">
      <Text color="fg.2" textStyle="regular-sm">
        {articles.length} articles · versioned in <Span className="mono">{project.key}</Span>
      </Text>
      <Button
        size="sm"
        h="34px"
        px="3.5"
        gap="2"
        bg="bg.1"
        color="fg.0"
        borderWidth="1px"
        borderColor="border.strong"
        borderRadius="btn"
        boxShadow="0 1px 2px rgba(33, 28, 20, 0.08)"
        _hover={{ bg: 'blackAlpha.50' }}
      >
        <Plus size={14} />
        New article
      </Button>
    </HStack>
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
          py="3"
          borderBottomWidth="1px"
          borderColor="border"
          _last={{ borderBottomWidth: '0' }}
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
          <HStack gap="2" minW="0" css={{ '@container (max-width: 860px)': { display: 'none' } }}>
            <Box boxSize="2" borderRadius="full" bg="dot.running" flexShrink="0" />
            <Text textStyle="regular-xs" color="fg.1" truncate>
              {repo.language}
            </Text>
          </HStack>
          <Text className="mono tnum" textStyle="regular-xs" color="fg.1">
            {repo.branches}
          </Text>
          <HStack
            as="span"
            h="7"
            w="fit-content"
            px="2"
            gap="1"
            borderRadius="pill"
            borderWidth="1px"
            borderColor="status.success.border"
            bg="status.success.bg"
            color="status.success.fg"
            textStyle="medium-xs"
          >
            <GitPullRequest size={13} />
            <Span className="mono tnum">{repo.openPRs}</Span>
          </HStack>
          <Text
            className="mono tnum"
            textStyle="regular-xs"
            color="fg.1"
            css={{ '@container (max-width: 860px)': { display: 'none' } }}
          >
            {repo.commits}
          </Text>
          <Text textStyle="regular-xs" color="fg.3" css={{ '@container (max-width: 860px)': { display: 'none' } }}>
            {relTime(repo.lastActivity)}
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

const adrForRouteId = (adrs: ReadonlyArray<ProjectAdr>, adrId: string): ProjectAdr | undefined =>
  adrs.find((adr) => adr.id === adrId || adrRouteId(adr) === adrId.toLowerCase())

const AdrDetailMetaRow = ({ label, children }: { readonly label: string; readonly children: ReactNode }) => (
  <Grid
    templateColumns="112px minmax(0, 1fr)"
    gap="3"
    alignItems="center"
    py="3"
    borderBottomWidth="1px"
    borderColor="border"
    _last={{ borderBottomWidth: '0' }}
  >
    <Text color="fg.2" textStyle="regular-sm">
      {label}
    </Text>
    <Box minW="0">{children}</Box>
  </Grid>
)

const AdrDetail = ({ project, adr }: { readonly project: ProjectRow; readonly adr: ProjectAdr }) => (
  <Stack gap="5">
    <ChakraLink
      asChild
      alignSelf="flex-start"
      color="fg.2"
      textStyle="medium-xs"
      _hover={{ color: 'brand.500', textDecoration: 'none' }}
    >
      <Link to={`/projects/${project.id}/adrs`}>Back to ADRs</Link>
    </ChakraLink>
    <Grid templateColumns={{ base: '1fr', xl: 'minmax(0, 1.55fr) minmax(340px, 0.75fr)' }} gap="5" alignItems="start">
      <Card p="5">
        <Stack gap="5">
          <Stack gap="3">
            <HStack gap="3" justify="space-between" align="start" wrap="wrap">
              <Stack gap="1.5" minW="0">
                <Text className="mono" color="brand.500" textStyle="semibold-sm">
                  {formatAdrNumber(adr.number)}
                </Text>
                <Text color="fg.0" fontSize="26px" fontWeight="720" lineHeight="1.1">
                  {adr.title}
                </Text>
              </Stack>
              <HStack gap="2" wrap="wrap">
                <AdrStatusBadge status={adr.status}>{adrStatusLabel(adr.status)}</AdrStatusBadge>
                <CompactDecisionStatus status={revisionStatus(adr.status)} />
              </HStack>
            </HStack>
            <Text color="fg.2" textStyle="regular-body" lineHeight="1.55" maxW="760px">
              {adr.summary}
            </Text>
          </Stack>
          <HStack gap="1.5" wrap="wrap">
            {adr.tags.map((tag) => (
              <TagPill key={tag}>{tag}</TagPill>
            ))}
          </HStack>
          <Box borderTopWidth="1px" borderColor="border" pt="4">
            <Text color="fg.0" textStyle="semibold-sm" mb="2">
              Decision
            </Text>
            <Text color="fg.2" textStyle="regular-sm" lineHeight="1.55">
              This ADR records the current project decision and keeps implementation work aligned with the versioned
              method, active runs, and reviewer gates.
            </Text>
          </Box>
        </Stack>
      </Card>
      <Card p="5">
        <Stack gap="3">
          <Text color="fg.0" textStyle="semibold-md">
            ADR metadata
          </Text>
          <Stack gap="0">
            <AdrDetailMetaRow label="Author">
              <HStack gap="2" minW="0">
                <AvatarInitials label={ownerInitials(adr.owner)} system={adr.owner === 'orchestrator'} />
                <Text color="fg.1" textStyle="regular-sm" truncate>
                  {adr.owner}
                </Text>
              </HStack>
            </AdrDetailMetaRow>
            <AdrDetailMetaRow label="Updated">{relTime(adr.createdAt)}</AdrDetailMetaRow>
            <AdrDetailMetaRow label="Repository">
              <Text className="mono" color="fg.1" textStyle="regular-xs" truncate>
                {adr.repo}
              </Text>
            </AdrDetailMetaRow>
            <AdrDetailMetaRow label="Run">
              <ChakraLink
                asChild
                color="brand.500"
                textStyle="medium-xs"
                _hover={{ color: 'brand.hover', textDecoration: 'none' }}
              >
                <Link to={`/runs/${adr.runId}`}>{adr.runId}</Link>
              </ChakraLink>
            </AdrDetailMetaRow>
          </Stack>
        </Stack>
      </Card>
    </Grid>
  </Stack>
)

export const ProjectAdrDetailPage = ({ projectId, adrId }: ProjectAdrDetailPageProps) => {
  const project = projectById(projectId)
  const repositories = reposForProject(project.id)
  const adrs = adrsForProject(project.id)
  const tabs = tabsForProject(project, repositories)
  const adr = adrForRouteId(adrs, adrId)

  return (
    <Stack gap="6">
      <DetailHeader project={project} />
      <DetailTabs project={project} tabs={tabs} activeTab="adrs" />
      {adr ? (
        <AdrDetail project={project} adr={adr} />
      ) : (
        <EmptyState title="ADR not found" description="The requested decision record does not exist in this project." />
      )}
    </Stack>
  )
}

export const ProjectDetailPage = ({ projectId, tab }: ProjectDetailPageProps) => {
  const project = projectById(projectId)
  const repositories = reposForProject(project.id)
  const adrs = adrsForProject(project.id)
  const articles = knowledgeForProject(project.id)
  const memoryTables = memoryForProject(project.id)
  const activity = activityForProject(project.id)
  const activeTab = validTab(tab)
  const tabs = tabsForProject(project, repositories)

  return (
    <Stack gap="6">
      <DetailHeader project={project} />
      <DetailTabs project={project} tabs={tabs} activeTab={activeTab} />
      {activeTab === 'overview' ? (
        <OverviewTab project={project} repositories={repositories} adrs={adrs} activity={activity} />
      ) : null}
      {activeTab === 'repositories' ? <RepositoriesTab repositories={repositories} /> : null}
      {activeTab === 'knowledge' ? <KnowledgeTab project={project} articles={articles} /> : null}
      {activeTab === 'adrs' ? <AdrsTab adrs={adrs} /> : null}
      {activeTab === 'memory' ? <MemoryTab tables={memoryTables} /> : null}
      {activeTab === 'activity' ? <ActivityTab events={activity} /> : null}
    </Stack>
  )
}
