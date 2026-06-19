import { useParams } from 'react-router'
import { ProjectDetailPage } from 'src/pages/project-detail'

export default function ProjectDetail() {
  const { projectId, tab } = useParams()

  return <ProjectDetailPage projectId={projectId ?? ''} tab={tab} />
}
