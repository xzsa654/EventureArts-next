export const API_SEVER =
  process.env.NODE_ENV === 'production'
    ? 'https://eventurearts-express.onrender.com'
    : 'http://localhost:3001/authorization'

// 取得會員資料
export const USERDATA = `${API_SEVER}`

// 編輯會員資料
export const UPDATED = `${API_SEVER}/update`
