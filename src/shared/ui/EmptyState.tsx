import { Center, Stack, Text } from '@chakra-ui/react'

interface EmptyStateProps {
  readonly title: string
  readonly description?: string
}

export const EmptyState = ({ title, description }: EmptyStateProps) => (
  <Center borderWidth="1px" borderStyle="dashed" borderColor="neutral.300" borderRadius="lg" py="10" px="6">
    <Stack gap="1" textAlign="center">
      <Text textStyle="medium-sm" color="text.2">
        {title}
      </Text>
      {description ? (
        <Text textStyle="regular-sm" color="text.3">
          {description}
        </Text>
      ) : null}
    </Stack>
  </Center>
)
