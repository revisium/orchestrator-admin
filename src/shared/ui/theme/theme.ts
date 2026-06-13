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
        // Status palette for run/step/inbox states. Each status reads a `fg`
        // (text/icon), `bg` (chip background), and `border` token so StatusBadge
        // and DAG nodes stay token-driven and forced-light consistent.
        status: {
          running: { fg: { value: '#1e40af' }, bg: { value: '#e0e9ff' }, border: { value: '#9db4f5' } },
          success: { fg: { value: '#166534' }, bg: { value: '#dcfce7' }, border: { value: '#86d3a3' } },
          failed: { fg: { value: '#991b1b' }, bg: { value: '#fee2e2' }, border: { value: '#f0a3a3' } },
          waiting: { fg: { value: '#9a5b09' }, bg: { value: '#fef0d9' }, border: { value: '#f1c277' } },
          neutral: { fg: { value: '#475569' }, bg: { value: '#eef1f6' }, border: { value: '#cbd2e0' } },
          muted: { fg: { value: '#6b758a' }, bg: { value: '#f1f3f8' }, border: { value: '#dbe1ec' } },
        },
        // Accents for non-status taxonomies (gate kinds, role surfaces).
        accent: {
          gate: { fg: { value: '#6d28d9' }, bg: { value: '#f1e9fe' }, border: { value: '#c9aef5' } },
          role: { fg: { value: '#0e7490' }, bg: { value: '#e0f4f8' }, border: { value: '#94d4e2' } },
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
