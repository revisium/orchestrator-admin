import { HStack, Stack, Text } from '@chakra-ui/react'
import { Link } from 'react-router'
import { AccentBadge, Card, TagList } from 'src/shared/ui'
import type { PipelineRow } from 'src/shared/fixtures'

interface PipelinesListProps {
  readonly pipelines: ReadonlyArray<PipelineRow>
}

export const PipelinesList = ({ pipelines }: PipelinesListProps) => (
  <Stack gap="3">
    {pipelines.map((pipeline) => (
      <Card key={pipeline.id} asChild p="4" _hover={{ borderColor: 'brand.500' }} transition="border-color 0.15s">
        <Link to={`/method/pipelines/${pipeline.id}`}>
          <Stack gap="3">
            <Text textStyle="semibold-sm" color="text.1">
              {pipeline.pipelineId}
            </Text>
            <Stack gap="2">
              <Text textStyle="medium-xs" color="text.3">
                triggers
              </Text>
              <TagList items={pipeline.triggers} />
            </Stack>
            <Stack gap="2">
              <Text textStyle="medium-xs" color="text.3">
                required roles
              </Text>
              <TagList items={pipeline.requiredRoles} />
            </Stack>
            <HStack gap="2">
              {pipeline.routeGates.map((gate) => (
                <AccentBadge key={gate} kind="gate">
                  {gate.replace(/_/g, ' ')}
                </AccentBadge>
              ))}
            </HStack>
          </Stack>
        </Link>
      </Card>
    ))}
  </Stack>
)
