// app/auth/facebook/callback/page.js
'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useSearchParams } from 'next/navigation'
export default function FacebookCallback() {
  const router = useRouter()
  const searchParams = useSearchParams()
  useEffect(() => {
    // 從 URL 獲取 code
    const code = searchParams.get('code')

    if (code) {
      // 發送到後端換取 access token
      fetch('http://localhost:3001/auth/facebook', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log('Login success:', data)
          router.push('/')
        })
        .catch((error) => {
          console.error('Login error:', error)
        })
    }
  }, [])

  return <div>處理 Facebook 登入中...</div>
}
