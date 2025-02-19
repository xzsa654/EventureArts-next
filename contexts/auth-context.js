'use client'
import { createContext } from 'react'
const AuthContext = createContext()
import { FIREBASE_LOGIN, REGISTER } from '@/lib/authorization-api'
import React, { useState, useEffect } from 'react'

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

  // 當第一次第三方登入時使用
  const [firstLogin, setFirstLogin] = useState({
    user_email: '',
    mobile: '',
    nickname: '',
    login_type: null,
    user_name: '',
    gender: '',
    birthday: '',
    profile: '',
    e_interest: [],
    c_interest: [],
  })

  useEffect(() => {
    const str = localStorage.getItem(storageKey)
    try {
      const data = JSON.parse(str)

      setAuth(data)
    } catch (error) {
      console.log(error)
    }
  }, [])
  //註冊 TODO:
  // 1. 取出所有表單內會員資料
  // 2. 送入後端
  // 3. 直接登入寫入 localstorage 和 auth 狀態
  const register = async (c_liked, e_liked) => {
    // 將 set 物件轉型為 Array
    const e_interest = Array.from(e_liked)
    const c_interest = Array.from(c_liked)
    const data = { ...firstLogin, e_interest, c_interest }

    const res = await fetch(REGISTER, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const result = await res.json()
    if (result.success) {
      setAuth(result.data)
      setFirstLogin({
        user_email: '',
        mobile: '',
        nickname: '',
        login_type: null,
        user_name: '',
        gender: '',
        birthday: '',
        profile: '',
        e_interest: [],
        c_interest: [],
      })
    }
  }

  // firebase 登入
  const firebaseLogin = async (token) => {
    const res = await fetch(FIREBASE_LOGIN, {
      headers: { Authorization: 'Bearers ' + token },
    })

    const result = await res.json()
    if (result.success && result.code == 200) {
      const { user_id, user_email, nickname, avatar, token } = result

      setAuth({ user_id, user_email, nickname, avatar, token })
    } else {
      console.log(result)
      setFirstLogin(result.data)
    }
  }
  // 接受第一次註冊表單內容
  const registerDataHandler = (obj) => {
    const nextData = { ...firstLogin, ...obj }
    setFirstLogin(nextData)
  }
  // 登入是異步的 , 當狀態被改變時再添加到 localstorage 中
  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(auth))
  }, [auth])

  // 登入
  const loginhandle = async (obj) => {
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
      <AuthContext.Provider
        value={{
          firebaseLogin,
          auth,
          logOut,
          loginhandle,
          firstLogin,
          registerDataHandler,
          register,
        }}
      >
        {children}
      </AuthContext.Provider>
    </>
  )
}
export default AuthContext
