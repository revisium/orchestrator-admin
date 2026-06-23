import { print, type DocumentNode } from 'graphql'
import { createClient, type Client, type ClientOptions } from 'graphql-ws'
import { container } from 'src/shared/lib'
import { resolveGraphqlWsUrl } from './endpoints'

interface GraphqlSubscriptionServiceOptions {
  readonly client?: Client
  readonly origin?: string
  readonly url?: string
  readonly connectionParams?: ClientOptions['connectionParams']
}

export interface GraphqlSubscriptionSink<TData> {
  readonly next: (data: TData | null | undefined) => void
  readonly error?: (error: unknown) => void
  readonly complete?: () => void
}

export class GraphqlSubscriptionService {
  private readonly client: Client

  public constructor(options: GraphqlSubscriptionServiceOptions = {}) {
    this.client =
      options.client ??
      createClient({
        url: options.url ?? resolveGraphqlWsUrl(options.origin),
        connectionParams: options.connectionParams,
      })
  }

  public subscribe<TData, TVariables extends Record<string, unknown> = Record<string, unknown>>(
    document: DocumentNode | string,
    variables: TVariables,
    sink: GraphqlSubscriptionSink<TData>,
  ): () => void {
    const query = typeof document === 'string' ? document : print(document)

    return this.client.subscribe<TData>(
      {
        query,
        variables,
      },
      {
        next: (result) => sink.next(result.data),
        error: (error) => sink.error?.(error),
        complete: () => sink.complete?.(),
      },
    )
  }
}

container.register(GraphqlSubscriptionService, () => new GraphqlSubscriptionService(), { scope: 'singleton' })
