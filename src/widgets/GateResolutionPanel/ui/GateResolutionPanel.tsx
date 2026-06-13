import { Box, Button, HStack, Input, Stack, Text } from '@chakra-ui/react'
import { AccentBadge, Card, SectionHeading, StatusBadge, type StatusTone } from 'src/shared/ui'
import type { InboxItemDetail } from 'src/shared/fixtures'

interface GateResolutionPanelProps {
  readonly item: InboxItemDetail
}

const RISK_TONE: Record<string, StatusTone> = {
  low: 'neutral',
  medium: 'waiting',
  high: 'failed',
}

const isQuestion = (item: InboxItemDetail): boolean => item.gateType === 'answer_question'

const CONTEXT_HEADING: Record<InboxItemDetail['gateType'], string> = {
  plan_gate: 'Plan summary',
  merge_gate: 'Diff / PR summary',
  answer_question: 'Prompt',
}

const ContextBlock = ({ item }: { readonly item: InboxItemDetail }) => {
  const heading = CONTEXT_HEADING[item.gateType]
  return (
    <Card>
      <Stack gap="2">
        <SectionHeading>{heading}</SectionHeading>
        <Text textStyle="regular-sm" color="text.2">
          {item.contextSummary}
        </Text>
      </Stack>
    </Card>
  )
}

const RiskSummary = ({ item }: { readonly item: InboxItemDetail }) => (
  <Card>
    <Stack gap="3">
      <SectionHeading>Risk summary</SectionHeading>
      <Stack gap="2">
        {item.riskSummary.map((risk) => (
          <HStack key={risk.note} align="start" gap="3">
            <StatusBadge status={risk.level} tone={RISK_TONE[risk.level]} />
            <Text textStyle="regular-sm" color="text.2" flex="1">
              {risk.note}
            </Text>
          </HStack>
        ))}
      </Stack>
    </Stack>
  </Card>
)

// Approval gates get an emphasized accent rail; answer_question reads as a
// neutral form so the two are visually distinct.
const Controls = ({ item }: { readonly item: InboxItemDetail }) => {
  const question = isQuestion(item)

  return (
    <Card borderLeftWidth="4px" borderLeftColor={question ? 'accent.role.border' : 'accent.gate.border'}>
      <Stack gap="3">
        <HStack gap="2">
          <SectionHeading>{question ? 'Answer' : 'Decision'}</SectionHeading>
          <AccentBadge kind="gate">{item.gateType.replace(/_/g, ' ')}</AccentBadge>
        </HStack>
        {question ? (
          <Stack gap="3">
            <Input placeholder="Type an answer…" bg="neutral.0" borderColor="neutral.300" disabled />
            <HStack>
              <Button size="sm" bg="accent.role.fg" color="neutral.0" disabled title="Prototype: inert">
                Submit answer
              </Button>
            </HStack>
          </Stack>
        ) : (
          <HStack gap="3">
            <Button size="sm" bg="status.success.fg" color="neutral.0" disabled title="Prototype: inert">
              Approve
            </Button>
            <Button
              size="sm"
              variant="outline"
              color="status.failed.fg"
              borderColor="status.failed.border"
              disabled
              title="Prototype: inert"
            >
              Reject
            </Button>
          </HStack>
        )}
        <Box>
          <Text textStyle="regular-xs" color="text.4">
            Options: {item.options.map((option) => option.label).join(' · ')}
          </Text>
        </Box>
      </Stack>
    </Card>
  )
}

export const GateResolutionPanel = ({ item }: GateResolutionPanelProps) => (
  <Stack gap="4">
    <ContextBlock item={item} />
    <RiskSummary item={item} />
    <Controls item={item} />
  </Stack>
)
