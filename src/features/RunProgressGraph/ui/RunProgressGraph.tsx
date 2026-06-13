import { lazy, Suspense } from 'react'
import { GraphFrame, GraphPlaceholder } from 'src/shared/ui'
import { useHydrated } from 'src/shared/lib'

const GRAPH_HEIGHT = 320

const RunProgressGraphClient = lazy(() => import('./RunProgressGraph.client'))

export const RunProgressGraph = () => {
  const isHydrated = useHydrated()

  return (
    <GraphFrame height={GRAPH_HEIGHT}>
      {isHydrated ? (
        <Suspense fallback={<GraphPlaceholder />}>
          <RunProgressGraphClient />
        </Suspense>
      ) : (
        <GraphPlaceholder />
      )}
    </GraphFrame>
  )
}
