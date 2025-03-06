'use client'

import React, { useState, useEffect, useRef } from 'react'
import { useAuth } from '@/hooks/use-auth'
import { User, Chip, Image, addToast } from '@heroui/react'
import SplitText from './splitText'
import ChatRoomHeader from './chatroomheader'
export default function ChatRoom({
  chatWith,
  chatHandle = () => {},
  renderHandler = () => {},
  renderControl,
}) {
  const { getAuthHeader, auth, socket } = useAuth()
  const messageTailRef = useRef()
  const [typing, setTyping] = useState()

  const [messages, setMessages] = useState([])

  useEffect(() => {
    if (!chatWith || !socket) return

    // 定义消息处理函数
    const handleNewMessage = (newMessage) => {
      if (chatWith === +newMessage.sender_id) {
        // 修正2: 正确更新消息数组
        setMessages((prevMessages) => [...prevMessages, newMessage])
      }
    }

    // 添加事件监听
    socket.on('newMessage', handleNewMessage)

    // 清理函数，组件卸载时移除监听
    return () => {
      socket.off('newMessage', handleNewMessage)
    }
  }, [chatWith, socket])

  useEffect(() => {
    socket.on('eachTyping', (data) => {
      setTyping(data)
    })
  }, [chatWith, socket])
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

  useEffect(() => {
    if (messages && messageTailRef.current) {
      setTimeout(() => {
        messageTailRef.current?.scrollIntoView({ behavior: 'auto' })
      }, 50)
    }
  }, [messages, typing])

  const handleAnimationComplete = () => {
    console.log('All letters have animated!')
  }
  return (
    <>
      <ChatRoomHeader
        chatWith={chatWith}
        chatHandle={chatHandle}
        avatar={messages.at(0)?.avatar}
        nickname={messages.at(1)?.nickname}
        brandname={messages.at(1)?.brandname}
      />
      <div className="mt-20 overflow-auto px-3 ">
        {messages.map((message, i) => {
          if (i <= 1) {
            return
          }
          if (message.position == 'right') {
            return (
              <div
                key={i}
                className="text-right flex justify-end items-end flex-col gap-2 "
              >
                <div className="text-center  text-zinc flex justify-center items-center w-full">
                  {message.date}
                </div>
                <div className="text-zinc ">{message.time}</div>
                {message?.images?.length ? (
                  <>
                    {message.text !== '' && !message.text && (
                      <Chip color="primary" radius="lg">
                        {message.text}
                      </Chip>
                    )}
                    <div className="flex w-4/12 justify-end gap-2 flex-wrap">
                      {message.images.map((v, i) => {
                        return (
                          <Image
                            key={i}
                            src={`http://localhost:3001/uploads/message/${v}`}
                            alt={v}
                            width="122"
                            className="w-[122px]"
                          />
                        )
                      })}
                    </div>
                  </>
                ) : (
                  <Chip color="primary" radius="lg">
                    {message.text}
                  </Chip>
                )}
              </div>
            )
          }
          return (
            <div
              key={i}
              className="text-left gap-2 flex flex-col justify-start items-start"
            >
              <div className="flex justify-center w-full items-center text-zinc">
                {message.date}
              </div>
              <div className="text-zinc">{message.time}</div>

              {message?.images?.length ? (
                <>
                  <User
                    avatarProps={{
                      src: `http://localhost:3001/uploads/avatar/${
                        messages.at(0)?.avatar
                      }`,
                    }}
                    name={message.nickname}
                    description={message.text}
                  />
                  <div className="flex w-5/12 justify-end gap-2 flex-wrap">
                    {message.images.map((v, i) => {
                      return (
                        <Image
                          key={i}
                          src={`http://localhost:3001/uploads/message/${v}`}
                          alt={v}
                          width="122"
                          className="w-[122px]"
                        />
                      )
                    })}
                  </div>
                </>
              ) : (
                <User
                  avatarProps={{
                    src: `http://localhost:3001/uploads/avatar/${
                      messages.at(0)?.avatar
                    }`,
                  }}
                  name={message.nickname}
                  description={message.text}
                />
              )}
            </div>
          )
        })}
        <SplitText
          text={typing}
          className=" w-full text-12 text-center"
          delay={50}
          animationFrom={{ opacity: 0, transform: 'translate3d(0,0,0)' }}
          animationTo={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
          easing="easeOutCubic"
          threshold={0.2}
          rootMargin="-50px"
          onLetterAnimationComplete={handleAnimationComplete}
        />
        <div className="h-1" ref={messageTailRef}></div>
      </div>
    </>
  )
}
