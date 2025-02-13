'use client'

import React, { useState, useEffect } from 'react'
import MiddleForm from './middle-form'
import UserFile from './user-file'
import { Button } from '@heroui/react'
import { Image } from '@heroui/react'
export default function UserAddForm() {
  return (
    <>
      <header className="w-full px-[78px] py-7">
        <div className="w-full border-b-5 border-black ">
          <h1 className="w-full font-kanit text-6xl font-extrabold text-center ">
            Add new Offline Exhibition
          </h1>
        </div>
      </header>
      {/* 表單中間 */}
      <MiddleForm />
      {/* 表單上傳 */}
      <UserFile />
      <footer className="w-full mt-8 gap-2 flex justify-end">
        <Button
          className="bg-gray px-8  border border-black"
          radius="large"
          size="lg"
        >
          取消
        </Button>
        <Button
          className="bg-green  px-8 py-1 w-auto border border-black"
          radius="large"
          size="lg"
          endContent={
            <Image src="/Yao/user/arrow-right.svg" alt="arrow-right" />
          }
        >
          立即添加
        </Button>
      </footer>
    </>
  )
}
