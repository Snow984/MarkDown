import { useState, useEffect, useRef, useCallback } from 'react'
import Editor from '@monaco-editor/react'
import { debounce } from 'lodash'
import markdownit from 'markdown-it'
import markdownitHighlightjs from 'markdown-it-highlightjs'
import hljs from 'highlight.js'
import mermaid from 'mermaid'
import Toolbar from './Toolbar'
import 'highlight.js/styles/github.css'
import 'katex/dist/katex.min.css'

interface MarkdownEditorProps {
  initialValue?: string
  onChange?: (value: string) => void
}

const defaultContent = `# Markdown 编辑器

欢迎使用功能强大的 Markdown 编辑器！

## 特性

- **实时预览**：编辑时立即看到效果
- **代码高亮**：支持多种编程语言
- **数学公式**：使用 KaTeX 渲染 LaTeX
- **Mermaid 图表**：绘制流程图、时序图等

## 代码示例

\`\`\`javascript
function hello() {
  console.log('Hello, world!');
}
\`\`\`

## 数学公式

行内公式：$E = mc^2$

块级公式：

$$
\\int_{-\\infty}^{\\infty} e^{-x^2} dx = \\sqrt{\\pi}
$$

## Mermaid 图表

\`\`\`mermaid
graph LR
    A[开始] --> B{是否完成?}
    B -->|是| C[结束]
    B -->|否| D[继续工作]
    D --> B
\`\`\`

## 表格

| 功能 | 状态 |
| ---- | ---- |
| 编辑器 | ✅ |
| 预览 | ✅ |
| 工具栏 | ✅ |
`

const MarkdownEditor = ({ initialValue = defaultContent, onChange }: MarkdownEditorProps) => {
  const [value, setValue] = useState(initialValue)
  const [html, setHtml] = useState('')
  const previewRef = useRef<HTMLDivElement>(null)

  const md = markdownit({
    html: true,
    breaks: true,
    linkify: true,
  })
    .use(markdownitHighlightjs, { hljs })

  const renderMarkdown = useCallback((text: string) => {
    let renderedHtml = md.render(text)
    
    const mermaidBlocks = previewRef.current?.querySelectorAll('.language-mermaid')
    if (mermaidBlocks) {
      mermaidBlocks.forEach((block, index) => {
        try {
          const content = block.textContent || ''
          mermaid.render(`mermaid-${index}`, content).then(({ svg }) => {
            const div = document.createElement('div')
            div.innerHTML = svg
            block.parentElement?.replaceWith(div)
          })
        } catch (err) {
          console.error('Mermaid render error:', err)
        }
      })
    }
    
    return renderedHtml
  }, [])

  useEffect(() => {
    mermaid.initialize({ startOnLoad: false, theme: 'default' })
  }, [])

  const debouncedRender = useCallback(
    debounce((text: string) => {
      setHtml(renderMarkdown(text))
    }, 300),
    [renderMarkdown]
  )

  useEffect(() => {
    setHtml(renderMarkdown(value))
  }, [value, renderMarkdown])

  const handleEditorChange = (newValue?: string) => {
    const finalValue = newValue || ''
    setValue(finalValue)
    onChange?.(finalValue)
    debouncedRender(finalValue)
  }

  const handleInsertText = (before: string, after = '') => {
    setValue((prev) => prev + before + after)
  }

  const handleInsertBlock = (prefix: string, suffix = '') => {
    setValue((prev) => prev + '\n' + prefix + suffix)
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey)) {
        switch (e.key) {
          case 'b':
            e.preventDefault()
            handleInsertText('**', '**')
            break
          case 'i':
            e.preventDefault()
            handleInsertText('*', '*')
            break
        }
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <div className="flex flex-col h-full">
      <Toolbar onInsertText={handleInsertText} onInsertBlock={handleInsertBlock} />
      <div className="flex flex-1 overflow-hidden">
        <div className="w-1/2 h-full border-r border-gray-200">
          <Editor
            height="100%"
            defaultLanguage="markdown"
            value={value}
            onChange={handleEditorChange}
            theme="vs-light"
            options={{
              minimap: { enabled: false },
              wordWrap: 'on',
              lineNumbers: 'on',
              automaticLayout: true,
              fontSize: 14,
            }}
          />
        </div>
        <div className="w-1/2 h-full overflow-y-auto p-6 bg-white">
          <div
            ref={previewRef}
            className="prose prose-slate max-w-none"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </div>
      </div>
    </div>
  )
}

export default MarkdownEditor

