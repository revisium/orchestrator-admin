import { useState } from 'react'
import { Box, Button, Grid, HStack, Input, Stack, Text, Textarea } from '@chakra-ui/react'
import { Card, FieldRow, SectionHeading, StatusBadge, TagList } from 'src/shared/ui'
import { RoutePreviewGraph } from 'src/features/RoutePreviewGraph'

interface StepDef {
  readonly index: number
  readonly title: string
}

const STEPS: ReadonlyArray<StepDef> = [
  { index: 0, title: 'Repository' },
  { index: 1, title: 'Run details' },
  { index: 2, title: 'Route preview' },
]

const StepperRail = ({ active }: { readonly active: number }) => (
  <HStack gap="0" align="center">
    {STEPS.map((step, i) => {
      const isActive = step.index === active
      const isDone = step.index < active
      return (
        <HStack key={step.title} gap="0" flex={i === STEPS.length - 1 ? '0' : '1'} align="center">
          <HStack gap="2" flexShrink="0">
            <Box
              w="6"
              h="6"
              borderRadius="full"
              borderWidth="1px"
              display="flex"
              alignItems="center"
              justifyContent="center"
              bg={isActive || isDone ? 'brand.500' : 'neutral.0'}
              borderColor={isActive || isDone ? 'brand.500' : 'neutral.300'}
            >
              <Text textStyle="medium-xs" color={isActive || isDone ? 'neutral.0' : 'text.3'}>
                {step.index + 1}
              </Text>
            </Box>
            <Text textStyle="medium-sm" color={isActive ? 'text.1' : 'text.3'}>
              {step.title}
            </Text>
          </HStack>
          {i < STEPS.length - 1 ? <Box flex="1" h="1px" mx="3" bg="neutral.200" /> : null}
        </HStack>
      )
    })}
  </HStack>
)

const RepoValidationResult = () => (
  <Card bg="status.success.bg" borderColor="status.success.border">
    <Stack gap="3">
      <HStack justify="space-between">
        <Text textStyle="semibold-sm" color="status.success.fg">
          Repository validated
        </Text>
        <StatusBadge status="completed" />
      </HStack>
      <Stack gap="0">
        <FieldRow label="Default branch">master</FieldRow>
        <FieldRow label="Languages">TypeScript, JavaScript</FieldRow>
        <FieldRow label="Package manager">npm (peer-clean)</FieldRow>
        <FieldRow label="CI">GitHub Actions · verify + SonarCloud</FieldRow>
        <FieldRow label="Context summary">
          React Router v7 SSR admin UI. FSD layout. Verify gate: format, ts:check, lint, steiger, vitest, build.
        </FieldRow>
      </Stack>
    </Stack>
  </Card>
)

const RepoStep = () => (
  <Stack gap="4">
    <Stack gap="1">
      <Text textStyle="medium-sm" color="text.2">
        Repository
      </Text>
      <Input defaultValue="revisium/orchestrator-admin" bg="neutral.0" borderColor="neutral.300" />
      <Text textStyle="regular-xs" color="text.3">
        Validated via validate_repository + get_repository_context (mock).
      </Text>
    </Stack>
    <RepoValidationResult />
  </Stack>
)

const DetailsStep = () => (
  <Stack gap="4">
    <Stack gap="1">
      <Text textStyle="medium-sm" color="text.2">
        Title
      </Text>
      <Input defaultValue="Add release-train workflow" bg="neutral.0" borderColor="neutral.300" />
    </Stack>
    <Stack gap="1">
      <Text textStyle="medium-sm" color="text.2">
        Description
      </Text>
      <Textarea
        defaultValue="Wire a GitHub Actions release train with semantic version bumps and changelog generation."
        bg="neutral.0"
        borderColor="neutral.300"
        rows={3}
      />
    </Stack>
    <Grid templateColumns={{ base: '1fr', md: '1fr 1fr' }} gap="4">
      <Stack gap="1">
        <Text textStyle="medium-sm" color="text.2">
          Scope
        </Text>
        <Input defaultValue="ci" bg="neutral.0" borderColor="neutral.300" />
      </Stack>
      <Stack gap="1">
        <Text textStyle="medium-sm" color="text.2">
          Priority
        </Text>
        <Input defaultValue="high" bg="neutral.0" borderColor="neutral.300" />
      </Stack>
    </Grid>
  </Stack>
)

const RouteStep = () => (
  <Stack gap="4">
    <Stack gap="1">
      <Text textStyle="medium-sm" color="text.2">
        Proposed pipeline
      </Text>
      <Text textStyle="regular-xs" color="text.3">
        feature-default · roles and gates the orchestrator will route through.
      </Text>
    </Stack>
    <TagList items={['architect', 'plan_gate', 'developer', 'reviewer', 'merge_gate', 'integrator']} />
    <RoutePreviewGraph />
  </Stack>
)

const StepBody = ({ active }: { readonly active: number }) => {
  if (active === 0) {
    return <RepoStep />
  }
  if (active === 1) {
    return <DetailsStep />
  }
  return <RouteStep />
}

const LAST_STEP = STEPS.length - 1

export const CreateRunWizard = () => {
  const [active, setActive] = useState(0)
  const isLast = active === LAST_STEP

  return (
    <Stack gap="5">
      <StepperRail active={active} />
      <Card>
        <Stack gap="4">
          <SectionHeading>{STEPS[active].title}</SectionHeading>
          <StepBody active={active} />
        </Stack>
      </Card>
      <HStack justify="space-between">
        <Button
          variant="outline"
          size="sm"
          disabled={active === 0}
          onClick={() => setActive((step) => Math.max(0, step - 1))}
          borderColor="neutral.300"
          color="text.2"
        >
          Back
        </Button>
        {isLast ? (
          <Button
            size="sm"
            bg="brand.500"
            color="neutral.0"
            _hover={{ bg: 'brand.hover' }}
            disabled
            title="Prototype: submit is inert"
          >
            Create run
          </Button>
        ) : (
          <Button
            size="sm"
            bg="brand.500"
            color="neutral.0"
            _hover={{ bg: 'brand.hover' }}
            onClick={() => setActive((step) => Math.min(LAST_STEP, step + 1))}
          >
            Next
          </Button>
        )}
      </HStack>
    </Stack>
  )
}
