import { Center } from '@chakra-ui/react'

// Small initials avatar (.avatar). `label` is precomputed by the caller (so the
// app code stays free of slice-length literals); `system` renders the muted
// system variant.
export const AvatarInitials = ({ label, system = false }: { readonly label: string; readonly system?: boolean }) => (
  <Center
    boxSize="22px"
    borderRadius="full"
    flexShrink="0"
    textStyle="semibold-micro"
    textTransform="lowercase"
    color={system ? 'fg.2' : 'brand.on'}
    bg={system ? 'bg.inset' : undefined}
    bgGradient={system ? undefined : 'to-br'}
    gradientFrom={system ? undefined : 'brand.500'}
    gradientTo={system ? undefined : 'brand.press'}
    borderWidth={system ? '1px' : '0'}
    borderColor={system ? 'border' : undefined}
  >
    {label}
  </Center>
)
