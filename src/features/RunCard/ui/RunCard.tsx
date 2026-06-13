import { HStack, Stack, Text } from '@chakra-ui/react'
import { Link } from 'react-router'
import { Card, StatusBadge, TagList } from 'src/shared/ui'
import type { TaskRun } from 'src/shared/fixtures'

interface RunCardProps {
  readonly run: TaskRun
}

// Clickable summary card for a single task_run. Used by the runs board and the
// dashboard recent-runs list.
export const RunCard = ({ run }: RunCardProps) => (
  <Card asChild p="4" _hover={{ borderColor: 'brand.500' }} transition="border-color 0.15s">
    <Link to={`/runs/${run.id}`}>
      <Stack gap="3">
        <HStack justify="space-between" align="start" gap="3">
          <Text textStyle="semibold-sm" color="text.1">
            {run.title}
          </Text>
          <StatusBadge status={run.status} />
        </HStack>
        <Text textStyle="regular-xs" color="text.3" lineClamp="2">
          {run.description}
        </Text>
        <TagList items={run.repos} />
        <HStack gap="4" pt="1">
          <Text textStyle="regular-xs" color="text.4">
            {run.id}
          </Text>
          <Text textStyle="regular-xs" color="text.4">
            priority {run.priority}
          </Text>
          <Text textStyle="regular-xs" color="text.4">
            by {run.createdBy}
          </Text>
        </HStack>
      </Stack>
    </Link>
  </Card>
)
