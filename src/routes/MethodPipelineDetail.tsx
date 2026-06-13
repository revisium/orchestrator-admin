import { useParams } from 'react-router'
import { MethodPipelineDetailPage } from 'src/pages/method-pipeline-detail'

export default function MethodPipelineDetail() {
  const { id } = useParams()
  return <MethodPipelineDetailPage pipelineId={id ?? ''} />
}
