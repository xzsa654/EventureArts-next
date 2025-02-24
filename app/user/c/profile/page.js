'use client'

import React, { useState, useEffect } from 'react'
import { useAuth } from '@/hooks/use-auth'
import UserPageFrame from '../../_components/user-page/frame'
import { useRouter } from 'next/navigation'
export default function UserPage() {
  // 未登入轉址
  const router = useRouter()
  const { auth } = useAuth()
  useEffect(() => {
    const fn = async () => {
      if (!auth.token) {
        return await router.push('/')
      }
    }
  }, [])
  return (
    <>
      <UserPageFrame />
    </>
  )
}
