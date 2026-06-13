import { Box, Flex, HStack, Link as ChakraLink, Text } from '@chakra-ui/react'
import { Link, Outlet, useLocation } from 'react-router'

interface NavItem {
  readonly label: string
  readonly to: string
  // Prefix used to mark the active section (e.g. /method matches /method/roles).
  readonly match: string
}

const NAV_ITEMS: ReadonlyArray<NavItem> = [
  { label: 'Dashboard', to: '/', match: '/' },
  { label: 'Runs', to: '/runs', match: '/runs' },
  { label: 'Inbox', to: '/inbox', match: '/inbox' },
  { label: 'Method', to: '/method/roles', match: '/method' },
]

const isActive = (pathname: string, match: string): boolean =>
  match === '/' ? pathname === '/' : pathname === match || pathname.startsWith(`${match}/`)

export const Layout = () => {
  const { pathname } = useLocation()

  return (
    <Flex direction="column" minH="100dvh" bg="neutral.100">
      <Box as="header" borderBottomWidth="1px" borderColor="neutral.200" bg="neutral.0">
        <HStack as="nav" gap="6" px="6" h="14" align="center">
          <Text textStyle="semibold-sm" color="brand.500" mr="2">
            Orchestrator
          </Text>
          {NAV_ITEMS.map((item) => {
            const active = isActive(pathname, item.match)
            return (
              <ChakraLink
                key={item.to}
                asChild
                textStyle="medium-sm"
                color={active ? 'text.1' : 'text.3'}
                borderBottomWidth="2px"
                borderColor={active ? 'brand.500' : 'transparent'}
                h="14"
                display="flex"
                alignItems="center"
                _hover={{ color: 'text.1' }}
              >
                <Link to={item.to}>{item.label}</Link>
              </ChakraLink>
            )
          })}
        </HStack>
      </Box>
      <Box as="main" flex="1" p="6">
        <Outlet />
      </Box>
    </Flex>
  )
}
