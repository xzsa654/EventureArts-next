'use client'

import React, { useState, useEffect } from 'react'

import Link from 'next/link'
import { Input, Textarea } from '@heroui/react'
import RegisterSection from './section'
import ModalLayout from './layout'
import { ArrowRight, BracketsIcon, StatusIcon } from '@/public/Yao/icons'
import { useModal } from '@/contexts/modal-context'

export default function RegisterStep2(props) {
  const { register2, switchToModal, register3 } = useModal()
  const { onOpen } = register3
  const { isOpen, onOpenChange } = register2
  const tips = '註冊帳號(2/4)'
  const title = '基本資料'
  const section = <RegisterSection test={{ first: 'now' }} nowStatus="(2/2)" />

  const formBody = (
    <form className="w-full h-full gap-[8px] flex flex-wrap ">
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
      <Input
        label="真實姓名"
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
      <Textarea
        radius="none"
        variant="bordered"
        className="max-w-xs focus:text-white  group-data-[focus=true]:text-white"
        label="個人簡介"
        classNames={{
          label:
            'text-white group-data-[focus=true]:text-white group-data-[filled-within=true]:text-white',
          input:
            'group-data-[focus=true]:text-white group-data-[has-value=true]:text-white',
        }}
      />
    </form>
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
        {...{ formBody, footer, tips, title, section, isOpen, onOpenChange }}
      />
    </>
  )
}
