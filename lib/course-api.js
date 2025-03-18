export const API_SEVER =
  process.env.NODE_ENV === 'production'
    ? 'https://eventurearts-express.onrender.com'
    : 'http://localhost:3001/authorization'

export const PRODUCT = `${COURSE}/product/`
