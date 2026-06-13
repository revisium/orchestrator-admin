import { Stack } from '@chakra-ui/react'
import { PageHeader } from 'src/shared/ui'
import { PIPELINES } from 'src/shared/fixtures'
import { PipelinesList } from 'src/widgets/PipelinesList'

export const MethodPipelinesPage = () => (
  <Stack gap="6" maxW="800px">
    <PageHeader title="Pipelines" description="Imported pipeline definitions: triggers, roles, and route gates." />
    <PipelinesList pipelines={PIPELINES} />
  </Stack>
)
