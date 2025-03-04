'use client'

import React, { useState, useEffect } from 'react'
import { ScrollShadow, Button, Image } from '@heroui/react'
import UserCoAddForm from './add-co-form'
import CoUserFile from './co-files'
import { useRouter } from 'next/navigation'
import { HiArrowNarrowRight } from 'react-icons/hi'
export default function AddPage(props) {
  const router = useRouter()

  return (
    <>
      <ScrollShadow className="h-[680px]">
        <header className="w-full px-[78px] max-sm:px-2 py-7">
          <div className="w-full border-b-5 border-black ">
            <h1 className="w-full font-kanit max-sm:text-3xl text-6xl font-extrabold text-center ">
              Add new Course
            </h1>
          </div>
        </header>
        {/* 表單中間 */}
        <UserCoAddForm />
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
            endContent={<HiArrowNarrowRight size={20} color="white" />}
          >
            立即添加
          </Button>
        </footer>
      </ScrollShadow>
    </>
  )
}
