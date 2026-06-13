import { Background, BackgroundVariant, Controls, Handle, Position, ReactFlow, ReactFlowProvider } from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import type { Edge, Node, NodeProps, NodeTypes } from '@xyflow/react'
import { gatePalette, neutralPalette, edgeColor } from 'src/shared/ui'

const ROW_Y = 60
const COL_GAP = 190
const COL_0 = 20

interface RouteNodeData {
  readonly label: string
  readonly kind: 'role' | 'gate'
  [key: string]: unknown
}

const RouteNode = ({ data }: NodeProps<Node<RouteNodeData>>) => {
  const palette = data.kind === 'gate' ? gatePalette() : neutralPalette()
  return (
    <div
      style={{
        padding: '8px 14px',
        borderRadius: data.kind === 'gate' ? 9999 : 8,
        border: `1px solid ${palette.border}`,
        background: palette.bg,
        color: palette.fg,
        fontSize: 13,
        fontWeight: 600,
        fontFamily: 'Inter, sans-serif',
        whiteSpace: 'nowrap',
      }}
    >
      <Handle type="target" position={Position.Left} style={{ opacity: 0 }} />
      {data.label}
      <Handle type="source" position={Position.Right} style={{ opacity: 0 }} />
    </div>
  )
}

const nodeTypes: NodeTypes = { route: RouteNode }

const sequence: ReadonlyArray<RouteNodeData> = [
  { label: 'architect', kind: 'role' },
  { label: 'plan_gate', kind: 'gate' },
  { label: 'developer', kind: 'role' },
  { label: 'reviewer', kind: 'role' },
  { label: 'merge_gate', kind: 'gate' },
  { label: 'integrator', kind: 'role' },
]

const initialNodes: Node<RouteNodeData>[] = sequence.map((data, index) => ({
  id: data.label,
  type: 'route',
  position: { x: COL_0 + index * COL_GAP, y: ROW_Y },
  data,
}))

const initialEdges: Edge[] = sequence.slice(1).map((data, index) => ({
  id: `${sequence[index].label}-${data.label}`,
  source: sequence[index].label,
  target: data.label,
  style: { stroke: edgeColor },
}))

const RoutePreviewFlow = () => (
  <ReactFlow
    defaultNodes={initialNodes}
    defaultEdges={initialEdges}
    nodeTypes={nodeTypes}
    fitView
    fitViewOptions={{ padding: 0.2 }}
    proOptions={{ hideAttribution: true }}
    nodesDraggable={false}
  >
    <Background variant={BackgroundVariant.Dots} gap={20} size={1} color="#e2e8f0" />
    <Controls showInteractive={false} />
  </ReactFlow>
)

const RoutePreviewGraphClient = () => (
  <ReactFlowProvider>
    <RoutePreviewFlow />
  </ReactFlowProvider>
)

export default RoutePreviewGraphClient
