'use client'

import { AuthContextProvider } from '@/contexts/auth-context'
import { HeroUIProvider, ToastProvider } from '@heroui/react'
import { ModalProvider } from '@/contexts/modal-context'
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3'
export default function Provider({ children }) {
  return (
    <HeroUIProvider>
      <GoogleReCaptchaProvider
        reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
        language="zh-TW"
      >
        <AuthContextProvider>
          <ToastProvider placement="top-right" />
          <ModalProvider>{children}</ModalProvider>
        </AuthContextProvider>
      </GoogleReCaptchaProvider>
    </HeroUIProvider>
  )
}
