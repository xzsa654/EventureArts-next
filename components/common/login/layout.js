import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from '@heroui/react'
import { useEffect } from 'react'
import { BracketsIcon, TipsIcon } from '@/public/Yao/icons'
export default function ModalLayout({
  formBody = <></>,
  tips = '',
  title = '',
  section = <></>,
  footer = <></>,
  prompt = '',
  isOpen,
  onOpenChange,
  size,
}) {
  return (
    <>
      <Modal
        // 禁止向外點擊關閉
        isDismissable={false}
        placement="center"
        size="4xl"
        isKeyboardDismissDisabled={true}
        classNames={{
          backdrop: 'z-40',
          wrapper: 'z-40',
        }}
        className={`${
          size ? '' : 'w-[400px]'
        }  bg-[FFF2F2] backdrop-blur-[10px]    border-2  rounded-sm `}
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
          {(onClose) => {
            {
              /* if (auth.user_id !== 0) return onClose() */
            }
            return (
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
                  <div className=" border-1 h-full p-[30px] flex gap-[20px] flex-col">
                    {prompt ? prompt : ''}
                    <div className="relative  border-1 h-full border-dashed p-[16px] flex  justify-center items-center ">
                      {formBody}
                      <div className="absolute -top-[18px] z-10 -left-[19px]">
                        <BracketsIcon />
                      </div>
                      <div className="absolute -bottom-[18px]  -right-[18px]">
                        <BracketsIcon />
                      </div>
                    </div>
                  </div>
                </ModalBody>
                <ModalFooter>{footer}</ModalFooter>
              </>
            )
          }}
        </ModalContent>
      </Modal>
    </>
  )
}
