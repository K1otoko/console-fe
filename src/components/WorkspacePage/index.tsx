import { ReloadOutlined } from '@ant-design/icons'
import { useRequest } from 'ahooks'
import {
  Button,
  Card,
  Col,
  Row,
  Space,
  Statistic,
  Table,
  Tag,
  Typography,
  type TableProps,
} from 'antd'
import { useState } from 'react'
import './index.css'

const { Text, Title } = Typography

export interface WorkspaceMetric {
  title: string
  value: number | string
  suffix?: string
}

export interface WorkspaceRecord {
  key: string
  name: string
  detail: string
  status: string
}

interface WorkspacePageProps {
  category: string
  title: string
  description: string
  metrics: WorkspaceMetric[]
  records: WorkspaceRecord[]
}

const statusColors: Record<string, string> = {
  正常: 'success',
  运行中: 'processing',
  已启用: 'success',
  可用: 'success',
  待处理: 'warning',
  已暂停: 'default',
}

const columns: TableProps<WorkspaceRecord>['columns'] = [
  {
    title: '名称',
    dataIndex: 'name',
    render: (name: string) => <Text strong>{name}</Text>,
  },
  {
    title: '说明',
    dataIndex: 'detail',
    responsive: ['sm'],
  },
  {
    title: '状态',
    dataIndex: 'status',
    align: 'right',
    render: (status: string) => (
      <Tag color={statusColors[status] ?? 'default'}>
        {status}
      </Tag>
    ),
  },
]

export function WorkspacePage({
  category,
  title,
  description,
  metrics,
  records,
}: WorkspacePageProps) {
  const [lastUpdated, setLastUpdated] = useState(() => new Date())
  const { loading, run: refresh } = useRequest(
    async () => {
      await new Promise((resolve) => window.setTimeout(resolve, 500))
      return new Date()
    },
    {
      manual: true,
      onSuccess: setLastUpdated,
    },
  )

  return (
    <div className="workspace-page">
      <div className="workspace-heading">
        <div>
          <Text className="workspace-eyebrow">{category}</Text>
          <Title level={1}>{title}</Title>
          <Text type="secondary">{description}</Text>
        </div>
        <Space>
          <Text type="secondary" className="workspace-updated-at">
            更新于{' '}
            {lastUpdated.toLocaleTimeString('zh-CN', {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </Text>
          <Button
            icon={<ReloadOutlined spin={loading} />}
            loading={loading}
            onClick={refresh}
          >
            刷新
          </Button>
        </Space>
      </div>

      <Row gutter={[16, 16]} className="workspace-metrics">
        {metrics.map((metric) => (
          <Col xs={24} sm={12} xl={8} key={metric.title}>
            <Card className="workspace-metric">
              <Statistic
                title={metric.title}
                value={metric.value}
                suffix={metric.suffix}
              />
            </Card>
          </Col>
        ))}
      </Row>

      <section className="workspace-panel">
        <div className="workspace-panel-heading">
          <div>
            <Title level={2}>当前数据</Title>
            <Text type="secondary">按最近更新时间排序</Text>
          </div>
          <Text type="secondary">共 {records.length} 项</Text>
        </div>
        <Table<WorkspaceRecord>
          columns={columns}
          dataSource={records}
          pagination={false}
        />
      </section>
    </div>
  )
}
