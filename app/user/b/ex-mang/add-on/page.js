'use client'

import React, { useState, useEffect } from 'react'
import { ScrollShadow } from '@heroui/react'
import ExMiddleForm from '@/app/user/b/ex-mang/ex-middle-form'
import UserFile from '@/app/user/b/ex-mang/user-file'
import { Button } from '@heroui/react'
import { Image } from '@heroui/react'
import { useRouter } from 'next/navigation'
export default function ExAddPage(props) {
  const router = useRouter()

  return (
    <>
      <ScrollShadow className="h-[680px]">
        <header className="w-full px-[78px] py-7 max-sm:px-0">
          <div className="w-full border-b-5 border-black ">
            <h1 className="w-full font-kanit text-6xl max-sm:text-4xl font-extrabold text-center ">
              {'Add new Online Exhibition'}
            </h1>
          </div>
        </header>
        {/* 表單中間 */}
        <ExMiddleForm />
        {/* 表單上傳 */}
        <UserFile online={'online'} />
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
      </ScrollShadow>
    </>
  )
}
