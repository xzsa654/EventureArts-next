'use client'

import { AuthContextProvider } from '@/contexts/auth-context'
import { HeroUIProvider } from '@heroui/react'
export default function Provider({ children }) {
  return (
    <HeroUIProvider>
      <AuthContextProvider>{children}</AuthContextProvider>
    </HeroUIProvider>
  )
}
