'use client'

import React, { useState, useEffect } from 'react'
import { Button, Alert, Badge, Avatar } from '@heroui/react'
import { HiArrowLeft } from 'react-icons/hi'
import { useAuth } from '@/hooks/use-auth'

export default function ChatRoomHeader({
  chatWith,
  chatHandle = () => {},
  avatar,
  nickname,
  brandname,
}) {
  const { onlineUsers } = useAuth()

  return (
    <>
      <header className="w-[400px]  fixed z-20 ">
        <div>
          <Alert
            hideIcon
            description={
              <div className="font-bold">
                {nickname}
                {brandname ? `(${brandname})` : ''}
              </div>
            }
            // title={`${nickname} ${brandname ? `(${brandname})` : ''}`}
            startContent={
              <>
                <Button
                  aria-label="backToList"
                  className="bg-transparent rounded-full hover:bg-gray-300 "
                  isIconOnly
                  onPress={chatHandle}
                >
                  <HiArrowLeft size={20} className=" hover:text-gray-900" />
                </Button>

                <Badge
                  content=""
                  color={
                    onlineUsers?.includes(`${chatWith?.toString()}`)
                      ? 'success'
                      : 'primary'
                  }
                  placement="bottom-right"
                  shape="circle"
                >
                  <Avatar
                    radius="full"
                    src={`http://localhost:3001/uploads/avatar/${avatar}`}
                  />
                </Badge>
              </>
            }
            className="w-full flex-auto"
          ></Alert>
          <div></div>
        </div>
      </header>
    </>
  )
}
