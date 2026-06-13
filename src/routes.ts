import { type RouteConfig, index, layout, route } from '@react-router/dev/routes'

export default [
  layout('routes/AppLayout.tsx', [
    index('routes/Home.tsx'),
    route('/runs', 'routes/RunsBoard.tsx'),
    route('/runs/new', 'routes/RunCreate.tsx'),
    route('/runs/graph-smoke', 'routes/RunGraphSmoke.tsx'),
    route('/runs/:runId', 'routes/RunDetail.tsx'),
    route('/inbox', 'routes/Inbox.tsx'),
    route('/inbox/:itemId', 'routes/InboxItem.tsx'),
    route('/method/roles', 'routes/MethodRoles.tsx'),
    route('/method/roles/:roleId', 'routes/MethodRoleDetail.tsx'),
    route('/method/pipelines', 'routes/MethodPipelines.tsx'),
    route('/method/pipelines/:id', 'routes/MethodPipelineDetail.tsx'),
    route('/method/playbooks', 'routes/MethodPlaybooks.tsx'),
  ]),
] satisfies RouteConfig
