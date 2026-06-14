import { Box, Button, Center, chakra, Flex, HStack, Link as ChakraLink, Span, Stack, Text } from '@chakra-ui/react'
import { ChevronLeft, ChevronRight, Folder, Inbox, LayoutDashboard, List, Scan, type LucideIcon } from 'lucide-react'
import { useState } from 'react'
import { Link, Outlet, useLocation } from 'react-router'
import { BrandLogo } from 'src/shared/ui'
import { HOST_STATUS, INBOX_ITEMS } from 'src/shared/fixtures'

interface NavItem {
  readonly label: string
  readonly to: string
  // Prefix used to mark the active section (e.g. /method matches /method/roles).
  readonly match: string
  readonly icon: LucideIcon
  readonly badge?: number
  // Sections whose pages do not exist yet render disabled (no navigation).
  readonly disabled?: boolean
}

const PENDING_INBOX = INBOX_ITEMS.filter((item) => item.status === 'pending').length

const NAV_ITEMS: ReadonlyArray<NavItem> = [
  { label: 'Dashboard', to: '/', match: '/', icon: LayoutDashboard },
  { label: 'Runs', to: '/runs', match: '/runs', icon: List },
  { label: 'Inbox', to: '/inbox', match: '/inbox', icon: Inbox, badge: PENDING_INBOX },
  { label: 'Projects', to: '/projects', match: '/projects', icon: Folder, disabled: true },
  { label: 'Method', to: '/method/roles', match: '/method', icon: Scan },
]

const isActive = (pathname: string, match: string): boolean =>
  match === '/' ? pathname === '/' : pathname === match || pathname.startsWith(`${match}/`)

const SIDEBAR_W = '232px'
const SIDEBAR_W_COLLAPSED = '64px'

const BrandHeader = ({ collapsed, onToggle }: { readonly collapsed: boolean; readonly onToggle: () => void }) => {
  const ToggleIcon = collapsed ? ChevronRight : ChevronLeft
  const toggleLabel = collapsed ? 'Expand sidebar' : 'Collapse sidebar'
  const toggle = (
    <chakra.button
      type="button"
      display="grid"
      placeItems="center"
      boxSize="26px"
      borderRadius="6px"
      color="fg.2"
      cursor="pointer"
      _hover={{ bg: 'blackAlpha.50', color: 'fg.0' }}
      onClick={onToggle}
      title={toggleLabel}
      aria-label={toggleLabel}
    >
      <ToggleIcon size={16} />
    </chakra.button>
  )

  if (collapsed) {
    return (
      <Stack align="center" gap="2" px="2" pt="4" pb="3">
        <ChakraLink asChild _hover={{ textDecoration: 'none' }}>
          <Link to="/">
            <BrandLogo />
          </Link>
        </ChakraLink>
        {toggle}
      </Stack>
    )
  }

  return (
    <HStack justify="space-between" px="3.5" pt="4" pb="3">
      <HStack as={Link} gap="2.5" {...{ to: '/' }} _hover={{ textDecoration: 'none' }}>
        <BrandLogo />
        <Text fontSize="17px" fontWeight="640" letterSpacing="-0.02em" color="fg.0">
          revo
        </Text>
      </HStack>
      {toggle}
    </HStack>
  )
}

const navRowColor = (item: NavItem, active: boolean): string => {
  if (item.disabled) return 'fg.3'
  return active ? 'brand.ink' : 'fg.1'
}

const NavRowInner = ({
  item,
  active,
  collapsed,
}: {
  readonly item: NavItem
  readonly active: boolean
  readonly collapsed: boolean
}) => {
  const Icon = item.icon
  return (
    <>
      <Box display="inline-flex" color={active ? 'brand.500' : 'inherit'} position="relative">
        <Icon size={18} />
        {collapsed && item.badge ? (
          <Box position="absolute" top="-2px" right="-2px" boxSize="7px" borderRadius="full" bg="brand.500" />
        ) : null}
      </Box>
      {collapsed ? null : (
        <>
          <Span flex="1">{item.label}</Span>
          {item.badge ? (
            <Center
              minW="19px"
              h="19px"
              px="1.5"
              borderRadius="pill"
              bg="brand.500"
              color="white"
              textStyle="semibold-micro"
            >
              {item.badge}
            </Center>
          ) : null}
        </>
      )}
    </>
  )
}

const NavRow = ({
  item,
  active,
  collapsed,
}: {
  readonly item: NavItem
  readonly active: boolean
  readonly collapsed: boolean
}) => {
  const content = <NavRowInner item={item} active={active} collapsed={collapsed} />

  const shared = {
    h: '34px',
    px: collapsed ? '0' : '2.5',
    borderRadius: '7px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: collapsed ? 'center' : 'flex-start',
    gap: '2.5',
    textStyle: active ? 'semibold-body' : 'medium-body',
    color: navRowColor(item, active),
  } as const

  if (item.disabled) {
    return (
      <Box {...shared} cursor="not-allowed" title={`${item.label} · coming soon`} aria-disabled="true">
        {content}
      </Box>
    )
  }

  return (
    <ChakraLink
      asChild
      {...shared}
      bg={active ? 'brand.soft' : 'transparent'}
      _hover={active ? { textDecoration: 'none' } : { textDecoration: 'none', bg: 'blackAlpha.50', color: 'fg.0' }}
    >
      <Link to={item.to} title={collapsed ? item.label : undefined}>
        {content}
      </Link>
    </ChakraLink>
  )
}

const NavRail = ({ pathname, collapsed }: { readonly pathname: string; readonly collapsed: boolean }) => (
  <Stack as="nav" gap="0.5" px={collapsed ? '2.5' : '3'} py="2">
    {NAV_ITEMS.map((item) => (
      <NavRow key={item.to} item={item} active={isActive(pathname, item.match)} collapsed={collapsed} />
    ))}
  </Stack>
)

// Host status pill at the sidebar foot (.host-pill): green beacon + daemon line.
const HostPill = ({ collapsed }: { readonly collapsed: boolean }) => {
  const dot = (
    <Box boxSize="2" borderRadius="full" bg="dot.success" flexShrink="0" boxShadow="0 0 0 3px rgba(106,154,46,.16)" />
  )

  if (collapsed) {
    return (
      <Center
        mt="auto"
        mx="3"
        mb="3"
        p="2.5"
        borderRadius="9px"
        bg="bg.1"
        borderWidth="1px"
        borderColor="border"
        title="local · connected"
      >
        {dot}
      </Center>
    )
  }

  return (
    <HStack
      mt="auto"
      mx="3"
      mb="3"
      p="2.5"
      gap="2.5"
      borderRadius="9px"
      bg="bg.1"
      borderWidth="1px"
      borderColor="border"
    >
      {dot}
      <Stack gap="0" minW="0">
        <Text textStyle="medium-xs" color="fg.1">
          local · connected
        </Text>
        <Text className="mono" textStyle="regular-micro" color="fg.3" truncate>
          daemon up · {HOST_STATUS.uptime}
        </Text>
      </Stack>
    </HStack>
  )
}

const Sidebar = ({
  pathname,
  collapsed,
  onToggle,
}: {
  readonly pathname: string
  readonly collapsed: boolean
  readonly onToggle: () => void
}) => (
  <Flex
    as="aside"
    direction="column"
    w={collapsed ? SIDEBAR_W_COLLAPSED : SIDEBAR_W}
    flexShrink="0"
    bg="bg.sidebar"
    borderRightWidth="1px"
    borderColor="border"
    transition="width 150ms cubic-bezier(.2,0,0,1)"
  >
    <BrandHeader collapsed={collapsed} onToggle={onToggle} />
    <NavRail pathname={pathname} collapsed={collapsed} />
    <HostPill collapsed={collapsed} />
  </Flex>
)

// ⌘K affordance — a non-functional visual search trigger (prototype).
const CommandAffordance = () => (
  <HStack
    h="34px"
    px="2.5"
    gap="2"
    minW="168px"
    borderWidth="1px"
    borderColor="border.strong"
    bg="bg.1"
    borderRadius="btn"
    color="fg.2"
    textStyle="regular-sm"
  >
    <Span flex="1">Search</Span>
    <Center
      className="mono"
      px="1.5"
      py="0.5"
      borderRadius="5px"
      bg="bg.inset"
      borderWidth="1px"
      borderColor="border"
      textStyle="regular-micro"
    >
      ⌘K
    </Center>
  </HStack>
)

const TopBar = () => (
  <Flex
    as="header"
    h="56px"
    flexShrink="0"
    align="center"
    justify="space-between"
    pl="6"
    pr="7"
    borderBottomWidth="1px"
    borderColor="border"
    bg="bg.1"
    position="sticky"
    top="0"
    zIndex="20"
  >
    <HStack gap="1.5" textStyle="regular-body" color="fg.2">
      <ChakraLink asChild color="fg.2" _hover={{ color: 'fg.0', textDecoration: 'none' }}>
        <Link to="/">revo</Link>
      </ChakraLink>
      <Span color="fg.3">/</Span>
      <Text color="fg.0" fontWeight="560">
        Control plane
      </Text>
    </HStack>
    <HStack gap="3">
      <CommandAffordance />
      <Button
        asChild
        size="sm"
        h="34px"
        px="3.5"
        bg="brand.500"
        color="brand.on"
        borderRadius="btn"
        _hover={{ bg: 'brand.hover' }}
      >
        <Link to="/runs/new">+ New run</Link>
      </Button>
      <Box w="1px" h="26px" bg="border" />
      <Center
        boxSize="30px"
        borderRadius="full"
        bgGradient="to-br"
        gradientFrom="brand.500"
        gradientTo="brand.press"
        color="brand.on"
        textStyle="semibold-sm"
      >
        ka
      </Center>
    </HStack>
  </Flex>
)

export const Layout = () => {
  const { pathname } = useLocation()
  const [collapsed, setCollapsed] = useState(false)

  return (
    <Flex h="100dvh" overflow="hidden" bg="bg.0">
      <Sidebar pathname={pathname} collapsed={collapsed} onToggle={() => setCollapsed((v) => !v)} />
      <Flex direction="column" flex="1" minW="0">
        <TopBar />
        <Box flex="1" overflowY="auto" overflowX="hidden">
          <Box maxW="1180px" mx="auto" px="10" pt="7" pb="24">
            <Outlet />
          </Box>
        </Box>
      </Flex>
    </Flex>
  )
}
