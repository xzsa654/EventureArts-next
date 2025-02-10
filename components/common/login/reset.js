'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Input, InputOtp } from '@heroui/react'
import { Button, ButtonGroup } from '@heroui/button'
import ModalLayout from './layout'
import { ArrowRight, BracketsIcon, StatusIcon } from '@/public/Yao/icons'
import { useModal } from '@/contexts/modal-context'
export default function ResetPassword() {
  const { reset, switchToModal, login } = useModal()
  const { onOpen } = login
  const { isOpen, onOpenChange } = reset
  const tips = '忘記密碼'
  const title = '取得驗證碼'
  const prompt = (
    <p className="w-full font-cn text-yellow ">
      請填寫註冊時email後點擊獲取驗證碼
    </p>
  )

  const formBody = (
    <form className="relative w-full h-full gap-[10px] flex flex-wrap justify-center items-center">
      <Input
        label="Email"
        variant="underlined"
        type="email"
        className="w-full"
        classNames={{
          label: 'text-white group-data-[focus=true]:text-white',
          input:
            'group-data-[focus=true]:text-white group-data-[has-value=true]:text-white',
        }}
      ></Input>
      <div className="absolute w-[300] h-[254] bottom-0 flex justify-center items-center z-10">
        <Button size="lg" className="bg-red text-white">
          獲取驗證碼
          <ArrowRight />
        </Button>
      </div>
      <div className="blur-sm ">
        <div className="text-white w-full text-base">
          驗證碼
          <InputOtp
            className="w-full flex justify-between"
            classNames={{
              segment: 'data-[has-value=true]:text-white text-white',
            }}
            length={5}
            variant={'underlined'}
          />
          <div className="font-cn">
            未收到驗證碼?
            <Button variant="light" className="text-red ">
              重新寄送
            </Button>
            <div>重新寄送倒計時:00</div>
          </div>
        </div>

        <Input
          label="新密碼"
          variant="underlined"
          type="password"
          className="w-full"
          classNames={{
            label: 'text-white group-data-[focus=true]:text-white',
            input:
              'group-data-[focus=true]:text-white group-data-[has-value=true]:text-white',
          }}
        ></Input>
        <Input
          label="再次輸入新密碼"
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
      </div>
    </form>
  )
  const footer = (
    <div className="w-full justify-between text-white text-xs items-center  flex gap-1">
      <div className="font-cn text-center">
        已經有帳號了?
        <Link
          href={'javascript:'}
          onClick={() => {
            onOpenChange(false)
            onOpen()
          }}
          className=" text-gray underline"
        >
          立即登入
        </Link>
      </div>
      <Link href={'#'} className="flex text-base text-center">
        重設密碼
        <ArrowRight />
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
          prompt,
          isOpen,
          onOpenChange,
        }}
      />
    </>
  )
}
