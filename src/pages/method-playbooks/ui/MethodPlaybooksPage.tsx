import { Button, Stack } from '@chakra-ui/react'
import { BookOpen } from 'lucide-react'
import { MethodTabs } from 'src/features/MethodTabs'
import { Card, PageHeader } from 'src/shared/ui'
import { PLAYBOOKS } from 'src/shared/fixtures'
import { PlaybooksList } from 'src/widgets/PlaybooksList'

const Actions = (
  <Button
    size="sm"
    h="34px"
    px="3.5"
    gap="2"
    bg="bg.1"
    color="fg.0"
    borderWidth="1px"
    borderColor="border.strong"
    borderRadius="btn"
    disabled
    _disabled={{ opacity: 0.58, cursor: 'not-allowed' }}
  >
    <BookOpen size={14} />
    Schema v2
  </Button>
)

export const MethodPlaybooksPage = () => (
  <Stack gap="6">
    <PageHeader
      eyebrow="The method"
      title="Method"
      description="Typed, versioned definitions that govern every run — pipelines, roles, and installed playbooks."
      actions={Actions}
    />
    <MethodTabs active="playbooks" />
    <Card p="4">
      <PlaybooksList playbooks={PLAYBOOKS} />
    </Card>
  </Stack>
)
