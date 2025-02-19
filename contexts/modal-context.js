// contexts/modal-context.js
'use client'

import { createContext, useContext } from 'react'
import { useDisclosure } from '@heroui/react'
import { Alert } from '@heroui/react'
// 創建 context
const ModalContext = createContext(null)

// Provider 組件
export function ModalProvider({ children }) {
  // 各個 modal 的狀態
  const login = useDisclosure()
  const reset = useDisclosure()
  const register1 = useDisclosure()
  const register2 = useDisclosure()
  const register3 = useDisclosure()
  const register4 = useDisclosure()

  const value = {
    login,
    reset,
    register1,
    register2,
    register3,
    register4,
  }

  return <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
}

// Custom hook
export function useModal() {
  const context = useContext(ModalContext)
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider')
  }
  return context
}
