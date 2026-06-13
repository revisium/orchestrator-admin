import { lazy, Suspense } from 'react'
import { GraphFrame, GraphPlaceholder } from 'src/shared/ui'
import { useHydrated } from 'src/shared/lib'

const GRAPH_HEIGHT = 240

const RoutePreviewGraphClient = lazy(() => import('./RoutePreviewGraph.client'))

export const RoutePreviewGraph = () => {
  const isHydrated = useHydrated()

  return (
    <GraphFrame height={GRAPH_HEIGHT}>
      {isHydrated ? (
        <Suspense fallback={<GraphPlaceholder />}>
          <RoutePreviewGraphClient />
        </Suspense>
      ) : (
        <GraphPlaceholder />
      )}
    </GraphFrame>
  )
}
