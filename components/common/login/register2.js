'use client'

import React, { useState, useEffect, useRef } from 'react'

import Link from 'next/link'
import { Textarea, DatePicker, Select, SelectItem, Form } from '@heroui/react'
import InputPop from './input-pop'
import RegisterSection from './section'
import ModalLayout from './layout'
import { useModal } from '@/contexts/modal-context'
import { useAuth } from '@/hooks/use-auth'
import { HiArrowNarrowRight } from 'react-icons/hi'

export default function RegisterStep2(props) {
  const { registerDataHandler } = useAuth()
  const formRef = useRef()
  const { register2, register3 } = useModal()
  const gender = [
    { label: '男性', key: 'male' },
    { label: '女性', key: 'female' },
    { label: '不願透漏', key: 'not provided' },
  ]
  const { onOpen } = register3
  const { isOpen, onOpenChange } = register2
  const tips = '註冊帳號(2/4)'
  const title = '基本資料'
  const section = <RegisterSection test={{ first: 'now' }} nowStatus="(2/2)" />

  const onsubmit = (e) => {
    e.preventDefault()

    const data = new FormData(e.currentTarget)
    const nickname = data.get('nickname')
    const birthday = data.get('birthday')
    const gender = data.get('gender')
    const profile = data.get('profile')
    registerDataHandler({ nickname, birthday, gender, profile })
    onOpenChange(false)
    onOpen()
  }

  const formBody = (
    <Form
      onSubmit={onsubmit}
      ref={formRef}
      className="w-full h-full gap-[8px] flex flex-wrap "
    >
      <InputPop
        label="暱稱"
        isPop={false}
        name="nickname"
        type="text"
        className="w-full"
      ></InputPop>

      <div className="w-full ">
        <DatePicker
          showMonthAndYearPickers
          label="生日"
          color="danger"
          variant="underlined"
          name="birthday"
        />
      </div>

      <Select
        className="max-w-xs"
        label="性別"
        placeholder="請選擇性別"
        name="gender"
        defaultSelectedKeys={['not provided']}
        variant={'underlined'}
        classNames={{
          base: 'max-w-xs',
          trigger: 'min-h-12 py-2 ',
          label: 'group-data-[filled=true]:text-white',
          value: 'text-white text-tiny group-data-[has-value=true]:text-white',
          selectorIcon: 'text-white text-tiny',
        }}
      >
        {gender.map((item) => (
          <SelectItem key={item.key}>{item.label}</SelectItem>
        ))}
      </Select>
      <Textarea
        radius="none"
        name="profile"
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
    </Form>
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
          formRef.current.requestSubmit()
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
        {...{ formBody, footer, tips, title, section, isOpen, onOpenChange }}
      />
    </>
  )
}
