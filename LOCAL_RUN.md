# 本地启动指南

本指南将详细说明如何在本地环境中启动和运行Markdown编辑器项目。

## 环境要求

在开始之前，请确保您的本地环境已安装以下软件：

- **Java 17** 或更高版本
- **Node.js 18** 或更高版本
- **MySQL 8.0** 或更高版本
- **Redis 7.0** 或更高版本
- **Maven 3.9** 或更高版本

## 数据库配置

1. **启动MySQL服务**
   - 确保MySQL服务已启动并运行
   - 默认端口：3306

2. **创建数据库**
   - 登录MySQL：`mysql -u root -p`
   - 创建数据库：`CREATE DATABASE markdown_editor CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;`
   - 退出MySQL：`exit`

3. **数据库初始化**
   - 后端项目使用Flyway进行数据库迁移
   - 启动后端服务时，会自动执行数据库初始化脚本

## Redis配置

1. **启动Redis服务**
   - 确保Redis服务已启动并运行
   - 默认端口：6379
   - 不需要密码

## 后端服务启动

1. **进入后端目录**
   ```bash
   cd backend
   ```

2. **构建项目**
   ```bash
   mvn clean package -DskipTests
   ```

3. **运行后端服务**
   ```bash
   mvn spring-boot:run
   ```

4. **验证后端服务**
   - 服务启动后，访问：http://localhost:8080/api/auth/login
   - 应该返回401未授权错误，这是正常的，说明服务已启动

## 前端服务启动

1. **进入前端目录**
   ```bash
   cd frontend
   ```

2. **安装依赖**
   ```bash
   npm install
   ```

3. **启动前端服务**
   ```bash
   npm run dev
   ```

4. **访问前端应用**
   - 服务启动后，访问：http://localhost:5173

## 项目访问

1. **注册新用户**
   - 访问 http://localhost:5173/register
   - 填写用户名、邮箱和密码
   - 点击"注册"按钮

2. **登录系统**
   - 访问 http://localhost:5173/login
   - 使用注册的用户名和密码登录

3. **创建和编辑文档**
   - 登录后，点击"新建文档"按钮
   - 进入编辑器页面，开始编写Markdown文档
   - 点击"保存"按钮保存文档

## 常见问题及解决方案

### 1. 数据库连接失败

**问题**：后端服务启动时，出现数据库连接失败的错误。

**解决方案**：
- 检查MySQL服务是否已启动
- 检查数据库名称、用户名和密码是否正确
- 检查application.yml配置文件中的数据库连接配置

### 2. Redis连接失败

**问题**：后端服务启动时，出现Redis连接失败的错误。

**解决方案**：
- 检查Redis服务是否已启动
- 检查application.yml配置文件中的Redis连接配置

### 3. 前端无法连接后端

**问题**：前端页面显示无法连接后端服务。

**解决方案**：
- 检查后端服务是否已启动
- 检查前端.env文件中的API URL配置是否正确
- 检查浏览器控制台是否有跨域错误

### 4. 注册失败

**问题**：注册时，前端显示注册失败，但后端返回成功。

**解决方案**：
- 检查前端auth.ts文件中的RegisterRequest接口是否包含nickname字段
- 检查后端UserService.java文件中的register方法是否正确处理nickname字段

### 5. 文档内容保存失败

**问题**：编辑文档时，保存按钮不生效，或保存后返回文档列表页面空白。

**解决方案**：
- 检查后端DocumentController.java文件中的getDocumentContent和saveDocumentContent方法是否正确实现
- 检查前端documentsSlice.ts文件中的saveDocumentContent thunk是否正确处理API响应

## 技术栈

- **后端**：Spring Boot 3.2.0, Java 17, MyBatis-Plus, MySQL, Redis, JWT
- **前端**：React 18, TypeScript, Vite, Ant Design, Redux Toolkit

## 项目结构

- **backend**：后端Spring Boot项目
- **frontend**：前端React项目

## 配置文件

- **后端配置**：backend/src/main/resources/application.yml
- **前端配置**：frontend/.env

## 注意事项

- 确保MySQL和Redis服务已启动
- 确保数据库已创建
- 确保后端服务先于前端服务启动
- 如有任何问题，请查看项目日志或浏览器控制台错误信息