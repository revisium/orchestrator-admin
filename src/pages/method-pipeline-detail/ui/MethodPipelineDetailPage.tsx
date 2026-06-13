import { Stack, Text } from '@chakra-ui/react'
import { AccentBadge, Card, FieldRow, PageHeader, SectionHeading, TagList } from 'src/shared/ui'
import { pipelineById } from 'src/shared/fixtures'
import { PipelineGraph } from 'src/features/PipelineGraph'

interface MethodPipelineDetailPageProps {
  readonly pipelineId: string
}

export const MethodPipelineDetailPage = ({ pipelineId }: MethodPipelineDetailPageProps) => {
  const pipeline = pipelineById(pipelineId)

  return (
    <Stack gap="6">
      <PageHeader title={pipeline.pipelineId} description="Pipeline route: roles, gates, and alternatives." />
      <Card>
        <Stack gap="1">
          <FieldRow label="Triggers">
            <TagList items={pipeline.triggers} />
          </FieldRow>
          <FieldRow label="Required roles">
            <TagList items={pipeline.requiredRoles} />
          </FieldRow>
          <FieldRow label="Optional roles">
            <TagList items={pipeline.optionalRoles} />
          </FieldRow>
          <FieldRow label="Route gates">
            {pipeline.routeGates.length === 0 ? (
              <Text textStyle="regular-sm" color="text.4">
                —
              </Text>
            ) : (
              <Stack direction="row" gap="2">
                {pipeline.routeGates.map((gate) => (
                  <AccentBadge key={gate} kind="gate">
                    {gate.replace(/_/g, ' ')}
                  </AccentBadge>
                ))}
              </Stack>
            )}
          </FieldRow>
          <FieldRow label="Alternatives">
            {pipeline.alternativeRoles.length === 0 ? (
              <Text textStyle="regular-sm" color="text.4">
                none
              </Text>
            ) : (
              <Stack gap="1">
                {pipeline.alternativeRoles.map((alt) => (
                  <Text key={alt.role} textStyle="regular-sm" color="text.2">
                    {alt.role} → {alt.alternative}
                  </Text>
                ))}
              </Stack>
            )}
          </FieldRow>
        </Stack>
      </Card>
      <Stack gap="3">
        <SectionHeading>Route graph</SectionHeading>
        <Text textStyle="regular-sm" color="text.3">
          Ordered roles and gates. Dashed nodes are optional; alternatives are annotated inline.
        </Text>
        <PipelineGraph />
      </Stack>
    </Stack>
  )
}
