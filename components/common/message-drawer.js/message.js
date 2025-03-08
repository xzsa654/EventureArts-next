'use client'

import React, { useState, useEffect } from 'react'
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  Input,
  addToast,
} from '@heroui/react'
import { useAuth } from '@/hooks/use-auth'
import { FaSearch } from 'react-icons/fa'
import ChatList from './chatlist'
import ChatRoom from './chatroom'
import MessageFooter from './messageFooter'
import { CiChat1 } from 'react-icons/ci'

export default function MessageDrawer({
  onOpenChange = () => {},
  isOpen,
  getId,
}) {
  // 如果關閉了聊天室 回去列表狀態
  useEffect(() => {
    if (!isOpen) {
      setIsChatting(false)
      setChatWith('')
    }
  }, [isOpen])
  useEffect(() => {
    if (getId && isOpen) chatHandle(getId)
  }, [isOpen, getId])

  const { auth, socket } = useAuth()
  // 添加通知
  const [senderName, setSenderName] = useState('')

  // 單獨處理 newMessage 事件
  useEffect(() => {
    if (!socket) return

    const handleNewMessage = (newMessage) => {
      if (isOpen) return
      if (+newMessage.receiver_id === auth.user_id) {
        // 無論 senderName 是否設置，都顯示通知
        addToast({
          radius: 'lg',
          icon: <CiChat1 />,
          description: `${newMessage.senderName} 向你發出訊息
          `,
          color: 'danger',
          timeout: 3000,
        })
      }
    }

    socket.on('newMessage', handleNewMessage)

    return () => {
      socket.off('newMessage', handleNewMessage)
    }
  }, [socket, isOpen, auth.user_id, senderName])

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
  const [filterValue, setFilterValue] = useState('')
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
                    onChange={(e) => {
                      setFilterValue(e.target.value)
                    }}
                    onClear={() => {
                      setFilterValue('')
                    }}
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
                  <ChatList {...{ chatHandle, filterValue }} />
                )}
              </DrawerBody>

              <DrawerFooter className=" relative">
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
