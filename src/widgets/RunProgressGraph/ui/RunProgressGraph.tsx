import { Box, Center, Spinner } from '@chakra-ui/react'
import { lazy, Suspense } from 'react'
import { useHydrated } from 'src/shared/lib'

const GRAPH_HEIGHT = 320

const RunProgressGraphClient = lazy(() => import('./RunProgressGraph.client'))

const Placeholder = () => (
  <Center h="full" w="full">
    <Spinner color="brand.500" />
  </Center>
)

export const RunProgressGraph = () => {
  const isHydrated = useHydrated()

  return (
    <Box h={`${GRAPH_HEIGHT}px`} w="full" borderWidth="1px" borderColor="neutral.200" borderRadius="md" bg="neutral.0">
      {isHydrated ? (
        <Suspense fallback={<Placeholder />}>
          <RunProgressGraphClient />
        </Suspense>
      ) : (
        <Placeholder />
      )}
    </Box>
  )
}
