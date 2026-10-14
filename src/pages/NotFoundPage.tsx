import { Button, Result } from 'antd'
import { useNavigate } from 'react-router-dom'

export function NotFoundPage() {
  const navigate = useNavigate()

  return (
    <div className="route-state">
      <Result
        status="404"
        title="页面不存在"
        subTitle="当前地址没有对应的控制台页面。"
        extra={
          <Button type="primary" onClick={() => navigate('/overview')}>
            返回总览
          </Button>
        }
      />
    </div>
  )
}
