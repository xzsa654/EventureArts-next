'use client'
import { createContext } from 'react'
const AuthContext = createContext()
import { FIREBASE_LOGIN } from '@/lib/authorization-api'
import React, { useState, useEffect } from 'react'
import { set } from 'react-hook-form'

export function AuthContextProvider({ children }) {
  const storageKey = 'EventureArts-auth'
  const defaultAuth = {
    user_id: 0,
    name: '',
    nickname: '',
    user_email: '',
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
  // firebase 登入
  const firebaseLogin = async (token) => {
    const res = await fetch(FIREBASE_LOGIN, {
      headers: { Authorization: 'Bearers ' + token },
    })
    const result = await res.json()
    if (result.success) {
      setAuth({ ...result })
      localStorage.setItem(storageKey, JSON.stringify(auth))
    }
  }

  // 登入
  const login = (obj) => {
    setAuth(obj)
    localStorage.setItem(storageKey, JSON.stringify(obj))
  }

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
      <AuthContext.Provider value={{ firebaseLogin }}>
        {children}
      </AuthContext.Provider>
    </>
  )
}
export default AuthContext
