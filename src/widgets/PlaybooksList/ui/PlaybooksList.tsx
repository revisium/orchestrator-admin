import { Box, Stack, Table } from '@chakra-ui/react'
import type { PlaybookRow } from 'src/shared/fixtures'

interface PlaybooksListProps {
  readonly playbooks: ReadonlyArray<PlaybookRow>
}

export const PlaybooksList = ({ playbooks }: PlaybooksListProps) => (
  <Stack gap="3">
    <Box overflowX="auto">
      <Table.Root size="sm" variant="outline" minW="560px">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader>Name</Table.ColumnHeader>
            <Table.ColumnHeader>Package</Table.ColumnHeader>
            <Table.ColumnHeader>Source</Table.ColumnHeader>
            <Table.ColumnHeader>Version</Table.ColumnHeader>
            <Table.ColumnHeader>Schema</Table.ColumnHeader>
            <Table.ColumnHeader>Installed</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {playbooks.map((playbook) => (
            <Table.Row key={playbook.id}>
              <Table.Cell>{playbook.name}</Table.Cell>
              <Table.Cell>{playbook.packageName}</Table.Cell>
              <Table.Cell>{playbook.source}</Table.Cell>
              <Table.Cell>{playbook.version}</Table.Cell>
              <Table.Cell>{playbook.schemaVersion}</Table.Cell>
              <Table.Cell>{playbook.installedAt}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Box>
  </Stack>
)
