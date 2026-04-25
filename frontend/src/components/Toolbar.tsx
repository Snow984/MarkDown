import { Button, Tooltip } from 'antd'

interface ToolbarProps {
  onInsertText: (before: string, after?: string) => void
  onInsertBlock: (prefix: string, suffix?: string) => void
}

const Toolbar = ({ onInsertText, onInsertBlock }: ToolbarProps) => {
  const buttons = [
    { key: 'bold', label: 'B', tooltip: '粗体', before: '**', after: '**' },
    { key: 'italic', label: 'I', tooltip: '斜体', before: '*', after: '*' },
    { key: 'strikethrough', label: 'S', tooltip: '删除线', before: '~~', after: '~~' },
    { key: 'h1', label: 'H1', tooltip: '标题1', block: '# ' },
    { key: 'h2', label: 'H2', tooltip: '标题2', block: '## ' },
    { key: 'h3', label: 'H3', tooltip: '标题3', block: '### ' },
    { key: 'link', label: '🔗', tooltip: '链接', before: '[', after: '](url)' },
    { key: 'image', label: '🖼️', tooltip: '图片', before: '![', after: '](url)' },
    { key: 'code', label: '`', tooltip: '行内代码', before: '`', after: '`' },
    { key: 'code-block', label: 'Code', tooltip: '代码块', block: '```', after: '```' },
    { key: 'quote', label: '>', tooltip: '引用', block: '> ' },
    { key: 'ul', label: '•', tooltip: '无序列表', block: '- ' },
    { key: 'ol', label: '1.', tooltip: '有序列表', block: '1. ' },
    { key: 'table', label: '📊', tooltip: '表格', block: '| Header | Header |\n| ---- | ---- |\n| Cell | Cell |\n' },
    { key: 'math', label: '∑', tooltip: '数学公式', before: '$', after: '$' },
    { key: 'mermaid', label: '📈', tooltip: 'Mermaid图表', block: '```mermaid\n', after: '\n```' },
  ]

  return (
    <div className="flex flex-wrap gap-1 p-2 bg-gray-50 border-b border-gray-200">
      {buttons.map((btn) => (
        <Tooltip key={btn.key} title={btn.tooltip}>
          <Button
            type="text"
            size="small"
            className="w-8 h-8 flex items-center justify-center"
            onClick={() => {
              if (btn.block) {
                onInsertBlock(btn.block, btn.after)
              } else {
                onInsertText(btn.before!, btn.after)
              }
            }}
          >
            {btn.label}
          </Button>
          </Tooltip>
      ))}
    </div>
  )
}

export default Toolbar

