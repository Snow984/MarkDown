# 多端在线Markdown编辑器API接口文档

## 1. 接口概览

### 1.1 基础信息
- **API Base URL**: `https://api.example.com`
- **认证方式**: JWT Bearer Token
- **请求格式**: JSON
- **响应格式**: JSON
- **错误处理**: 统一错误响应格式

### 1.2 错误响应格式
```json
{
  "code": 400,
  "message": "Bad Request",
  "details": "Invalid parameter"
}
```

## 2. 认证接口

### 2.1 用户注册
- **URL**: `/api/auth/register`
- **方法**: `POST`
- **请求体**:
  ```json
  {
    "username": "string",
    "email": "string",
    "password": "string"
  }
  ```
- **响应**:
  - 成功 (201):
    ```json
    {
      "id": "uuid",
      "username": "string",
      "email": "string",
      "token": "string"
    }
    ```

### 2.2 用户登录
- **URL**: `/api/auth/login`
- **方法**: `POST`
- **请求体**:
  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```
- **响应**:
  - 成功 (200):
    ```json
    {
      "id": "uuid",
      "username": "string",
      "email": "string",
      "token": "string"
    }
    ```

### 2.3 用户注销
- **URL**: `/api/auth/logout`
- **方法**: `POST`
- **请求头**:
  - `Authorization: Bearer {token}`
- **响应**:
  - 成功 (200):
    ```json
    {
      "message": "Logout successful"
    }
    ```

## 3. 用户接口

### 3.1 获取当前用户信息
- **URL**: `/api/users/me`
- **方法**: `GET`
- **请求头**:
  - `Authorization: Bearer {token}`
- **响应**:
  - 成功 (200):
    ```json
    {
      "id": "uuid",
      "username": "string",
      "email": "string",
      "avatar": "string",
      "created_at": "2023-01-01T00:00:00Z"
    }
    ```

### 3.2 更新用户信息
- **URL**: `/api/users/me`
- **方法**: `PUT`
- **请求头**:
  - `Authorization: Bearer {token}`
- **请求体**:
  ```json
  {
    "username": "string",
    "avatar": "string"
  }
  ```
- **响应**:
  - 成功 (200):
    ```json
    {
      "id": "uuid",
      "username": "string",
      "email": "string",
      "avatar": "string",
      "updated_at": "2023-01-01T00:00:00Z"
    }
    ```

### 3.3 获取用户信息
- **URL**: `/api/users/{id}`
- **方法**: `GET`
- **响应**:
  - 成功 (200):
    ```json
    {
      "id": "uuid",
      "username": "string",
      "avatar": "string",
      "created_at": "2023-01-01T00:00:00Z"
    }
    ```

## 4. 文档接口

### 4.1 获取文档列表
- **URL**: `/api/documents`
- **方法**: `GET`
- **请求头**:
  - `Authorization: Bearer {token}`
- **查询参数**:
  - `folder_id`: 文件夹ID (可选)
  - `page`: 页码 (默认: 1)
  - `page_size`: 每页数量 (默认: 20)
- **响应**:
  - 成功 (200):
    ```json
    {
      "total": 100,
      "page": 1,
      "page_size": 20,
      "items": [
        {
          "id": "uuid",
          "title": "string",
          "folder_id": "uuid",
          "is_public": false,
          "created_at": "2023-01-01T00:00:00Z",
          "updated_at": "2023-01-01T00:00:00Z",
          "last_edited_by": "uuid",
          "last_edited_at": "2023-01-01T00:00:00Z"
        }
      ]
    }
    ```

### 4.2 创建文档
- **URL**: `/api/documents`
- **方法**: `POST`
- **请求头**:
  - `Authorization: Bearer {token}`
- **请求体**:
  ```json
  {
    "title": "string",
    "content": "string",
    "folder_id": "uuid",
    "is_public": false
  }
  ```
- **响应**:
  - 成功 (201):
    ```json
    {
      "id": "uuid",
      "title": "string",
      "content": "string",
      "folder_id": "uuid",
      "is_public": false,
      "created_at": "2023-01-01T00:00:00Z",
      "updated_at": "2023-01-01T00:00:00Z",
      "last_edited_by": "uuid",
      "last_edited_at": "2023-01-01T00:00:00Z"
    }
    ```

### 4.3 获取文档详情
- **URL**: `/api/documents/{id}`
- **方法**: `GET`
- **请求头**:
  - `Authorization: Bearer {token}` (可选，分享链接访问不需要)
- **响应**:
  - 成功 (200):
    ```json
    {
      "id": "uuid",
      "title": "string",
      "content": "string",
      "folder_id": "uuid",
      "is_public": false,
      "created_at": "2023-01-01T00:00:00Z",
      "updated_at": "2023-01-01T00:00:00Z",
      "last_edited_by": "uuid",
      "last_edited_at": "2023-01-01T00:00:00Z"
    }
    ```

### 4.4 更新文档
- **URL**: `/api/documents/{id}`
- **方法**: `PUT`
- **请求头**:
  - `Authorization: Bearer {token}`
- **请求体**:
  ```json
  {
    "title": "string",
    "content": "string",
    "folder_id": "uuid",
    "is_public": false
  }
  ```
- **响应**:
  - 成功 (200):
    ```json
    {
      "id": "uuid",
      "title": "string",
      "content": "string",
      "folder_id": "uuid",
      "is_public": false,
      "updated_at": "2023-01-01T00:00:00Z",
      "last_edited_by": "uuid",
      "last_edited_at": "2023-01-01T00:00:00Z"
    }
    ```

### 4.5 删除文档
- **URL**: `/api/documents/{id}`
- **方法**: `DELETE`
- **请求头**:
  - `Authorization: Bearer {token}`
- **响应**:
  - 成功 (200):
    ```json
    {
      "message": "Document deleted successfully"
    }
    ```

### 4.6 获取文档版本历史
- **URL**: `/api/documents/{id}/versions`
- **方法**: `GET`
- **请求头**:
  - `Authorization: Bearer {token}`
- **响应**:
  - 成功 (200):
    ```json
    [
      {
        "id": "uuid",
        "version_number": 1,
        "created_at": "2023-01-01T00:00:00Z",
        "created_by": "uuid",
        "comment": "Initial version"
      }
    ]
    ```

### 4.7 获取特定版本
- **URL**: `/api/documents/{id}/versions/{version}`
- **方法**: `GET`
- **请求头**:
  - `Authorization: Bearer {token}`
- **响应**:
  - 成功 (200):
    ```json
    {
      "id": "uuid",
      "version_number": 1,
      "content": "string",
      "created_at": "2023-01-01T00:00:00Z",
      "created_by": "uuid",
      "comment": "Initial version"
    }
    ```

### 4.8 创建分享链接
- **URL**: `/api/documents/{id}/share`
- **方法**: `POST`
- **请求头**:
  - `Authorization: Bearer {token}`
- **请求体**:
  ```json
  {
    "permission": "read" or "write",
    "expires_at": "2023-01-01T00:00:00Z"
  }
  ```
- **响应**:
  - 成功 (201):
    ```json
    {
      "id": "uuid",
      "token": "string",
      "permission": "read" or "write",
      "expires_at": "2023-01-01T00:00:00Z",
      "share_url": "https://example.com/shared/{token}"
    }
    ```

### 4.9 获取共享文档
- **URL**: `/api/documents/shared`
- **方法**: `GET`
- **请求头**:
  - `Authorization: Bearer {token}`
- **响应**:
  - 成功 (200):
    ```json
    [
      {
        "id": "uuid",
        "title": "string",
        "shared_by": "uuid",
        "permission": "read" or "write",
        "shared_at": "2023-01-01T00:00:00Z"
      }
    ]
    ```

## 5. 文件夹接口

### 5.1 获取文件夹列表
- **URL**: `/api/folders`
- **方法**: `GET`
- **请求头**:
  - `Authorization: Bearer {token}`
- **查询参数**:
  - `parent_id`: 父文件夹ID (可选，默认根目录)
- **响应**:
  - 成功 (200):
    ```json
    [
      {
        "id": "uuid",
        "name": "string",
        "parent_id": "uuid",
        "created_at": "2023-01-01T00:00:00Z",
        "updated_at": "2023-01-01T00:00:00Z"
      }
    ]
    ```

### 5.2 创建文件夹
- **URL**: `/api/folders`
- **方法**: `POST`
- **请求头**:
  - `Authorization: Bearer {token}`
- **请求体**:
  ```json
  {
    "name": "string",
    "parent_id": "uuid"
  }
  ```
- **响应**:
  - 成功 (201):
    ```json
    {
      "id": "uuid",
      "name": "string",
      "parent_id": "uuid",
      "created_at": "2023-01-01T00:00:00Z",
      "updated_at": "2023-01-01T00:00:00Z"
    }
    ```

### 5.3 更新文件夹
- **URL**: `/api/folders/{id}`
- **方法**: `PUT`
- **请求头**:
  - `Authorization: Bearer {token}`
- **请求体**:
  ```json
  {
    "name": "string",
    "parent_id": "uuid"
  }
  ```
- **响应**:
  - 成功 (200):
    ```json
    {
      "id": "uuid",
      "name": "string",
      "parent_id": "uuid",
      "updated_at": "2023-01-01T00:00:00Z"
    }
    ```

### 5.4 删除文件夹
- **URL**: `/api/folders/{id}`
- **方法**: `DELETE`
- **请求头**:
  - `Authorization: Bearer {token}`
- **响应**:
  - 成功 (200):
    ```json
    {
      "message": "Folder deleted successfully"
    }
    ```

## 6. 协作接口

### 6.1 加入协作会话
- **URL**: `/api/collaboration/{documentId}/join`
- **方法**: `GET`
- **请求头**:
  - `Authorization: Bearer {token}`
- **响应**:
  - 成功 (200):
    ```json
    {
      "session_id": "string",
      "websocket_url": "wss://api.example.com/ws/collaboration/{sessionId}"
    }
    ```

### 6.2 离开协作会话
- **URL**: `/api/collaboration/{documentId}/leave`
- **方法**: `POST`
- **请求头**:
  - `Authorization: Bearer {token}`
- **响应**:
  - 成功 (200):
    ```json
    {
      "message": "Left collaboration session successfully"
    }
    ```

### 6.3 获取当前协作用户
- **URL**: `/api/collaboration/{documentId}/users`
- **方法**: `GET`
- **请求头**:
  - `Authorization: Bearer {token}`
- **响应**:
  - 成功 (200):
    ```json
    [
      {
        "id": "uuid",
        "username": "string",
        "avatar": "string",
        "joined_at": "2023-01-01T00:00:00Z"
      }
    ]
    ```

## 7. AI接口

### 7.1 文章润色
- **URL**: `/api/ai/improve`
- **方法**: `POST`
- **请求头**:
  - `Authorization: Bearer {token}`
- **请求体**:
  ```json
  {
    "content": "string",
    "document_id": "uuid"
  }
  ```
- **响应**:
  - 成功 (200):
    ```json
    {
      "improved_content": "string",
      "suggestions": [
        "string"
      ]
    }
    ```

### 7.2 生成摘要
- **URL**: `/api/ai/summary`
- **方法**: `POST`
- **请求头**:
  - `Authorization: Bearer {token}`
- **请求体**:
  ```json
  {
    "content": "string",
    "document_id": "uuid"
  }
  ```
- **响应**:
  - 成功 (200):
    ```json
    {
      "summary": "string"
    }
    ```

### 7.3 获取内容建议
- **URL**: `/api/ai/suggestions`
- **方法**: `POST`
- **请求头**:
  - `Authorization: Bearer {token}`
- **请求体**:
  ```json
  {
    "content": "string",
    "document_id": "uuid",
    "context": "string"
  }
  ```
- **响应**:
  - 成功 (200):
    ```json
    {
      "suggestions": [
        "string"
      ]
    }
    ```

### 7.4 Ollama模型管理
- **URL**: `/api/ai/models`
- **方法**: `GET`
- **请求头**:
  - `Authorization: Bearer {token}`
- **响应**:
  - 成功 (200):
    ```json
    {
      "models": [
        {
          "name": "qwen3.5",
          "status": "active",
          "version": "1.0"
        }
      ]
    }
    ```

## 8. 存储接口

### 8.1 上传文件
- **URL**: `/api/storage/upload`
- **方法**: `POST`
- **请求头**:
  - `Authorization: Bearer {token}`
  - `Content-Type: multipart/form-data`
- **请求体**:
  - `file`: 文件
  - `document_id`: 文档ID (可选)
- **响应**:
  - 成功 (200):
    ```json
    {
      "id": "uuid",
      "url": "string",
      "filename": "string",
      "size": 1024,
      "type": "image/png"
    }
    ```

### 8.2 获取文件
- **URL**: `/api/storage/{fileId}`
- **方法**: `GET`
- **响应**:
  - 成功 (200): 文件内容

### 8.3 导出文档
- **URL**: `/api/documents/{id}/export`
- **方法**: `POST`
- **请求头**:
  - `Authorization: Bearer {token}`
- **请求体**:
  ```json
  {
    "format": "html" or "pdf" or "markdown"
  }
  ```
- **响应**:
  - 成功 (200): 文件内容

## 9. 插件接口

### 9.1 获取插件列表
- **URL**: `/api/plugins`
- **方法**: `GET`
- **请求头**:
  - `Authorization: Bearer {token}`
- **响应**:
  - 成功 (200):
    ```json
    [
      {
        "id": "string",
        "name": "string",
        "version": "string",
        "description": "string",
        "installed": true
      }
    ]
    ```

### 9.2 安装插件
- **URL**: `/api/plugins/install`
- **方法**: `POST`
- **请求头**:
  - `Authorization: Bearer {token}`
- **请求体**:
  ```json
  {
    "plugin_id": "string"
  }
  ```
- **响应**:
  - 成功 (200):
    ```json
    {
      "message": "Plugin installed successfully"
    }
    ```

### 9.3 卸载插件
- **URL**: `/api/plugins/uninstall`
- **方法**: `POST`
- **请求头**:
  - `Authorization: Bearer {token}`
- **请求体**:
  ```json
  {
    "plugin_id": "string"
  }
  ```
- **响应**:
  - 成功 (200):
    ```json
    {
      "message": "Plugin uninstalled successfully"
    }
    ```

## 10. WebSocket接口

### 10.1 协作WebSocket
- **URL**: `wss://api.example.com/ws/collaboration/{sessionId}`
- **消息格式**:
  - 客户端发送:
    ```json
    {
      "type": "update",
      "data": {
        "operations": ["string"],
        "document_id": "uuid"
      }
    }
    ```
  - 服务器发送:
    ```json
    {
      "type": "update",
      "data": {
        "operations": ["string"],
        "user_id": "uuid"
      }
    }
    ```
    ```json
    {
      "type": "user_joined",
      "data": {
        "user": {
          "id": "uuid",
          "username": "string",
          "avatar": "string"
        }
      }
    }
    ```
    ```json
    {
      "type": "user_left",
      "data": {
        "user_id": "uuid"
      }
    }
    ```