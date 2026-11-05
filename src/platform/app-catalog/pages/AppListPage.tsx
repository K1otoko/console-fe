import { PlusOutlined } from '@ant-design/icons'
import { Button, Empty } from 'antd'
import { useNavigate } from 'react-router-dom'
import { PageShell } from '../../../shared/components/PageShell'

export function AppListPage() {
  const navigate = useNavigate()

  return (
    <PageShell
      eyebrow="基础设施"
      title="应用管理"
      description="统一维护应用清单与接入配置"
      actions={
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => navigate('/infra/apps/new')}
        >
          新建应用
        </Button>
      }
    >
      <Empty description="暂无应用，创建后会显示在这里" />
    </PageShell>
  )
}
