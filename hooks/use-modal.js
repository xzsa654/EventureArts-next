import { useDisclosure } from '@heroui/react'
// 自定義 hook 來管理多個 useDisclosure
export const useModalHandle = () => {
  const login = useDisclosure()
  const reset = useDisclosure()
  const register1 = useDisclosure()
  const register2 = useDisclosure()
  const register3 = useDisclosure()
  const register4 = useDisclosure()

  return {
    login,
    reset,
    register1,
    register2,
    register3,
    register4,
  }
}
