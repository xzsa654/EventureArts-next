'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Input } from '@heroui/react'
import InputPop from './input-pop'
import ModalLayout from './layout'
import { ArrowRight } from '@/public/Yao/icons'
import { useModal } from '@/contexts/modal-context'
import RegisterSection from './section'
export default function RegisterStep1() {
  const tips = '註冊帳號(1/4)'
  const title = '基本資料'
  const { register1, register2: next } = useModal()
  const { onOpen } = next

  const { isOpen, onOpenChange } = register1
  const section = (
    <RegisterSection
      firstColor="yellow"
      firstIcon="#FFC45C"
      nowStatus="(1/2)"
      test={{ first: 'now' }}
    />
  )
  const formBody = (
    <form className="w-full h-full gap-[10px] flex flex-wrap justify-center items-center">
      <InputPop
        name="email"
        label="email"
        type="email"
        popContent="請輸入有效的電子郵件地址（例：example@email.com）"
        className="w-full"
        popTitle="Email"
      />
      <InputPop
        name="password"
        label="密碼"
        type="password"
        popContent="大小寫英文字母、數字或 “-” 符號；最小8位，最大12位"
        className="w-full"
        popTitle="密碼"
      />

      <InputPop
        name="name"
        label="真實姓名"
        type="password"
        popContent="請輸入中文姓名（2字以上）"
        className="w-full"
        popTitle="姓名"
      />
      <InputPop
        name="mobile"
        label="手機"
        type="password"
        popContent="請輸入10位數的台灣手機號碼（09開頭）"
        className="w-full"
        popTitle="手機格式"
      />
    </form>
  )
  const footer = (
    <div className="w-full justify-end text-white flex gap-1">
      <Link
        href={'#'}
        onClick={() => {
          onOpenChange(false)
          onOpen()
        }}
        className="flex text-base"
      >
        下一步
        <ArrowRight />
      </Link>
    </div>
  )
  return (
    <>
      <ModalLayout
        {...{ formBody, footer, tips, section, title, isOpen, onOpenChange }}
      />
    </>
  )
}
