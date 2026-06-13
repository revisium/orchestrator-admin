import { useParams } from 'react-router'
import { InboxItemPage } from 'src/pages/inbox-item'

export default function InboxItem() {
  const { itemId } = useParams()
  return <InboxItemPage itemId={itemId ?? ''} />
}
