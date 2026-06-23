import { HStack, Link as ChakraLink, Span, Text } from '@chakra-ui/react'
import { Link } from 'react-router'
import { PIPELINES, PLAYBOOKS, ROLES } from 'src/shared/fixtures'

type MethodTab = 'pipelines' | 'roles' | 'playbooks'

interface MethodTabsProps {
  readonly active: MethodTab
}

const TABS: ReadonlyArray<{
  readonly id: MethodTab
  readonly label: string
  readonly to: string
  readonly count: number
}> = [
  { id: 'pipelines', label: 'Pipelines', to: '/method/pipelines', count: PIPELINES.length },
  { id: 'roles', label: 'Roles', to: '/method/roles', count: ROLES.length },
  { id: 'playbooks', label: 'Playbooks', to: '/method/playbooks', count: PLAYBOOKS.length },
]

export const MethodTabs = ({ active }: MethodTabsProps) => (
  <HStack
    as="nav"
    gap="0"
    overflowX="auto"
    borderBottomWidth="1px"
    borderColor="border"
    css={{ scrollbarWidth: 'none' }}
  >
    {TABS.map((tab) => {
      const selected = tab.id === active

      return (
        <ChakraLink
          key={tab.id}
          asChild
          h="46px"
          px="4"
          display="inline-flex"
          alignItems="center"
          gap="2"
          flexShrink="0"
          borderBottomWidth="2px"
          borderColor={selected ? 'brand.500' : 'transparent'}
          color={selected ? 'fg.0' : 'fg.2'}
          textStyle={selected ? 'semibold-sm' : 'medium-sm'}
          _hover={{ color: 'fg.0', textDecoration: 'none' }}
        >
          <Link to={tab.to} aria-current={selected ? 'page' : undefined}>
            <Text as="span">{tab.label}</Text>
            <Span
              className="mono tnum"
              minW="5"
              h="5"
              px="1.5"
              display="inline-flex"
              alignItems="center"
              justifyContent="center"
              borderRadius="pill"
              bg="bg.inset"
              color="fg.3"
              textStyle="medium-xs"
            >
              {tab.count}
            </Span>
          </Link>
        </ChakraLink>
      )
    })}
  </HStack>
)
