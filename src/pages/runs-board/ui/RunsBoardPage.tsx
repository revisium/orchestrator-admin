import { Button, Stack } from '@chakra-ui/react'
import { Link } from 'react-router'
import { PageHeader, SectionHeading } from 'src/shared/ui'
import { TASK_RUNS } from 'src/shared/fixtures'
import { RunsBoard } from 'src/widgets/RunsBoard'

export const RunsBoardPage = () => (
  <Stack gap="6">
    <PageHeader
      title="Runs"
      description="Every task run routed through the orchestrator."
      actions={
        <Button asChild size="sm" bg="brand.500" color="neutral.0" _hover={{ bg: 'brand.600' }}>
          <Link to="/runs/new">New run</Link>
        </Button>
      }
    />
    <RunsBoard runs={TASK_RUNS} />
    <Stack gap="3" pt="2">
      <SectionHeading>Empty state preview</SectionHeading>
      <RunsBoard runs={[]} />
    </Stack>
  </Stack>
)
