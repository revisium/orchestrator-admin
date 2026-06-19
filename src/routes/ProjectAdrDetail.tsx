import { useParams } from 'react-router'
import { ProjectAdrDetailPage } from 'src/pages/project-detail'

export default function ProjectAdrDetail() {
  const { projectId, adrId } = useParams()

  return <ProjectAdrDetailPage projectId={projectId ?? ''} adrId={adrId ?? ''} />
}
