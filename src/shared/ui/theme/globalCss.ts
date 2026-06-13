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
  '*': {
    outline: 'none !important',
  },
  '*:focus': {
    outline: 'none !important',
    boxShadow: 'none !important',
  },
  '*:focus-visible': {
    outline: 'none !important',
    boxShadow: 'none !important',
  },
}
