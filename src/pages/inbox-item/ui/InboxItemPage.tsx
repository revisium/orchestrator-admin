import { HStack, Link as ChakraLink, Stack } from '@chakra-ui/react'
import { Link } from 'react-router'
import { AccentBadge, PageHeader, StatusBadge } from 'src/shared/ui'
import { inboxItemById } from 'src/shared/fixtures'
import { GateResolutionPanel } from 'src/widgets/GateResolutionPanel'

interface InboxItemPageProps {
  readonly itemId: string
}

const kindAccent = (kind: string): 'gate' | 'role' => (kind === 'approval' ? 'gate' : 'role')

export const InboxItemPage = ({ itemId }: InboxItemPageProps) => {
  const item = inboxItemById(itemId)

  return (
    <Stack gap="6" maxW="800px">
      <PageHeader title={item.title} description={`${item.id} · run `} />
      <HStack gap="3">
        <AccentBadge kind={kindAccent(item.kind)}>{item.kind}</AccentBadge>
        <StatusBadge status={item.status} />
        <ChakraLink asChild textStyle="medium-sm" color="brand.500">
          <Link to={`/runs/${item.runId}`}>{item.runId}</Link>
        </ChakraLink>
      </HStack>
      <GateResolutionPanel item={item} />
    </Stack>
  )
}
