'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Input, extendVariants } from '@heroui/react'
import { Button, ButtonGroup } from '@heroui/button'
import ModalLayout from './layout'
const MyInput = extendVariants(Input, {
  variants: {
    color: {
      white: {
        inputWrapper: ['text-white'],
      },
    },
  },
  defaultVariants: {
    color: 'white',
    textSize: 'base',
    removeLabel: true,
  },
})
// 箭頭向右 SVG
const arrowRight = (
  <svg
    width="25"
    height="25"
    viewBox="0 0 25 25"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M15.3057 6.43652L21.3757 12.5065L15.3057 18.5765"
      stroke="white"
      stroke-width="1.5"
      stroke-miterlimit="10"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M4.37598 12.5063H21.206"
      stroke="white"
      stroke-width="1.5"
      stroke-miterlimit="10"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
)

// Google Logo SVG
const googleLogo = (
  <svg
    width="25"
    height="25"
    viewBox="0 0 25 25"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect
      width="24"
      height="24"
      transform="translate(0.410156 0.351074)"
      fill="white"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M23.4502 12.6125C23.4502 11.7971 23.377 11.013 23.2411 10.2603H12.4102V14.7087H18.5992C18.3327 16.1462 17.5224 17.3641 16.3045 18.1796V21.065H20.0211C22.1956 19.063 23.4502 16.1148 23.4502 12.6125Z"
      fill="#4285F4"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M12.4096 23.8511C15.5146 23.8511 18.1178 22.8214 20.0205 21.065L16.3039 18.1795C15.2742 18.8695 13.9569 19.2773 12.4096 19.2773C9.4144 19.2773 6.87918 17.2543 5.97486 14.5361H2.13281V17.5157C4.02509 21.2741 7.91418 23.8511 12.4096 23.8511Z"
      fill="#34A853"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M5.97538 14.5361C5.74538 13.8461 5.6147 13.109 5.6147 12.3511C5.6147 11.5931 5.74538 10.8561 5.97538 10.1661V7.18652H2.13334C1.35447 8.73902 0.910156 10.4954 0.910156 12.3511C0.910156 14.2068 1.35447 15.9631 2.13334 17.5156L5.97538 14.5361Z"
      fill="#FBBC05"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M12.4096 5.42494C14.098 5.42494 15.614 6.00516 16.8058 7.14471L20.1042 3.8463C18.1126 1.99062 15.5094 0.851074 12.4096 0.851074C7.91418 0.851074 4.02509 3.42812 2.13281 7.18653L5.97486 10.1661C6.87918 7.44789 9.4144 5.42494 12.4096 5.42494Z"
      fill="#EA4335"
    />
  </svg>
)
// Facebook Logo SVG
const facebookLogo = (
  <svg
    width="25"
    height="25"
    viewBox="0 0 25 25"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clip-path="url(#clip0_1041_2633)">
      <rect
        width="24"
        height="24"
        transform="translate(0.410156 0.351074)"
        fill="#1877F2"
      />
      <path
        d="M23.9102 12.421C23.9102 6.06968 18.7614 0.920954 12.4102 0.920954C6.05888 0.920954 0.910156 6.06968 0.910156 12.421C0.910156 18.1609 5.11554 22.9185 10.6133 23.7812V15.7452H7.69336V12.421H10.6133V9.88736C10.6133 7.00517 12.3301 5.41314 14.957 5.41314C16.2152 5.41314 17.5312 5.63775 17.5312 5.63775V8.46783H16.0811C14.6525 8.46783 14.207 9.35429 14.207 10.2637V12.421H17.3965L16.8866 15.7452H14.207V23.7812C19.7048 22.9185 23.9102 18.1609 23.9102 12.421Z"
        fill="white"
      />
    </g>
    <defs>
      <clipPath id="clip0_1041_2633">
        <rect
          width="24"
          height="24"
          fill="white"
          transform="translate(0.410156 0.351074)"
        />
      </clipPath>
    </defs>
  </svg>
)

export default function LoginModal(props) {
  const tips = '登入'
  const title = 'EVENTUREARTS'

  const formBody = (
    <form className="gap-[10px] flex flex-wrap justify-center text-center">
      <MyInput
        label="Email"
        variant="underlined"
        type="email"
        className="w-full"
        classNames={{
          label: 'text-white group-data-[focus=true]:text-white',
        }}
      ></MyInput>
      <MyInput
        label="密碼"
        variant="underlined"
        type="password"
        className="w-full"
        classNames={{
          label: 'text-white group-data-[focus=true]:text-white',
        }}
      ></MyInput>
      <Button
        className="w-full "
        radius="none"
        color="primary"
        endContent={arrowRight}
      >
        登入
      </Button>
      <Link href={'#'} className="text-zinc  text-center hover:border-b-1">
        忘記密碼?
      </Link>
      <div className="w-full flex items-center gap-2 text-gray-600">
        <div className="h-[1px] flex-grow bg-zinc" />
        <div className="font-cn">或者</div>
        <div className="h-[1px] flex-grow bg-zinc" />
      </div>
      <Button
        radius="none"
        className="bg-white w-full h-[54px] text-xs p-[15px] item-center justify-start"
        startContent={googleLogo}
      >
        使用Google帳號登入
      </Button>
      <Button
        radius="none"
        className="text-white h-[54px] w-full bg-[#1877F2] text-xs p-[15px] item-center justify-start"
        startContent={facebookLogo}
      >
        使用Facebook帳號登入
      </Button>
    </form>
  )
  const footer = (
    <div className="w-full justify-center text-white flex gap-1">
      <div>還沒有帳號?</div>
      <Link href={'#'} className="border-b-1 border-zinc text-zinc">
        立即註冊
      </Link>
    </div>
  )
  return (
    <>
      <ModalLayout {...{ formBody, footer, tips, title }} />
    </>
  )
}
