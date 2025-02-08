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
export default function ModalLayout({
  formBody = <></>,
  tips = '',
  title = '',
  footer = <></>,
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  useEffect(() => {
    onOpen()
  }, [])
  const tipsIcon = (
    <svg
      width="33"
      height="33"
      viewBox="0 0 33 33"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M30.1857 16.5L18.6957 17.4616L23.7027 23.7027L17.4616 18.6957L16.5 30.1857L15.4557 18.7263L0 33L14.2737 17.5443L2.81431 16.5L14.3012 15.5384L9.29733 9.29733L15.5384 14.3043L16.5 2.81431L17.5412 14.2798L33 0L18.7233 15.4557L30.1857 16.5Z"
        fill="white"
      />
    </svg>
  )
  const bracketsIcon = (
    <svg
      width="35"
      height="35"
      viewBox="0 0 35 35"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M17.8153 0.74014L18.8972 14.4376C18.9919 15.6498 19.962 16.6095 21.1749 16.6979L34.8802 17.675L21.1828 18.7569C19.9706 18.8516 19.0108 19.8217 18.9224 21.0346L17.9454 34.7399L16.8635 21.0425C16.7688 19.8303 15.7987 18.8705 14.5858 18.7821L0.880465 17.8051L14.5779 16.7232C15.7901 16.6285 16.7498 15.6583 16.8382 14.4454L17.8153 0.74014Z"
        fill="white"
      />
    </svg>
  )

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
              <ModalHeader className="flex  gap-2 item-center ">
                {tipsIcon}
                <p className="font-cn text-white p-1">{tips}</p>
              </ModalHeader>
              <ModalBody>
                <div className="text-3xl text-white">{title}</div>
                <div className="relative border  border-1 h-full p-[30px]">
                  <div className="absolute top-[13px] z-10 left-[13px]">
                    {bracketsIcon}
                  </div>
                  <div className="border border-1 h-full border-dashed p-[16px] ">
                    {formBody}
                  </div>
                  <div className="absolute bottom-[13px]  right-[13px]">
                    {bracketsIcon}
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>{footer}</ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
