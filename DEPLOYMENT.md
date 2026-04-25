# Docker 部署指南

本项目使用 Docker Compose 进行部署，支持在 Windows 11 系统上运行。

## 系统要求

- Windows 11
- Docker Desktop for Windows
- Java 17 (用于编译后端)
- Node.js 18 (可选，如需本地开发)
- Maven 3.8+ (用于编译后端)

## 部署步骤

### 1. 准备工作

确保已安装 Docker Desktop 并启动。

### 2. 编译后端

```bash
cd backend
mvn clean package -DskipTests
```

这将在 `backend/target/` 目录下生成 `editor-backend-1.0.0.jar` 文件。

### 3. 启动所有服务

在项目根目录执行：

```bash
docker-compose up -d
```

### 4. 查看服务状态

```bash
docker-compose ps
```

### 5. 查看日志

```bash
# 查看所有服务日志
docker-compose logs -f

# 查看特定服务日志
docker-compose logs -f backend
docker-compose logs -f frontend
```

## 服务访问地址

部署完成后，可通过以下地址访问各服务：

| 服务 | 地址 | 说明 |
|------|------|------|
| 前端应用 | http://localhost:3000 | 主应用入口 |
| 后端API | http://localhost:8080 | API服务 |
| MySQL | localhost:3306 | 数据库 |
| Redis | localhost:6379 | 缓存 |
| MinIO控制台 | http://localhost:9001 | 对象存储管理（账号: minioadmin / minioadmin123） |
| MinIO API | http://localhost:9000 | 对象存储API |
| Ollama | http://localhost:11434 | AI服务 |

## 配置Ollama模型（可选）

如需使用AI功能，需要先在Ollama中下载模型：

```bash
# 进入Ollama容器
docker exec -it markdown-editor-ollama bash

# 下载qwen3.5模型
ollama pull qwen2.5:7b
```

## 停止服务

```bash
docker-compose down
```

## 清理数据（慎用）

如需完全清理所有数据和容器：

```bash
docker-compose down -v
```

## 常见问题

### 端口被占用
如果遇到端口被占用的情况，可以修改 `docker-compose.yml` 中的端口映射。

### 容器启动失败
查看日志排查问题：
```bash
docker-compose logs
```

### Windows 文件路径问题
在 Windows 上使用 Docker Desktop 时，确保已启用 WSL 2 后端，并正确配置了文件共享。
