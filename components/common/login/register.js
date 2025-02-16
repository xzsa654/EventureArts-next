'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Form } from '@heroui/react'
import InputPop from './input-pop'
import ModalLayout from './layout'
import { ArrowRight } from '@/public/Yao/icons'
import { useModal } from '@/contexts/modal-context'
import RegisterSection from './section'
import { useAuth } from '@/hooks/use-auth'
export default function RegisterStep1() {
  const { firstLogin, registerDataHandler } = useAuth()
  const [validate, setValidate] = useState([
    { name: 'email', validate: false, value: '' },
    { name: 'password', validate: false, value: '' },
    { name: 'mobile', validate: false, value: '' },
    { name: 'name', validate: false, value: '' },
  ])

  const registerHandle = (e) => {
    const nextData = { ...firstLogin, [e.target.name]: e.target.value }
    registerDataHandler(nextData)
    //將資料寫入狀態內
  }

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
    <Form
      validationBehavior="native"
      className="w-full h-full gap-[10px] flex flex-wrap justify-center items-center"
    >
      {firstLogin.email ? (
        ''
      ) : (
        <>
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
            realTimeValid={true}
            className="w-full"
            isPop={false}
          />
        </>
      )}

      <InputPop
        name="name"
        onChange={registerHandle}
        label="真實姓名"
        validateItem={(value) => {
          const regex = /^[\u4e00-\u9fa5]{2,}$/
          if (!regex.test(value)) {
            return '請輸入中文名'
          } else {
            const nextData = validate.map((item, i) => {
              if (i == 3) {
                return { ...item, validate: true, value: value }
              }
              return item
            })
            setValidate(nextData)
          }
        }}
        type="text"
        popContent="請輸入中文姓名（2字以上）"
        className="w-full"
        popTitle="姓名"
      />
      <InputPop
        name="mobile"
        onChange={registerHandle}
        label="手機"
        type="password"
        popContent="請輸入10位數的台灣手機號碼（09開頭）"
        className="w-full"
        popTitle="手機格式"
        validateItem={(value) => {
          if (!/^09\d{8}$/.test(value)) {
            return '手機格式碼有誤'
          }
        }}
      />
    </Form>
  )
  const footer = (
    <div className="w-full justify-end text-white flex gap-1">
      <Link
        aria-disabled={true}
        href={'#'}
        onClick={() => {
          onOpenChange(false)
          onOpen()
        }}
        className="flex text-base pointer-events-none text-zinc"
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
