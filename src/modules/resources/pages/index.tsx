import { WorkspacePage } from '../../../components/WorkspacePage'

export function ComputeResourcePage() {
  return (
    <WorkspacePage
      category="资源平台"
      title="计算资源"
      description="查看计算节点的容量、区域与运行状态"
      metrics={[
        { title: '计算节点', value: 12, suffix: '个' },
        { title: 'CPU 使用率', value: 42, suffix: '%' },
        { title: '内存使用率', value: 68, suffix: '%' },
      ]}
      records={[
        {
          key: 'node-01',
          name: 'compute-node-01',
          detail: '华北 2 · 16 核 64 GB',
          status: '正常',
        },
        {
          key: 'node-02',
          name: 'compute-node-02',
          detail: '华北 2 · 32 核 128 GB',
          status: '正常',
        },
        {
          key: 'node-03',
          name: 'compute-node-03',
          detail: '华东 1 · 16 核 64 GB',
          status: '可用',
        },
      ]}
    />
  )
}

export function StorageResourcePage() {
  return (
    <WorkspacePage
      category="资源平台"
      title="存储资源"
      description="管理存储实例、容量配额与可用区域"
      metrics={[
        { title: '存储实例', value: 8, suffix: '个' },
        { title: '已用容量', value: 12.4, suffix: 'TB' },
        { title: '可用容量', value: 11.6, suffix: 'TB' },
      ]}
      records={[
        {
          key: 'storage-main',
          name: 'storage-main',
          detail: '华北 2 · 高性能 SSD',
          status: '正常',
        },
        {
          key: 'storage-archive',
          name: 'storage-archive',
          detail: '华北 2 · 归档存储',
          status: '正常',
        },
        {
          key: 'storage-backup',
          name: 'storage-backup',
          detail: '华东 1 · 跨区备份',
          status: '可用',
        },
      ]}
    />
  )
}
