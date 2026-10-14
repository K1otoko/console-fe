import { WorkspacePage } from '../../../components/WorkspacePage'

export function ApplicationListPage() {
  return (
    <WorkspacePage
      category="应用平台"
      title="应用列表"
      description="统一查看应用状态、所属团队与运行环境"
      metrics={[
        { title: '全部应用', value: 24, suffix: '个' },
        { title: '运行中', value: 21, suffix: '个' },
        { title: '待处理', value: 3, suffix: '个' },
      ]}
      records={[
        {
          key: 'console-web',
          name: 'console-web',
          detail: '前端平台 · production',
          status: '正常',
        },
        {
          key: 'api-gateway',
          name: 'api-gateway',
          detail: '基础架构 · production',
          status: '正常',
        },
        {
          key: 'billing-worker',
          name: 'billing-worker',
          detail: '商业平台 · staging',
          status: '待处理',
        },
      ]}
    />
  )
}

export function DeploymentsPage() {
  return (
    <WorkspacePage
      category="应用平台"
      title="部署管理"
      description="跟踪各环境的发布进度与部署结果"
      metrics={[
        { title: '今日部署', value: 18, suffix: '次' },
        { title: '运行中', value: 2, suffix: '次' },
        { title: '成功率', value: 98.6, suffix: '%' },
      ]}
      records={[
        {
          key: 'deploy-1048',
          name: 'console-web #1048',
          detail: 'production · 18:32',
          status: '运行中',
        },
        {
          key: 'deploy-1047',
          name: 'api-gateway #1047',
          detail: 'production · 17:56',
          status: '正常',
        },
        {
          key: 'deploy-1046',
          name: 'identity-service #1046',
          detail: 'staging · 16:21',
          status: '正常',
        },
      ]}
    />
  )
}
