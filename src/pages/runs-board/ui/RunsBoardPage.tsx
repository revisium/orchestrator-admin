import { HStack, Stack, Text } from '@chakra-ui/react'
import { List } from 'lucide-react'
import { PageHeader } from 'src/shared/ui'
import { TASK_RUNS } from 'src/shared/fixtures'
import { RunsBoard } from 'src/widgets/RunsBoard'

const Eyebrow = (
  <HStack gap="2" align="center">
    <List size={13} />
    <Text as="span">Task runs · all projects</Text>
  </HStack>
)

export const RunsBoardPage = () => (
  <Stack gap="6">
    <PageHeader
      eyebrow={Eyebrow}
      title="Runs"
      description="Every task run under deterministic control. Status is the anchor."
    />
    <RunsBoard runs={TASK_RUNS} />
  </Stack>
)
