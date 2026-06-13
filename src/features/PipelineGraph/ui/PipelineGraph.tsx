import { lazy, Suspense } from 'react'
import { GraphFrame, GraphPlaceholder } from 'src/shared/ui'
import { useHydrated } from 'src/shared/lib'

const GRAPH_HEIGHT = 280

const PipelineGraphClient = lazy(() => import('./PipelineGraph.client'))

export const PipelineGraph = () => {
  const isHydrated = useHydrated()

  return (
    <GraphFrame height={GRAPH_HEIGHT}>
      {isHydrated ? (
        <Suspense fallback={<GraphPlaceholder />}>
          <PipelineGraphClient />
        </Suspense>
      ) : (
        <GraphPlaceholder />
      )}
    </GraphFrame>
  )
}
