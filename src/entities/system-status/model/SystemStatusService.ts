import type { SystemDoctorQuery, SystemStatusQuery } from 'src/__generated__/graphql-request'
import { GraphqlService } from 'src/shared/api'
import { container } from 'src/shared/lib'

export class SystemStatusService {
  public constructor(private readonly graphqlService: GraphqlService = container.get(GraphqlService)) {}

  public async loadStatus(): Promise<SystemStatusQuery['status']> {
    const data = await this.graphqlService.client.SystemStatus()

    return data.status
  }

  public async loadProject(): Promise<SystemDoctorQuery['doctor']['status']['project']> {
    const data = await this.graphqlService.client.Project()

    return data.project
  }

  public async loadDoctor(): Promise<SystemDoctorQuery['doctor']> {
    const data = await this.graphqlService.client.SystemDoctor()

    return data.doctor
  }
}

container.register(SystemStatusService, () => new SystemStatusService(), { scope: 'singleton' })
