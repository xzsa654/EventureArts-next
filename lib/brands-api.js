export const API_SEVER =
  process.env.NODE_ENV === 'production'
    ? 'https://eventurearts-express.onrender.com/brands'
    : 'http://localhost:3001/brands'

// 取得品牌的資料
export const BRANDSDATA = API_SEVER

// 新增品牌
export const ADDBRAND = `${API_SEVER}/join-us`
