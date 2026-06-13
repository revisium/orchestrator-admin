import { type RouteConfig, index, layout, route } from '@react-router/dev/routes'

export default [
  layout('routes/AppLayout.tsx', [index('routes/Home.tsx'), route('/runs/graph-smoke', 'routes/RunGraphSmoke.tsx')]),
] satisfies RouteConfig
