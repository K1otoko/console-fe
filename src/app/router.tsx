import { Navigate, createBrowserRouter } from 'react-router-dom'
import { ConsoleLayout } from '../layouts/ConsoleLayout'
import { NotFoundPage } from '../pages/NotFoundPage'

export const router = createBrowserRouter([
  {
    path: '/',
    Component: ConsoleLayout,
    children: [
      {
        index: true,
        element: <Navigate to="/workspace" replace />,
      },
      {
        path: 'workspace',
        lazy: async () => {
          const { WorkspacePage } = await import(
            '../platform/workspace/pages/WorkspacePage'
          )
          return { Component: WorkspacePage }
        },
      },
      {
        path: 'workspace/apps/:appKey/*',
        lazy: async () => {
          const { BusinessAppPlaceholder } = await import(
            '../business/BusinessAppPlaceholder'
          )
          return { Component: BusinessAppPlaceholder }
        },
      },
      {
        path: 'infra',
        element: <Navigate to="/infra/apps" replace />,
      },
      {
        path: 'infra/apps',
        lazy: async () => {
          const { AppListPage } = await import(
            '../platform/app-catalog/pages/AppListPage'
          )
          return { Component: AppListPage }
        },
      },
      {
        path: 'infra/apps/new',
        lazy: async () => {
          const { AppCreatePage } = await import(
            '../platform/app-catalog/pages/AppCreatePage'
          )
          return { Component: AppCreatePage }
        },
      },
      {
        path: 'infra/apps/:appKey',
        lazy: async () => {
          const { AppDetailPage } = await import(
            '../platform/app-catalog/pages/AppDetailPage'
          )
          return { Component: AppDetailPage }
        },
      },
      {
        path: 'infra/deployments',
        lazy: async () => {
          const { DeploymentsPage } = await import(
            '../platform/deployments/pages/DeploymentsPage'
          )
          return { Component: DeploymentsPage }
        },
      },
      {
        path: 'infra/resources',
        lazy: async () => {
          const { ResourcesPage } = await import(
            '../platform/resources/pages/ResourcesPage'
          )
          return { Component: ResourcesPage }
        },
      },
      {
        path: 'settings',
        element: <Navigate to="/settings/users" replace />,
      },
      {
        path: 'settings/users',
        lazy: async () => {
          const { UsersPage } = await import(
            '../platform/settings/pages/UsersPage'
          )
          return { Component: UsersPage }
        },
      },
      {
        path: 'settings/permissions',
        lazy: async () => {
          const { PermissionsPage } = await import(
            '../platform/settings/pages/PermissionsPage'
          )
          return { Component: PermissionsPage }
        },
      },
      {
        path: 'settings/audit',
        lazy: async () => {
          const { AuditPage } = await import(
            '../platform/settings/pages/AuditPage'
          )
          return { Component: AuditPage }
        },
      },
      {
        path: '*',
        Component: NotFoundPage,
      },
    ],
  },
])
