import { useParams } from 'react-router'
import { ProjectMemoryTablePage } from 'src/pages/project-detail'

export default function ProjectMemoryTable() {
  const { projectId, tableId } = useParams()

  return <ProjectMemoryTablePage projectId={projectId ?? ''} tableId={tableId ?? ''} />
}
