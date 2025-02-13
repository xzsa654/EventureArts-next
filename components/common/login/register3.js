'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import ModalLayout from './layout'
import { Button } from '@heroui/react'
import { ArrowRight, AvatarIcon } from '@/public/Yao/icons'
import { useModal } from '@/contexts/modal-context'
import RegisterSection from './section'
export default function RegisterStep3(props) {
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
    <Button
      isIconOnly
      radius="none"
      className="w-[250] h-[250] bg-gray-800 flex flex-col items-center justify-center "
    >
      <AvatarIcon />
      <span className="text-white text-xl">點我</span>
      <input type="file" className="hidden" />
    </Button>
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
          <ArrowRight />
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
