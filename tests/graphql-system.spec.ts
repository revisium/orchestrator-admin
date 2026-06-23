import { afterEach, describe, expect, it, vi } from 'vitest'
import type { Client, Sink } from 'graphql-ws'
import { GraphqlService, GraphqlSubscriptionService, resolveGraphqlHttpUrl, resolveGraphqlWsUrl } from 'src/shared/api'

const GRAPHQL_ENDPOINT = 'http://admin.test/graphql'
const HTTP_ORIGIN = 'http://127.0.0.1:5173/runs'
const HTTPS_ORIGIN = 'https://admin.revisium.test/runs'

const HEALTH_RAW = {
  issues: [],
  ok: true,
  status: {
    daemon: {
      baseUrl: 'http://127.0.0.1:19323',
      healthy: true,
      httpPort: 19322,
      pgPort: 15540,
      pid: 4242,
      running: true,
    },
    project: {
      branch: 'master',
      dataDir: 'revo-admin-test-data',
      org: 'revisium',
      project: 'orchestrator-admin',
    },
  },
}

const DOCTOR_RESPONSE = {
  data: {
    doctor: HEALTH_RAW,
  },
}

afterEach(() => {
  vi.restoreAllMocks()
  delete process.env.REVO_ADMIN_GRAPHQL_HTTP_URL
  delete process.env.REVO_ADMIN_GRAPHQL_ENDPOINT
  delete process.env.REVO_ADMIN_GRAPHQL_WS_URL
})

describe('GraphQL endpoints', () => {
  it('resolves same-origin HTTP and WS URLs from a request origin', () => {
    expect(resolveGraphqlHttpUrl(HTTP_ORIGIN)).toBe('http://127.0.0.1:5173/graphql')
    expect(resolveGraphqlWsUrl(HTTP_ORIGIN)).toBe('ws://127.0.0.1:5173/graphql')
    expect(resolveGraphqlWsUrl(HTTPS_ORIGIN)).toBe('wss://admin.revisium.test/graphql')
  })

  it('uses explicit GraphQL environment overrides', () => {
    process.env.REVO_ADMIN_GRAPHQL_HTTP_URL = GRAPHQL_ENDPOINT
    process.env.REVO_ADMIN_GRAPHQL_WS_URL = 'ws://admin.test/graphql'

    expect(resolveGraphqlHttpUrl(HTTP_ORIGIN)).toBe(GRAPHQL_ENDPOINT)
    expect(resolveGraphqlWsUrl(HTTP_ORIGIN)).toBe('ws://admin.test/graphql')
  })
})

describe('GraphqlService', () => {
  it('loads generated GraphQL SDK operations through the shared HTTP client', async () => {
    const fetchMock = vi.fn(async (_input: RequestInfo | URL, init?: RequestInit) => {
      expect(String(init?.body)).toContain('query SystemDoctor')

      return new Response(JSON.stringify(DOCTOR_RESPONSE), {
        headers: { 'content-type': 'application/json' },
      })
    })

    const graphql = new GraphqlService({ endpoint: GRAPHQL_ENDPOINT, fetch: fetchMock })

    await expect(graphql.client.SystemDoctor()).resolves.toEqual({ doctor: HEALTH_RAW })
    expect(fetchMock).toHaveBeenCalledWith(GRAPHQL_ENDPOINT, expect.objectContaining({ method: 'POST' }))
  })
})

describe('GraphqlSubscriptionService', () => {
  it('unwraps graphql-ws execution result data for subscribers', () => {
    const unsubscribe = vi.fn()
    const subscribe = vi.fn((_payload: { query: string; variables: Record<string, unknown> }, sink: Sink) => {
      sink.next?.({ data: { ok: true } })

      return unsubscribe
    })
    const service = new GraphqlSubscriptionService({ client: { subscribe } as unknown as Client })
    const next = vi.fn()

    const dispose = service.subscribe('subscription { ping }', { runId: 'run_1' }, { next })

    expect(subscribe).toHaveBeenCalledWith(
      { query: 'subscription { ping }', variables: { runId: 'run_1' } },
      expect.objectContaining({ next: expect.any(Function) }),
    )
    expect(next).toHaveBeenCalledWith({ ok: true })

    dispose()
    expect(unsubscribe).toHaveBeenCalledOnce()
  })
})
