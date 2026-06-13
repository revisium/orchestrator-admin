import { Box, HStack, Text } from '@chakra-ui/react'
import type { ReactNode } from 'react'

interface FieldRowProps {
  readonly label: string
  readonly children: ReactNode
}

// Label/value pair for detail panels. Label is fixed-width so stacked rows
// align into a definition-list grid without a real <dl>.
export const FieldRow = ({ label, children }: FieldRowProps) => (
  <HStack align="start" gap="4" py="1.5">
    <Text textStyle="medium-sm" color="text.3" minW="40" flexShrink="0">
      {label}
    </Text>
    <Box flex="1" minW="0">
      {typeof children === 'string' ? (
        <Text textStyle="regular-sm" color="text.1">
          {children}
        </Text>
      ) : (
        children
      )}
    </Box>
  </HStack>
)
