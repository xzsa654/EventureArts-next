'use client'

import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import ModalLayout from './layout'
import { Button, Image } from '@heroui/react'
import { AvatarIcon } from '@/public/Yao/icons'
import { useModal } from '@/contexts/modal-context'
import { HiArrowNarrowRight } from 'react-icons/hi'

import RegisterSection from './section'
import { useAuth } from '@/hooks/use-auth'
export default function RegisterStep3(props) {
  const fileRef = useRef()
  const { registerDataHandler } = useAuth()

  const [avatar, setAvatar] = useState('')
  const fileHandle = (e) => {
    // 取得 file 檔案
    const file = fileRef.current.files[0]
    if (file) {
      // 如果確認有檔案 , 建立新的 fileReader 物件
      const reader = new FileReader(file)
      reader.onload = () => {
        // 讀取到 url 後寫入狀態內
        setAvatar(reader.result)
        registerDataHandler({ avatar: reader.result })
        // TODO: 缺少了傳入firstLogin的狀態
      }
      reader.readAsDataURL(file)
    }
  }
  const { register3, register4 } = useModal()
  const { onOpen } = register4
  const { isOpen, onOpenChange } = register3
  const tips = '註冊帳號(3/4)'
  const title = '大頭貼'
  const section = (
    <RegisterSection test={{ first: 'complete', second: 'now' }} />
  )
  const prompt = (
    <p className="w-full font-cn text-yellow text-center">
      請上傳jpg格式，比例1:1最佳
    </p>
  )
  const formBody = (
    <>
      {avatar ? (
        <button
          onClick={() => {
            fileRef.current.click()
          }}
        >
          <Image
            src={avatar}
            alt="avatar"
            radius="none"
            className="w-full aspect-square "
          ></Image>
        </button>
      ) : (
        <Button
          isIconOnly
          radius="none"
          onPress={() => {
            fileRef.current.click()
          }}
          className="w-[250px] h-[250px] bg-gray-800 flex flex-col items-center justify-center "
        >
          <AvatarIcon />
          <span className="text-white text-xl">點我</span>
        </Button>
      )}

      <input
        type="file"
        ref={fileRef}
        onChange={fileHandle}
        className="hidden"
      />
    </>
  )
  const footer = (
    <div className="w-full justify-between text-white flex gap-1">
      <Link
        href={'#'}
        onClick={() => {
          onOpenChange(false)
          onOpen()
        }}
        className="text-gray-800"
      >
        略過
      </Link>
      <Link
        href={'#'}
        onClick={() => {
          onOpenChange(false)
          onOpen()
        }}
        className=" flex justify-center items-center "
      >
        下一步
        <div className="">
          <HiArrowNarrowRight size={20} color="white" />
        </div>
      </Link>
    </div>
  )
  return (
    <>
      <ModalLayout
        {...{
          formBody,
          footer,
          tips,
          title,
          section,
          prompt,
          isOpen,
          onOpenChange,
        }}
      />
    </>
  )
}
