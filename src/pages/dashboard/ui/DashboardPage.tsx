import { Box, Grid, HStack, SimpleGrid, Stack, Text } from '@chakra-ui/react'
import { Card, FieldRow, PageHeader, SectionHeading, StatusBadge } from 'src/shared/ui'
import { HOST_STATUS, RUN_STATUS_COUNTS, TASK_RUNS } from 'src/shared/fixtures'
import { RunCard } from 'src/features/RunCard'

const RECENT_RUNS_LIMIT = 4

const HostStatusCard = () => (
  <Card>
    <Stack gap="3">
      <SectionHeading>Host status</SectionHeading>
      <Stack gap="0">
        <FieldRow label="Host">
          <HStack gap="2">
            <Box w="2" h="2" borderRadius="full" bg="status.success.fg" />
            <Text textStyle="regular-sm" color="text.1">
              {HOST_STATUS.host}
            </Text>
          </HStack>
        </FieldRow>
        <FieldRow label="Daemon">
          <StatusBadge status={HOST_STATUS.daemonUp ? 'running' : 'failed'} />
        </FieldRow>
        <FieldRow label="DBOS">
          <StatusBadge status={HOST_STATUS.dbosConnected ? 'completed' : 'failed'} />
        </FieldRow>
        <FieldRow label="Control plane">{HOST_STATUS.controlPlane}</FieldRow>
        <FieldRow label="Playbook">{HOST_STATUS.playbookVersion}</FieldRow>
      </Stack>
    </Stack>
  </Card>
)

const RunsSummaryStrip = () => (
  <Card>
    <Stack gap="3">
      <SectionHeading>Runs by status</SectionHeading>
      <SimpleGrid columns={{ base: 2, md: 3, xl: 5 }} gap="3">
        {RUN_STATUS_COUNTS.map((bucket) => (
          <Stack
            key={bucket.status}
            gap="1"
            p="3"
            borderWidth="1px"
            borderColor="neutral.200"
            borderRadius="md"
            bg="neutral.100"
          >
            <Text textStyle="semibold-lg" color="text.1">
              {bucket.count}
            </Text>
            <StatusBadge status={bucket.status} />
          </Stack>
        ))}
      </SimpleGrid>
    </Stack>
  </Card>
)

const RecentRunsList = () => (
  <Stack gap="3">
    <SectionHeading>Recent runs</SectionHeading>
    <Stack gap="3">
      {TASK_RUNS.slice(0, RECENT_RUNS_LIMIT).map((run) => (
        <RunCard key={run.id} run={run} />
      ))}
    </Stack>
  </Stack>
)

export const DashboardPage = () => (
  <Stack gap="6">
    <PageHeader title="Dashboard" description="Live state of the orchestrator host, runs, and control plane." />
    <Grid templateColumns={{ base: '1fr', xl: '360px 1fr' }} gap="4" alignItems="start">
      <HostStatusCard />
      <RunsSummaryStrip />
    </Grid>
    <RecentRunsList />
  </Stack>
)
