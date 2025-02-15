'use client'

import React, { useState, useEffect } from 'react'
import ExMiddleForm from './co-middle-form'
import { Button } from '@heroui/react'
import CoUserFile from './co-files'
import { Image } from '@heroui/react'
import { useRouter } from 'next/navigation'

export default function UserCoAddForm() {
  const router = useRouter()
  return (
    <>
      <header className="w-full px-[78px] max-sm:px-2 py-7">
        <div className="w-full border-b-5 border-black ">
          <h1 className="w-full font-kanit max-sm:text-3xl text-6xl font-extrabold text-center ">
            Add new Course
          </h1>
        </div>
      </header>
      {/* 表單中間 */}
      <ExMiddleForm />
      {/* 表單上傳 */}
      <CoUserFile />
      <footer className="w-full my-6 gap-2 flex justify-end">
        <Button
          className="bg-gray px-8  border border-black"
          radius="large"
          size="lg"
          onPress={() => router.back()}
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
