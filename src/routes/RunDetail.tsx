import { useParams } from 'react-router'
import { RunDetailPage } from 'src/pages/run-detail'

export default function RunDetail() {
  const { runId } = useParams()
  return <RunDetailPage runId={runId ?? ''} />
}
