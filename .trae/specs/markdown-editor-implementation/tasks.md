# 多端在线Markdown编辑器 - 实现计划

## [x] 任务1: 后端项目初始化
- **优先级**: P0
- **依赖**: 无
- **描述**: 
  - 初始化Spring Boot 3.0+项目
  - 配置Maven依赖（Spring Boot Web, Data JPA, Validation, Security, JWT, MyBatis-Plus等）
  - 设置项目结构（controller, service, repository, entity, config, common, utils等）
  - 配置application.yml
- **验收标准**: 项目能够成功构建，基本结构搭建完成
- **测试要求**:
  - `programmatic` TR-1.1: 项目构建成功，无编译错误
  - `human-judgement` TR-1.2: 项目结构清晰，符合Spring Boot最佳实践
- **备注**: 使用Java 17+

## [x] 任务2: 数据库设计与初始化
- **优先级**: P0
- **依赖**: 任务1
- **描述**: 
  - 创建实体类（User, Document, DocumentContent, DocumentVersion, Folder, ShareLink等）
  - 配置MySQL数据库连接和MyBatis-Plus
  - 编写数据库初始化脚本
  - 配置Flyway/Liquibase进行数据库版本管理
- **验收标准**: 数据库表结构创建完成，ORM配置正确
- **测试要求**:
  - `programmatic` TR-2.1: 数据库连接成功
  - `programmatic` TR-2.2: 所有表结构创建成功
- **备注**: 使用UUID作为主键，创建必要的索引

## [x] 任务3: 用户认证模块实现
- **优先级**: P0
- **依赖**: 任务2
- **描述**: 
  - 实现用户注册、登录、注销功能
  - 实现JWT令牌生成与验证
  - 实现Spring Security配置和权限拦截器
  - 实现用户信息管理接口
- **验收标准**: 用户能够成功注册、登录，JWT认证正常工作
- **测试要求**:
  - `programmatic` TR-3.1: 注册接口测试通过
  - `programmatic` TR-3.2: 登录接口测试通过
  - `programmatic` TR-3.3: JWT验证测试通过
- **备注**: 后续可扩展OAuth2支持第三方登录

## [x] 任务4: 文档管理模块实现
- **优先级**: P0
- **依赖**: 任务3
- **描述**: 
  - 实现文档CRUD操作接口
  - 实现文件夹管理接口
  - 实现文档版本控制功能
  - 实现文档分享功能
  - 实现自动保存机制
- **验收标准**: 文档和文件夹管理功能正常，版本控制和分享功能工作正常
- **测试要求**:
  - `programmatic` TR-4.1: 文档CRUD测试通过
  - `programmatic` TR-4.2: 文件夹管理测试通过
  - `programmatic` TR-4.3: 版本控制测试通过
  - `programmatic` TR-4.4: 文档分享测试通过
- **备注**: 实现文档内容和元数据分离存储

## [x] 任务5: 实时协作模块实现
- **优先级**: P1
- **依赖**: 任务4
- **描述**: 
  - 实现WebSocket服务
  - 集成Y.js CRDT算法
  - 实现协作状态管理
  - 实现用户加入/离开通知
- **验收标准**: 多人实时协作功能正常，冲突处理正确
- **测试要求**:
  - `programmatic` TR-5.1: WebSocket连接测试通过
  - `programmatic` TR-5.2: 实时同步测试通过
  - `programmatic` TR-5.3: 冲突处理测试通过
- **备注**: 使用Redis缓存协作会话状态

## [x] 任务6: AI辅助模块实现
- **优先级**: P1
- **依赖**: 任务4
- **描述**: 
  - 集成本地Ollama Qwen3.5大模型
  - 实现文章润色功能
  - 实现摘要生成功能
  - 实现内容建议功能
  - 实现异步任务处理和结果缓存
- **验收标准**: AI辅助功能正常工作，响应时间合理
- **测试要求**:
  - `programmatic` TR-6.1: 文章润色测试通过
  - `programmatic` TR-6.2: 摘要生成测试通过
  - `programmatic` TR-6.3: 内容建议测试通过
- **备注**: 实现服务降级机制

## [x] 任务7: 存储模块实现
- **优先级**: P1
- **依赖**: 任务4
- **描述**: 
  - 实现文件上传功能
  - 集成MinIO对象存储
  - 实现文档导出功能（HTML、PDF、Markdown）
- **验收标准**: 文件上传和导出功能正常，存储服务集成成功
- **测试要求**:
  - `programmatic` TR-7.1: 文件上传测试通过
  - `programmatic` TR-7.2: 文档导出测试通过
- **备注**: 支持大文件分片上传

## [x] 任务8: 前端项目初始化
- **优先级**: P0
- **依赖**: 无
- **描述**: 
  - 初始化React 18 + TypeScript + Vite项目
  - 配置项目依赖（Ant Design, Redux Toolkit, React Router, Tailwind CSS等）
  - 设置项目结构
  - 配置路由和状态管理
- **验收标准**: 前端项目能够成功构建，基本结构搭建完成
- **测试要求**:
  - `programmatic` TR-8.1: 项目构建成功，无编译错误
  - `human-judgement` TR-8.2: 项目结构清晰，符合React最佳实践
- **备注**: 配置ESLint和Prettier

## [x] 任务9: 编辑器核心功能实现
- **优先级**: P0
- **依赖**: 任务8
- **描述**: 
  - 集成Monaco Editor
  - 实现Markdown渲染
  - 实现实时预览功能
  - 实现语法高亮
  - 实现工具栏与快捷键
  - 实现数学公式和Mermaid图表支持
- **验收标准**: 编辑器功能正常，用户体验良好
- **测试要求**:
  - `programmatic` TR-9.1: 编辑器基本功能测试通过
  - `human-judgement` TR-9.2: 编辑器用户体验良好
- **备注**: 使用markdown-it和相关插件

## [x] 任务10: 前端集成与测试
- **优先级**: P1
- **依赖**: 任务3, 4, 5, 6, 7, 9
- **描述**: 
  - 前端与后端API集成
  - 实现实时协作功能前端
  - 实现AI辅助功能前端
  - 实现响应式设计
  - 实现PWA支持和离线编辑
- **验收标准**: 前端与后端完全集成，所有功能正常工作
- **测试要求**:
  - `programmatic` TR-10.1: API集成测试通过
  - `programmatic` TR-10.2: 实时协作前端测试通过
  - `programmatic` TR-10.3: AI辅助功能前端测试通过
  - `human-judgement` TR-10.4: 响应式设计测试通过
- **备注**: 使用Service Worker实现离线功能

## [x] 任务11: Docker配置与部署
- **优先级**: P1
- **依赖**: 任务1-10
- **描述**: 
  - 创建后端Dockerfile
  - 创建前端Dockerfile
  - 配置docker-compose.yml（包含MySQL, Redis, Ollama, MinIO等）
  - 测试Docker部署
  - 确保在Win11系统上正常运行
- **验收标准**: 系统可以在Win11系统的Docker上正常运行
- **测试要求**:
  - `programmatic` TR-11.1: Docker容器构建成功
  - `programmatic` TR-11.2: 所有服务启动正常
  - `programmatic` TR-11.3: 系统功能测试通过
- **备注**: 配置Ollama容器部署Qwen3.5大模型

