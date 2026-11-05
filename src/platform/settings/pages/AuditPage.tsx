import { Empty } from 'antd'
import { PageShell } from '../../../shared/components/PageShell'

export function AuditPage() {
  return (
    <PageShell
      eyebrow="系统设置"
      title="审计日志"
      description="操作、登录与接入变更记录"
    >
      <Empty description="审计日志待接入审计 API 后实现" />
    </PageShell>
  )
}
