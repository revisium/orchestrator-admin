import { HStack, Stack, Text } from '@chakra-ui/react'
import { CheckCircle2 } from 'lucide-react'
import type { InboxItem } from 'src/shared/fixtures'
import { InboxRow } from 'src/entities/inbox'

interface InboxListProps {
  readonly items: ReadonlyArray<InboxItem>
  readonly activeId?: string
}

const GroupLabel = ({ label, count }: { readonly label: string; readonly count?: number }) => (
  <HStack gap="2" px="2.5" pb="1">
    <Text textStyle="semibold-micro" textTransform="uppercase" letterSpacing="0.05em" color="fg.3">
      {label}
    </Text>
    {count === undefined ? null : (
      <Text className="tnum" textStyle="semibold-micro" color="fg.3">
        {count}
      </Text>
    )}
  </HStack>
)

export const InboxList = ({ items, activeId }: InboxListProps) => {
  const pending = items.filter((item) => item.status === 'pending')
  const resolved = items.filter((item) => item.status === 'resolved')

  return (
    <Stack gap="5">
      <Stack gap="0.5">
        <GroupLabel label="Pending" count={pending.length} />
        {pending.length === 0 ? (
          <HStack gap="2" px="2.5" py="3" color="fg.3" textStyle="regular-sm">
            <CheckCircle2 size={18} />
            <Text>Inbox zero</Text>
          </HStack>
        ) : (
          pending.map((item) => <InboxRow key={item.id} item={item} active={item.id === activeId} />)
        )}
      </Stack>
      {resolved.length > 0 ? (
        <Stack gap="0.5">
          <GroupLabel label="Resolved" />
          {resolved.map((item) => (
            <InboxRow key={item.id} item={item} active={item.id === activeId} />
          ))}
        </Stack>
      ) : null}
    </Stack>
  )
}
