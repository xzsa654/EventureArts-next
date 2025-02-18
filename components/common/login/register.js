'use client'

import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { Form, Button } from '@heroui/react'
import InputPop from './input-pop'
import ModalLayout from './layout'
import { ArrowRight } from '@/public/Yao/icons'
import { useModal } from '@/contexts/modal-context'
import RegisterSection from './section'
import { useAuth } from '@/hooks/use-auth'
import { EMAIL_CHECKING } from '@/lib/authorization-api'

export default function RegisterStep1() {
  const { firstLogin, registerDataHandler } = useAuth()
  const { register1, register2: next } = useModal()
  const { onOpen } = next
  const [errorMessage, setErrorMessage] = useState(false)
  const { isOpen, onOpenChange } = register1
  const onSubmit = async (e) => {
    e.preventDefault()
    const data = new FormData(e.target)
    const user_email = data.get('user_email')
    const password = data.get('password')
    const user_name = data.get('user_name')
    const mobile = data.get('mobile')
    // 先驗證 email 是否已存在

    const res = await fetch(EMAIL_CHECKING, { method: 'POST', body: data })
    const result = await res.json()
    if (!result.success) {
      return setErrorMessage(!result.success)
    }

    registerDataHandler({ user_email, password, user_name, mobile })
    onOpenChange(false)
    onOpen()
  }

  const tips = '註冊帳號(1/4)'
  const title = '基本資料'

  const formRef = useRef()

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
      ref={formRef}
      onSubmit={onSubmit}
      validationBehavior="native"
      className="w-full h-full gap-[10px] flex flex-wrap justify-center items-center"
    >
      <>
        <InputPop
          isRequired
          name="user_email"
          label="email"
          type="email"
          validateItem={(value) => {
            const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
            if (!regex.test(value)) {
              return '請輸入有效的 Email 格式'
            }
          }}
          popContent="請輸入有效的電子郵件地址（例：example@email.com）"
          className={`w-full ${
            errorMessage
              ? 'after:text-red-500 after:content-["EMAIL已被註冊"]'
              : ''
          } `}
          popTitle="Email"
        />
        <InputPop
          isRequired
          name="password"
          label="密碼"
          type="password"
          realTimeValid={true}
          className="w-full"
          isPop={false}
        />
      </>

      <InputPop
        isRequired
        name="user_name"
        label="真實姓名"
        validateItem={(value) => {
          const regex = /^[\u4e00-\u9fa5]{2,}$/
          if (!regex.test(value)) {
            return '請輸入中文名'
          }
        }}
        type="text"
        popContent="請輸入中文姓名（2字以上）"
        className="w-full"
        popTitle="姓名"
      />
      <InputPop
        isRequired
        name="mobile"
        label="手機"
        type="text"
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
          formRef.current?.requestSubmit()
        }}
        className="flex text-base  text-zinc"
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
