import { HStack, Stack, Text } from '@chakra-ui/react'
import { Link } from 'react-router'
import { AccentBadge, Card } from 'src/shared/ui'
import type { RoleRow } from 'src/shared/fixtures'

interface RolesListProps {
  readonly roles: ReadonlyArray<RoleRow>
}

export const RolesList = ({ roles }: RolesListProps) => (
  <Stack gap="3">
    {roles.map((role) => (
      <Card key={role.id} asChild p="4" _hover={{ borderColor: 'brand.500' }} transition="border-color 0.15s">
        <Link to={`/method/roles/${role.id}`}>
          <HStack justify="space-between" align="start" gap="4">
            <Stack gap="1">
              <HStack gap="2">
                <Text textStyle="semibold-sm" color="text.1">
                  {role.name}
                </Text>
                <AccentBadge kind="role">{role.surface}</AccentBadge>
              </HStack>
              <Text textStyle="regular-xs" color="text.3">
                rights: {role.rights}
              </Text>
            </Stack>
            <Stack gap="1" textAlign="right" flexShrink="0">
              <Text textStyle="medium-xs" color="text.2">
                {role.modelLevel}
              </Text>
              <Text textStyle="regular-xs" color="text.4">
                {role.runner}
              </Text>
            </Stack>
          </HStack>
        </Link>
      </Card>
    ))}
  </Stack>
)
