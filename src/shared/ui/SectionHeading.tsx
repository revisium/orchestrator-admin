import { Heading } from '@chakra-ui/react'

interface SectionHeadingProps {
  readonly children: string
}

export const SectionHeading = ({ children }: SectionHeadingProps) => (
  <Heading textStyle="semibold-md" color="text.1">
    {children}
  </Heading>
)
