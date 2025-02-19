'use client'

import { AuthContextProvider } from '@/contexts/auth-context'
import { HeroUIProvider, ToastProvider } from '@heroui/react'
import { ModalProvider } from '@/contexts/modal-context'

export default function Provider({ children }) {
  return (
    <HeroUIProvider>
      <AuthContextProvider>
        <ToastProvider />
        <ModalProvider>{children}</ModalProvider>
      </AuthContextProvider>
    </HeroUIProvider>
  )
}
