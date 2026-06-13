import { Background, BackgroundVariant, Controls, ReactFlow, ReactFlowProvider } from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import type { Edge, Node } from '@xyflow/react'

const NODE_X = 80
const ROW_ONE_Y = 40
const ROW_TWO_Y = 160
const NODE_X_RIGHT = 320

const initialNodes: Node[] = [
  { id: 'intake', position: { x: NODE_X, y: ROW_ONE_Y }, data: { label: 'Intake' } },
  { id: 'develop', position: { x: NODE_X_RIGHT, y: ROW_ONE_Y }, data: { label: 'Develop' } },
  { id: 'review', position: { x: NODE_X_RIGHT, y: ROW_TWO_Y }, data: { label: 'Review' } },
]

const initialEdges: Edge[] = [
  { id: 'intake-develop', source: 'intake', target: 'develop' },
  { id: 'develop-review', source: 'develop', target: 'review' },
]

const RunProgressGraphFlow = () => (
  <ReactFlow
    defaultNodes={initialNodes}
    defaultEdges={initialEdges}
    fitView
    fitViewOptions={{ padding: 0.2 }}
    proOptions={{ hideAttribution: true }}
  >
    <Background variant={BackgroundVariant.Dots} gap={20} size={1} color="#e2e8f0" />
    <Controls showInteractive={false} />
  </ReactFlow>
)

const RunProgressGraphClient = () => (
  <ReactFlowProvider>
    <RunProgressGraphFlow />
  </ReactFlowProvider>
)

export default RunProgressGraphClient
