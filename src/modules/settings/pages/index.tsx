import { WorkspacePage } from '../../../components/WorkspacePage'

export function UserManagementPage() {
  return (
    <WorkspacePage
      category="系统设置"
      title="用户管理"
      description="管理控制台成员、所属团队与账号状态"
      metrics={[
        { title: '全部用户', value: 86, suffix: '人' },
        { title: '本月新增', value: 7, suffix: '人' },
        { title: '待处理邀请', value: 2, suffix: '个' },
      ]}
      records={[
        {
          key: 'user-01',
          name: '陈曦',
          detail: '基础架构 · 管理员',
          status: '已启用',
        },
        {
          key: 'user-02',
          name: '李明',
          detail: '应用平台 · 开发者',
          status: '已启用',
        },
        {
          key: 'user-03',
          name: '周宁',
          detail: '数据平台 · 只读成员',
          status: '待处理',
        },
      ]}
    />
  )
}

export function PermissionPolicyPage() {
  return (
    <WorkspacePage
      category="系统设置"
      title="权限策略"
      description="配置平台角色、资源范围与操作权限"
      metrics={[
        { title: '权限策略', value: 14, suffix: '条' },
        { title: '系统内置', value: 5, suffix: '条' },
        { title: '自定义', value: 9, suffix: '条' },
      ]}
      records={[
        {
          key: 'policy-admin',
          name: '平台管理员',
          detail: '全部平台 · 完全控制',
          status: '已启用',
        },
        {
          key: 'policy-developer',
          name: '应用开发者',
          detail: '应用平台 · 编辑权限',
          status: '已启用',
        },
        {
          key: 'policy-auditor',
          name: '安全审计员',
          detail: '全部平台 · 只读权限',
          status: '已启用',
        },
      ]}
    />
  )
}
