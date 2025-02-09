'use client'

import { AuthContextProvider } from '@/contexts/auth-context'
import { HeroUIProvider } from '@heroui/react'
import { ModalProvider } from '@/contexts/modal-context'
export default function Provider({ children }) {
  return (
    <HeroUIProvider>
      <AuthContextProvider>
        <ModalProvider>{children}</ModalProvider>
      </AuthContextProvider>
    </HeroUIProvider>
  )
}
