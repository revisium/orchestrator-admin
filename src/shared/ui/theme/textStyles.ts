import { defineTextStyles } from '@chakra-ui/react'

const SIZES: Record<string, { fontSize: string; lineHeight: string }> = {
  xs: { fontSize: '13px', lineHeight: '16px' },
  sm: { fontSize: '15px', lineHeight: '20px' },
  md: { fontSize: '17px', lineHeight: '24px' },
  lg: { fontSize: '20px', lineHeight: '28px' },
  xl: { fontSize: '24px', lineHeight: '32px' },
  xxl: { fontSize: '28px', lineHeight: '36px' },
  h2: { fontSize: '36px', lineHeight: '48px' },
  dp: { fontSize: '60px', lineHeight: '68px' },
}

const WEIGHTS: Record<string, string> = {
  regular: '400',
  medium: '500',
  semibold: '600',
}

const entries = Object.entries(WEIGHTS).flatMap(([weight, fontWeight]) =>
  Object.entries(SIZES).map(([size, { fontSize, lineHeight }]) => [
    `${weight}-${size}`,
    { value: { fontSize, lineHeight, fontWeight } },
  ]),
)

export const textStyles = defineTextStyles(Object.fromEntries(entries))
