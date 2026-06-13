import { Box, Flex, HStack, Link as ChakraLink } from '@chakra-ui/react'
import { Link, Outlet } from 'react-router'

const NAV_ITEMS: ReadonlyArray<{ label: string; to: string }> = [
  { label: 'Dashboard', to: '/' },
  { label: 'Runs', to: '/runs' },
  { label: 'Inbox', to: '/inbox' },
  { label: 'Method', to: '/method' },
]

export const Layout = () => (
  <Flex direction="column" minH="100dvh" bg="neutral.100">
    <Box as="header" borderBottomWidth="1px" borderColor="neutral.200" bg="neutral.0">
      <HStack as="nav" gap="6" px="6" h="14" align="center">
        {NAV_ITEMS.map((item) => (
          <ChakraLink key={item.to} asChild textStyle="medium-sm" color="text.2">
            <Link to={item.to}>{item.label}</Link>
          </ChakraLink>
        ))}
      </HStack>
    </Box>
    <Box as="main" flex="1" p="6">
      <Outlet />
    </Box>
  </Flex>
)
