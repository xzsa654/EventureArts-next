import { useDisclosure } from '@heroui/react'
// 自定義 hook 來管理多個 useDisclosure
export const useModalHandle = () => {
  const login = useDisclosure()
  const reset = useDisclosure()
  const register1 = useDisclosure()
  const register2 = useDisclosure()
  const register3 = useDisclosure()
  const register4 = useDisclosure()

  // 切換到指定 modal
  const switchToModal = (modalName) => {
    // 先關閉所有 modal
    login.onOpenChange(false)
    reset.onOpenChange(false)
    register1.onOpenChange(false)
    register2.onOpenChange(false)
    register3.onOpenChange(false)
    register4.onOpenChange(false)

    // 打開指定的 modal
    switch (modalName) {
      case 'login':
        login.onOpen()
        break
      case 'reset':
        reset.onOpen()
        break
      case 'register1':
        register1.onOpen()
        break
      case 'register2':
        register2.onOpen()
        break
      case 'register3':
        register3.onOpen()
        break
      case 'register4':
        register4.onOpen()
        break
    }
  }

  return {
    login,
    reset,
    register1,
    register2,
    register3,
    register4,
    switchToModal,
  }
}
