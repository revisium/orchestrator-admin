import { Heading, Stack, Text } from '@chakra-ui/react'
import { RunProgressGraph } from 'src/features/RunProgressGraph'

export const RunGraphSmokePage = () => (
  <Stack gap="4">
    <Stack gap="1">
      <Heading textStyle="semibold-lg" color="text.1">
        Run progress graph
      </Heading>
      <Text textStyle="regular-sm" color="text.3">
        Client-only xyflow smoke probe. Seed of the real /runs/:runId DAG.
      </Text>
    </Stack>
    <RunProgressGraph />
  </Stack>
)
