import { Background, BackgroundVariant, Controls, Handle, Position, ReactFlow, ReactFlowProvider } from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import type { Edge, Node, NodeProps, NodeTypes } from '@xyflow/react'
import { edgeColor, gatePalette, paletteForStatus } from 'src/shared/ui'
import { RUN_STEPS } from 'src/shared/fixtures'

const ROW_Y = 80
const COL_GAP = 200
const COL_0 = 20
const LOOP_OFFSET = 70

interface StepNodeData {
  readonly label: string
  readonly status: string
  readonly kind: 'role' | 'gate'
  [key: string]: unknown
}

const StepFlowNode = ({ data }: NodeProps<Node<StepNodeData>>) => {
  const palette = data.kind === 'gate' ? gatePalette() : paletteForStatus(data.status)
  return (
    <div
      style={{
        padding: '10px 16px',
        borderRadius: data.kind === 'gate' ? 9999 : 8,
        border: `1px solid ${palette.border}`,
        background: palette.bg,
        color: palette.fg,
        fontFamily: 'Inter, sans-serif',
        minWidth: 120,
        textAlign: 'center',
      }}
    >
      <Handle type="target" position={Position.Left} style={{ opacity: 0 }} />
      <div style={{ fontSize: 13, fontWeight: 600 }}>{data.label}</div>
      <div style={{ fontSize: 11, textTransform: 'capitalize' }}>{data.status.replace(/_/g, ' ')}</div>
      <Handle type="source" position={Position.Right} style={{ opacity: 0 }} />
    </div>
  )
}

const nodeTypes: NodeTypes = { step: StepFlowNode }

const initialNodes: Node<StepNodeData>[] = RUN_STEPS.map((step, index) => ({
  id: step.id,
  type: 'step',
  position: { x: COL_0 + index * COL_GAP, y: ROW_Y },
  data: { label: step.label, status: step.status, kind: step.kind },
}))

const sequentialEdges: Edge[] = RUN_STEPS.slice(1).map((step, index) => ({
  id: `${RUN_STEPS[index].id}-${step.id}`,
  source: RUN_STEPS[index].id,
  target: step.id,
  style: { stroke: edgeColor },
}))

// Rework loop: reviewer can route back to developer.
const loopEdge: Edge = {
  id: 'reviewer-developer-loop',
  source: 'reviewer',
  target: 'developer',
  label: 'rework',
  type: 'smoothstep',
  animated: true,
  sourceHandle: null,
  targetHandle: null,
  style: { stroke: edgeColor, strokeDasharray: '4 4' },
  labelStyle: { fontSize: 11, fill: '#6b758a' },
  pathOptions: { offset: LOOP_OFFSET },
} as Edge

const initialEdges: Edge[] = [...sequentialEdges, loopEdge]

const RunProgressFlow = () => (
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

const RunProgressGraphClient = () => (
  <ReactFlowProvider>
    <RunProgressFlow />
  </ReactFlowProvider>
)

export default RunProgressGraphClient
