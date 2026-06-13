import { SystemConfig } from '@chakra-ui/react'

export const globalCss: SystemConfig['globalCss'] = {
  'html, body, #root': {
    width: '100%',
    minHeight: '100dvh',
    fontFamily: 'Inter, sans-serif',
    overscrollBehavior: 'none',
  },
  body: {
    paddingBottom: 'env(safe-area-inset-bottom)',
    paddingLeft: 'env(safe-area-inset-left)',
    paddingRight: 'env(safe-area-inset-right)',
  },
  // Accessible, theme-driven keyboard focus. Pointer focus (mouse/touch) stays
  // quiet via :focus-visible; keyboard users get a visible ring from a token.
  '*:focus:not(:focus-visible)': {
    outline: 'none',
  },
  '*:focus-visible': {
    outline: '2px solid',
    outlineColor: 'brand.500',
    outlineOffset: '2px',
    borderRadius: '2px',
  },
}
