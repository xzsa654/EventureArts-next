'use client'

import React, { useState, useEffect } from 'react'
import { Button } from '@heroui/react'
import { OAUTHGOOGLE } from '@/lib/authorization-api'
export default function FacebookAuth(props) {
  const handleFBLogin = () => {
    location.href = `https://www.facebook.com/v18.0/dialog/oauth?client_id=${
      process.env.NEXT_PUBLIC_FACEBOOK_APP_ID
    }&redirect_uri=${encodeURIComponent(
      'http://localhost:3000/auth/'
    )}&scope=email,public_profile`
  }
  return (
    <>
      <Button onPress={handleFBLogin}>LOGIN WITH FACEBOOK</Button>
    </>
  )
}
