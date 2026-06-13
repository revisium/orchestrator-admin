import { useParams } from 'react-router'
import { MethodRoleDetailPage } from 'src/pages/method-role-detail'

export default function MethodRoleDetail() {
  const { roleId } = useParams()
  return <MethodRoleDetailPage roleId={roleId ?? ''} />
}
