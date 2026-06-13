import { Badge } from '@chakra-ui/react'

type AccentKind = 'gate' | 'role'

interface AccentBadgeProps {
  readonly kind: AccentKind
  readonly children: string
}

// Non-status taxonomy chip (gate kinds, role surfaces) reading `accent.*`
// theme tokens, kept visually distinct from StatusBadge.
export const AccentBadge = ({ kind, children }: AccentBadgeProps) => (
  <Badge
    textStyle="medium-xs"
    textTransform="capitalize"
    px="2"
    py="0.5"
    borderRadius="md"
    borderWidth="1px"
    color={`accent.${kind}.fg`}
    bg={`accent.${kind}.bg`}
    borderColor={`accent.${kind}.border`}
  >
    {children}
  </Badge>
)
