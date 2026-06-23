import { useParams } from 'react-router'
import { ProjectKnowledgeArticlePage } from 'src/pages/project-detail'

export default function ProjectKnowledgeArticle() {
  const { projectId, articleId } = useParams()

  return <ProjectKnowledgeArticlePage projectId={projectId ?? ''} articleId={articleId ?? ''} />
}
