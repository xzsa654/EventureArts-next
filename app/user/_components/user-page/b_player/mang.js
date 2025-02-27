'use client'

import React, { useState, useEffect } from 'react'
import { Button } from '@heroui/react'
import UserPageSelect from '../select'
import OurPagination from '@/components/common/pagination'
import { ArrowRight } from '@/public/Yao/icons'
import COMangContent from './course/co-content'
import ExMangContent from './exhibit/ex-content'
import { useRouter } from 'next/navigation'
export default function Mang({ type }) {
  const router = useRouter()
  return (
    <>
      <UserPageSelect type={type} />
      <div className="flex-auto ">
        {type == 'course' ? <COMangContent /> : <ExMangContent />}
      </div>
      <div className="flex flex-col gap-8 items-center justify-center">
        <OurPagination />
        <div className="flex gap-4">
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
            className="text-16 text-white max-sm:hidden"
            endContent=<ArrowRight />
          >
            {type == 'course' ? '新增課程' : '新增線上展覽'}
          </Button>
          <Button
            size="lg"
            onPress={() => router.push('/user/b/ex-mang/add-on')}
            color="primary"
            radius="none"
            className={`${type == 'course' ? 'hidden' : ''} text-16 text-white`}
            endContent=<ArrowRight />
          >
            新增線下展覽
          </Button>
        </div>
      </div>
    </>
  )
}
