import { Box, Stack, Text } from '@chakra-ui/react'
import { AccentBadge, Card, FieldRow, PageHeader, SectionHeading, TagList } from 'src/shared/ui'
import { roleById } from 'src/shared/fixtures'

interface MethodRoleDetailPageProps {
  readonly roleId: string
}

export const MethodRoleDetailPage = ({ roleId }: MethodRoleDetailPageProps) => {
  const role = roleById(roleId)

  return (
    <Stack gap="6" maxW="800px">
      <PageHeader title={role.name} description={`role · ${role.surface}`} />
      <Card>
        <Stack gap="1">
          <FieldRow label="Model level">{role.modelLevel}</FieldRow>
          <FieldRow label="Effort">{role.effort}</FieldRow>
          <FieldRow label="Runner">{role.runner}</FieldRow>
          <FieldRow label="Scope">{role.scope}</FieldRow>
          <FieldRow label="Rights">{role.rights}</FieldRow>
          <FieldRow label="Surface">
            <AccentBadge kind="role">{role.surface}</AccentBadge>
          </FieldRow>
          <FieldRow label="Playbook">{role.playbookId}</FieldRow>
          <FieldRow label="Allowed tools">
            <TagList items={role.allowedTools} />
          </FieldRow>
        </Stack>
      </Card>
      <Card>
        <Stack gap="3">
          <SectionHeading>System prompt</SectionHeading>
          <Box bg="neutral.100" borderRadius="md" p="4" borderWidth="1px" borderColor="neutral.200">
            <Text textStyle="regular-sm" color="text.2" whiteSpace="pre-wrap">
              {role.systemPromptPreview}
            </Text>
          </Box>
        </Stack>
      </Card>
    </Stack>
  )
}
