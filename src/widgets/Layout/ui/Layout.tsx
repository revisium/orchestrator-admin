import { Box, Flex, HStack, Link as ChakraLink, Text } from '@chakra-ui/react'
import { Link, Outlet } from 'react-router'

// Only routes that exist render as real links. Not-yet-built destinations stay
// visible (so the intended IA is legible) but render as disabled, non-link text
// with a hover title — clicking can no longer hit the ErrorBoundary 404.
interface NavItem {
  readonly label: string
  readonly to: string
  readonly disabled?: boolean
}

const NAV_ITEMS: ReadonlyArray<NavItem> = [
  { label: 'Dashboard', to: '/' },
  { label: 'Graph smoke', to: '/runs/graph-smoke' },
  { label: 'Runs', to: '/runs', disabled: true },
  { label: 'Inbox', to: '/inbox', disabled: true },
  { label: 'Method', to: '/method', disabled: true },
]

export const Layout = () => (
  <Flex direction="column" minH="100dvh" bg="neutral.100">
    <Box as="header" borderBottomWidth="1px" borderColor="neutral.200" bg="neutral.0">
      <HStack as="nav" gap="6" px="6" h="14" align="center">
        {NAV_ITEMS.map((item) =>
          item.disabled ? (
            <Text
              key={item.to}
              textStyle="medium-sm"
              color="text.3"
              cursor="not-allowed"
              aria-disabled="true"
              title="Not available yet"
            >
              {item.label}
            </Text>
          ) : (
            <ChakraLink key={item.to} asChild textStyle="medium-sm" color="text.2">
              <Link to={item.to}>{item.label}</Link>
            </ChakraLink>
          ),
        )}
      </HStack>
    </Box>
    <Box as="main" flex="1" p="6">
      <Outlet />
    </Box>
  </Flex>
)
