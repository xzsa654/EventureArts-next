'use client'

import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { Input, Form, Button } from '@heroui/react'
import { addToast } from '@heroui/toast'
import ModalLayout from './layout'
import { ArrowRight } from '@/public/Yao/icons'
import { motion } from 'framer-motion'
import { HiArrowNarrowRight } from 'react-icons/hi'
import { useModal } from '@/contexts/modal-context'
import { VERIFY_EMAIL, PASSWORD_RESET } from '@/lib/authorization-api'
import ResetPassword from './reset-password'
export default function VerifyEmail() {
  const { reset, login } = useModal()
  const formRef = useRef()
  const [disabled, setDisabled] = useState('pointer-events-none text-gray-900')
  const { onOpen } = login
  const [isVerify, setIsVerify] = useState(false)
  const { isOpen, onOpenChange } = reset
  const [errorMessage, setErrorMessage] = useState('')
  const tips = '忘記密碼'
  const title = '取得驗證碼'
  const prompt = (
    <p className="w-full font-cn text-yellow ">
      請填寫註冊時email後點擊獲取驗證碼
    </p>
  )
  useEffect(() => {
    if (isOpen == false) {
      setIsVerify(false)
      setErrorMessage('')
      setDisabled('pointer-events-none text-gray-900')
    }
  }, [isOpen])

  const verifyEmail = async () => {
    const email = formRef.current.email.value
    if (email.length < 7) return setErrorMessage('email不符合格式')
    const res = await fetch(VERIFY_EMAIL, {
      method: 'POST',
      body: JSON.stringify({ email }),
      headers: {
        'Content-Type': 'application/JSON',
      },
    })
    const result = await res.json()
    // 後端驗證查無 email
    if (!result.success) {
      return setErrorMessage(result.message)
    } else {
      setErrorMessage('')
      addToast({
        title: '驗證信已送出！',
        radius: 'lg',
        description: '請前往您的信箱查收',
        promise: new Promise((resolve) => setTimeout(resolve, 3000)),
        color: 'success',
        timeout: 10000,
      })
      setIsVerify(true)
      setDisabled(false)
    }
  }

  const onsubmitHandle = async (e) => {
    e.preventDefault()
    const fm = new FormData(e.target)
    const res = await fetch(PASSWORD_RESET, { method: 'POST', body: fm })
    const result = await res.json()
    if (result.success) {
      onOpenChange(false)
    } else {
      setErrorMessage(result.message)
    }
  }
  const formBody = (
    <Form
      validationBehavior="native"
      onSubmit={onsubmitHandle}
      ref={formRef}
      className="relative   w-full h-full gap-[10px] flex flex-wrap justify-center items-center"
    >
      <Input
        isRequired
        label="Email"
        name="email"
        variant="underlined"
        type="email"
        className="w-full "
        classNames={{
          label:
            'text-white group-data-[focus=true]:text-white after:text-red-500',
          input:
            'group-data-[focus=true]:text-white group-data-[has-value=true]:text-white ',
        }}
      ></Input>
      {errorMessage && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="text-red text-16"
        >
          {errorMessage}
        </motion.div>
      )}
      {!isVerify && (
        <motion.div
          exit={{
            opacity: 0,
            transition: {
              duration: 0.5,
              ease: 'easeIn',
            },
          }}
          className="absolute w-[300] h-[254] bottom-0 flex justify-center items-center z-10"
        >
          <Button size="lg" className="bg-red text-white" onPress={verifyEmail}>
            獲取驗證碼
            <HiArrowNarrowRight size={20} color="white" />
          </Button>
        </motion.div>
      )}
      <div className={`${!isVerify ? 'blur-sm' : ''} `}>
        <ResetPassword isVerify={isVerify} formRef={formRef} />
      </div>
    </Form>
  )
  const footer = (
    <div className="w-full justify-between text-white text-xs items-center  flex gap-1">
      <div className="font-cn text-center">
        已經有帳號了?
        <Link
          href={'#'}
          onClick={() => {
            onOpenChange(false)
            onOpen()
          }}
          className=" text-gray underline"
        >
          立即登入
        </Link>
      </div>
      <Link
        href={'#'}
        onClick={() => {
          formRef.current.requestSubmit()
        }}
        className={`flex text-base text-center ${disabled}`}
      >
        重設密碼
        <ArrowRight disabled={disabled} />
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
