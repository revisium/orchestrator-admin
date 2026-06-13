import { Stack } from '@chakra-ui/react'
import { PageHeader } from 'src/shared/ui'
import { CreateRunWizard } from 'src/widgets/CreateRunWizard'

export const RunCreatePage = () => (
  <Stack gap="6" maxW="900px">
    <PageHeader title="Create run" description="Validate a repository, describe the task, and preview the route." />
    <CreateRunWizard />
  </Stack>
)
