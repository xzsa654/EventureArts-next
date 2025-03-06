'use client'

import React, { useState, useRef, useEffect } from 'react'
import { Form, Input, Button, Image } from '@heroui/react'
import { useAuth } from '@/hooks/use-auth'
import { AiOutlinePicture, AiOutlineArrowRight } from 'react-icons/ai'
import { HiOutlineX } from 'react-icons/hi'

export default function BottomMessage({ renderHandler = () => {}, chatWith }) {
  // 控制輸入框的可控元件
  const [text, setText] = useState()
  const { getAuthHeader, auth, socket } = useAuth()
  // 控制需要幾張圖片與容器開啟
  const [howManyPicture, setHowManyPicture] = useState([])
  // file 可控元件
  const [mypic, setMyPic] = useState([])
  const fileRef = useRef()
  const onSubmit = async (e) => {
    e.preventDefault()
    if (text === '' && mypic.length === 0) return
    console.log(1)

    const fm = new FormData(e.target)
    fm.set('receiver_id', chatWith)
    fm.set('sender_id', auth.user_id)
    if (mypic.length) {
      for (let file of mypic) {
        fm.append('image', file)
      }
    }

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
      setHowManyPicture([])
      setMyPic([])
    }
  }

  const imgStore = (e) => {
    const files = e.target.files

    for (let file of files) {
      setMyPic((prev) => [...prev, file])
      const reader = new FileReader(file)
      reader.onload = () => {
        setHowManyPicture((prev) => {
          return [...prev, reader.result]
        })
      }
      reader.readAsDataURL(file)
    }
  }

  // 移除傳出圖片
  const deletePictureHandler = (key) => {
    const nextData = howManyPicture.filter((v, index) => key !== index)
    const nextData2 = mypic.filter((v, index) => key !== index)
    setHowManyPicture(nextData)
    setMyPic(nextData2)
  }

  useEffect(() => {
    socket.emit('typing', { chatWith, text })
  }, [text])

  return (
    <>
      {howManyPicture?.length ? (
        <div className="absolute bottom-16 px-8 py-3 flex gap-3 z-20  bg-primary w-full h-[150px]">
          {howManyPicture?.map((pic, i) => {
            return (
              <div key={i} className="relative">
                <Image
                  src={pic}
                  width={120}
                  height={120}
                  alt="senderPic"
                ></Image>
                <button
                  className=" absolute top-[3px] right-[5px] w-auto h-auto z-20 "
                  onClick={() => {
                    deletePictureHandler(i)
                  }}
                >
                  <HiOutlineX size={15} />
                </button>
              </div>
            )
          })}
        </div>
      ) : (
        ''
      )}
      <Form
        onSubmit={onSubmit}
        className="flex flex-wrap  justify-between  w-full"
      >
        <div className="w-full flex justify-between">
          <Input
            autoComplete="off"
            value={text}
            name="text"
            size="md"
            className="w-9/12"
            onChange={(e) => {
              setText(e.target.value)
            }}
          ></Input>
          <Input
            multiple={true}
            accept="image/jpeg"
            ref={fileRef}
            onChange={imgStore}
            type="file"
            className="hidden"
          ></Input>
          <Button
            isIconOnly
            color="primary"
            onPress={() => {
              fileRef.current.click()
            }}
          >
            <AiOutlinePicture size={20} />
          </Button>
          <Button type="submit" isIconOnly color="primary">
            <AiOutlineArrowRight size={20} />
          </Button>
        </div>
      </Form>
    </>
  )
}
