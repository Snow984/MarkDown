import { Form, Input, Button, Card, Typography, Alert, Spin } from 'antd'
import { useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../hooks/useRedux'
import { register, clearError } from '../store/authSlice'
import { ROUTES } from '../constants/routes'

const { Title, Text } = Typography

const RegisterPage = () => {
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

  const onFinish = async (values: {
    username: string
    email: string
    password: string
    confirmPassword: string
  }) => {
    const { confirmPassword, ...data } = values
    const result = await dispatch(register(data))
    if (register.fulfilled.match(result)) {
      navigate(ROUTES.DOCUMENTS)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-140px)] py-8">
      <Card className="w-full max-w-md shadow-lg">
        <div className="text-center mb-8">
          <Title level={2} className="!mb-2">
            创建账户
          </Title>
          <Text type="secondary">注册以开始使用我们的服务</Text>
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
          name="register"
          onFinish={onFinish}
          autoComplete="off"
          layout="vertical"
        >
          <Form.Item
            name="username"
            label="用户名"
            rules={[
              { required: true, message: '请输入用户名' },
              { min: 3, message: '用户名至少3个字符' },
            ]}
          >
            <Input placeholder="请输入用户名" size="large" />
          </Form.Item>

          <Form.Item
            name="email"
            label="邮箱"
            rules={[
              { required: true, message: '请输入邮箱' },
              { type: 'email', message: '请输入有效的邮箱地址' },
            ]}
          >
            <Input placeholder="请输入邮箱" size="large" />
          </Form.Item>

          <Form.Item
            name="password"
            label="密码"
            rules={[
              { required: true, message: '请输入密码' },
              { min: 6, message: '密码至少6个字符' },
            ]}
          >
            <Input.Password placeholder="请输入密码" size="large" />
          </Form.Item>

          <Form.Item
            name="confirmPassword"
            label="确认密码"
            dependencies={['password']}
            rules={[
              { required: true, message: '请确认密码' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve()
                  }
                  return Promise.reject(new Error('两次输入的密码不一致'))
                },
              }),
            ]}
          >
            <Input.Password placeholder="请确认密码" size="large" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" size="large" block loading={loading}>
              {loading ? <Spin size="small" /> : '注册'}
            </Button>
          </Form.Item>
        </Form>

        <div className="text-center">
          <Text type="secondary">
            已有账户？ <Link to={ROUTES.LOGIN}>立即登录</Link>
          </Text>
        </div>
      </Card>
    </div>
  )
}

export default RegisterPage
