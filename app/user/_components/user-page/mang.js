'use client'

import React, { useState, useEffect } from 'react'
import { Button } from '@heroui/react'
import UserPageSelect from './select'
import OurPagination from '@/components/common/pagination'
import { HiArrowNarrowRight } from 'react-icons/hi'
import ExMangContent from './ex-content'
import CourseMangContent from './co-content'
import { useRouter } from 'next/navigation'
export default function Mang({ type }) {
  const router = useRouter()
  return (
    <>
      <UserPageSelect type={type} />
      <div className="flex-auto ">
        {type == 'course' ? <CourseMangContent /> : <ExMangContent />}
      </div>
      <div className="flex flex-col gap-8 items-center justify-center">
        <OurPagination />
        <div className="flex gap-4 max-sm:px-3">
          <Button
            size="lg"
            onPress={() => {
              if (type == 'course') {
                return router.push('/user/b/co-mang/add')
              } else {
                return router.push('/user/b/ex-mang/add-off')
              }
            }}
            color="primary"
            radius="none"
            className="text-16 text-white w-full max-sm:px-2 "
            endContent=<HiArrowNarrowRight size={20} color="white" />
          >
            {type == 'course' ? '新增課程' : '新增線上展覽'}
          </Button>
          <Button
            size="lg"
            onPress={() => router.push('/user/b/ex-mang/add-on')}
            color="primary"
            radius="none"
            className={`${
              type == 'course' ? 'hidden' : ''
            } w-full text-16 text-white max-sm:px-2`}
            endContent=<HiArrowNarrowRight size={20} color="white" />
          >
            新增線下展覽
          </Button>
        </div>
      </div>
    </>
  )
}
