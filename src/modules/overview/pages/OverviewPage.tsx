import {
  CloudServerOutlined,
  PlusOutlined,
  ReloadOutlined,
} from '@ant-design/icons'
import { useRequest } from 'ahooks'
import {
  Button,
  Card,
  Col,
  Progress,
  Row,
  Space,
  Statistic,
  Table,
  Tag,
  Tooltip,
  Typography,
  type TableProps,
} from 'antd'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './OverviewPage.css'

const { Text, Title } = Typography

type ServiceStatus = '正常' | '告警' | '维护中'

interface Service {
  key: string
  name: string
  owner: string
  status: ServiceStatus
  region: string
  uptime: number
}

const services: Service[] = [
  {
    key: 'gateway',
    name: 'API Gateway',
    owner: '基础架构',
    status: '正常',
    region: '华北 2',
    uptime: 99.99,
  },
  {
    key: 'identity',
    name: 'Identity Service',
    owner: '账号平台',
    status: '正常',
    region: '华北 2',
    uptime: 99.97,
  },
  {
    key: 'billing',
    name: 'Billing Worker',
    owner: '商业平台',
    status: '告警',
    region: '华东 1',
    uptime: 98.42,
  },
  {
    key: 'analytics',
    name: 'Analytics Pipeline',
    owner: '数据平台',
    status: '维护中',
    region: '华南 1',
    uptime: 99.81,
  },
]

const statusColors: Record<ServiceStatus, string> = {
  正常: 'success',
  告警: 'error',
  维护中: 'warning',
}

const columns: TableProps<Service>['columns'] = [
  {
    title: '服务',
    dataIndex: 'name',
    render: (name: string) => (
      <Space size={10}>
        <span className="service-mark" aria-hidden="true" />
        <Text strong>{name}</Text>
      </Space>
    ),
  },
  {
    title: '负责人',
    dataIndex: 'owner',
    responsive: ['md'],
  },
  {
    title: '区域',
    dataIndex: 'region',
    responsive: ['lg'],
  },
  {
    title: '可用率',
    dataIndex: 'uptime',
    responsive: ['sm'],
    render: (uptime: number) => (
      <Text className="uptime-value">{uptime.toFixed(2)}%</Text>
    ),
  },
  {
    title: '状态',
    dataIndex: 'status',
    align: 'right',
    render: (status: ServiceStatus) => (
      <Tag color={statusColors[status]}>{status}</Tag>
    ),
  },
]

export function OverviewPage() {
  const navigate = useNavigate()
  const [lastUpdated, setLastUpdated] = useState(() => new Date())
  const { loading: refreshing, run: refresh } = useRequest(
    async () => {
      await new Promise((resolve) => window.setTimeout(resolve, 650))
      return new Date()
    },
    {
      manual: true,
      onSuccess: setLastUpdated,
    },
  )

  return (
    <div className="overview-page">
      <div className="page-heading">
        <div>
          <Text className="eyebrow">生产环境 · 华北 2</Text>
          <Title level={1}>系统总览</Title>
          <Text type="secondary">服务状态、资源用量与近期变更</Text>
        </div>
        <Space wrap>
          <Text type="secondary" className="updated-at">
            更新于{' '}
            {lastUpdated.toLocaleTimeString('zh-CN', {
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit',
            })}
          </Text>
          <Tooltip title="刷新状态">
            <Button
              icon={<ReloadOutlined spin={refreshing} />}
              loading={refreshing}
              onClick={refresh}
            >
              刷新
            </Button>
          </Tooltip>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => navigate('/applications/list')}
          >
            创建应用
          </Button>
        </Space>
      </div>

      <Row gutter={[16, 16]} className="metric-grid">
        <Col xs={24} sm={12} xl={6}>
          <Card className="metric-card">
            <Statistic title="运行服务" value={24} suffix="个" />
            <Text type="secondary">较上周增加 2 个</Text>
          </Card>
        </Col>
        <Col xs={24} sm={12} xl={6}>
          <Card className="metric-card">
            <Statistic
              title="整体可用率"
              value={99.96}
              precision={2}
              suffix="%"
            />
            <Text className="positive-text">目标值以上 0.06%</Text>
          </Card>
        </Col>
        <Col xs={24} sm={12} xl={6}>
          <Card className="metric-card">
            <Statistic title="活跃告警" value={3} />
            <Text className="warning-text">其中 1 项需要处理</Text>
          </Card>
        </Col>
        <Col xs={24} sm={12} xl={6}>
          <Card className="metric-card">
            <Statistic title="今日请求" value={1.28} precision={2} suffix="M" />
            <Text type="secondary">峰值 2,481 req/s</Text>
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} className="main-grid">
        <Col xs={24} xl={17}>
          <section className="panel service-panel">
            <div className="panel-heading">
              <div>
                <Title level={2}>服务健康度</Title>
                <Text type="secondary">核心服务实时运行状态</Text>
              </div>
              <Button type="link" onClick={() => navigate('/applications/list')}>
                查看全部
              </Button>
            </div>
            <Table<Service>
              columns={columns}
              dataSource={services}
              pagination={false}
              scroll={{ x: 560 }}
            />
          </section>
        </Col>

        <Col xs={24} xl={7}>
          <section className="panel capacity-panel">
            <div className="panel-heading">
              <div>
                <Title level={2}>资源容量</Title>
                <Text type="secondary">集群平均使用率</Text>
              </div>
            </div>
            <div className="capacity-list">
              <div>
                <div className="capacity-label">
                  <Text>CPU</Text>
                  <Text strong>42%</Text>
                </div>
                <Progress percent={42} showInfo={false} />
              </div>
              <div>
                <div className="capacity-label">
                  <Text>内存</Text>
                  <Text strong>68%</Text>
                </div>
                <Progress percent={68} showInfo={false} />
              </div>
              <div>
                <div className="capacity-label">
                  <Text>存储</Text>
                  <Text strong>51%</Text>
                </div>
                <Progress percent={51} showInfo={false} />
              </div>
            </div>
            <div className="capacity-note">
              <CloudServerOutlined />
              <div>
                <Text strong>12 个计算节点</Text>
                <Text type="secondary">当前无扩容建议</Text>
              </div>
            </div>
          </section>
        </Col>
      </Row>
    </div>
  )
}
