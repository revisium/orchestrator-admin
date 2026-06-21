#!/usr/bin/env node

import { spawn } from 'node:child_process'
import { existsSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const ACTION_ARG_INDEX = 2

const config = {
  revoCli: process.env.REVO_CLI ?? resolve(repoRoot, '../agent-orchestrator/bin/revo.js'),
  dataDir: resolve(repoRoot, process.env.REVO_DEV_DATA_DIR ?? '.revo/dev'),
  controlPort: process.env.REVO_DEV_PORT ?? '19322',
  graphqlPort: process.env.REVO_DEV_GRAPHQL_PORT ?? '19323',
  pgPort: process.env.REVO_DEV_PG_PORT ?? '15540',
  adminPort: process.env.REVO_ADMIN_PORT ?? '5173',
}

const revoEnv = {
  ...process.env,
  REVO_DATA_DIR: config.dataDir,
  REVO_PORT: config.controlPort,
  REVO_PG_PORT: config.pgPort,
  REVO_GRAPHQL_PORT: config.graphqlPort,
  REVO_ADMIN_GRAPHQL_TARGET: process.env.REVO_ADMIN_GRAPHQL_TARGET ?? `http://127.0.0.1:${config.graphqlPort}`,
}

function commandForRevo(args) {
  if (existsSync(config.revoCli) && config.revoCli.endsWith('.js')) {
    return { command: process.execPath, args: [config.revoCli, ...args] }
  }

  return { command: config.revoCli, args }
}

function commandForPnpm(args) {
  return { command: 'pnpm', args }
}

function run(command, args, options = {}) {
  return new Promise((resolveRun, rejectRun) => {
    const child = spawn(command, args, {
      cwd: repoRoot,
      env: options.env ?? process.env,
      stdio: options.stdio ?? 'inherit',
    })

    child.once('error', rejectRun)
    child.once('exit', (code, signal) => {
      if (code === 0) {
        resolveRun()
        return
      }

      const reason = signal ?? `exit ${code}`
      rejectRun(new Error(`${command} ${args.join(' ')} failed with ${reason}`))
    })
  })
}

function spawnLong(name, command, args, options = {}) {
  const child = spawn(command, args, {
    cwd: repoRoot,
    env: options.env ?? process.env,
    stdio: 'inherit',
  })

  child.once('exit', (code, signal) => {
    if (code && code !== 0) {
      const reason = signal ?? `exit ${code}`
      console.error(`${name} exited with ${reason}`)
    }
  })

  return child
}

async function runRevo(args) {
  const { command, args: commandArgs } = commandForRevo(args)
  await run(command, commandArgs, { env: revoEnv })
}

function spawnRevo(args) {
  const { command, args: commandArgs } = commandForRevo(args)
  return spawnLong('revo', command, commandArgs, { env: revoEnv })
}

async function startBackend() {
  await runRevo([
    'revisium',
    'start',
    '--port',
    config.controlPort,
    '--pg-port',
    config.pgPort,
    '--data',
    config.dataDir,
  ])
  await runRevo(['bootstrap', '--commit'])
}

async function stopBackend() {
  await runRevo(['revisium', 'stop'])
}

async function statusBackend() {
  await runRevo(['revisium', 'status'])
}

async function logsBackend() {
  await runRevo(['revisium', 'logs', '--lines', process.env.REVO_DEV_LOG_LINES ?? '80'])
}

async function serveGraphql() {
  await runRevo(['serve', '--port', config.graphqlPort])
}

async function devFull() {
  await startBackend()

  const graphql = spawnRevo(['serve', '--port', config.graphqlPort])
  const adminCommand = commandForPnpm(['exec', 'react-router', 'dev', '--port', config.adminPort])
  const admin = spawnLong('react-router', adminCommand.command, adminCommand.args, { env: revoEnv })

  let shuttingDown = false
  const shutdown = async () => {
    if (shuttingDown) return
    shuttingDown = true
    admin.kill('SIGTERM')
    graphql.kill('SIGTERM')
    if (process.env.REVO_DEV_KEEP_BACKEND !== '1') {
      await stopBackend().catch((error) => {
        console.error(error instanceof Error ? error.message : String(error))
      })
    }
  }

  const shutdownAfterChildExit = (name) => {
    if (shuttingDown) return
    console.error(`${name} exited; shutting down dev stack`)
    shutdown()
      .then(() => process.exit(1))
      .catch((error) => {
        console.error(error instanceof Error ? error.message : String(error))
        process.exit(1)
      })
  }

  graphql.once('exit', () => shutdownAfterChildExit('GraphQL host'))
  admin.once('exit', () => shutdownAfterChildExit('React Router dev server'))

  process.once('SIGINT', () => {
    shutdown()
      .then(() => process.exit(0))
      .catch((error) => {
        console.error(error instanceof Error ? error.message : String(error))
        process.exit(1)
      })
  })
  process.once('SIGTERM', () => {
    shutdown()
      .then(() => process.exit(0))
      .catch((error) => {
        console.error(error instanceof Error ? error.message : String(error))
        process.exit(1)
      })
  })
}

const action = process.argv[ACTION_ARG_INDEX]

try {
  if (action === 'start') await startBackend()
  else if (action === 'serve') await serveGraphql()
  else if (action === 'stop') await stopBackend()
  else if (action === 'status') await statusBackend()
  else if (action === 'logs') await logsBackend()
  else if (action === 'dev') await devFull()
  else {
    console.error('Usage: node scripts/revo-dev.mjs <start|serve|stop|status|logs|dev>')
    process.exitCode = 1
  }
} catch (error) {
  console.error(error instanceof Error ? error.message : String(error))
  process.exitCode = 1
}
