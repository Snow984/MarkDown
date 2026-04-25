import type { User, Document, DocumentContent, Folder, DocumentVersion, ShareLink } from '../types'

// 模拟用户数据
export const mockUser: User = {
  id: 1,
  username: 'demo',
  email: 'demo@example.com',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
}

// 模拟文件夹数据
export const mockFolders: Folder[] = [
  {
    id: 1,
    name: '工作',
    parentId: null,
    userId: 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 2,
    name: '个人',
    parentId: null,
    userId: 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
]

// 模拟文档数据
export const mockDocuments: Document[] = [
  {
    id: 1,
    title: '项目计划',
    folderId: 1,
    userId: 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 2,
    title: '会议纪要',
    folderId: 1,
    userId: 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 3,
    title: '个人笔记',
    folderId: 2,
    userId: 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
]

// 模拟文档内容数据
export const mockDocumentContents: Record<number, DocumentContent> = {
  1: {
    id: 1,
    documentId: 1,
    content: '# 项目计划\n\n## 项目目标\n\n- 完成Markdown编辑器开发\n- 实现文档管理功能\n- 添加AI助手功能\n\n## 时间规划\n\n- 第1周：需求分析和技术选型\n- 第2-3周：后端开发\n- 第4-5周：前端开发\n- 第6周：测试和部署\n',
    createdAt: new Date().toISOString()
  },
  2: {
    id: 2,
    documentId: 2,
    content: '# 会议纪要\n\n## 会议时间\n\n2026年4月25日\n\n## 参会人员\n\n- 张三\n- 李四\n- 王五\n\n## 会议内容\n\n1. 讨论了项目进度\n2. 确定了下阶段任务\n3. 解决了技术难题\n',
    createdAt: new Date().toISOString()
  },
  3: {
    id: 3,
    documentId: 3,
    content: '# 个人笔记\n\n## 学习计划\n\n- 学习React\n- 学习TypeScript\n- 学习Redux\n\n## 生活记录\n\n- 今天天气很好\n- 完成了健身计划\n- 读了一本书\n',
    createdAt: new Date().toISOString()
  }
}

// 模拟文档版本数据
export const mockDocumentVersions: Record<number, DocumentVersion[]> = {
  1: [
    {
      id: 1,
      documentId: 1,
      versionNumber: 1,
      content: '# 项目计划\n\n## 项目目标\n\n- 完成Markdown编辑器开发\n',
      createdAt: new Date().toISOString()
    },
    {
      id: 2,
      documentId: 1,
      versionNumber: 2,
      content: '# 项目计划\n\n## 项目目标\n\n- 完成Markdown编辑器开发\n- 实现文档管理功能\n',
      createdAt: new Date().toISOString()
    }
  ]
}

// 模拟分享链接数据
export const mockShareLinks: Record<number, ShareLink[]> = {
  1: [
    {
      id: 1,
      documentId: 1,
      token: 'abc123',
      expiresAt: null,
      canEdit: false,
      createdAt: new Date().toISOString()
    }
  ]
}

// 模拟AI助手响应
export const mockAIResponse = {
  suggestion: '这是AI生成的内容建议...'
}
