'use client'

import React, { useState, useEffect } from 'react'
import { Input, InputOtp, Button } from '@heroui/react'
import InputPop from './input-pop'
import { VERIFY_EMAIL } from '@/lib/authorization-api'
export default function ResetPassword({ isVerify, formRef }) {
  const [second, setSecond] = useState(30)
  const [otpMessage, setOtpMessage] = useState('')
  const [reSend, setReSend] = useState(false)
  useEffect(() => {
    if (isVerify) {
      let timer = setInterval(() => {
        setSecond((prev) => {
          // 秒數跑動
          if (prev > 0) {
            setOtpMessage('驗證碼已送出')
            if (prev == 1) {
              setOtpMessage('重新寄送')
            }
            return prev - 1
          }
          //秒數跑完停止計時函式

          if (prev == 0) {
            clearInterval(timer)
            return 0
          }
        })
      }, 1000)
    }
  }, [isVerify])

  useEffect(() => {
    if (reSend) {
      const email = formRef.current.email.value

      fetch(VERIFY_EMAIL, {
        method: 'POST',
        body: JSON.stringify({ email }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((r) => r.json())
        .then((result) => {
          
        })
      setSecond(30) // 重置秒數
      let timer = setInterval(() => {
        setSecond((prev) => {
          // 秒數跑動
          if (prev > 0) {
            setOtpMessage('驗證碼已送出')
            if (prev == 1) {
              setOtpMessage('重新寄送')
            }
            return prev - 1
          }
          //秒數跑完停止計時函式

          if (prev == 0) {
            setReSend(false)
            clearInterval(timer)
            return 0
          }
        })
      }, 1000)
    }
  }, [reSend])

  return (
    <>
      <div className="text-white w-full text-base ">
        <p className="after:content-['*'] after:text-red after:mr-2">驗證碼</p>
        <InputOtp
          isRequired
          name="otp"
          className="w-full flex justify-between"
          classNames={{
            segment: 'data-[has-value=true]:text-white text-white',
            errorMessage: 'text-red',
          }}
          length={5}
          variant={'underlined'}
        />
        <div className="font-cn">
          未收到驗證碼?
          <Button
            variant="light"
            className={`${
              second == 0 ? 'text-red' : ' pointer-events-none text-gray-900'
            }`}
            onPress={() => setReSend(true)}
          >
            {otpMessage}
          </Button>
          <div>重新寄送倒計時:{second}</div>
        </div>
      </div>

      <InputPop
        isRequired
        label="新密碼"
        variant="underlined"
        name="password"
        realTimeValid={true}
        type="password"
        className="w-full"
        isPop={false}
        classNames={{
          label: 'text-white group-data-[focus=true]:text-white',
          input:
            'group-data-[focus=true]:text-white group-data-[has-value=true]:text-white',
        }}
      ></InputPop>
      <InputPop
        isRequired
        label="再次輸入新密碼"
        variant="underlined"
        type="password"
        isPop={false}
        name="passwordAgain"
        validateItem={(value) => {
          if (value.length) {
            if (value !== formRef.current?.password.value) {
              return '請輸入與新密碼相符'
            }
          }
        }}
        className="w-full"
        classNames={{
          label:
            'text-white group-data-[focus=true]:text-white group-data-[filled-within=true]:text-white',
          input:
            'group-data-[focus=true]:text-white group-data-[has-value=true]:text-white',
        }}
      ></InputPop>
    </>
  )
}
