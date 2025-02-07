import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from '@heroui/react'
import { useEffect } from 'react'
import { motion } from 'framer-motion'
export default function LoginModal() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  useEffect(() => {
    onOpen()
  }, [])

  return (
    <>
      <Button onPress={onOpen}>Open Modal</Button>
      <Modal
        // 禁止向外點擊關閉
        isDismissable={false}
        isKeyboardDismissDisabled={true}
        className="w-[400] h-[656] bg-[FFF2F2] backdrop-blur-[10px]   border border-2  rounded-sm"
        motionProps={{
          variants: {
            enter: {
              y: 0,
              opacity: 1,
              transition: {
                duration: 0.1,
                ease: 'easeOut',
              },
            },
            exit: {
              y: -20,
              opacity: 0,
              transition: {
                duration: 0.2,
                ease: 'easeIn',
              },
            },
          },
        }}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <p className="font-cn text-white">登入</p>
              </ModalHeader>
              <ModalBody>
                <div className="text-3xl text-white">EVENTUREARTS</div>
                <div className="border border-1 h-full p-[30px]">
                  <div className="border border-1 h-full border-dashed"></div>
                </div>
              </ModalBody>
              <ModalFooter></ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
