import { defineConfig } from 'vite'
import { reactRouter } from '@react-router/dev/vite'
import checker from 'vite-plugin-checker'
import { resolve } from 'node:path'

const ENV_PREFIX = 'REACT_APP_'
const DEFAULT_ADMIN_PORT = 5173
const DEFAULT_GRAPHQL_PORT = 19323
const MAX_TCP_PORT = 65_535

function parsePort(raw: string | undefined, fallback: number): number {
  if (!raw) return fallback
  const port = Number.parseInt(raw, 10)
  if (!Number.isInteger(port) || port <= 0 || port > MAX_TCP_PORT) return fallback
  return port
}

const adminPort = parsePort(process.env.REVO_ADMIN_PORT, DEFAULT_ADMIN_PORT)
const graphqlPort = parsePort(process.env.REVO_DEV_GRAPHQL_PORT, DEFAULT_GRAPHQL_PORT)
const graphqlTarget = process.env.REVO_ADMIN_GRAPHQL_TARGET ?? `http://127.0.0.1:${graphqlPort}`

export default defineConfig({
  plugins: [
    reactRouter(),
    checker({
      typescript: true,
    }),
  ],

  resolve: {
    alias: {
      src: resolve(import.meta.dirname, 'src'),
    },
  },

  envPrefix: ENV_PREFIX,

  server: {
    host: '127.0.0.1',
    port: adminPort,
    proxy: {
      '/graphql': {
        target: graphqlTarget,
        changeOrigin: true,
        ws: true,
      },
    },
  },
})
