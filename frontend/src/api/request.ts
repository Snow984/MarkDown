// 模拟API请求配置
export default {
  get: async () => Promise.resolve({ data: { data: [] } }),
  post: async () => Promise.resolve({ data: { data: {} } }),
  patch: async () => Promise.resolve({ data: { data: {} } }),
  delete: async () => Promise.resolve({ data: { data: {} } }),
  put: async () => Promise.resolve({ data: { data: {} } })
}