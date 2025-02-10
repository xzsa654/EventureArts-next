'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Input } from '@heroui/react'
import { Button, ButtonGroup } from '@heroui/button'
import ModalLayout from './layout'
import { ArrowRight, BracketsIcon, StatusIcon } from '@/public/Yao/icons'
import { useModal } from '@/contexts/modal-context'
export default function RegisterStep1() {
  const tips = '註冊帳號(1/4)'
  const title = '基本資料'
  const { register1, switchToModal, register2: next } = useModal()
  const { onOpen } = next
  const { isOpen, onOpenChange } = register1
  const section = (
    <div className="flex items-center gap-1  w-full">
      {/* 左侧项目 */}
      <div className="flex items-center ">
        <div className="flex flex-col text-yellow  ">
          <StatusIcon />
          <div className="text-yellow ">
            基本資料
            <div>(1/2)</div>
          </div>
        </div>
      </div>

      {/* 中间项目 */}
      <div className="flex items-center">
        <div className="flex flex-col ">
          <StatusIcon color="#FFFFFF" />
          <div className="text-white h-[36px]">大頭貼</div>
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

  const formBody = (
    <form className="w-full h-full gap-[10px] flex flex-wrap justify-center items-center">
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
      <Input
        label="密碼"
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
        label="真實姓名"
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
        label="手機"
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
    </form>
  )
  const footer = (
    <div className="w-full justify-end text-white flex gap-1">
      <Link
        href={'javascript:'}
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
        {...{ formBody, footer, tips, title, section, isOpen, onOpenChange }}
      />
    </>
  )
}
