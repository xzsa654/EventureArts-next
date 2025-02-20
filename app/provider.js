'use client'

import { AuthContextProvider } from '@/contexts/auth-context'
import { HeroUIProvider } from '@heroui/react'
import { ModalProvider } from '@/contexts/modal-context'
import { OrderContextProvider } from '@/contexts/order-context'
export default function Provider({ children }) {
  return (
    <HeroUIProvider>
      <AuthContextProvider>
      <OrderContextProvider>
        <ModalProvider>{children}</ModalProvider>
        </OrderContextProvider>
      </AuthContextProvider>
    </HeroUIProvider>
  )
}
