import { Button, Empty } from 'antd'
import { useNavigate } from 'react-router-dom'
import { PageShell } from '../../../shared/components/PageShell'

export function AppCreatePage() {
  const navigate = useNavigate()

  return (
    <PageShell
      eyebrow="基础设施 / 应用管理"
      title="新建应用"
      description="填写仓库、类型与接入方式"
      actions={<Button onClick={() => navigate('/infra/apps')}>返回列表</Button>}
    >
      <Empty description="创建表单待接入应用管理 API 后实现" />
    </PageShell>
  )
}
