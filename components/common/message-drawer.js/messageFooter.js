'use client'

import React, { useState, useEffect } from 'react'
import { Form, Input, Button } from '@heroui/react'
import { useAuth } from '@/hooks/use-auth'
import { AiOutlinePicture, AiOutlineArrowRight } from 'react-icons/ai'

export default function ComponentsBottomMessage({
  renderHandler = () => {},
  chatWith,
}) {
  const [text, setText] = useState()
  const { getAuthHeader, auth } = useAuth()
  const onSubmit = async (e) => {
    e.preventDefault()
    if (text === '' || !text) return
    const fm = new FormData(e.target)
    fm.set('receiver_id', chatWith)
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
      renderHandler(true)
    }
  }
  return (
    <>
      <Form
        onSubmit={onSubmit}
        className="flex flex-wrap  justify-between  w-full"
      >
        <div className="w-full flex justify-between">
          <Input
            value={text}
            name="text"
            size="md"
            className="w-9/12"
            onChange={(e) => {
              setText(e.target.value)
            }}
          ></Input>
          <Button isIconOnly color="primary">
            <AiOutlinePicture size={25} />
          </Button>
          <Button type="submit" isIconOnly color="primary">
            <AiOutlineArrowRight size={25} />
          </Button>
        </div>
      </Form>
    </>
  )
}
