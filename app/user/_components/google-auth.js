'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { OAUTHGOOGLE } from '@/lib/authorization-api'
export default function GoogleAuth() {
  const router = useRouter()

  useEffect(() => {
    window.handleCredentialResponse = (response) => {
      // 發送到後端驗證
      fetch(OAUTHGOOGLE, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          credential: response.credential,
        }),
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error('Login failed')
          }
          return res.json()
        })
        .then((data) => {
          console.log('Login success:', data)
          // 可以存儲用戶資訊
          localStorage.setItem('user', JSON.stringify(data.user))
          // 重導向到首頁或儀表板
          router.push('/')  
        })
        .catch((error) => {
          console.error('Login error:', error)
        })
    }
  }, [])

  return (
    <div className="w-full">
      <div
        id="g_id_onload"
        data-client_id={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}
        data-callback="handleCredentialResponse"
        data-auto_prompt="false"
      />
      <div
        className="g_id_signin"
        data-type="standard"
        data-size="large"
        data-theme="outline"
        data-text="sign_in_with"
        data-shape="rectangular"
        data-logo_alignment="left"
      />
    </div>
  )
}
