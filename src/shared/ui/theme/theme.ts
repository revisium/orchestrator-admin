import { createSystem, defaultConfig, defineConfig } from '@chakra-ui/react'
import { globalCss } from './globalCss'
import { textStyles } from './textStyles'

const config = defineConfig({
  globalCss,
  theme: {
    textStyles,
    tokens: {
      colors: {
        brand: {
          50: { value: '#eef1fc' },
          100: { value: '#dce3f9' },
          500: { value: '#2944af' },
          600: { value: '#6a80db' },
        },
        neutral: {
          0: { value: '#ffffff' },
          100: { value: '#f3f6fc' },
          200: { value: '#e6ebf5' },
          300: { value: '#cbd2e0' },
          800: { value: '#1f2638' },
          900: { value: '#121723' },
        },
        text: {
          1: { value: '#1f2638' },
          2: { value: '#323a4d' },
          3: { value: '#6b758a' },
          4: { value: '#9aa4b8' },
        },
        surface: {
          inverse3: { value: '#323a4d' },
        },
      },
      fonts: {
        heading: { value: 'Inter, sans-serif' },
        body: { value: 'Inter, sans-serif' },
      },
    },
    breakpoints: {
      base: '0px',
      sm: '360px',
      md: '480px',
      lg: '768px',
      xl: '1200px',
    },
  },
})

export const system = createSystem(defaultConfig, config)
