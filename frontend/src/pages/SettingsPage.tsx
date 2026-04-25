import { Card, Form, Input, Button, Typography, message } from 'antd'
import { useAppSelector } from '../hooks/useRedux'
import { authApi } from '../api'

const { Title } = Typography

const SettingsPage = () => {
  const { user } = useAppSelector((state) => state.auth)
  const [profileForm] = Form.useForm()
  const [passwordForm] = Form.useForm()
  const [messageApi, contextHolder] = message.useMessage()

  const handleUpdateProfile = async (values: { username: string; email: string }) => {
    try {
      await authApi.updateProfile(values)
      messageApi.success('个人信息更新成功')
    } catch (error) {
      messageApi.error('更新失败')
    }
  }

  const handleChangePassword = async (values: { oldPassword: string; newPassword: string }) => {
    try {
      await authApi.changePassword(values)
      messageApi.success('密码修改成功')
      passwordForm.resetFields()
    } catch (error) {
      messageApi.error('密码修改失败')
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      {contextHolder}
      <Title level={2} className="mb-6">设置</Title>

      <Card title="个人信息" className="mb-6">
        <Form
          form={profileForm}
          layout="vertical"
          initialValues={{ username: user?.username, email: user?.email }}
          onFinish={handleUpdateProfile}
        >
          <Form.Item
            name="username"
            label="用户名"
            rules={[{ required: true, message: '请输入用户名' }]}
          >
            <Input placeholder="请输入用户名" />
          </Form.Item>

          <Form.Item
            name="email"
            label="邮箱"
            rules={[
              { required: true, message: '请输入邮箱' },
              { type: 'email', message: '请输入有效的邮箱地址' },
            ]}
          >
            <Input placeholder="请输入邮箱" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              保存修改
            </Button>
          </Form.Item>
        </Form>
      </Card>

      <Card title="修改密码">
        <Form
          form={passwordForm}
          layout="vertical"
          onFinish={handleChangePassword}
        >
          <Form.Item
            name="oldPassword"
            label="当前密码"
            rules={[{ required: true, message: '请输入当前密码' }]}
          >
            <Input.Password placeholder="请输入当前密码" />
          </Form.Item>

          <Form.Item
            name="newPassword"
            label="新密码"
            rules={[
              { required: true, message: '请输入新密码' },
              { min: 6, message: '密码至少6个字符' },
            ]}
          >
            <Input.Password placeholder="请输入新密码" />
          </Form.Item>

          <Form.Item
            name="confirmPassword"
            label="确认新密码"
            dependencies={['newPassword']}
            rules={[
              { required: true, message: '请确认新密码' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('newPassword') === value) {
                    return Promise.resolve()
                  }
                  return Promise.reject(new Error('两次输入的密码不一致'))
                },
              }),
            ]}
          >
            <Input.Password placeholder="请确认新密码" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              修改密码
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default SettingsPage
