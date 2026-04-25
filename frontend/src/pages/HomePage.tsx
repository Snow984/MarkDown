import { Typography, Button } from 'antd'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../constants/routes'

const { Title, Paragraph } = Typography

const HomePage = () => {
  const navigate = useNavigate()
  
  return (
    <div className="max-w-4xl mx-auto">
      <Title>欢迎使用 Markdown Editor</Title>
      <Paragraph>
        这是一个功能强大的 Markdown 编辑器，支持实时预览、文档管理和分享功能。
      </Paragraph>
      <Button 
        type="primary" 
        size="large"
        onClick={() => navigate(ROUTES.EDITOR)}
        style={{ borderRadius: '8px' }}
      >
        打开编辑器
      </Button>
    </div>
  )
}

export default HomePage