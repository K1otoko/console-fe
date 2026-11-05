import { Empty } from 'antd'
import { PageShell } from '../../../shared/components/PageShell'

export function UsersPage() {
  return (
    <PageShell
      eyebrow="系统设置"
      title="用户中心"
      description="账号、角色分配与会话"
    >
      <Empty description="用户中心待接入认证中心用户 API 后实现" />
    </PageShell>
  )
}
