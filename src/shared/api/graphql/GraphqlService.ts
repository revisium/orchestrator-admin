import { GraphQLClient, type RequestDocument, type Variables } from 'graphql-request'
import { getSdk, type Sdk } from 'src/__generated__/graphql-request'
import { container } from 'src/shared/lib'
import { resolveGraphqlHttpUrl } from './endpoints'

interface GraphqlServiceOptions {
  readonly endpoint?: string
  readonly fetch?: (input: URL | RequestInfo, init?: RequestInit) => Promise<Response>
  readonly origin?: string
  readonly headers?: Record<string, string>
}

export class GraphqlService {
  private readonly graphQLClient: GraphQLClient
  public readonly client: Sdk

  public constructor(options: GraphqlServiceOptions = {}) {
    this.graphQLClient = new GraphQLClient(options.endpoint ?? resolveGraphqlHttpUrl(options.origin), {
      credentials: 'include',
      fetch: options.fetch,
      headers: options.headers,
    })
    this.client = getSdk(this.graphQLClient)
  }

  public request<TData>(document: RequestDocument, variables?: Variables): Promise<TData> {
    return this.graphQLClient.request<TData>(document, variables)
  }

  public setHeaders(headers: Record<string, string>): void {
    this.graphQLClient.setHeaders(headers)
  }
}

container.register(GraphqlService, () => new GraphqlService(), { scope: 'singleton' })
