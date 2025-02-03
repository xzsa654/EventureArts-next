'use client'
import { createContext } from 'react'
const AuthContext = createContext()

import React, { useState, useEffect } from 'react'

export function AuthContextProvider({ children }) {
  const storageKey = 'EventureArts-auth'
  const defaultAuth = {
    id: 0,
    name: '',
    nickName: '',
    email: '',
    avatar: '',
    token: '',
  }
  const [auth, setAuth] = useState(defaultAuth)
  useEffect(() => {
    const str = localStorage.getItem(storageKey)
    try {
      const data = JSON.parse(str)
      setAuth(data)
    } catch (error) {
      console.log(error)
    }
  }, [])
  // 登出
  const logOut = () => {
    localStorage.removeItem(storageKey)
    setAuth({ ...defaultAuth })
  }
  // 驗證登入狀態憑證
  const getAuthHeader = () => {
    if (!auth.token) {
      return {}
    } else {
      // 設置到需要驗證登入狀態的 headers
      return { Authorization: 'Bearer ' + auth.token }
    }
  }
  return (
    <>
      <AuthContext.Provider value={''}>{children}</AuthContext.Provider>
    </>
  )
}
export default AuthContext
