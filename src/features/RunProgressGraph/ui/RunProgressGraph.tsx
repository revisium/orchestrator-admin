import { lazy, Suspense } from 'react'
import { Box, HStack, Span, Text } from '@chakra-ui/react'
import { GraphFrame, GraphPlaceholder } from 'src/shared/ui'
import { useHydrated } from 'src/shared/lib'

const GRAPH_HEIGHT = 240
const GRAPH_CONTENT_W = '1244px'

const RunProgressGraphClient = lazy(() => import('./RunProgressGraph.client'))

const LegendDot = ({ color }: { readonly color: string }) => <Box boxSize="2" borderRadius="full" bg={color} />

const RunProgressLegend = () => (
  <HStack
    gap="5"
    px="4"
    py="3"
    borderTopWidth="1px"
    borderColor="border"
    color="fg.2"
    textStyle="regular-xs"
    wrap="wrap"
  >
    <HStack gap="2">
      <LegendDot color="dot.running" />
      <Text>running</Text>
    </HStack>
    <HStack gap="2">
      <LegendDot color="dot.success" />
      <Text>succeeded</Text>
    </HStack>
    <HStack gap="2">
      <LegendDot color="dot.waiting" />
      <Text>awaiting you</Text>
    </HStack>
    <HStack gap="2">
      <LegendDot color="dot.failed" />
      <Text>failed</Text>
    </HStack>
    <HStack gap="2">
      <LegendDot color="dot.neutral" />
      <Text>pending</Text>
    </HStack>
    <HStack gap="2">
      <Span
        display="inline-grid"
        placeItems="center"
        boxSize="22px"
        borderRadius="7px"
        bg="accent.gate.bg"
        color="accent.gate.fg"
        borderWidth="1px"
        borderColor="accent.gate.border"
      >
        ⛩
      </Span>
      <Text>human gate</Text>
    </HStack>
    <HStack gap="2">
      <Box w="28px" borderTopWidth="2px" borderColor="accent.role.fg" borderStyle="dashed" />
      <Text>review loop</Text>
    </HStack>
  </HStack>
)

export const RunProgressGraph = () => {
  const isHydrated = useHydrated()

  return (
    <>
      <GraphFrame height={GRAPH_HEIGHT} contentWidth={GRAPH_CONTENT_W} framed={false}>
        {isHydrated ? (
          <Suspense fallback={<GraphPlaceholder />}>
            <RunProgressGraphClient />
          </Suspense>
        ) : (
          <GraphPlaceholder />
        )}
      </GraphFrame>
      <RunProgressLegend />
    </>
  )
}
