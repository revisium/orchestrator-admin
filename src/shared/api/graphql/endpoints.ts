const GRAPHQL_PATH = '/graphql'
const DEFAULT_GRAPHQL_ORIGIN = 'http://127.0.0.1:19323'
const HTTP_PROTOCOL = 'http:'
const HTTPS_PROTOCOL = 'https:'
const WS_PROTOCOL = 'ws:'
const WSS_PROTOCOL = 'wss:'

const processEnv = (key: string): string | undefined => {
  if (typeof process === 'undefined') {
    return undefined
  }

  return process.env[key]
}

const browserLocation = (): Location | undefined => {
  if (globalThis.window === undefined) {
    return undefined
  }

  return globalThis.window.location
}

const withGraphqlPath = (origin: string): string => new URL(GRAPHQL_PATH, origin).toString()

export const resolveGraphqlHttpUrl = (origin?: string): string => {
  const explicit = processEnv('REVO_ADMIN_GRAPHQL_HTTP_URL') ?? processEnv('REVO_ADMIN_GRAPHQL_ENDPOINT')
  if (explicit) {
    return explicit
  }

  if (origin) {
    return withGraphqlPath(origin)
  }

  if (browserLocation()) {
    return GRAPHQL_PATH
  }

  return withGraphqlPath(DEFAULT_GRAPHQL_ORIGIN)
}

export const resolveGraphqlWsUrl = (origin?: string): string => {
  const explicit = processEnv('REVO_ADMIN_GRAPHQL_WS_URL')
  if (explicit) {
    return explicit
  }

  const location = browserLocation()
  const source = origin ?? (location ? location.origin : DEFAULT_GRAPHQL_ORIGIN)
  const url = new URL(GRAPHQL_PATH, source)

  if (url.protocol === HTTP_PROTOCOL) {
    url.protocol = WS_PROTOCOL
  } else if (url.protocol === HTTPS_PROTOCOL) {
    url.protocol = WSS_PROTOCOL
  }

  return url.toString()
}

export { GRAPHQL_PATH }
