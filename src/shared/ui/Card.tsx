import { Box } from '@chakra-ui/react'
import type { BoxProps } from '@chakra-ui/react'

// Neutral surface container used across dashboard, boards, and detail panels.
export const Card = (props: BoxProps) => (
  <Box bg="neutral.0" borderWidth="1px" borderColor="neutral.200" borderRadius="lg" p="5" {...props} />
)
