import { Empty } from 'antd'
import { PageShell } from '../../../shared/components/PageShell'

export function DeploymentsPage() {
  return (
    <PageShell
      eyebrow="基础设施"
      title="部署平台"
      description="发布记录、环境与回滚"
    >
      <Empty description="部署平台待接入 deployments 服务后实现" />
    </PageShell>
  )
}
