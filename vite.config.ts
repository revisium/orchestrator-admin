import { defineConfig } from 'vite'
import { reactRouter } from '@react-router/dev/vite'
import checker from 'vite-plugin-checker'
import { resolve } from 'node:path'

const ENV_PREFIX = 'REACT_APP_'

export default defineConfig({
  plugins: [
    reactRouter(),
    checker({
      typescript: true,
    }),
  ],

  resolve: {
    alias: {
      src: resolve(__dirname, 'src'),
    },
  },

  envPrefix: ENV_PREFIX,
})
