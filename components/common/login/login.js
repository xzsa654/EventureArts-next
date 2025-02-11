'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Input } from '@heroui/react'
import { Button } from '@heroui/button'
import ModalLayout from './layout'
import { useModal } from '@/contexts/modal-context'
import { ArrowRight, FacebookLogo, GoogleLogo } from '@/public/Yao/icons'

export default function LoginModal() {
  const tips = '登入'
  const title = 'EVENTUREARTS'

  const { login, switchToModal, register1, reset } = useModal()
  const { isOpen, onOpenChange } = login
  const { onOpen: onRegOpen } = register1
  const { onOpen: onResOpen } = reset
  const formBody = (
    <form className="gap-[10px] flex flex-wrap justify-center text-center">
      <Input
        label="Email"
        variant="underlined"
        type="email"
        className="w-full"
        classNames={{
          label:
            'text-white group-data-[focus=true]:text-white group-data-[filled-within=true]:text-white',
          input:
            'group-data-[focus=true]:text-white group-data-[has-value=true]:text-white',
        }}
      ></Input>
      <Input
        label="密碼"
        variant="underlined"
        type="password"
        className="w-full"
        classNames={{
          label:
            'text-white group-data-[focus=true]:text-white group-data-[filled-within=true]:text-white',
          input:
            'group-data-[focus=true]:text-white group-data-[has-value=true]:text-white',
        }}
      ></Input>
      <Button
        className="w-full "
        radius="none"
        color="primary"
        endContent=<ArrowRight />
      >
        登入
      </Button>
      <Link
        href={'#'}
        onClick={() => {
          onOpenChange(false)
          onResOpen()
        }}
        className="text-zinc relative after:bg-white  text-center after:h-[1px] after:w-0 after:absolute after:bottom-0 after:left-0 hover:after:w-full"
      >
        忘記密碼?
      </Link>
      <div className="w-full flex items-center gap-2 text-gray-600">
        <div className="h-[1px] flex-grow bg-zinc" />
        <div className="font-cn">或者</div>
        <div className="h-[1px] flex-grow bg-zinc" />
      </div>
      <Button
        radius="none"
        className="bg-white w-full h-[54px] text-xs p-[15px] item-center justify-start"
        startContent=<GoogleLogo />
      >
        使用Google帳號登入
      </Button>
      <Button
        radius="none"
        className="text-white h-[54px] w-full bg-[#1877F2] text-xs p-[15px] item-center justify-start"
        startContent=<FacebookLogo />
      >
        使用Facebook帳號登入
      </Button>
    </form>
  )
  const footer = (
    <div className="w-full justify-center text-white flex gap-1 font-cn">
      <div>還沒有帳號?</div>
      <Link
        href={'#'}
        onClick={() => {
          onOpenChange(false)
          onRegOpen()
        }}
        className="border-b-1 border-zinc text-zinc"
      >
        立即註冊
      </Link>
    </div>
  )
  return (
    <>
      <ModalLayout
        {...{ formBody, footer, tips, title, isOpen, onOpenChange }}
      />
    </>
  )
}
