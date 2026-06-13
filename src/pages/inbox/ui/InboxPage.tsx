import { useState } from 'react'
import { Button, HStack, Stack } from '@chakra-ui/react'
import { PageHeader } from 'src/shared/ui'
import { INBOX_ITEMS } from 'src/shared/fixtures'
import { InboxList } from 'src/widgets/InboxList'

type Filter = 'pending' | 'all'

export const InboxPage = () => {
  const [filter, setFilter] = useState<Filter>('pending')
  const items = filter === 'pending' ? INBOX_ITEMS.filter((item) => item.status === 'pending') : INBOX_ITEMS

  return (
    <Stack gap="6" maxW="800px">
      <PageHeader title="Inbox" description="The single human queue: approvals, questions, and alerts." />
      <HStack gap="2">
        <Button
          size="xs"
          variant={filter === 'pending' ? 'solid' : 'outline'}
          bg={filter === 'pending' ? 'brand.500' : 'neutral.0'}
          color={filter === 'pending' ? 'neutral.0' : 'text.2'}
          borderColor="neutral.300"
          onClick={() => setFilter('pending')}
        >
          Pending
        </Button>
        <Button
          size="xs"
          variant={filter === 'all' ? 'solid' : 'outline'}
          bg={filter === 'all' ? 'brand.500' : 'neutral.0'}
          color={filter === 'all' ? 'neutral.0' : 'text.2'}
          borderColor="neutral.300"
          onClick={() => setFilter('all')}
        >
          All
        </Button>
      </HStack>
      <InboxList items={items} />
    </Stack>
  )
}
