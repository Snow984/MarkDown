import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Layout, Spin, Typography, Button } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons'
import MarkdownEditor from '../components/MarkdownEditor'
import { sharesApi } from '../api'

const { Header, Content } = Layout
const { Title } = Typography

const SharePage = () => {
  const { token } = useParams<{ token: string }>()
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (token) {
      loadSharedDocument()
    }
  }, [token])

  const loadSharedDocument = async () => {
    try {
      setLoading(true)
      const result = await sharesApi.getSharedDocument(token!)
      setData(result)
    } catch (err) {
      setError('文档不存在或已失效')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spin size="large" />
      </div>
    )
  }

  if (error || !data) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <Title level={3}>{error}</Title>
        <Button type="primary" onClick={() => window.location.href = '/'}>
          返回首页
        </Button>
      </div>
    )
  }

  return (
    <Layout className="h-screen">
      <Header className="bg-white border-b border-gray-200 px-6 flex items-center">
        <div className="flex items-center">
          <Button type="text" icon={<ArrowLeftOutlined />} onClick={() => window.location.href = '/'} className="mr-4" />
          <Title level={4} className="!mb-0">{data.document.title}</Title>
        </div>
      </Header>
      <Content className="h-full overflow-hidden">
        <MarkdownEditor
          initialValue={data.content.content}
        />
      </Content>
    </Layout>
  )
}

export default SharePage
