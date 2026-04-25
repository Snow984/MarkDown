import { Form, Input, Button, Card, Typography, Alert, Spin } from 'antd'
import { useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../hooks/useRedux'
import { login, clearError } from '../store/authSlice'
import { ROUTES } from '../constants/routes'

const { Title, Text } = Typography

const LoginPage = () => {
  const [form] = Form.useForm()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { loading, error, isAuthenticated } = useAppSelector((state) => state.auth)

  useEffect(() => {
    if (isAuthenticated) {
      navigate(ROUTES.DOCUMENTS)
    }
    dispatch(clearError())
  }, [isAuthenticated, navigate, dispatch])

  const onFinish = async (values: { username: string; password: string }) => {
    const result = await dispatch(login(values))
    if (login.fulfilled.match(result)) {
      navigate(ROUTES.DOCUMENTS)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-140px)] py-8">
      <Card className="w-full max-w-md shadow-lg">
        <div className="text-center mb-8">
          <Title level={2} className="!mb-2">
            欢迎回来
          </Title>
          <Text type="secondary">登录您的账户以继续</Text>
        </div>

        {error && (
          <Alert
            message={error}
            type="error"
            showIcon
            closable
            onClose={() => dispatch(clearError())}
            className="mb-4"
          />
        )}

        <Form
          form={form}
          name="login"
          onFinish={onFinish}
          autoComplete="off"
          layout="vertical"
        >
          <Form.Item
            name="username"
            label="用户名"
            rules={[{ required: true, message: '请输入用户名' }]}
          >
            <Input placeholder="请输入用户名" size="large" />
          </Form.Item>

          <Form.Item
            name="password"
            label="密码"
            rules={[{ required: true, message: '请输入密码' }]}
          >
            <Input.Password placeholder="请输入密码" size="large" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" size="large" block loading={loading}>
              {loading ? <Spin size="small" /> : '登录'}
            </Button>
          </Form.Item>
        </Form>

        <div className="text-center">
          <Text type="secondary">
            还没有账户？ <Link to={ROUTES.REGISTER}>立即注册</Link>
          </Text>
        </div>
      </Card>
    </div>
  )
}

export default LoginPage
