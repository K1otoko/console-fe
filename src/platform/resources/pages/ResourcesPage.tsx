import { Empty } from 'antd'
import { PageShell } from '../../../shared/components/PageShell'

export function ResourcesPage() {
  return (
    <PageShell
      eyebrow="基础设施"
      title="资源平台"
      description="计算资源、存储资源与配额"
    >
      <Empty description="资源平台待接入基础设施服务后实现" />
    </PageShell>
  )
}
