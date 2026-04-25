import { useEffect, useState } from 'react'
import {
  List,
  Card,
  Button,
  Typography,
  Space,
  Spin,
  Empty,
  Modal,
  Form,
  Input,
  Popconfirm,
  message,
} from 'antd'
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  FileTextOutlined,
} from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../hooks/useRedux'
import { fetchDocuments, createDocument, deleteDocument } from '../store/documentsSlice'
import { ROUTES } from '../constants/routes'
import dayjs from 'dayjs'

const { Title, Text } = Typography

const DocumentsPage = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { documents, loading } = useAppSelector((state) => state.documents)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [form] = Form.useForm()
  const [messageApi, contextHolder] = message.useMessage()

  useEffect(() => {
    dispatch(fetchDocuments({}))
  }, [dispatch])

  const handleCreateDocument = async (values: { title: string }) => {
    const result = await dispatch(createDocument({ ...values, content: '' }))
    if (createDocument.fulfilled.match(result)) {
      setIsModalOpen(false)
      form.resetFields()
      messageApi.success('文档创建成功')
      navigate(`${ROUTES.DOCUMENTS}/${result.payload.id}`)
    }
  }

  const handleDeleteDocument = async (id: number) => {
    const result = await dispatch(deleteDocument(id))
    if (deleteDocument.fulfilled.match(result)) {
      messageApi.success('文档删除成功')
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      {contextHolder}
      <div className="flex justify-between items-center mb-6">
        <Title level={2} className="!mb-0">我的文档</Title>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setIsModalOpen(true)}
        >
          新建文档
        </Button>
      </div>

      <Card>
        {loading ? (
          <div className="flex justify-center py-12">
            <Spin size="large" />
          </div>
        ) : documents.length === 0 ? (
          <Empty
            description="暂无文档"
            image={Empty.PRESENTED_IMAGE_SIMPLE}
          >
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => setIsModalOpen(true)}
            >
              创建第一个文档
            </Button>
          </Empty>
        ) : (
          <List
            itemLayout="horizontal"
            dataSource={documents}
            renderItem={(item) => (
            <List.Item
              actions={[
                <Button
                  type="link"
                  icon={<EditOutlined />}
                  onClick={() => navigate(`${ROUTES.DOCUMENTS}/${item.id}`)}
                >
                  编辑
                </Button>,
                <Popconfirm
                  title="确定要删除这个文档吗？"
                  onConfirm={() => handleDeleteDocument(item.id)}
                  okText="确定"
                  cancelText="取消"
                >
                  <Button type="link" danger icon={<DeleteOutlined />}>
                    删除
                  </Button>
                </Popconfirm>,
              ]}
              className="cursor-pointer hover:bg-gray-50"
              onClick={() => navigate(`${ROUTES.DOCUMENTS}/${item.id}`)}
            >
              <List.Item.Meta
                avatar={<FileTextOutlined className="text-blue-500 text-2xl" />}
                title={<Text strong>{item.title}</Text>}
                description={`更新于 ${dayjs(item.updatedAt).format('YYYY-MM-DD HH:mm')}`}
              />
            </List.Item>
          )}
          />
        )}
      </Card>

      <Modal
        title="新建文档"
        open={isModalOpen}
        onCancel={() => {
          setIsModalOpen(false)
          form.resetFields()
        }}
        footer={null}
      >
        <Form form={form} onFinish={handleCreateDocument} layout="vertical">
          <Form.Item
            name="title"
            label="文档标题"
            rules={[{ required: true, message: '请输入文档标题' }]}
          >
            <Input placeholder="请输入文档标题" size="large" />
          </Form.Item>
          <Form.Item className="mb-0">
            <Space>
              <Button type="primary" htmlType="submit">
                创建
              </Button>
              <Button onClick={() => setIsModalOpen(false)}>取消</Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default DocumentsPage
