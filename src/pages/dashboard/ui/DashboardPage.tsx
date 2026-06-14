import { Box, Button, Link as ChakraLink, Flex, Grid, HStack, SimpleGrid, Stack, Text } from '@chakra-ui/react'
import { ArrowRight, CircleCheck, DoorOpen, Play, RefreshCw, TriangleAlert } from 'lucide-react'
import { Link } from 'react-router'
import { PENDING_INBOX, PENDING_QUEUE, RECENT_RUNS, statusCount } from 'src/shared/fixtures'
import { PageHeader, SectionHeading } from 'src/shared/ui'
import { DecideCallout } from './DecideCallout'
import { HostStatusCard } from './HostStatusCard'
import { MiniQueue } from './MiniQueue'
import { RunRow } from 'src/entities/run'
import { StatCard, type StatDef } from './StatCard'

const STAT_DEFS: ReadonlyArray<StatDef> = [
  { key: 'running', label: 'Running', tone: 'running', icon: Play, hint: 'agents active now', to: '/runs' },
  {
    key: 'awaiting_approval',
    label: 'Awaiting approval',
    tone: 'waiting',
    icon: DoorOpen,
    hint: 'gates need you',
    to: '/inbox',
    accent: true,
  },
  {
    key: 'completed',
    label: 'Completed today',
    tone: 'success',
    icon: CircleCheck,
    hint: 'merged & closed',
    to: '/runs',
  },
  { key: 'failed', label: 'Failed', tone: 'failed', icon: TriangleAlert, hint: 'in last 24h', to: '/runs' },
]

const Eyebrow = (
  <HStack gap="2" align="center">
    <Box boxSize="2" borderRadius="full" bg="brand.500" />
    <Text as="span">Control room · all projects</Text>
  </HStack>
)

const RefreshButton = (
  <Button
    size="sm"
    h="36px"
    px="3.5"
    gap="2"
    bg="transparent"
    color="fg.1"
    borderRadius="btn"
    _hover={{ bg: 'blackAlpha.50', color: 'fg.0' }}
  >
    <RefreshCw size={15} />
    Refresh
  </Button>
)

export const DashboardPage = () => (
  <Stack gap="7">
    <PageHeader
      eyebrow={Eyebrow}
      title="Dashboard"
      description="Calm control over the local orchestrator — what's running, what needs you, what it cost."
      actions={RefreshButton}
    />

    <HostStatusCard />

    <SimpleGrid columns={{ base: 1, sm: 2, xl: 4 }} gap="4">
      {STAT_DEFS.map((def) => (
        <StatCard key={def.key} def={def} count={statusCount(def.key)} />
      ))}
    </SimpleGrid>

    <Grid
      templateColumns={{ base: '1fr', xl: 'minmax(0, 2fr) minmax(0, 1fr)' }}
      gap={{ base: '6', xl: '8' }}
      alignItems="start"
    >
      <Stack gap="3.5">
        <Flex align="flex-end" justify="space-between" gap="4">
          <Box>
            <SectionHeading>Recent runs</SectionHeading>
            <Text textStyle="regular-sm" color="fg.2">
              Latest task runs across all repos
            </Text>
          </Box>
          <ChakraLink asChild color="fg.2" textStyle="medium-sm" _hover={{ color: 'fg.0', textDecoration: 'none' }}>
            <Link to="/runs">
              <HStack gap="1.5">
                <Text>View all</Text>
                <ArrowRight size={14} />
              </HStack>
            </Link>
          </ChakraLink>
        </Flex>
        <Box
          containerType="inline-size"
          bg="bg.1"
          borderWidth="1px"
          borderColor="border"
          borderRadius="card"
          boxShadow="sh-1"
          overflow="hidden"
        >
          {RECENT_RUNS.map((run) => (
            <RunRow key={run.id} run={run} variant="recent" />
          ))}
        </Box>
      </Stack>

      <Stack gap="3.5">
        <SectionHeading>Pending decisions</SectionHeading>
        <DecideCallout count={PENDING_INBOX.length} />
        <MiniQueue items={PENDING_QUEUE} />
      </Stack>
    </Grid>
  </Stack>
)
