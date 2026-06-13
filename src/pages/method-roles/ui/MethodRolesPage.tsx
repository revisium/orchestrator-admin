import { Stack } from '@chakra-ui/react'
import { PageHeader } from 'src/shared/ui'
import { ROLES } from 'src/shared/fixtures'
import { RolesList } from 'src/widgets/RolesList'

export const MethodRolesPage = () => (
  <Stack gap="6" maxW="800px">
    <PageHeader title="Roles" description="Versioned role definitions the orchestrator routes work to." />
    <RolesList roles={ROLES} />
  </Stack>
)
