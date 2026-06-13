import { Background, BackgroundVariant, Controls, Handle, Position, ReactFlow, ReactFlowProvider } from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import type { Edge, Node, NodeProps, NodeTypes } from '@xyflow/react'
import { edgeColor, gatePalette, neutralPalette } from 'src/shared/ui'
import { playbookRouteRoles } from 'src/shared/fixtures'

const ROW_Y = 80
const COL_GAP = 180
const COL_0 = 20

interface PipelineNodeData {
  readonly label: string
  readonly kind: 'role' | 'gate'
  readonly optional: boolean
  readonly alternative: string | null
  [key: string]: unknown
}

const PipelineNode = ({ data }: NodeProps<Node<PipelineNodeData>>) => {
  const palette = data.kind === 'gate' ? gatePalette() : neutralPalette()
  return (
    <div
      style={{
        padding: '8px 14px',
        borderRadius: data.kind === 'gate' ? 9999 : 8,
        border: `${data.optional ? '1px dashed' : '1px solid'} ${palette.border}`,
        background: palette.bg,
        color: palette.fg,
        fontFamily: 'Inter, sans-serif',
        textAlign: 'center',
        minWidth: 110,
      }}
    >
      <Handle type="target" position={Position.Left} style={{ opacity: 0 }} />
      <div style={{ fontSize: 13, fontWeight: 600 }}>{data.label}</div>
      {data.optional ? <div style={{ fontSize: 10 }}>optional</div> : null}
      {data.alternative ? <div style={{ fontSize: 10, fontStyle: 'italic' }}>alt: {data.alternative}</div> : null}
      <Handle type="source" position={Position.Right} style={{ opacity: 0 }} />
    </div>
  )
}

const nodeTypes: NodeTypes = { pipeline: PipelineNode }

const ALTERNATIVES: Record<string, string> = {
  developer: 'developer-frontend',
  reviewer: 'reviewer-docs',
}

const OPTIONAL: ReadonlySet<string> = new Set(['ci-poller'])

const initialNodes: Node<PipelineNodeData>[] = playbookRouteRoles.map((entry, index) => ({
  id: entry.id,
  type: 'pipeline',
  position: { x: COL_0 + index * COL_GAP, y: ROW_Y },
  data: {
    label: entry.label,
    kind: entry.kind,
    optional: OPTIONAL.has(entry.id),
    alternative: ALTERNATIVES[entry.id] ?? null,
  },
}))

const initialEdges: Edge[] = playbookRouteRoles.slice(1).map((entry, index) => ({
  id: `${playbookRouteRoles[index].id}-${entry.id}`,
  source: playbookRouteRoles[index].id,
  target: entry.id,
  style: { stroke: edgeColor },
}))

const PipelineFlow = () => (
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

const PipelineGraphClient = () => (
  <ReactFlowProvider>
    <PipelineFlow />
  </ReactFlowProvider>
)

export default PipelineGraphClient
