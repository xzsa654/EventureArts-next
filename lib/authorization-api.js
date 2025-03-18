export const API_SEVER =
  process.env.NODE_ENV === 'production'
    ? 'https://eventurearts-express.onrender.com'
    : 'http://localhost:3001/authorization'
// 第三方登入
export const FIREBASE_LOGIN = `${API_SEVER}/firebase-login`
// 忘記密碼 - 確認 email
export const VERIFY_EMAIL = `${API_SEVER}/verify-email`
// 忘記密碼 - 重設密碼
export const PASSWORD_RESET = `${API_SEVER}/reset-password`
// 取得資料表 - option
export const ALLOPTIONS = `${API_SEVER}/options`
// 註冊
export const REGISTER = `${API_SEVER}/register`
// 註冊 - 驗證 EMAIL
export const EMAIL_CHECKING = `${API_SEVER}/email-checking`
// 登入
export const LOGIN = `${API_SEVER}/login`

// oauth - google
export const OAUTHGOOGLE = `${API_SEVER}/google`

// oauth - facebook
export const OAUTHFACEBOOK = `${API_SEVER}/facebook`

// 取得月份展覽
export const CALENDAR = `${API_SEVER}/calendar`
