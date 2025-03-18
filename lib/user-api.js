export const API_SEVER =
  process.env.NODE_ENV === 'production'
    ? 'https://eventurearts-express.onrender.com/user'
    : 'http://localhost:3001/user'

// 取得會員資料
export const USERDATA = `${API_SEVER}`

// 編輯會員資料
export const UPDATED = `${API_SEVER}/update`
