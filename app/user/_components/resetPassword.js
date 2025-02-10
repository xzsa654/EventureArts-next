'use client'
import React, { useState, useEffect } from 'react'
import { otpSchema } from '@/hooks/zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { PASSWORD_RESET } from '@/lib/authorization-api'
export default function ResetPasswordPage({ second = 0, email = '' }) {
  //取得填寫的otp到狀態內
  const [message, setMessage] = useState('')
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({ resolver: zodResolver(otpSchema) })

  const updateHandler = async (data) => {
    let otp = ''
    for (let i in data) {
      i.includes('otp') && (otp += data[i])
    }
    const { password } = data
    const nextData = { email, password, otp }

    const res = await fetch(PASSWORD_RESET, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(nextData),
    })
    const result = await res.json()
    if (!result.success) {
      setMessage(result.message)
    } else {
      console.log(result)
    }
  }

  return (
    <>
      <form
        onSubmit={handleSubmit(updateHandler)}
        className="w-96 py-2 px-3 bg-white  rounded-lg dark:bg-neutral-900 dark:border-neutral-700"
      >
        <div className="flex items-center gap-x-4">
          <div
            className="flex gap-x-1"
            data-hs-pin-input='{ "availableCharsRE": "^[0-9]+$"}'
            id="pin-input"
          >
            {Array(5)
              .fill(0)
              .map((_, i) => {
                return (
                  <input
                    key={i}
                    className="block size-[38px] text-center border border-gray-200 rounded-md text-sm placeholder:text-gray-300 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                    type="text"
                    placeholder={'輸入驗證碼'.split('')[i]}
                    data-hs-pin-input-item
                    {...register(`otp${i}`)}
                  />
                )
              })}
          </div>
          <div className="flex ">
            <p className="">重新寄送:</p>
            <span className="font-bold me-3 ">
              {second < 10 ? '0' + second : second}
            </span>
          </div>
        </div>
        {Object.keys(errors).find((key) => key.startsWith('otp')) && (
          <p className="text-red-500 text-sm">
            {
              errors[Object.keys(errors).find((key) => key.startsWith('otp'))]
                .message
            }
          </p>
        )}

        <div>
          <div className="relative my-2">
            <input
              type="password"
              id="hs-floating-underline-input-password"
              className="peer py-4 px-0 block w-56 bg-transparent border-t-transparent border-b-2 border-x-transparent border-b-gray-200 text-sm placeholder:text-transparent focus:border-t-transparent focus:border-x-transparent focus:border-b-blue-500 focus:ring-0 disabled:opacity-50 disabled:pointer-events-none dark:border-b-neutral-700 dark:text-neutral-400 dark:focus:ring-neutral-600 dark:focus:border-b-neutral-600
              focus:outline-none
              focus:pt-6
              focus:pb-2
              [&:not(:placeholder-shown)]:pt-6
              [&:not(:placeholder-shown)]:pb-2
              autofill:pt-6
              autofill:pb-2"
              placeholder="you@password.com"
              name="password"
              {...register('password')}
            />
            <label
              htmlFor="hs-floating-underline-input-password"
              className="absolute top-0 start-0 py-4 px-0 h-full text-sm truncate pointer-events-none transition ease-in-out duration-100 border border-transparent  origin-[0_0] dark:text-white peer-disabled:opacity-50 peer-disabled:pointer-events-none
              peer-focus:scale-90
              peer-focus:translate-x-0.5
              peer-focus:-translate-y-1.5
              peer-focus:text-gray-500 dark:peer-focus:text-neutral-500
              peer-[:not(:placeholder-shown)]:scale-90
              peer-[:not(:placeholder-shown)]:translate-x-0.5
              peer-[:not(:placeholder-shown)]:-translate-y-1.5
              peer-[:not(:placeholder-shown)]:text-gray-500 dark:peer-[:not(:placeholder-shown)]:text-neutral-500 dark:text-neutral-500"
            >
              password
            </label>
          </div>
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
          <div className="relative">
            <input
              type="password"
              id="hs-floating-underline-input-password-confirm"
              className="peer py-4 px-0 block w-56 bg-transparent border-t-transparent border-b-2 border-x-transparent border-b-gray-200 text-sm placeholder:text-transparent focus:border-t-transparent focus:border-x-transparent focus:border-b-blue-500 focus:ring-0 disabled:opacity-50 disabled:pointer-events-none dark:border-b-neutral-700 dark:text-neutral-400 dark:focus:ring-neutral-600 dark:focus:border-b-neutral-600
              focus:pt-6
              focus:outline-none
              focus:pb-2
              [&:not(:placeholder-shown)]:pt-6
              [&:not(:placeholder-shown)]:pb-2
              autofill:pt-6
              autofill:pb-2"
              placeholder="********"
              name="passwordConfirm"
              {...register('confirmPassword')}
            />
            <label
              htmlFor="hs-floating-underline-input-password-confirm"
              className="absolute top-0 start-0 py-4 px-0 h-full text-sm truncate pointer-events-none transition ease-in-out duration-100 border border-transparent  origin-[0_0] dark:text-white peer-disabled:opacity-50 peer-disabled:pointer-events-none
              peer-focus:scale-90
              peer-focus:translate-x-0.5
              peer-focus:-translate-y-1.5
              peer-focus:text-gray-500 dark:peer-focus:text-neutral-500
              peer-[:not(:placeholder-shown)]:scale-90
              peer-[:not(:placeholder-shown)]:translate-x-0.5
              peer-[:not(:placeholder-shown)]:-translate-y-1.5
              peer-[:not(:placeholder-shown)]:text-gray-500 dark:peer-[:not(:placeholder-shown)]:text-neutral-500 dark:text-neutral-500"
            >
              confirm_password
            </label>
          </div>
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>
        <button className="btn border border-gray-200 my-5">送出</button>
      </form>
    </>
  )
}
