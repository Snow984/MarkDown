import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import { Layout, Menu, Avatar, Dropdown, Typography } from 'antd'
import {
  FileTextOutlined,
  SettingOutlined,
  LogoutOutlined,
  UserOutlined,
} from '@ant-design/icons'
import { useAppDispatch, useAppSelector } from '../hooks/useRedux'
import { logout } from '../store/authSlice'
import { ROUTES } from '../constants/routes'

const { Header, Content } = Layout
const { Text } = Typography

const MainLayout = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useAppDispatch()
  const { user, isAuthenticated } = useAppSelector((state) => state.auth)

  const handleLogout = () => {
    dispatch(logout())
    localStorage.removeItem('token')
    navigate(ROUTES.LOGIN)
  }

  const userMenuItems = [
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: '设置',
      onClick: () => navigate(ROUTES.SETTINGS),
    },
    {
      type: 'divider' as const,
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: '退出登录',
      onClick: handleLogout,
    },
  ]

  const menuItems = [
    {
      key: ROUTES.DOCUMENTS,
      icon: <FileTextOutlined />,
      label: '我的文档',
      onClick: () => navigate(ROUTES.DOCUMENTS),
    },
  ]

  return (
    <Layout className="min-h-screen">
      <Header className="bg-white border-b border-gray-200 px-6 flex items-center justify-between">
        <div className="flex items-center">
          <h1 className="text-xl font-bold text-gray-800 mr-8">Markdown Editor</h1>
          {isAuthenticated && (
            <Menu
              mode="horizontal"
              selectedKeys={[location.pathname]}
              items={menuItems}
              className="border-none"
            />
          )}
        </div>
        {isAuthenticated && user && (
          <Dropdown menu={{ items: userMenuItems }}>
            <div className="flex items-center cursor-pointer hover:bg-gray-100 px-3 py-2 rounded-lg">
              <Avatar icon={<UserOutlined />} className="mr-2" />
              <Text strong>{user.username}</Text>
            </div>
          </Dropdown>
        )}
      </Header>
      <Content className="p-6">
        <Outlet />
      </Content>
    </Layout>
  )
}

export default MainLayout
