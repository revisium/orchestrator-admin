import { SimpleGrid } from '@chakra-ui/react'
import { EmptyState } from 'src/shared/ui'
import type { TaskRun } from 'src/shared/fixtures'
import { RunCard } from 'src/features/RunCard'

interface RunsBoardProps {
  readonly runs: ReadonlyArray<TaskRun>
}

export const RunsBoard = ({ runs }: RunsBoardProps) => {
  if (runs.length === 0) {
    return (
      <EmptyState title="No runs yet" description="Create a run to route a task through the orchestrator pipeline." />
    )
  }

  return (
    <SimpleGrid columns={{ base: 1, lg: 2, xl: 3 }} gap="4">
      {runs.map((run) => (
        <RunCard key={run.id} run={run} />
      ))}
    </SimpleGrid>
  )
}
