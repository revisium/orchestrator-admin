import { Badge } from '@chakra-ui/react'
import { labelForStatus, type StatusTone, toneForStatus } from './statusTone'

interface StatusBadgeProps {
  readonly status: string
  readonly tone?: StatusTone
}

// Token-driven status chip. Colors come exclusively from `status.*` theme
// tokens so run/step/inbox states render consistently in forced light.
export const StatusBadge = ({ status, tone }: StatusBadgeProps) => {
  const resolved = tone ?? toneForStatus(status)

  return (
    <Badge
      textStyle="medium-xs"
      textTransform="capitalize"
      px="2"
      py="0.5"
      borderRadius="full"
      borderWidth="1px"
      color={`status.${resolved}.fg`}
      bg={`status.${resolved}.bg`}
      borderColor={`status.${resolved}.border`}
    >
      {labelForStatus(status)}
    </Badge>
  )
}
