'use client'

import { useEffect, useRef, useState } from 'react'
import { useAuth } from '@/hooks/use-auth' // 存會員資料的 hook
import { useRouter } from 'next/navigation' // 用來跳轉頁面
import { USERDATA } from '@/lib/user-api'
import { Button } from '@heroui/react'
// import { HiArrowRight } from 'react-icons/hi'
import { IoRefreshOutline, IoCheckmarkDone } from 'react-icons/io5'

export default function GenerateavatarPage() {
  const { auth, getAuthHeader } = useAuth() // 取得會員資訊
  const [userData, setUserData] = useState(null) // 定義 setUserData
  const [avatarFilename, setAvatarFilename] = useState(null) // 確保 avatarFilename 存在

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
      <AvatarGenerator
        auth={auth}
        getAuthHeader={getAuthHeader}
        avatarFilename={avatarFilename} // 傳遞給 AvatarGenerator
        setAvatarFilename={setAvatarFilename} // 確保可以更新
      />
    </div>
  )
}

function AvatarGenerator() {
  const router = useRouter() // Next.js 的 Router
  const canvasRef = useRef(null)
  const [avatarFilename, setAvatarFilename] = useState(null)
  const [isLoading, setIsLoading] = useState(false) // 控制 Loading 狀態
  const [userData, setUserData] = useState(null) // 存會員資料
  const [translateMode, setTranslateMode] = useState('cx-cy') // 預設中心點
  const [refreshKey, setRefreshKey] = useState(0) // 讓畫布刷新
  const { auth, updateAvatar, getAuthHeader } = useAuth() // 這裡取得 `auth` & `getAuthHeader`

  // **產生完整的圖片 URL**
  const avatarUrl = avatarFilename
    ? `http://localhost:3001/tmp_uploads/avatar/${avatarFilename}`
    : null

  // ==============生成式藝術頭像=============
  // **角度轉弧度**
  const degToRad = (degrees) => (degrees / 180) * Math.PI
  // **畫生成式藝術**
  const drawCanvas = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    // 清空畫布
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // 設定背景顏色
    ctx.fillStyle = '#5F5420'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // 設定中心點
    const cx = canvas.width * 0.5
    const cy = canvas.height * 0.5

    const w = canvas.width * 0.01
    const h = canvas.height * 0.1
    let x, y

    const num = 40
    const radius = canvas.width * 0.3

    for (let i = 0; i < num; i++) {
      ctx.fillStyle = '#Eeaa77'
      const slice = degToRad(360 / num)
      const angle = slice * i

      x = cx + radius * Math.sin(angle)
      y = cy + radius * Math.cos(angle)

      ctx.save()
      ctx.translate(x, y)
      ctx.rotate(-angle)
      ctx.scale(Math.random() * 1.3 + 0.3, Math.random() * 0.6 + 0.6)

      ctx.beginPath()
      ctx.rect(-w * 0.5, Math.random() * -h * 0.5, w, h)
      ctx.fill()
      ctx.restore()

      // **處理四種 `translate` 狀態**
      ctx.save()
      if (translateMode === 'cx-cy') ctx.translate(cx, cy)
      else if (translateMode === 'x-cy') ctx.translate(x, cy)
      else if (translateMode === 'cx-y') ctx.translate(cx, y)
      else if (translateMode === 'x-y') ctx.translate(x, y)

      ctx.rotate(-angle)

      // **建立漸層**
      const gradient = ctx.createRadialGradient(
        0,
        0,
        radius * 0.5,
        0,
        0,
        radius
      )
      gradient.addColorStop(0, '#A1ABBE')
      gradient.addColorStop(0.5, '#A1ABBE')
      gradient.addColorStop(1, '#EDBEE4')

      ctx.strokeStyle = gradient
      ctx.lineWidth = Math.random() * 5 + 2

      ctx.beginPath()
      ctx.arc(
        0,
        0,
        radius * (Math.random() * 0.6 + 0.7),
        slice * (Math.random() * -5 + 1),
        slice * (Math.random() * -2 + 1)
      )
      ctx.stroke()

      ctx.restore()
    }
  }

  // **載入畫布**
  useEffect(() => {
    drawCanvas()
  }, [translateMode, refreshKey]) // **當 `translateMode` 或 `refreshKey` 變動時重新繪製**

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
          setAvatarFilename(data.filename) // 更新 filename
          updateAvatar(data.filename) // 更新 auth.avatar

          // 強制刷新，並確保跳轉到 `/user/c/profile`**
          window.location.href = '/user/c/profile'
        }
      } catch (error) {
        console.error('上傳錯誤:', error)
        setIsLoading(false) // 避免錯誤時無限 Loading
      }
    }, 'image/jpeg')
  }

  return (
    <div className="flex flex-col items-center space-y-10 relative">
      {/* Loading 畫面：完全覆蓋畫面，並隱藏所有內容 */}
      {isLoading ? (
        <div className="fixed inset-0 w-screen h-screen flex items-center justify-center bg-black bg-opacity-50 z-[100]">
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-white text-lg">上傳中...</p>
          </div>
        </div>
      ) : (
        <>
          <canvas
            ref={canvasRef}
            width={400}
            height={400}
            className="border shadow-lg"
          />

          {/* 狀態切換按鈕 */}
          <div className="flex gap-2">
            <Button
              radius="none"
              className={`px-4 py-2 ${
                translateMode === 'cx-cy'
                  ? 'bg-primary text-secondary'
                  : 'bg-secondary text-primary'
              }`}
              onPress={() => setTranslateMode('cx-cy')}
            >
              宇宙之心
            </Button>
            <Button
              radius="none"
              className={`px-4 py-2 ${
                translateMode === 'x-cy'
                  ? 'bg-primary text-secondary'
                  : 'bg-secondary text-primary'
              }`}
              onPress={() => setTranslateMode('x-cy')}
            >
              漂流之線
            </Button>
            <Button
              radius="none"
              className={`px-4 py-2  ${
                translateMode === 'cx-y'
                  ? 'bg-primary text-secondary'
                  : 'bg-secondary text-primary'
              }`}
              onPress={() => setTranslateMode('cx-y')}
            >
              地平之上
            </Button>
            <Button
              radius="none"
              className={`px-4 py-2  ${
                translateMode === 'x-y'
                  ? 'bg-primary text-secondary'
                  : 'bg-secondary text-primary'
              }`}
              onPress={() => setTranslateMode('x-y')}
            >
              混沌之舞
            </Button>
          </div>

          {/* 重整按鈕 */}
          <Button
            radius="none"
            className="px-12 text-base bg-yellow-600 text-white hover:text-[#E3C8B9] hover:scale-110 transition-transform duration-200 cursor-pointer flex items-center group gap-x-2 "
            onPress={() => setRefreshKey((prev) => prev + 1)}
          >
            <IoRefreshOutline /> 重整畫布
          </Button>

          {/* 儲存按鈕 */}
          <Button
            radius="none"
            className="px-12 text-base bg-green-600 text-white hover:text-[#E3C8B9] hover:scale-110 transition-transform duration-200 cursor-pointer flex items-center group gap-x-2 "
            onPress={saveAvatar}
          >
            儲存頭像 <IoCheckmarkDone />
          </Button>
        </>
      )}
    </div>
  )
}
