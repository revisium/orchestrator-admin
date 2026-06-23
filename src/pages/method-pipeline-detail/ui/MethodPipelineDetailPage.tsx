import { Stack } from '@chakra-ui/react'
import { MethodTabs } from 'src/features/MethodTabs'
import { PIPELINES } from 'src/shared/fixtures'
import { PageHeader, SchemaV2Action } from 'src/shared/ui'
import { PipelinesList } from 'src/widgets/PipelinesList'

interface MethodPipelineDetailPageProps {
  readonly pipelineId: string
}

export const MethodPipelineDetailPage = ({ pipelineId }: MethodPipelineDetailPageProps) => (
  <Stack gap="6">
    <PageHeader
      eyebrow="The method"
      title="Method"
      description="Typed, versioned definitions that govern every run — pipelines, roles, and installed playbooks."
      actions={<SchemaV2Action />}
    />
    <MethodTabs active="pipelines" />
    <PipelinesList pipelines={PIPELINES} selectedPipelineId={pipelineId} />
  </Stack>
)
