import {
  AppstoreOutlined,
  CloudServerOutlined,
  DashboardOutlined,
  DatabaseOutlined,
  DeploymentUnitOutlined,
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
    key: 'overview',
    label: '总览',
    path: '/overview',
    icon: <DashboardOutlined />,
  },
  {
    key: 'applications',
    label: '应用平台',
    path: '/applications',
    icon: <AppstoreOutlined />,
    menus: [
      {
        key: 'application-list',
        label: '应用列表',
        path: '/applications/list',
        icon: <AppstoreOutlined />,
      },
      {
        key: 'deployments',
        label: '部署管理',
        path: '/applications/deployments',
        icon: <DeploymentUnitOutlined />,
      },
    ],
  },
  {
    key: 'resources',
    label: '资源平台',
    path: '/resources',
    icon: <CloudServerOutlined />,
    menus: [
      {
        key: 'compute',
        label: '计算资源',
        path: '/resources/compute',
        icon: <CloudServerOutlined />,
      },
      {
        key: 'storage',
        label: '存储资源',
        path: '/resources/storage',
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
        label: '用户管理',
        path: '/settings/users',
        icon: <TeamOutlined />,
      },
      {
        key: 'permissions',
        label: '权限策略',
        path: '/settings/permissions',
        icon: <SafetyCertificateOutlined />,
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
