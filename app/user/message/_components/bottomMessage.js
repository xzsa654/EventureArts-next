'use client'

import React, { useState, useEffect } from 'react'
import { Form, Input, Button } from '@heroui/react'
import { useAuth } from '@/hooks/use-auth'
export default function ComponentsBottomMessage({
  receiver_id,
  renderHandle = () => {},
}) {
  const [text, setText] = useState()
  const { getAuthHeader, auth } = useAuth()
  const onSubmit = async (e) => {
    e.preventDefault()
    const fm = new FormData(e.target)
    fm.set('receiver_id', receiver_id)
    fm.set('sender_id', auth.user_id)

    const r = await fetch('http://localhost:3001/message/messageSend', {
      method: 'POST',
      body: fm,
      headers: {
        ...getAuthHeader(),
      },
    })
    const res = await r.json()
    if (res.success) {
      setText('')
      renderHandle()
    }
  }
  return (
    <>
      <Form onSubmit={onSubmit} className="mt-5 absolute bottom-0 ">
        <Input
          value={text}
          name="text"
          onChange={(e) => {
            setText(e.target.value)
          }}
        ></Input>
        <Button type="submit">go!</Button>
      </Form>
    </>
  )
}
