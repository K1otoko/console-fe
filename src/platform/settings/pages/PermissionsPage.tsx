import { Empty } from 'antd'
import { PageShell } from '../../../shared/components/PageShell'

export function PermissionsPage() {
  return (
    <PageShell
      eyebrow="系统设置"
      title="权限管理"
      description="角色与权限矩阵"
    >
      <Empty description="权限管理待接入角色模型后实现" />
    </PageShell>
  )
}
