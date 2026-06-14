import { Box, Flex, HStack, Link as ChakraLink, Span, Text } from '@chakra-ui/react'
import { GitBranch } from 'lucide-react'
import type { ReactNode } from 'react'
import { Link } from 'react-router'
import type { TaskRun } from 'src/shared/fixtures'
import { formatUsd, initials, relTime } from 'src/shared/fixtures'
import { AvatarInitials, MiniStepper, PriorityTag, StatusBadge, toneForStatus } from 'src/shared/ui'

export type RunRowVariant = 'recent' | 'table'

interface Column {
  readonly key: string
  readonly label: string
  readonly w: string
  readonly end?: boolean
  // Container-query at which this column is hidden as the table block narrows.
  readonly hide?: string
  readonly cell: (run: TaskRun) => ReactNode
}

// Build a container-query string; the px literal stays inside the string so it
// is not a magic number in the column specs.
const cq = (px: string): string => `@container (max-width: ${px})`

const STATUS: Column = {
  key: 'status',
  label: 'Status',
  w: '128px',
  cell: (run) => <StatusBadge status={run.status} size="sm" />,
}
const PROGRESS: Column = {
  key: 'progress',
  label: 'Progress',
  w: '120px',
  hide: cq('640px'),
  cell: (run) => <MiniStepper done={run.progress.done} total={run.progress.total} status={run.status} />,
}
const PRIORITY: Column = {
  key: 'priority',
  label: 'Priority',
  w: '96px',
  hide: cq('760px'),
  cell: (run) => <PriorityTag priority={run.priority} />,
}
const CREATED_BY: Column = {
  key: 'by',
  label: 'Created by',
  w: '132px',
  hide: cq('900px'),
  cell: (run) => (
    <HStack gap="2" minW="0">
      <AvatarInitials label={initials(run.createdBy)} system={run.createdBy === 'orchestrator'} />
      <Text className="mono" textStyle="regular-xs" color="fg.1" truncate>
        {run.createdBy}
      </Text>
    </HStack>
  ),
}
const COST: Column = {
  key: 'cost',
  label: 'Spend',
  w: '76px',
  end: true,
  hide: cq('420px'),
  cell: (run) => (
    <Text className="mono tnum" textStyle="medium-sm" color="fg.1">
      {formatUsd(run.spend)}
    </Text>
  ),
}
const TIME: Column = {
  key: 'time',
  label: 'Created',
  w: '88px',
  end: true,
  hide: cq('540px'),
  cell: (run) => (
    <Text textStyle="regular-xs" color="fg.3">
      {relTime(run.createdAt)}
    </Text>
  ),
}

const TABLE_COLUMNS: ReadonlyArray<Column> = [STATUS, PROGRESS, PRIORITY, CREATED_BY, COST, TIME]
const RECENT_COLUMNS: ReadonlyArray<Column> = [
  { ...PROGRESS, w: '112px', hide: cq('520px') },
  { ...STATUS, w: '150px' },
  { ...COST, w: '56px', hide: cq('380px') },
  { ...TIME, w: '64px', hide: cq('620px') },
]

const Cell = ({ col, children }: { readonly col: Column; readonly children: ReactNode }) => (
  <Flex
    w={col.w}
    flexShrink="0"
    justify={col.end ? 'flex-end' : 'flex-start'}
    css={col.hide ? { [col.hide]: { display: 'none' } } : undefined}
  >
    {children}
  </Flex>
)

const SubLine = ({ run, variant }: { readonly run: TaskRun; readonly variant: RunRowVariant }) => (
  <HStack gap="2" mt="1" color="fg.2" textStyle="regular-xs">
    <HStack gap="1" minW="0">
      <Box color="fg.3" display="inline-flex">
        <GitBranch size={13} />
      </Box>
      <Text truncate>{run.repos[0]}</Text>
    </HStack>
    {run.repos.length > 1 ? (
      <Span px="1.5" borderRadius="4px" bg="bg.inset" color="fg.3" textStyle="regular-micro">
        +{run.repos.length - 1}
      </Span>
    ) : null}
    <Span color="fg.3">·</Span>
    <Text className="mono" color="fg.3" textStyle="regular-micro">
      {variant === 'table' ? run.scope : run.id}
    </Text>
  </HStack>
)

export const RunRow = ({ run, variant = 'recent' }: { readonly run: TaskRun; readonly variant?: RunRowVariant }) => {
  const cols = variant === 'table' ? TABLE_COLUMNS : RECENT_COLUMNS
  return (
    <ChakraLink
      asChild
      display="block"
      borderBottomWidth="1px"
      borderColor="border.subtle"
      _last={{ borderBottomWidth: '0' }}
      _hover={{ textDecoration: 'none', bg: 'brand.tint' }}
    >
      <Link to={`/runs/${run.id}`}>
        <Flex align="center" gap="3" pr="4" minH={variant === 'table' ? '64px' : undefined}>
          <Box
            w="3px"
            alignSelf="stretch"
            borderRightRadius="3px"
            flexShrink="0"
            bg={`dot.${toneForStatus(run.status)}`}
          />
          <Box flex="1" minW="0" py="3">
            <Text textStyle="medium-sm" color="fg.0" truncate>
              {run.title}
            </Text>
            <SubLine run={run} variant={variant} />
          </Box>
          {cols.map((col) => (
            <Cell key={col.key} col={col}>
              {col.cell(run)}
            </Cell>
          ))}
        </Flex>
      </Link>
    </ChakraLink>
  )
}

const HeaderLabel = ({ children }: { readonly children: ReactNode }) => (
  <Text textStyle="semibold-micro" textTransform="uppercase" letterSpacing="0.04em" color="fg.3" truncate>
    {children}
  </Text>
)

// Column header row for the table variant; shares widths + hide rules with RunRow
// so columns drop in sync inside the same container.
export const RunsTableHeader = () => (
  <Flex align="center" gap="3" pr="4" h="38px" bg="bg.inset" borderBottomWidth="1px" borderColor="border">
    <Box w="3px" flexShrink="0" />
    <Box flex="1" minW="0">
      <HeaderLabel>Run</HeaderLabel>
    </Box>
    {TABLE_COLUMNS.map((col) => (
      <Cell key={col.key} col={col}>
        <HeaderLabel>{col.label}</HeaderLabel>
      </Cell>
    ))}
  </Flex>
)
