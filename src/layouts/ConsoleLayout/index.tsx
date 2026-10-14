import {
  BellOutlined,
  MenuOutlined,
} from '@ant-design/icons'
import { useBoolean, useResponsive } from 'ahooks'
import {
  Avatar,
  Badge,
  Button,
  Drawer,
  Layout,
  Menu,
  Space,
  Tooltip,
  Typography,
} from 'antd'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import {
  findPlatform,
  getPlatformEntryPath,
  platformNavigation,
  type NavigationItem,
  type PlatformNavigation,
} from '../../app/navigation'
import './index.css'

const { Header, Content, Sider } = Layout
const { Text } = Typography

interface PlatformMenuProps {
  platform: PlatformNavigation
  selectedKey?: string
  onNavigate: (item: NavigationItem) => void
}

function PlatformMenu({
  platform,
  selectedKey,
  onNavigate,
}: PlatformMenuProps) {
  return (
    <>
      <div className="platform-context">
        <span className="platform-context-icon">{platform.icon}</span>
        <span>
          <strong>{platform.label}</strong>
          <small>功能菜单</small>
        </span>
      </div>
      <Menu
        className="side-menu"
        mode="inline"
        selectedKeys={selectedKey ? [selectedKey] : []}
        items={platform.menus?.map(({ key, label, icon }) => ({
          key,
          label,
          icon,
        }))}
        onClick={({ key }) => {
          const item = platform.menus?.find((menu) => menu.key === key)
          if (item) {
            onNavigate(item)
          }
        }}
      />
    </>
  )
}

export function ConsoleLayout() {
  const location = useLocation()
  const navigate = useNavigate()
  const screens = useResponsive()
  const [drawerOpen, { setTrue: openDrawer, setFalse: closeDrawer }] =
    useBoolean(false)

  const currentPlatform = findPlatform(location.pathname)
  const currentMenu = currentPlatform.menus?.find(
    ({ path }) =>
      location.pathname === path || location.pathname.startsWith(`${path}/`),
  )
  const hasMenus = Boolean(currentPlatform.menus?.length)
  const isDesktop = screens.md !== false

  const navigateToMenu = (item: NavigationItem) => {
    navigate(item.path)
    closeDrawer()
  }

  return (
    <Layout className="console-shell">
      <Header className="console-header">
        <button
          type="button"
          className="brand"
          aria-label="返回控制台总览"
          onClick={() => navigate('/overview')}
        >
          <span className="brand-symbol">C</span>
          <span className="brand-copy">
            <strong>Console</strong>
            <small>CONTROL CENTER</small>
          </span>
        </button>

        <Menu
          className="platform-menu"
          mode="horizontal"
          selectedKeys={[currentPlatform.key]}
          items={platformNavigation.map(({ key, label, icon }) => ({
            key,
            label,
            icon,
          }))}
          onClick={({ key }) => {
            const platform = platformNavigation.find(
              (item) => item.key === key,
            )
            if (platform) {
              navigate(getPlatformEntryPath(platform))
            }
          }}
        />

        <Space className="header-actions" size={10}>
          {!isDesktop && hasMenus && (
            <Tooltip title="打开平台菜单">
              <Button
                type="text"
                className="icon-button mobile-menu-button"
                aria-label="打开平台菜单"
                icon={<MenuOutlined />}
                onClick={openDrawer}
              />
            </Tooltip>
          )}
          <Tooltip title="通知">
            <Badge dot offset={[-5, 5]}>
              <Button
                type="text"
                className="icon-button notification-button"
                aria-label="查看通知"
                icon={<BellOutlined />}
              />
            </Badge>
          </Tooltip>
          <Avatar className="user-avatar">SC</Avatar>
        </Space>
      </Header>

      <Layout className="console-body">
        {hasMenus && isDesktop && (
          <Sider width={220} className="platform-sider" theme="light">
            <PlatformMenu
              platform={currentPlatform}
              selectedKey={currentMenu?.key}
              onNavigate={navigateToMenu}
            />
            <div className="sider-status">
              <Badge status="success" />
              <Text>平台服务运行正常</Text>
            </div>
          </Sider>
        )}

        <Content className="console-content">
          <Outlet />
        </Content>
      </Layout>

      <Drawer
        className="platform-drawer"
        title={currentPlatform.label}
        placement="left"
        width={280}
        open={drawerOpen && hasMenus}
        onClose={closeDrawer}
      >
        <PlatformMenu
          platform={currentPlatform}
          selectedKey={currentMenu?.key}
          onNavigate={navigateToMenu}
        />
      </Drawer>
    </Layout>
  )
}
