'use client'

import { useEffect, useRef, useState } from 'react'
import { useAuth } from '@/hooks/use-auth' // 存會員資料的 hook
import { useRouter } from 'next/navigation' // 用來跳轉頁面
import { USERDATA } from '@/lib/user-api'
import { Button } from '@heroui/react'
import { HiArrowRight } from 'react-icons/hi'

export default function GenerateavatarPage() {
  const { auth, getAuthHeader } = useAuth() // 取得會員資訊

  // **獲取會員登入資訊**
  useEffect(() => {
    if (auth?.token) {
      fetch(USERDATA, {
        headers: {
          ...getAuthHeader(),
        },
      })
        .then((res) => res.json())
        .then((result) => {
          setUserData(result)
          if (result.avatar) {
            setAvatarFilename(result.avatar) // 存 filename
          }
        })
        .catch((error) => console.error('獲取會員資料錯誤:', error))
    }
  }, [auth?.token])

  return (
    <div className="flex flex-col w-full h-[760] justify-center items-center gap-4">
      {/* <h1 className="text-xl font-bold mb-4">Generate Avatar Page</h1> */}
      <AvatarGenerator auth={auth} getAuthHeader={getAuthHeader} />
    </div>
  )
}

function AvatarGenerator({ auth, getAuthHeader }) {
  const router = useRouter() // Next.js 的 Router
  const canvasRef = useRef(null)
  const [avatarFilename, setAvatarFilename] = useState(null)
  const [userData, setUserData] = useState(null) // 存會員資料
  const [isLoading, setIsLoading] = useState(false) // 控制 Loading 狀態

  // **產生完整的圖片 URL**
  const avatarUrl = avatarFilename
    ? `http://localhost:3001/tmp_uploads/avatar/${avatarFilename}`
    : null

  // **畫藍底 + 白色圈圈**
  const drawCanvas = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    // 畫背景 (藍色)
    ctx.fillStyle = '#0000FF'
    ctx.fillRect(0, 0, 400, 400)

    // 畫白色圓圈
    ctx.fillStyle = '#FFFFFF'
    ctx.beginPath()
    ctx.arc(200, 200, 80, 0, Math.PI * 2)
    ctx.fill()
  }

  // **載入畫布**
  useEffect(() => {
    drawCanvas()
  }, [])

  // **儲存頭像**
  const saveAvatar = async () => {
    const canvas = canvasRef.current
    if (!canvas || !auth?.token) return

    setIsLoading(true) // 開啟 Loading 狀態

    canvas.toBlob(async (blob) => {
      const formData = new FormData()
      formData.append('avatar', blob, 'avatar.jpg')

      try {
        const response = await fetch('http://localhost:3001/generate-avatar', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${auth.token}`, // 會員驗證
          },
          body: formData,
        })

        const data = await response.json()
        if (data.success) {
          setAvatarFilename(data.filename) // ✅ 更新 filename
          setTimeout(async () => {
            await router.push('/user/c/profile') // ✅ 確保頁面成功跳轉後再關閉 Loading
            setIsLoading(false)
          }, 3000)
        }
      } catch (error) {
        console.error('上傳錯誤:', error)
        setIsLoading(false) // 避免錯誤時無限 Loading
      }
    }, 'image/jpeg')
  }

  return (
    <div className="flex flex-col items-center space-y-10 relative">
      {/* ✅ Loading 畫面：完全覆蓋畫面，並隱藏所有內容 */}
      {isLoading ? (
        <div className="fixed inset-0 w-screen h-screen flex items-center justify-center bg-black bg-opacity-50 z-[100]">
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-white text-lg">上傳中...</p>
          </div>
        </div>
      ) : (
        // ✅ 只有在 `isLoading === false` 時才顯示 UI
        <>
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt="Avatar"
              className="w-40 h-40 rounded-full border"
            />
          ) : (
            <canvas
              ref={canvasRef}
              width={400}
              height={400}
              className="border"
            />
          )}

          {auth?.token && (
            <Button
              radius="none"
              className="px-12 text-base bg-primary text-white hover:text-[#E3C8B9] hover:scale-110 transition-transform duration-200 cursor-pointer flex items-center group gap-x-2 "
              onPress={saveAvatar}
            >
              儲存頭像
              <HiArrowRight className="transition-transform duration-300 ease-out group-hover:translate-x-3" />
            </Button>
          )}
        </>
      )}
    </div>
  )
}
