import { HStack, Stack, Text } from '@chakra-ui/react'
import { Link } from 'react-router'
import { AccentBadge, Card, EmptyState, StatusBadge } from 'src/shared/ui'
import type { InboxItem, InboxKind } from 'src/shared/fixtures'

interface InboxListProps {
  readonly items: ReadonlyArray<InboxItem>
}

const kindAccent: Record<InboxKind, 'gate' | 'role'> = {
  approval: 'gate',
  question: 'role',
  alert: 'role',
}

export const InboxList = ({ items }: InboxListProps) => {
  if (items.length === 0) {
    return <EmptyState title="Inbox clear" description="No items match the current filter." />
  }

  return (
    <Stack gap="3">
      {items.map((item) => (
        <Card key={item.id} asChild p="4" _hover={{ borderColor: 'brand.500' }} transition="border-color 0.15s">
          <Link to={`/inbox/${item.id}`}>
            <Stack gap="2">
              <HStack justify="space-between" align="start" gap="3">
                <Text textStyle="medium-sm" color="text.1">
                  {item.title}
                </Text>
                <StatusBadge status={item.status} />
              </HStack>
              <HStack gap="3">
                <AccentBadge kind={kindAccent[item.kind]}>{item.kind}</AccentBadge>
                <Text textStyle="regular-xs" color="text.4">
                  {item.runId}
                </Text>
                <Text textStyle="regular-xs" color="text.4">
                  {item.createdAt}
                </Text>
              </HStack>
            </Stack>
          </Link>
        </Card>
      ))}
    </Stack>
  )
}
