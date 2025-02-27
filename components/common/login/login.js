'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Input, Form } from '@heroui/react'
import { Button } from '@heroui/button'
import ModalLayout from './layout'
import { useModal } from '@/contexts/modal-context'
import { HiArrowNarrowRight } from 'react-icons/hi'
import FirebaseAuthPage from '@/app/user/_components/firebase-auth'
import { useAuth } from '@/hooks/use-auth'
import { LOGIN } from '@/lib/authorization-api'
import { motion } from 'framer-motion'
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3'
export default function LoginModal() {
  const { firstLogin, loginhandle } = useAuth()
  const [logging, setLogging] = useState({
    email: '',
    password: '',
  })
  const { executeRecaptcha } = useGoogleReCaptcha()
  const [errorMessage, setErrorMessage] = useState(null)
  const changeHandle = (e) => {
    const value = e.target.value
    const nextData = { ...logging, [e.target.name]: value }
    setLogging(nextData)
  }
  const onSubmit = async (e) => {
    e.preventDefault()
    if (!executeRecaptcha) {
      return
    }
    const token = await executeRecaptcha('form_submit')
    const fm = new FormData(e.target)
    fm.append('recaptcha', token)
    const res = await fetch(LOGIN, { method: 'POST', body: fm })
    const result = await res.json()

    if (!result.success) {
      setErrorMessage(result.message)
    } else {
      loginhandle(result.data)
    }
  }

  const tips = '登入'
  const title = 'EVENTUREARTS'

  const { login, register1, reset } = useModal()
  const { isOpen, onOpenChange } = login
  const { onOpen: onRegOpen } = register1
  const { onOpen: onResOpen } = reset
  useEffect(() => {
    if (firstLogin?.login_type) {
      onOpenChange(false)
      onRegOpen()
    }
  }, [firstLogin?.login_type])

  useEffect(() => {
    if (onOpenChange) {
      setErrorMessage(null)
    }
  }, [onOpenChange])

  const formBody = (
    <Form
      onSubmit={onSubmit}
      className="gap-[10px] flex flex-wrap items-center justify-center text-center"
    >
      <Input
        label="Email"
        variant="underlined"
        name="user_email"
        type="email"
        onChange={changeHandle}
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
        name="password"
        type="password"
        onChange={changeHandle}
        className={`w-full`}
        classNames={{
          label:
            'text-white group-data-[focus=true]:text-white group-data-[filled-within=true]:text-white',
          input: `group-data-[focus=true]:text-white group-data-[has-value=true]:text-white  `,
        }}
      ></Input>
      {errorMessage && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="text-red"
        >
          {errorMessage}
        </motion.div>
      )}
      <Button
        className="w-full "
        radius="none"
        color="primary"
        type="submit"
        endContent=<HiArrowNarrowRight color="white" size={20} />
      >
        登入
      </Button>
      <div className="text-gray tracking-normal text-start">
        本網站受 reCAPTCHA 和 Google
        <br />
        <Link
          className=" text-blue-400"
          href="https://policies.google.com/privacy"
        >
          {' '}
          隱私權政策
        </Link>{' '}
        與&nbsp;
        <Link
          className="text-blue-400"
          href="https://policies.google.com/terms"
        >
          服務條款{' '}
        </Link>
        保護並適用
      </div>

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
      {/* 第三方登入 */}
      <FirebaseAuthPage />
    </Form>
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
