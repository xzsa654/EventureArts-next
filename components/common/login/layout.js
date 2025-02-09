import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from '@heroui/react'
import { useEffect } from 'react'
import { BracketsIcon, TipsIcon } from '@/public/user/icons'
export default function ModalLayout({
  formBody = <></>,
  tips = '',
  title = '',
  section = <></>,
  footer = <></>,
  prompt = '',
  isOpen,
  onOpenChange,
}) {
  return (
    <>
      <Modal
        // 禁止向外點擊關閉
        isDismissable={false}
        isKeyboardDismissDisabled={true}
        className="w-[400]  bg-[FFF2F2] backdrop-blur-[10px]   border border-2  rounded-sm"
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
                <TipsIcon />
                <p className="font-cn text-white p-1">{tips}</p>
              </ModalHeader>

              <ModalBody>
                <div className="font-cn font-bold text-3xl text-white">
                  {title}
                </div>
                {section ? section : ''}
                <div className="border border-1 h-full p-[30px] flex gap-[20] flex-col">
                  {prompt ? prompt : ''}
                  <div className="relative border border-1 h-full border-dashed p-[16px] flex  justify-center items-center ">
                    {formBody}
                    <div className="absolute -top-[18] z-10 -left-[19]">
                      <BracketsIcon />
                    </div>
                    <div className="absolute -bottom-[18]  -right-[18]">
                      <BracketsIcon />
                    </div>
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
