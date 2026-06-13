import { Box, HStack, Stack, Table, Tabs, Text } from '@chakra-ui/react'
import { Card, PageHeader, SectionHeading, StatusBadge, TagList } from 'src/shared/ui'
import { RUN_ATTEMPTS, RUN_COSTS, RUN_EVENTS, runById } from 'src/shared/fixtures'
import type { TaskRun } from 'src/shared/fixtures'
import { RunProgressGraph } from 'src/features/RunProgressGraph'
import { CostPanel } from 'src/widgets/CostPanel'

interface RunDetailPageProps {
  readonly runId: string
}

const COST_DECIMALS = 3

const RunDetailHeader = ({ run }: { readonly run: TaskRun }) => (
  <Card>
    <Stack gap="3">
      <HStack justify="space-between" align="start" gap="4">
        <Stack gap="1">
          <Text textStyle="semibold-lg" color="text.1">
            {run.title}
          </Text>
          <Text textStyle="regular-sm" color="text.3">
            {run.id} · scope {run.scope} · priority {run.priority}
          </Text>
        </Stack>
        <StatusBadge status={run.status} />
      </HStack>
      <TagList items={run.repos} />
    </Stack>
  </Card>
)

const TimelineTab = () => (
  <Stack gap="3">
    <SectionHeading>Timeline</SectionHeading>
    <Stack gap="0">
      {RUN_EVENTS.map((event) => (
        <HStack key={event.id} align="start" gap="4" py="3" borderBottomWidth="1px" borderColor="neutral.200">
          <Text textStyle="regular-xs" color="text.4" minW="44" flexShrink="0">
            {event.createdAt}
          </Text>
          <Stack gap="0.5" flex="1" minW="0">
            <HStack gap="2">
              <Text textStyle="medium-sm" color="text.1">
                {event.type}
              </Text>
              <Text textStyle="regular-xs" color="text.3">
                {event.actor}
              </Text>
            </HStack>
            <Text textStyle="regular-xs" color="text.3">
              {event.payloadSummary}
            </Text>
          </Stack>
        </HStack>
      ))}
    </Stack>
  </Stack>
)

const ProgressTab = () => (
  <Stack gap="3">
    <SectionHeading>Progress</SectionHeading>
    <Text textStyle="regular-sm" color="text.3">
      Pipeline steps colored by status. The dashed loop is the reviewer → developer rework path.
    </Text>
    <RunProgressGraph />
  </Stack>
)

const AttemptsTab = () => (
  <Stack gap="3">
    <SectionHeading>Attempts</SectionHeading>
    <Table.Root size="sm" variant="outline">
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeader>Step</Table.ColumnHeader>
          <Table.ColumnHeader>#</Table.ColumnHeader>
          <Table.ColumnHeader>Status</Table.ColumnHeader>
          <Table.ColumnHeader>Model</Table.ColumnHeader>
          <Table.ColumnHeader>In</Table.ColumnHeader>
          <Table.ColumnHeader>Out</Table.ColumnHeader>
          <Table.ColumnHeader>Lesson / error</Table.ColumnHeader>
          <Table.ColumnHeader>Cost</Table.ColumnHeader>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {RUN_ATTEMPTS.map((attempt) => (
          <Table.Row key={attempt.id}>
            <Table.Cell>{attempt.stepLabel}</Table.Cell>
            <Table.Cell>{attempt.attemptNo}</Table.Cell>
            <Table.Cell>
              <StatusBadge status={attempt.status} />
            </Table.Cell>
            <Table.Cell>{attempt.modelProfile}</Table.Cell>
            <Table.Cell>{attempt.inputTokens.toLocaleString()}</Table.Cell>
            <Table.Cell>{attempt.outputTokens.toLocaleString()}</Table.Cell>
            <Table.Cell>
              <Text textStyle="regular-xs" color={attempt.error ? 'status.failed.fg' : 'text.3'}>
                {attempt.error ?? attempt.lesson ?? '—'}
              </Text>
            </Table.Cell>
            <Table.Cell>
              {attempt.costAmount.toFixed(COST_DECIMALS)} {attempt.currency}
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  </Stack>
)

const EventsTab = () => (
  <Stack gap="3">
    <SectionHeading>Events</SectionHeading>
    <Stack gap="2">
      {RUN_EVENTS.map((event) => (
        <Box key={event.id} borderWidth="1px" borderColor="neutral.200" borderRadius="md" p="3" bg="neutral.0">
          <HStack gap="3" justify="space-between">
            <Text textStyle="medium-xs" color="text.2">
              {event.type}
            </Text>
            <Text textStyle="regular-xs" color="text.4">
              {event.createdAt}
            </Text>
          </HStack>
          <Text textStyle="regular-xs" color="text.3" mt="1">
            actor={event.actor} · {event.payloadSummary}
          </Text>
        </Box>
      ))}
    </Stack>
  </Stack>
)

const CostTab = () => <CostPanel rows={RUN_COSTS} />

export const RunDetailPage = ({ runId }: RunDetailPageProps) => {
  const run = runById(runId)

  return (
    <Stack gap="6">
      <PageHeader title="Run detail" description={run.id} />
      <RunDetailHeader run={run} />
      <Card>
        <Tabs.Root defaultValue="timeline" variant="line">
          <Tabs.List>
            <Tabs.Trigger value="timeline">Timeline</Tabs.Trigger>
            <Tabs.Trigger value="progress">Progress</Tabs.Trigger>
            <Tabs.Trigger value="attempts">Attempts</Tabs.Trigger>
            <Tabs.Trigger value="events">Events</Tabs.Trigger>
            <Tabs.Trigger value="cost">Cost</Tabs.Trigger>
          </Tabs.List>
          <Box pt="4">
            <Tabs.Content value="timeline">
              <TimelineTab />
            </Tabs.Content>
            <Tabs.Content value="progress">
              <ProgressTab />
            </Tabs.Content>
            <Tabs.Content value="attempts">
              <AttemptsTab />
            </Tabs.Content>
            <Tabs.Content value="events">
              <EventsTab />
            </Tabs.Content>
            <Tabs.Content value="cost">
              <CostTab />
            </Tabs.Content>
          </Box>
        </Tabs.Root>
      </Card>
    </Stack>
  )
}
