import {
  AppstoreOutlined,
  ClockCircleOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons'
import { Card, Col, Empty, Row, Typography } from 'antd'
import type { ReactNode } from 'react'
import { PageShell } from '../../../shared/components/PageShell'

const { Text, Title } = Typography

interface WorkspacePanel {
  key: string
  title: string
  description: string
  icon: ReactNode
}

const panels: WorkspacePanel[] = [
  {
    key: 'my-apps',
    title: '我的应用',
    description: '进入各应用自己的管理模块',
    icon: <AppstoreOutlined />,
  },
  {
    key: 'recent',
    title: '最近访问',
    description: '最近打开的应用与页面',
    icon: <ClockCircleOutlined />,
  },
  {
    key: 'todos',
    title: '待办与异常',
    description: '需要处理的发布、接入与告警',
    icon: <ExclamationCircleOutlined />,
  },
]

export function WorkspacePage() {
  return (
    <PageShell
      eyebrow="工作台"
      title="工作台"
      description="应用管理入口、最近访问与待办事项"
    >
      <Row gutter={[16, 16]}>
        {panels.map((panel) => (
          <Col xs={24} lg={8} key={panel.key}>
            <Card>
              <Text type="secondary">{panel.icon}</Text>
              <Title level={4} style={{ marginTop: 8 }}>
                {panel.title}
              </Title>
              <Text type="secondary">{panel.description}</Text>
              <div style={{ marginTop: 16 }}>
                <Empty
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                  description="待接入"
                />
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </PageShell>
  )
}
