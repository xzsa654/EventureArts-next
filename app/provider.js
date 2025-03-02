'use client'

import { AuthContextProvider } from '@/contexts/auth-context'
import { HeroUIProvider, ToastProvider } from '@heroui/react'
import { ModalProvider } from '@/contexts/modal-context'

export default function Provider({ children }) {
  return (
    <HeroUIProvider>
      <GoogleReCaptchaProvider
        reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
        language="zh-TW"
      >
        <ToastProvider placement="top-right" />
        <AuthContextProvider>
          <ModalProvider>{children}</ModalProvider>
        </AuthContextProvider>
      </GoogleReCaptchaProvider>
    </HeroUIProvider>
  )
}
