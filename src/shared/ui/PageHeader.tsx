import { Box, Heading, HStack, Stack, Text } from '@chakra-ui/react'
import type { ReactNode } from 'react'

interface PageHeaderProps {
  readonly title: string
  readonly description?: string
  readonly actions?: ReactNode
}

// Consistent page title block. `actions` renders inline to the right (for
// example an inert "New run" button).
export const PageHeader = ({ title, description, actions }: PageHeaderProps) => (
  <HStack justify="space-between" align="start" gap="4">
    <Stack gap="1">
      <Heading textStyle="semibold-xl" color="text.1">
        {title}
      </Heading>
      {description ? (
        <Text textStyle="regular-sm" color="text.3">
          {description}
        </Text>
      ) : null}
    </Stack>
    {actions ? <Box flexShrink="0">{actions}</Box> : null}
  </HStack>
)
