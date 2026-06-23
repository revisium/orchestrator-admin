import { Stack } from '@chakra-ui/react'
import { MethodTabs } from 'src/features/MethodTabs'
import { ROLES } from 'src/shared/fixtures'
import { PageHeader, SchemaV2Action } from 'src/shared/ui'
import { RolesList } from 'src/widgets/RolesList'

interface MethodRoleDetailPageProps {
  readonly roleId: string
}

export const MethodRoleDetailPage = ({ roleId }: MethodRoleDetailPageProps) => (
  <Stack gap="6">
    <PageHeader
      eyebrow="The method"
      title="Method"
      description="Typed, versioned definitions that govern every run — pipelines, roles, and installed playbooks."
      actions={<SchemaV2Action />}
    />
    <MethodTabs active="roles" />
    <RolesList roles={ROLES} selectedRoleId={roleId} />
  </Stack>
)
