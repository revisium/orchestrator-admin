import { Badge, Text, Wrap, WrapItem } from '@chakra-ui/react'

interface TagListProps {
  readonly items: ReadonlyArray<string>
  readonly emptyLabel?: string
}

// Wrapping list of monospace-ish neutral chips for string arrays such as
// repos[], allowed_tools[], triggers[].
export const TagList = ({ items, emptyLabel = '—' }: TagListProps) => {
  if (items.length === 0) {
    return (
      <Text textStyle="regular-sm" color="text.4">
        {emptyLabel}
      </Text>
    )
  }

  return (
    <Wrap gap="2">
      {items.map((item) => (
        <WrapItem key={item}>
          <Badge
            textStyle="regular-xs"
            px="2"
            py="0.5"
            borderRadius="md"
            borderWidth="1px"
            color="text.2"
            bg="neutral.100"
            borderColor="neutral.200"
          >
            {item}
          </Badge>
        </WrapItem>
      ))}
    </Wrap>
  )
}
