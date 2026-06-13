import fsd from '@feature-sliced/steiger-plugin'
import { defineConfig } from 'steiger'

export default defineConfig([
  ...fsd.configs.recommended,
  { files: ['./src/pages/**', './src/widgets/**', './src/features/**'], rules: { 'fsd/insignificant-slice': 'off' } },
])
