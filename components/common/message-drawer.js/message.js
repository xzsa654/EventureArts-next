'use client'

import React, { useState, useEffect } from 'react'
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  Button,
  ScrollShadow,
  Input,
} from '@heroui/react'
import { FaSearch } from 'react-icons/fa'
import ChatList from './chatlist'
import ChatRoom from './chatroom'
import MessageFooter from './messageFooter'

export default function MessageDrawer({ onOpenChange = () => {}, isOpen }) {
  // 如果關閉了聊天室 回去列表狀態
  useEffect(() => {
    setIsChatting(false)
  }, [onOpenChange])
  const [isChatting, setIsChatting] = useState(false)
  const [chatWith, setChatWith] = useState('')

  const [renderControl, setRenderControl] = useState(false)

  const renderHandler = (boolean) => {
    setRenderControl(boolean)
  }

  const chatHandle = (id) => {
    setIsChatting(!isChatting)
    if (id) {
      setChatWith(id)
    }
  }
  return (
    <>
      <Drawer
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        classNames={{
          body: 'relative',
        }}
      >
        <DrawerContent>
          {(onClose) => (
            <>
              <DrawerHeader className="flex flex-col gap-1">
                聊天室
                {!isChatting && (
                  <Input
                    isClearable
                    classNames={{
                      label: 'text-black/50 dark:text-white/90',
                      input: [
                        'bg-transparent',
                        'text-black/90 dark:text-white/90',
                        'placeholder:text-default-700/50 dark:placeholder:text-white/60',
                      ],
                      innerWrapper: 'bg-transparent',
                      inputWrapper: [
                        'shadow-xl',
                        'bg-default-200/50',
                        'dark:bg-default/60',
                        'backdrop-blur-xl',
                        'backdrop-saturate-200',
                        'hover:bg-default-200/70',
                        'dark:hover:bg-default/70',
                        'group-data-[focus=true]:bg-default-200/50',
                        'dark:group-data-[focus=true]:bg-default/60',
                        '!cursor-text',
                      ],
                    }}
                    label="Search"
                    placeholder="按名字進行搜尋..."
                    radius="lg"
                    startContent={
                      <FaSearch className="text-black/50 mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />
                    }
                  />
                )}
              </DrawerHeader>

              <DrawerBody className="relative">
                {isChatting ? (
                  <ChatRoom
                    {...{ chatWith, chatHandle, renderHandler, renderControl }}
                  />
                ) : (
                  <ChatList {...{ chatHandle }} />
                )}
              </DrawerBody>

              <DrawerFooter>
                {isChatting && (
                  <MessageFooter
                    renderHandler={renderHandler}
                    chatWith={chatWith}
                  />
                )}
              </DrawerFooter>
            </>
          )}
        </DrawerContent>
      </Drawer>
    </>
  )
}
