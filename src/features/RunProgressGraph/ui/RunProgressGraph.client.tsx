import { Background, BackgroundVariant, Handle, Position, ReactFlow, ReactFlowProvider } from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import type { Edge, EdgeProps, EdgeTypes, Node, NodeProps, NodeTypes } from '@xyflow/react'
import { DoorOpen, Eye, Hammer, Layers, type LucideIcon } from 'lucide-react'
import {
  checkColor,
  checkInk,
  currentBorder,
  currentRing,
  dotColor,
  dotgridColor,
  edgeActiveColor,
  edgeColor,
  edgeLoopColor,
  gatePalette,
  labelForStatus,
  NODE_FONT_SIZE,
  nodeBorder,
  nodeInk,
  nodeShadow,
  nodeSurface,
  paletteForStatus,
  rolePalette,
} from 'src/shared/ui'
import { RUN_STEPS } from 'src/shared/fixtures'

const DAG_PAD_X = 46
const DAG_SLOT = 196
const DAG_NODE_W = 172
const DAG_GATE_W = 150
const DAG_NODE_H = 78
const DAG_NODE_Y = 44
const LOOP_DIP = 64

const loopStartX = DAG_PAD_X + 3 * DAG_SLOT + DAG_NODE_W / 2 - 18
const loopEndX = DAG_PAD_X + 2 * DAG_SLOT + DAG_NODE_W / 2 + 18
const loopStartY = DAG_NODE_Y + DAG_NODE_H
const loopDipY = loopStartY + LOOP_DIP
const loopEndY = loopStartY + 6

interface StepNodeData {
  readonly stepId: string
  readonly label: string
  readonly status: string
  readonly kind: 'role' | 'gate'
  readonly current: boolean
  readonly meta: string
  [key: string]: unknown
}

const metaForStep = (stepId: string): string => {
  if (stepId === 'architect' || stepId === 'reviewer') return 'deep'
  if (stepId === 'developer' || stepId === 'integrator') return 'standard'
  return 'human gate'
}

const iconForStep = (stepId: string, kind: 'role' | 'gate'): LucideIcon => {
  if (kind === 'gate') return DoorOpen
  if (stepId === 'developer' || stepId === 'integrator') return Hammer
  if (stepId === 'reviewer') return Eye
  return Layers
}

const shadowForNode = (current: boolean, awaiting: boolean): string => {
  if (awaiting) return `0 0 0 3px rgba(212,154,35,.16), ${nodeShadow}`
  if (current) return `0 0 0 3px ${currentRing}, ${nodeShadow}`
  return nodeShadow
}

const borderForNode = (current: boolean, awaiting: boolean, waitingBorder: string, restBorder: string): string => {
  if (current) return currentBorder
  if (awaiting) return waitingBorder
  return restBorder
}

// Prototype DAG node (.design/dag.jsx + screens.css .dnode): raised warm card,
// teal role-token icon, per-status tone dot, status caption. Gate nodes read
// the warm gate accent. The running step gets a brand ring (is-current).
const StepFlowNode = ({ data }: NodeProps<Node<StepNodeData>>) => {
  const isGate = data.kind === 'gate'
  const gate = gatePalette()
  const accent = isGate ? gate : rolePalette()
  const status = paletteForStatus(data.status)
  const done = data.status === 'succeeded' || data.status === 'completed'
  const awaiting = data.status === 'awaiting_approval'
  const restBorder = isGate ? gate.border : nodeBorder
  const cardBorder = borderForNode(data.current, awaiting, status.border, restBorder)
  const cardShadow = shadowForNode(data.current, awaiting)
  const StepIcon = iconForStep(data.stepId, data.kind)

  return (
    <div
      style={{
        position: 'relative',
        boxSizing: 'border-box',
        padding: '10px 12px',
        borderRadius: 11,
        border: `1px solid ${cardBorder}`,
        background: isGate ? gate.bg : nodeSurface,
        color: nodeInk,
        fontFamily: 'Inter, sans-serif',
        width: isGate ? DAG_GATE_W : DAG_NODE_W,
        height: DAG_NODE_H,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        gap: 7,
        boxShadow: cardShadow,
      }}
    >
      <Handle type="target" position={Position.Left} style={{ opacity: 0 }} />
      {awaiting ? (
        <span
          style={{
            position: 'absolute',
            top: -10,
            right: 10,
            padding: '1px 7px',
            borderRadius: 999,
            border: `1px solid ${status.border}`,
            background: status.bg,
            color: status.fg,
            fontSize: 10,
            fontWeight: 650,
            lineHeight: 1.3,
          }}
        >
          awaiting you
        </span>
      ) : null}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span
          style={{
            position: 'relative',
            width: 26,
            height: 26,
            borderRadius: 7,
            display: 'grid',
            placeItems: 'center',
            color: accent.fg,
            background: accent.bg,
            border: `1px solid ${accent.border}`,
            fontSize: NODE_FONT_SIZE.meta,
            fontWeight: 600,
          }}
        >
          <StepIcon size={15} strokeWidth={1.9} />
          {done ? (
            <span
              style={{
                position: 'absolute',
                right: -5,
                bottom: -5,
                width: 14,
                height: 14,
                borderRadius: '50%',
                background: checkColor,
                color: checkInk,
                display: 'grid',
                placeItems: 'center',
                fontSize: 9,
                border: `1.5px solid ${nodeSurface}`,
              }}
            >
              ✓
            </span>
          ) : null}
        </span>
        <span style={{ fontSize: 13.5, fontWeight: 600, flex: 1, letterSpacing: '-.01em' }}>{data.label}</span>
        <span style={{ width: 8, height: 8, borderRadius: '50%', flex: 'none', background: dotColor(data.status) }} />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        {isGate ? (
          <span
            style={{
              fontSize: 10.5,
              fontWeight: 600,
              color: gate.fg,
              letterSpacing: '.05em',
              textTransform: 'uppercase',
            }}
          >
            human gate
          </span>
        ) : (
          <span
            style={{
              padding: '1px 6px',
              borderRadius: 4,
              border: `1px solid ${nodeBorder}`,
              background: '#eeeae1',
              color: '#81786f',
              fontSize: 10.5,
              fontFamily: 'JetBrains Mono, monospace',
            }}
          >
            {data.meta}
          </span>
        )}
        <span style={{ fontSize: 11, color: status.fg, textTransform: 'capitalize', marginLeft: 'auto' }}>
          {labelForStatus(data.status)}
        </span>
      </div>
      <Handle type="source" position={Position.Right} style={{ opacity: 0 }} />
    </div>
  )
}

const nodeTypes: NodeTypes = { step: StepFlowNode }

const ArrowMarker = ({ id, color, width }: { readonly id: string; readonly color: string; readonly width: number }) => (
  <marker id={id} markerWidth="9" markerHeight="9" refX="6.5" refY="4.5" orient="auto">
    <path
      d="M1.5 1.5 L7 4.5 L1.5 7.5"
      fill="none"
      stroke={color}
      strokeWidth={width}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </marker>
)

const FlowEdge = ({ id, sourceX, sourceY, targetX, targetY, data }: EdgeProps<Edge>) => {
  const active = Boolean(data?.active)
  const color = active ? edgeActiveColor : edgeColor
  const strokeWidth = active ? 1.75 : 1.4
  const markerId = active ? `dag-arrow-active-${id}` : `dag-arrow-${id}`
  const midX = (sourceX + targetX) / 2
  const path = `M ${sourceX} ${sourceY} C ${midX} ${sourceY}, ${midX} ${targetY}, ${targetX - 6} ${targetY}`

  return (
    <g>
      <defs>
        <ArrowMarker id={markerId} color={color} width={active ? 1.5 : 1.4} />
      </defs>
      <path
        d={path}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        markerEnd={`url(#${markerId})`}
      />
    </g>
  )
}

const LoopEdge = ({ id, label }: EdgeProps<Edge>) => {
  const markerId = `dag-arrow-loop-${id}`
  const labelX = (loopStartX + loopEndX) / 2
  const labelY = loopDipY + 2
  const path = `M ${loopStartX} ${loopStartY} C ${loopStartX} ${loopDipY}, ${loopEndX} ${loopDipY}, ${loopEndX} ${loopEndY}`

  return (
    <g>
      <defs>
        <marker id={markerId} markerWidth="9" markerHeight="9" refX="6" refY="4.5" orient="auto">
          <path
            d="M1.5 1.5 L7 4.5 L1.5 7.5"
            fill="none"
            stroke={edgeLoopColor}
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </marker>
      </defs>
      <path
        d={path}
        fill="none"
        stroke={edgeLoopColor}
        strokeWidth="1.5"
        strokeDasharray="5 4"
        strokeLinecap="round"
        markerEnd={`url(#${markerId})`}
        opacity="0.85"
      />
      <foreignObject x={labelX - 80} y={labelY - 12} width="160" height="26">
        <div
          style={{
            boxSizing: 'border-box',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 5,
            width: 'max-content',
            minWidth: 0,
            padding: '3px 9px',
            borderRadius: 999,
            border: `1px solid ${rolePalette().border}`,
            background: nodeSurface,
            color: edgeLoopColor,
            fontSize: 11,
            fontWeight: 560,
            whiteSpace: 'nowrap',
            fontFamily: 'Inter, sans-serif',
          }}
        >
          <span>↩</span>
          <span>{label}</span>
        </div>
      </foreignObject>
    </g>
  )
}

const edgeTypes: EdgeTypes = { flow: FlowEdge, loop: LoopEdge }

const initialNodes: Node<StepNodeData>[] = RUN_STEPS.map((step, index) => {
  const width = step.kind === 'gate' ? DAG_GATE_W : DAG_NODE_W
  const slotCenter = DAG_PAD_X + index * DAG_SLOT + DAG_NODE_W / 2

  return {
    id: step.id,
    type: 'step',
    position: { x: slotCenter - width / 2, y: DAG_NODE_Y },
    data: {
      stepId: step.id,
      label: step.label,
      status: step.status,
      kind: step.kind,
      current: step.status === 'running',
      meta: metaForStep(step.id),
    },
  }
})

const sequentialEdges: Edge[] = RUN_STEPS.slice(1).map((step, index) => {
  const prev = RUN_STEPS[index]
  const active = prev.status === 'succeeded' || prev.status === 'running'
  return {
    id: `${prev.id}-${step.id}`,
    source: prev.id,
    target: step.id,
    type: 'flow',
    data: { active },
  }
})

// Rework loop: reviewer can route back to developer (teal dashed arc).
const loopEdge: Edge = {
  id: 'reviewer-developer-loop',
  source: 'reviewer',
  target: 'developer',
  label: 're-route on changes',
  type: 'loop',
}

const initialEdges: Edge[] = [...sequentialEdges, loopEdge]

const RunProgressFlow = () => (
  <ReactFlow
    defaultNodes={initialNodes}
    defaultEdges={initialEdges}
    nodeTypes={nodeTypes}
    edgeTypes={edgeTypes}
    defaultViewport={{ x: 0, y: 0, zoom: 1 }}
    proOptions={{ hideAttribution: true }}
    nodesDraggable={false}
    panOnDrag={false}
    zoomOnScroll={false}
    zoomOnPinch={false}
    zoomOnDoubleClick={false}
    preventScrolling={false}
  >
    <Background variant={BackgroundVariant.Dots} gap={18} size={1} color={dotgridColor} />
  </ReactFlow>
)

const RunProgressGraphClient = () => (
  <ReactFlowProvider>
    <RunProgressFlow />
  </ReactFlowProvider>
)

export default RunProgressGraphClient
