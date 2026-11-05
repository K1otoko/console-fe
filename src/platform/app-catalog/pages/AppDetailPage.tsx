import { Button, Empty, Tabs } from 'antd'
import { useNavigate, useParams } from 'react-router-dom'
import { PageShell } from '../../../shared/components/PageShell'

const tabItems = [
  { key: 'overview', label: '概览' },
  { key: 'access', label: '接入配置' },
  { key: 'environments', label: '环境与域名' },
  { key: 'deployments', label: '部署记录' },
  { key: 'members', label: '成员与权限' },
  { key: 'audit', label: '变更日志' },
].map((tab) => ({
  ...tab,
  children: (
    <Empty description={`${tab.label}内容待接入后实现`} />
  ),
}))

export function AppDetailPage() {
  const { appKey } = useParams<{ appKey: string }>()
  const navigate = useNavigate()

  return (
    <PageShell
      eyebrow="基础设施 / 应用管理"
      title={appKey ?? '应用详情'}
      description="应用信息、接入配置与变更记录"
      actions={<Button onClick={() => navigate('/infra/apps')}>返回列表</Button>}
    >
      <Tabs items={tabItems} />
    </PageShell>
  )
}
