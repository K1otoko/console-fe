import {
  AppstoreOutlined,
  CloudServerOutlined,
  DashboardOutlined,
  DatabaseOutlined,
  DeploymentUnitOutlined,
  FileSearchOutlined,
  SafetyCertificateOutlined,
  SettingOutlined,
  TeamOutlined,
} from '@ant-design/icons'
import type { ReactNode } from 'react'

export interface NavigationItem {
  key: string
  label: string
  path: string
  icon: ReactNode
}

export interface PlatformNavigation extends NavigationItem {
  menus?: NavigationItem[]
}

export const platformNavigation: PlatformNavigation[] = [
  {
    key: 'workspace',
    label: '工作台',
    path: '/workspace',
    icon: <DashboardOutlined />,
  },
  {
    key: 'infra',
    label: '基础设施',
    path: '/infra',
    icon: <CloudServerOutlined />,
    menus: [
      {
        key: 'apps',
        label: '应用管理',
        path: '/infra/apps',
        icon: <AppstoreOutlined />,
      },
      {
        key: 'deployments',
        label: '部署平台',
        path: '/infra/deployments',
        icon: <DeploymentUnitOutlined />,
      },
      {
        key: 'resources',
        label: '资源平台',
        path: '/infra/resources',
        icon: <DatabaseOutlined />,
      },
    ],
  },
  {
    key: 'settings',
    label: '系统设置',
    path: '/settings',
    icon: <SettingOutlined />,
    menus: [
      {
        key: 'users',
        label: '用户中心',
        path: '/settings/users',
        icon: <TeamOutlined />,
      },
      {
        key: 'permissions',
        label: '权限管理',
        path: '/settings/permissions',
        icon: <SafetyCertificateOutlined />,
      },
      {
        key: 'audit',
        label: '审计日志',
        path: '/settings/audit',
        icon: <FileSearchOutlined />,
      },
    ],
  },
]

export function findPlatform(pathname: string) {
  return (
    platformNavigation.find(
      ({ path }) => pathname === path || pathname.startsWith(`${path}/`),
    ) ?? platformNavigation[0]
  )
}

export function getPlatformEntryPath(platform: PlatformNavigation) {
  return platform.menus?.[0]?.path ?? platform.path
}
