'use client'

import React, { useState, useEffect } from 'react'
import { useAuth } from '@/hooks/use-auth'
import { User, Chip } from '@heroui/react'
import ChatRoomHeader from './chatroomheader'
// import MessageHeader from '../../_components/headerMessage'
// import ComponentsBottomMessage from '../../_components/bottomMessage'
export default function ChatRoom({
  chatWith,
  chatHandle = () => {},
  renderHandler = () => {},
  renderControl,
}) {
  const { getAuthHeader, auth } = useAuth()

  const [messages, setMessages] = useState([])

  useEffect(() => {
    if (auth?.token) {
      fetch('http://localhost:3001/message/t/' + `${chatWith}`, {
        method: 'GET',
        headers: {
          ...getAuthHeader(),
        },
      })
        .then((r) => r.json())
        .then((res) => {
          setMessages(res)
          renderHandler(false)
        })
    }
  }, [auth?.token, renderControl])

  return (
    <>
      <ChatRoomHeader
        chatHandle={chatHandle}
        avatar={messages.at(-2)?.avatar}
        nickname={messages.at(-1)?.nickname}
      />
      <div className="mt-20 overflow-auto px-3 ">
        {messages.map((message, i) => {
          if (messages.length - i <= 2) {
            return
          }
          if (message.position == 'right') {
            return (
              <div
                key={message.id}
                className="text-right flex justify-end items-end flex-col gap-2 "
              >
                <div className="text-center  text-zinc flex justify-center items-center w-full">
                  {message.date}
                </div>
                <div className="text-zinc ">{message.time}</div>
                <Chip color="primary" radius="lg">
                  {message.text}
                </Chip>
              </div>
            )
          }
          return (
            <div
              key={message.id}
              className="text-left gap-2 flex flex-col justify-start items-start"
            >
              <div className="flex justify-center items-center text-zinc">
                {message.date}
              </div>
              <div className="text-zinc">{message.time}</div>
              <User
                avatarProps={{
                  src: `http://localhost:3001/uploads/avatar/${
                    messages.at(-2)?.avatar
                  }`,
                }}
                name={message.nickname}
                description={message.text}
              />
            </div>
          )
        })}
      </div>
    </>
  )
}
