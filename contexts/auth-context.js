'use client'
import { createContext } from 'react'
const AuthContext = createContext()
import { FIREBASE_LOGIN, REGISTER } from '@/lib/authorization-api'
import React, { useState, useEffect } from 'react'
import { addToast } from '@heroui/react'
import { useRouter } from 'next/navigation'
import { io } from 'socket.io-client'
import { useModal } from './modal-context'
export function AuthContextProvider({ children }) {
  const BASEURL = 'http://localhost:3001'
  const router = useRouter()
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
  const { isOpen } = useModal().message

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
    const data = JSON.parse(str)
    if (data) setAuth(data)
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
      getSocket()
      addToast({
        radius: 'lg',
        description: '成功登入！',
        color: 'success',
        timeout: 3000,
      })
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
      const { user_id, user_email, nickname, avatar, token, user_role } = result
      setAuth({ user_id, user_email, nickname, avatar, token, user_role })
      getSocket()
      addToast({
        radius: 'lg',
        description: '成功登入！',
        color: 'success',
        timeout: 3000,
      })
    } else {
      setFirstLogin(result.data)
    }
  }
  // 接受第一次註冊表單內容
  const registerDataHandler = (obj) => {
    const nextData = { ...firstLogin, ...obj }
    setFirstLogin(nextData)
  }

  // 登入是異步的 , 當狀態被改變時再添加到 localstorage 中 與連接socket
  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(auth))
    getSocket()
  }, [auth])

  // 登入
  const loginhandle = async (obj) => {
    setAuth(obj)
    localStorage.setItem(storageKey, JSON.stringify(obj))
    getSocket()
    addToast({
      radius: 'lg',
      description: '成功登入！',
      color: 'success',
      timeout: 3000,
    })
  }

  // 登出
  const logOut = () => {
    router.push('/')
    localStorage.removeItem(storageKey)
    setAuth({ ...defaultAuth })
    socket.disconnect()
  }

  // 變成品牌後更新setAuth
  const beginBrand = () => {
    setAuth((prev) => {
      return { ...prev, user_role: 'brand' }
    })
  }

  // 驗證登入狀態憑證
  const getAuthHeader = () => {
    if (!auth?.token) {
      return {}
    } else {
      // 設置到需要驗證登入狀態的 headers
      return { Authorization: 'Bearer ' + auth?.token }
    }
  }
  const [socket, setSocket] = useState(null)
  const [onlineUsers, setOnlineUsers] = useState([])

  //socket.io 啟動函式
  const getSocket = () => {
    if (auth.token) {
      const socket = io(BASEURL, {
        withCredentials: true,
        query: { user_id: auth.user_id },
      })
      socket.connect()
      setSocket(socket)
      // 這裡的名稱要相對應後端 emit 的名稱
      socket.on('getOnlineUsers', (user_id) => {
        //取得 online 的使用者添加到狀態
        setOnlineUsers(user_id)
      })
    }
  }

  // 添加通知
  const [senderName, setSenderName] = useState('')
  useEffect(() => {
    if (isOpen) return
    if (socket) {
      socket?.on('details', (details) => {
        if (details.brandname) {
          setSenderName(`${details.nickname}(${details.brandname})`)
        } else {
          setSenderName(`${details.nickname}`)
        }
      })
      if (senderName) {
        socket?.on('newMessage', (newMessage) => {
          if (+newMessage.receiver_id == auth.user_id) {
            addToast({
              radius: 'lg',
              icon: <CiChat1 />,
              description: `${senderName}向你發出訊息`,
              color: 'danger',
              timeout: 3000,
            })
          }
        })
      }
    }
  }, [socket, isOpen, senderName])

  // 更新會員頭像 (Avatar)
  const updateAvatar = (newAvatar) => {
    setAuth((prevAuth) => {
      if (!prevAuth) return prevAuth // 確保 `prevAuth` 存在

      const updatedAuth = { ...prevAuth, avatar: newAvatar }
      localStorage.setItem(storageKey, JSON.stringify(updatedAuth)) // ✅ 更新 LocalStorage
      return updatedAuth
    })
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
          getAuthHeader,
          beginBrand,
          socket,
          onlineUsers,
          updateAvatar, // 傳遞 updateAvatar
        }}
      >
        {children}
      </AuthContext.Provider>
    </>
  )
}

export default AuthContext
