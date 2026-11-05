import type { ReactNode } from 'react'
import { Space, Typography } from 'antd'
import './index.css'

const { Text, Title } = Typography

interface PageShellProps {
  eyebrow?: string
  title: string
  description?: string
  actions?: ReactNode
  children?: ReactNode
}

export function PageShell({
  eyebrow,
  title,
  description,
  actions,
  children,
}: PageShellProps) {
  return (
    <div className="page-shell">
      <header className="page-shell-heading">
        <div>
          {eyebrow ? (
            <Text className="page-shell-eyebrow">{eyebrow}</Text>
          ) : null}
          <Title level={1}>{title}</Title>
          {description ? <Text type="secondary">{description}</Text> : null}
        </div>
        {actions ? <Space wrap>{actions}</Space> : null}
      </header>
      <div className="page-shell-body">{children}</div>
    </div>
  )
}
