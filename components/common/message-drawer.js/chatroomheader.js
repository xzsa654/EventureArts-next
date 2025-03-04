'use client'

import React, { useState, useEffect } from 'react'
import { Button, Alert, Badge, Avatar } from '@heroui/react'
import { HiArrowLeft } from 'react-icons/hi'
import Image from 'next/image'

export default function ChatRoomHeader({
  chatHandle = () => {},
  avatar,
  nickname,
}) {
  return (
    <>
      <header className="w-[400px]  fixed z-20 ">
        <div>
          <Alert
            hideIcon
            title={nickname}
            startContent={
              <>
                <Button
                  aria-label="backToList"
                  className="bg-transparent rounded-full hover:bg-gray-300 "
                  isIconOnly
                  onPress={() => {
                    chatHandle()
                  }}
                >
                  <HiArrowLeft size={20} className=" hover:text-gray-900" />
                </Button>
                <Badge
                  color="primary"
                  content=""
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
        </div>
      </header>
    </>
  )
}
