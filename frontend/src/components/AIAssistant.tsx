import { useState } from 'react'
import { Drawer, Button, Input, List, Typography, Space } from 'antd'
import { RobotOutlined, SendOutlined } from '@ant-design/icons'
import { aiApi } from '../api'

const { TextArea } = Input
const { Text } = Typography

interface AIAssistantProps {
  open: boolean
  onClose: () => void
  currentContent?: string
}

const AIAssistant = ({ open, onClose, currentContent }: AIAssistantProps) => {
  const [prompt, setPrompt] = useState('')
  const [loading, setLoading] = useState(false)
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant'; content: string }[]>([])

  const handleGenerate = async () => {
    if (!prompt.trim()) return
    setLoading(true)
    const userMessage = { role: 'user' as const, content: prompt }
    setMessages((prev) => [...prev, userMessage])
    try {
      const response = await aiApi.generateContent({ prompt, context: currentContent })
      const assistantMessage = { role: 'assistant' as const, content: response.suggestion }
      setMessages((prev) => [...prev, assistantMessage])
      setPrompt('')
    } catch (error) {
      console.error('AI generation error:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleImprove = async () => {
    if (!currentContent) return
    setLoading(true)
    try {
      const response = await aiApi.improveContent({
        prompt: '请优化这段Markdown内容',
        context: currentContent,
      })
      const assistantMessage = { role: 'assistant' as const, content: response.suggestion }
      setMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      console.error('AI improve error:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSummarize = async () => {
    if (!currentContent) return
    setLoading(true)
    try {
      const response = await aiApi.summarizeContent({
        prompt: '请总结这段Markdown内容',
        context: currentContent,
      })
      const assistantMessage = { role: 'assistant' as const, content: response.suggestion }
      setMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      console.error('AI summarize error:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Drawer
      title={<Space><RobotOutlined />AI 助手</Space>}
      placement="right"
      onClose={onClose}
      open={open}
      width={400}
    >
      <div className="flex flex-col h-full">
        <Space wrap className="mb-4">
          <Button size="small" onClick={handleImprove} disabled={!currentContent}>
            优化内容
          </Button>
          <Button size="small" onClick={handleSummarize} disabled={!currentContent}>
            总结内容
          </Button>
        </Space>
        <div className="flex-1 overflow-y-auto mb-4">
          {messages.length === 0 ? (
            <div className="text-center text-gray-500 py-8">
              开始与 AI 助手对话吧！
            </div>
          ) : (
            <List
              dataSource={messages}
              renderItem={(item) => (
                <List.Item className={item.role === 'user' ? 'justify-end' : ''}>
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      item.role === 'user'
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100'
                    }`}
                  >
                    <Text className={item.role === 'user' ? 'text-white' : ''}>
                      {item.content}
                    </Text>
                  </div>
                </List.Item>
              )}
            />
          )}
        </div>
        <div className="flex gap-2">
          <TextArea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onPressEnter={(e) => {
              if (!e.shiftKey) {
                e.preventDefault()
                handleGenerate()
              }
            }}
            placeholder="输入您的需求..."
            autoSize={{ minRows: 1, maxRows: 4 }}
          />
          <Button
            type="primary"
            icon={<SendOutlined />}
            onClick={handleGenerate}
            loading={loading}
          />
        </div>
      </div>
    </Drawer>
  )
}

export default AIAssistant
