'use client'

import React, { useState, useEffect } from 'react'
import { useAuth } from '@/hooks/use-auth'
import { User } from '@heroui/react'
import { useParams } from 'next/navigation'
import MessageHeader from '../../_components/headerMessage'
import ComponentsBottomMessage from '../../_components/bottomMessage'
export default function SenderPage() {
  const { getAuthHeader, auth } = useAuth()
  const param = useParams()
  const { sender_id } = param
  const [reRender, setReRender] = useState(false)
  const renderHandle = () => {
    setReRender(true)
  }
  const [messages, setMessages] = useState([])
  useEffect(() => {
    if (auth?.token) {
      fetch('http://localhost:3001/message/t/' + `${sender_id}`, {
        method: 'GET',
        headers: {
          ...getAuthHeader(),
        },
      })
        .then((r) => r.json())
        .then((res) => {
          setMessages(res)
          setReRender(false)
        })
    }
  }, [auth?.token, reRender])

  return (
    <>
      <MessageHeader />
      {messages.map((message) => {
        return (
          <User
            key={message.id}
            avatarProps={{
              src: `http://localhost:3001/uploads/avatar/${message.avatar}`,
            }}
            name={message.nickname}
            description={message.text}
          />
        )
      })}

      <ComponentsBottomMessage
        receiver_id={sender_id}
        renderHandle={renderHandle}
      />
    </>
  )
}
