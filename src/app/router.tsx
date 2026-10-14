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
        element: <Navigate to="/overview" replace />,
      },
      {
        path: 'overview',
        lazy: async () => {
          const { OverviewPage } = await import(
            '../modules/overview/pages/OverviewPage'
          )
          return { Component: OverviewPage }
        },
      },
      {
        path: 'applications',
        element: <Navigate to="/applications/list" replace />,
      },
      {
        path: 'applications/list',
        lazy: async () => {
          const { ApplicationListPage } = await import(
            '../modules/applications/pages'
          )
          return { Component: ApplicationListPage }
        },
      },
      {
        path: 'applications/deployments',
        lazy: async () => {
          const { DeploymentsPage } = await import(
            '../modules/applications/pages'
          )
          return { Component: DeploymentsPage }
        },
      },
      {
        path: 'resources',
        element: <Navigate to="/resources/compute" replace />,
      },
      {
        path: 'resources/compute',
        lazy: async () => {
          const { ComputeResourcePage } = await import(
            '../modules/resources/pages'
          )
          return { Component: ComputeResourcePage }
        },
      },
      {
        path: 'resources/storage',
        lazy: async () => {
          const { StorageResourcePage } = await import(
            '../modules/resources/pages'
          )
          return { Component: StorageResourcePage }
        },
      },
      {
        path: 'settings',
        element: <Navigate to="/settings/users" replace />,
      },
      {
        path: 'settings/users',
        lazy: async () => {
          const { UserManagementPage } = await import(
            '../modules/settings/pages'
          )
          return { Component: UserManagementPage }
        },
      },
      {
        path: 'settings/permissions',
        lazy: async () => {
          const { PermissionPolicyPage } = await import(
            '../modules/settings/pages'
          )
          return { Component: PermissionPolicyPage }
        },
      },
      {
        path: '*',
        Component: NotFoundPage,
      },
    ],
  },
])
