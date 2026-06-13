import { Stack } from '@chakra-ui/react'
import { Card, PageHeader } from 'src/shared/ui'
import { PLAYBOOKS } from 'src/shared/fixtures'
import { PlaybooksList } from 'src/widgets/PlaybooksList'

export const MethodPlaybooksPage = () => (
  <Stack gap="6">
    <PageHeader title="Playbooks" description="Installed playbook packages and their catalog versions." />
    <Card p="4">
      <PlaybooksList playbooks={PLAYBOOKS} />
    </Card>
  </Stack>
)
