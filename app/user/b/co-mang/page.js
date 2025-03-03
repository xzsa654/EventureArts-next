'use client'

import React, { useState, useEffect } from 'react'

import { Button } from '@heroui/react'
import UserPageSelect from '../../_components/select'
import OurPagination from '@/components/common/pagination'
import { HiArrowNarrowRight } from 'react-icons/hi'
import COMangContent from './co-content'
import { useRouter } from 'next/navigation'
export default function CourseMangPage() {
  const router = useRouter()
  return (
    <>
      <UserPageSelect />
      <div className="flex-auto ">
        <COMangContent />
      </div>
      <div className="flex flex-col gap-8 items-center justify-center ">
        <OurPagination />
        <div className="flex gap-4">
          <Button
            size="lg"
            onPress={() => {
              router.push('/user/b/co-mang/add')
            }}
            color="primary"
            radius="none"
            className="text-16 text-white max-sm:hidden hover:scale-110 transition-transform duration-200"
            endContent=<HiArrowNarrowRight className="transition-transform duration-300 ease-out group-hover:translate-x-3" />
          >
            新增課程
          </Button>
          <Button
            size="lg"
            onPress={() => router.push('/user/b/ex-mang/add-on')}
            color="primary"
            radius="none"
            className={`hidden text-16 text-white hover:scale-110 transition-transform duration-200`}
            endContent=<HiArrowNarrowRight className="transition-transform duration-300 ease-out group-hover:translate-x-3" />
          >
            新增線下展覽
          </Button>
        </div>
      </div>
    </>
  )
}
