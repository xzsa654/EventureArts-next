'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import ModalLayout from './layout'
import { Button } from '@heroui/react'
import {
  ArrowRight,
  AvatarIcon,
  BracketsIcon,
  StatusIcon,
} from '@/public/user/icons'
import { useModal } from '@/contexts/modal-context'

export default function RegisterStep3(props) {
  const { register3, switchToModal, register4 } = useModal()
  const { onOpen } = register4
  const { isOpen, onOpenChange } = register3
  const tips = '註冊帳號(3/4)'
  const title = '大頭貼'
  const section = (
    <div className="flex items-center gap-1  w-full">
      {/* 左侧项目 */}
      <div className="flex items-center ">
        <div className="flex flex-col ">
          <StatusIcon color="#91D9CE" />
          <div className="text-green-300 h-[36px] ">基本資料</div>
        </div>
      </div>

      {/* 中间项目 */}
      <div className="flex items-center">
        <div className="flex flex-col ">
          <StatusIcon />
          <div className="text-yellow h-[36px]">大頭貼</div>
        </div>
      </div>

      {/* 中间项目 */}
      <div className="flex items-center">
        <div className="flex flex-col items-center">
          <BracketsIcon />
          <div className="text-white w-full h-[36px]">興趣列表</div>
        </div>
      </div>
    </div>
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
        href={'javascript:'}
        onClick={() => {
          onOpenChange(false)
          onOpen()
        }}
        className="text-gray-800"
      >
        略過
      </Link>
      <Link
        href={'javascript:'}
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
