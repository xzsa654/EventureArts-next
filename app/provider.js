'use client'

import { AuthContextProvider } from '@/contexts/auth-context'

export default function Provider({ children }) {
  return <AuthContextProvider>{children}</AuthContextProvider>
}
