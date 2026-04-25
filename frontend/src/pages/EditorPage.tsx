import { useEffect, useState, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Layout, Button, Input, message, Modal, Form, Space, Dropdown, MenuProps } from 'antd'
import {
  ArrowLeftOutlined,
  SaveOutlined,
  ShareAltOutlined,
  RobotOutlined,
  MoreOutlined,
} from '@ant-design/icons'
import { debounce } from 'lodash'
import MarkdownEditor from '../components/MarkdownEditor'
import AIAssistant from '../components/AIAssistant'
import { useAppDispatch, useAppSelector } from '../hooks/useRedux'
import {
  fetchDocument,
  fetchDocumentContent,
  saveDocumentContent,
  updateDocument,
  setCurrentContent,
} from '../store/documentsSlice'
import { toggleAIAssistant } from '../store/uiSlice'
import { sharesApi } from '../api'
import { ROUTES } from '../constants/routes'

const { Header, Content } = Layout

const EditorPage = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { currentDocument, currentContent, saving } = useAppSelector(
    (state) => state.documents
  )
  const { aiAssistantOpen } = useAppSelector((state) => state.ui)
  const [title, setTitle] = useState('')
  const [isShareModalOpen, setIsShareModalOpen] = useState(false)
  const [shareLinks, setShareLinks] = useState<any[]>([])
  const [messageApi, contextHolder] = message.useMessage()
  const [form] = Form.useForm()

  const documentId = Number(id)

  useEffect(() => {
    if (documentId) {
      dispatch(fetchDocument(documentId))
      dispatch(fetchDocumentContent(documentId))
    }
  }, [documentId, dispatch])

  useEffect(() => {
    if (currentDocument) {
      setTitle(currentDocument.title)
    }
  }, [currentDocument])

  const debouncedSave = useCallback(
    debounce(async (content: string) => {
      if (documentId) {
        await dispatch(saveDocumentContent({ id: documentId, content }))
      }
    }, 1000),
    [documentId, dispatch]
  )

  const handleContentChange = (value: string) => {
    if (currentContent) {
      dispatch(setCurrentContent({ ...currentContent, content: value }))
    }
    debouncedSave(value)
  }

  const handleSave = async () => {
    if (documentId && currentContent) {
      const result = await dispatch(
        saveDocumentContent({ id: documentId, content: currentContent.content })
      )
      if (saveDocumentContent.fulfilled.match(result)) {
        messageApi.success('保存成功')
      }
    }
    if (documentId && currentDocument && title !== currentDocument.title) {
      await dispatch(updateDocument({ id: documentId, title }))
    }
  }

  const handleShare = async () => {
    if (documentId) {
      const links = await sharesApi.getShareLinks(documentId)
      setShareLinks(links)
      setIsShareModalOpen(true)
    }
  }

  const handleCreateShare = async (values: { canEdit: boolean }) => {
    if (documentId) {
      const newLink = await sharesApi.createShareLink({
        documentId,
        canEdit: values.canEdit,
      })
      setShareLinks([...shareLinks, newLink])
      form.resetFields()
      messageApi.success('分享链接创建成功')
    }
  }

  const handleDeleteShare = async (shareId: number) => {
    await sharesApi.deleteShareLink(shareId)
    setShareLinks(shareLinks.filter((link) => link.id !== shareId))
    messageApi.success('分享链接已删除')
  }

  const moreMenuItems: MenuProps['items'] = [
    {
      key: 'back',
      icon: <ArrowLeftOutlined />,
      label: '返回文档列表',
      onClick: () => navigate(ROUTES.DOCUMENTS),
    },
  ]

  return (
    <Layout className="h-screen">
      {contextHolder}
      <Header className="bg-white border-b border-gray-200 px-6 flex items-center justify-between">
        <div className="flex items-center flex-1">
          <Button
            type="text"
            icon={<ArrowLeftOutlined />}
            onClick={() => navigate(ROUTES.DOCUMENTS)}
            className="mr-4"
          />
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onBlur={handleSave}
            placeholder="文档标题"
            bordered={false}
            className="text-xl font-semibold"
          />
        </div>
        <Space>
          <Button
            type="text"
            icon={<RobotOutlined />}
            onClick={() => dispatch(toggleAIAssistant())}
          >
            AI 助手
          </Button>
          <Button
            type="text"
            icon={<ShareAltOutlined />}
            onClick={handleShare}
          >
            分享
          </Button>
          <Button
            type="primary"
            icon={<SaveOutlined />}
            onClick={handleSave}
            loading={saving}
          >
            保存
          </Button>
          <Dropdown menu={{ items: moreMenuItems }} placement="bottomRight">
            <Button type="text" icon={<MoreOutlined />} />
          </Dropdown>
        </Space>
      </Header>
      <Layout>
        <Content className="h-full overflow-hidden">
          <MarkdownEditor
            initialValue={currentContent?.content || ''}
            onChange={handleContentChange}
          />
        </Content>
      </Layout>

      <AIAssistant
        open={aiAssistantOpen}
        onClose={() => dispatch(toggleAIAssistant())}
        currentContent={currentContent?.content}
      />

      <Modal
        title="分享文档"
        open={isShareModalOpen}
        onCancel={() => setIsShareModalOpen(false)}
        footer={null}
        width={600}
      >
        <div className="mb-4">
          <h3 className="font-semibold mb-2">现有分享链接</h3>
          {shareLinks.length === 0 ? (
            <p className="text-gray-500">暂无分享链接</p>
          ) : (
            <Space direction="vertical" className="w-full">
              {shareLinks.map((link) => (
                <div key={link.id} className="flex justify-between items-center bg-gray-50 p-3 rounded">
                  <div>
                    <p className="text-sm">
                      {link.canEdit ? '可编辑' : '只读'}
                    </p>
                    <p className="text-xs text-gray-500 break-all">
                      {window.location.origin}/share/{link.token}
                    </p>
                  </div>
                  <Button
                    type="text"
                    danger
                    onClick={() => handleDeleteShare(link.id)}
                  >
                    删除
                  </Button>
                </div>
              ))}
            </Space>
          )}
        </div>
        <div className="border-t pt-4">
          <h3 className="font-semibold mb-2">创建新分享</h3>
          <Form form={form} onFinish={handleCreateShare} layout="vertical">
            <Form.Item
              name="canEdit"
              label="权限"
              valuePropName="checked"
              initialValue={false}
            >
              <input type="checkbox" />
              <span className="ml-2">允许编辑</span>
            </Form.Item>
            <Form.Item className="mb-0">
              <Button type="primary" htmlType="submit">
                创建分享链接
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Modal>
    </Layout>
  )
}

export default EditorPage
