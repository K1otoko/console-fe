import { Empty } from 'antd'
import { useParams } from 'react-router-dom'
import { PageShell } from '../shared/components/PageShell'

export function BusinessAppPlaceholder() {
  const { appKey } = useParams<{ appKey: string }>()

  return (
    <PageShell
      eyebrow="工作台"
      title={appKey ?? '应用管理'}
      description="该应用自己的管理模块"
    >
      <Empty description="业务管理模块待开发" />
    </PageShell>
  )
}
